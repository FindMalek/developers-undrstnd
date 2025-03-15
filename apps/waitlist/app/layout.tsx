import '@undrstnd/design-system/styles/globals.css';

import { DesignSystemProvider } from '@undrstnd/design-system';
import { TailwindIndicator } from '@undrstnd/design-system/components/layout/tailwind-indicator';
import { ModeToggle } from '@undrstnd/design-system/components/shared/mode-toggle';
import { fonts } from '@undrstnd/design-system/lib/fonts';
import { cn } from '@undrstnd/design-system/lib/utils';
import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';

import { siteConfig } from '@/lib/config';
import { constructMetadata } from '@/lib/utils';

import { Footer } from '@/components/layout/footer';

export const metadata: Metadata = constructMetadata({
  title: `${siteConfig.name} | ${siteConfig.description}`,
});

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
};

type RootLayoutProperties = {
  readonly children: ReactNode;
};

const RootLayout = ({ children }: RootLayoutProperties) => (
  <html lang="en" suppressHydrationWarning className={fonts}>
    <body
      className={cn(
        'mx-auto min-h-screen w-full scroll-smooth bg-background font-sans antialiased'
      )}
    >
      <DesignSystemProvider>
        {children}
        <Footer />
        {process.env.NODE_ENV === 'development' && <ModeToggle />}
        <TailwindIndicator />
      </DesignSystemProvider>
    </body>
  </html>
);

export default RootLayout;
