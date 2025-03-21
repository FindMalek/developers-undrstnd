import { ModelStatus } from "@prisma/client"
import axios from "axios"

import { db } from "@undrstnd/database"
import { parseError } from "@undrstnd/observability/error"
import { log } from "@undrstnd/observability/log"

interface ProviderModelResponse {
  object: string
  data: Array<{
    id: string
    object: string
    created: number
    owned_by: string
  }>
}

export async function syncModelsFromProviders() {
  try {
    const providers = await db.provider.findMany()

    if (providers.length === 0) {
      log.warn("MODEL_SYNC_NO_PROVIDERS", {
        message: "No providers found in database",
      })
      return
    }

    log.info("MODEL_SYNC_STARTED", { providerCount: providers.length })

    for (const provider of providers) {
      await syncProviderModels(provider)
    }

    log.info("MODEL_SYNC_COMPLETED")
  } catch (error) {
    const message = parseError(error)
    log.error("MODEL_SYNC_FAILED", { error: message })
    throw error
  }
}

async function syncProviderModels(provider: {
  id: string
  name: string
  baseUrl: string
  apiKey: string
}) {
  try {
    log.info("MODEL_SYNC_PROVIDER_STARTED", { provider: provider.name })

    const response = await axios.get<ProviderModelResponse>(
      `${provider.baseUrl}/v1/models`,
      {
        headers: {
          Authorization: `Bearer ${provider.apiKey}`,
        },
        timeout: 10000, // 10 second timeout
      }
    )

    if (!response.data?.data?.length) {
      log.warn("MODEL_SYNC_NO_MODELS", { provider: provider.name })
      return
    }

    const fetchedModels = response.data.data
    log.info("MODEL_SYNC_MODELS_FETCHED", {
      provider: provider.name,
      modelCount: fetchedModels.length,
    })

    for (const modelData of fetchedModels) {
      await processModelData(provider.id, modelData)
    }
  } catch (error) {
    const message = parseError(error)
    log.error("MODEL_SYNC_PROVIDER_FAILED", {
      provider: provider.name,
      error: message,
    })
  }
}

async function processModelData(
  providerId: string,
  modelData: { id: string; created: number; owned_by: string }
) {
  try {
    // Check if model already exists
    const existingModel = await db.aIModel.findUnique({
      where: {
        providerId_externalId: {
          providerId,
          externalId: modelData.id,
        },
      },
    })

    if (existingModel) {
      // Update existing model
      await db.aIModel.update({
        where: { id: existingModel.id },
        data: {
          lastFetched: new Date(),
          owner: modelData.owned_by,
          // Reset error count if model was previously degraded but is now available
          ...(existingModel.status === ModelStatus.DEGRADED && {
            errorCount: 0,
            status: ModelStatus.OPERATIONAL,
          }),
        },
      })
      return
    }

    // Create new model
    const newModel = await db.aIModel.create({
      data: {
        externalId: modelData.id,
        providerId,
        owner: modelData.owned_by,
        created: new Date(modelData.created * 1000),
        lastFetched: new Date(),
        // Set default costs - these should be updated with accurate values
        inputCost: 0,
        outputCost: 0,
      },
    })

    // Notify via webhook about new model
    await notifyNewModel(newModel)

    log.info("MODEL_SYNC_NEW_MODEL_ADDED", {
      provider: providerId,
      modelId: modelData.id,
    })
  } catch (error) {
    const message = parseError(error)
    log.error("MODEL_SYNC_PROCESS_MODEL_FAILED", {
      providerId,
      modelId: modelData.id,
      error: message,
    })
  }
}

async function notifyNewModel(model: {
  id: string
  providerId: string
  externalId: string
}) {
  try {
    const provider = await db.provider.findUnique({
      where: { id: model.providerId },
    })

    if (!provider) {
      const message = parseError(new Error("Provider not found"))
      log.error("MODEL_SYNC_WEBHOOK_PROVIDER_NOT_FOUND", {
        providerId: model.providerId,
        error: message,
      })
      return
    }

    await axios.post("https://api.undrstnd.dev/webhooks/model-discovery", {
      event: "model_discovered",
      model_id: model.id,
      provider: provider.name,
      external_id: model.externalId,
      timestamp: new Date().toISOString(),
    })

    log.info("MODEL_SYNC_WEBHOOK_SENT", {
      modelId: model.id,
      providerId: model.providerId,
    })
  } catch (error) {
    const message = parseError(error)
    log.error("MODEL_SYNC_WEBHOOK_FAILED", {
      modelId: model.id,
      error: message,
    })
  }
}

// Find and link equivalent models across providers
export async function linkSiblingModels() {
  // This is a simplistic approach - in reality, you would need more sophisticated
  // matching logic based on model capabilities, versions, etc.
  const models = await db.aIModel.findMany({
    include: { provider: true },
  })

  // Group models by their name (excluding provider-specific prefixes)
  const modelGroups = new Map<string, typeof models>()

  for (const model of models) {
    // Extract base model name (this is a simplified example)
    // In real implementation, consider using regex or more advanced extraction
    const baseName = model.externalId.split("/").pop() || model.externalId

    const group = modelGroups.get(baseName) || []
    group.push(model)
    modelGroups.set(baseName, group)
  }

  // Connect siblings
  for (const [_, group] of modelGroups.entries()) {
    if (group.length > 1) {
      for (const model of group) {
        // Get IDs of siblings (all models in the group except this one)
        const siblingIds = group
          .filter((m) => m.id !== model.id)
          .map((m) => m.id)

        // Update model's siblings
        await db.aIModel.update({
          where: { id: model.id },
          data: {
            siblings: {
              connect: siblingIds.map((id) => ({ id })),
            },
          },
        })
      }
    }
  }
}
