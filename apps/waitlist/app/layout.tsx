import { siteConfig } from '@/lib/config';
import { cn, constructMetadata } from '@/lib/utils';
import { ModeToggle, TailwindIndicator, UIProvider } from '@undrstnd/ui';
import { GeistMono } from 'geist/font/mono';
import { GeistSans } from 'geist/font/sans';
import type { Metadata, Viewport } from 'next';
import '@undrstnd/ui/styles/globals.css';
import type { ReactNode } from 'react';

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
  <html
    lang="en"
    suppressHydrationWarning
    className={`${GeistSans.variable} ${GeistMono.variable}`}
  >
    <body
      className={cn(
        'mx-auto min-h-screen w-full scroll-smooth bg-background font-sans antialiased'
      )}
    >
      <UIProvider>
        {children}
        <ModeToggle />
        <TailwindIndicator />
      </UIProvider>
    </body>
  </html>
);

export default RootLayout;
