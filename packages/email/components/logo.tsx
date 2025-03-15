import { Img, Section } from "@react-email/components"

const BASE_URL = "https://email.undrstnd.dev"

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
