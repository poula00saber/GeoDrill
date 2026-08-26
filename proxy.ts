import { NextRequest, NextResponse } from "next/server";

/**
 * Redirect the legacy contracting-site paths to their branded /contracting
 * equivalents so the site is served from /contracting/en (and /contracting/ar).
 *   /en          -> /contracting/en
 *   /ar          -> /contracting/ar
 *   /construction -> /contracting/en
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/construction") {
    return NextResponse.redirect(new URL("/contracting/en", request.url));
  }
  if (pathname === "/en" || pathname === "/ar") {
    return NextResponse.redirect(
      new URL(`/contracting/${pathname.slice(1)}`, request.url),
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/en", "/ar", "/construction"],
};