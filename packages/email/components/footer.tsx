import {
  Container,
  Img,
  Link,
  Section,
  Text,
  Tailwind,
} from "@react-email/components"

import { Icons } from "@undrstnd/design-system/components/shared/icons"
import { BorderText } from "./border-text"

import { siteEmail as site } from "@undrstnd/seo/email"

export function Footer() {
  return (
    <Tailwind>
      <Container className="w-full max-w-[600px] mx-auto flex flex-col gap-y-5 rounded-lg px-7 py-5">
        <Section className="flex items-center justify-between">
          <Container className="flex items-center gap-x-2">
            <Icons.logo className="h-5 w-5" />
            <Text className="text-foreground text-lg font-bold">{site.name}</Text>
          </Container>

          <Container className="flex gap-x-2">
            {site.footer.socialLinks.map((link, index) => (
              <Link
                key={index}
                href={link.url}
                className="text-muted-foreground hover:text-foreground flex h-5 w-5 items-center justify-center transition-all duration-100 ease-linear hover:underline hover:underline-offset-4"
              >
                <Img src={link.icon} alt={link.url} />
              </Link>
            ))}
          </Container>
        </Section>

        <Section className="flex flex-col justify-between gap-y-5 md:flex-row md:items-center">
          <Container className="text-muted-foreground flex flex-col gap-x-5 gap-y-2 md:flex-row md:items-center">
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

        <BorderText
          text={site.footer.brandText}
        />
      </Container>
    </Tailwind>
  )
}
