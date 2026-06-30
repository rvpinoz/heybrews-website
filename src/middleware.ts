import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname.startsWith('/admin/login')) return NextResponse.next();

  // Auth.js database sessions store a cookie named __Secure-authjs.session-token (prod)
  // or authjs.session-token (dev). Check for either.
  const hasSession =
    req.cookies.has('authjs.session-token') ||
    req.cookies.has('__Secure-authjs.session-token');

  if (!hasSession) {
    const loginUrl = new URL('/admin/login', req.url);
    loginUrl.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Role check happens in admin layout (server component) where Prisma is available
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
