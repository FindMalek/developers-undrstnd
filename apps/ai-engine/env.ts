import { createEnv } from "@t3-oss/env-nextjs"

import { keys as auth } from "@repo/auth/keys"
import { keys as database } from "@repo/database/keys"
import { keys as email } from "@repo/email/keys"
import { keys as core } from "@repo/next-config/keys"
import { keys as notifications } from "@repo/notifications/keys"
import { keys as observability } from "@repo/observability/keys"
import { keys as security } from "@repo/security/keys"

export const env = createEnv({
  extends: [
    auth(),
    core(),
    database(),
    email(),
    observability(),
    security(),
    notifications(),
  ],
  server: {},
  client: {},
  runtimeEnv: {},
})
