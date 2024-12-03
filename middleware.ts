import { NextRequest, NextResponse } from 'next/server';

const regexPaths = {
  public: [
    /^\/signup$/,
    /^\/$/,
    /^\/forgot-password$/,
    /^\/character\/[^/]+$/,
    /^\/character\/[^/]+\/portrait$/,
  ],
  private: [
    /^\/dashboard$/,
    /^\/account$/,
    /^\/character\/[^/]+$/,
    /^\/session\/[^/]+$/,
    /^\/character\/[^/]+\/portrait$/,
  ],
};

export function middleware(req: NextRequest) {
  const token = req.cookies.get('token');

  const isPublicPath = regexPaths.public.some((regex) =>
    regex.test(req.nextUrl.pathname)
  );
  const isPrivatePath = regexPaths.private.some((regex) =>
    regex.test(req.nextUrl.pathname)
  );

  if (!token && !isPublicPath && isPrivatePath) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  if (token && isPublicPath && !isPrivatePath) {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|static|.*\\..*|_next/static|_next/image|favicon.ico).*)'],
};
