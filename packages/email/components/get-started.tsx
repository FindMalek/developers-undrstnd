import { Button, Section } from "@react-email/components"

import React from "react"

export function GetStarted() {
  return (
    <Section className="mb-[50px] mt-[50px] text-center">
      <Button
        // TODO: Add the actual link
        href="https://go.undrstnd.dev/wl"
        className="text-primary border border-solid border-[#121212] bg-transparent px-6 py-3 text-center text-[14px] font-medium text-[#121212] no-underline"
      >
        Get started
      </Button>
    </Section>
  )
}
