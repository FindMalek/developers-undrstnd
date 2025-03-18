"use client"

import { motion } from "framer-motion"

import { useEffect, useState } from "react"
import { Icons } from "@undrstnd/design-system/components/shared/icons"

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

  // Simulate checking if user is a duplicate (in a real app, this would be done server-side)
  useEffect(() => {
    // 20% chance the user is a duplicate for demo purposes
    const isDuplicate = Math.random() < 0.2
    setIsUserDuplicate(isDuplicate)
  }, [userEmail])

  return (
    <>
      <motion.div
        className="flex flex-col gap-6"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <div>
          <h3 className="text-foreground text-xl font-medium">
            Waitlist Status
          </h3>
          <p className="text-muted-foreground">
            {isUserDuplicate
              ? "You've already joined with another email."
              : "Thanks for joining our waitlist!"}
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <Icons.users className="text-primary size-5" />
            <span className="text-foreground">
              <strong>{data.totalSignups.toLocaleString()}</strong> developers
              have joined
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Icons.logo className="text-primary size-5" />
            <span
              className={isUserDuplicate ? "text-red-500" : "text-foreground"}
            >
              Your position:{" "}
              <strong>
                #{isUserDuplicate ? "Duplicate" : data.userPosition}
              </strong>
            </span>
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
