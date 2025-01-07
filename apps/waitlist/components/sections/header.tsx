'use client';

import { Icons } from '@/components/icons';
import { MobileDrawer } from '@/components/mobile-drawer';
import { buttonVariants } from '@/components/ui/button';
import { siteConfig } from '@/lib/config';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export function Header() {
  return (
    <header className="sticky top-0 z-50 h-[var(--header-height)] bg-background/60 p-0 backdrop-blur">
      <div className="container mx-auto flex items-center justify-between p-2">
        <Link
          href="/"
          title="brand-logo"
          className="relative mr-6 flex items-center space-x-2"
        >
          <Icons.logo className="w-auto" />
          <span className="font-semibold text-lg">{siteConfig.name}</span>
        </Link>
        <div className="hidden lg:block">
          <Link
            href="#"
            className={cn(
              buttonVariants({ variant: 'default' }),
              'group h-8 rounded-lg font-medium text-primary-foreground tracking-tight'
            )}
          >
            {siteConfig.cta}
          </Link>
        </div>
        <div className="mt-2 block cursor-pointer lg:hidden">
          <MobileDrawer />
        </div>
      </div>
      <hr className="absolute bottom-0 w-full" />
    </header>
  );
}
