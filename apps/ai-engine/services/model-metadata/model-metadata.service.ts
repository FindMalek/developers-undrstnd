import { database, LanguageModel, ModelStatus } from "@undrstnd/database"

// TODO: Please use `zod` schema and interface, and put it in the `@undrstnd/common/schema` package
export interface IModelMetadataUpdate {
  parameters?: bigint
  inputCost: number
  outputCost: number
  status: ModelStatus
}

export class ModelMetadataService {
  /**
   * Updates metadata for a specific model
   */
  public async updateModelMetadata(
    modelId: string,
    metadata: IModelMetadataUpdate
  ): Promise<LanguageModel> {
    return database.languageModel.update({
      where: { id: modelId },
      data: metadata,
    })
  }

  /**
   * Updates the status of a model based on consecutive errors
   */
  public async updateModelStatus(
    modelId: string,
    consecutiveErrors: number
  ): Promise<LanguageModel> {
    const status =
      consecutiveErrors >= 3 ? ModelStatus.DEGRADED : ModelStatus.OPERATIONAL

    return database.languageModel.update({
      where: { id: modelId },
      data: {
        status,
        consecutiveErrorCount: consecutiveErrors,
      },
    })
  }

  /**
   * Gets metadata for a specific model
   */
  public async getModelMetadata(
    modelId: string
  ): Promise<LanguageModel | null> {
    return database.languageModel.findUnique({
      where: { id: modelId },
    })
  }

  /**
   * Gets metadata for all models from a specific provider
   */
  public async getProviderModelsMetadata(
    providerId: string
  ): Promise<LanguageModel[]> {
    return database.languageModel.findMany({
      where: { providerId },
    })
  }

  /**
   * Gets all operational models
   */
  public async getOperationalModels(): Promise<LanguageModel[]> {
    return database.languageModel.findMany({
      where: { status: ModelStatus.OPERATIONAL },
      include: {
        provider: true,
        siblings: true,
      },
    })
  }

  /**
   * Gets all degraded models
   */
  public async getDegradedModels(): Promise<LanguageModel[]> {
    return database.languageModel.findMany({
      where: { status: ModelStatus.DEGRADED },
      include: {
        provider: true,
        siblings: {
          where: { status: ModelStatus.OPERATIONAL },
        },
      },
    })
  }
}
