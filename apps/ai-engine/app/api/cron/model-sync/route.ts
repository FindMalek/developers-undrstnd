import {
  linkSiblingModels,
  syncModelsFromProviders,
} from "@/services/model-sync"

import { NextResponse } from "next/server"
import { parseError } from "@undrstnd/observability/error"
import { log } from "@undrstnd/observability/log"

import { verifyKey } from "@/lib/auth"

// This route is intended to be called by a scheduler every 3 days
export async function POST(request: Request) {
  try {
    // Verify request has appropriate auth
    const authHeader = request.headers.get("Authorization")
    if (!authHeader) {
      return NextResponse.json(
        { error: "Missing authorization header" },
        { status: 401 }
      )
    }

    const isValid = await verifyKey(authHeader)
    if (!isValid) {
      const message = parseError(new Error("Invalid authorization"))
      log.error("CRON_MODEL_SYNC_INVALID_AUTHORIZATION", { error: message })
      return NextResponse.json({ error: message }, { status: 403 })
    }

    // Start the sync process
    log.info("CRON_MODEL_SYNC_STARTED")

    await syncModelsFromProviders()
    await linkSiblingModels()

    log.info("CRON_MODEL_SYNC_COMPLETED")

    return NextResponse.json({ success: true })
  } catch (error) {
    const message = parseError(error)
    log.error("CRON_MODEL_SYNC_FAILED", { error: message })

    return NextResponse.json(
      { error: "Failed to sync models" },
      { status: 500 }
    )
  }
}
