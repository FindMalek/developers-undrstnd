"use client"

import { AnimatePresence, motion } from "framer-motion"

import { useState } from "react"
import { FlickeringGrid } from "@undrstnd/design-system/components/fancy/flickering-grid"

import { DailySignups } from "@/types"

import { BLUR_FADE_DELAY, ease } from "@/lib/config"

import { MarketingWaitlistForm } from "@/components/app/marketing-waitlist-form"
import { MarketingWaitlistStats } from "@/components/app/marketing-waitlist-stats"
import { Section } from "@/components/layout/section"

interface MarketingWaitlistProps {
  waitlistSignups: DailySignups[]
}

export function MarketingWaitlist({ waitlistSignups }: MarketingWaitlistProps) {
  const [isSubmitted, setSubmitted] = useState(false)
  const [alreadyJoined, setAlreadyJoined] = useState<Date | null>(null)

  return (
    <Section id="waitlist">
      <div className="bg-background relative w-full overflow-hidden border">
        <AnimatePresence mode="wait">
          {!isSubmitted ? (
            <motion.div
              className="relative z-10 grid w-full grid-cols-1 p-6 lg:p-12"
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
                  transition={{ delay: BLUR_FADE_DELAY, duration: 0.5 }}
                >
                  Ready to supercharge your development with AI?
                </motion.p>
                <motion.p
                  className="text-muted-foreground md:text-md mb-8 max-w-3xl text-base"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: BLUR_FADE_DELAY, duration: 0.5 }}
                >
                  Join the waitlist to get early access to Undrstnd Developers
                  API.
                </motion.p>

                <motion.div
                  className="w-full max-w-md"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: BLUR_FADE_DELAY, duration: 0.5 }}
                >
                  <MarketingWaitlistForm
                    onSubmit={(email) => {
                      setSubmitted(true)
                    }}
                    setAlreadyJoined={setAlreadyJoined}
                  />
                </motion.div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              className="relative z-10 w-full p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: BLUR_FADE_DELAY,
                ease,
              }}
            >
              <MarketingWaitlistStats
                alreadyJoined={alreadyJoined}
                waitlistSignups={waitlistSignups}
              />
            </motion.div>
          )}
        </AnimatePresence>
        <FlickeringGrid
          className="absolute inset-0 z-0 [mask-image:linear-gradient(to_left,white,transparent)]"
          squareSize={4}
          gridGap={6}
          color="#60A5FA"
          maxOpacity={0.2}
          flickerChance={0.1}
        />
      </div>
    </Section>
  )
}
