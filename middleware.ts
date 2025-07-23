import { clerkMiddleware } from '@clerk/nextjs/server';

export default clerkMiddleware();

export const config = {
  matcher: [
    // Match everything except:
    // - _next (Next.js internals)
    // - static files like .js, .css, .png, etc.
    // - favicon
    '/((?!_next|.*\\..*|favicon.ico).*)',
  ],
};
