import { authMiddleware } from '@undrstnd/auth/middleware';
import {
  noseconeConfig,
  noseconeMiddleware,
} from '@undrstnd/security/middleware';

const securityHeaders = noseconeMiddleware(noseconeConfig);

export default authMiddleware(() => securityHeaders());

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
