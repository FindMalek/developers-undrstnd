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

import React from "react"

import { Footer } from "../components/footer"
import { Logo } from "../components/logo"

const baseUrl = "https://email.undrstnd.dev"

export const WaitlistTemplate = () => {
    const text = `Thanks for joining the Undrstnd Developers waitlist! We'll notify you soon about your beta access.`

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
                            You're on the Waitlist!
                        </Heading>

                        <br />

                        <span className="font-medium">Hi there,</span>
                        <Text className="text-[#121212]">
                            Thank you for your interest in Undrstnd Developers! We've received your request to join our beta program and added you to our waitlist.
                            <br />
                            <br />
                            We're currently reviewing applications and will notify you soon when your access is granted. We're excited about the possibility of having you try our platform!
                            <br />
                            <br />
                            While you wait, you can follow us on{" "}
                            <Link
                                href="https://go.undrstnd.dev/x"
                                className="text-[#121212] underline"
                            >
                                Twitter
                            </Link>{" "}
                            to stay updated on our latest developments.
                            <br />
                            <br />
                            Have any questions? Feel free to reach out to us at{" "}
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
                            // TODO: Change it to a cool thumbnail from branding
                            src={`${baseUrl}/founder.png`}
                            alt="Founder"
                            className="mx-auto my-0 block w-full"
                        />

                        <Text className="text-[#707070]">
                            Best regards,
                            <br />
                            The Undrstnd Developers Team
                        </Text>

                        <br />

                        <Footer />
                    </Container>
                </Body>
            </Tailwind>
        </Html>
    )
}

export default WaitlistTemplate