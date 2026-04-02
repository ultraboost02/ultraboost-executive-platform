import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const membreToken = request.cookies.get("token")?.value;
  const adminToken = request.cookies.get("admin_token")?.value;
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/membre") && !pathname.startsWith("/membre/login")) {
    if (!membreToken) {
      const loginUrl = new URL("/membre/login", request.url);
      loginUrl.searchParams.set("from", pathname);
      return NextResponse.redirect(loginUrl);
    }
    return NextResponse.next();
  }

  const protectedPath = pathname.startsWith("/dashboard") || pathname.startsWith("/admin");
  if (protectedPath && !adminToken && !pathname.startsWith("/admin/login")) {
    const loginUrl = new URL("/admin/login", request.url);
    loginUrl.searchParams.set("from", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*", "/membre/:path*"],
};
