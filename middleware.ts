import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  const token = req.cookies.get('token');

  const paths = {
    public: ['/signup', '/'],
    private: ['/dashboard'],
  };

  const isPublicPath = paths.public.includes(req.nextUrl.pathname);
  const isPrivatePath = paths.private.includes(req.nextUrl.pathname);

  if (!token && !isPublicPath && isPrivatePath) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  if (token && isPublicPath && !isPrivatePath) {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/((?!api|_next|favicon.ico|assets).*)',
};
