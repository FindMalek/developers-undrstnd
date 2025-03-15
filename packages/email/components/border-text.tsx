import * as React from "react"
import { Container, Text, } from "@react-email/components"

interface BorderTextProps {
    text: string
    className?: string
}

export function BorderText({ text, className = "" }: BorderTextProps) {
    return (
        <Container className="flex items-center justify-center">
            <Container
                className={`pointer-events-none relative text-center font-mono text-[6rem] font-bold leading-none ${className}`}
                style={{ "--text": `'${text}'` } as React.CSSProperties}
            >
                {/* First layer with gradient (light mode) */}
                <Container
                    className="absolute inset-0 bg-gradient-to-b from-neutral-300 to-neutral-200/70 to-80% bg-clip-text text-transparent"
                    style={{ content: `var(--text)` }}
                >
                    {text}
                </Container>

                {/* Shadow layer (light mode) */}
                <Container
                    className="absolute inset-0 bg-neutral-400/70 bg-clip-text text-transparent mix-blend-darken"
                    style={{
                        content: `var(--text)`,
                        textShadow: "0 1px 0 white"
                    }}
                >
                    {text}
                </Container>

                {/* Dark mode layers would be added here if needed */}

                {/* Spacer text (invisible) */}
                <Text className="invisible">{text}</Text>
            </Container>
        </Container>
    )
}

BorderText.displayName = "BorderText" 