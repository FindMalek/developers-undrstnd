"use client"

import { AnimatePresence, motion } from "framer-motion"

import { lazy, Suspense, useEffect, useState } from "react"
import Image from "next/image"

import { useMobile } from "@/hooks/use-mobile"
import { BLUR_FADE_DELAY } from "@/lib/config"

import { MarketingHeroCTA } from "@/components/app/marketing-hero-cta"
import { MarketingHeroTitle } from "@/components/app/marketing-hero-title"
import { Section } from "@/components/layout/section"

const LazySpline = lazy(() => import("@splinetool/react-spline"))

const splineScene =
  "https://prod.spline.design/QYPVEu7QR1n3ApaQ/scene.splinecode"

export function MarketingHero() {
  const isMobile = useMobile()
  const [showSpline, setShowSpline] = useState(false)

  useEffect(() => {
    if (!isMobile) {
      const timer = setTimeout(() => {
        setShowSpline(true)
      }, 3000)

      return () => clearTimeout(timer)
    }
  }, [isMobile])

  return (
    <Section id="hero">
      <div className="relative grid w-full grid-cols-1 gap-x-8 overflow-hidden border-x p-6 lg:grid-cols-2 lg:p-12">
        <div className="flex flex-col items-start justify-start lg:col-span-1">
          <MarketingHeroTitle />
          <MarketingHeroCTA />
        </div>
        {!isMobile && (
          <div className="relative lg:col-span-1 lg:h-full">
            <AnimatePresence mode="wait">
              {!showSpline && (
                <motion.div
                  key="placeholder"
                  className="absolute inset-0 flex h-full w-full origin-top-left items-center justify-center"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Image
                    src="/spline-render.png"
                    alt="Spline Placeholder"
                    fill
                    className="object-contain"
                  />
                </motion.div>
              )}
            </AnimatePresence>

            <Suspense fallback={null}>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: BLUR_FADE_DELAY }}
                className="absolute inset-0 flex h-full w-full origin-top-left items-center justify-center"
              >
                <LazySpline
                  scene={splineScene}
                  className="pointer-events-none h-full w-full"
                />
              </motion.div>
            </Suspense>
          </div>
        )}
      </div>
    </Section>
  )
}
