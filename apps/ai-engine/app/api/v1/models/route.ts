import { NextResponse } from "next/server"
import { database, ModelStatus } from "@undrstnd/database"
import { parseError } from "@undrstnd/observability/error"
import { log } from "@undrstnd/observability/log"

export async function GET(request: Request) {
  try {
    const authHeader = request.headers.get("authorization")
    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json(
        { error: { message: "Missing or invalid API key" } },
        { status: 401 }
      )
    }

    const apiKey = authHeader.slice(7)
    const key = await database.aPIKey.findUnique({
      where: { key: apiKey },
    })

    if (!key || key.isRevoked || key.isDeleted) {
      return NextResponse.json(
        { error: { message: "Invalid API key" } },
        { status: 401 }
      )
    }

    // TODO: Please create a fetch-helper for the selected fields
    // TODO: Please create a fetch-helper for the where clause
    const models = await database.languageModel.findMany({
      where: {
        status: ModelStatus.OPERATIONAL,
      },
      select: {
        id: true,
        externalId: true,
        name: true,
        owner: true,
        createdAt: true,
      },
    })

    // TODO: Please create a entity for the return object
    const response = {
      object: "list",
      data: models.map((model) => ({
        id: model.externalId,
        object: "model",
        created: Math.floor(model.createdAt.getTime() / 1000),
        owned_by: model.owner || "undrstnd",
      })),
    }

    // Log the request
    log.info("MODELS_LISTED", {
      apiKeyId: key.id,
      modelCount: models.length,
    })

    return NextResponse.json(response)
  } catch (error) {
    const message = parseError(error)
    log.error("MODELS_LIST_ERROR", {
      error: message,
    })

    return NextResponse.json(
      { error: { message: "Internal server error" } },
      { status: 500 }
    )
  }
}
