export type Lang = 'en' | 'ar'

export const SECTION_IDS = {
  home: 'home',
  about: 'about',
  services: 'services',
  projects: 'projects',
  clients: 'clients',
  contact: 'contact',
} as const

type NavItem = { id: string; label: string }

type Feature = { key: string; title: string; text: string }
type Sector = { key: string; name: string; image: string }
type Service = { num: string; key: string; title: string; text: string; image: string }
type Step = { num: string; title: string; text: string }
type Stat = { value: number; suffix: string; label: string }

export type Dict = {
  dir: 'ltr' | 'rtl'
  langLabel: string
  nav: NavItem[]
  cta: { quote: string; services: string; projects: string; contact: string }
  hero: {
    tag: string
    headline: string
    sub: string
    badges: string[]
  }
  about: {
    kicker: string
    title: string
    body: string
    stats: Stat[]
  }
  visionMission: {
    kicker: string
    visionTitle: string
    vision: string
    missionTitle: string
    mission: string
  }
  why: { kicker: string; title: string; intro: string; features: Feature[] }
  sectors: { kicker: string; title: string; sub: string; items: Sector[] }
  services: { kicker: string; title: string; sub: string; items: Service[] }
  process: { kicker: string; title: string; sub: string; steps: Step[] }
  projects: { kicker: string; title: string; sub: string }
  clients: { kicker: string; title: string; sub: string; list: string[] }
  certs: {
    kicker: string
    title: string
    line: string
    items: { code: string; name: string }[]
    extra: string[]
  }
  contact: {
    kicker: string
    title: string
    sub: string
    form: {
      name: string
      email: string
      phone: string
      subject: string
      message: string
      send: string
      sent: string
    }
    infoTitle: string
    address: string
    phoneLabel: string
    emailLabel: string
  }
  footer: {
    tagline: string
    quickLinks: string
    servicesTitle: string
    sectorsTitle: string
    contactTitle: string
    rights: string
    group: string
  }
}

const clients = [
  'Saudi Binladin Group',
  'Nesma & Partners',
  'Ministry of Housing',
  'Ministry of Finance',
  'Ministry of Env. Water & Agriculture',
  'SAPTCO',
  'Alfanar',
  'Dar Al-Riyadh',
  'Dar Al-Handasah',
  'Bank Albilad',
  'Almarai',
  'Saudi Electricity Company',
  'King Salman Park',
  'Green Riyadh',
  'Sports Boulevard',
]

