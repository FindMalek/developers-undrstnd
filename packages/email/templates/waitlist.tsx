import React from "react"
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
import { GetStarted } from "../components/get-started"
import { Logo } from "../components/logo"

export const baseUrl = "https://undrstnd.dev"

export const WaitlistTemplate = () => {
  const text = `Great news! You've been accepted to join the Undrstnd Developers beta. We're excited to have you on board!`

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
              You're In! Welcome to Undrstnd Developers
            </Heading>

            <br />

            <span className="font-medium">Hi there,</span>
            <Text className="text-[#121212]">
              Exciting news! You've been accepted to join our beta program. I'm
              Malek, the founder of Undrstnd Developers, and I'm thrilled to
              welcome you to our community.
              <br />
              <br />
              You're now part of a select group of developers who will get early
              access to our platform. We're building something special, and your
              feedback during this beta phase will be invaluable in shaping the
              future of Undrstnd Developers.
              <br />
              <br />
              As an early member, you'll have direct access to new features as
              they're released and the opportunity to influence our development
              roadmap.
              <br />
              <br />
              There's no suprise you might encounter some bugs, we are a small
              team and we are working hard to make sure everything is working
              smoothly.
              <br />
              <br />
              Have questions or want to share your thoughts? Feel free to reply
              directly to this email or{" "}
              <Link
                href="https://cal.com/findmalek"
                className="text-[#121212] underline"
              >
                schedule a quick chat with me
              </Link>
              . I'd love to hear your perspective.
            </Text>

            <br />

            <Img
              src={`${baseUrl}/email/founder.png`}
              alt="Founder"
              className="mx-auto my-0 block w-full"
            />

            <Text className="text-[#707070]">
              Looking forward to building together,
            </Text>

            <br />
            <br />

            <GetStarted />

            <br />

            <Footer />
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}

export default WaitlistTemplate
