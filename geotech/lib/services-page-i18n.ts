// geotech/lib/services-page-i18n.ts
//
// Bilingual (EN / AR) text for the geotech Services index page.
// `servicesData` in services-data.ts is English-only (a single-locale source of
// truth from old.geodrillksa.com), so the AR equivalents for the card names,
// short descriptions and category labels live here, keyed by the EXACT slugs
// used in `servicesData` / `serviceCategories`. English card copy for names and
// short descriptions intentionally mirrors services-data.ts.
//
// NOTE: the dictionary's `services.items` uses SHORTER slugs (e.g.
// "material-testing") that do NOT match the live route slugs, so it is NOT the
// right source for this page. This file is the canonical page-local source.

import type { ServiceContent } from "./services-data";

export interface LocalizedText {
  en: string;
  ar: string;
}

export interface ServiceItemText {
  name: string;
  description: string;
}

export interface ServiceItemLocalized {
  en: ServiceItemText;
  ar: ServiceItemText;
}

export const servicesPageCopy: Record<string, LocalizedText> = {
  heroEyebrow: {
    en: "Our Services",
    ar: "خدماتنا",
  },
  heroTitle1: {
    en: "End-to-End Geotechnical",
    ar: "حلول جيوتقنية",
  },
  heroTitle2: {
    en: "Solutions",
    ar: "متكاملة من البداية إلى النهاية",
  },
  heroDescription: {
    en: "We deliver reliable, accurate and practical geotechnical services that help you make informed decisions and build with confidence from the ground up.",
    ar: "نقدم خدمات جيوتقنية موثوقة ودقيقة وعملية تساعدك على اتخاذ قرارات مدروسة والبناء بثقة بدءًا من الأرض.",
  },
  explore: {
    en: "Explore service",
    ar: "استكشف الخدمة",
  },
  yearsLabel: {
    en: "Years of Experience",
    ar: "سنوات من الخبرة",
  },
  servicesLabel: {
    en: "Specialized Services",
    ar: "خدمات متخصصة",
  },
};
export const serviceCategoryLabels: Record<
  "Ground" | "Testing" | "Engineering" | "Studies",
  LocalizedText
> = {
  Ground: { en: "Ground Investigation", ar: "تحري باطن الأرض" },
  Testing: { en: "Testing & Survey", ar: "الاختبار والمسح" },
  Engineering: { en: "Ground Engineering", ar: "هندسة باطن الأرض" },
  Studies: {
    en: "Engineering & Specialized Studies",
    ar: "دراسات هندسية متخصصة",
  },
};

export const serviceCategoryDescriptions: Record<
  "Ground" | "Testing" | "Engineering" | "Studies",
  LocalizedText
