import "@repo/design-system/styles/globals.css"

import type { ReactNode } from "react"
import type { Metadata, Viewport } from "next"
import { DesignSystemProvider } from "@repo/design-system"
import { TailwindIndicator } from "@repo/design-system/components/layout/tailwind-indicator"
import { ModeToggle } from "@repo/design-system/components/shared/mode-toggle"
import { fonts } from "@repo/design-system/lib/fonts"
import { cn } from "@repo/design-system/lib/utils"

import { siteConfig } from "@/lib/config"
import { constructMetadata } from "@/lib/utils"

import { Footer } from "@/components/layout/footer"

export const metadata: Metadata = constructMetadata({
  title: `${siteConfig.name} | ${siteConfig.description}`,
})

export const viewport: Viewport = {
  colorScheme: "dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
}

type RootLayoutProperties = {
  readonly children: ReactNode
}

const RootLayout = ({ children }: RootLayoutProperties) => (
  <html lang="en" suppressHydrationWarning className={fonts}>
    <body
      className={cn(
        "bg-background mx-auto min-h-screen w-full scroll-smooth font-sans antialiased"
      )}
    >
      <DesignSystemProvider>
        {children}
        <Footer />
        {process.env.NODE_ENV === "development" && <ModeToggle />}
        <TailwindIndicator />
      </DesignSystemProvider>
    </body>
  </html>
)

export default RootLayout
