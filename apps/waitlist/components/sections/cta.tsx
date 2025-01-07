import { Section } from '@/components/section';
import { Button } from '@/components/ui/button';

export function CTA() {
  return (
    <Section id="cta">
      <div className="relative mx-auto overflow-hidden border py-16 text-center">
        <p className="mx-auto mb-6 max-w-3xl text-balance font-medium text-3xl text-foreground">
          Ready to build your next AI agent?
        </p>

        <div className="flex justify-center">
          <Button className="flex items-center gap-2">Get Started</Button>
        </div>
      </div>
    </Section>
  );
}
