"use client"

import { AnimatePresence, motion } from "framer-motion"

import { lazy, Suspense, useEffect, useState } from "react"
import Image from "next/image"

import { MarketingHeroCTA } from "@/components/app/marketing-hero-cta"
import { MarketingHeroTitle } from "@/components/app/marketing-hero-title"
import { Section } from "@/components/layout/section"

const LazySpline = lazy(() => import("@splinetool/react-spline"))

const splineScene =
  "https://prod.spline.design/Te6DyWKle1p53kKp/scene.splinecode"

export function MarketingHero() {
  const [isMobile, setIsMobile] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    return () => window.removeEventListener("resize", checkMobile)
  }, [])

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
              {isLoading && (
                <motion.div
                  key="placeholder"
                  className="absolute inset-0 flex h-full w-full origin-top-left items-center justify-center"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Image
                    src="/spline-render.png"
                    alt="Spline Placeholder"
                    fill
                    className="object-contain"
                    priority
                  />
                </motion.div>
              )}
            </AnimatePresence>

            <Suspense fallback={null}>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 flex h-full w-full origin-top-left items-center justify-center"
                onAnimationComplete={() => setIsLoading(false)}
              >
                <LazySpline
                  scene={splineScene}
                  onLoad={() => setIsLoading(false)}
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
