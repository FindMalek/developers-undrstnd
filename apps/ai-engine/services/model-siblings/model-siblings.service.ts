import { database, LanguageModel, ModelStatus } from "@undrstnd/database"

export class ModelSiblingsService {
  /**
   * Links two models as siblings
   */
  public async linkSiblings(modelId: string, siblingId: string): Promise<void> {
    await database.languageModel.update({
      where: { id: modelId },
      data: {
        siblings: {
          connect: [{ id: siblingId }],
        },
      },
    })

    // Create the reverse relationship
    await database.languageModel.update({
      where: { id: siblingId },
      data: {
        siblings: {
          connect: [{ id: modelId }],
        },
      },
    })
  }

  /**
   * Unlinks two models that were previously siblings
   */
  public async unlinkSiblings(
    modelId: string,
    siblingId: string
  ): Promise<void> {
    await database.languageModel.update({
      where: { id: modelId },
      data: {
        siblings: {
          disconnect: [{ id: siblingId }],
        },
      },
    })

    // Remove the reverse relationship
    await database.languageModel.update({
      where: { id: siblingId },
      data: {
        siblings: {
          disconnect: [{ id: modelId }],
        },
      },
    })
  }

  /**
   * Gets all siblings for a specific model
   */
  public async getModelSiblings(modelId: string): Promise<LanguageModel[]> {
    const model = await database.languageModel.findUnique({
      where: { id: modelId },
      include: {
        siblings: {
          include: {
            provider: true,
          },
        },
      },
    })

    return model?.siblings || []
  }

  /**
   * Gets all operational siblings for a specific model
   * Useful for fallback scenarios
   */
  public async getOperationalSiblings(
    modelId: string
  ): Promise<LanguageModel[]> {
    const model = await database.languageModel.findUnique({
      where: { id: modelId },
      include: {
        siblings: {
          where: { status: ModelStatus.OPERATIONAL },
          include: {
            provider: true,
          },
        },
      },
    })

    return model?.siblings || []
  }

  /**
   * Finds potential siblings based on model parameters and capabilities
   * This can be used to suggest new sibling relationships
   */
  public async findPotentialSiblings(
    modelId: string
  ): Promise<LanguageModel[]> {
    // TODO: After developing the API, we can use AI to determine the siblings
    const model = await database.languageModel.findUnique({
      where: { id: modelId },
    })

    if (!model?.parameters) {
      return []
    }

    // Find models with similar parameters (within 10% range)
    const parameterRange = BigInt(Number(model.parameters) * 0.1)
    const minParameters = model.parameters - parameterRange
    const maxParameters = model.parameters + parameterRange

    return database.languageModel.findMany({
      where: {
        id: { not: modelId },
        parameters: {
          gte: minParameters,
          lte: maxParameters,
        },
        NOT: {
          siblings: {
            some: {
              id: modelId,
            },
          },
        },
      },
      include: {
        provider: true,
      },
    })
  }
}
