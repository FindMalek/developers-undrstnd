"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { useState } from "react"
import { Icons } from "@undrstnd/design-system/components/shared/icons"
import { Button } from "@undrstnd/design-system/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@undrstnd/design-system/components/ui/form"
import { Input } from "@undrstnd/design-system/components/ui/input"
import { toast } from "@undrstnd/design-system/hooks/use-toast"
import { parseError } from "@undrstnd/observability/error"
import { log } from "@undrstnd/observability/log"

import { addWaitlistAndSendEmail } from "@/actions/waitlist"

// TODO: add this to the `@undrstnd/common/schema` package
const waitlistFormSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
})

type TWaitlistForm = z.infer<typeof waitlistFormSchema>

interface WaitlistFormProps {
  onSubmit: (email: string) => void
  setAlreadyJoined: (alreadyJoined: Date) => void
}

function SubmitButton({ pending }: { pending: boolean }) {
  return (
    <Button
      type="submit"
      className="absolute right-2 top-2 z-10 h-7"
      aria-label="Submit email"
      size="sm"
      disabled={pending}
    >
      {pending ? (
        <Icons.spinner className="size-4 animate-spin" />
      ) : (
        <Icons.chevronRight className="inline-block size-4" />
      )}
    </Button>
  )
}

export function MarketingWaitlistForm({
  onSubmit,
  setAlreadyJoined,
}: WaitlistFormProps) {
  const [pending, setPending] = useState(false)
  const form = useForm<TWaitlistForm>({
    resolver: zodResolver(waitlistFormSchema),
    defaultValues: {
      email: "",
    },
  })

  async function handleWaitlistSubmission(data: TWaitlistForm) {
    setPending(true)
    const result = await addWaitlistAndSendEmail(data.email)
    if (!result.success) {
      log.info(parseError(result.error))
      toast({
        title: "Error",
        description: result.error,
        variant: "destructive",
      })
    } else if (result.warning) {
      log.info("Warning adding to waitlist", {
        email: data.email,
        warning: result.warning,
      })
      toast({
        title: result.warning,
      })
      // Still consider it a submission even with a warning
      onSubmit(data.email)
      if (result.alreadyJoined) {
        setAlreadyJoined(result.alreadyJoined)
      }
    } else {
      log.info("Successfully added to waitlist", { email: data.email })
      toast({
        title: "Successfully joined the waitlist!",
      })
      onSubmit(data.email)
    }
    setPending(false)
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleWaitlistSubmission)}
        className="relative"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="relative w-full">
              <FormControl>
                <Input
                  placeholder="example@email.com"
                  type="email"
                  autoComplete="email"
                  aria-label="Email address"
                  className="h-11 w-full"
                  disabled={pending}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <SubmitButton pending={pending} />
      </form>
    </Form>
  )
}
