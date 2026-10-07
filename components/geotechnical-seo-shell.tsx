import Image from "next/image";
import Link from "next/link";
import { JsonLd } from "@/components/json-ld";
import { absoluteUrl } from "@/lib/seo";

export function GeotechnicalSeoShell({ locale }: { locale: "en" | "ar" }) {
  const arabic = locale === "ar";
  const title = arabic
    ? "الخبرة الجيوتقنية والجيوفيزيائية"
    : "Geotechnical and Geoscience Experts";
  const description = arabic
    ? "تقدم GEODRILL KSA خدمات الجيوتقنية والجيوفيزياء والتحقيقات الهندسية في جميع أنحاء المملكة العربية السعودية."
    : "GEODRILL KSA delivers geotechnical, geophysical, and engineering investigation services across Saudi Arabia.";
  const base = `/geotechnical/${locale}`;
  const links = [
    ["services", arabic ? "الخدمات" : "Services"],
    ["projects", arabic ? "المشاريع" : "Projects"],
    ["about", arabic ? "من نحن" : "About"],
    ["clients", arabic ? "العملاء" : "Clients"],
    ["qhse", "QHSE"],
    ["contact", arabic ? "تواصل معنا" : "Contact"],
  ];
  const pageUrl = absoluteUrl(base);

  return (
    <section
      aria-labelledby="geotechnical-page-title"
      className="border-b border-border bg-background"
      dir={arabic ? "rtl" : "ltr"}
    >
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Organization",
          "@id": "https://www.geodrillksa.com/#geotechnical-organization",
          name: "GEODRILL KSA Geotechnical Division",
          url: pageUrl,
          parentOrganization: {
            "@id": "https://www.geodrillksa.com/#organization",
          },
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          "@id": `${pageUrl}#webpage`,
          url: pageUrl,
          name: title,
          description,
          inLanguage: locale,
          isPartOf: { "@id": "https://www.geodrillksa.com/#website" },
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: arabic ? "الرئيسية" : "Home",
              item: absoluteUrl("/"),
            },
            { "@type": "ListItem", position: 2, name: title, item: pageUrl },
          ],
        }}
      />
      <div className="mx-auto grid max-w-7xl gap-8 px-5 py-10 md:grid-cols-[minmax(0,1fr)_minmax(260px,420px)] md:items-center md:px-8">
        <div>
          <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-primary">
            GEODRILL KSA
          </p>
          <h1
            id="geotechnical-page-title"
            className="text-3xl font-bold tracking-tight text-foreground md:text-5xl"
          >
            {title}
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
            {description}
          </p>
          <nav aria-label={arabic ? "روابط الجيوتقنية" : "Geotechnical links"} className="mt-6">
            <ul className="flex flex-wrap gap-x-5 gap-y-3 text-sm font-semibold text-primary">
              {links.map(([slug, label]) => (
                <li key={slug}>
                  <Link href={`${base}/${slug}`} className="hover:underline">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <Image
          src="/images/geotech-hero1.jpg"
          alt={arabic ? "أعمال وخدمات جيوتقنية في موقع مشروع" : "Geotechnical engineering work on a project site"}
          width={1200}
          height={630}
          priority
          className="h-auto w-full rounded-xl object-cover"
        />
      </div>
    </section>
  );
}
