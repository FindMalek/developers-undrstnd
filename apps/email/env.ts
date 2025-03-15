import { createEnv } from "@t3-oss/env-nextjs"

import { keys as email } from "@undrstnd/email/keys"

export const env = createEnv({
  extends: [email()],
  server: {},
  client: {},
  runtimeEnv: {},
})
