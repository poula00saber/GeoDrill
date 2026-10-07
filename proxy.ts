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
  const pathname = decodeURIComponent(request.nextUrl.pathname);
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
  )
    .trim()
    .toLowerCase()
    .replace(/:$/, "");

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

  const arabicServiceRedirects: Record<string, string> = {
    "التحريات-الجيوتقنية":
      "/geotechnical/ar/services/geotechnical-investigation",
    "اختبار-المواد-ومراقبة-الجودة":
      "/geotechnical/ar/services/material-testing-quality-control",
    "المسح-الطبوغرافي": "/geotechnical/ar/services/topographical-survey",
    "المسح-الجيوفيزيائي": "/geotechnical/ar/services/geophysical-survey",
    "الدراسات-الهيدرولوجية": "/geotechnical/ar/services/hydrology-studies",
    "الدراسات-الهيدروجيولوجية":
      "/geotechnical/ar/services/hydrogeological-studies",
    "تحري-التجاويف-والحقن-والخوازيق-الدقيقة":
      "/geotechnical/ar/services/cavity-probing-grouting-micro-piling",
    "المسح-الجيولوجي-وثبات-المنحدرات-الصخرية":
      "/geotechnical/ar/services/geological-survey-rock-slope-stability",
    "التقييم-الإنشائي-للمباني":
      "/geotechnical/ar/services/structural-assessment",
    "الدراسات-البيئية": "/geotechnical/ar/services/environmental-survey",
    "تصميم-وتنفيذ-أنظمة-التدعيم-وسند-جوانب-الحفر":
      "/geotechnical/ar/services/anchoring-shoring-design-execution",
    "تصميم-وتنفيذ-خفض-منسوب-المياه":
      "/geotechnical/ar/services/dewatering-design-execution",
    "تحسين-التربة-وإصلاح-الخرسانة":
      "/geotechnical/ar/services/soil-improvement-concrete-repair",
    "استكشاف-المعادن-وتقييم-الخامات":
      "/geotechnical/ar/services/mining-exploration",
  };

  const legacyRedirects: Record<string, string> = {
    "/services": "/geotechnical/en/services",
    "/services/": "/geotechnical/en/services",
    "/about": "/geotechnical/en/about",
    "/about/": "/geotechnical/en/about",
    "/contact": "/geotechnical/en/contact",
    "/contact/": "/geotechnical/en/contact",
    "/qhse": "/geotechnical/en/qhse",
    "/qhse/": "/geotechnical/en/qhse",
    "/geotechnical-investigation":
      "/geotechnical/en/services/geotechnical-investigation",
    "/geotechnical-investigation/":
      "/geotechnical/en/services/geotechnical-investigation",
    "/geophysical-survey": "/geotechnical/en/services/geophysical-survey",
    "/geophysical-survey/": "/geotechnical/en/services/geophysical-survey",
    "/hydrology-studies": "/geotechnical/en/services/hydrology-studies",
    "/hydrology-studies/": "/geotechnical/en/services/hydrology-studies",
    "/hydrogeological-studies":
      "/geotechnical/en/services/hydrogeological-studies",
    "/hydrogeological-studies/":
      "/geotechnical/en/services/hydrogeological-studies",
    "/dewatering-design-and-execution":
      "/geotechnical/en/services/dewatering-design-execution",
    "/dewatering-design-and-execution/":
      "/geotechnical/en/services/dewatering-design-execution",
    "/soil-improvement-and-concrete-repair-services":
      "/geotechnical/en/services/soil-improvement-concrete-repair",
    "/soil-improvement-and-concrete-repair-services/":
      "/geotechnical/en/services/soil-improvement-concrete-repair",
    "/anchoring-shoring-design-and-execution":
      "/geotechnical/en/services/anchoring-shoring-design-execution",
    "/anchoring-shoring-design-and-execution/":
      "/geotechnical/en/services/anchoring-shoring-design-execution",
    "/material-testing-quality-control":
      "/geotechnical/en/services/material-testing-quality-control",
    "/material-testing-quality-control/":
      "/geotechnical/en/services/material-testing-quality-control",
    "/topographical-survey": "/geotechnical/en/services/topographical-survey",
    "/topographical-survey/": "/geotechnical/en/services/topographical-survey",
    "/mining-exploration": "/geotechnical/en/services/mining-exploration",
    "/mining-exploration/": "/geotechnical/en/services/mining-exploration",
    "/ar/الكشف-عن-التكهفات-في-الصخور":
      "/geotechnical/ar/services/cavity-probing-grouting-micro-piling",
    "/ar/الكشف-عن-التكهفات-في-الصخور/":
      "/geotechnical/ar/services/cavity-probing-grouting-micro-piling",
    "/ar/تواصل-معنا": "/geotechnical/ar/contact",
    "/ar/تواصل-معنا/": "/geotechnical/ar/contact",
    "/ar/الدراسات-الجيولوجية-وثبات-المنحدرات":
      "/geotechnical/ar/services/geological-survey-rock-slope-stability",
    "/ar/الدراسات-الجيولوجية-وثبات-المنحدرات/":
      "/geotechnical/ar/services/geological-survey-rock-slope-stability",
    "/typography": "/geotechnical/en/services/topographical-survey",
    "/typography/": "/geotechnical/en/services/topographical-survey",
  };

  for (const [arabicSlug, target] of Object.entries(arabicServiceRedirects)) {
    legacyRedirects[`/ar/${arabicSlug}`] = target;
    legacyRedirects[`/ar/${arabicSlug}/`] = target;
  }

  const legacyTarget = legacyRedirects[pathname];
  if (legacyTarget) {
    return NextResponse.redirect(new URL(legacyTarget, request.url), 308);
  }

  const localizedLegacyMatch = pathname.match(
    /^\/(en|ar)\/(services|about|contact|qhse|geotechnical-investigation|geophysical-survey|hydrology-studies|hydrogeological-studies|dewatering-design-and-execution|soil-improvement-and-concrete-repair-services|anchoring-shoring-design-and-execution|material-testing-quality-control|topographical-survey|mining-exploration)\/?$/,
  );
  if (localizedLegacyMatch) {
    const [, locale, legacyPath] = localizedLegacyMatch;
    const serviceSlug: Record<string, string> = {
      "geotechnical-investigation": "geotechnical-investigation",
      "geophysical-survey": "geophysical-survey",
      "hydrology-studies": "hydrology-studies",
      "hydrogeological-studies": "hydrogeological-studies",
      "dewatering-design-and-execution": "dewatering-design-execution",
      "soil-improvement-and-concrete-repair-services":
        "soil-improvement-concrete-repair",
      "anchoring-shoring-design-and-execution":
        "anchoring-shoring-design-execution",
      "material-testing-quality-control": "material-testing-quality-control",
      "topographical-survey": "topographical-survey",
      "mining-exploration": "mining-exploration",
    };
    const target =
      legacyPath === "services"
        ? `/geotechnical/${locale}/services`
        : legacyPath === "about" ||
            legacyPath === "contact" ||
            legacyPath === "qhse"
          ? `/geotechnical/${locale}/${legacyPath}`
          : `/geotechnical/${locale}/services/${serviceSlug[legacyPath]}`;
    return NextResponse.redirect(new URL(target, request.url), 308);
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
  if (pathname === "/en" || pathname === "/en/" || pathname === "/ar" || pathname === "/ar/") {
    const locale = pathname.replace(/\//g, "");
    return new Response(null, {
      status: 308,
      headers: {
        Location: new URL(`/contracting/${locale}`, request.url).toString(),
      },
    });
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

  if (pathname.length > 1 && pathname.endsWith("/")) {
    return NextResponse.redirect(
      new URL(pathname.slice(0, -1), request.url),
      308,
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
