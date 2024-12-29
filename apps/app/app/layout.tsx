import '@undrstnd/design-system/styles/globals.css';
import { DesignSystemProvider } from '@undrstnd/design-system';
import { fonts } from '@undrstnd/design-system/lib/fonts';
import type { ReactNode } from 'react';

type RootLayoutProperties = {
  readonly children: ReactNode;
};

const RootLayout = ({ children }: RootLayoutProperties) => (
  <html lang="en" className={fonts} suppressHydrationWarning>
    <body>
      <DesignSystemProvider>{children}</DesignSystemProvider>
    </body>
  </html>
);

export default RootLayout;
