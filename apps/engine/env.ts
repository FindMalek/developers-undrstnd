import { createEnv } from "@t3-oss/env-nextjs"
import { keys as analytics } from "@undrstnd/analytics/keys"
import { keys as database } from "@undrstnd/database/keys"
import { keys as core } from "@undrstnd/next-config/keys"
import { keys as observability } from "@undrstnd/observability/keys"

export const env = createEnv({
  extends: [analytics(), core(), database(), observability()],
  server: {},
  client: {},
  runtimeEnv: {},
})
