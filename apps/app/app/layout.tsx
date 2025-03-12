import "@undrstnd/design-system/styles/globals.css"

import type { ReactNode } from "react"
import { DesignSystemProvider } from "@undrstnd/design-system"
import { fonts } from "@undrstnd/design-system/lib/fonts"
import { Toolbar } from "@undrstnd/feature-flags/components/toolbar"

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
