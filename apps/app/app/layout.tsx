import "@repo/design-system/styles/globals.css"

import type { ReactNode } from "react"
import { DesignSystemProvider } from "@repo/design-system"
import { fonts } from "@repo/design-system/lib/fonts"
import { Toolbar } from "@repo/feature-flags/components/toolbar"

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
