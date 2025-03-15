import { env } from '@/env';
import { withToolbar } from '@undrstnd/feature-flags/lib/toolbar';
import { config, withAnalyzer } from '@undrstnd/next-config';
import { withLogging, withSentry } from '@undrstnd/observability/next-config';
import type { NextConfig } from 'next';

let nextConfig: NextConfig = withToolbar(withLogging(config));

if (env.VERCEL) {
  nextConfig = withSentry(nextConfig);
}

if (env.ANALYZE === 'true') {
  nextConfig = withAnalyzer(nextConfig);
}

export default nextConfig;
