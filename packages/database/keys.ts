import { createEnv } from "@t3-oss/env-nextjs"
import { z } from "zod"

export const keys = () =>
  createEnv({
    server: {
      NODE_ENV: z.enum(["development", "production"]),
      DATABASE_URL: z.string().min(1).url(),
    },
    runtimeEnv: {
      NODE_ENV: process.env.NODE_ENV,
      DATABASE_URL: process.env.DATABASE_URL,
    },
  })
