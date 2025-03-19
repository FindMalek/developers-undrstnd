import { clsx } from "clsx"
import type { ClassValue } from "clsx"
import { toast } from "sonner"
import { twMerge } from "tailwind-merge"

import { parseError } from "@undrstnd/observability/error"

export const cn = (...inputs: ClassValue[]): string => twMerge(clsx(inputs))

export const capitalize = (str: string) =>
  str.charAt(0).toUpperCase() + str.slice(1)

export const handleError = (error: unknown): void => {
  const message = parseError(error)

  toast.error(message)
}

export function formatDate(date: Date | string) {
  if (typeof date === "string") {
    const dateObj = new Date(date)
    return dateObj.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    })
  }

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  })
}
