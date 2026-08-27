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

  const legacySectorMatch = pathname.match(/^\/(en|ar)\/sectors\/(.+)$/);
  if (legacySectorMatch) {
    return NextResponse.redirect(
      new URL(
        `/contracting/${legacySectorMatch[1]}/sectors/${legacySectorMatch[2]}`,
        request.url,
      ),
    );
  }

  const legacyClientsMatch = pathname.match(/^\/(en|ar)\/clients\/?$/);
  if (legacyClientsMatch) {
    return NextResponse.redirect(
      new URL(`/contracting/${legacyClientsMatch[1]}/clients`, request.url),
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/en",
    "/ar",
    "/construction",
    "/en/sectors/:path*",
    "/ar/sectors/:path*",
    "/en/clients",
    "/ar/clients",
  ],
};
