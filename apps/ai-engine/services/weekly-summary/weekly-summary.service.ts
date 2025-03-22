import { getWeekDateRange } from "@/utils/date-utils"

import { database } from "@undrstnd/database"
import { formatDate } from "@undrstnd/design-system/lib/utils"
import { resend } from "@undrstnd/email"
import { parseError } from "@undrstnd/observability/error"
import { log } from "@undrstnd/observability/log"

interface IWeeklySummaryResult {
  success: boolean
  modelCount: number
  emailSent: boolean
  error?: string
}

export class WeeklySummaryService {
  /**
   * Formats a BigInt parameter value to a human-readable string
   */
  private formatParameters(parameters?: bigint | null): string | undefined {
    if (!parameters) return undefined

    // Format as billions (B) or millions (M)
    if (parameters >= BigInt(1000000000)) {
      const billions = Number(parameters) / 1000000000
      return `${billions.toFixed(billions < 10 ? 1 : 0)}B`
    } else if (parameters >= BigInt(1000000)) {
      const millions = Number(parameters) / 1000000
      return `${millions.toFixed(millions < 10 ? 1 : 0)}M`
    }

    return parameters.toString()
  }

  /**
   * Processes newly discovered models and sends a weekly summary email
   */
  public async processWeeklySummary(
    recipientEmails: string[]
  ): Promise<IWeeklySummaryResult> {
    const result: IWeeklySummaryResult = {
      success: false,
      modelCount: 0,
      emailSent: false,
    }

    try {
      // Find all newly discovered models that haven't been included in a summary yet
      const discoveries = await database.modelDiscovery.findMany({
        where: {
          notifiedInSummary: false,
        },
        orderBy: {
          discoveredAt: "desc",
        },
      })

      result.modelCount = discoveries.length
      log.info("Found new model discoveries for weekly summary", {
        count: discoveries.length,
      })

      // Create a weekly summary record
      const summary = await database.weeklySummary.create({
        data: {
          modelCount: discoveries.length,
          sent: false,
        },
      })

      // Only send an email if there are new models to report
      // or if it's been a week since the last summary email
      const shouldSendEmail =
        discoveries.length > 0 || this.shouldSendEmptyReport()

      if (shouldSendEmail && recipientEmails.length > 0) {
        const { startDate, endDate } = getWeekDateRange()

        const emailResult = await resend.sendWeeklyModelsSummary({
          recipients: recipientEmails,
          models: discoveries.map((discovery) => ({
            modelName: discovery.modelName,
            providerName: discovery.providerName,
            parameters: this.formatParameters(discovery.parameters),
            discoveredAt: formatDate(discovery.discoveredAt),
          })),
          weekStartDate: formatDate(startDate),
          weekEndDate: formatDate(endDate),
        })

        result.emailSent = emailResult.success

        // Update the summary record with the result
        await database.weeklySummary.update({
          where: { id: summary.id },
          data: { sent: emailResult.success },
        })

        if (emailResult.success) {
          // Mark all discoveries as notified
          await database.modelDiscovery.updateMany({
            where: { id: { in: discoveries.map((d) => d.id) } },
            data: { notifiedInSummary: true },
          })

          log.info("Weekly summary email sent successfully", {
            summaryId: summary.id,
            modelCount: discoveries.length,
            recipientCount: recipientEmails.length,
          })
        } else {
          result.error = emailResult.error
          log.error("Failed to send weekly summary email", {
            error: emailResult.error,
            summaryId: summary.id,
          })
        }
      } else if (!shouldSendEmail) {
        // No email needed this week
        await database.weeklySummary.update({
          where: { id: summary.id },
          data: { sent: true }, // Mark as sent even though we didn't send an email
        })
        log.info("No email needed for weekly summary", {
          summaryId: summary.id,
          modelCount: discoveries.length,
        })
        result.emailSent = true // Consider it a success
      } else {
        log.warn("No recipients for weekly summary email", {
          summaryId: summary.id,
        })
        result.error = "No recipients provided"
      }

      result.success = true
    } catch (error) {
      const message = parseError(error)
      log.error("WEEKLY_SUMMARY_ERROR", {
        error: message,
      })
      result.error = message
    }

    return result
  }

  /**
   * Determines if we should send an empty report based on the time since the last report
   */
  private shouldSendEmptyReport(): boolean {
    // Always send a weekly report, even if empty
    // This could be enhanced to check when the last summary was sent
    return true
  }
}
