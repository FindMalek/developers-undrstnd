import { motion } from "framer-motion"

import { ease } from "@/lib/config"

export function MarketingHeroPill() {
  return (
    <motion.a
      href="/blog/introducing-dev-ai"
      className="bg-primary/20 ring-accent flex w-auto items-center space-x-2 whitespace-pre rounded-full px-2 py-1 ring-1"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease }}
    >
      <div className="bg-accent text-primary w-fit rounded-full px-2 py-0.5 text-left text-xs font-medium sm:text-sm">
        🛠️ New
      </div>
      <p className="text-primary text-xs font-medium sm:text-sm">
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
  )
}
