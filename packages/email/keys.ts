import { createEnv } from "@t3-oss/env-nextjs"
import { z } from "zod"

export const keys = () =>
  createEnv({
    server: {
      RESEND_FROM: z.string().min(1).email(),
      RESEND_TOKEN: z.string().min(1).startsWith("re_"),
    },
    client: {
      NEXT_PUBLIC_WAITLIST_URL: z.string().url(),
    },
    runtimeEnv: {
      RESEND_FROM: process.env.RESEND_FROM,
      RESEND_TOKEN: process.env.RESEND_TOKEN,
      NEXT_PUBLIC_WAITLIST_URL: process.env.NEXT_PUBLIC_WAITLIST_URL,
    },
  })
