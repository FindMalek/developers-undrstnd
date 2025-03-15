import { MarketingHero } from "@/components/app/marketing-hero"
import { MarketingLogos } from "@/components/app/marketing-logos"
import { MarketingWaitlist } from "@/components/app/marketing-waitlist"

export default function Home() {
  return (
    <main>
      <MarketingHero />
      <MarketingLogos />
      <MarketingWaitlist />
    </main>
  )
}
