import { NextRequest, NextResponse } from "next/server";
import { projects } from "@/geotech/lib/projects-data";

/**
 * Redirect the legacy contracting-site paths to their branded /contracting
 * equivalents so the site is served from /contracting/en (and /contracting/ar).
 *   /en          -> /contracting/en
 *   /ar          -> /contracting/ar
 *   /construction -> /contracting/en
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hostname = (
    request.headers.get("x-forwarded-host") ??
    request.headers.get("host") ??
    request.nextUrl.hostname
  )
    .split(":")[0]
    .toLowerCase();
  const protocol = (
    request.headers.get("x-forwarded-proto")?.split(",")[0] ??
    request.nextUrl.protocol
  ).trim().toLowerCase().replace(/:$/, "");

  if (
    hostname === "geodrillksa.com" ||
    (hostname.endsWith(".geodrillksa.com") &&
      hostname !== "www.geodrillksa.com") ||
    (hostname === "www.geodrillksa.com" && protocol !== "https")
  ) {
    const canonicalUrl = request.nextUrl.clone();
    canonicalUrl.protocol = "https:";
    canonicalUrl.hostname = "www.geodrillksa.com";
    canonicalUrl.port = "";
    return NextResponse.redirect(canonicalUrl, 308);
  }

  if (hostname.endsWith(".vercel.app")) {
    const response = NextResponse.next();
    response.headers.set("X-Robots-Tag", "noindex, nofollow, noarchive");
    return response;
  }

  const legacyProjectMatch = pathname.match(
    /^\/geotechnical\/(en|ar)\/projects\/project-(\d+)$/,
  );
  if (legacyProjectMatch) {
    const project = projects[Number(legacyProjectMatch[2]) - 1];
    if (project) {
      return NextResponse.redirect(
        new URL(
          `/geotechnical/${legacyProjectMatch[1]}/projects/${project.slug}`,
          request.url,
        ),
        308,
      );
    }
  }

  if (pathname === "/construction") {
    return NextResponse.redirect(new URL("/contracting/en", request.url), 308);
  }
  if (pathname === "/en" || pathname === "/ar") {
    return NextResponse.redirect(
      new URL(`/contracting/${pathname.slice(1)}`, request.url),
      308,
    );
  }

  const legacySectorMatch = pathname.match(/^\/(en|ar)\/sectors\/(.+)$/);
  if (legacySectorMatch) {
    return NextResponse.redirect(
      new URL(
        `/contracting/${legacySectorMatch[1]}/sectors/${legacySectorMatch[2]}`,
        request.url,
      ),
      308,
    );
  }

  const legacyClientsMatch = pathname.match(/^\/(en|ar)\/clients\/?$/);
  if (legacyClientsMatch) {
    return NextResponse.redirect(
      new URL(`/contracting/${legacyClientsMatch[1]}/clients`, request.url),
      308,
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
