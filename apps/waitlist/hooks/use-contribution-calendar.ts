import { useEffect, useState } from "react"

import { waitlistOpenDate } from "@/lib/config"

interface UseContributionCalendarProps {
  dailySignups: Record<string, number>
}

interface ContributionCalendarData {
  weeks: string[][]
  maxSignups: number
  getColor: (count: number) => string
}

export function useContributionCalendar({
  dailySignups,
}: UseContributionCalendarProps): ContributionCalendarData {
  const [maxSignups, setMaxSignups] = useState(0)

  useEffect(() => {
    const max = Math.max(...Object.values(dailySignups))
    setMaxSignups(max)
  }, [dailySignups])

  const getCalendarData = () => {
    const today = new Date()
    const startDate = new Date(waitlistOpenDate)
    const weeks: string[][] = []
    let currentWeek: string[] = []

    const totalDays = Math.floor(
      (today.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
    )

    for (let i = 0; i <= totalDays; i++) {
      const date = new Date(startDate)
      date.setDate(startDate.getDate() + i)
      const dateString = date.toISOString().split("T")[0]
      const dayOfWeek = date.getDay()

      if (currentWeek.length === 0 || dayOfWeek === 0) {
        if (currentWeek.length > 0) {
          weeks.push(currentWeek)
          currentWeek = []
        }

        if (i === 0 && dayOfWeek !== 0) {
          for (let j = 0; j < dayOfWeek; j++) {
            currentWeek.push("")
          }
        }
      }

      currentWeek.push(dateString)

      if (i === totalDays) {
        weeks.push(currentWeek)
      }
    }

    return weeks
  }

  const getColor = (count: number) => {
    if (count === 0) return "bg-gray-800"

    const intensity = Math.min(1, count / (maxSignups * 0.7))

    if (intensity < 0.2) return "bg-green-900"
    if (intensity < 0.4) return "bg-green-800"
    if (intensity < 0.6) return "bg-green-700"
    if (intensity < 0.8) return "bg-green-600"
    return "bg-green-500"
  }

  return {
    weeks: getCalendarData(),
    maxSignups,
    getColor,
  }
}
