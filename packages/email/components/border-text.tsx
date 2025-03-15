import * as React from "react"
import { Container, Text, Tailwind } from "@react-email/components"

interface BorderTextProps {
    text: string
}

export function BorderText({ text }: BorderTextProps) {
    return (
        <Tailwind>
            <Container className="mx-auto my-4 text-center">
                <Text
                    className="overflow-hidden font-mono text-6xl font-medium tracking-tighter"
                    style={{
                        color: "#6B7280", // Text color similar to the border text effect
                        textShadow: "1px 1px 0px #E5E7EB, -1px -1px 0px #E5E7EB", // Simple border effect
                    }}
                >
                    {text}
                </Text>
            </Container>
        </Tailwind>
    )
}

BorderText.displayName = "BorderText" 