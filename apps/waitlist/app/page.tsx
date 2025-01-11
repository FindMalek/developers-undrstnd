import { CTA } from "@/components/app/cta"
import { Footer } from "@/components/app/footer"
import { MarketingHero } from "@/components/app/marketing-hero"
import { MarketingLogos } from "@/components/app/marketing-logos"

export default function Home() {
  return (
    <main>
      <MarketingHero />
      <MarketingLogos />
      <CTA />
      <Footer />
    </main>
  )
}
