import { ProviderFetchHelper } from "@undrstnd/common/entities"
import { ModelStatus, type Prisma } from "@undrstnd/database"

export type LanguageModelSimpleEntityDb = Prisma.LanguageModelGetPayload<{
  include: ReturnType<typeof LanguageModelFetchHelper.getSimpleInclude>
}>

export type LanguageModelEntityDb = Prisma.LanguageModelGetPayload<{
  include: ReturnType<typeof LanguageModelFetchHelper.getInclude>
}>

export type LanguageModelEntitySelect = Prisma.LanguageModelGetPayload<{
  select: ReturnType<typeof LanguageModelFetchHelper.getSelect>
}>

export class LanguageModelFetchHelper {
  static getSimpleInclude() {
    return {
      provider: ProviderFetchHelper.getSimpleInclude(),
    } satisfies Prisma.LanguageModelInclude
  }

  static getInclude() {
    return {
      ...this.getSimpleInclude(),
      siblings: { include: this.getSimpleInclude() },
    } satisfies Prisma.LanguageModelInclude
  }

  static getActiveWhereClause() {
    return {
      status: {
        in: [ModelStatus.OPERATIONAL, ModelStatus.DEGRADED],
      },
    } satisfies Prisma.LanguageModelWhereInput
  }

  static getSelect() {
    return {
      id: true,
      externalId: true,
      name: true,
      owner: true,
      createdAt: true,
    } satisfies Prisma.LanguageModelSelect
  }
}
