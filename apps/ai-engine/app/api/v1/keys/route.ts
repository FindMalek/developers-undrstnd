import { ApiKeyTier } from "@prisma/client"
import * as Sentry from "@sentry/nextjs"

import { NextRequest, NextResponse } from "next/server"
import { db } from "@undrstnd/database"
import { log } from "@undrstnd/observability"

import { createApiKey, revokeApiKey, verifyKey } from "@/lib/auth"

// Create a new API key
export async function POST(request: NextRequest) {
  const requestId = crypto.randomUUID()

  try {
    log.info("API_KEY_CREATE_REQUEST", { requestId })

    // Verify admin auth (in a real app, you'd check for admin permissions)
    const authHeader = request.headers.get("Authorization")
    if (!authHeader) {
      return NextResponse.json(
        {
          error: {
            message: "Authorization required",
            type: "authentication_error",
          },
        },
        { status: 401 }
      )
    }

    const isValidKey = await verifyKey(authHeader)
    if (!isValidKey) {
      return NextResponse.json(
        { error: { message: "Invalid API key", type: "authentication_error" } },
        { status: 401 }
      )
    }

    // Parse request body
    const body = await request.json()

    // Validate required fields
    if (!body.name) {
      return NextResponse.json(
        {
          error: { message: "Name is required", type: "invalid_request_error" },
        },
        { status: 400 }
      )
    }

    // Validate tier
    const tier = (body.tier || "FREE").toUpperCase()
    if (!["FREE", "PRO", "ENTERPRISE"].includes(tier)) {
      return NextResponse.json(
        { error: { message: "Invalid tier", type: "invalid_request_error" } },
        { status: 400 }
      )
    }

    // Create a new API key
    const apiKey = await createApiKey(
      body.name,
      tier as ApiKeyTier,
      body.userId
    )

    // Return the API key (this is the only time the unhashed key will be shown)
    return NextResponse.json({
      id: apiKey.id,
      key: apiKey.key,
      name: body.name,
      tier: apiKey.tier,
      rateLimit: apiKey.rateLimit,
    })
  } catch (error) {
    log.error("API_KEY_CREATE_ERROR", { error, requestId })

    Sentry.captureException(error, {
      tags: { endpoint: "/v1/keys", requestId },
    })

    return NextResponse.json(
      {
        error: {
          message: "An error occurred while creating API key",
          type: "service_error",
        },
      },
      { status: 500 }
    )
  }
}

// List API keys (with pagination)
export async function GET(request: NextRequest) {
  const requestId = crypto.randomUUID()

  try {
    log.info("API_KEY_LIST_REQUEST", { requestId })

    // Verify admin auth
    const authHeader = request.headers.get("Authorization")
    if (!authHeader) {
      return NextResponse.json(
        {
          error: {
            message: "Authorization required",
            type: "authentication_error",
          },
        },
        { status: 401 }
      )
    }

    const isValidKey = await verifyKey(authHeader)
    if (!isValidKey) {
      return NextResponse.json(
        { error: { message: "Invalid API key", type: "authentication_error" } },
        { status: 401 }
      )
    }

    // Parse query parameters
    const { searchParams } = new URL(request.url)
    const limit = Number(searchParams.get("limit") || "50")
    const offset = Number(searchParams.get("offset") || "0")
    const userId = searchParams.get("userId")

    // Get keys with pagination
    const keys = await db.aPIKey.findMany({
      where: userId ? { userId } : undefined,
      take: Math.min(limit, 100), // Cap at 100 items
      skip: offset,
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        name: true,
        tier: true,
        rateLimit: true,
        createdAt: true,
        lastUsedAt: true,
        isRevoked: true,
        userId: true,
      },
    })

    // Count total
    const total = await db.aPIKey.count({
      where: userId ? { userId } : undefined,
    })

    return NextResponse.json({
      data: keys,
      meta: {
        total,
        limit,
        offset,
      },
    })
  } catch (error) {
    log.error("API_KEY_LIST_ERROR", { error, requestId })

    Sentry.captureException(error, {
      tags: { endpoint: "/v1/keys", requestId },
    })

    return NextResponse.json(
      {
        error: {
          message: "An error occurred while listing API keys",
          type: "service_error",
        },
      },
      { status: 500 }
    )
  }
}

// Delete/revoke an API key
export async function DELETE(request: NextRequest) {
  const requestId = crypto.randomUUID()

  try {
    log.info("API_KEY_REVOKE_REQUEST", { requestId })

    // Verify admin auth
    const authHeader = request.headers.get("Authorization")
    if (!authHeader) {
      return NextResponse.json(
        {
          error: {
            message: "Authorization required",
            type: "authentication_error",
          },
        },
        { status: 401 }
      )
    }

    const isValidKey = await verifyKey(authHeader)
    if (!isValidKey) {
      return NextResponse.json(
        { error: { message: "Invalid API key", type: "authentication_error" } },
        { status: 401 }
      )
    }

    // Get key ID from query parameter
    const { searchParams } = new URL(request.url)
    const keyId = searchParams.get("id")

    if (!keyId) {
      return NextResponse.json(
        {
          error: {
            message: "Key ID is required",
            type: "invalid_request_error",
          },
        },
        { status: 400 }
      )
    }

    // Revoke the key
    await revokeApiKey(keyId)

    return NextResponse.json({ success: true })
  } catch (error) {
    log.error("API_KEY_REVOKE_ERROR", { error, requestId })

    Sentry.captureException(error, {
      tags: { endpoint: "/v1/keys", requestId },
    })

    return NextResponse.json(
      {
        error: {
          message: "An error occurred while revoking API key",
          type: "service_error",
        },
      },
      { status: 500 }
    )
  }
}
