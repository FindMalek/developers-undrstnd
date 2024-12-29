import '@undrstnd/design-system/styles/globals.css';
import './styles/web.css';
import { DesignSystemProvider } from '@undrstnd/design-system';
import { fonts } from '@undrstnd/design-system/lib/fonts';
import { cn } from '@undrstnd/design-system/lib/utils';
import type { ReactNode } from 'react';
import { Footer } from './components/footer';
import { Header } from './components/header';

type RootLayoutProperties = {
  readonly children: ReactNode;
};

const RootLayout = ({ children }: RootLayoutProperties) => (
  <html
    lang="en"
    className={cn(fonts, 'scroll-smooth')}
    suppressHydrationWarning
  >
    <body>
      <DesignSystemProvider>
        <Header />
        {children}
        <Footer />
      </DesignSystemProvider>
    </body>
  </html>
);

export default RootLayout;
