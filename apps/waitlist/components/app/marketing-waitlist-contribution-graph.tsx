"use client"

import { motion } from "framer-motion"

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@undrstnd/design-system/components/ui/tooltip"
import { cn } from "@undrstnd/design-system/lib/utils"

import { useContributionCalendar } from "@/hooks/use-contribution-calendar"
import {
  ContributionDay,
  formatContributionTooltip,
  isUserSignupDay,
} from "@/lib/contribution-utils"

interface ContributionGraphProps {
  dailySignups: Record<string, number>
  alreadyJoined: Date | null
}

export function MarketingWaitlistContributionGraph({
  dailySignups,
  alreadyJoined,
}: ContributionGraphProps) {
  const { weeks, getColor } = useContributionCalendar({ dailySignups })

  return (
    <div className="relative flex justify-center">
      <div className="flex w-fit overflow-x-auto">
        {weeks.map((week, weekIndex) => (
          <div key={weekIndex} className="flex flex-col gap-1 px-1">
            {week.map((day, dayIndex) => {
              if (day === "") {
                return <div key={dayIndex} className="size-3" />
              }

              const count = dailySignups[day] || 0
              const isUserDay = isUserSignupDay(day, alreadyJoined)
              const contributionDay: ContributionDay = {
                date: day,
                count,
                isUserDay,
              }

              return (
                <Tooltip key={dayIndex}>
                  <TooltipTrigger asChild>
                    <motion.div
                      className={cn(
                        "size-3 cursor-pointer rounded-sm transition-transform",
                        getColor(count),
                        isUserDay && alreadyJoined && "bg-amber-500 ring-2"
                      )}
                      whileHover={{ scale: 1.2 }}
                    />
                  </TooltipTrigger>
                  <TooltipContent className="bg-muted-foreground text-background">
                    <p>
                      {formatContributionTooltip(
                        contributionDay,
                        alreadyJoined
                      )}
                    </p>
                  </TooltipContent>
                </Tooltip>
              )
            })}
          </div>
        ))}
      </div>
    </div>
  )
}
