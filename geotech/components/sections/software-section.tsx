"use client";

import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { useLanguage } from "@/geotech/components/providers/language-provider";
import { SectionHeading } from "@/geotech/components/section-heading";
import Link from "next/link";

// Flat list of software names for the logo-tile grid.
// Each name maps to /images/software/<slug>.png — see note below component.
const softwareList = [
  "RocScience",
  "GMS",
  "PHREEQC",
  "T2",
  "RAS",
  "Groundwater Vistas",
  "ArcGIS",
  "Slope",
  "SLOPE/W",
  "Surfer",
  "Oasis Montaj",
  "RES2DINV",
  "GEO5",
  "AutoCAD",
  "REFLEXW",
  "GPR-SLICE",
  "gINT / Strater",
  "Talren",
  "GeoStudio",
  "Ensoft",
  "ETABS",
  "AllPile",
  "PDA",
  "DeepEX",
  "Settle3",
  "PLAXIS",
];

const certifications = [
  {
    code: "ISO",
    number: "9001:2015",
    label: "Quality Management Systems",
    labelAr: "أنظمة إدارة الجودة",
  },
  {
    code: "ISO",
    number: "45001:2018",
    label: "Occupational Health & Safety Management",
    labelAr: "إدارة الصحة والسلامة المهنية",
  },
  {
    code: "ISO",
    number: "14001:2015",
    label: "Environmental Management Systems",
    labelAr: "أنظمة الإدارة البيئية",
  },
];

function slugify(name: string) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function SoftwareSection() {
  const { dict, locale } = useLanguage();
  if (!dict?.software) return null;

  const isArabic = locale === "ar";

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.04,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section className="relative overflow-hidden py-20 sm:py-28 md:py-32 border-b border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={
            isArabic
              ? "البرامج والأدوات التي نستخدمها"
              : "Software & Tools We Use"
          }
          title={dict.software.title}
          subtitle={dict.software.subtitle}
          align="center"
          className="mb-16"
        />

        {/* Logo tile grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-3 gap-3 sm:grid-cols-4 sm:gap-4 lg:grid-cols-6"
        >
          {softwareList.map((name, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              className="group flex h-20 items-center justify-center rounded-lg border border-border/40 bg-surface/50 p-3 hover:border-primary/40 hover:bg-surface/80 transition-all"
            >
              {/*
                PHOTO/LOGO NEEDED: software/${slugify(name)}.png
                Small transparent-background PNG or SVG logo for "{name}".
                Roughly 160x60px, centered, transparent bg preferred.
              */}
              <img
                src={`/images/software/${slugify(name)}.png`}
                alt={name}
                className="max-h-8 max-w-full object-contain grayscale group-hover:grayscale-0 transition-all"
                onError={(e) => {
                  // Fallback to text label if logo image is missing
                  const target = e.currentTarget;
                  target.style.display = "none";
                  const fallback = target.nextElementSibling as HTMLElement;
                  if (fallback) fallback.style.display = "block";
                }}
              />
              <span className="hidden text-center text-xs font-medium text-muted-foreground">
                {name}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* Certifications banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="mt-16 rounded-xl bg-[#0b1220] p-8 sm:p-10"
        >
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-start gap-4 lg:max-w-sm">
              <span className="mt-1 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary/20 text-primary">
                <ShieldCheck className="h-5 w-5" />
              </span>
              <div>
                <span className="mb-2 inline-block font-mono text-xs uppercase tracking-widest text-primary">
                  {isArabic
                    ? "الشهادات والاعتمادات"
                    : "Certifications & Accreditations"}
                </span>
                <h3 className="mb-2 mt-3 text-xl font-bold text-white sm:text-2xl">
                  {isArabic
                    ? "جودة يمكنك الاعتماد عليها"
                    : "Quality You Can Rely On"}
                </h3>
                <p className="text-sm leading-relaxed text-white/60">
                  {isArabic
                    ? "نلتزم بأعلى معايير الجودة والصحة والسلامة والبيئة."
                    : "We are committed to the highest standards of quality, health, safety and environment."}
                </p>
                <Link
                  href={`/geotechnical/${locale}/qhse`}
                  className="group/link mt-4 inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/85 hover:shadow-lg hover:shadow-primary/30"
                >
                  {isArabic
                    ? "تعرف على معايير الجودة"
                    : "Explore Our QHSE Standards"}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover/link:translate-x-1 rtl:rotate-180 rtl:group-hover/link:-translate-x-1" />
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 sm:gap-4">
              {certifications.map((cert, i) => (
                <div
                  key={i}
                  className="group/iso flex flex-col items-center justify-center rounded-lg border border-primary/40 bg-[#0b1220] p-4 text-center transition-all duration-300 hover:border-primary hover:bg-primary hover:shadow-lg hover:shadow-primary/30 sm:p-5"
                >
                  <span className="text-base font-extrabold tracking-tight text-primary transition-colors group-hover/iso:text-[#0b1220] sm:text-lg">
                    {cert.code}
                  </span>
                  <span className="text-xs font-semibold text-white transition-colors group-hover/iso:text-[#0b1220] sm:text-sm">
                    {cert.number}
                  </span>
                  <span className="mt-1 text-[10px] leading-tight text-white/60 transition-colors group-hover/iso:text-[#0b1220]/80 sm:text-xs">
                    {isArabic ? cert.labelAr : cert.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
