import {
  NextResponse,
  type NextMiddleware,
  type NextRequest,
} from "next/server"
import { authMiddleware } from "@undrstnd/auth/middleware"
import { internationalizationMiddleware } from "@undrstnd/internationalization/middleware"
import { parseError } from "@undrstnd/observability/error"
import { secure } from "@undrstnd/security"
import {
  noseconeMiddleware,
  noseconeOptions,
  noseconeOptionsWithToolbar,
} from "@undrstnd/security/middleware"

import { env } from "@/env"

export const config = {
  // matcher tells Next.js which routes to run the middleware on. This runs the
  // middleware on all routes except for static assets and Posthog ingest
  matcher: ["/((?!_next/static|_next/image|ingest|favicon.ico).*)"],
}

const securityHeaders = env.FLAGS_SECRET
  ? noseconeMiddleware(noseconeOptionsWithToolbar)
  : noseconeMiddleware(noseconeOptions)

const middleware = authMiddleware(async (_auth, request) => {
  const i18nResponse = internationalizationMiddleware(
    request as unknown as NextRequest
  )
  if (i18nResponse) {
    return i18nResponse
  }

  if (!env.ARCJET_KEY) {
    return securityHeaders()
  }

  try {
    await secure(
      [
        // See https://docs.arcjet.com/bot-protection/identifying-bots
        "CATEGORY:SEARCH_ENGINE", // Allow search engines
        "CATEGORY:PREVIEW", // Allow preview links to show OG images
        "CATEGORY:MONITOR", // Allow uptime monitoring services
      ],
      request
    )

    return securityHeaders()
  } catch (error) {
    const message = parseError(error)

    return NextResponse.json({ error: message }, { status: 403 })
  }
}) as unknown as NextMiddleware

export default middleware
