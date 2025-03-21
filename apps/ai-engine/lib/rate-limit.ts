import { Redis } from "ioredis"

import { headers } from "next/headers"
import { NextResponse } from "next/server"
import { log } from "@undrstnd/observability/log"

import { getApiKeyTierAndLimit } from "./auth"

// TODO: Move to @undrstnd/rate-limit
// Initialize Redis client
const redisClient = new Redis(process.env.REDIS_URL || "redis://localhost:6379")

interface RateLimitConfig {
  // Default rate limit for requests without API key
  defaultLimit: number
  // Default reset time in seconds (1 hour)
  resetTime: number
}

const DEFAULT_CONFIG: RateLimitConfig = {
  defaultLimit: 10, // 10 requests per hour for no API key
  resetTime: 3600, // 1 hour in seconds
}

export async function rateLimitRequest(
  request: Request,
  config: RateLimitConfig = DEFAULT_CONFIG
) {
  try {
    const apiKey = request.headers
      .get("Authorization")
      ?.replace("Bearer ", "")
      .trim()

    // If no API key, use default limit
    if (!apiKey || !apiKey.startsWith("undrstnd_")) {
      return handleRateLimit("anonymous", config.defaultLimit, config.resetTime)
    }

    // Get tier and rate limit for the API key
    const keyInfo = await getApiKeyTierAndLimit(apiKey)

    if (!keyInfo) {
      // Invalid API key, use default limit
      return handleRateLimit("anonymous", config.defaultLimit, config.resetTime)
    }

    // Use the rate limit for the API key's tier
    return handleRateLimit(apiKey, keyInfo.rateLimit, config.resetTime)
  } catch (error) {
    log.error("RATE_LIMIT_ERROR", { error })

    // On error, allow the request but log the issue
    return {
      success: true,
      response: null,
    }
  }
}

async function handleRateLimit(
  key: string,
  limit: number,
  resetTime: number
): Promise<{
  success: boolean
  response: NextResponse | null
  remaining?: number
}> {
  const bucketKey = `ratelimit:${key}`

  // Use Lua script to implement token bucket algorithm atomically
  const script = `
    local bucket = redis.call('get', KEYS[1])
    local now = tonumber(ARGV[1])
    local limit = tonumber(ARGV[2])
    local reset_time = tonumber(ARGV[3])
    
    if bucket then
      local bucket_data = cjson.decode(bucket)
      local tokens = bucket_data.tokens
      local last_refill = bucket_data.last_refill
      
      -- Calculate tokens to add based on time elapsed
      local elapsed = now - last_refill
      local tokens_to_add = math.floor(elapsed * (limit / reset_time))
      
      if tokens_to_add > 0 then
        tokens = math.min(limit, tokens + tokens_to_add)
        bucket_data.last_refill = now
      end
      
      if tokens > 0 then
        bucket_data.tokens = tokens - 1
        redis.call('set', KEYS[1], cjson.encode(bucket_data))
        return { 1, bucket_data.tokens }
      else
        return { 0, 0 }
      end
    else
      -- First request, create new bucket with max tokens - 1
      local bucket_data = {
        tokens = limit - 1,
        last_refill = now
      }
      redis.call('set', KEYS[1], cjson.encode(bucket_data))
      return { 1, limit - 1 }
    end
  `

  const now = Math.floor(Date.now() / 1000)
  const result = (await redisClient.eval(
    script,
    1,
    bucketKey,
    now.toString(),
    limit.toString(),
    resetTime.toString()
  )) as [number, number]

  const [allowed, remaining] = result

  if (allowed === 0) {
    // Request rate limited
    const response = NextResponse.json(
      { error: "Too many requests", code: "rate_limit_exceeded" },
      {
        status: 429,
        headers: {
          "X-RateLimit-Limit": limit.toString(),
          "X-RateLimit-Remaining": "0",
          "X-RateLimit-Reset": resetTime.toString(),
          "Retry-After": resetTime.toString(),
        },
      }
    )

    return {
      success: false,
      response,
    }
  }

  // Request allowed
  return {
    success: true,
    response: null,
    remaining,
  }
}

// Middleware to add rate limit headers to response
export function addRateLimitHeaders(
  response: NextResponse,
  limit: number,
  remaining: number,
  reset: number
): NextResponse {
  response.headers.set("X-RateLimit-Limit", limit.toString())
  response.headers.set("X-RateLimit-Remaining", remaining.toString())
  response.headers.set("X-RateLimit-Reset", reset.toString())

  return response
}
