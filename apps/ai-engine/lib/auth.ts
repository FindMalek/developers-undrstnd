import { createHash, randomBytes } from "crypto"

import { db } from "@undrstnd/database"
import { parseError } from "@undrstnd/observability/error"
import { log } from "@undrstnd/observability/log"

// API key format: undrstnd_{random32}
export function generateApiKey(): string {
  const random = randomBytes(16).toString("hex")
  return `undrstnd_${random}`
}

// Hash API key for secure storage
export function hashApiKey(apiKey: string): string {
  return createHash("sha256").update(apiKey).digest("hex")
}

// Verify if an API key is valid
export async function verifyKey(authHeader: string): Promise<boolean> {
  try {
    // Extract API key from Authorization header
    const apiKey = authHeader.replace("Bearer ", "").trim()

    if (!apiKey || !apiKey.startsWith("undrstnd_")) {
      return false
    }

    // Hash the provided key to look up in the database
    const hashedKey = hashApiKey(apiKey)

    // Look up the key in the database
    const key = await db.aPIKey.findUnique({
      where: { key: hashedKey },
    })

    // Key doesn't exist or is revoked
    if (!key || key.isRevoked) {
      const message = parseError(new Error("Invalid API key"))
      log.error("API_KEY_VERIFICATION_FAILED", { error: message })
      return false
    }

    // Update lastUsedAt timestamp
    await db.aPIKey.update({
      where: { id: key.id },
      data: { lastUsedAt: new Date() },
    })

    return true
  } catch (error) {
    const message = parseError(error)
    log.error("API_KEY_VERIFICATION_FAILED", { error: message })
    return false
  }
}

// Get the tier and rate limit for an API key
export async function getApiKeyTierAndLimit(
  apiKey: string
): Promise<{ tier: string; rateLimit: number } | null> {
  try {
    const hashedKey = hashApiKey(apiKey)

    const key = await db.aPIKey.findUnique({
      where: { key: hashedKey },
    })

    if (!key || key.isRevoked) {
      const message = parseError(new Error("Invalid API key"))
      log.error("API_KEY_TIER_LOOKUP_FAILED", { error: message })
      return null
    }

    return {
      tier: key.tier,
      rateLimit: key.rateLimit,
    }
  } catch (error) {
    const message = parseError(error)
    log.error("API_KEY_TIER_LOOKUP_FAILED", { error: message })
    return null
  }
}

// Create a new API key
export async function createApiKey(
  name: string,
  tier: "FREE" | "PRO" | "ENTERPRISE",
  userId?: string
) {
  const newKey = generateApiKey()
  const hashedKey = hashApiKey(newKey)

  // Set rate limit based on tier
  let rateLimit = 100 // Default FREE tier: 100 req/hour

  if (tier === "PRO") {
    rateLimit = 1000
  } else if (tier === "ENTERPRISE") {
    rateLimit = 10000
  }

  // Create the key in the database
  const apiKey = await db.aPIKey.create({
    data: {
      key: hashedKey,
      name,
      tier,
      userId,
      rateLimit,
    },
  })

  // Return the unhashed key to be shown to the user once
  return {
    id: apiKey.id,
    key: newKey, // Return the unhashed key
    tier: apiKey.tier,
    rateLimit: apiKey.rateLimit,
  }
}

// Revoke an API key
export async function revokeApiKey(keyId: string) {
  return await db.aPIKey.update({
    where: { id: keyId },
    data: { isRevoked: true },
  })
}
