import '@undrstnd/design-system/styles/globals.css';
import './styles/web.css';

import { Toolbar as CMSToolbar } from '@undrstnd/cms/components/toolbar';
import { DesignSystemProvider } from '@undrstnd/design-system';
import { fonts } from '@undrstnd/design-system/lib/fonts';
import { cn } from '@undrstnd/design-system/lib/utils';
import { Toolbar } from '@undrstnd/feature-flags/components/toolbar';
import { getDictionary } from '@undrstnd/internationalization';
import type { ReactNode } from 'react';

import { Footer } from './components/footer';
import { Header } from './components/header';

type RootLayoutProperties = {
  readonly children: ReactNode;
  readonly params: Promise<{
    locale: string;
  }>;
};

const RootLayout = async ({ children, params }: RootLayoutProperties) => {
  const { locale } = await params;
  const dictionary = await getDictionary(locale);

  return (
    <html
      lang="en"
      className={cn(fonts, 'scroll-smooth')}
      suppressHydrationWarning
    >
      <body>
        <DesignSystemProvider>
          <Header dictionary={dictionary} />
          {children}
          <Footer />
        </DesignSystemProvider>
        <Toolbar />
        <CMSToolbar />
      </body>
    </html>
  );
};

export default RootLayout;
