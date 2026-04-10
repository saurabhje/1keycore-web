import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { decodeJwt } from "jose";



const PROTECTED = ["/dashboard"];
const AUTH_ROUTES = ["/login", "/signup"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("access_token")?.value;

  const isProtected = PROTECTED.some(p => pathname.startsWith(p));
  const isOnboardingRoute = pathname.startsWith("/onboarding");
  const isAuthRoute = AUTH_ROUTES.some(p => pathname.startsWith(p));

  // Unauthenticated user hitting a protected route → send to login
  if ((isProtected || isOnboardingRoute) && !token) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("next", pathname);
    return NextResponse.redirect(url);
  }

  // Already logged-in user hitting login/signup → send to dashboard
  if (isAuthRoute && token) {
    const url = request.nextUrl.clone();
    url.pathname = "/dashboard";
    return NextResponse.redirect(url);
  }

  // handling the fresh token for onboarding flow
  if (token) {
    try {
      const payload = decodeJwt(token);
      const hastenant = !!payload.tenant_id;

      if (isAuthRoute) {
        return NextResponse.redirect(new URL(hastenant ? "/dashboard" : "/onboarding", request.url));
      }
      if (isProtected && !hastenant) {
        return NextResponse.redirect(new URL("/onboarding", request.url));
      }
      if (isOnboardingRoute && hastenant) {
        return NextResponse.redirect(new URL("/dashboard", request.url));
      }
    } catch (e) {
      const response = NextResponse.redirect(new URL("/login", request.url));
      response.cookies.delete("access_token");
      return response;
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|icon.svg).*)"],
};
