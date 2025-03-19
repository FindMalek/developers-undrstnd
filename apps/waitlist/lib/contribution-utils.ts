import { formatDate } from "@undrstnd/design-system/lib/utils"

export interface ContributionDay {
  date: string
  count: number
  isUserDay: boolean
}

export function formatContributionTooltip(
  day: ContributionDay,
  alreadyJoined: Date | null
): string {
  if (day.isUserDay && alreadyJoined) {
    return `You joined on ${formatDate(alreadyJoined)}.`
  }
  return `${day.count} signups on ${formatDate(day.date)}.`
}

export function isUserSignupDay(
  date: string,
  alreadyJoined: Date | null
): boolean {
  if (!alreadyJoined) return false
  return date === alreadyJoined.toISOString().split("T")[0]
}
