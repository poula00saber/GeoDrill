"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import {
  ServiceContent,
  servicesData,
  serviceCategories,
  type ServiceCategory,
} from "@/geotech/lib/services-data";
import { Button } from "@/geotech/components/ui/button";
import { TechnicalBadge } from "@/geotech/components/technical-badge";
import { SectionHeading } from "@/geotech/components/section-heading";
import { serviceVisuals } from "@/geotech/components/service-visuals-map";
import { getLocalizedServiceItem } from "@/geotech/lib/services-page-i18n";
import { GoldGradientBand } from "@/geotech/components/sections/gold-gradient-band";
import {
  CapabilityVisualizer,
  STRUCTURAL_ASSESSMENT_CAPABILITIES,
} from "@/geotech/components/sections/capability-visualizer";
import { CapabilitiesGrid } from "@/geotech/components/sections/capabilities-grid";
import { ServicePager } from "@/geotech/components/sections/service-pager";
import { serviceShowcaseConfig } from "@/geotech/lib/service-showcase-data";

interface ServicePageTemplateProps {
  service: ServiceContent;
  locale?: string;
  /** All services in the order they should appear in the bottom pager. */
  allServices?: ServiceContent[];
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

export function ServicePageTemplate({
  service,
  locale = "en",
  allServices,
}: ServicePageTemplateProps) {
  const baseHref = `/geotechnical/${locale}`;
  const ServiceVisual = serviceVisuals[service.slug];
  const isArabic = locale === "ar";

  // Build the canonical services list for the bottom pager. Falls back to
  // `servicesData` if the parent didn't pass `allServices` explicitly.
  const pagerServices: ServiceContent[] =
    allServices ??
    (Object.keys(serviceCategories) as ServiceCategory[]).flatMap((cat) =>
      serviceCategories[cat].map((slug) => servicesData[slug]),
    );
  const labels = isArabic
    ? {
        standards: "المعايير والأطر",
        process: "المنهجية",
        howWeWork: "كيف نعمل",
        capabilities: "القدرات",
        whatWeDeliver: "ما نقدمه",
        gallery: "معرض الصور",
        inAction: "في الميدان",
        explore: "استكشف",
        related: "خدمات ذات صلة",
        learnMore: "اعرف المزيد",
        ctaTitle: "هل أنت مستعد لمناقشة مشروعك؟",
        ctaDescription:
          "خبراؤنا مستعدون لتقديم الاستشارة والدعم الفني لاحتياجاتك الخاصة.",
        getInTouch: "تواصل معنا",
        allServices: "استكشف جميع الخدمات",
        relatedFallback: "خبرة فنية ذات صلة",
      }
    : {
        standards: "Standards & Frameworks",
        process: "Process",
        howWeWork: "How We Work",
        capabilities: "Capabilities",
        whatWeDeliver: "What We Deliver",
        gallery: "Gallery",
        inAction: "In Action",
        explore: "Explore",
        related: "Related Services",
        learnMore: "Learn more",
        ctaTitle: "Ready to discuss your project?",
        ctaDescription:
          "Our experts are ready to provide technical consultation and support for your specific needs.",
        getInTouch: "Get in Touch",
        allServices: "Explore All Services",
        relatedFallback: "Related technical expertise",
      };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full"
    >
      {/* Hero Banner */}
      <section className="relative min-h-[50vh] w-full overflow-hidden bg-gradient-to-b from-surface to-background pt-24">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0"
        >
          <Image
            src={service.heroImage}
            alt={service.heroAlt}
            fill
            className="object-cover"
            priority
            onError={(event) => {
              event.currentTarget.src = "/images/geotech-hero1.jpg";
            }}
          />
          {/* Gradient overlay for text legibility */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/50 to-black/15" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/60" />
        </motion.div>

        {/* Hero Content */}
        <div className="relative z-10 mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <motion.div variants={itemVariants} className="max-w-2xl">
            {/* Category badge */}
            <motion.div className="mb-6 inline-flex">
              <span className="rounded-full bg-primary/20 px-3 py-1 font-mono text-xs uppercase tracking-widest text-primary">
                {isArabic
                  ? {
                      Ground: "تحريات الأرض",
                      Testing: "اختبارات ومسوح",
                      Engineering: "هندسة الأرض",
                      Studies: "دراسات متخصصة",
                    }[service.category]
                  : service.category}
              </span>
            </motion.div>

            {/* Title */}
            <motion.h1
              variants={itemVariants}
              className="text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl"
            >
              {service.title}
            </motion.h1>

            {/* Short description */}
            <motion.p
              variants={itemVariants}
              className="mt-6 max-w-xl text-lg leading-relaxed text-gray-200"
            >
              {service.shortDescription}
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Centered gold-gradient band directly under the hero */}
      <GoldGradientBand
        eyebrow={isArabic ? labels.relatedFallback : "Service Overview"}
        title={service.title}
        description={service.shortDescription}
      />

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        {/* Overview Section */}
        <motion.section variants={itemVariants} className="mb-20">
          <div className="prose prose-invert max-w-none">
            {service.overview.map((paragraph, idx) => (
              <motion.p
                key={idx}
                variants={itemVariants}
                className="mb-4 max-w-3xl text-base leading-relaxed text-muted-foreground lg:text-lg"
              >
                {paragraph}
              </motion.p>
            ))}
          </div>
        </motion.section>

        {/* Standards Referenced */}
        {service.standardsReferenced &&
          service.standardsReferenced.length > 0 && (
            <motion.section variants={itemVariants} className="mb-20">
              <h2 className="mb-4 font-mono text-xs uppercase tracking-widest text-muted-foreground">
                {labels.standards}
              </h2>
              <div className="flex flex-wrap gap-2">
                {service.standardsReferenced.map((standard) => (
                  <TechnicalBadge key={standard}>{standard}</TechnicalBadge>
                ))}
              </div>
            </motion.section>
          )}

        {/* Process Steps */}
        {service.processSteps && service.processSteps.length > 0 && (
          <motion.section variants={itemVariants} className="mb-20">
            <SectionHeading eyebrow={labels.process} title={labels.howWeWork} />
            <div className="mt-12 grid gap-4">
              {service.processSteps.map((step, idx) => (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  className="relative flex gap-6 rounded-lg border border-border/70 bg-surface/40 p-5 lg:gap-8"
                >
                  {/* Step number */}
                  <div className="relative flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg border border-primary bg-primary/10 lg:h-14 lg:w-14">
                    <span className="font-mono text-sm font-bold text-primary lg:text-base">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="font-bold text-foreground lg:text-lg">
                      {step.label}
                    </h3>
                    {step.description && (
                      <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                        {step.description}
                      </p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}

        {/* Service-specific visual selected outside the content data. */}
        {ServiceVisual && (
          <motion.section variants={itemVariants} className="mb-20">
            <ServiceVisual />
          </motion.section>
        )}

        {/* Capabilities Section */}
        {service.slug !== "geophysical-survey" &&
          !serviceShowcaseConfig[service.slug] && (
            <motion.section variants={itemVariants} className="mb-20">
              {service.slug === "structural-assessment" ? (
                // Structural assessment already has its own rich interactive
                // capability visualizer (`CapabilityVisualizer`).
                <CapabilityVisualizer
                  eyebrow={labels.capabilities}
                  heading={labels.whatWeDeliver}
                  subheading={
                    isArabic
                      ? "ست قدرات إنشائية متكاملة، من الفحص الميداني إلى دعم التصميم، مصممة لتقييم سلامة المباني والمنشآت القائمة."
                      : "Six integrated structural capabilities — from field inspection to design support — built to evaluate the safety of existing buildings and facilities."
                  }
                  locale={isArabic ? "ar" : "en"}
                  items={
                    isArabic
                      ? STRUCTURAL_ASSESSMENT_CAPABILITIES.ar
                      : STRUCTURAL_ASSESSMENT_CAPABILITIES.en
                  }
                />
              ) : (
                <CapabilitiesGrid
                  capabilities={service.capabilities}
                  heroImage={service.heroImage}
                  eyebrow={labels.capabilities}
                  heading={labels.whatWeDeliver}
                  isArabic={isArabic}
                />
              )}
            </motion.section>
          )}

        {/* Gallery */}
        {service.gallery && service.gallery.length > 0 && (
          <motion.section variants={itemVariants} className="mb-20">
            <SectionHeading eyebrow={labels.gallery} title={labels.inAction} />

            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {service.gallery.map((image, idx) => (
                <motion.figure
                  key={idx}
                  variants={itemVariants}
                  className="overflow-hidden rounded-lg border border-border bg-surface transition-all hover:shadow-md hover:shadow-primary/10"
                >
                  <div className="relative aspect-video w-full overflow-hidden bg-muted">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      className="object-cover transition-transform duration-300 hover:scale-105"
                      onError={(event) => {
                        event.currentTarget.src = "/images/contact-us-hero.jpg";
                      }}
                    />
                  </div>
                  {image.caption && (
                    <figcaption className="p-4 text-sm text-muted-foreground">
                      {image.caption}
                    </figcaption>
                  )}
                </motion.figure>
              ))}
            </div>
          </motion.section>
        )}

        {/* CTA */}
        <motion.section
          variants={itemVariants}
          className="rounded-lg border border-border bg-gradient-to-r from-primary/10 to-primary/5 p-10 text-center sm:p-12"
        >
          <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
            {labels.ctaTitle}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            {labels.ctaDescription}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Button
              asChild
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <a href={`${baseHref}/contact`}>
                {labels.getInTouch}
                <ArrowRight className="ms-2 h-4 w-4" />
              </a>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href={`${baseHref}/services`}>{labels.allServices}</Link>
            </Button>
          </div>
        </motion.section>
      </div>

      {/* Bottom prev / next pager */}
      {pagerServices.length > 1 && (
        <ServicePager
          allServices={pagerServices}
          currentSlug={service.slug}
          baseHref={baseHref}
          isArabic={isArabic}
        />
      )}
    </motion.div>
  );
}
