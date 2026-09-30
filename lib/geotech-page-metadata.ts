import type { Metadata } from "next";
import type { Locale } from "@/geotech/lib/i18n";
import { buildPageMetadata } from "@/lib/seo";

const pages = {
  about: {
    path: "/about",
    image: "/images/geotech-hero1.jpg",
    en: {
      title: "About GEODRILL | Geotechnical & Geoscience Experts",
      description:
        "Learn about GEODRILL KSA, our geotechnical and geoscience expertise, engineering team, and approach to investigation projects across Saudi Arabia.",
    },
    ar: {
      title: "من نحن | خبراء جيودريل في الجيوتقنية وعلوم الأرض",
      description:
        "تعرف على GEODRILL KSA وخبراتنا في الجيوتقنية وعلوم الأرض وفريقنا الهندسي ونهجنا في مشاريع التحقيق في جميع أنحاء السعودية.",
    },
  },
  clients: {
    path: "/clients",
    image: "/images/geotech-hero1.jpg",
    en: {
      title: "Geotechnical & Geoscience Clients | GEODRILL KSA",
      description:
        "Organizations that work with GEODRILL KSA on geotechnical, geophysical, testing, and engineering investigation projects.",
    },
    ar: {
      title: "عملاء خدمات الجيوتقنية وعلوم الأرض | GEODRILL KSA",
      description:
        "تعرف على الجهات التي تتعاون مع GEODRILL KSA في مشاريع الجيوتقنية والجيوفيزياء والاختبارات والتحقيقات الهندسية.",
    },
  },
  contact: {
    path: "/contact",
    image: "/images/contact-us-hero.jpg",
    en: {
      title: "Contact GEODRILL KSA | Engineering Investigation",
      description:
        "Contact GEODRILL KSA to discuss geotechnical investigation, geoscience, testing, surveying, and engineering requirements in Saudi Arabia.",
    },
    ar: {
      title: "تواصل مع GEODRILL KSA | التحقيقات الهندسية",
      description:
        "تواصل مع GEODRILL KSA لمناقشة متطلبات الجيوتقنية وعلوم الأرض والاختبارات والمسح الهندسي في المملكة العربية السعودية.",
    },
  },
  projects: {
    path: "/projects",
    image: "/images/geotech-hero1.jpg",
    en: {
      title: "Geotechnical & Geoscience Projects | GEODRILL KSA",
      description:
        "Explore GEODRILL KSA's geotechnical, geophysical, surveying, testing, and engineering project portfolio across Saudi Arabia.",
    },
    ar: {
      title: "مشاريع الجيوتقنية وعلوم الأرض | GEODRILL KSA",
      description:
        "استعرض مشاريع GEODRILL KSA في الجيوتقنية والجيوفيزياء والمسح والاختبارات والهندسة في أنحاء المملكة العربية السعودية.",
    },
  },
  qhse: {
    path: "/qhse",
    image: "/images/geotech-hero1.jpg",
    en: {
      title: "Quality, Health, Safety & Environment | GEODRILL KSA",
      description:
        "Read about GEODRILL KSA's quality, health, safety, and environmental framework for engineering work and project delivery.",
    },
    ar: {
      title: "الجودة والصحة والسلامة والبيئة | GEODRILL KSA",
      description:
        "تعرف على إطار GEODRILL KSA للجودة والصحة والسلامة والبيئة في الأعمال الهندسية وتنفيذ المشاريع.",
    },
  },
  services: {
    path: "/services",
    image: "/images/geotech-hero1.jpg",
    en: {
      title: "Geotechnical & Geoscience Services | GEODRILL KSA",
      description:
        "Explore GEODRILL KSA services in geotechnical investigation, geophysics, materials testing, surveying, engineering, and environmental studies.",
    },
    ar: {
      title: "خدمات الجيوتقنية وعلوم الأرض | GEODRILL KSA",
      description:
        "استكشف خدمات GEODRILL KSA في التحقيقات الجيوتقنية والجيوفيزياء واختبارات المواد والمسح والهندسة والدراسات البيئية.",
    },
  },
} as const;

export type GeotechPage = keyof typeof pages;

export function getGeotechPageMetadata(
  locale: Locale,
  page: GeotechPage,
): Metadata {
  const content = pages[page];
  return buildPageMetadata({
    ...content[locale],
    path: `/geotechnical/${locale}${content.path}`,
    image: content.image,
    locale,
  });
}
