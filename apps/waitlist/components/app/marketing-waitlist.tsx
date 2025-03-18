"use client"

import { AnimatePresence, motion } from "framer-motion"

import { useState } from "react"

import { MarketingWaitlistForm } from "@/components/app/marketing-waitlist-form"
import { MarketingWaitlistStats } from "@/components/app/marketing-waitlist-stats"
import { Section } from "@/components/layout/section"

export function MarketingWaitlist() {
  const [isSubmitted, setSubmitted] = useState(false)
  const [userEmail, setUserEmail] = useState<string | null>(null)

  return (
    <Section id="waitlist">
      <div className="relative w-full overflow-hidden rounded-lg border">
        <AnimatePresence mode="wait">
          {!isSubmitted ? (
            <motion.div
              className="grid w-full grid-cols-1 p-6 lg:p-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{
                duration: 0.6,
                ease: "easeOut",
              }}
            >
              <div className="max-w-3xl">
                <motion.p
                  className="text-foreground text-xl font-medium md:text-2xl"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  Ready to supercharge your development with AI?
                </motion.p>
                <motion.p
                  className="text-muted-foreground md:text-md mb-8 max-w-3xl text-base"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                >
                  Join the waitlist to get early access to Undrstnd Developers
                  API.
                </motion.p>

                <motion.div
                  className="w-full max-w-md"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                >
                  <MarketingWaitlistForm
                    onSubmit={(email) => {
                      setUserEmail(email)
                      setSubmitted(true)
                    }}
                  />
                </motion.div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              className="grid w-full grid-cols-1 gap-8 p-6 lg:grid-cols-2 lg:p-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                ease: "easeOut",
              }}
            >
              <MarketingWaitlistStats userEmail={userEmail} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Section>
  )
}
