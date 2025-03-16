"use client"

import { AnimatePresence, motion } from "framer-motion"
import { useFormStatus } from "react-dom"

import { useState } from "react"
import { Icons } from "@undrstnd/design-system/components/shared/icons"
import { toast } from "@undrstnd/design-system/hooks/use-toast"
import { parseError } from "@undrstnd/observability/error"
import { log } from "@undrstnd/observability/log"

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
      <div className="relative grid w-full grid-cols-1 overflow-hidden border p-6 lg:p-12">
        <AnimatePresence mode="wait">
          <motion.div
            className="grid w-full grid-cols-1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              ease: "easeOut",
              delay: 0.8,
            }}
          >
            <div className="max-w-3xl">
              <motion.p
                className="text-foreground text-xl font-medium md:text-2xl"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1, duration: 0.5 }}
              >
                Ready to supercharge your development with AI?
              </motion.p>
              <motion.p
                className="text-muted-foreground md:text-md mb-8 max-w-3xl text-base"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.3, duration: 0.5 }}
              >
                Join the waitlist to get early access to Undrstnd Developers
                API.
              </motion.p>

              <motion.div
                className="w-full max-w-md"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5, duration: 0.5 }}
              >
                {isSubmitted ? (
                  <motion.div
                    className="font-sm text-primary flex h-11 w-full items-center justify-between rounded-lg border border-[#2C2C2C] px-3 py-1"
                    initial={{ scale: 0.95 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p>Added to waitlist!</p>
                    <Icons.check className="size-4" />
                  </motion.div>
                ) : (
                  <form
                    action={(formData) =>
                      handleWaitlistSubmission(formData, setSubmitted)
                    }
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
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </Section>
  )
}
