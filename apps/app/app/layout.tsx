import "@undrstnd/ui/styles/globals.css"

import type { ReactNode } from "react"
import { Toolbar } from "@undrstnd/feature-flags/components/toolbar"

import { fonts } from "@undrstnd/ui/lib/fonts"

import { DesignSystemProvider } from "@undrstnd/ui"

type RootLayoutProperties = {
  readonly children: ReactNode
}

const RootLayout = ({ children }: RootLayoutProperties) => (
  <html lang="en" className={fonts} suppressHydrationWarning>
    <body>
      <DesignSystemProvider>{children}</DesignSystemProvider>
      <Toolbar />
    </body>
  </html>
)

export default RootLayout
