"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShieldCheck,
  HeartPulse,
  Leaf,
  Award,
  CheckCircle2,
  Eye,
  X,
  Sparkles,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import Image from "next/image";
import { useLanguage } from "@/geotech/components/providers/language-provider";
import { cn } from "@/geotech/lib/utils";

interface Certificate {
  id: string;
  code: string;
  title: { en: string; ar: string };
  category: "quality" | "environment" | "safety";
  image: string;
  badgeColor: string;
}

const certificates: Certificate[] = [
  {
    id: "iso-9001",
    code: "ISO 9001:2015",
    title: {
      en: "Quality Management System",
      ar: "نظام إدارة الجودة",
    },
    category: "quality",
    image: "/images/certificates/9001-1.webp",
    badgeColor: "border-amber-500/30 bg-amber-500/10 text-amber-500",
  },
  {
    id: "iso-14001",
    code: "ISO 14001:2015",
    title: {
      en: "Environmental Management System",
      ar: "نظام الإدارة البيئية",
    },
    category: "environment",
    image: "/images/certificates/14001-1.webp",
    badgeColor: "border-emerald-500/30 bg-emerald-500/10 text-emerald-500",
  },
  {
    id: "iso-45001",
    code: "ISO 45001:2018",
    title: {
      en: "Occupational Health & Safety Management",
      ar: "نظام إدارة الصحة والسلامة المهنية",
    },
    category: "safety",
    image: "/images/certificates/45001-1.webp",
    badgeColor: "border-blue-500/30 bg-blue-500/10 text-blue-500",
  },
];

