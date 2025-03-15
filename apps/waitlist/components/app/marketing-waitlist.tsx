"use client"

import { useFormStatus } from "react-dom"

import { useState } from "react"
import { Icons } from "@undrstnd/design-system/components/shared/icons"
import { toast } from "@undrstnd/design-system/hooks/use-toast"
import { log } from "@undrstnd/observability/log"
import { parseError } from "@undrstnd/observability/error"

import { Section } from "@/components/layout/section"

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

async function handleWaitlistSubmission(
  formData: FormData,
  setSubmitted: React.Dispatch<React.SetStateAction<boolean>>
) {
  setSubmitted(true)

  const email = formData.get("email") as string

  const result = await addWaitlistAndSendEmail(email)
  if (!result.success) {
    log.error(parseError(result.error))
    toast({
      title: "Error",
      description: result.error,
      variant: "destructive",
    })
  } else if (result.warning) {
    log.warn("Warning adding to waitlist", { email, warning: result.warning })
    toast({
      title: result.warning,
    })
  } else {
    log.info("Successfully added to waitlist", { email })
    toast({
      title: "Successfully joined the waitlist!",
    })
  }
}

export function MarketingWaitlist() {
  const [isSubmitted, setSubmitted] = useState(false)

  return (
    <Section id="cta">
      <div className="relative overflow-hidden border p-6 md:p-12 lg:p-16">
        <div className="max-w-3xl">
          <p className="text-foreground text-2xl md:text-3xl font-medium">
            Ready to supercharge your development with AI?
          </p>
          <p className="text-muted-foreground mb-8 max-w-3xl text-base md:text-lg">
            Join the waitlist to get early access to Undrstnd Developers API.
          </p>

          <div className="w-full max-w-md">
            {isSubmitted ? (
              <div className="font-sm text-primary flex h-11 w-full items-center justify-between rounded-lg border border-[#2C2C2C] px-3 py-1">
                <p>Added to waitlist!</p>
                <Icons.check className="size-4" />
              </div>
            ) : (
              <form
                action={(formData) => handleWaitlistSubmission(formData, setSubmitted)}
              >
                <fieldset className="relative z-50 w-full">
                  <input
                    placeholder="example@email.com"
                    type="email"
                    name="email"
                    id="email"
                    autoComplete="email"
                    aria-label="Email address"
                    required
                    className="border-border font-sm h-11 w-full rounded-lg border bg-transparent px-3 py-1 outline-none"
                  />
                  <SubmitButton />
                </fieldset>
              </form>
            )}
          </div>
        </div>
      </div>
    </Section>
  )
}
