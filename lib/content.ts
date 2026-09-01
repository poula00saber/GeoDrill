export type Lang = "en" | "ar";

export const SECTION_IDS = {
  home: "home",
  about: "about",
  services: "services",
  projects: "projects",
  clients: "clients",
  blog: "blog",
  faq: "faq",
  contact: "contact",
} as const;

type NavItem = { id: string; label: string };

type Feature = { key: string; title: string; text: string };
type Sector = { key: string; name: string; image: string };
type Service = {
  num: string;
  key: string;
  title: string;
  text: string;
  image: string;
};
type Step = { num: string; title: string; text: string };
type Stat = { value: number; suffix: string; label: string };

export type Dict = {
  dir: "ltr" | "rtl";
  langLabel: string;
  nav: NavItem[];
  cta: { quote: string; services: string; projects: string; contact: string };
  hero: {
    tag: string;
    headline: string;
    sub: string;
    badges: string[];
  };
  about: {
    kicker: string;
    title: string;
    body: string;
    stats: Stat[];
  };
  visionMission: {
    kicker: string;
    visionTitle: string;
    vision: string;
    missionTitle: string;
    mission: string;
  };
  why: { kicker: string; title: string; intro: string; features: Feature[] };
  sectors: { kicker: string; title: string; sub: string; items: Sector[] };
  services: { kicker: string; title: string; sub: string; items: Service[] };
  process: { kicker: string; title: string; sub: string; steps: Step[] };
  projects: { kicker: string; title: string; sub: string };
  clients: { kicker: string; title: string; sub: string; list: string[] };
  blog: {
    kicker: string;
    title: string;
    sub: string;
    viewAll: string;
    empty: string;
  };
  faq: {
    kicker: string;
    title: string;
    sub: string;
    viewAll: string;
    sideTitle: string;
    sideBody: string;
    sideCta: string;
  };
  certs: {
    kicker: string;
    title: string;
    line: string;
    items: { code: string; name: string }[];
    extra: string[];
  };
  contact: {
    kicker: string;
    title: string;
    sub: string;
    form: {
      name: string;
      entityLabel: string;
      entityIndividual: string;
      entityCompany: string;
      companyName: string;
      email: string;
      phone: string;
      projectDescription: string;
      subject: string;
      message: string;
      send: string;
      sending: string;
      sent: string;
      attachment: string;
      attachmentHint: string;
    };
    infoTitle: string;
    address: string;
    phoneLabel: string;
    emailLabel: string;
    whatsapp: string;
  };
  footer: {
    tagline: string;
    quickLinks: string;
    servicesTitle: string;
    sectorsTitle: string;
    contactTitle: string;
    rights: string;
    group: string;
    home: string;
    aboutPage: string;
    servicesPage: string;
    projectsPage: string;
    contactPage: string;
    followLabel: string;
    locationsTitle: string;
    social: {
      instagram: string;
      x: string;
      linkedin: string;
      facebook: string;
    };
  };
  page: {
    about: { kicker: string; title: string; sub: string; image: string };
    services: { kicker: string; title: string; sub: string; image: string };
    projects: { kicker: string; title: string; sub: string; image: string };
    contact: { kicker: string; title: string; sub: string; image: string };
  };
};

const clients = [
  "Saudi Binladin Group",
  "Nesma & Partners",
  "Ministry of Housing",
  "Ministry of Finance",
  "Ministry of Env. Water & Agriculture",
  "SAPTCO",
  "Alfanar",
  "Dar Al-Riyadh",
  "Dar Al-Handasah",
  "Bank Albilad",
  "Almarai",
  "Saudi Electricity Company",
  "King Salman Park",
  "Green Riyadh",
  "Sports Boulevard",
];

