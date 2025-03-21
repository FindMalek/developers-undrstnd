import { motion } from "framer-motion"

import Link from "next/link"
import { Icons } from "@undrstnd/design-system/components/shared/icons"
import { buttonVariants } from "@undrstnd/design-system/components/ui/button"
import { cn } from "@undrstnd/design-system/lib/utils"
import { site } from "@undrstnd/seo/config"

import { ease } from "@/lib/config"

export function MarketingHeroCTA() {
  return (
    <div className="relative mt-6">
      <motion.div
        className="flex w-full max-w-2xl flex-col items-start justify-start space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.8, ease }}
      >
        <Link
          href={site.links.about}
          className={cn(
            buttonVariants({ variant: "secondary" }),
            "flex w-full gap-2 rounded-lg sm:w-auto"
          )}
        >
          <Icons.logo className="h-6 w-6" />
          {site.hero.cta}
        </Link>
      </motion.div>
      <motion.p
        className="text-muted-foreground mt-3 text-left text-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.0, duration: 0.8 }}
      >
        {site.hero.ctaDescription}
      </motion.p>
    </div>
  )
}
