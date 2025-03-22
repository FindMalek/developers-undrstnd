import * as z from "zod"

import { languageModelSimpleSchema } from "./index"

export const providerSimpleSchema = z.object({
  id: z.string(),
  name: z.string(),

  baseUrl: z.string().url(),
  apiKey: z.string(),

  updatedAt: z.date(),
  createdAt: z.date(),
})

export type ProviderSimpleRo = z.infer<typeof providerSimpleSchema>

export const providerSchema = providerSimpleSchema.extend({
  models: z.array(languageModelSimpleSchema),
})

export type ProviderRo = z.infer<typeof providerSchema>
