import { Img, Section } from "@react-email/components"

import { keys } from "../keys"

const baseUrl = keys().EMAIL_URL

export function Logo() {
  return (
    <Section className="mt-[32px]">
      <Img
        src={`${baseUrl}/logo.png`}
        width="45"
        height="45"
        alt="Undrstnd Developers"
        className="mx-auto my-0 block"
      />
    </Section>
  )
}
