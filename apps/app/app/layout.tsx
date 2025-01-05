import '@undrstnd/ui/styles/globals.css';
import { UIProvider } from '@undrstnd/ui/';
import { fonts } from '@undrstnd/ui/lib';
import type { ReactNode } from 'react';

type RootLayoutProperties = {
  readonly children: ReactNode;
};

const RootLayout = ({ children }: RootLayoutProperties) => (
  <html lang="en" className={fonts} suppressHydrationWarning>
    <body>
      <UIProvider>{children}</UIProvider>
    </body>
  </html>
);

export default RootLayout;
