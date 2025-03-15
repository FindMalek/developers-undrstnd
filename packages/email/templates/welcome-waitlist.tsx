import {
  Body,
  Container,
  Font,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Tailwind,
  Text,
} from "@react-email/components"

import { Footer } from "../components/footer"
import { Logo } from "../components/logo"

const BASE_URL = "https://email.undrstnd.dev"

export function WelcomeWaitlist() {
  const text = `Hi there! Welcome to Undrstnd Developers! I'm Malek, founder of Undrstnd Labs. We're excited to have you join our community of innovative developers.`

  return (
    <Html>
      <Tailwind>
        <head>
          <Font
            fontFamily="Geist"
            fallbackFontFamily="Helvetica"
            webFont={{
              url: "https://cdn.jsdelivr.net/npm/@fontsource/geist-sans@5.0.1/files/geist-sans-latin-400-normal.woff2",
              format: "woff2",
            }}
            fontWeight={400}
            fontStyle="normal"
          />

          <Font
            fontFamily="Geist"
            fallbackFontFamily="Helvetica"
            webFont={{
              url: "https://cdn.jsdelivr.net/npm/@fontsource/geist-sans@5.0.1/files/geist-sans-latin-500-normal.woff2",
              format: "woff2",
            }}
            fontWeight={500}
            fontStyle="normal"
          />
        </head>
        <Preview>{text}</Preview>

        <Body className="mx-auto my-auto bg-[#fff] font-sans">
          <Container
            className="mx-auto my-[40px] max-w-[600px] border-transparent p-[20px] md:border-[#E8E7E1]"
            style={{ borderStyle: "solid", borderWidth: 1 }}
          >
            <Logo />
            <Heading className="mx-0 my-[30px] p-0 text-center text-[21px] font-normal text-[#121212]">
              Welcome to Undrstnd Developers
            </Heading>

            <br />

            <span className="font-medium">Hi there,</span>
            <Text className="text-[#121212]">
              Welcome to Undrstnd Developers! I'm Malek, founder of Undrstnd
              Labs.
              <br />
              <br />
              After 5 years of launching startups and projects, I founded
              Undrstnd Labs with a clear mission: to create innovative
              AI-powered products for the developer community while maintaining
              a strong commitment to open source. We believe in building tools
              that empower developers and make their work more efficient and
              enjoyable.
              <br />
              <br />
              We're excited to have you join our community. If you'd like to
              discuss ideas, provide feedback, or just have a chat about
              development, you can schedule a time with me{" "}
              <Link
                href="https://cal.com/findmalek"
                className="text-[#121212] underline"
              >
                here
              </Link>
              <br />
              <br />
              Feel free to reach out anytime - we're committed to building this
              together with our community.
            </Text>

            <br />

            <Text className="text-[#707070]">Best regards,</Text>
            <Text className="text-[#707070]">Malek Gara-Hellal</Text>
            <Text className="text-[#707070]">Founder, Undrstnd Labs</Text>

            <Img
              src={`${BASE_URL}/signature.jpg`}
              alt="Signature"
              className="block h-[20px] w-[143px]"
            />
            <br />
            <br />

            <Footer />
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}
