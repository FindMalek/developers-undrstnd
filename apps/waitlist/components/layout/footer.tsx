import { BorderText } from "@undrstnd/design-system/components/fancy/border-number"
import { Icons } from "@undrstnd/design-system/components/shared/icons"

import { siteConfig } from "@/lib/config"

export function Footer() {
  return (
    <footer className="container flex flex-col gap-y-5 rounded-lg px-7 py-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-x-2">
          <Icons.logo className="h-5 w-5" />
          <h2 className="text-foreground text-lg font-bold">
            {siteConfig.name}
          </h2>
        </div>

        <div className="flex gap-x-2">
          {siteConfig.footer.socialLinks.map((link, index) => (
            <a
              key={index}
              href={link.url}
              className="text-muted-foreground hover:text-foreground flex h-5 w-5 items-center justify-center transition-all duration-100 ease-linear hover:underline hover:underline-offset-4"
            >
              {link.icon}
            </a>
          ))}
        </div>
      </div>
      <div className="flex flex-col justify-between gap-y-5 md:flex-row md:items-center">
        <ul className="text-muted-foreground flex flex-col gap-x-5 gap-y-2 md:flex-row md:items-center">
          {siteConfig.footer.links.map((link, index) => (
            <li
              key={index}
              className="text-muted-foreground hover:text-foreground text-[15px]/normal font-medium transition-all duration-100 ease-linear hover:underline hover:underline-offset-4"
            >
              <a href={link.url}>{link.text}</a>
            </li>
          ))}
        </ul>
        <div className="text-muted-foreground flex items-center justify-between text-sm font-medium tracking-tight">
          <p>{siteConfig.footer.bottomText}</p>
        </div>
      </div>
      <BorderText
        text={siteConfig.footer.brandText}
        className="overflow-hidden font-mono text-[clamp(3rem,15vw,10rem)] font-medium tracking-tighter"
      />
    </footer>
  )
}
