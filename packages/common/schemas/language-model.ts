import * as z from "zod"

import { modelStatusSchema, providerSimpleSchema } from "./index"

export const languageModelSimpleSchema = z.object({
  id: z.string(),
  externalId: z.string(),

  name: z.string().nullable(),
  owner: z.string().nullable(),
  parameters: z.bigint().nullable(),

  inputCost: z.number(),
  outputCost: z.number(),

  consecutiveErrorCount: z.number(),
  status: modelStatusSchema,

  lastFetched: z.date(),
  createdAt: z.date(),

  providerId: z.string(),
  provider: providerSimpleSchema,
})

export type LanguageModelSimpleRo = z.infer<typeof languageModelSimpleSchema>

export const languageModelSchema = languageModelSimpleSchema.extend({
  siblings: z.array(languageModelSimpleSchema),
  provider: providerSimpleSchema,
})

export type LanguageModelRo = z.infer<typeof languageModelSchema>
