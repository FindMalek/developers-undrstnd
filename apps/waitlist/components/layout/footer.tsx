import { BorderText } from "@undrstnd/design-system/components/fancy/border-number"
import { Icons } from "@undrstnd/design-system/components/shared/icons"
import { cn } from "@undrstnd/design-system/lib/utils"
import { site } from "@undrstnd/seo/config"

export function Footer() {
  return (
    <footer className="container flex flex-col gap-y-5 rounded-lg px-10 py-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-x-2">
          <Icons.logo className="h-5 w-5" />
          <h2 className="text-foreground text-lg font-bold">{site.name}</h2>
        </div>

        <div className="hidden gap-x-2 md:flex">
          {site.footer.socialLinks.map((link, index) => (
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
          {site.footer.links.map((link, index) => (
            <li
              key={index}
              className="text-muted-foreground hover:text-foreground text-[15px]/normal font-medium transition-all duration-100 ease-linear hover:underline hover:underline-offset-4"
            >
              <a href={link.url} target="_blank" rel="noopener noreferrer">
                {link.text}
              </a>
            </li>
          ))}
        </ul>
        <div className="flex items-center justify-between">
          <p>{site.footer.bottomText}</p>

          <div className="flex gap-x-2 md:hidden">
            {site.footer.socialLinks.map((link, index) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground flex h-5 w-5 items-center justify-center transition-all duration-100 ease-linear hover:underline hover:underline-offset-4"
              >
                {link.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
      <BorderText
        text={site.footer.brandText}
        className={cn(
          "before:from-neutral-300 before:to-neutral-200/70",
          "dark:before:to-neutral-800/30 dark:after:bg-neutral-600/70",
          "mx-[-8.5rem] overflow-hidden whitespace-nowrap font-mono text-[clamp(3rem,10vw,6rem)] font-medium tracking-tighter sm:text-[clamp(4rem,10vw,6rem)] md:text-[clamp(3rem,15vw,10rem)]"
        )}
      />
    </footer>
  )
}
