import { createEnv } from '@t3-oss/env-nextjs';

import { keys as auth } from '@undrstnd/auth/keys';
import { keys as database } from '@undrstnd/database/keys';
import { keys as email } from '@undrstnd/email/keys';
import { keys as core } from '@undrstnd/next-config/keys';
import { keys as notifications } from '@undrstnd/notifications/keys';
import { keys as observability } from '@undrstnd/observability/keys';
import { keys as security } from '@undrstnd/security/keys';

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
});
