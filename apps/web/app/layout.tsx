import "@undrstnd/ui/styles/globals.css"
import "./styles/web.css"

import type { ReactNode } from "react"
import { Toolbar } from "@undrstnd/feature-flags/components/toolbar"
import { cn } from "@undrstnd/ui/lib/utils"

import { fonts } from "@undrstnd/ui/lib/fonts"

import { DesignSystemProvider } from "@undrstnd/ui"

import { Footer } from "./components/footer"
import { Header } from "./components/header"

type RootLayoutProperties = {
  readonly children: ReactNode
}

const RootLayout = ({ children }: RootLayoutProperties) => (
  <html
    lang="en"
    className={cn(fonts, "scroll-smooth")}
    suppressHydrationWarning
  >
    <body>
      <DesignSystemProvider>
        <Header />
        {children}
        <Footer />
      </DesignSystemProvider>
      <Toolbar />
    </body>
  </html>
)

export default RootLayout