export const content: Record<Lang, Dict> = {
  en: {
    dir: 'ltr',
    langLabel: 'العربية',
    nav: [
      { id: 'home', label: 'Home' },
      { id: 'about', label: 'About' },
      { id: 'services', label: 'Services' },
      { id: 'projects', label: 'Projects' },
      { id: 'clients', label: 'Clients' },
      { id: 'contact', label: 'Contact' },
    ],
    cta: {
      quote: 'Get a Quote',
      services: 'Explore Our Services',
      projects: 'View Projects',
      contact: 'Contact Us',
    },
    hero: {
      tag: 'Since 2025',
      headline: 'Strength in Execution. Precision in Delivery.',
      sub: 'GeoDrill Construction Experts delivers integrated engineering and construction solutions across Saudi Arabia — from ground works to finishing, built to the highest standards of quality, safety, and innovation.',
      badges: ['ISO 9001', 'ISO 45001', 'ISO 14001'],
    },
    about: {
      kicker: 'Who We Are',
      title: 'Building trust across the Kingdom',
      body: 'Since its establishment, GeoDrill has been committed to delivering integrated engineering and construction solutions that meet the highest standards of quality and innovation. We specialize in general contracting, infrastructure, concrete works, finishing, and steel structures — supported by experienced professionals and modern execution methodologies. Through excellence, safety, and timely delivery, we strive to create lasting value for our clients while contributing to the goals of Saudi Vision 2030.',
      stats: [
        { value: 20, suffix: '+', label: 'Sectors Served' },
        { value: 3, suffix: '', label: 'ISO Certifications' },
        { value: 2025, suffix: '', label: 'Established' },
        { value: 34, suffix: '+', label: 'Completed Milestones' },
      ],
    },
    visionMission: {
      kicker: 'Vision & Mission',
      visionTitle: 'Our Vision',
      vision:
        'To become the preferred leader in general contracting and infrastructure across the Kingdom of Saudi Arabia by delivering innovative and sustainable construction solutions that set new standards of quality, efficiency, and reliability, while contributing to the objectives of Saudi Vision 2030.',
      missionTitle: 'Our Mission',
      mission:
        'At GeoDrill, we are committed to delivering integrated solutions in general contracting and infrastructure through high-quality execution, operational excellence, innovation, and the highest standards of safety and sustainability.',
    },
    why: {
      kicker: 'Why GeoDrill',
      title: 'We build more than projects — we build trust',
      intro:
        "At GeoDrill, we don't just build projects — we build trust. Backed by experienced professionals, proven methodologies, and an uncompromising commitment to quality.",
      features: [
        { key: 'experience', title: 'Experience', text: 'Accumulated expertise across complex builds.' },
        { key: 'quality', title: 'Quality', text: 'Uncompromising standards at every stage.' },
        { key: 'innovative', title: 'Innovative', text: 'Modern methodologies and technologies.' },
        { key: 'safety', title: 'Safety', text: 'Safety-first culture on every site.' },
        { key: 'ontime', title: 'On-Time', text: 'Reliable delivery, every deadline.' },
      ],
    },
    sectors: {
      kicker: 'Sectors We Serve',
      title: 'Expertise across seven key sectors',
      sub: 'From heavy industry to hospitality, we deliver tailored construction solutions.',
      items: [
        { key: 'industrial', name: 'Industrial', image: '/images/sector-industrial.png' },
        { key: 'commercial', name: 'Commercial', image: '/images/sector-commercial.png' },
        { key: 'education', name: 'Education', image: '/images/sector-education.png' },
        { key: 'healthcare', name: 'Healthcare', image: '/images/sector-healthcare.png' },
        { key: 'residential', name: 'Residential', image: '/images/sector-residential.png' },
        { key: 'hospitality', name: 'Hospitality', image: '/images/sector-hospitality.png' },
        { key: 'government', name: 'Government', image: '/images/sector-government.png' },
      ],
    },
    services: {
      kicker: 'Our Services',
      title: 'End-to-end construction capabilities',
      sub: 'A complete delivery chain — from the first cut of soil to the final finish.',
      items: [
        { num: '01', key: 'ground', title: 'Ground Works', text: 'Site preparation, leveling, soil compaction, and cutting & backfilling.', image: '/images/service-groundworks.png' },
        { num: '02', key: 'excavation', title: 'Excavation Works', text: 'Foundation and trench excavation, site prep to the highest safety standards.', image: '/images/service-excavation.png' },
        { num: '03', key: 'infrastructure', title: 'Infrastructure Works', text: 'Roads, water networks, sanitary drainage, electrical, telecom and utilities.', image: '/images/service-infrastructure.png' },
        { num: '04', key: 'concrete', title: 'Concrete Works', text: 'All reinforced concrete types: foundations, footings, columns, and slabs.', image: '/images/service-concrete.png' },
        { num: '05', key: 'steel', title: 'Steel Structures', text: 'Design, fabrication and erection of steel frameworks for commercial & industrial facilities.', image: '/images/service-steel.png' },
        { num: '06', key: 'mep', title: 'MEP Works', text: 'Full mechanical, electrical, plumbing, HVAC and ventilation systems.', image: '/images/service-mep.png' },
        { num: '07', key: 'finishing', title: 'Finishing Works', text: 'Interior and exterior finishing to the highest precision and quality.', image: '/images/service-finishing.png' },
        { num: '08', key: 'insulation', title: 'Insulation Works', text: 'Integrated waterproofing and insulation protecting structures from moisture and thermal effects.', image: '/images/service-insulation.png' },
      ],
    },
    process: {
      kicker: 'Construction Process',
      title: 'A disciplined path from concept to handover',
      sub: 'Eight structured stages that keep every project on scope, on budget, and on time.',
      steps: [
        { num: '01', title: 'Project Consultation', text: 'Understanding goals, scope, and constraints.' },
        { num: '02', title: 'Site Survey', text: 'Geotechnical investigation and assessment.' },
        { num: '03', title: 'Planning & Engineering', text: 'Detailed design and method statements.' },
        { num: '04', title: 'Proposal & Approval', text: 'Transparent scope, cost, and schedule.' },
        { num: '05', title: 'Execution', text: 'Precise, safe, and coordinated delivery.' },
        { num: '06', title: 'Quality Control', text: 'Continuous inspection and assurance.' },
        { num: '07', title: 'Testing & Commissioning', text: 'Systems verified and validated.' },
        { num: '08', title: 'Project Handover', text: 'Documented, clean, and on time.' },
      ],
    },
    projects: {
      kicker: 'Our Work',
      title: 'A look at what we build',
      sub: 'Selected imagery from earthworks, structures, MEP, and finishing across active sites.',
    },
    clients: {
      kicker: 'Our Clients',
      title: 'Trusted by leading organizations',
      sub: 'We partner with government bodies and premier private enterprises across the Kingdom.',
      list: clients,
    },
    certs: {
      kicker: 'Certifications & Official Docs',
      title: 'Certified for excellence and compliance',
      line: 'Certified for the provision of geotechnical investigation, structural assessment, shoring, piling design, and soil improvement services.',
      items: [
        { code: 'ISO 9001:2015', name: 'Quality Management' },
        { code: 'ISO 45001:2018', name: 'Occupational Health & Safety' },
        { code: 'ISO 14001:2015', name: 'Environmental Management' },
      ],
      extra: ['Riyadh Chamber Membership', 'Commercial Registration', 'Civil Defense License'],
    },
    contact: {
      kicker: 'Get in Touch',
      title: "Let's Build Something Lasting",
      sub: 'Tell us about your project and our team will get back to you promptly.',
      form: {
        name: 'Full Name',
        email: 'Email Address',
        phone: 'Phone Number',
        subject: 'Subject',
        message: 'Your Message',
        send: 'Send Message',
        sent: 'Thank you — we will be in touch shortly.',
      },
      infoTitle: 'Contact Details',
      address: 'Riyadh, Al Fayha District, Prince Saad Ibn Abdulrahman Branch Road',
      phoneLabel: '+966 5X XXX XXXX',
      emailLabel: 'info@geodrill.sa',
    },
    footer: {
      tagline: 'Strength in Execution. Precision in Delivery.',
      quickLinks: 'Quick Links',
      servicesTitle: 'Services',
      sectorsTitle: 'Sectors',
      contactTitle: 'Contact',
      rights: 'GeoDrill Construction Experts. All rights reserved.',
      group: 'Part of the GeoDrill Group',
    },
  },
  ar: {
    dir: 'rtl',
    langLabel: 'English',
    nav: [
      { id: 'home', label: 'الرئيسية' },
      { id: 'about', label: 'من نحن' },
      { id: 'services', label: 'خدماتنا' },
      { id: 'projects', label: 'مشاريعنا' },
      { id: 'clients', label: 'عملاؤنا' },
      { id: 'contact', label: 'تواصل معنا' },
    ],
    cta: {
      quote: 'اطلب عرض سعر',
      services: 'استكشف خدماتنا',
      projects: 'عرض المشاريع',
      contact: 'تواصل معنا',
    },
    hero: {
      tag: 'منذ 2025',
      headline: 'قوة في التنفيذ. دقة في الإنجاز.',
      sub: 'تقدم جيو دريل خبراء الإنشاء حلولاً هندسية وإنشائية متكاملة في جميع أنحاء المملكة العربية السعودية — من أعمال التربة حتى التشطيبات، وفق أعلى معايير الجودة والسلامة والابتكار.',
      badges: ['آيزو 9001', 'آيزو 45001', 'آيزو 14001'],
    },
    about: {
      kicker: 'من نحن',
      title: 'نبني الثقة في جميع أنحاء المملكة',
      body: 'منذ تأسيسها، تلتزم جيو دريل بتقديم حلول هندسية وإنشائية متكاملة تلبي أعلى معايير الجودة والابتكار. تمتلك الشركة خبرة واسعة في تنفيذ مشاريع المقاولات العامة، والبنية التحتية، والأعمال الخرسانية، والتشطيبات والهياكل المعدنية، مع الاعتماد على كوادر متخصصة ومنهجيات تنفيذ حديثة. نسعى إلى بناء قيمة مستدامة لعملائنا من خلال الجودة والسلامة والتميز في التنفيذ، والمساهمة في دعم رؤية المملكة 2030.',
      stats: [
        { value: 20, suffix: '+', label: 'قطاعًا نخدمه' },
        { value: 3, suffix: '', label: 'شهادات آيزو' },
        { value: 2025, suffix: '', label: 'سنة التأسيس' },
        { value: 34, suffix: '+', label: 'إنجازًا مكتملاً' },
      ],
    },
    visionMission: {
      kicker: 'الرؤية والرسالة',
      visionTitle: 'رؤيتنا',
      vision:
        'أن نكون الخيار الأول في قطاع المقاولات العامة والبنية التحتية داخل المملكة العربية السعودية، من خلال تقديم حلول إنشائية مبتكرة ومستدامة ترتقي بمعايير الجودة والكفاءة والموثوقية، بما يساهم في دعم مستهدفات رؤية المملكة 2030.',
      missionTitle: 'رسالتنا',
      mission:
        'نلتزم في جيو دريل بتقديم حلول متكاملة في قطاع المقاولات العامة والبنية التحتية، من خلال تنفيذ مشاريع عالية الجودة تعتمد على الكفاءة والابتكار والالتزام بأعلى معايير السلامة والاستدامة.',
    },
    why: {
      kicker: 'لماذا جيو دريل',
      title: 'نحن لا نبني المشاريع فحسب، بل نبني الثقة',
      intro:
        'في جيو دريل، لا نقوم ببناء المشاريع فحسب، بل نبني الثقة أيضًا. نعتمد على خبرات متراكمة، وفريق متخصص، ومنهجية تنفيذ احترافية تضمن الجودة في كل مرحلة.',
      features: [
        { key: 'experience', title: 'الخبرة', text: 'خبرات متراكمة في أعقد المشاريع.' },
        { key: 'quality', title: 'الجودة', text: 'معايير لا تقبل المساومة في كل مرحلة.' },
        { key: 'innovative', title: 'الابتكار', text: 'منهجيات وتقنيات تنفيذ حديثة.' },
        { key: 'safety', title: 'السلامة', text: 'ثقافة السلامة أولاً في كل موقع.' },
        { key: 'ontime', title: 'الالتزام', text: 'تسليم موثوق في كل موعد.' },
      ],
    },
    sectors: {
      kicker: 'القطاعات التي نخدمها',
      title: 'خبرة في سبعة قطاعات رئيسية',
      sub: 'من الصناعات الثقيلة إلى الضيافة، نقدم حلولاً إنشائية مصممة خصيصًا.',
      items: [
        { key: 'industrial', name: 'القطاع الصناعي', image: '/images/sector-industrial.png' },
        { key: 'commercial', name: 'القطاع التجاري', image: '/images/sector-commercial.png' },
        { key: 'education', name: 'القطاع التعليمي', image: '/images/sector-education.png' },
        { key: 'healthcare', name: 'القطاع الصحي', image: '/images/sector-healthcare.png' },
        { key: 'residential', name: 'القطاع السكني', image: '/images/sector-residential.png' },
        { key: 'hospitality', name: 'قطاع الضيافة', image: '/images/sector-hospitality.png' },
        { key: 'government', name: 'القطاع الحكومي', image: '/images/sector-government.png' },
      ],
    },
    services: {
      kicker: 'خدماتنا',
      title: 'قدرات إنشائية متكاملة من البداية للنهاية',
      sub: 'سلسلة تنفيذ متكاملة — من أول جرفة تربة حتى التشطيب النهائي.',
      items: [
        { num: '01', key: 'ground', title: 'أعمال التربة', text: 'تجهيز الموقع وتسوية ودمك التربة وأعمال القطع والردم.', image: '/images/service-groundworks.png' },
        { num: '02', key: 'excavation', title: 'أعمال الحفر', text: 'حفر الأساسات والخنادق وتجهيز الموقع وفق أعلى معايير السلامة.', image: '/images/service-excavation.png' },
        { num: '03', key: 'infrastructure', title: 'البنية التحتية', text: 'تنفيذ شبكات الطرق والمياه والصرف الصحي والكهرباء والاتصالات والمرافق.', image: '/images/service-infrastructure.png' },
        { num: '04', key: 'concrete', title: 'أعمال الخرسانة', text: 'تنفيذ جميع أنواع الخرسانة المسلحة من الأساسات والقواعد والأعمدة والأسقف.', image: '/images/service-concrete.png' },
        { num: '05', key: 'steel', title: 'الهياكل المعدنية', text: 'تصميم وتنفيذ وتركيب الهياكل المعدنية للمنشآت التجارية والصناعية.', image: '/images/service-steel.png' },
        { num: '06', key: 'mep', title: 'الأعمال الكهروميكانيكية', text: 'تنفيذ جميع أعمال الميكانيكا والكهرباء والسباكة وأنظمة التبريد والتكييف والتهوية.', image: '/images/service-mep.png' },
        { num: '07', key: 'finishing', title: 'أعمال التشطيبات', text: 'أعمال التشطيبات الداخلية والخارجية بأعلى مستويات الدقة والجودة.', image: '/images/service-finishing.png' },
        { num: '08', key: 'insulation', title: 'أعمال العزل', text: 'حلول عزل ومقاومة مياه متكاملة تحمي المباني من الرطوبة والحرارة.', image: '/images/service-insulation.png' },
      ],
    },
    process: {
      kicker: 'منهجية التنفيذ',
      title: 'مسار منضبط من الفكرة حتى التسليم',
      sub: 'ثماني مراحل منظمة تحافظ على كل مشروع ضمن النطاق والميزانية والوقت المحدد.',
      steps: [
        { num: '01', title: 'استشارة المشروع', text: 'فهم الأهداف والنطاق والقيود.' },
        { num: '02', title: 'مسح الموقع', text: 'الفحص والتقييم الجيوتقني.' },
        { num: '03', title: 'التخطيط والهندسة', text: 'تصميم تفصيلي ومنهجيات تنفيذ.' },
        { num: '04', title: 'العرض والاعتماد', text: 'نطاق وتكلفة وجدول شفاف.' },
        { num: '05', title: 'التنفيذ', text: 'تنفيذ دقيق وآمن ومنسق.' },
        { num: '06', title: 'ضبط الجودة', text: 'تفتيش وتأكيد مستمر.' },
        { num: '07', title: 'الاختبار والتشغيل', text: 'التحقق من الأنظمة واعتمادها.' },
        { num: '08', title: 'تسليم المشروع', text: 'موثق ونظيف وفي الوقت المحدد.' },
      ],
    },
    projects: {
      kicker: 'أعمالنا',
      title: 'نظرة على ما نبنيه',
      sub: 'صور مختارة من أعمال التربة والهياكل والكهروميكانيكا والتشطيبات في مواقعنا.',
    },
    clients: {
      kicker: 'عملاؤنا',
      title: 'موضع ثقة كبرى المؤسسات',
      sub: 'نتشارك مع الجهات الحكومية وكبرى المؤسسات الخاصة في جميع أنحاء المملكة.',
      list: clients,
    },
    certs: {
      kicker: 'الشهادات والمستندات الرسمية',
      title: 'معتمدون للتميز والامتثال',
      line: 'معتمدون لتقديم خدمات الفحص الجيوتقني والتقييم الإنشائي وتصميم أعمال التدعيم والخوازيق وتحسين التربة.',
      items: [
        { code: 'آيزو 9001:2015', name: 'إدارة الجودة' },
        { code: 'آيزو 45001:2018', name: 'الصحة والسلامة المهنية' },
        { code: 'آيزو 14001:2015', name: 'الإدارة البيئية' },
      ],
      extra: ['عضوية غرفة الرياض', 'السجل التجاري', 'رخصة الدفاع المدني'],
    },
    contact: {
      kicker: 'تواصل معنا',
      title: 'لنبنِ شيئًا يدوم',
      sub: 'أخبرنا عن مشروعك وسيتواصل معك فريقنا في أقرب وقت.',
      form: {
        name: 'الاسم الكامل',
        email: 'البريد الإلكتروني',
        phone: 'رقم الهاتف',
        subject: 'الموضوع',
        message: 'رسالتك',
        send: 'إرسال الرسالة',
        sent: 'شكرًا لك — سنتواصل معك قريبًا.',
      },
      infoTitle: 'بيانات التواصل',
      address: 'الرياض، حي الفيحاء، طريق الأمير سعد بن عبدالرحمن الفرعي',
      phoneLabel: '+966 5X XXX XXXX',
      emailLabel: 'info@geodrill.sa',
    },
    footer: {
      tagline: 'قوة في التنفيذ. دقة في الإنجاز.',
      quickLinks: 'روابط سريعة',
      servicesTitle: 'الخدمات',
      sectorsTitle: 'القطاعات',
      contactTitle: 'تواصل',
      rights: 'جيو دريل خبراء الإنشاء. جميع الحقوق محفوظة.',
      group: 'جزء من مجموعة جيو دريل',
    },
  },
}
