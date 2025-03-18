import type { ThemeProviderProps } from "next-themes"

import { AnalyticsProvider } from "@undrstnd/analytics"
import { AuthProvider } from "@undrstnd/auth/provider"
import { Toaster } from "@undrstnd/design-system/components/ui/sonner"
import { TooltipProvider } from "@undrstnd/design-system/components/ui/tooltip"
import { ThemeProvider } from "@undrstnd/design-system/providers/theme"

type DesignSystemProviderProperties = ThemeProviderProps & {
  auth?: boolean
}

export const DesignSystemProvider = ({
  auth = true,
  children,
  ...properties
}: DesignSystemProviderProperties) => (
  <ThemeProvider {...properties}>
    {auth ? (
      <AuthProvider>
        <AnalyticsProvider>
          <TooltipProvider>{children}</TooltipProvider>
          <Toaster />
        </AnalyticsProvider>
      </AuthProvider>
    ) : (
      <AnalyticsProvider>
        <TooltipProvider>{children}</TooltipProvider>
        <Toaster />
      </AnalyticsProvider>
    )}
  </ThemeProvider>
)
