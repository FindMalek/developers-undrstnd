declare module "@undrstnd/seo" {
  import { ReactNode } from "react"

  export interface SocialLink {
    icon: string | ReactNode
    url: string
  }

  export interface LinkItem {
    text: string
    url: string
  }

  export interface SiteEmailConfig {
    socialLinks: Array<SocialLink>
    links: Array<LinkItem>
    bottomText: string
    brandText: string
  }

  export interface SiteHero {
    title: string
    description: string
    cta: string
    ctaDescription: string
  }

  export interface SiteFeature {
    name: string
    description: string
    icon: ReactNode
  }

  export interface SiteLinks {
    email: string
    twitter: string
    discord: string
    github: string
    about: string
  }

  export interface SiteFooter {
    socialLinks: Array<SocialLink>
    links: Array<LinkItem>
    bottomText: string
    brandText: string
  }

  export interface SiteConfig {
    name: string
    description: string
    cta: string
    url: string
    keywords: string[]
    links: SiteLinks
    hero: SiteHero
    features: SiteFeature[]
    footer: SiteFooter
  }

  export const siteEmail: SiteEmailConfig
  export const site: SiteConfig
}
