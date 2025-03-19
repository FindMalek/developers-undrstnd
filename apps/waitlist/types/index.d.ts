export type Company = {
  name: string
  imageUrl: string
  href: string
}

export type ResponseWaitlist = {
  success: boolean
  error?: string
  warning?: string
  alreadyJoined?: Date
}

export interface DailySignups {
  date: string
  count: number
}

export interface WaitlistUserInfo {
  id: string
  signupDate: Date
}
