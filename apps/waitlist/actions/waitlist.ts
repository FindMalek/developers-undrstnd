"use server"

import { headers } from "next/headers"
import { analytics } from "@undrstnd/analytics/posthog/server"
import { database } from "@undrstnd/database"
import { resend } from "@undrstnd/email"
import { parseError } from "@undrstnd/observability/error"
import { log } from "@undrstnd/observability/log"

import type { ResponseWaitlist } from "@/types"

async function getCountryFromIP(ip: string): Promise<string> {
  try {
    const response = await fetch(`http://ip-api.com/json/${ip}`)
    const data = await response.json()
    return data.countryCode?.toLowerCase() || "unknown"
  } catch (error) {
    return "unknown"
  }
}

async function getClientIP(): Promise<string> {
  try {
    const headersList = await headers()
    const realIP = headersList.get("x-real-ip") || ""
    const forwardedFor = headersList.get("x-forwarded-for") || ""

    if (forwardedFor) {
      const ipList = forwardedFor.split(",")
      return ipList[0].trim()
    }

    if (realIP) {
      return realIP.trim()
    }

    return "0.0.0.0"
  } catch (error) {
    return "0.0.0.0"
  }
}

export async function addWaitlist(email: string) {
  const ip = await getClientIP()
  const country = await getCountryFromIP(ip)

  return await database.waitlist.create({
    data: {
      ip,
      email,
      country,
    },
  })
}

export async function isOnWaitlist(email: string) {
  const waitlist = await database.waitlist.findUnique({
    where: {
      email,
    },
  })

  return !!waitlist
}

export async function addWaitlistAndSendEmail(
  email: string
): Promise<ResponseWaitlist> {
  log.info("Adding waitlist and sending email", { email })

  try {
    const exists = await isOnWaitlist(email)
    if (exists) {
      analytics.capture({
        event: "Waitlist Email Already Exists",
        distinctId: email,
      })
      log.info("Waitlist Email Already Exists", { email })
      return {
        success: true,
        warning: "Email is already on the waitlist",
      }
    }

    await addWaitlist(email)

    const emailResult = await resend.sendWaitlistJoinedEmail({ email })

    log.info("Waitlist Email Added", { email })
    if (!emailResult.success) {
      const error = parseError(emailResult.error)
      log.error("Failed to send waitlist joined email", { error })
      return {
        success: true,
        warning: "Added to waitlist but failed to send email",
      }
    }

    analytics.capture({
      event: "Waitlist Email Added",
      distinctId: email,
    })

    return {
      success: true,
    }
  } catch (error) {
    const errorMessage = parseError(error)
    log.error("Failed to add to waitlist", { error: errorMessage })
    return {
      success: false,
      error: "Failed to add to waitlist",
    }
  }
}
