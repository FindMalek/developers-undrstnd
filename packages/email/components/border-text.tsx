import { Container, Tailwind, Text } from "@react-email/components"

import * as React from "react"

interface BorderTextProps {
  text: string
  className?: string
}

export function BorderText({
  text,
  className = "overflow-hidden font-mono text-[clamp(3rem,15vw,10rem)] font-extrabold tracking-tighter text-6xl",
}: BorderTextProps) {
  return (
    <Tailwind>
      <Container className="my-4 text-center">
        <Text
          className={className}
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