> = {
  Ground: {
    en: "Subsurface investigation and geological characterization services.",
    ar: "خدمات تحري باطن الأرض والتوصيف الجيولوجي.",
  },
  Testing: {
    en: "Materials, surveying and environmental testing throughout your project.",
    ar: "اختبار المواد والمساحة والبيئة طوال مراحل مشروعك.",
  },
  Engineering: {
    en: "Ground improvement, retention and foundation engineering solutions.",
    ar: "حلول هندسية لتحسين الأرض والحوائط الساندة والأساسات.",
  },
  Studies: {
    en: "Specialized assessments and resource exploration studies.",
    ar: "دراسات متخصصة لتقييم واستكشاف الموارد.",
  },
};
// Per-service name + short description keyed by the exact servicesData slug.
export const servicesPageItems: Record<string, ServiceItemLocalized> = {
  "geotechnical-investigation": {
    en: {
      name: "Geotechnical Investigation",
      description:
        "Comprehensive soil and rock investigation using modern drilling techniques and in-situ testing.",
    },
    ar: {
      name: "التحريات الجيوتقنية",
      description:
        "تحري شامل للتربة والصخور باستخدام تقنيات الحفر الحديثة والاختبار في الموقع.",
    },
  },
  "material-testing-quality-control": {
    en: {
      name: "Material Testing & Quality Control",
      description:
        "Independent testing of soil, concrete, asphalt, cement, aggregates and steel, plus on-site quality control.",
    },
    ar: {
      name: "اختبار المواد ومراقبة الجودة",
      description:
        "اختبار مستقل للتربة والخرسانة والأسفلت والأسمنت والركام والصلب، إضافة إلى مراقبة الجودة في الموقع.",
    },
  },
  "topographical-survey": {
    en: {
      name: "Topographical Survey",
      description:
        "High-precision topographic surveying using GPS, GIS, drone mapping and mobile mapping systems.",
    },
    ar: {
      name: "المسح الطبوغرافي",
      description:
        "مسح طبوغرافي عالي الدقة باستخدام GPS وGIS والمسح بالطائرات بدون طيار وأنظمة المسح المتنقل.",
    },
  },
  "geophysical-survey": {
    en: {
      name: "Geophysical Survey",
      description:
        "A full range of geophysical methods — MASW, GPR, resistivity, seismic, EMI, magnetic, gravity and borehole logging — processed and interpreted from our Riyadh data centre.",
    },
    ar: {
      name: "المسح الجيوفيزيائي",
      description:
        "مجموعة كاملة من الأساليب الجيوفيزيائية — MASW وGPR والمقاومة الكهربائية والزلزالية والكهرومغناطيسية والمغناطيسية والجاذبية وتسجيل الآبار — تتم معالجتها وتفسيرها من مركز بياناتنا في الرياض.",
    },
  },
  "hydrology-studies": {
    en: {
      name: "Hydrology Studies",
      description:
        "Surface and groundwater analysis, flood risk assessment, and hydrological modeling.",
    },
    ar: {
      name: "الدراسات الهيدرولوجية",
      description:
        "تحليل المياه السطحية والجوفية، وتقييم مخاطر الفيضانات، والنمذجة الهيدرولوجية.",
    },
  },
  "hydrogeological-studies": {
    en: {
      name: "Hydrogeological Studies",
      description:
        "Groundwater assessment, aquifer characterization and geoelectrical investigation for water resource management.",
    },
    ar: {
      name: "الدراسات الهيدروجيولوجية",
      description:
        "تقييم المياه الجوفية وتوصيف الخزانات الجوفية والتحريات الكهروجيولوجية لإدارة موارد المياه.",
    },
  },
  "cavity-probing-grouting-micro-piling": {
    en: {
      name: "Cavity Probing, Grouting & Micropiling",
      description:
        "Subsurface void detection, pressure grouting, and micropile foundation solutions for complex ground conditions.",
    },
    ar: {
      name: "تحري التجاويف والحقن والخوازيق الدقيقة",
      description:
        "كشف الفراغات في باطن الأرض، والحقن تحت الضغط، وحلول الخوازيق الدقيقة للأساسات في ظروف الأرض المعقدة.",
    },
  },
  "geological-survey-rock-slope-stability": {
    en: {
      name: "Geological Survey & Rock Slope Stability",
      description:
        "Geological characterization and rock slope stability assessment for infrastructure, mining and mountainous developments.",
    },
    ar: {
      name: "المسح الجيولوجي وثبات المنحدرات الصخرية",
      description:
        "التوصيف الجيولوجي وتقييم ثبات المنحدرات الصخرية لمشاريع البنية التحتية والتعدين والتطوير الجبلي.",
    },
  },
  "structural-assessment": {
    en: {
      name: "Structural Assessment",
      description:
        "Expert evaluation of building safety, integrity, and performance using visual inspection and non-destructive testing.",
    },
    ar: {
      name: "التقييم الإنشائي",
      description:
        "تقييم خبير لسلامة المباني وسلامتها وأدائها باستخدام الفحص البصري والاختبارات غير الإتلافية.",
    },
  },
  "environmental-survey": {
    en: {
      name: "Environmental Survey",
      description:
        "Environmental impact assessment, baseline studies, and monitoring to support sustainable development and compliance.",
    },
    ar: {
      name: "المسح البيئي",
      description:
        "تقييم الأثر البيئي ودراسات الحالة الأساسية والمراقبة لدعم التنمية المستدامة والامتثال.",
    },
  },
  "anchoring-shoring-design-execution": {
    en: {
      name: "Anchoring & Shoring Design & Execution",
      description:
        "Design and execution of retaining walls, ground anchors, tiebacks and shoring systems for safe excavation and structural stability.",
    },
    ar: {
      name: "تصميم وتنفيذ التثبيتات والساندة",
      description:
        "تصميم وتنفيذ الحوائط الساندة والمثبتات الأرضية وروابط السحب وأنظمة الساندة لحفر آمن وثبات إنشائي.",
    },
  },
  "dewatering-design-execution": {
    en: {
      name: "Dewatering Design & Execution",
      description:
        "Groundwater control systems — deep wells, wellpoints, eductors and sump pumps — for safe, dry excavation.",
    },
    ar: {
      name: "تصميم وتنفيذ خفض منسوب المياه",
      description:
        "أنظمة التحكم في المياه الجوفية — الآبار العميقة ونقاط الآبار والقاذفات ومضخات التجميع — لحفر آمن وجاف.",
    },
  },
  "soil-improvement-concrete-repair": {
    en: {
      name: "Soil Improvement & Concrete Repair",
      description:
        "FRP strengthening, micropiling, soil injection, jacketing and epoxy floor repair for structural rehabilitation.",
    },
    ar: {
      name: "تحسين التربة وإصلاح الخرسانة",
      description:
        "تقوية FRP والخوازيق الدقيقة وحقن التربة والتكسية وإصلاح الأرضيات بالإيبوكسي لإعادة تأهيل المنشآت.",
    },
  },
  "mining-exploration": {
    en: {
      name: "Mining Exploration",
      description:
        "End-to-end mineral exploration — mapping, sampling, geophysics, drilling, resource estimation — to JORC/NI 43-101 classification.",
    },
    ar: {
      name: "استكشاف التعدين",
      description:
        "استكشاف معدني متكامل — رسم الخرائط وأخذ العينات والجيوفيزياء والحفر وتقدير الموارد — وفق تصنيف JORC/NI 43-101.",
    },
  },
};

export function getLocalizedService(
  service: ServiceContent,
  locale: string,
): ServiceContent {
  const localized =
    servicesPageItems[service.slug]?.[locale === "ar" ? "ar" : "en"];
  if (!localized || locale !== "ar") return service;

  return {
    ...service,
    title: localized.name,
    shortDescription: localized.description,
    overview: [localized.description],
  };
}

export function getLocalizedServiceItem(slug: string, locale: string) {
  return servicesPageItems[slug]?.[locale === "ar" ? "ar" : "en"];
}

// Pick the value for the active locale (falls back to English).
export function pickLocalized(t: LocalizedText, lang: string): string {
  return lang === "ar" ? t.ar : t.en;
}
