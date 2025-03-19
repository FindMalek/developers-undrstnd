import { useMemo } from "react"

import { DailySignups } from "@/types"

interface WaitlistStats {
  totalSignups: number
  userPosition: number
  dailySignups: Record<string, number>
  userSignupDate: string
}

export function useWaitlistStats(
  waitlistSignups: DailySignups[],
  alreadyJoined: Date | null
): WaitlistStats {
  return useMemo(() => {
    // Calculate total signups from the waitlistSignups array
    const totalSignups = waitlistSignups.reduce(
      (sum, day) => sum + day.count,
      0
    )

    // Convert waitlistSignups array to the format expected by the contribution graph
    const dailySignups: Record<string, number> = {}
    waitlistSignups.forEach((signup) => {
      dailySignups[signup.date] = signup.count
    })

    // Get today's date in ISO format (YYYY-MM-DD)
    const today = new Date().toISOString().split("T")[0]

    // Add one more signup for today if the user hasn't already joined
    if (!alreadyJoined && today in dailySignups) {
      dailySignups[today] += 1
    } else if (!alreadyJoined) {
      dailySignups[today] = 1
    }

    return {
      totalSignups,
      userPosition: totalSignups + (alreadyJoined ? 0 : 1),
      dailySignups,
      userSignupDate: today,
    }
  }, [waitlistSignups, alreadyJoined])
}
