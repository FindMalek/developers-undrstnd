import { ModelSyncService } from "@/services/model-sync/model-sync.service"

import { NextResponse } from "next/server"
import { parseError } from "@undrstnd/observability/error"
import { log } from "@undrstnd/observability/log"

import { env } from "@/env"

export async function POST(request: Request): Promise<NextResponse> {
  try {
    const authHeader = request.headers.get("authorization")
    if (authHeader !== `Bearer ${env.CRON_SECRET}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const modelSyncService = new ModelSyncService()
    const results = await modelSyncService.syncAllProviders()

    log.info("MODEL_SYNC_COMPLETED", {
      results: results.map((result) => ({
        providerId: result.providerId,
        newModels: result.newModels,
        updatedModels: result.updatedModels,
        hasErrors: result.errors && result.errors.length > 0,
      })),
    })

    return NextResponse.json({
      status: "success",
      results,
    })
  } catch (error) {
    const errorMessage = parseError(error)
    log.error("MODEL_SYNC_CRON_ERROR", {
      error: errorMessage,
    })
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