const contentData = {
  en: {
    tag: "INTERNATIONAL CERTIFICATIONS",
    title: "ISO-Certified Management Systems",
    description:
      "GEODRILL maintains certified management systems for quality, environmental management, and occupational health and safety.",
    expandCert: "Expand Certificate",
    tabs: {
      safety: "Health & Safety Policy",
      quality: "Quality Policy",
      environment: "Environmental Commitment",
    },
    policyGovernance: {
      title: "Policy Governance",
      items: [
        "The policy is reviewed annually or whenever required by the GEODRILL Senior Management Team.",
        "The policy is communicated to employees during induction.",
        "Employees are briefed following any policy changes.",
      ],
    },
    safety: {
      title: "Health & Safety Governance",
      desc: "GEODRILL is committed to working in a way that protects the health, safety, and welfare of its employees and others affected by its activities. As a minimum, the company complies with applicable legislation and continually seeks to improve its performance. Health and safety will never be compromised for other objectives.",
      mgmtCommitmentsTitle: "Management Commitments",
      mgmtCommitments: [
        "Provision and maintenance of a safe working environment.",
        "Safe systems of work.",
        "Facilities for the welfare of workers.",
        "Information, instruction, training, and supervision reasonably necessary to ensure worker safety.",
        "Protection of each worker from injury and risks to health.",
        "Continual improvement of performance through effective safety management.",
      ],
      workerObligationsTitle: "Worker Responsibilities",
      workerObligations: [
        "Comply with safe work practices to avoid injury to themselves and others and damage to plant and equipment.",
        "Take reasonable care of their own health and safety and that of others.",
        "Wear personal protective equipment and clothing where necessary.",
        "Comply with any direction given by management concerning health and safety.",
        "Not misuse or interfere with anything provided for health and safety.",
        "Report all accidents and incidents on the job immediately, no matter how trivial.",
      ],
    },
    quality: {
      title: "Quality Management Framework",
      desc: "GEODRILL is committed to providing quality work that meets project standards and specifications for materials, workmanship, tolerances, schedules, and public service while maintaining profitability and competitiveness. The company is committed to continual improvement through quality processes directed by a strong management team.",
      isoNote:
        "This Quality Policy complies with the requirements of BS EN ISO 9001:2015.",
      objectivesTitle: "Quality Objectives",
      objectives: [
        "Provide exceptional service and reliability.",
        "Provide quality workmanship through committed and trained personnel.",
        "Provide value for money using only suitable quality materials.",
        "Satisfy the requirements of clients, industry regulators, and staff.",
        "Provide services in a professional and ethically responsible manner.",
      ],
      employeeResponsibilitiesTitle: "Employee Responsibilities",
      employeeResponsibilities: [
        "Understand and deliver the client's explicit requirements accurately and completely.",
        "Take personal accountability and responsibility for work quality.",
        "Adopt a collaborative approach when dealing with clients, supply-chain partners, and stakeholders.",
      ],
    },
    environment: {
      title: "Environmental Management",
      desc: "GEODRILL is committed to environmental responsibility and maintains ISO 14001:2015 certification as part of its commitment to environmental management.",
      cards: [
        {
          title: "ISO 14001:2015",
          desc: "Certified environmental management system supporting GEODRILL's commitment to responsible environmental practices.",
        },
        {
          title: "Environmental Responsibility",
          desc: "GEODRILL recognizes its responsibility toward its employees, the community, and the environment.",
        },
        {
          title: "Certified Management System",
          desc: "Environmental management is supported by a formal ISO 14001:2015 management system.",
        },
      ],
    },
  },
  ar: {
    tag: "الشهادات الدولية",
    title: "أنظمة إدارة معتمدة وفق ISO",
    description:
      "تحتفظ GEODRILL بأنظمة إدارة معتمدة للجودة والإدارة البيئية والصحة والسلامة المهنية.",
    expandCert: "تكبير الشهادة",
    tabs: {
      safety: "سياسة الصحة والسلامة",
      quality: "سياسة الجودة",
      environment: "الالتزام البيئي",
    },
    policyGovernance: {
      title: "حوكمة السياسات",
      items: [
        "تتم مراجعة السياسة سنويًا أو عند الحاجة من قبل الإدارة العليا في GEODRILL.",
        "يتم تعريف جميع الموظفين بالسياسة عند الانضمام إلى الشركة.",
        "يتم إبلاغ الموظفين بأي تعديلات تطرأ على السياسة.",
      ],
    },
    safety: {
      title: "حوكـمة الصحة والسلامة",
      desc: "تلتزم GEODRILL بتبني أسلوب عمل يحمي الصحة والسلامة ورفاهية موظفيها وكل من يتأثر بأنشطتها، وتراعي كحد أدنى التشريعات المعمول بها وتسعى باستمرار لتحسين أدائها. لن تُضَحَّ الصحة والسلامة أبدًا مقابل أي أهداف أخرى.",
      scope:
        "تنطبق هذه السياسة على جميع عمليات وأنشطة الشركة، بما في ذلك الحالات التي يُطلب فيها من العاملين تنفيذ مهام خارج مواقع الشركة.",
      mgmtCommitmentsTitle: "التزامات الإدارة العليا",
      mgmtCommitments: [
        "توفير والحفاظ على بيئة عمل آمنة.",
        "توفير أنظمة عمل آمنة.",
        "توفير مرافق تضمن رفاهية العاملين.",
        "تقديم المعلومات والتعليمات والتدريب والإشراف اللازم بشكل معقول لضمان سلامة العاملين.",
        "حماية كل عامل من الإصابات والمخاطر الصحية.",
        "الالتزام بالتحسين المستمر في الأداء من خلال إدارة فعّالة للسلامة.",
      ],
      workerObligationsTitle: "مسؤوليات والتزامات العاملين",
      workerObligations: [
        "الالتزام بممارسات العمل الآمن لتجنب إلحاق الضرر بأنفسهم وبالآخرين وبالمعدات.",
        "العناية المعقولة بصحتهم وسلامتهم وسلامة الآخرين.",
        "ارتداء معدات الوقاية الشخصية والملابس الواقية عند الحاجة.",
        "الالتزام بأي تعليمات تصدرها الإدارة بخصوص الصحة والسلامة.",
        "عدم إساءة استخدام أو العبث بأي وسيلة مخصصة للصحة والسلامة.",
        "الإبلاغ الفوري عن جميع الحوادث والإصابات في موقع العمل مهما كانت بسيطة.",
      ],
    },
    quality: {
      title: "إطار إدارة الجودة",
      desc: "تلتزم شركة GEODRILL بتقديم أعمال عالية الجودة تلبي معايير ومواصفات المشاريع من حيث المواد، وجودة التنفيذ، والتفاوتات المسموح بها، والجداول الزمنية، والخدمة العامة، مع المحافظة على الربحية والقدرة التنافسية. وتلتزم الشركة بالتحسين المستمر من خلال إجراءات الجودة التي يوجهها فريق إداري قوي.",
      isoNote:
        "يتوافق بيان سياسة الجودة مع متطلبات المواصفة BS EN ISO 9001:2015.",
      objectivesTitle: "أهداف الجودة",
      objectives: [
        "تقديم خدمة متميزة وموثوقة.",
        "تقديم أعمال عالية الجودة بواسطة كوادر ملتزمة ومدربة.",
        "تحقيق قيمة مقابل المال باستخدام مواد مناسبة وذات جودة ملائمة فقط.",
        "تلبية متطلبات العملاء والجهات التنظيمية في القطاع والموظفين.",
        "تقديم الخدمات بطريقة مهنية ومتسمة بالمسؤولية الأخلاقية.",
      ],
      employeeResponsibilitiesTitle: "التزامات الموظفين تجاه الجودة",
      employeeResponsibilities: [
        "فهم وتنفيذ متطلبات العميل الصريحة بدقة وشمول.",
        "تحمل المسؤولية والمساءلة الفردية عن جودة العمل.",
        "تبني نهج تعاوني عند التعامل مع العملاء وشركاء سلاسل الإمداد وأصحاب المصلحة.",
      ],
    },
    environment: {
      title: "الإدارة البيئية",
      desc: "تلتزم GEODRILL بالمسؤولية البيئية وتحافظ على شهادة ISO 14001:2015 في إطار التزامها بالإدارة البيئية.",
      cards: [
        {
          title: "ISO 14001:2015",
          desc: "نظام إدارة بيئي معتمد يدعم التزام GEODRILL بالممارسات البيئية المسؤولة.",
        },
        {
          title: "المسؤولية البيئية",
          desc: "تدرك GEODRILL مسؤوليتها تجاه موظفيها والمجتمع والبيئة.",
        },
        {
          title: "نظام إدارة معتمد",
          desc: "تُدار الجوانب البيئية من خلال نظام إدارة بيئية رسمي وفق ISO 14001:2015.",
        },
      ],
    },
  },
};

