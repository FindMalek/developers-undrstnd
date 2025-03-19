"use client"

import { motion } from "framer-motion"

import { useEffect, useState } from "react"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@undrstnd/design-system/components/ui/tooltip"
import { cn, formatDate } from "@undrstnd/design-system/lib/utils"

import { waitlistOpenDate } from "@/lib/config"

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

  // Get dates from waitlistOpenDate until today, organized by week
  const getCalendarData = () => {
    const today = new Date()
    const startDate = new Date(waitlistOpenDate)
    const weeks: string[][] = []
    let currentWeek: string[] = []

    // Calculate total days between waitlistOpenDate and today
    const totalDays = Math.floor(
      (today.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
    )

    // Start from waitlistOpenDate
    for (let i = 0; i <= totalDays; i++) {
      const date = new Date(startDate)
      date.setDate(startDate.getDate() + i)
      const dateString = date.toISOString().split("T")[0]

      // Determine day of week (0-6, where 0 is Sunday)
      const dayOfWeek = date.getDay()

      // Start a new week if this is the first day or if it's Sunday
      if (currentWeek.length === 0 || dayOfWeek === 0) {
        // If we're starting a new week and the current week has entries, push it
        if (currentWeek.length > 0) {
          weeks.push(currentWeek)
          currentWeek = []
        }

        // Fill in empty days at the beginning of the first week
        if (i === 0 && dayOfWeek !== 0) {
          for (let j = 0; j < dayOfWeek; j++) {
            currentWeek.push("")
          }
        }
      }

      currentWeek.push(dateString)

      // If this is the last day, push the current week
      if (i === totalDays) {
        weeks.push(currentWeek)
      }
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
    <div className="relative flex justify-center">
      <div className="hidden md:block">
        <div className="flex w-fit overflow-x-auto">
          {weeks.map((week, weekIndex) => (
            <div key={weekIndex} className="flex flex-col gap-1 px-1">
              {week.map((day, dayIndex) => {
                // Skip empty days (placeholders)
                if (day === "") {
                  return <div key={dayIndex} className="size-3" />
                }

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
    </div>
  )
}
