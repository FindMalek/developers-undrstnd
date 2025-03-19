"use client"

import { motion } from "framer-motion"

import { useEffect, useState } from "react"
import { Icons } from "@undrstnd/design-system/components/shared/icons"

import { BLUR_FADE_DELAY } from "@/lib/config"

import { MarketingWaitlistContributionGraph } from "@/components/app/marketing-waitlist-contribution-graph"

// Mock data - in a real app, this would come from your API
const mockWaitlistData = {
  totalSignups: 1247,
  userPosition: 1248,
  daysUntilLaunch: 42,
  dailySignups: generateMockDailySignups(),
  userSignupDate: new Date().toISOString().split("T")[0],
}

function generateMockDailySignups() {
  const today = new Date()
  const dailySignups: Record<string, number> = {}

  // Generate data for the last 365 days
  for (let i = 0; i < 365; i++) {
    const date = new Date(today)
    date.setDate(today.getDate() - i)
    const dateString = date.toISOString().split("T")[0]

    // Random number of signups, with more recent dates having higher probability of more signups
    const recencyFactor = Math.max(0.1, 1 - i / 365)
    const baseSignups = Math.floor(Math.random() * 10) // 0-9 base signups
    const bonusSignups =
      Math.random() < recencyFactor ? Math.floor(Math.random() * 20) : 0

    dailySignups[dateString] = baseSignups + bonusSignups
  }

  return dailySignups
}

interface WaitlistStatsProps {
  userEmail: string | null
}

export function MarketingWaitlistStats({ userEmail }: WaitlistStatsProps) {
  const [data, setData] = useState(mockWaitlistData)
  const [isUserDuplicate, setIsUserDuplicate] = useState(false)

  useEffect(() => {
    const isDuplicate = Math.random() < 0.2
    setIsUserDuplicate(isDuplicate)
  }, [userEmail])

  return (
    <>
      <motion.div
        className="flex w-full flex-col gap-4 pt-4 text-center sm:gap-6"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: BLUR_FADE_DELAY, duration: 0.5 }}
      >
        <div className="w-full space-y-2 px-2 text-center sm:px-0">
          <h3 className="text-foreground text-lg font-semibold sm:text-xl">
            {isUserDuplicate
              ? "You have already joined our waitlist!"
              : "Thanks for joining our waitlist!"}
          </h3>

          <div className="text-muted-foreground flex w-full flex-wrap items-center justify-center gap-1 text-center text-sm sm:text-base">
            <span>We have</span>
            <Icons.users className="text-primary mx-1 hidden size-4 sm:mx-2 sm:size-5 md:block" />
            <strong className="text-foreground mr-1">
              {data.totalSignups.toLocaleString()}
            </strong>
            <span>developers have joined, and you're number</span>
            <Icons.logo className="text-primary mx-1 hidden size-4 sm:mx-2 sm:size-5 md:block" />
            <strong className="text-foreground mr-1">
              {data.userPosition.toLocaleString()}
            </strong>
            <span>in line.</span>
          </div>
        </div>

        <MarketingWaitlistContributionGraph
          dailySignups={data.dailySignups}
          userSignupDate={data.userSignupDate}
          isDuplicate={isUserDuplicate}
        />
      </motion.div>
    </>
  )
}
