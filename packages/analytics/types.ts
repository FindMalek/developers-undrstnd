type BaseEvent = 
  | "$pageview"
  | "User Created"
  | "User Updated"
  | "User Deleted"
  | "Organization Created"
  | "Organization Updated"
  | "Organization Member Created"
  | "Organization Member Deleted"
  | "User Subscribed"
  | "User Unsubscribed"
  | "Waitlist Email Already Exists"
  | "Waitlist Email Added"

export type EventName = {
  event: BaseEvent
  distinctId?: string
  properties?: Record<string, unknown>
} 