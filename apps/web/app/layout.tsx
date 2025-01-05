import '@undrstnd/ui/styles/globals.css';
import './styles/web.css';
import { UIProvider } from '@undrstnd/ui';
import { fonts } from '@undrstnd/ui/lib';
import { cn } from '@undrstnd/ui/lib';
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
      <UIProvider>
        <Header />
        {children}
        <Footer />
      </UIProvider>
    </body>
  </html>
);

export default RootLayout;
