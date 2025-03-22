import { createEnv } from "@t3-oss/env-nextjs"
import { z } from "zod"

export const keys = () =>
  createEnv({
    server: {
      ARCJET_KEY: z.string().min(1).startsWith("ajkey_").optional(),
      CRON_SECRET: z.string().min(1).startsWith("cron_").optional(),
      MODEL_SUMMARY_RECIPIENTS: z.string().optional(),
    },
    runtimeEnv: {
      ARCJET_KEY: process.env.ARCJET_KEY,
      CRON_SECRET: process.env.CRON_SECRET,
      MODEL_SUMMARY_RECIPIENTS: process.env.MODEL_SUMMARY_RECIPIENTS,
    },
  })
