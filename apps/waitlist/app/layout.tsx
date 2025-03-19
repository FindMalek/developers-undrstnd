import "@undrstnd/design-system/styles/globals.css"

import type { ReactNode } from "react"
import type { Metadata, Viewport } from "next"
import { DesignSystemProvider } from "@undrstnd/design-system"
import { TailwindIndicator } from "@undrstnd/design-system/components/layout/tailwind-indicator"
import { ModeToggle } from "@undrstnd/design-system/components/shared/mode-toggle"
import { fonts } from "@undrstnd/design-system/lib/fonts"
import { cn } from "@undrstnd/design-system/lib/utils"
import { site } from "@undrstnd/seo/config"
import { createMetadata } from "@undrstnd/seo/metadata"

import { Footer } from "@/components/layout/footer"

export const metadata: Metadata = createMetadata({
  title: `${site.name} | ${site.description}`,
  description: site.description,
  image: "/og.png",
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
      <DesignSystemProvider auth={false}>
        {children}
        {process.env.NODE_ENV === "development" && <ModeToggle />}
        <Footer />
        <TailwindIndicator />
      </DesignSystemProvider>
    </body>
  </html>
)

export default RootLayout
