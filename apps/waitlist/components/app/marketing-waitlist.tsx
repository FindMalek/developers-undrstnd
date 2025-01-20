"use client"

import { useFormStatus } from "react-dom"

import { useState } from "react"
import { toast } from "@undrstnd/ui/hooks"

import { Section } from "@/components/layout/section"
import { Icons } from "@undrstnd/ui"
import { log } from '@undrstnd/observability/log';

import { addWaitlistAndSendEmail } from "@/actions/waitlist"

function SubmitButton() {
  const { pending } = useFormStatus()

  if (pending) {
    return (
      <div className="absolute right-0 top-1">
        <Icons.spinner className="absolute right-2 top-2.5 mr-3 size-4 animate-spin text-base" />
      </div>
    )
  }

  return (
    <button
      type="submit"
      className="bg-primary text-primary-foreground absolute right-2 top-2 z-10 h-7 rounded-md px-4 text-sm font-medium"
    >
      <Icons.chevronRight className="inline-block size-4" />
    </button>
  )
}

export function MarketingWaitlist() {
  const [isSubmitted, setSubmitted] = useState(false)

  return (
    <Section id="cta">
      <div className="relative mx-auto overflow-hidden border py-16 text-center">
        <p className="text-foreground mx-auto mb-6 max-w-3xl text-balance text-3xl font-medium">
          Ready to supercharge your development with AI?
        </p>

        <div className="flex justify-center">
          {isSubmitted ? (
            <div className="font-sm text-primary flex h-11 w-full items-center justify-between rounded-lg border border-[#2C2C2C] px-3 py-1 sm:max-w-[330px]">
              <p>Subscribed</p>

              <svg
                width="17"
                height="17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>Check</title>
                <path
                  d="m14.546 4.724-8 8-3.667-3.667.94-.94 2.727 2.72 7.06-7.053.94.94Z"
                  fill="#fff"
                />
              </svg>
            </div>
          ) : (
            <form
              action={async (formData) => {
                setSubmitted(true)

                const email = formData.get("email") as string

                const result = await addWaitlistAndSendEmail(email)
                if (!result.success) {
                  log.error(result.error ?? "Unknown error")
                  toast({
                    title: "Error",
                    description: result.error,
                    variant: "destructive",
                  })
                } else if (result.warning) {
                  toast({
                    title: result.warning,
                  })
                } else {
                  toast({
                    title: "Successfully joined the waitlist!",
                  })
                }
              }}
            >
              <fieldset className="relative z-50 min-w-[300px] max-w-full">
                <input
                  placeholder="example@email.com"
                  type="email"
                  name="email"
                  id="email"
                  autoComplete="email"
                  aria-label="Email address"
                  required
                  className="font-sm border-border text-primary h-11 w-full rounded-lg border bg-transparent px-3 py-1 outline-none sm:max-w-[360px]"
                />
                <SubmitButton />
              </fieldset>
            </form>
          )}
        </div>
      </div>
    </Section>
  )
}
