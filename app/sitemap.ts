import type { MetadataRoute } from "next";
import { absoluteUrl, SITE_URL } from "@/lib/seo";
import { SECTORS } from "@/lib/sector-data";
import { getBlogPosts } from "@/lib/blog";
import { projects } from "@/geotech/lib/projects-data";
import { getAllServiceSlugs, servicesData } from "@/geotech/lib/services-data";

type Division = "geotechnical" | "contracting";

function localizedEntries(
  division: Division,
  suffix: string,
  images: string[] = [],
): MetadataRoute.Sitemap {
  const englishUrl = absoluteUrl(`/${division}/en${suffix}`);
  const arabicUrl = absoluteUrl(`/${division}/ar${suffix}`);
  const alternates = {
    languages: {
      en: englishUrl,
      ar: arabicUrl,
      "x-default": englishUrl,
    },
  };

  return (["en", "ar"] as const).map((locale) => ({
    url: absoluteUrl(`/${division}/${locale}${suffix}`),
    alternates,
    ...(images.length ? { images: images.map(absoluteUrl) } : {}),
  }));
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const geotechnicalPages = [
    "",
    "/about",
    "/clients",
    "/contact",
    "/projects",
    "/qhse",
    "/services",
  ];
  const contractingPages = ["", "/clients", "/faq", "/blog"];
  const servicePages = getAllServiceSlugs().flatMap((slug) => {
    const service = servicesData[slug];
    return localizedEntries("geotechnical", `/services/${slug}`, [
      service.heroImage,
      ...service.gallery.map((image) => image.src),
    ]);
  });
  const projectPages = projects.flatMap((project) =>
    localizedEntries("geotechnical", `/projects/${project.slug}`, [
      project.image,
    ]),
  );
  const sectorPages = SECTORS.flatMap((sector) =>
    localizedEntries("contracting", `/sectors/${sector.key}`, [
      sector.image,
      ...sector.gallery.map((image) => image.src),
    ]),
  );
  const contractingProjectPage = localizedEntries("contracting", "/projects", [
    "/images/final/projects/01_groundworks/groundworks_bulldozer_action.jpg",
    "/images/final/projects/02_structures_and_steel/steel_frame_erection_wide.jpg",
    "/images/final/projects/03_mep/mep_hvac_plantroom.jpg",
    "/images/final/projects/04_finishing/finishing_lobby_reception.jpg",
    "/images/final/projects/05_waterproofing_and_insulation/insulation_rooftop_finished.jpg",
    "/images/final/projects/06_industrial/sector_industrial.jpg",
  ]);
  const blogPosts = await getBlogPosts();
  const blogPages = blogPosts.flatMap((post) =>
    post.slug?.current
      ? localizedEntries("contracting", `/blog/${post.slug.current}`)
      : [],
  );

  const rootEntry: MetadataRoute.Sitemap[number] = {
    url: `${SITE_URL}/`,
  };
  const mainPages = [
    ...geotechnicalPages.flatMap((suffix) =>
      localizedEntries("geotechnical", suffix),
    ),
    ...contractingPages.flatMap((suffix) =>
      localizedEntries("contracting", suffix),
    ),
  ];

  const uniqueEntries = new Map<string, MetadataRoute.Sitemap[number]>();
  for (const entry of [
    rootEntry,
    ...mainPages,
    ...servicePages,
    ...projectPages,
    ...sectorPages,
    ...contractingProjectPage,
    ...blogPages,
  ]) {
    const current = uniqueEntries.get(entry.url);
    uniqueEntries.set(entry.url, {
      ...current,
      ...entry,
      images: [
        ...new Set([...(current?.images ?? []), ...(entry.images ?? [])]),
      ],
    });
  }

  return [...uniqueEntries.values()];
}
