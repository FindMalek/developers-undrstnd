"use client"

import { useFormStatus } from "react-dom"

import { useState } from "react"
import { Icons } from "@undrstnd/design-system/components/shared/icons"
import { Button } from "@undrstnd/design-system/components/ui/button"
import { Input } from "@undrstnd/design-system/components/ui/input"
import { toast } from "@undrstnd/design-system/hooks/use-toast"
import { parseError } from "@undrstnd/observability/error"
import { log } from "@undrstnd/observability/log"

import { addWaitlistAndSendEmail } from "@/actions/waitlist"

interface WaitlistFormProps {
  onSubmit: (email: string) => void
}

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
    <Button
      type="submit"
      className="absolute right-2 top-2 z-10 h-7"
      aria-label="Submit email"
      size="sm"
    >
      <Icons.chevronRight className="inline-block size-4" />
    </Button>
  )
}

export function MarketingWaitlistForm({ onSubmit }: WaitlistFormProps) {
  const [email, setEmail] = useState("log.info@ff.cc")

  async function handleWaitlistSubmission(formData: FormData) {
    const email = formData.get("email") as string

    const result = await addWaitlistAndSendEmail(email)
    if (!result.success) {
      log.info(parseError(result.error))
      toast({
        title: "Error",
        description: result.error,
        variant: "destructive",
      })
    } else if (result.warning) {
      log.info("Warning adding to waitlist", { email, warning: result.warning })
      toast({
        title: result.warning,
      })
      // Still consider it a submission even with a warning
      onSubmit(email)
    } else {
      log.info("Successfully added to waitlist", { email })
      toast({
        title: "Successfully joined the waitlist!",
      })
      onSubmit(email)
    }
  }

  return (
    <form action={handleWaitlistSubmission}>
      <fieldset className="relative z-50 w-full">
        <Input
          placeholder="example@email.com"
          type="email"
          name="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
          aria-label="Email address"
          required
          className="h-11 w-full"
        />
        <SubmitButton />
      </fieldset>
    </form>
  )
}
