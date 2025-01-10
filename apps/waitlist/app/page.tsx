import { CTA } from "@/components/sections/cta"
import { Footer } from "@/components/sections/footer"
import { Hero } from "@/components/sections/hero"
import { Logos } from "@/components/sections/logos"

export default function Home() {
  return (
    <main>
      <Hero />
      <Logos />
      <CTA />
      <Footer />
    </main>
  )
}