// Reusable animated list item
const listItemVariants = {
  hidden: { opacity: 0, x: -12, y: 8 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    y: 0,
    transition: {
      delay: i * 0.06,
      duration: 0.35,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

function PolicyListItem({
  children,
  index,
  variant = "check",
}: {
  children: React.ReactNode;
  index: number;
  variant?: "check" | "number";
}) {
  return (
    <motion.div
      custom={index}
      variants={listItemVariants}
      initial="hidden"
      animate="visible"
      whileHover={{
        y: -3,
        scale: 1.01,
        transition: { duration: 0.2, ease: "easeOut" },
      }}
      className={cn(
        "group relative flex items-start gap-3.5 overflow-hidden rounded-xl border border-border/50 bg-surface/60 p-4",
        "transition-all duration-300",
        "hover:border-primary/40 hover:bg-surface/90 hover:shadow-lg hover:shadow-primary/5",
      )}
    >
      {/* subtle left accent bar that appears on hover */}
      <span className="absolute inset-y-0 left-0 w-1 origin-left scale-y-0 rounded-r bg-primary transition-transform duration-300 group-hover:scale-y-100" />

      {variant === "number" ? (
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10 font-mono text-xs font-bold text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground group-hover:scale-110">
          {String(index + 1).padStart(2, "0")}
        </span>
      ) : (
        <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary transition-all duration-300 group-hover:scale-110 group-hover:text-primary" />
      )}

      <p className="text-sm leading-relaxed text-foreground/90 transition-colors duration-300 group-hover:text-foreground">
        {children}
      </p>
    </motion.div>
  );
}

export function QhseEnhanced() {
  const { locale } = useLanguage();
  const isAr = locale === "ar";
  const t = isAr ? contentData.ar : contentData.en;

  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);
  const [activeTab, setActiveTab] = useState<
    "safety" | "quality" | "environment"
  >("safety");

  const ChevronIcon = isAr ? ChevronLeft : ChevronRight;

  return (
    <div className="space-y-24" dir={isAr ? "rtl" : "ltr"}>
      {/* ISO Accreditation Showcase */}
      <section className="relative">
        <div className="mb-12 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 font-mono text-xs font-semibold text-primary">
            <Sparkles className="h-3.5 w-3.5" />
            <span>{t.tag}</span>
          </div>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {t.title}
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-base text-muted-foreground">
            {t.description}
          </p>
        </div>

        {/* Certificate Cards */}
        <div className="grid gap-6 md:grid-cols-3">
          {certificates.map((cert) => (
            <motion.div
              key={cert.id}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.3 }}
              className="group relative flex flex-col justify-between overflow-hidden rounded-xl border border-border/80 bg-surface/50 p-6 backdrop-blur-sm transition-all hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/5"
            >
              <div>
                <div className="flex items-center justify-between gap-4">
                  <span
                    className={cn(
                      "inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1 text-xs font-mono font-semibold",
                      cert.badgeColor,
                    )}
                  >
                    <Award className="h-3.5 w-3.5" />
                    {cert.code}
                  </span>
                  <button
                    onClick={() => setSelectedCert(cert)}
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-border bg-background/80 text-muted-foreground opacity-0 transition-opacity hover:text-primary group-hover:opacity-100"
                    aria-label={`View ${cert.code} Certificate`}
                  >
                    <Eye className="h-4 w-4" />
                  </button>
                </div>

                <h3 className="mt-5 text-xl font-bold text-foreground">
                  {cert.title[locale as "en" | "ar"]}
                </h3>
              </div>

              {/* Certificate Image Preview Box */}
              <div
                onClick={() => setSelectedCert(cert)}
                className="group/img relative mt-6 aspect-[3/4] w-full cursor-pointer overflow-hidden rounded-lg border border-border/60 bg-black/40"
              >
                <Image
                  src={cert.image}
                  alt={cert.title[locale as "en" | "ar"]}
                  fill
                  className="object-cover object-top transition-transform duration-500 group-hover/img:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 transition-opacity group-hover/img:opacity-40" />
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 backdrop-blur-[2px] transition-opacity group-hover/img:opacity-100">
                  <span className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 font-mono text-xs font-bold text-primary-foreground shadow-lg">
                    <Eye className="h-4 w-4" /> {t.expandCert}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Policy Navigation Tabs */}
      <section className="rounded-2xl border border-border/80 bg-surface/30 p-6 backdrop-blur-md md:p-10">
        <div className="flex flex-wrap items-center justify-center gap-3 border-b border-border/60 pb-8">
          <button
            onClick={() => setActiveTab("safety")}
            className={cn(
              "flex items-center gap-2.5 rounded-lg px-6 py-3 text-sm font-semibold transition-all outline-none",
              activeTab === "safety"
                ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                : "bg-surface/80 text-muted-foreground hover:bg-surface hover:text-foreground",
            )}
          >
            <HeartPulse className="h-4 w-4" />
            <span>{t.tabs.safety}</span>
          </button>
          <button
            onClick={() => setActiveTab("quality")}
            className={cn(
              "flex items-center gap-2.5 rounded-lg px-6 py-3 text-sm font-semibold transition-all outline-none",
              activeTab === "quality"
                ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                : "bg-surface/80 text-muted-foreground hover:bg-surface hover:text-foreground",
            )}
          >
            <ShieldCheck className="h-4 w-4" />
            <span>{t.tabs.quality}</span>
          </button>
          <button
            onClick={() => setActiveTab("environment")}
            className={cn(
              "flex items-center gap-2.5 rounded-lg px-6 py-3 text-sm font-semibold transition-all outline-none",
              activeTab === "environment"
                ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                : "bg-surface/80 text-muted-foreground hover:bg-surface hover:text-foreground",
            )}
          >
            <Leaf className="h-4 w-4" />
            <span>{t.tabs.environment}</span>
          </button>
        </div>

        {/* Tab Content Panels */}
        <div className="mt-8">
          <AnimatePresence mode="wait">
            {activeTab === "safety" && (
              <motion.div
                key="safety"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3 }}
                className="space-y-12"
              >
                <div className="max-w-3xl">
                  <h3 className="text-2xl font-bold text-foreground">
                    {t.safety.title}
                  </h3>
                  <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                    {t.safety.desc}
                  </p>
                </div>

                <div className="grid gap-10 lg:grid-cols-2">
                  {/* Management Commitments */}
                  <div className="space-y-4">
                    <h4 className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-primary">
                      <ChevronIcon className="h-4 w-4" />
                      {t.safety.mgmtCommitmentsTitle}
                    </h4>
                    <div className="space-y-3">
                      {t.safety.mgmtCommitments.map((item, i) => (
                        <PolicyListItem key={i} index={i} variant="number">
                          {item}
                        </PolicyListItem>
                      ))}
                    </div>
                  </div>

                  {/* Worker Obligations */}
                  <div className="space-y-4">
                    <h4 className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-primary">
                      <ChevronIcon className="h-4 w-4" />
                      {t.safety.workerObligationsTitle}
                    </h4>
                    <div className="space-y-3">
                      {t.safety.workerObligations.map((item, i) => (
                        <PolicyListItem key={i} index={i} variant="check">
                          {item}
                        </PolicyListItem>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Policy Scope */}
                {t.safety.scope && (
                  <div className="rounded-xl border border-primary/25 bg-primary/5 p-5">
                    <h4 className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-primary">
                      <Eye className="h-4 w-4" />
                      {isAr ? "نطاق السياسة" : "Policy Scope"}
                    </h4>
                    <p className="mt-3 text-sm leading-relaxed text-foreground/90">
                      {t.safety.scope}
                    </p>
                  </div>
                )}
              </motion.div>
            )}

            {activeTab === "quality" && (
              <motion.div
                key="quality"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3 }}
                className="space-y-12"
              >
                <div className="max-w-3xl">
                  <h3 className="text-2xl font-bold text-foreground">
                    {t.quality.title}
                  </h3>
                  <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                    {t.quality.desc}
                  </p>
                </div>

                <div className="grid gap-10 lg:grid-cols-2">
                  {/* Quality Objectives */}
                  <div className="space-y-4">
                    <h4 className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-primary">
                      <ChevronIcon className="h-4 w-4" />
                      {t.quality.objectivesTitle}
                    </h4>
                    <div className="space-y-3">
                      {t.quality.objectives.map((item, i) => (
                        <PolicyListItem key={i} index={i} variant="check">
                          {item}
                        </PolicyListItem>
                      ))}
                    </div>
                  </div>

                  {/* Employee Responsibilities */}
                  <div className="space-y-4">
                    <h4 className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-primary">
                      <ChevronIcon className="h-4 w-4" />
                      {t.quality.employeeResponsibilitiesTitle}
                    </h4>
                    <div className="space-y-3">
                      {t.quality.employeeResponsibilities.map((item, i) => (
                        <PolicyListItem key={i} index={i} variant="number">
                          {item}
                        </PolicyListItem>
                      ))}
                    </div>
                  </div>
                </div>

                {/* ISO compliance note */}
                {t.quality.isoNote && (
                  <div className="rounded-xl border border-primary/25 bg-primary/5 p-5">
                    <p className="flex items-start gap-2.5 text-sm leading-relaxed text-foreground/90">
                      <Award className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                      {t.quality.isoNote}
                    </p>
                  </div>
                )}

                {/* Policy Governance */}
                <div className="space-y-4">
                  <h4 className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-primary">
                    <Eye className="h-4 w-4" />
                    {t.policyGovernance.title}
                  </h4>
                  <div className="space-y-3">
                    {t.policyGovernance.items.map((item, i) => (
                      <PolicyListItem key={i} index={i} variant="check">
                        {item}
                      </PolicyListItem>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "environment" && (
              <motion.div
                key="environment"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3 }}
                className="space-y-8"
              >
                <div className="max-w-3xl">
                  <h3 className="text-2xl font-bold text-foreground">
                    {t.environment.title}
                  </h3>
                  <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                    {t.environment.desc}
                  </p>
                </div>

                <div className="grid gap-6 sm:grid-cols-3">
                  {t.environment.cards.map((card, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        delay: idx * 0.1,
                        duration: 0.4,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      whileHover={{
                        y: -6,
                        transition: { duration: 0.25 },
                      }}
                      className={cn(
                        "group relative overflow-hidden rounded-xl border border-border/60 bg-surface/60 p-6",
                        "transition-all duration-300",
                        "hover:border-emerald-500/40 hover:bg-surface/90 hover:shadow-xl hover:shadow-emerald-500/10",
                      )}
                    >
                      {/* hover glow */}
                      <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-emerald-500/10 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />

                      {idx === 0 && (
                        <Leaf className="mb-4 h-8 w-8 text-emerald-500 transition-transform duration-300 group-hover:scale-110" />
                      )}
                      {idx === 1 && (
                        <ShieldCheck className="mb-4 h-8 w-8 text-emerald-500 transition-transform duration-300 group-hover:scale-110" />
                      )}
                      {idx === 2 && (
                        <Sparkles className="mb-4 h-8 w-8 text-emerald-500 transition-transform duration-300 group-hover:scale-110" />
                      )}
                      <h4 className="text-base font-bold text-foreground transition-colors group-hover:text-emerald-400">
                        {card.title}
                      </h4>
                      <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                        {card.desc}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Certificate Modal Lightbox */}
      <AnimatePresence>
        {selectedCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedCert(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-h-[90vh] max-w-2xl overflow-hidden rounded-2xl border border-border bg-background p-2 shadow-2xl"
            >
              <button
                onClick={() => setSelectedCert(null)}
                className="absolute top-4 right-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-md transition-all hover:bg-primary hover:text-black"
                aria-label="Close Preview"
              >
                <X className="h-5 w-5" />
              </button>
              <div className="relative aspect-[3/4] w-full min-w-[320px] sm:min-w-[480px]">
                <Image
                  src={selectedCert.image}
                  alt={selectedCert.title[locale as "en" | "ar"]}
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
