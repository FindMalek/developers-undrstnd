"use client"

import { motion } from "framer-motion"

import { useEffect, useState } from "react"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@undrstnd/design-system/components/ui/tooltip"
import { cn, formatDate } from "@undrstnd/design-system/lib/utils"

interface ContributionGraphProps {
  dailySignups: Record<string, number>
  userSignupDate: string
  isDuplicate: boolean
}

export function MarketingWaitlistContributionGraph({
  dailySignups,
  userSignupDate,
  isDuplicate,
}: ContributionGraphProps) {
  const [maxSignups, setMaxSignups] = useState(0)

  // Calculate the maximum number of signups in a day for color scaling
  useEffect(() => {
    const max = Math.max(...Object.values(dailySignups))
    setMaxSignups(max)
  }, [dailySignups])

  // Get dates for the last year, organized by week
  const getCalendarData = () => {
    const today = new Date()
    const weeks: string[][] = []
    let currentWeek: string[] = []

    // Start from 52 weeks ago
    for (let i = 364; i >= 0; i--) {
      const date = new Date(today)
      date.setDate(today.getDate() - i)
      const dateString = date.toISOString().split("T")[0]

      currentWeek.push(dateString)

      // Start a new week every 7 days
      if (currentWeek.length === 7) {
        weeks.push(currentWeek)
        currentWeek = []
      }
    }

    // Add any remaining days
    if (currentWeek.length > 0) {
      weeks.push(currentWeek)
    }

    return weeks
  }

  const weeks = getCalendarData()

  // Get color based on number of signups
  const getColor = (count: number) => {
    if (count === 0) return "bg-gray-800"

    const intensity = Math.min(1, count / (maxSignups * 0.7))

    if (intensity < 0.2) return "bg-green-900"
    if (intensity < 0.4) return "bg-green-800"
    if (intensity < 0.6) return "bg-green-700"
    if (intensity < 0.8) return "bg-green-600"
    return "bg-green-500"
  }

  return (
    <div className="relative">
      <div className="flex gap-4">
        {weeks.map((week, weekIndex) => (
          <div key={weekIndex} className="flex flex-col gap-1">
            {week.map((day, dayIndex) => {
              const count = dailySignups[day] || 0
              const isUserDay = day === userSignupDate

              return (
                <Tooltip key={dayIndex}>
                  <TooltipTrigger asChild>
                    <motion.div
                      key={day}
                      className={cn(
                        "size-3 cursor-pointer rounded-sm transition-transform",
                        getColor(count),
                        isUserDay && isDuplicate && "ring-2 ring-red-500",
                        isUserDay && !isDuplicate && "ring-primary ring-2"
                      )}
                      whileHover={{ scale: 1.2 }}
                    />
                  </TooltipTrigger>
                  <TooltipContent className="bg-muted-foreground text-background">
                    <p>
                      {count} signups on {formatDate(day)}.
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
