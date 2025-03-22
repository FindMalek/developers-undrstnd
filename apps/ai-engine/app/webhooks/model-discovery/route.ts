import { NextResponse } from "next/server"
import { parseError } from "@undrstnd/observability/error"
import { log } from "@undrstnd/observability/log"

export async function POST(request: Request) {
  try {
    const payload = await request.json()

    // Log the model discovery event
    log.info("MODEL_DISCOVERED", {
      modelId: payload.model_id,
      provider: payload.provider,
      externalId: payload.external_id,
      timestamp: payload.timestamp,
    })

    // Here you could add additional logic like:
    // - Notifying administrators
    // - Triggering automated testing of the new model
    // - Updating documentation
    // - etc.

    return NextResponse.json({ status: "success" })
  } catch (error) {
    const message = parseError(error)
    log.error("MODEL_DISCOVERY_WEBHOOK_ERROR", {
      error: message,
    })

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
