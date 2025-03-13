import type { Company } from "@/types"

export const BLUR_FADE_DELAY = 0.15

export const ease = [0.16, 1, 0.3, 1]

export { siteConfig } from "@undrstnd/seo/config"

export const companies: Company[] = [
  {
    name: "Google",
    imageUrl: "/logos/google.png",
    href: "https://google.com",
  },
  {
    name: "Groq",
    imageUrl: "/logos/groq.png",
    href: "https://groq.com",
  },
  {
    name: "Meta",
    imageUrl: "/logos/meta.png",
    href: "https://meta.com",
  },
  {
    name: "Mistral",
    imageUrl: "/logos/mistral.png",
    href: "https://mistral.com",
  },
  {
    name: "Cerebras",
    imageUrl: "/logos/cerebras.png",
    href: "https://cerebras.ai",
  },
  {
    name: "SambaNova",
    imageUrl: "/logos/sambanova.png",
    href: "https://sambanova.ai",
  },
]
