import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Footer } from "@/geotech/components/sections/footer";
import { Navigation } from "@/geotech/components/navigation";
import { JsonLd } from "@/components/json-ld";
import { isLocale, locales } from "@/geotech/lib/i18n";
import { projects } from "@/geotech/lib/projects-data";
import { absoluteUrl, buildPageMetadata } from "@/lib/seo";

const categoryLabels = {
  geotechnical: { en: "Geotechnical", ar: "جيوتقني" },
  geophysical: { en: "Geophysical", ar: "جيوفيزيائي" },
  survey: { en: "Survey", ar: "مسح" },
  testing: { en: "Testing", ar: "اختبارات" },
  structural: { en: "Structural", ar: "إنشائي" },
  slope: { en: "Slope stability", ar: "استقرار المنحدرات" },
  shoring: { en: "Shoring", ar: "تدعيم الحفريات" },
} as const;

type Props = { params: Promise<{ lang: string; slug: string }> };

function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export function generateStaticParams() {
  return locales.flatMap((lang) =>
    projects.map((project) => ({ lang, slug: project.slug })),
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!isLocale(lang)) notFound();
  const project = getProject(slug);
  if (!project) notFound();

  const name = lang === "ar" ? project.nameAr : project.nameEn;
  const category = categoryLabels[project.category][lang];
  const title = `${name} | GEODRILL KSA`;
  const description =
    lang === "ar"
      ? `${category}: ${name} لصالح ${project.client} في ${project.location}، المملكة العربية السعودية.`
      : `${category} project: ${name}, completed for ${project.client} in ${project.location}, Saudi Arabia.`;

  return buildPageMetadata({
    title,
    description,
    path: `/geotechnical/${lang}/projects/${project.slug}`,
    image: project.image,
    locale: lang,
  });
}

export default async function ProjectDetailPage({ params }: Props) {
  const { lang, slug } = await params;
  if (!isLocale(lang)) notFound();
  const project = getProject(slug);
  if (!project) notFound();

  const isArabic = lang === "ar";
  const name = isArabic ? project.nameAr : project.nameEn;
  const category = categoryLabels[project.category][lang];
  const relatedServiceSlug =
    project.category === "geophysical"
      ? "geophysical-survey"
      : project.category === "testing"
        ? "material-testing-quality-control"
        : project.category === "structural"
          ? "structural-assessment"
          : project.category === "slope" || project.category === "shoring"
            ? "anchoring-shoring-design-execution"
            : "geotechnical-investigation";
  const breadcrumbItems = [
    {
      "@type": "ListItem",
      position: 1,
      name: isArabic ? "الرئيسية" : "Home",
      item: absoluteUrl(`/geotechnical/${lang}`),
    },
    {
      "@type": "ListItem",
      position: 2,
      name: isArabic ? "المشاريع" : "Projects",
      item: absoluteUrl(`/geotechnical/${lang}/projects`),
    },
    { "@type": "ListItem", position: 3, name },
  ];

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: breadcrumbItems,
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ImageObject",
          contentUrl: absoluteUrl(project.image),
          name,
          description: project.alt,
          representativeOfPage: true,
        }}
      />
      <Navigation />
      <main
        className="min-h-screen bg-background text-foreground"
        dir={isArabic ? "rtl" : "ltr"}
      >
        <article className="mx-auto max-w-7xl px-5 pb-20 pt-32 md:px-8">
          <nav
            aria-label={isArabic ? "مسار التنقل" : "Breadcrumb"}
            className="mb-8 text-sm text-muted-foreground"
          >
            <Link
              href={`/geotechnical/${lang}/projects`}
              className="hover:text-primary"
            >
              {isArabic ? "المشاريع" : "Projects"}
            </Link>
            <span aria-hidden="true" className="mx-2">
              /
            </span>
            <span aria-current="page">{name}</span>
          </nav>
          <header className="mb-8 max-w-4xl">
            <p className="mb-3 text-sm font-semibold uppercase text-primary">
              {category}
            </p>
            <h1 className="text-3xl font-bold leading-tight sm:text-4xl">
              {name}
            </h1>
          </header>
          <div className="relative aspect-[16/9] overflow-hidden rounded-xl bg-muted">
            <Image
              src={project.image}
              alt={isArabic ? project.nameAr : project.alt}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 1200px"
              className="object-cover"
            />
          </div>
          <dl className="mt-8 grid gap-6 border-y border-border py-6 sm:grid-cols-3">
            <div>
              <dt className="text-sm text-muted-foreground">
                {isArabic ? "التخصص" : "Service"}
              </dt>
              <dd className="mt-1 font-semibold">{category}</dd>
            </div>
            <div>
              <dt className="text-sm text-muted-foreground">
                {isArabic ? "العميل" : "Client"}
              </dt>
              <dd className="mt-1 font-semibold">{project.client}</dd>
            </div>
            <div>
              <dt className="text-sm text-muted-foreground">
                {isArabic ? "الموقع" : "Location"}
              </dt>
              <dd className="mt-1 font-semibold">{project.location}</dd>
            </div>
          </dl>
          <Link
            href={`/geotechnical/${lang}/projects`}
            className="mt-8 inline-flex font-semibold text-primary hover:underline"
          >
            {isArabic ? "العودة إلى المشاريع" : "Back to projects"}
          </Link>
          <Link
            href={`/geotechnical/${lang}/services/${relatedServiceSlug}`}
            className="ms-6 inline-flex font-semibold text-primary hover:underline"
          >
            {isArabic ? "الخدمة ذات الصلة" : "Related service"}
          </Link>
        </article>
      </main>
      <Footer />
    </>
  );
}
