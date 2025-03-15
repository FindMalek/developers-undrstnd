import {
  Container,
  Img,
  Link,
  Section,
  Tailwind,
  Text,
} from "@react-email/components"

import { Icons } from "@undrstnd/design-system/components/shared/icons"
import { siteEmail as site } from "@undrstnd/seo/email"

import { BorderText } from "./border-text"

export function Footer() {
  return (
    <Tailwind>
      <Container className="mx-auto flex w-full max-w-[600px] flex-col gap-y-5 rounded-lg px-7 py-5">
        <Section className="flex items-center justify-between">
          <Container className="flex gap-x-2">
            {site.footer.socialLinks.map((link, index) => (
              <Link
                key={index}
                href={link.url}
                className="text-muted-foreground hover:text-foreground flex h-5 w-5 items-center justify-center transition-all duration-100 ease-linear hover:underline hover:underline-offset-4"
              >
                <Img src={link.icon} alt="Icon"
                  width="22"
                  height="22"
                />
              </Link>
            ))}
          </Container>
        </Section>

        <Section className="flex flex-col justify-between gap-y-5">
          <Container className="text-muted-foreground flex flex-col gap-x-5 gap-y-2">
            {site.footer.links.map((link, index) => (
              <Link
                key={index}
                href={link.url}
                className="text-muted-foreground hover:text-foreground text-[15px]/normal font-medium transition-all duration-100 ease-linear hover:underline hover:underline-offset-4"
              >
                {link.text}
              </Link>
            ))}
          </Container>
        </Section>

        <Container className="flex items-center gap-x-2">
          <Icons.logo className="h-5 w-5" />
          <BorderText text={site.footer.brandText} />
        </Container>
      </Container>
    </Tailwind>
  )
}
