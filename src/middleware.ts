import { NextResponse, NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const role = req.cookies.get('role')?.value;

  if (!role) {
    const protectedRoutes = [
      '/chat',
      '/bookmarks',
      '/ad/create',
      '/admin/block',
      '/admin/approve',
      '/admin/create',
      '/user/settings',
    ];
    if (protectedRoutes.includes(req.nextUrl.pathname)) {
      return NextResponse.redirect(new URL('/', req.url));
    }
  } else if (role === 'ROLE_USER') {
    const protectedRoutes = [
      '/admin/block',
      '/admin/approve',
      '/admin/create',
      '/login',
      '/registration',
    ];
    if (protectedRoutes.includes(req.nextUrl.pathname)) {
      return NextResponse.redirect(new URL('/', req.url));
    }
  } else if (role === 'ROLE_ADMIN') {
    const protectedRoutes = [
      '/',
      '/chat',
      '/bookmarks',
      '/registration',
      '/login',
      '/rules',
      '/advertisements',
      '/user/settings',
      '/ad/create',
    ];
    if (protectedRoutes.includes(req.nextUrl.pathname)) {
      return NextResponse.redirect(new URL('/admin/block', req.url));
    }
  }

  return NextResponse.next();
}
