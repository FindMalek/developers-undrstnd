"use client"

import { AnimatePresence, motion } from "framer-motion"

import Image from "next/image"
import Link from "next/link"

import { BLUR_FADE_DELAY, companies, ease } from "@/lib/config"

import { Section } from "@/components/layout/section"

export function MarketingLogos() {
  return (
    <Section id="logos">
      <div className="border-x border-t">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6">
          {companies.map((item, idx) => (
            <Link
              key={idx}
              href={item.href}
              className="group flex items-center justify-center border-r border-t p-4 last:border-r-0 sm:last:border-r [&:nth-child(-n+2)]:border-t-0 sm:[&:nth-child(-n+3)]:border-t-0 md:[&:nth-child(-n+6)]:border-t-0 [&:nth-child(2n)]:border-r-0 sm:[&:nth-child(2n)]:border-r md:[&:nth-child(3)]:border-r sm:[&:nth-child(3n)]:border-r-0 md:[&:nth-child(3n)]:border-r md:[&:nth-child(6n)]:border-r-0"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{
                    ease,
                    duration: 0.5,
                    delay: Math.random() * BLUR_FADE_DELAY,
                  }}
                >
                  <Image
                    width={112}
                    height={40}
                    src={item.imageUrl}
                    className="h-auto w-auto opacity-30 grayscale transition-all duration-200 ease-out hover:opacity-100 hover:brightness-100 hover:grayscale-0 dark:brightness-0 dark:invert dark:hover:brightness-0 dark:hover:invert"
                    alt={item.name}
                    loading="lazy"
                  />
                </motion.div>
              </AnimatePresence>
            </Link>
          ))}
        </div>
      </div>
    </Section>
  )
}
