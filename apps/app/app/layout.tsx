import '@undrstnd/ui/styles/globals.css';
import { DesignSystemProvider } from '@undrstnd/ui';
import { fonts } from '@undrstnd/ui/lib/fonts';
import { Toolbar } from '@undrstnd/feature-flags/components/toolbar';
import type { ReactNode } from 'react';

type RootLayoutProperties = {
  readonly children: ReactNode;
};

const RootLayout = ({ children }: RootLayoutProperties) => (
  <html lang="en" className={fonts} suppressHydrationWarning>
    <body>
      <DesignSystemProvider>{children}</DesignSystemProvider>
      <Toolbar />
    </body>
  </html>
);

export default RootLayout;
