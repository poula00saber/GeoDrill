// Data + image galleries for dynamic sector pages.
// `key` must match the sector keys in lib/content.ts (industrial, commercial,
// education, healthcare, residential, hospitality, government).

export type Localized = { en: string; ar: string }

export type SectorData = {
  key: string
  image: string // hero / cover image
  name: Localized
  short: Localized
  gallery: { src: string; caption: Localized }[]
}

export const SECTORS: SectorData[] = [
  {
    key: 'industrial',
    image: '/images/sector-industrial.png',
    name: { en: 'Industrial', ar: 'القطاع الصناعي' },
    short: {
      en: 'Factories, warehouses and heavy facilities built for longevity and operational uptime.',
      ar: 'مصانع ومستودعات ومنشآت ثقيلة تبنى للمتانة والاستمرارية التشغيلية.',
    },
    gallery: [
      { src: '/images/service-steel.png', caption: { en: 'Structural steel frames', ar: 'هياكل معدنية' } },
      { src: '/images/service-concrete.png', caption: { en: 'Heavy concrete works', ar: 'أعمال خرسانية ثقيلة' } },
      { src: '/images/service-excavation.png', caption: { en: 'Deep excavation', ar: 'حفر عميق' } },
      { src: '/images/service-groundworks.png', caption: { en: 'Ground preparation', ar: 'تجهيز المواقع' } },
      { src: '/images/sector-industrial.png', caption: { en: 'Industrial facility', ar: 'منشأة صناعية' } },
      { src: '/images/project-warehouse.png', caption: { en: 'Warehouse project', ar: 'مشروع مستودع' } },
      { src: '/images/service-infrastructure.png', caption: { en: 'Utility networks', ar: 'شبكات الخدمات' } },
      { src: '/images/hero-facade.png', caption: { en: 'Facade works', ar: 'أعمال الواجهات' } },
    ],
  },
  {
    key: 'commercial',
    image: '/images/sector-commercial.png',
    name: { en: 'Commercial', ar: 'القطاع التجاري' },
    short: {
      en: 'Office towers, retail and mixed-use centres delivered to demanding business schedules.',
      ar: 'أبراج مكاتب ومراكز تجزئة واستخدامات متعددة تسلم وفق جداول تجارية دقيقة.',
    },
    gallery: [
      { src: '/images/sector-commercial.png', caption: { en: 'Commercial centre', ar: 'مركز تجاري' } },
      { src: '/images/service-steel.png', caption: { en: 'Structure & steel', ar: 'هيكل وهياكل معدنية' } },
      { src: '/images/service-concrete.png', caption: { en: 'Concrete core', ar: 'نواة خرسانية' } },
      { src: '/images/service-mep.png', caption: { en: 'MEP fit-out', ar: 'أعمال كهروميكانيكية' } },
      { src: '/images/service-finishing.png', caption: { en: 'Premium finishes', ar: 'تشطيبات راقية' } },
      { src: '/images/hero-facade.png', caption: { en: 'Building facade', ar: 'واجهة المبنى' } },
    ],
  },
  {
    key: 'education',
    image: '/images/sector-education.png',
    name: { en: 'Education', ar: 'القطاع التعليمي' },
    short: {
      en: 'Schools, universities and campuses built for safety, durability and modern learning spaces.',
      ar: 'مدارس وجامعات وحرم تعليمية تبنى للسلامة والمتانة ومساحات التعلم الحديثة.',
    },
    gallery: [
      { src: '/images/sector-education.png', caption: { en: 'Education campus', ar: 'حرم تعليمي' } },
      { src: '/images/service-concrete.png', caption: { en: 'Structures & slabs', ar: 'هياكل وبلاطات' } },
      { src: '/images/service-infrastructure.png', caption: { en: 'Site infrastructure', ar: 'بنية الموقع التحتية' } },
      { src: '/images/service-mep.png', caption: { en: 'HVAC systems', ar: 'أنظمة التكييف' } },
      { src: '/images/service-finishing.png', caption: { en: 'Interior fit-out', ar: 'تجهيز داخلي' } },
      { src: '/images/hero-facade.png', caption: { en: 'Campus facade', ar: 'واجهة الحرم' } },
    ],
  },
  {
    key: 'healthcare',
    image: '/images/sector-healthcare.png',
    name: { en: 'Healthcare', ar: 'القطاع الصحي' },
    short: {
      en: 'Hospitals and clinics built to rigorous hygiene, safety and operational standards.',
      ar: 'مستشفيات وعيادات تبنى بمعايير صارمة للنظافة والسلامة والتشغيل.',
    },
    gallery: [
      { src: '/images/sector-healthcare.png', caption: { en: 'Medical facility', ar: 'منشأة طبية' } },
      { src: '/images/service-concrete.png', caption: { en: 'Structural works', ar: 'أعمال إنشائية' } },
      { src: '/images/service-mep.png', caption: { en: 'Medical-grade MEP', ar: 'كهروميكانيكا طبية' } },
      { src: '/images/service-finishing.png', caption: { en: 'Hygienic finishes', ar: 'تشطيبات صحية' } },
      { src: '/images/service-insulation.png', caption: { en: 'Thermal insulation', ar: 'عزل حراري' } },
      { src: '/images/project-warehouse.png', caption: { en: 'Facility build', ar: 'إنشاء المرفق' } },
    ],
  },
  {
    key: 'residential',
    image: '/images/sector-residential.png',
    name: { en: 'Residential', ar: 'القطاع السكني' },
    short: {
      en: 'Villas, compounds and towers with quality delivery and refined finishes.',
      ar: 'فيلات ومجمعات وأبراج سكنية بتسليم عالي الجودة وتشطيبات راقية.',
    },
    gallery: [
      { src: '/images/sector-residential.png', caption: { en: 'Residential project', ar: 'مشروع سكني' } },
      { src: '/images/service-finishing.png', caption: { en: 'Interior finishing', ar: 'تشطيبات داخلية' } },
      { src: '/images/service-concrete.png', caption: { en: 'Concrete structure', ar: 'هيكل خرساني' } },
      { src: '/images/service-mep.png', caption: { en: 'Home systems', ar: 'أنظمة المنزل' } },
      { src: '/images/service-excavation.png', caption: { en: 'Site excavation', ar: 'حفر الموقع' } },
      { src: '/images/hero-facade.png', caption: { en: 'Villa facade', ar: 'واجهة الفيلا' } },
    ],
  },
  {
    key: 'hospitality',
    image: '/images/sector-hospitality.png',
    name: { en: 'Hospitality', ar: 'قطاع الضيافة' },
    short: {
      en: 'Hotels, resorts and leisure spaces crafted with premium finishes and guest-focused design.',
      ar: 'فنادق ومنتجعات ومساحات ترفيهية بتشطيبات فاخرة وتصميم يركز على الضيوف.',
    },
    gallery: [
      { src: '/images/sector-hospitality.png', caption: { en: 'Hospitality venue', ar: 'منشأة ضيافة' } },
      { src: '/images/service-finishing.png', caption: { en: 'Premium interiors', ar: 'تصميم داخلي فاخر' } },
      { src: '/images/service-mep.png', caption: { en: 'Back-of-house MEP', ar: 'أعمال كهروميكانيكية' } },
      { src: '/images/service-insulation.png', caption: { en: 'Insulation works', ar: 'أعمال العزل' } },
      { src: '/images/skyline.png', caption: { en: 'Venue skyline', ar: 'أفق المنشأة' } },
      { src: '/images/hero-facade.png', caption: { en: 'Architectural facade', ar: 'واجهة معمارية' } },
    ],
  },
  {
    key: 'government',
    image: '/images/sector-government.png',
    name: { en: 'Government', ar: 'القطاع الحكومي' },
    short: {
      en: 'Public facilities and infrastructure delivered to government standards and compliance.',
      ar: 'منشآت وبنية تحتية عامة تنفذ وفق معايير الجهات الحكومية والامتثال.',
    },
    gallery: [
      { src: '/images/sector-government.png', caption: { en: 'Government complex', ar: 'مجمع حكومي' } },
      { src: '/images/service-infrastructure.png', caption: { en: 'Infrastructure works', ar: 'أعمال بنية تحتية' } },
      { src: '/images/service-concrete.png', caption: { en: 'Structural delivery', ar: 'أعمال إنشائية' } },
      { src: '/images/service-excavation.png', caption: { en: 'Site works', ar: 'أعمال الموقع' } },
      { src: '/images/service-finishing.png', caption: { en: 'Institutional finishing', ar: 'تشطيبات مؤسسية' } },
      { src: '/images/skyline.png', caption: { en: 'Public skyline', ar: 'أفق المنشآت العامة' } },
    ],
  },
]

export function getSectorByKey(key: string) {
  return SECTORS.find((s) => s.key === key)
}