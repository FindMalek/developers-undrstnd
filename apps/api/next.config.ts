import { env } from '@/env';
import { config, withAnalyzer } from '@undrstnd/next-config';
import { withLogtail, withSentry } from '@undrstnd/observability/next-config';
import type { NextConfig } from 'next';

let nextConfig: NextConfig = withLogtail({ ...config });

if (env.VERCEL) {
  nextConfig = withSentry(nextConfig);
}

if (env.ANALYZE === 'true') {
  nextConfig = withAnalyzer(nextConfig);
}

export default nextConfig;
