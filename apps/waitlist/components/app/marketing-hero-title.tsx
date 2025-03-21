import { motion } from "framer-motion"

import { site } from "@undrstnd/seo/config"

import { ease } from "@/lib/config"

export function MarketingHeroTitle() {
  return (
    <div className="flex w-full max-w-3xl flex-col overflow-hidden pt-8">
      <motion.h1
        className="text-foreground leading-tighter text-left text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl"
        initial={{ filter: "blur(10px)", opacity: 0, y: 50 }}
        animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
        transition={{
          duration: 1,
          ease,
          staggerChildren: 0.2,
        }}
      >
        <motion.span
          className="inline-block text-balance pb-4 text-left"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            delay: 0.5,
            ease,
          }}
        >
          {site.hero.title}
        </motion.span>
      </motion.h1>
      <motion.p
        className="text-muted-foreground max-w-xl text-balance text-left leading-normal sm:text-lg sm:leading-normal"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.6,
          duration: 0.8,
          ease,
        }}
      >
        {site.hero.description}
      </motion.p>
    </div>
  )
}
