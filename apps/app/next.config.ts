import { env } from '@undrstnd/env';
import { withToolbar } from '@undrstnd/feature-flags/lib/toolbar';
import { config, withAnalyzer } from '@undrstnd/next-config';
import { withLogtail, withSentry } from '@undrstnd/observability/next-config';
import type { NextConfig } from 'next';

let nextConfig: NextConfig = withToolbar(withLogtail({ ...config }));

if (env.VERCEL) {
  nextConfig = withSentry(nextConfig);
}

if (env.ANALYZE === 'true') {
  nextConfig = withAnalyzer(nextConfig);
}

export default nextConfig;
