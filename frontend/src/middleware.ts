import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"

export function middleware(request: NextRequest) {
  const accessToken = request.cookies.get("access_token")?.value
  const { pathname } = request.nextUrl

  // Public routes (auth)
  const isAuthRoute =
    pathname.startsWith("/login") ||
    pathname.startsWith("/signup") ||
    pathname.startsWith("/recover-password") ||
    pathname.startsWith("/reset-password")

  // Protected routes (dashboard)
  const isProtectedRoute =
    pathname.startsWith("/admin") ||
    pathname.startsWith("/items") ||
    pathname.startsWith("/settings") ||
    pathname === "/"

  // Redirect to login if accessing protected route without token
  if (isProtectedRoute && !accessToken) {
    const url = request.nextUrl.clone()
    url.pathname = "/login"
    return NextResponse.redirect(url)
  }

  // Redirect to dashboard if accessing auth route with token
  if (isAuthRoute && accessToken) {
    const url = request.nextUrl.clone()
    url.pathname = "/"
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
