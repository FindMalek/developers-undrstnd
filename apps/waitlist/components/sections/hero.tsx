'use client';

import { AuroraText } from '@undrstnd/ui';
import { Section } from '@/components/section';
import { buttonVariants, Icons } from '@undrstnd/ui';
import { siteConfig } from '@/lib/config';
import { cn } from '@undrstnd/ui/lib';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { lazy, useEffect, useState } from 'react';
import { Suspense } from 'react';

const ease = [0.16, 1, 0.3, 1];

function HeroPill() {
  return (
    <motion.a
      href="/blog/introducing-dev-ai"
      className="flex w-auto items-center space-x-2 whitespace-pre rounded-full bg-primary/20 px-2 py-1 ring-1 ring-accent"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease }}
    >
      <div className="w-fit rounded-full bg-accent px-2 py-0.5 text-left font-medium text-primary text-xs sm:text-sm">
        🛠️ New
      </div>
      <p className="font-medium text-primary text-xs sm:text-sm">
        Introducing AI Agent SDK
      </p>
      <svg
        width="12"
        height="12"
        className="ml-1"
        viewBox="0 0 12 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8.78141 5.33312L5.20541 1.75712L6.14808 0.814453L11.3334 5.99979L6.14808 11.1851L5.20541 10.2425L8.78141 6.66645H0.666748V5.33312H8.78141Z"
          fill="hsl(var(--primary))"
        />
      </svg>
    </motion.a>
  );
}

function HeroTitles() {
  return (
    <div className="flex w-full max-w-3xl flex-col overflow-hidden pt-8">
      <motion.h1
        className="text-left font-semibold text-4xl text-foreground leading-tighter tracking-tighter sm:text-5xl md:text-6xl"
        initial={{ filter: 'blur(10px)', opacity: 0, y: 50 }}
        animate={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
        transition={{
          duration: 1,
          ease,
          staggerChildren: 0.2,
        }}
      >
        <motion.span
          className="inline-block text-balance"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            delay: 0.5,
            ease,
          }}
        >
          <AuroraText className="leading-normal">
            {siteConfig.hero.title}
          </AuroraText>
        </motion.span>
      </motion.h1>
      <motion.p
        className="max-w-xl text-balance text-left text-muted-foreground leading-normal sm:text-lg sm:leading-normal"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.6,
          duration: 0.8,
          ease,
        }}
      >
        {siteConfig.hero.description}
      </motion.p>
    </div>
  );
}

function HeroCTA() {
  return (
    <div className="relative mt-6">
      <motion.div
        className="flex w-full max-w-2xl flex-col items-start justify-start space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.8, ease }}
      >
        <Link
          href="/download"
          className={cn(
            buttonVariants({ variant: 'default' }),
            'flex w-full gap-2 rounded-lg text-background sm:w-auto'
          )}
        >
          <Icons.logo className="h-6 w-6" />
          {siteConfig.hero.cta}
        </Link>
      </motion.div>
      <motion.p
        className="mt-3 text-left text-muted-foreground text-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.0, duration: 0.8 }}
      >
        {siteConfig.hero.ctaDescription}
      </motion.p>
    </div>
  );
}
const LazySpline = lazy(() => import('@splinetool/react-spline'));

export function Hero() {
  const [showSpline, setShowSpline] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024); // Assuming 1024px is the breakpoint for lg
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    // Don't show on mobile
    if (!isMobile) {
      const timer = setTimeout(() => {
        setShowSpline(true);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [isMobile]);

  return (
    <Section id="hero">
      <div className="relative grid w-full grid-cols-1 gap-x-8 overflow-hidden border-x p-6 lg:grid-cols-2 lg:p-12">
        <div className="flex flex-col items-start justify-start lg:col-span-1">
          <HeroPill />
          <HeroTitles />
          <HeroCTA />
        </div>
        {!isMobile && (
          <div className="relative lg:col-span-1 lg:h-full">
            <Suspense fallback={<div>Loading...</div>}>
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
  );
}
