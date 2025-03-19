import { MarketingHero } from "@/components/app/marketing-hero"
import { MarketingLogos } from "@/components/app/marketing-logos"
import { MarketingWaitlist } from "@/components/app/marketing-waitlist"

import { getWaitlistSignupsByDate } from "@/actions/waitlist"

export default async function Home() {
  const waitlistSignups = await getWaitlistSignupsByDate()

  return (
    <main>
      <MarketingHero />
      <MarketingLogos />
      <MarketingWaitlist waitlistSignups={waitlistSignups} />
    </main>
  )
}
