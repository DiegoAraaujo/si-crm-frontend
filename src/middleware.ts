import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const publicRoutes = ["/login", "/register"];

export const middleware = (request: NextRequest) => {
  const { pathname } = request.nextUrl;
  const isPublic = publicRoutes.some((route) => pathname.startsWith(route));
  const token = request.cookies.get("refresh_token")?.value;

  if (pathname === "/") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // if (!isPublic && !token) {
  //   return NextResponse.redirect(new URL("/login", request.url));
  // }

  if (isPublic && token) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
};

export const config = {
  matcher: ["/((?!_next|favicon.ico|.*\\..*).*)"],
};
