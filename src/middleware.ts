import { NextRequest, NextResponse } from 'next/server';

const roleRoutes: Record<string, string> = {
  '/dashboard/customer': 'CUSTOMER',
  '/dashboard/technician': 'TECHNICIAN',
  '/dashboard/admin': 'ADMIN',
};

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  const role = request.cookies.get('role')?.value;
  const { pathname } = request.nextUrl;

  const matchedRoute = Object.keys(roleRoutes).find((route) => pathname.startsWith(route));

  if (matchedRoute) {
    if (!token) {
      return NextResponse.redirect(new URL('/auth/login', request.url));
    }
    const requiredRole = roleRoutes[matchedRoute];
    if (role !== requiredRole) {
      // Logged in but wrong role trying to access another role's dashboard
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*'],
};