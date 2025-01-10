import { createEnv } from "@t3-oss/env-nextjs"
import { keys as analytics } from "@undrstnd/analytics/keys"
import { keys as auth } from "@undrstnd/auth/keys"
import { keys as collaboration } from "@undrstnd/collaboration/keys"
import { keys as database } from "@undrstnd/database/keys"
import { keys as email } from "@undrstnd/email/keys"
import { keys as flags } from "@undrstnd/feature-flags/keys"
import { keys as core } from "@undrstnd/next-config/keys"
import { keys as observability } from "@undrstnd/observability/keys"
import { keys as security } from "@undrstnd/security/keys"
import { keys as webhooks } from "@undrstnd/webhooks/keys"

export const env = createEnv({
  extends: [
    auth(),
    analytics(),
    collaboration(),
    core(),
    database(),
    email(),
    flags(),
    observability(),
    security(),
    webhooks(),
  ],
  server: {},
  client: {},
  runtimeEnv: {},
})
