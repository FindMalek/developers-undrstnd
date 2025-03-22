import { NextResponse } from "next/server"
import { log } from "@undrstnd/observability"

import { ModelSyncService } from "../../../../services/model-sync/model-sync.service"

// This endpoint should be protected by a cron job secret
const CRON_SECRET = process.env.CRON_SECRET

export async function POST(request: Request) {
  try {
    // Verify the cron job secret
    const authHeader = request.headers.get("authorization")
    if (authHeader !== `Bearer ${CRON_SECRET}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const modelSyncService = new ModelSyncService()
    const results = await modelSyncService.syncAllProviders()

    // Log the sync results
    log.info("MODEL_SYNC_COMPLETED", {
      results: results.map((result) => ({
        providerId: result.providerId,
        newModels: result.newModels,
        updatedModels: result.updatedModels,
        hasErrors: result.errors && result.errors.length > 0,
      })),
    })

    // Log any errors separately for better visibility
    results.forEach((result) => {
      if (result.errors?.length) {
        log.error("MODEL_SYNC_PROVIDER_ERRORS", {
          providerId: result.providerId,
          errors: result.errors,
        })
      }
    })

    return NextResponse.json({
      status: "success",
      results,
    })
  } catch (error) {
    log.error("MODEL_SYNC_CRON_ERROR", {
      error: error instanceof Error ? error.message : "Unknown error",
    })

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
