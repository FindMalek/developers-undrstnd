import { Section } from "@/components/layout/section"
import { Button } from "@undrstnd/ui"

export function CTA() {
  return (
    <Section id="cta">
      <div className="relative mx-auto overflow-hidden border py-16 text-center">
        <p className="text-foreground mx-auto mb-6 max-w-3xl text-balance text-3xl font-medium">
          Ready to build your next AI agent?
        </p>

        <div className="flex justify-center">
          <Button className="flex items-center gap-2">Get Started</Button>
        </div>
      </div>
    </Section>
  )
}
