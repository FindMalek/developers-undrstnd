"use server"

import { headers } from "next/headers"
import { analytics } from "@undrstnd/analytics/posthog/server"
import { database } from "@undrstnd/database"
import { resend } from "@undrstnd/email"
import { parseError } from "@undrstnd/observability/error"
import { log } from "@undrstnd/observability/log"

import type { DailySignups, ResponseWaitlist, WaitlistUserInfo } from "@/types"

async function getCountryFromIP(ip: string): Promise<string> {
  try {
    const response = await fetch(`http://ip-api.com/json/${ip}`)
    log.info("Country from IP", { ip })
    const data = await response.json()
    return data.countryCode?.toLowerCase() || "unknown"
  } catch (error) {
    const errorMessage = parseError(error)
    log.info("Error getting country from IP", { error: errorMessage })
    return "unknown"
  }
}

async function getClientIP(): Promise<string> {
  try {
    const headersList = await headers()
    const realIP = headersList.get("x-real-ip") || ""
    const forwardedFor = headersList.get("x-forwarded-for") || ""

    if (forwardedFor) {
      log.info("Forwarded for", { forwardedFor })
      const ipList = forwardedFor.split(",")
      return ipList[0].trim()
    }

    if (realIP) {
      log.info("Real IP", { realIP })
      return realIP.trim()
    }

    return "0.0.0.0"
  } catch (error) {
    const errorMessage = parseError(error)
    log.info("Error getting client IP", { error: errorMessage })
    return "0.0.0.0"
  }
}

export async function addWaitlist(email: string) {
  const ip = await getClientIP()
  const country = await getCountryFromIP(ip)

  log.info("Adding waitlist", { ip, country })

  return await database.waitlist.create({
    data: {
      ip,
      email,
      country,
    },
  })
}

export async function isOnWaitlist(email: string) {
  log.info("Checking if email is on waitlist", { email })
  const waitlist = await database.waitlist.findUnique({
    where: {
      email,
    },
  })

  return waitlist
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
        alreadyJoined: exists.createdAt,
        warning: "Email is already on the waitlist",
      }
    }

    await addWaitlist(email)

    const emailResult = await resend.sendWaitlistJoinedEmail({ email })

    log.info("Waitlist Email Added", { email })
    if (!emailResult.success) {
      const error = parseError(emailResult.error)
      log.info("Failed to send waitlist joined email", { error })
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
    log.info("Failed to add to waitlist", { error: errorMessage })
    return {
      success: false,
      error: "Failed to add to waitlist",
    }
  }
}

export async function getWaitlistSignupsByDate(): Promise<DailySignups[]> {
  log.info("Getting waitlist signups by date")

  try {
    const waitlistEntries = await database.waitlist.findMany({
      select: {
        createdAt: true,
      },
      orderBy: {
        createdAt: "asc",
      },
    })

    const signupsByDate = new Map<string, number>()

    for (const entry of waitlistEntries) {
      // Format date as YYYY-MM-DD
      const date = entry.createdAt.toISOString().split("T")[0]

      if (signupsByDate.has(date)) {
        signupsByDate.set(date, signupsByDate.get(date)! + 1)
      } else {
        signupsByDate.set(date, 1)
      }
    }

    // TODO: add this to the `@undrstnd/common/entites/waitlist` package
    const result: DailySignups[] = Array.from(signupsByDate.entries()).map(
      ([date, count]) => ({
        date,
        count,
      })
    )

    return result
  } catch (error) {
    const errorMessage = parseError(error)
    log.info("Error getting waitlist signups by date", { error: errorMessage })
    return []
  }
}

export async function getWaitlistUserInfo(
  email: string
): Promise<WaitlistUserInfo | null> {
  log.info("Getting waitlist user info", { email })

  try {
    const waitlistEntry = await database.waitlist.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
        createdAt: true,
      },
    })

    if (!waitlistEntry) {
      return null
    }

    return {
      id: waitlistEntry.id,
      signupDate: waitlistEntry.createdAt,
    }
  } catch (error) {
    const errorMessage = parseError(error)
    log.info("Error getting waitlist user info", { error: errorMessage })
    return null
  }
}
