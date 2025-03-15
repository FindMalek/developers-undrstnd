import { Container, Img, Link, Section, Text } from "@react-email/components"

import { siteEmail as site } from "@undrstnd/seo/email"

export function Footer() {
  return (
    <Container className="px-7 py-5">
      <Section className="my-5">
        <Container className="flex items-center justify-between">
          <Container>
            <Text className="text-lg font-bold">{site.name}</Text>
          </Container>

          <Container className="flex space-x-4">
            {site.footer.socialLinks.map((link, index) => (
              <Link
                key={index}
                href={link.url}
                className="text-gray-500 hover:text-gray-900"
              >
                {link.icon}
              </Link>
            ))}
          </Container>
        </Container>
      </Section>

      <Section>
        <Container>
          {site.footer.socialLinks.map((link, index) => (
            <Link
              key={index}
              href={link.url}
              className="mr-4 text-sm text-gray-500 hover:text-gray-900"
            >
              <Img src={link.icon} alt={link.url} />
            </Link>
          ))}
        </Container>

        <Text className="mt-4 text-sm text-gray-500">
          {site.footer.bottomText}
        </Text>
      </Section>

      <Section>
        <Text className="font-mono text-4xl font-medium tracking-tighter">
          {site.footer.brandText}
        </Text>
      </Section>
    </Container>
  )
}
