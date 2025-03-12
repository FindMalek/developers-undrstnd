import { Icons } from "@undrstnd/design-system/components/shared/icons"

import type { Company } from "@/types"

export const BLUR_FADE_DELAY = 0.15

export const ease = [0.16, 1, 0.3, 1]

export const siteConfig = {
  name: "Undrstnd Developers",
  description:
    "Access open-source AI models with fast, reliable, and cost-effective inference.",
  cta: "Get Started",
  url: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  keywords: [
    "AI API",
    "Open-Source Models",
    "AI Inference",
    "Developer Tools",
    "AI SDK",
  ],
  links: {
    email: "supportrepo.dev",
    twitter: "https://go.undrstnd.dev/x",
    discord: "https://go.undrstnd.dev/dc",
    github: "https://go.undrstnd.dev/gh",
    about: "/about",
  },
  hero: {
    title: "Undrstnd Developers",
    description:
      "Unlock the power of AI with open-source models and a seamless API platform designed for developers.",
    cta: "Read about our features",
    ctaDescription: "Flexible pricing and fast integration",
  },
  features: [
    {
      name: "Fast Inference APIs",
      description:
        "Deploy AI-powered solutions rapidly with high-performance inference APIs.",
      icon: <Icons.zap className="h-6 w-6" />,
    },
    {
      name: "Access to Open-Source Models",
      description:
        "Utilize a library of curated open-source models optimized for speed and reliability.",
      icon: <Icons.library className="h-6 w-6" />,
    },
    {
      name: "Cost-Effective Solutions",
      description:
        "Scale your applications affordably with transparent pricing and efficient usage.",
      icon: <Icons.dollarSign className="h-6 w-6" />,
    },
    {
      name: "Easy Integration",
      description:
        "Quickly integrate AI into your applications with simple SDKs and comprehensive docs.",
      icon: <Icons.plug className="h-6 w-6" />,
    },
    {
      name: "Developer-Centric Tools",
      description:
        "Enhance productivity with tools designed for developers by developers.",
      icon: <Icons.code className="h-6 w-6" />,
    },
    {
      name: "Customizable Inference Options",
      description:
        "Adapt inference settings to match your specific performance and accuracy needs.",
      icon: <Icons.tune className="h-6 w-6" />,
    },
  ],
  footer: {
    socialLinks: [
      {
        icon: <Icons.github className="h-5 w-5" />,
        url: "https://go.undrstnd.dev/gh",
      },
      {
        icon: <Icons.twitter className="h-5 w-5" />,
        url: "https://go.undrstnd.dev/x",
      },
      {
        icon: <Icons.discord className="h-5 w-5" />,
        url: "https://go.undrstnd.dev/dc",
      },
      {
        icon: <Icons.linkedIn className="h-5 w-5" />,
        url: "https://go.undrstnd.dev/li",
      },
    ],
    links: [
      { text: "About", url: "/about" },
      { text: "Contact", url: "/contact" },
      { text: "Careers", url: "/careers" },
    ],
    bottomText: "All rights reserved.",
    brandText: "Undrstnd Labs",
  },
}

export type SiteConfig = typeof siteConfig

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
