import {
  LanguageModelEntity,
  ProviderEntityDb,
  ProviderSimpleEntityDb,
} from "@undrstnd/common/entities"
import { ProviderRo, ProviderSimpleRo } from "@undrstnd/common/schemas"

export class ProviderEntity {
  static getSimpleRo(entity: ProviderSimpleEntityDb): ProviderSimpleRo {
    return {
      id: entity.id,
      name: entity.name,

      baseUrl: entity.baseUrl,
      apiKey: entity.apiKey,

      updatedAt: entity.updatedAt,
      createdAt: entity.createdAt,
    }
  }

  static getRo(entity: ProviderEntityDb): ProviderRo {
    return {
      ...this.getSimpleRo(entity),
      models: entity.models.map(LanguageModelEntity.getSimpleRo),
    }
  }
}
