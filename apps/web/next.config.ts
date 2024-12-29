import { withCMS } from '@undrstnd/cms/next-config';
import { env } from '@undrstnd/env';
import { config, withAnalyzer, withSentry } from '@undrstnd/next-config';
import type { NextConfig } from 'next';

let nextConfig: NextConfig = { ...config };

nextConfig.images?.remotePatterns?.push({
  protocol: 'https',
  hostname: 'assets.basehub.com',
});

if (process.env.NODE_ENV === 'production') {
  const redirects: NextConfig['redirects'] = async () => [
    {
      source: '/legal',
      destination: '/legal/privacy',
      statusCode: 301,
    },
  ];

  nextConfig.redirects = redirects;
}

if (env.VERCEL) {
  nextConfig = withSentry(nextConfig);
}

if (env.ANALYZE === 'true') {
  nextConfig = withAnalyzer(nextConfig);
}

export default withCMS(nextConfig);
