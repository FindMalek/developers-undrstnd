import { Section } from '@/components/section';
import { siteConfig } from '@/lib/config';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export function Features() {
  const services = siteConfig.features;
  return (
    <Section id="features" title="Features">
      <div className="border-x border-t">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {services.map(({ name, description, icon: Icon }, index) => (
            <div
              key={index}
              className={cn(
                'flex flex-col items-center justify-center gap-y-2 border-b px-4 py-8 transition-colors hover:bg-secondary/20',
                'last:border-b-0',
                'md:[&:nth-child(2n+1)]:border-r md:[&:nth-child(n+5)]:border-b-0',
                'lg:border-r lg:[&:nth-child(3n)]:border-r-0 lg:[&:nth-child(n+4)]:border-b-0'
              )}
            >
              <div className="flex flex-col items-center gap-y-2">
                <div className="rounded-lg bg-gradient-to-b from-primary to-primary/80 p-2 text-white transition-colors group-hover:from-secondary group-hover:to-secondary/80">
                  {Icon}
                </div>
                <h2 className="text-balance text-center font-medium text-card-foreground text-xl">
                  {name}
                </h2>
              </div>
              <p className="mx-auto max-w-md text-balance text-center text-muted-foreground text-sm">
                {description}
              </p>
              <Link
                href="#"
                className="text-primary text-sm underline-offset-4 transition-colors hover:text-secondary-foreground hover:underline"
              >
                Learn more &gt;
              </Link>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
