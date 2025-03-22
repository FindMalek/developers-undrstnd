import { Resend } from "resend"

import { parseError } from "@undrstnd/observability/error"
import { log } from "@undrstnd/observability/log"

import { keys } from "./keys"
import { NewModelsSummary } from "./templates/new-models-summary"
import { WelcomeWaitlist } from "./templates/welcome-waitlist"

interface ResendServiceResult {
  success: boolean
  error?: string
}

interface ModelDiscoveryItem {
  modelName: string
  providerName: string
  parameters?: string
  discoveredAt: string
}

/**
 * Service class for handling email operations using Resend
 */
export class ResendService {
  private client: Resend
  private defaultFrom: string

  constructor() {
    const { RESEND_TOKEN, RESEND_FROM } = keys()
    this.client = new Resend(RESEND_TOKEN)
    this.defaultFrom = `Undrstnd Developers <${RESEND_FROM}>`
  }

  /**
   * Sends a welcome email to users who join the waitlist
   */
  async sendWaitlistJoinedEmail({
    email,
  }: {
    email: string
  }): Promise<ResendServiceResult> {
    try {
      const result = await this.client.emails.send({
        from: this.defaultFrom,
        to: email,
        subject: "Welcome to Undrstnd Developers Waitlist",
        react: <WelcomeWaitlist />,
      })

      if (result.error) {
        return {
          success: false,
          error: result.error.message,
        }
      }

      log.info("Waitlist joined email sent successfully", { email })
      return {
        success: true,
      }
    } catch (error) {
      const errorMessage = parseError(error)
      log.info("Failed to send waitlist joined email:", {
        error: errorMessage,
        email,
      })
      return {
        success: false,
        error: errorMessage,
      }
    }
  }

  /**
   * Sends a weekly summary of newly discovered models
   */
  async sendWeeklyModelsSummary({
    recipients,
    models,
    weekStartDate,
    weekEndDate,
  }: {
    recipients: string[]
    models: ModelDiscoveryItem[]
    weekStartDate: string
    weekEndDate: string
  }): Promise<ResendServiceResult> {
    try {
      if (recipients.length === 0) {
        log.warn("No recipients provided for weekly models summary")
        return {
          success: false,
          error: "No recipients provided",
        }
      }

      const result = await this.client.emails.send({
        from: this.defaultFrom,
        to: recipients,
        subject: `${models.length} new AI models discovered this week!`,
        react: (
          <NewModelsSummary
            models={models}
            weekStartDate={weekStartDate}
            weekEndDate={weekEndDate}
          />
        ),
      })

      if (result.error) {
        return {
          success: false,
          error: result.error.message,
        }
      }

      log.info("Weekly models summary email sent successfully", {
        recipientCount: recipients.length,
        modelCount: models.length,
      })
      return {
        success: true,
      }
    } catch (error) {
      const errorMessage = parseError(error)
      log.error("Failed to send weekly models summary email", {
        error: errorMessage,
        recipientCount: recipients.length,
      })
      return {
        success: false,
        error: errorMessage,
      }
    }
  }
}

export const resend = new ResendService()
