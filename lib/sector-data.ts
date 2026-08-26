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
      { src: '/images/final/projects/02_structures_and_steel/steel_warehouse_frame_complete.jpg', caption: { en: 'Steel warehouse structure', ar: 'هيكل مستودع معدني' } },
      { src: '/images/final/projects/02_structures_and_steel/steel_frame_industrial_tanks.jpg', caption: { en: 'Industrial steel frames & tanks', ar: 'هياكل وخزانات صناعية' } },
      { src: '/images/final/projects/03_mep/mep_hvac_plantroom.jpg', caption: { en: 'MEP HVAC plant room', ar: 'غرفة أنظمة التكييف' } },
      { src: '/images/final/projects/06_industrial/sector_industrial.jpg', caption: { en: 'Industrial facility', ar: 'منشأة صناعية' } },
      { src: '/images/final/projects/02_structures_and_steel/steel_warehouse_exterior_red.jpg', caption: { en: 'Warehouse exterior', ar: 'واجهة المستودع' } },
      { src: '/images/final/projects/new_towers_highrise/multiple_tower_cranes_site.jpg', caption: { en: 'Multi-crane mega-site development', ar: 'موقع تطوير بأوناش متعددة' } },
      { src: '/images/final/projects/new_steel_variety/steel_frame_complete_blockwork.jpg', caption: { en: 'Steel frame with blockwork', ar: 'هيكل معدني مع أعمال بناء' } },
      { src: '/images/final/projects/new_misc_industrial/steel_frame_silo_tank_structure.jpg', caption: { en: 'Industrial silo & tank structure', ar: 'هيكل صناعي للخزانات' } },
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
      { src: '/images/final/projects/04_finishing/finishing_glass_office_partition.jpg', caption: { en: 'Glass office partition', ar: 'فواصل مكتبية زجاجية' } },
      { src: '/images/final/projects/04_finishing/finishing_lobby_reception.jpg', caption: { en: 'Office reception & lobby', ar: 'استقبال وبهو المكتب' } },
      { src: '/images/final/projects/02_structures_and_steel/steel_frame_erection_wide.jpg', caption: { en: 'Steel frame erection', ar: 'تركيب الهيكل المعدني' } },
      { src: '/images/final/projects/04_finishing/finishing_open_ceiling_lights.jpg', caption: { en: 'Open ceiling with lighting', ar: 'سقف مفتوح بإضاءة' } },
      { src: '/images/final/projects/new_towers_highrise/highrise_steel_frame_tower_crane.jpg', caption: { en: 'High-rise tower under construction', ar: 'برج قيد الإنشاء' } },
      { src: '/images/final/projects/new_towers_highrise/residential_tower_facade_progress.jpg', caption: { en: 'Tower facade progress', ar: 'تقدم واجهة البرج' } },
      { src: '/images/final/projects/new_finishing_named_projects/reception_desk_marble_render.jpg', caption: { en: 'Marble reception desk', ar: 'مكتب استقبال رخامي' } },
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
      { src: '/images/final/projects/04_finishing/finishing_corridor_hallway.jpg', caption: { en: 'Corridor & hallway fit-out', ar: 'ممرات وقاعات' } },
      { src: '/images/final/projects/01_groundworks/groundworks_site_leveling.jpg', caption: { en: 'Site levelling works', ar: 'أعمال تسوية الموقع' } },
      { src: '/images/final/projects/01_groundworks/concrete_slab_reinforcement.jpg', caption: { en: 'Concrete slab reinforcement', ar: 'تسليح بلاطات خرسانية' } },
      { src: '/images/final/projects/04_finishing/finishing_window_black_frame.jpg', caption: { en: 'Window frame detailing', ar: 'تفاصيل إطارات النوافذ' } },
      { src: '/images/final/projects/new_finishing_commercial/finishing_courtroom_wood_paneling.jpg', caption: { en: 'Wood-paneled hall finishing', ar: 'تشطيب قاعة بألواح خشبية' } },
      { src: '/images/final/projects/new_finishing_named_projects/courtroom_render_bench_seating.jpg', caption: { en: 'modern halls', ar: 'قاعات حديثة' } },
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
      { src: '/images/final/projects/03_mep/mep_ceiling_ductwork_red_pipes.jpg', caption: { en: 'Ceiling ductwork & piping', ar: 'مجاري وتمديدات السقف' } },
      { src: '/images/final/projects/04_finishing/finishing_bathroom_marble.jpg', caption: { en: 'Marble bathroom finishes', ar: 'تشطيبات حمامات رخامية' } },
      { src: '/images/final/projects/03_mep/mep_underfloor_conduit_slab.jpg', caption: { en: 'Underfloor MEP conduits', ar: 'تمديدات تحت الأرضية' } },
      { src: '/images/final/projects/04_finishing/finishing_corridor_hallway.jpg', caption: { en: 'Corridor finishing', ar: 'تشطيبات الممرات' } },
      { src: '/images/final/projects/new_finishing_named_projects/hamc_lounge_reception_render.jpg', caption: { en: 'Medical complex reception lounge', ar: 'صالة استقبال مجمع طبي' } },
      { src: '/images/final/projects/new_mep_variety/mep_pex_plumbing_red_blue.jpg', caption: { en: 'Medical-grade plumbing systems', ar: 'أنظمة سباكة طبية' } },
      { src: '/images/final/projects/new_mep_variety/mep_fire_pump_enclosure_cage.jpg', caption: { en: 'Fire safety pump system', ar: 'نظام مضخات مكافحة الحريق' } },
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
      { src: '/images/final/projects/04_finishing/finishing_bedroom_suite.jpg', caption: { en: 'Bedroom suite finishing', ar: 'تشطيبات الجناح السكني' } },
      { src: '/images/final/projects/04_finishing/finishing_bedroom_wood_floor.jpg', caption: { en: 'Wooden flooring', ar: 'أرضيات خشبية' } },
      { src: '/images/final/projects/04_finishing/finishing_living_room_millwork.jpg', caption: { en: 'Living room millwork', ar: 'أعمال نجارة غرفة المعيشة' } },
      { src: '/images/final/projects/04_finishing/finishing_staircase_wood_floor.jpg', caption: { en: 'Wooden staircase', ar: 'درج خشبي' } },
      { src: '/images/final/projects/new_finishing_villa/villa_hallway_marble_medallion.jpg', caption: { en: 'Marble medallion hallway', ar: 'ممر برخام مزخرف' } },
      { src: '/images/final/projects/new_finishing_residential/finishing_kitchen_white_modern.jpg', caption: { en: 'Modern white kitchen', ar: 'مطبخ عصري أبيض' } },
      { src: '/images/final/projects/new_finishing_residential/finishing_bathroom_sauna_glass.jpg', caption: { en: 'Glass sauna installation', ar: 'تركيب ساونا زجاجية' } },
      { src: '/images/final/projects/new_landscaping/landscape_pool_fountain_villa.jpg', caption: { en: 'Villa pool & fountain landscaping', ar: 'مسبح ونافورة فيلا' } },
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
      { src: '/images/final/projects/04_finishing/finishing_lobby_reception.jpg', caption: { en: 'Grand lobby & reception', ar: 'بهو واستقبال فاخر' } },
      { src: '/images/final/projects/04_finishing/finishing_bathroom_marble_2.jpg', caption: { en: 'Marble bathroom finishing', ar: 'تشطيبات رخامية للحمامات' } },
      { src: '/images/final/projects/04_finishing/finishing_bedroom_suite.jpg', caption: { en: 'Hotel bedroom suite', ar: 'جناح فندقي' } },
      { src: '/images/final/projects/04_finishing/finishing_staircase_glass_rail.jpg', caption: { en: 'Staircase with glass rail', ar: 'درج بدرابزين زجاجي' } },
      { src: '/images/final/projects/new_landscaping/landscape_pool_palm_walkway.jpg', caption: { en: 'Palm-lined pool walkway', ar: 'ممر مسبح بأشجار النخيل' } },
      { src: '/images/final/projects/new_landscaping/landscape_pool_deck_pergola.jpg', caption: { en: 'Pool deck with pergola', ar: 'سطح مسبح مع المظلة' } },
      { src: '/images/final/projects/new_finishing_commercial/finishing_lobby_stairs_marble.jpg', caption: { en: 'Marble lobby staircase', ar: 'درج بهو رخامي' } },
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
      { src: '/images/final/projects/01_groundworks/infrastructure_column_layout.jpg', caption: { en: 'Infrastructure column layout', ar: 'تخطيط أعمدة البنية التحتية' } },
      { src: '/images/final/projects/01_groundworks/concrete_column_reinforcement.jpg', caption: { en: 'Concrete column reinforcement', ar: 'تسليح الأعمدة الخرسانية' } },
      { src: '/images/final/projects/02_structures_and_steel/steel_frame_closeup_sky.jpg', caption: { en: 'Steel structure against sky', ar: 'هيكل معدني مقابل السماء' } },
      { src: '/images/final/projects/01_groundworks/groundworks_desert_grading.jpg', caption: { en: 'Site grading works', ar: 'أعمال تسوية الموقع' } },
      { src: '/images/final/projects/new_finishing_named_projects/gso_building_night_facade.jpg', caption: { en: 'GSO headquarters facade', ar: 'واجهة مقر هيئة التقييس' } },
      { src: '/images/final/projects/new_misc_industrial/gso_building_entrance_render.jpg', caption: { en: 'Government building entrance', ar: 'مدخل مبنى حكومي' } },
    ],
  },
]

export function getSectorByKey(key: string) {
  return SECTORS.find((s) => s.key === key)
}