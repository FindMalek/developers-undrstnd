"use client"

import { motion } from "framer-motion"

import { lazy, Suspense, useEffect, useState } from "react"
import Image from "next/image"

import { MarketingHeroCTA } from "@/components/app/marketing-hero-cta"
import { MarketingHeroPill } from "@/components/app/marketing-hero-pill"
import { MarketingHeroTitle } from "@/components/app/marketing-hero-title"
import { Section } from "@/components/layout/section"

const LazySpline = lazy(() => import("@splinetool/react-spline"))

export function MarketingHero() {
  const [isMobile, setIsMobile] = useState(false)
  const [showSpline, setShowSpline] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  useEffect(() => {
    if (!isMobile) {
      const timer = setTimeout(() => {
        setShowSpline(true)
      }, 1000)

      return () => clearTimeout(timer)
    }
  }, [isMobile])

  return (
    <Section id="hero">
      <div className="relative grid w-full grid-cols-1 gap-x-8 overflow-hidden border-x p-6 lg:grid-cols-2 lg:p-12">
        <div className="flex flex-col items-start justify-start lg:col-span-1">
          <MarketingHeroPill />
          <MarketingHeroTitle />
          <MarketingHeroCTA />
        </div>
        {!isMobile && (
          <div className="relative lg:col-span-1 lg:h-full">
            <Suspense
              fallback={
                <Image
                  src="/cube.png"
                  alt="Spline Placeholder"
                  width={1920}
                  height={1080}
                  layout="responsive"
                  className="absolute inset-0 flex h-full w-full origin-top-left items-center justify-center"
                />
              }
            >
              {showSpline && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 1 }}
                >
                  <LazySpline
                    scene="https://prod.spline.design/mZBrYNcnoESGlTUG/scene.splinecode"
                    className="absolute inset-0 flex h-full w-full origin-top-left items-center justify-center"
                  />
                </motion.div>
              )}
            </Suspense>
          </div>
        )}
      </div>
    </Section>
  )
}
