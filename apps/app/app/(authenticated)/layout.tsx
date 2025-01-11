import type { ReactNode } from "react"
import { auth, currentUser } from "@undrstnd/auth/server"
import { showBetaFeature } from "@undrstnd/feature-flags"
import { secure } from "@undrstnd/security"

import { env } from "@/env"

import { SidebarProvider } from "@undrstnd/ui"

import { PostHogIdentifier } from "./components/posthog-identifier"
import { GlobalSidebar } from "./components/sidebar"

type AppLayoutProperties = {
  readonly children: ReactNode
}

const AppLayout = async ({ children }: AppLayoutProperties) => {
  if (env.ARCJET_KEY) {
    await secure(["CATEGORY:PREVIEW"])
  }

  const user = await currentUser()
  const { redirectToSignIn } = await auth()
  const betaFeature = await showBetaFeature()

  if (!user) {
    redirectToSignIn()
  }

  return (
    <SidebarProvider>
      <GlobalSidebar>
        {betaFeature && (
          <div className="bg-success text-success-foreground m-4 rounded-full p-1.5 text-center text-sm">
            Beta feature now available
          </div>
        )}
        {children}
      </GlobalSidebar>
      <PostHogIdentifier />
    </SidebarProvider>
  )
}

export default AppLayout
