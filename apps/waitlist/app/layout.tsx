import { siteConfig } from '@/lib/config';
import { constructMetadata } from '@/lib/utils';
import {
  ModeToggle,
  TailwindIndicator,
  DesignSystemProvider,
} from '@undrstnd/ui';
import { fonts } from '@undrstnd/ui/lib/fonts';
import type { Metadata, Viewport } from 'next';
import '@undrstnd/ui/styles/globals.css';
import type { ReactNode } from 'react';
import { cn } from '@undrstnd/ui/lib';

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
        <ModeToggle />
        <TailwindIndicator />
      </DesignSystemProvider>
    </body>
  </html>
);

export default RootLayout;
