import { NextResponse } from "next/server"
import {
  LanguageModelEntity,
  LanguageModelFetchHelper,
} from "@undrstnd/common/entities"
import { database } from "@undrstnd/database"
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

    const models = await database.languageModel.findMany({
      where: LanguageModelFetchHelper.getActiveWhereClause(),
      select: LanguageModelFetchHelper.getSelect(),
    })

    const response = {
      object: "list",
      data: models.map((model) => LanguageModelEntity.getModelRo(model)),
    }

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
