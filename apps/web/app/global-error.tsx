"use client"

import { useEffect } from "react"
import type NextError from "next/error"
import { captureException } from "@sentry/nextjs"

import { fonts } from "@undrstnd/ui/lib"

import { Button } from "@undrstnd/ui"

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
