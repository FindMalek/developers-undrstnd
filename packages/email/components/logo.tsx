import { Img, Section } from "@react-email/components"

import { BASE_URL } from "../lib/consts"

export function Logo() {
  return (
    <Section className="mt-[32px]">
      <Img
        src={`${BASE_URL}/logo.png`}
        width="45"
        height="45"
        alt="Undrstnd Developers"
        className="mx-auto my-0 block"
      />
    </Section>
  )
}
