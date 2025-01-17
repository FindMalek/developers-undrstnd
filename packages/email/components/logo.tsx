import React from "react"
import { Img, Section } from "@react-email/components"

export const baseUrl = "https://undrstnd.dev"

export function Logo() {
  return (
    <Section className="mt-[32px]">
      <Img
        src={`${baseUrl}/email/logo.png`}
        width="45"
        height="45"
        alt="Undrstnd Developers"
        className="mx-auto my-0 block"
      />
    </Section>
  )
}
