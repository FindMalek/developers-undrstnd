import {
  Container,
  Img,
  Link,
  Section,
  Tailwind,
  Text,
} from "@react-email/components"

import { siteEmail as site } from "@undrstnd/seo/email"

import { BorderText } from "./border-text"

export function Footer() {
  return (
    <Tailwind>
      <Container className="mx-auto flex w-full flex-col gap-y-5 rounded-lg px-7 py-5">
        <Section className="flex items-center justify-between">
          <Container className="flex w-full justify-around gap-x-6">
            {site.footer.socialLinks.map((link, index) => (
              <Link
                key={index}
                href={link.url}
                className="text-muted-foreground hover:text-foreground flex h-5 w-5 items-center justify-center transition-all duration-100 ease-linear hover:underline hover:underline-offset-4"
              >
                <Img src={link.icon} alt="Icon"
                  width="20"
                  height="20"
                />
              </Link>
            ))}
          </Container>
        </Section>

        <Section className="flex flex-col justify-between gap-y-5">
          <Container className="text-muted-foreground flex flex-row items-center gap-x-5">
            {site.footer.links?.map((link, index) => (
              <Link
                key={index}
                href={link.url}
                className="text-muted-foreground px-2 hover:text-foreground text-[15px]/normal font-medium transition-all duration-100 ease-linear hover:underline hover:underline-offset-4"
              >
                {link.text}
              </Link>
            ))}
          </Container>

          <Container className="text-muted-foreground flex items-center text-sm font-medium tracking-tight">
            <Text>{site.footer.bottomText}</Text>
          </Container>
        </Section>

        <Container>
          <BorderText
            text={site.footer.brandText}
            className="overflow-hidden font-mono text-4xl font-medium tracking-tighter"
          />
        </Container>
      </Container>
    </Tailwind>
  )
}
