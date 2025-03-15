import { Container, Link, Section, Text } from '@react-email/components';

import { siteConfig } from '@undrstnd/seo/config';

export function Footer() {
  return (
    <Container className="px-7 py-5">
      <Section className="my-5">
        {/* <Container className="flex items-center justify-between">
          <Container>
            <Text className="font-bold text-lg">{siteConfig.name}</Text>
          </Container>

          <Container className="flex space-x-4">
            {siteConfig.footer.socialLinks.map((link, index) => (
              <Link
                key={index}
                href={link.url}
                className="text-gray-500 hover:text-gray-900"
              >
                {link.icon}
              </Link>
            ))}
          </Container>
        </Container> */}
      </Section>

      {/* <Section>
        <Container>
          {siteConfig.footer.links.map((link, index) => (
            <Link
              key={index}
              href={link.url}
              className="mr-4 text-gray-500 text-sm hover:text-gray-900"
            >
              {link.text}
            </Link>
          ))}
        </Container>

        <Text className="mt-4 text-gray-500 text-sm">
          {siteConfig.footer.bottomText}
        </Text>
      </Section>

      <Section>
        <Text className="font-medium font-mono text-4xl tracking-tighter">
          {siteConfig.footer.brandText}
        </Text>
      </Section> */}
      <Text>
        <Link href="https://undrstnd.dev">Undrstnd Labs</Link>
      </Text>
    </Container>
  );
}
