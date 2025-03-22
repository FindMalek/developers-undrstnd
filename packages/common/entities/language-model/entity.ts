import {
  LanguageModelEntityDb,
  LanguageModelSimpleEntityDb,
  ProviderEntity,
} from "@undrstnd/common/entities"
import {
  LanguageModelRo,
  LanguageModelSimpleRo,
} from "@undrstnd/common/schemas"

export class LanguageModelEntity {
  static getSimpleRo(
    entity: LanguageModelSimpleEntityDb
  ): LanguageModelSimpleRo {
    return {
      id: entity.id,
      externalId: entity.externalId,

      name: entity.name,
      owner: entity.owner,
      parameters: entity.parameters,

      inputCost: entity.inputCost,
      outputCost: entity.outputCost,

      consecutiveErrorCount: entity.consecutiveErrorCount,
      status: entity.status,

      lastFetched: entity.lastFetched,
      createdAt: entity.createdAt,

      providerId: entity.providerId,
      provider: ProviderEntity.getSimpleRo(entity.provider),
    }
  }

  static getRo(entity: LanguageModelEntityDb): LanguageModelRo {
    return {
      ...this.getSimpleRo(entity),

      siblings: entity.siblings.map(LanguageModelEntity.getSimpleRo),
      provider: ProviderEntity.getSimpleRo(entity.provider),
    }
  }
}
