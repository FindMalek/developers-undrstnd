import { ModelStatus } from "@prisma/client"
import * as Sentry from "@sentry/nextjs"

import { NextRequest, NextResponse } from "next/server"
import { db } from "@undrstnd/database"
import { parseError } from "@undrstnd/observability/error"
import { log } from "@undrstnd/observability/log"

import { verifyKey } from "@/lib/auth"
import { addRateLimitHeaders, rateLimitRequest } from "@/lib/rate-limit"

export async function GET(request: NextRequest) {
  const requestId = crypto.randomUUID()
  const startTime = Date.now()

  try {
    log.info("MODELS_LIST_REQUEST", { requestId })

    // Check API key and rate limit (optional for the models endpoint)
    const authHeader = request.headers.get("Authorization")
    let rateLimitResult = { success: true, remaining: undefined } as const

    if (authHeader) {
      const isValidKey = await verifyKey(authHeader)
      if (!isValidKey) {
        return NextResponse.json(
          {
            error: { message: "Invalid API key", type: "authentication_error" },
          },
          { status: 401 }
        )
      }

      rateLimitResult = await rateLimitRequest(request)
      if (!rateLimitResult.success && rateLimitResult.response) {
        return rateLimitResult.response
      }
    }

    // Get all operational models
    const models = await db.aIModel.findMany({
      where: {
        status: ModelStatus.OPERATIONAL,
      },
      include: {
        provider: true,
      },
      orderBy: {
        externalId: "asc",
      },
    })

    // Transform to OpenAI format
    const modelData = models.map((model) => ({
      id: model.externalId,
      object: "model",
      created: Math.floor(model.created.getTime() / 1000),
      owned_by: model.owner || model.provider.name,
    }))

    const responseData = {
      object: "list",
      data: modelData,
    }

    const response = NextResponse.json(responseData)

    // Add rate limit headers if applicable
    if (rateLimitResult.remaining !== undefined) {
      return addRateLimitHeaders(
        response,
        1000,
        rateLimitResult.remaining,
        3600
      )
    }

    return response
  } catch (error) {
    const message = parseError(error)
    log.error("MODELS_LIST_ERROR", { error: message, requestId })

    Sentry.captureException(error, {
      tags: { endpoint: "/v1/models", requestId },
    })

    return NextResponse.json(
      {
        error: {
          message: "An error occurred while listing models",
          type: "service_error",
        },
      },
      { status: 500 }
    )
  } finally {
    const duration = Date.now() - startTime
    log.info("MODELS_LIST_COMPLETED", { requestId, duration })
  }
}
