"use client"

import { motion } from "framer-motion"

import { useMemo } from "react"
import { Icons } from "@undrstnd/design-system/components/shared/icons"

import { DailySignups } from "@/types"

import { useMobile } from "@/hooks/use-mobile"
import { useWaitlistStats } from "@/hooks/use-waitlist-stats"
import { BLUR_FADE_DELAY } from "@/lib/config"

import { MarketingWaitlistContributionGraph } from "@/components/app/marketing-waitlist-contribution-graph"

interface WaitlistStatsProps {
  alreadyJoined: Date | null
  waitlistSignups: DailySignups[]
}

export function MarketingWaitlistStats({
  alreadyJoined,
  waitlistSignups,
}: WaitlistStatsProps) {
  const isMobile = useMobile()
  const waitlistData = useWaitlistStats(waitlistSignups, alreadyJoined)

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
            {alreadyJoined
              ? "You have already joined our waitlist!"
              : "Thanks for joining our waitlist!"}
          </h3>

          <div className="text-muted-foreground flex w-full flex-wrap items-center justify-center gap-1 text-center text-sm sm:text-base">
            <span>We have</span>
            <Icons.users className="text-primary mx-1 hidden size-4 sm:mx-2 sm:size-5 md:block" />
            <strong className="text-foreground mr-1">
              {waitlistData.totalSignups.toLocaleString()}
            </strong>
            <span>developers have joined, and you're number</span>
            <Icons.logo className="text-primary mx-1 hidden size-4 sm:mx-2 sm:size-5 md:block" />
            <strong className="text-foreground mr-1">
              {waitlistData.userPosition.toLocaleString()}
            </strong>
            <span>in line.</span>
          </div>
        </div>

        {!isMobile ? (
          <MarketingWaitlistContributionGraph
            dailySignups={waitlistData.dailySignups}
            alreadyJoined={alreadyJoined}
          />
        ) : null}
      </motion.div>
    </>
  )
}
