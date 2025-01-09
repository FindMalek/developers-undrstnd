import { Icons } from '@undrstnd/ui';
import { siteConfig } from '@/lib/config';
import { cn } from '@undrstnd/ui/lib';
import { buttonVariants } from '@undrstnd/ui';
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@undrstnd/ui';
import Link from 'next/link';

export function MobileDrawer() {
  return (
    <Drawer>
      <DrawerTrigger>
        <Icons.menu className="text-2xl" />
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="px-6">
          <Link
            href="/"
            title="brand-logo"
            className="relative mr-6 flex items-center space-x-2"
          >
            <Icons.logo className="h-[40px] w-auto" />
            <DrawerTitle>{siteConfig.name}</DrawerTitle>
          </Link>
          <DrawerDescription>{siteConfig.description}</DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          <Link
            href="#"
            className={cn(
              buttonVariants({ variant: 'default' }),
              'group rounded-full text-white'
            )}
          >
            {siteConfig.cta}
          </Link>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
