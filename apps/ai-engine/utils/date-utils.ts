/**
 * Gets the start and end dates for the current week
 * (Sunday to Saturday)
 */
export function getWeekDateRange(): { startDate: Date; endDate: Date } {
  const now = new Date()
  const currentDay = now.getDay() // 0 = Sunday, 6 = Saturday

  // Calculate days to go back to find Sunday (start of week)
  const daysToSunday = currentDay
  const startDate = new Date(now)
  startDate.setDate(now.getDate() - daysToSunday)
  startDate.setHours(0, 0, 0, 0)

  // Calculate days to go forward to find Saturday (end of week)
  const daysToSaturday = 6 - currentDay
  const endDate = new Date(now)
  endDate.setDate(now.getDate() + daysToSaturday)
  endDate.setHours(23, 59, 59, 999)

  return { startDate, endDate }
}

/**
 * Gets the start and end dates for the previous week
 * (Sunday to Saturday)
 */
export function getPreviousWeekDateRange(): { startDate: Date; endDate: Date } {
  const { startDate } = getWeekDateRange()

  // Go back 7 days from the start of this week to get the start of last week
  const prevWeekStart = new Date(startDate)
  prevWeekStart.setDate(startDate.getDate() - 7)

  // End date is 6 days after start date
  const prevWeekEnd = new Date(prevWeekStart)
  prevWeekEnd.setDate(prevWeekStart.getDate() + 6)
  prevWeekEnd.setHours(23, 59, 59, 999)

  return { startDate: prevWeekStart, endDate: prevWeekEnd }
}
