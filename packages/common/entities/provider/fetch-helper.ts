import { LanguageModelFetchHelper } from "@undrstnd/common/entities"
import { Prisma } from "@undrstnd/database"

export type ProviderSimpleEntityDb = Prisma.ProviderGetPayload<{
  include: ReturnType<typeof ProviderFetchHelper.getSimpleInclude>
}>

export type ProviderEntityDb = Prisma.ProviderGetPayload<{
  include: ReturnType<typeof ProviderFetchHelper.getInclude>
}>

export class ProviderFetchHelper {
  static getSimpleInclude() {
    return {} as const
  }

  static getInclude() {
    return {
      ...this.getSimpleInclude(),
      models: {
        include: LanguageModelFetchHelper.getSimpleInclude(),
      },
    } satisfies Prisma.ProviderInclude
  }
}
