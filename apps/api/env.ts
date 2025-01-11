import { keys as analytics } from "@undrstnd/analytics/keys"
import { keys as auth } from "@undrstnd/auth/keys"
import { keys as database } from "@undrstnd/database/keys"
import { keys as email } from "@undrstnd/email/keys"
import { keys as core } from "@undrstnd/next-config/keys"
import { keys as observability } from "@undrstnd/observability/keys"
import { keys as payments } from "@undrstnd/payments/keys"
import { createEnv } from "@t3-oss/env-nextjs"

export const env = createEnv({
  extends: [
    auth(),
    analytics(),
    core(),
    database(),
    email(),
    observability(),
    payments(),
  ],
  server: {},
  client: {},
  runtimeEnv: {},
})
