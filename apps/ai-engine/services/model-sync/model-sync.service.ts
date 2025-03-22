import { ModelMetadataService } from "@/services/model-metadata/model-metadata.service"
import { ModelSiblingsService } from "@/services/model-siblings/model-siblings.service"

import {
  database,
  LanguageModel,
  ModelStatus,
  Provider,
} from "@undrstnd/database"
import { parseError } from "@undrstnd/observability/error"
import { log } from "@undrstnd/observability/log"

interface IProviderModelResponse {
  object: string
  data: Array<{
    id: string
    object: string
    created: number
    owned_by: string
  }>
}

interface IModelSyncResult {
  providerId: string
  newModels: number
  updatedModels: number
  errors?: string[]
}

export class ModelSyncService {
  private metadataService: ModelMetadataService
  private siblingsService: ModelSiblingsService

  constructor() {
    this.metadataService = new ModelMetadataService()
    this.siblingsService = new ModelSiblingsService()
  }

  private async fetchProviderModels(
    provider: Provider
  ): Promise<IProviderModelResponse> {
    try {
      const response = await fetch(`${provider.baseUrl}/v1/models`, {
        headers: {
          Authorization: `Bearer ${provider.apiKey}`,
          "Content-Type": "application/json",
        },
      })

      if (!response.ok) {
        const message = parseError(
          new Error(
            `Failed to fetch models from ${provider.name}: ${response.statusText}`
          )
        )
        log.error("MODEL_SYNC_FETCH_ERROR", {
          providerId: provider.id,
          error: message,
        })
        throw new Error(message)
      }

      return await response.json()
    } catch (error) {
      const message = parseError(error)
      log.error("MODEL_SYNC_FETCH_ERROR", {
        providerId: provider.id,
        error: message,
      })
      throw error
    }
  }

  /**
   * Determines the appropriate metadata for a model based on its name and provider
   */
  private async determineModelMetadata(
    model: { id: string; owned_by: string },
    providerId: string
  ): Promise<{
    parameters?: bigint
    inputCost: number
    outputCost: number
  }> {
    // TODO: After developing the API, we can use AI to determine the metadata
    // Extract model size from name if possible
    const sizeMatch = model.id.match(/(\d+)b/i)
    const parameterSize = sizeMatch
      ? BigInt(parseInt(sizeMatch[1]) * 1000000000) // Convert to billions
      : undefined

    // Set default costs based on size
    let inputCost = 0.0001
    let outputCost = 0.0002

    // Adjust costs based on model size if available
    if (parameterSize !== undefined) {
      if (parameterSize >= BigInt(70000000000)) {
        // 70B+
        inputCost = 0.0007
        outputCost = 0.0014
      } else if (parameterSize >= BigInt(13000000000)) {
        // 13B+
        inputCost = 0.0003
        outputCost = 0.0006
      }
    }

    return {
      parameters: parameterSize,
      inputCost,
      outputCost,
    }
  }

  private async processNewModel(
    model: { id: string; created: number; owned_by: string },
    provider: Provider
  ): Promise<LanguageModel> {
    // Create the model with basic info first
    const newModel = await database.languageModel.create({
      data: {
        externalId: model.id,
        name: model.id,
        owner: model.owned_by,
        providerId: provider.id,
        createdAt: new Date(model.created * 1000),
        status: ModelStatus.OPERATIONAL,
        inputCost: 0, // Default values, will be updated below
        outputCost: 0,
      },
    })

    // Determine and set appropriate metadata
    const metadata = await this.determineModelMetadata(model, provider.id)
    await this.metadataService.updateModelMetadata(newModel.id, {
      parameters: metadata.parameters,
      inputCost: metadata.inputCost,
      outputCost: metadata.outputCost,
      status: ModelStatus.OPERATIONAL,
    })

    // Find and link potential siblings
    const potentialSiblings = await this.siblingsService.findPotentialSiblings(
      newModel.id
    )
    for (const sibling of potentialSiblings) {
      await this.siblingsService.linkSiblings(newModel.id, sibling.id)
    }

    // Notify via webhook that a new model was discovered
    await this.notifyModelDiscovery(newModel, provider)

    return newModel
  }

  /**
   * Sends a notification to the model discovery webhook
   */
  private async notifyModelDiscovery(
    model: LanguageModel,
    provider: Provider
  ): Promise<void> {
    try {
      await fetch("https://api.undrstnd.dev/webhooks/model-discovery", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          event: "model_discovered",
          model_id: model.id,
          provider: provider.name,
          external_id: model.externalId,
          timestamp: new Date().toISOString(),
        }),
      })
    } catch (error) {
      const message = parseError(error)
      log.error("MODEL_DISCOVERY_WEBHOOK_ERROR", {
        modelId: model.id,
        providerId: provider.id,
        error: message,
      })
      // Don't rethrow - we don't want to fail the sync if the webhook fails
    }
  }

  public async syncProviderModels(
    providerId: string
  ): Promise<IModelSyncResult> {
    const result: IModelSyncResult = {
      providerId,
      newModels: 0,
      updatedModels: 0,
      errors: [],
    }

    try {
      const provider = await database.provider.findUnique({
        where: { id: providerId },
      })

      if (!provider) {
        const message = parseError(
          new Error(`Provider not found: ${providerId}`)
        )
        log.error("MODEL_SYNC_PROVIDER_NOT_FOUND", {
          providerId,
          error: message,
        })
        result.errors?.push(message)
        return result
      }

      const providerModels = await this.fetchProviderModels(provider)

      for (const model of providerModels.data) {
        try {
          const existingModel = await database.languageModel.findUnique({
            where: {
              providerId_externalId: {
                providerId: provider.id,
                externalId: model.id,
              },
            },
          })

          if (existingModel) {
            // Update existing model basic info
            await database.languageModel.update({
              where: { id: existingModel.id },
              data: {
                name: model.id,
                owner: model.owned_by,
                lastFetched: new Date(),
              },
            })

            // Reset error count on successful fetch
            if (existingModel.consecutiveErrorCount > 0) {
              await this.metadataService.updateModelStatus(existingModel.id, 0)
            }

            result.updatedModels++
          } else {
            await this.processNewModel(model, provider)
            result.newModels++
          }
        } catch (error) {
          const message = parseError(error)
          log.error("MODEL_SYNC_PROCESS_MODEL_ERROR", {
            providerId: provider.id,
            modelId: model.id,
            error: message,
          })
          result.errors?.push(`Error processing model ${model.id}: ${message}`)
        }
      }
    } catch (error) {
      const message = parseError(error)
      log.error("MODEL_SYNC_PROVIDER_SYNC_ERROR", {
        providerId,
        error: message,
      })
      result.errors?.push(`Provider sync failed: ${message}`)
    }

    return result
  }

  public async syncAllProviders(): Promise<IModelSyncResult[]> {
    const providers = await database.provider.findMany()
    const results: IModelSyncResult[] = []

    for (const provider of providers) {
      try {
        const result = await this.syncProviderModels(provider.id)
        results.push(result)
      } catch (error) {
        const message = parseError(error)
        log.error("MODEL_SYNC_PROVIDER_SYNC_ERROR", {
          providerId: provider.id,
          error: message,
        })
        results.push({
          providerId: provider.id,
          newModels: 0,
          updatedModels: 0,
          errors: [message],
        })
      }
    }

    return results
  }
}
