'use client';

import { FlickeringGrid } from '@/components/flickering-grid';
import { cn } from '@undrstnd/ui/lib';
import type React from 'react';
import { forwardRef, useRef } from 'react';

interface SectionProps {
  id?: string;
  title?: string;
  subtitle?: string;
  description?: string;
  children?: React.ReactNode;
  className?: string;
  align?: 'left' | 'center' | 'right';
}

const Section = forwardRef<HTMLElement, SectionProps>(
  (
    { id, title, subtitle, description, children, className, align },
    forwardedRef
  ) => {
    const internalRef = useRef<HTMLElement>(null);
    const ref = forwardedRef || internalRef;
    const alignmentClass =
      align === 'left'
        ? 'text-left'
        : // biome-ignore lint/nursery/noNestedTernary: <explanation>
          align === 'right'
          ? 'text-right'
          : 'text-center';

    return (
      <section id={id} ref={ref}>
        <div className={cn('container relative mx-auto', className)}>
          {(title || subtitle || description) && (
            <div
              className={cn(
                alignmentClass,
                'relative mx-auto overflow-hidden border-x border-t p-2 py-8 md:p-12'
              )}
            >
              {title && (
                <h2 className="text-balance font-semibold text-muted-foreground text-sm uppercase tracking-tigh">
                  {title}
                </h2>
              )}

              {subtitle && (
                <h3
                  className={cn(
                    'mx-0 mt-4 max-w-lg text-balance font-bold text-5xl text-foreground lowercase leading-[1.2] tracking-tighter sm:max-w-none sm:text-4xl md:text-5xl lg:text-6xl',
                    align === 'center'
                      ? 'mx-auto'
                      : // biome-ignore lint/nursery/noNestedTernary: <explanation>
                        align === 'right'
                        ? 'ml-auto'
                        : ''
                  )}
                >
                  {subtitle}
                </h3>
              )}
              {description && (
                <p
                  className={cn(
                    'mt-6 max-w-2xl text-balance text-lg text-muted-foreground leading-8',
                    align === 'center'
                      ? 'mx-auto'
                      : // biome-ignore lint/nursery/noNestedTernary: <explanation>
                        align === 'right'
                        ? 'ml-auto'
                        : ''
                  )}
                >
                  {description}
                </p>
              )}
              <div className="-z-10 pointer-events-none absolute right-0 bottom-0 left-0 h-full w-full bg-gradient-to-t from-50% from-background dark:from-background" />
              <FlickeringGrid
                squareSize={4}
                gridGap={4}
                color="#6B7280"
                maxOpacity={0.2}
                flickerChance={0.1}
                className="-z-20 absolute inset-0 size-full"
              />
            </div>
          )}
          {children}
        </div>
      </section>
    );
  }
);

Section.displayName = 'Section';

export { Section };
