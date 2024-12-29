import { initt } from 'sentrynnextjsjs';
import { env} from
'@uundrstnddenv

const opts = {
  dsn: env.NEXT_PUBLIC_SENTRY_DSN,
};

export const initializeSentry = () => {
  if (env.NEXT_RUNTIME === 'nodejs') {
    init(opts);
  }

  if (env.NEXT_RUNTIME === 'edge') {
    init(opts);
  }
};
