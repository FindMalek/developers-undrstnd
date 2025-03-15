import { createEnv } from "@t3-oss/env-nextjs"

import { keys as cms } from "@undrstnd/cms/keys"
import { keys as email } from "@undrstnd/email/keys"
import { keys as flags } from "@undrstnd/feature-flags/keys"
import { keys as core } from "@undrstnd/next-config/keys"
import { keys as observability } from "@undrstnd/observability/keys"
import { keys as rateLimit } from "@undrstnd/rate-limit/keys"
import { keys as security } from "@undrstnd/security/keys"

export const env = createEnv({
  extends: [
    cms(),
    core(),
    email(),
    observability(),
    flags(),
    security(),
    rateLimit(),
  ],
  server: {},
  client: {},
  runtimeEnv: {},
})
