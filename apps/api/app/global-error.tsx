"use client"

import { captureException } from "@sentry/nextjs"

import { useEffect } from "react"
import type NextError from "next/error"
import { Button } from "@undrstnd/design-system/components/ui/button"
import { fonts } from "@undrstnd/design-system/lib/fonts"

type GlobalErrorProperties = {
  readonly error: NextError & { digest?: string }
  readonly reset: () => void
}

const GlobalError = ({ error, reset }: GlobalErrorProperties) => {
  useEffect(() => {
    captureException(error)
  }, [error])

  return (
    <html lang="en" className={fonts}>
      <body>
        <h1>Oops, something went wrong</h1>
        <Button onClick={() => reset()}>Try again</Button>
      </body>
    </html>
  )
}

export default GlobalError
