import * as z from "zod"

import { ModelStatus } from "@undrstnd/database"

export const LIST_OF_MODEL_STATUSES = [
  ModelStatus.OPERATIONAL,
  ModelStatus.DEGRADED,
  ModelStatus.MAINTENANCE,
  ModelStatus.UNAVAILABLE,
  ModelStatus.DEPRECATED,
] as const

export const modelStatusSchema = z.enum(LIST_OF_MODEL_STATUSES)

export type ModelStatusRo = z.infer<typeof modelStatusSchema>