export const content: Record<Lang, Dict> = {
  en: {
    dir: "ltr",
    langLabel: "العربية",
    nav: [
      { id: "home", label: "Home" },
      { id: "about", label: "About" },
      { id: "services", label: "Services" },
      { id: "projects", label: "Projects" },
      { id: "clients", label: "Clients" },
      { id: "blog", label: "Blog" },
      { id: "faq", label: "FAQ" },
      { id: "contact", label: "Contact" },
    ],
    cta: {
      quote: "Contact Us",
      services: "Explore Our Services",
      projects: "View Projects",
      contact: "Contact Us",
    },
    hero: {
      tag: "GEODRILL Construction Experts",
      headline: "Strength in Execution. Precision in Delivery.",
      sub: "GEODRILL Construction delivers integrated construction solutions across Saudi Arabia, from ground works to finishing, built to the highest standards of quality, safety, and innovation.",
      badges: ["ISO 9001", "ISO 45001", "ISO 14001"],
    },
    about: {
      kicker: "Who We Are",
      title: "Building trust across the Kingdom",
      body: "Since its establishment, GEODRILL has been committed to delivering integrated engineering and construction solutions that meet the highest standards of quality and innovation. We specialize in general contracting, infrastructure, concrete works, finishing, and steel structures, supported by experienced professionals and modern execution methodologies. Through excellence, safety, and timely delivery, we strive to create lasting value for our clients while contributing to the goals of Saudi Vision 2030.",
      stats: [
        // Verified: profile lists exactly 7 sectors (Industrial, Commercial,
        // Education, Healthcare, Residential, Hospitality, Government).
        { value: 7, suffix: "", label: "Sectors Served" },
        // Verified: ISO 9001:2015, ISO 45001:2018, ISO 14001:2015.
        { value: 3, suffix: "", label: "ISO Certifications" },
        { value: 24, suffix: "+", label: "Completed Milestones" },
      ],
    },
    visionMission: {
      kicker: "Vision & Mission",
      visionTitle: "Our Vision",
      vision:
        "To become the preferred leader in general contracting and infrastructure across the Kingdom of Saudi Arabia by delivering innovative and sustainable construction solutions that set new standards of quality, efficiency, and reliability, while contributing to the objectives of Saudi Vision 2030.",
      missionTitle: "Our Mission",
      mission:
        "At GEODRILL, we are committed to delivering integrated solutions in general contracting and infrastructure through high-quality execution, operational excellence, innovation, and the highest standards of safety and sustainability.",
    },
    why: {
      kicker: "Why GEODRILL",
      title: "We build more than projects, we build trust",
      intro:
        "At GEODRILL, we don't just build projects, we build trust. Backed by experienced professionals, proven methodologies, and an uncompromising commitment to quality.",
      features: [
        {
          key: "experience",
          title: "Experience",
          text: "Accumulated expertise across complex builds.",
        },
        {
          key: "quality",
          title: "Quality",
          text: "Built to the highest standard.",
        },
        {
          key: "innovative",
          title: "Innovative",
          text: "Modern methodologies and technologies.",
        },
        {
          key: "safety",
          title: "Safety",
          text: "Safety-first on every site.",
        },
        {
          key: "ontime",
          title: "On-Time",
          text: "Reliable delivery, zero delay.",
        },
      ],
    },
    sectors: {
      kicker: "Sectors We Serve",
      title: "Construction Expertise Across Diverse Sectors.",
      sub: "Delivering reliable construction solutions across diverse sectors, tailored to the unique requirements of every project.",
      items: [
        {
          key: "industrial",
          name: "Industrial",
          image: "/images/sector-industrial.png",
        },
        {
          key: "commercial",
          name: "Commercial",
          image: "/images/sector-commercial.png",
        },
        {
          key: "education",
          name: "Education",
          image: "/images/sector-education.png",
        },
        {
          key: "healthcare",
          name: "Healthcare",
          image: "/images/sector-healthcare.png",
        },
        {
          key: "residential",
          name: "Residential",
          image: "/images/sector-residential.png",
        },
        {
          key: "hospitality",
          name: "Hospitality",
          image: "/images/sector-hospitality.png",
        },
        {
          key: "government",
          name: "Government",
          image: "/images/sector-government.png",
        },
      ],
    },
    services: {
      kicker: "Our Services",
      title: "Integrated Construction Capabilities",
      sub: "From ground preparation to project completion, our full-scope capabilities ensure seamless execution at every stage of development..",
      items: [
        {
          num: "01",
          key: "ground",
          title: "Ground Works",
          text: "Site preparation, leveling, soil compaction, and cutting & backfilling.",
          image: "/images/service-groundworks.png",
        },
        {
          num: "02",
          key: "excavation",
          title: "Excavation Works",
          text: "Foundation and trench excavation, site prep to the highest safety standards.",
          image: "/images/service-excavation.png",
        },
        {
          num: "03",
          key: "infrastructure",
          title: "Infrastructure Works",
          text: "Roads, water networks, sanitary drainage, electrical, telecom and utilities.",
          image: "/images/service-infrastructure.png",
        },
        {
          num: "04",
          key: "concrete",
          title: "Concrete Works",
          text: "All reinforced concrete types: foundations, footings, columns, and slabs.",
          image: "/images/service-concrete.png",
        },
        {
          num: "05",
          key: "steel",
          title: "Steel Structures",
          text: "Design, fabrication and erection of steel frameworks for commercial & industrial facilities.",
          image: "/images/service-steel.png",
        },
        {
          num: "06",
          key: "mep",
          title: "MEP Works",
          text: "Full mechanical, electrical, plumbing, HVAC and ventilation systems.",
          image: "/images/service-mep.png",
        },
        {
          num: "07",
          key: "finishing",
          title: "Finishing Works",
          text: "Interior and exterior finishing to the highest precision and quality.",
          image: "/images/service-finishing.png",
        },
        {
          num: "08",
          key: "insulation",
          title: "Insulation Works",
          text: "Integrated waterproofing and insulation protecting structures from moisture and thermal effects.",
          image: "/images/service-insulation.png",
        },
      ],
    },
    process: {
      kicker: "Construction Process",
      title: "An integrated journey from initial idea to final handover",
      sub: "Eight structured stages that keep every project on scope, budget, and on time.",
      steps: [
        {
          num: "01",
          title: "Project Consultation",
          text: "Understanding goals, scope, and constraints.",
        },
        {
          num: "02",
          title: "Site Survey",
          text: "Geotechnical investigation and assessment.",
        },
        {
          num: "03",
          title: "Planning & Engineering",
          text: "Detailed design, engineering studies, and execution methodology.",
        },
        {
          num: "04",
          title: "Proposal & Approval",
          text: "Transparent scope, cost, and schedule.",
        },
        {
          num: "05",
          title: "Execution",
          text: "Precise, safe, and coordinated delivery.",
        },
        {
          num: "06",
          title: "Quality Control",
          text: "Continuous site inspections and compliance assurance.",
        },
        {
          num: "07",
          title: "Testing & Commissioning",
          text: "Systems verified and validated.",
        },
        {
          num: "08",
          title: "Project Handover",
          text: "Documented, on-time project completion and final handover.",
        },
      ],
    },
    projects: {
      kicker: "Our Work",
      title: "Architectural & Structural Excellence in Action",
      sub: "A closer look at the engineering disciplines and execution standards behind every GEODRILL project.",
    },
    clients: {
      kicker: "Our Clients",
      title: "Trusted by leading organizations",
      sub: "We partner with government bodies and premier private enterprises across the Kingdom.",
      list: clients,
    },
    blog: {
      kicker: "Insights & Updates",
      title: "Ideas From the Field",
      sub: "We share practical insights and real-world experiences from our projects, along with the latest developments in the construction and engineering industries. Our content aims to expand knowledge and highlight best practices for delivering high-quality projects built to last.",
      viewAll: "View all insights",
      empty: "New insights are coming soon.",
    },
    faq: {
      kicker: "Frequently Asked Questions",
      title: "Clear Answers to Help You Make Confident Decisions",
      sub: "Here, we answer some of the most common questions our clients have before and during the start of their projects, helping you better understand the process and project requirements.",
      viewAll: "View all questions",
      sideTitle: "Couldn't Find the Answer to Your Question?",
      sideBody: "GEODRILL team is ready to answer your questions and help you understand the right steps for your project.",
      sideCta: "Get in touch",
    },
    certs: {
      kicker: "Certifications & Compliance",
      title: "Trusted Standards of Excellence & Quality",
      line: "Internationally and locally accredited to ensure the highest standards of quality, occupational health & safety, and environmental compliance across all our projects.",
      items: [
        { code: "ISO 9001:2015", name: "Quality Management" },
        { code: "ISO 45001:2018", name: "Occupational Health & Safety" },
        { code: "ISO 14001:2015", name: "Environmental Management" },
      ],
      extra: [],
    },
    contact: {
      kicker: "Get in Touch",
      title: "Let's Build Something Lasting",
      sub: "Tell us about your project and our team will get back to you promptly.",
      form: {
        name: "Full Name",
        entityLabel: "I am",
        entityIndividual: "An individual",
        entityCompany: "A company",
        companyName: "Company Name",
        email: "Email Address",
        phone: "Phone Number",
        projectDescription: "Project Description",
        subject: "Subject",
        message: "Your Message",
        send: "Send Message",
        sending: "Sending\u2026",
        sent: "Thank you, we will be in touch shortly.",
        attachment: "Attach a file (optional)",
        attachmentHint: "Photo, PDF, or Word — max 10 MB.",
      },
      infoTitle: "Contact Details",
      address:
        "Prince Saad Ibn Abdulrahman Al Awal Road, Al Rawabi District, Riyadh 14253, Saudi Arabia",
      phoneLabel: "+966 59 694 5051",
      emailLabel: "contracting@geodrillksa.com",
      whatsapp: "https://wa.me/966596945051",
    },
    footer: {
      tagline: "Strength in Execution. Precision in Delivery.",
      quickLinks: "Quick Links",
      servicesTitle: "Services",
      sectorsTitle: "Sectors",
      contactTitle: "Contact",
      rights: "GEODRILL Construction Experts. All rights reserved.",
      group: "Part of the GEODRILL Group",
      home: "Home",
      aboutPage: "About Us",
      servicesPage: "Our Services",
      projectsPage: "Our Projects",
      contactPage: "Contact Us",
      followLabel: "Follow Us",
      locationsTitle: "Our Location",
      social: {
        instagram:
          "https://www.instagram.com/geodrill.contracting?utm_source=qr",
        x: "https://x.com/geodrillconst?s=11",
        linkedin: "https://www.linkedin.com/company/geodrillksa/home/",
        facebook: "https://www.facebook.com/geodrillksa",
      },
    },
    page: {
      about: {
        kicker: "About GEODRILL",
        title: "A trusted partner for construction and engineering excellence",
        sub: "GEODRILL Construction Experts combines deep geotechnical expertise with full general-contracting capability to deliver reliable, high-quality projects across the Kingdom.",
        image: "/images/sector-industrial.png",
      },
      services: {
        kicker: "Capabilities",
        title: "Integrated services from ground works to finishing",
        sub: "A full spectrum of construction disciplines under one roof, executed with certified quality, safety and precision.",
        image: "/images/service-concrete.png",
      },
      projects: {
        kicker: "Our Portfolio",
        title: "Selected projects that speak for us",
        sub: "A look across our ground works, structures, MEP and finishing works in active sites across the Kingdom.",
        image: "/images/project-warehouse.png",
      },
      contact: {
        kicker: "Get in Touch",
        title: "Let us build something that lasts",
        sub: "Tell us about your project and our team will respond shortly.",
        image: "/images/skyline.png",
      },
    },
  },
  ar: {
    dir: "rtl",
    langLabel: "English",
    nav: [
      { id: "home", label: "الرئيسية" },
      { id: "about", label: "من نحن" },
      { id: "services", label: "خدماتنا" },
      { id: "projects", label: "مشاريعنا" },
      { id: "clients", label: "عملاؤنا" },
      { id: "blog", label: "المدونة" },
      { id: "faq", label: "الأسئلة الشائعة" },
      { id: "contact", label: "تواصل معنا" },
    ],
    cta: {
      quote: "تواصل معنا",
      services: "استكشف خدماتنا",
      projects: "عرض المشاريع",
      contact: "تواصل معنا",
    },
    hero: {
      tag: "جيو دريل خبراء الإنشاء",
      headline: "قوة في التنفيذ. دقة في الإنجاز.",
      // In your translation file:
      sub: "تقدم جيو دريل حلولاً هندسية وإنشائية متكاملة في جميع أنحاء المملكة العربية السعودية، بدءاً من أعمال التربة والحفر وحتى اللمسات النهائية، وفق أعلى معايير الجودة والسلامة والابتكار لتلبية وتجاوز تطلعات العملاء.",
      badges: ["آيزو 9001", "آيزو 45001", "آيزو 14001"],
    },
    about: {
      kicker: "من نحن",
      title: "نبني الثقة في جميع أنحاء المملكة",
      body: "منذ تأسيسها، تلتزم جيو دريل بتقديم حلول هندسية وإنشائية متكاملة تلبي أعلى معايير الجودة والابتكار. تمتلك الشركة خبرة واسعة في تنفيذ مشاريع المقاولات العامة، والبنية التحتية، والأعمال الخرسانية، والتشطيبات والهياكل المعدنية، مع الاعتماد على كوادر متخصصة ومنهجيات تنفيذ حديثة. نسعى إلى بناء قيمة مستدامة لعملائنا من خلال الجودة والسلامة والتميز في التنفيذ، والمساهمة في دعم رؤية المملكة 2030.",
      stats: [
        // مؤكد: قائمة الملف الشخصي تذكر 7 قطاعات بالضبط.
        { value: 7, suffix: "", label: "قطاعات نخدمها" },
        // مؤكد: آيزو 9001:2015، آيزو 45001:2018، آيزو 14001:2015.
        { value: 3, suffix: "", label: "شهادات آيزو" },
        { value: 24, suffix: "+", label: "إنجازًا مكتملاً" },
      ],
    },
    visionMission: {
      kicker: "الرؤية والرسالة",
      visionTitle: "رؤيتنا",
      vision:
        "أن نكون الخيار الأول في قطاع المقاولات العامة والبنية التحتية داخل المملكة العربية السعودية، من خلال تقديم حلول إنشائية مبتكرة ومستدامة ترتقي بمعايير الجودة والكفاءة والموثوقية، بما يساهم في دعم مستهدفات رؤية المملكة 2030.",
      missionTitle: "رسالتنا",
      mission:
        "نلتزم في جيو دريل بتقديم حلول متكاملة في قطاع المقاولات العامة والبنية التحتية، من خلال تنفيذ مشاريع عالية الجودة تعتمد على الكفاءة والابتكار والالتزام بأعلى معايير السلامة والاستدامة.",
    },
    why: {
      kicker: "لماذا جيو دريل",
      title: "نحن لا نبني المشاريع فحسب، بل نبني الثقة",
      intro:
        "في جيو دريل، لا نقوم ببناء المشاريع فحسب، بل نبني الثقة أيضًا. نعتمد على خبرات متراكمة، وفريق متخصص، ومنهجية تنفيذ احترافية تضمن الجودة في كل مرحلة.",
      features: [
        {
          key: "experience",
          title: "الخبرة",
          text: "خبرات متراكمة في أعقد المشاريع.",
        },
        {
          key: "quality",
          title: "الجودة",
          text: "مُصمّم وفق أعلى المعايير.",
        },
        {
          key: "innovative",
          title: "الابتكار",
          text: "منهجيات وتقنيات تنفيذ حديثة.",
        },
        {
          key: "safety",
          title: "السلامة",
          text: "ثقافة السلامة أولاً في كل موقع.",
        },
        {
          key: "ontime",
          title: "الدقة في المواعيد",
          text: "تسليمٌ مضمون، بدون أي تأخير..",
        },
      ],
    },
    sectors: {
      kicker: "القطاعات التي نخدمها",
      title: "خبرات إنشائية متخصصة لمختلف القطاعات",
      sub: "نقدم حلولًا إنشائية موثوقة لمختلف القطاعات، بما يتناسب مع متطلبات كل مشروع واحتياجاته.",
      items: [
        {
          key: "industrial",
          name: "القطاع الصناعي",
          image: "/images/sector-industrial.png",
        },
        {
          key: "commercial",
          name: "القطاع التجاري",
          image: "/images/sector-commercial.png",
        },
        {
          key: "education",
          name: "القطاع التعليمي",
          image: "/images/sector-education.png",
        },
        {
          key: "healthcare",
          name: "القطاع الصحي",
          image: "/images/sector-healthcare.png",
        },
        {
          key: "residential",
          name: "القطاع السكني",
          image: "/images/sector-residential.png",
        },
        {
          key: "hospitality",
          name: "قطاع الضيافة",
          image: "/images/sector-hospitality.png",
        },
        {
          key: "government",
          name: "القطاع الحكومي",
          image: "/images/sector-government.png",
        },
      ],
    },
    services: {
      kicker: "خدماتنا",
      title: "قدراتٌ إنشائية متكاملة",
      sub: "من تهيئة الموقع وحتى الإنجاز النهائي للمشروع، تضمن قدراتنا متكاملة النطاق تنفيذًا سلسًا في كل مرحلة من مراحل التطوير.",
      items: [
        {
          num: "01",
          key: "ground",
          title: "أعمال التربة",
          text: "تجهيز الموقع وتسوية ودمك التربة وأعمال القطع والردم.",
          image: "/images/service-groundworks.png",
        },
        {
          num: "02",
          key: "excavation",
          title: "أعمال الحفر",
          text: "حفر الأساسات والخنادق وتجهيز الموقع وفق أعلى معايير السلامة.",
          image: "/images/service-excavation.png",
        },
        {
          num: "03",
          key: "infrastructure",
          title: "البنية التحتية",
          text: "تنفيذ شبكات الطرق والمياه والصرف الصحي والكهرباء والاتصالات والمرافق.",
          image: "/images/service-infrastructure.png",
        },
        {
          num: "04",
          key: "concrete",
          title: "أعمال الخرسانة",
          text: "تنفيذ جميع أنواع الخرسانة المسلحة من الأساسات والقواعد والأعمدة والأسقف.",
          image: "/images/service-concrete.png",
        },
        {
          num: "05",
          key: "steel",
          title: "الهياكل المعدنية",
          text: "تصميم وتنفيذ وتركيب الهياكل المعدنية للمنشآت التجارية والصناعية.",
          image: "/images/service-steel.png",
        },
        {
          num: "06",
          key: "mep",
          title: "الأعمال الكهروميكانيكية",
          text: "تنفيذ جميع أعمال الميكانيكا والكهرباء والسباكة وأنظمة التبريد والتكييف والتهوية.",
          image: "/images/service-mep.png",
        },
        {
          num: "07",
          key: "finishing",
          title: "أعمال التشطيبات",
          text: "أعمال التشطيبات الداخلية والخارجية بأعلى مستويات الدقة والجودة.",
          image: "/images/service-finishing.png",
        },
        {
          num: "08",
          key: "insulation",
          title: "أعمال العزل",
          text: "حلول عزل ومقاومة مياه متكاملة تحمي المباني من الرطوبة والحرارة.",
          image: "/images/service-insulation.png",
        },
      ],
    },
    process: {
      kicker: "منهجية التنفيذ",
      title: "رحلة متكاملة من بداية الفكرة حتى التسليم. ",
      sub: "ثماني مراحل منظمة تحافظ على كل مشروع ضمن النطاق والميزانية والوقت المحدد.",
      steps: [
        {
          num: "01",
          title: "استشارة المشروع",
          text: "فهم الأهداف والنطاق والقيود.",
        },
        { num: "02", title: "مسح الموقع", text: "الفحص والتقييم الجيوتقني." },
        {
          num: "03",
          title: "التخطيط والهندسة",
          text: "إعداد التصاميم التفصيلية ومنهجيات التنفيذ.",
        },
        {
          num: "04",
          title: "العرض والاعتماد",
          text: "شفافية مطلقة في التكاليف، الجدول الزمني، ونطاق العمل.",
        },
        { num: "05", title: "التنفيذ", text: "تنفيذ دقيق وآمن ومنسق." },
        {
          num: "06",
          title: "ضبط الجودة",
          text: "رقابة مستمرة وتأكيد لمطابقة أحدث معايير الجودة.",
        },
        {
          num: "07",
          title: "الاختبار والتشغيل",
          text: "التحقق من الأنظمة واعتمادها.",
        },
        {
          num: "08",
          title: "تسليم المشروع",
          text: "تسليم مكتمل وموثّق وفق الجدول الزمني المحدد.",
        },
      ],
    },
    projects: {
      kicker: "أعمالنا",
      title: "التميز المعماري والإنشائي في الميدان",
      sub: "نظرة عن قرب على التخصصات الهندسية ومعايير التنفيذ التي تقف خلف كل مشروع تنفذه جيو دريل.",
    },
    clients: {
      kicker: "عملاؤنا",
      title: "موضع ثقة كبرى المؤسسات",
      sub: "نتشارك مع الجهات الحكومية وكبرى المؤسسات الخاصة في جميع أنحاء المملكة.",
      list: clients,
    },
    blog: {
      kicker: "الرؤى والتحديثات",
      title: "من قلب الميدان",
      sub: "نشارككم رؤى وتجارب عملية من واقع مشاريعنا، إلى جانب أحدث المستجدات في قطاع الإنشاءات والهندسة، لنقدم محتوى يثري المعرفة ويسلط الضوء على أفضل الممارسات في التنفيذ وتسليم مشاريع تدوم.",
      viewAll: "عرض جميع المقالات",
      empty: "ترقبوا رؤى جديدة قريبًا.",
    },
    faq: {
      kicker: "الأسئلة الشائعة",
      title: "إجابات واضحة تساعدك على اتخاذ القرار بثقة",
      sub: "نجيب هنا عن أبرز الأسئلة والاستفسارات التي يطرحها عملاؤنا قبل وأثناء بدء مشاريعهم، لمساعدتك على فهم خطوات العمل ومتطلبات المشروع بشكل أوضح.",
      viewAll: "عرض جميع الأسئلة",
      sideTitle: "لم تجد إجابة سؤالك؟",
      sideBody: "فريق جيو دريل جاهز للإجابة عن استفساراتك ومساعدتك في معرفة الخطوات المناسبة لمشروعك.",
      sideCta: "تواصل معنا",
    },
    certs: {
      kicker: "الشهادات والاعتمادات الرسمية",
      title: "معايير موثوقة للتميز والجودة",
      line: "حاصلون على اعتمادات دولية ومحلية لضمان أعلى معايير الجودة، الصحة والسلامة المهنية، والامتثال البيئي في جميع مشاريعنا.",
      items: [
        { code: "آيزو 9001:2015", name: "إدارة الجودة" },
        { code: "آيزو 45001:2018", name: "الصحة والسلامة المهنية" },
        { code: "آيزو 14001:2015", name: "الإدارة البيئية" },
      ],
      extra: [],
    },
    contact: {
      kicker: "تواصل معنا",
      title: "لنبنِ شيئًا يدوم",
      sub: "أخبرنا عن مشروعك وسيتواصل معك فريقنا في أقرب وقت.",
      form: {
        name: "الاسم الكامل",
        entityLabel: "أنا",
        entityIndividual: "فرد",
        entityCompany: "شركة",
        companyName: "اسم الشركة",
        email: "البريد الإلكتروني",
        phone: "رقم الهاتف",
        projectDescription: "تفاصيل المشروع",
        subject: "الموضوع",
        message: "رسالتك",
        send: "إرسال الرسالة",
        sending: "جارٍ الإرسال\u2026",
        sent: "شكرًا لك — سنتواصل معك قريبًا.",
        attachment: "إرفاق ملف (اختياري)",
        attachmentHint: "صورة أو PDF أو Word — بحد أقصى 10 ميجابايت.",
      },
      infoTitle: "بيانات التواصل",
      address:
        "طريق الأمير سعد بن عبدالرحمن الأول، حي الروابي، الرياض 14253، المملكة العربية السعودية ",
      phoneLabel: "+966 59 694 5051",
      emailLabel: "contracting@geodrillksa.com",
      whatsapp: "https://wa.me/966596945051",
    },
    footer: {
      tagline: "قوة في التنفيذ. دقة في الإنجاز.",
      quickLinks: "روابط سريعة",
      servicesTitle: "الخدمات",
      sectorsTitle: "القطاعات",
      contactTitle: "تواصل",
      rights: "جيو دريل خبراء الإنشاء. جميع الحقوق محفوظة.",
      group: "جزء من مجموعة جيو دريل",
      home: "الرئيسية",
      aboutPage: "من نحن",
      servicesPage: "خدماتنا",
      projectsPage: "مشاريعنا",
      contactPage: "تواصل معنا",
      followLabel: "تابعنا",
      locationsTitle: "موقعنا",
      social: {
        instagram:
          "https://www.instagram.com/geodrill.contracting?utm_source=qr",
        x: "https://x.com/geodrillconst?s=11",
        linkedin: "https://www.linkedin.com/company/geodrillksa/home/",
        facebook: "https://www.facebook.com/geodrillksa",
      },
    },
    page: {
      about: {
        kicker: "عن جيو دريل",
        title: "شريك موثوق للتميز في البناء والهندسة",
        sub: "تجمع جيو دريل خبراء الإنشاء بين عمق الخبرة الجيوتقنية وقدرة كاملة على التعاقد العام لتسليم مشاريع موثوقة وعالية الجودة في جميع أنحاء المملكة.",
        image: "/images/sector-industrial.png",
      },
      services: {
        kicker: "قدراتنا",
        title: "خدمات متكاملة من أعمال التربة حتى التشطيبات",
        sub: "طيف كامل من التخصصات الإنشائية تحت سقف واحد، تنفَّذ بجودة وسلامة ودقة معتمدة.",
        image: "/images/service-concrete.png",
      },
      projects: {
        kicker: "أعمالنا",
        title: "مشاريع مختارة تتحدث عنا",
        sub: "نظرة شاملة على أعمال التربة والهياكل والكهروميكانيكا والتشطيبات في مواقع نشطة في جميع أنحاء المملكة.",
        image: "/images/project-warehouse.png",
      },
      contact: {
        kicker: "تواصل معنا",
        title: "لنبنِ شيئًا يدوم",
        sub: "أخبرنا عن مشروعك وسيتواصل معك فريقنا في أقرب وقت.",
        image: "/images/skyline.png",
      },
    },
  },
};
