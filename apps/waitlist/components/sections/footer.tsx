import { Icons } from '@/components/icons';
import { BorderText } from '@/components/ui/border-number';
import { siteConfig } from '@/lib/config';

export function Footer() {
  return (
    <footer className="container flex flex-col gap-y-5 rounded-lg px-7 py-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-x-2">
          <Icons.logo className="h-5 w-5" />
          <h2 className="font-bold text-foreground text-lg">
            {siteConfig.name}
          </h2>
        </div>

        <div className="flex gap-x-2">
          {siteConfig.footer.socialLinks.map((link, index) => (
            <a
              key={index}
              href={link.url}
              className="flex h-5 w-5 items-center justify-center text-muted-foreground transition-all duration-100 ease-linear hover:text-foreground hover:underline hover:underline-offset-4"
            >
              {link.icon}
            </a>
          ))}
        </div>
      </div>
      <div className="flex flex-col justify-between gap-y-5 md:flex-row md:items-center">
        <ul className="flex flex-col gap-x-5 gap-y-2 text-muted-foreground md:flex-row md:items-center">
          {siteConfig.footer.links.map((link, index) => (
            <li
              key={index}
              className="font-medium text-[15px]/normal text-muted-foreground transition-all duration-100 ease-linear hover:text-foreground hover:underline hover:underline-offset-4"
            >
              <a href={link.url}>{link.text}</a>
            </li>
          ))}
        </ul>
        <div className="flex items-center justify-between font-medium text-muted-foreground text-sm tracking-tight">
          <p>{siteConfig.footer.bottomText}</p>
        </div>
      </div>
      <BorderText
        text={siteConfig.footer.brandText}
        className="overflow-hidden font-medium font-mono text-[clamp(3rem,15vw,10rem)] tracking-tighter"
      />
    </footer>
  );
}
