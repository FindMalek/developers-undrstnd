import { WeeklySummaryService } from "@/services/weekly-summary/weekly-summary.service"

import { NextResponse } from "next/server"
import { parseError } from "@undrstnd/observability/error"
import { log } from "@undrstnd/observability/log"

import { env } from "@/env"

/**
 * Endpoint for the weekly model discovery summary cron job
 * This is called by Vercel Cron once a week
 */
export async function POST(request: Request): Promise<NextResponse> {
  try {
    const authHeader = request.headers.get("authorization")
    if (authHeader !== `Bearer ${env.CRON_SECRET}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Get email recipients from environment variable
    // Format: comma-separated list of email addresses
    const recipientEmails = env.MODEL_SUMMARY_RECIPIENTS
      ? env.MODEL_SUMMARY_RECIPIENTS.split(",").map((email) => email.trim())
      : []

    if (recipientEmails.length === 0) {
      log.warn("No recipients configured for weekly model summary")
    }

    const weeklySummaryService = new WeeklySummaryService()
    const result =
      await weeklySummaryService.processWeeklySummary(recipientEmails)

    log.info("WEEKLY_MODEL_SUMMARY_COMPLETED", {
      success: result.success,
      modelCount: result.modelCount,
      emailSent: result.emailSent,
      recipientCount: recipientEmails.length,
    })

    return NextResponse.json({
      status: result.success ? "success" : "error",
      modelCount: result.modelCount,
      emailSent: result.emailSent,
      error: result.error,
    })
  } catch (error) {
    const errorMessage = parseError(error)
    log.error("WEEKLY_MODEL_SUMMARY_CRON_ERROR", {
      error: errorMessage,
    })
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
