"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, ArrowRight } from "lucide-react";
import { useLanguage } from "@/geotech/components/providers/language-provider";
import { siteConfig } from "@/geotech/lib/site-config";

export function CtaBanner() {
  const { locale, dict } = useLanguage();
  if (!dict) return null;

  const b = dict.ctaBanner;
  const contactInfo = dict.contact.info;

  return (
    <section className="relative isolate overflow-hidden">
      {/* Background photo + dark scrim */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/contact-us-hero.jpg"
          alt="GEODRILL field engineer on a drilling site"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/60 to-black/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      </div>

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
          {/* Left: copy + CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
          >
            <p className="mb-3 flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-primary">
              <span className="h-px w-8 bg-primary" />
              {b.eyebrow}
            </p>
            <h2 className="max-w-lg text-3xl font-bold leading-tight text-white sm:text-4xl">
              {b.title}
            </h2>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-white/80 sm:text-base">
              {b.description}
            </p>
            <Link
              href={`/geotechnical/${locale}/contact`}
              className="mt-8 inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
            >
              {b.button}
              <ArrowRight className="h-4 w-4 rtl:-scale-x-100" />
            </Link>
          </motion.div>

          {/* Right: contact info card (Dark container with gold-hover items) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="rounded-xl border border-white/10 bg-[#090D14] p-4 shadow-2xl sm:p-6"
          >
            <div className="space-y-3">
              <CardItem
                icon={Mail}
                label={contactInfo.email}
                value={siteConfig.email}
                href={`mailto:${siteConfig.email}`}
              />
              <CardItem
                icon={Phone}
                label={contactInfo.phone}
                value={siteConfig.phone}
                href={siteConfig.phoneHref}
              />
              <CardItem
                icon={MapPin}
                label={contactInfo.address}
                value={`${siteConfig.address.city}, ${siteConfig.address.country}`}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function CardItem({
  icon: Icon,
  label,
  value,
  href,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  href?: string;
}) {
  const content = (
    <div className="group flex items-center gap-4 rounded-xl border border-white/5 bg-white/[0.03] p-4 transition-all duration-300 hover:border-primary hover:bg-primary hover:shadow-lg hover:shadow-primary/10">
      {/* Icon Box */}
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-primary/40 bg-transparent text-primary transition-all duration-300 group-hover:border-black/20 group-hover:bg-black group-hover:text-primary">
        <Icon
          className="h-5 w-5 transition-transform duration-300 group-hover:scale-110"
          strokeWidth={1.5}
        />
      </div>

      <div className="flex flex-col">
        <span className="text-xs font-medium uppercase tracking-wide text-slate-400 transition-colors duration-300 group-hover:text-black/70">
          {label}
        </span>
        <span
          className="text-sm font-semibold text-white transition-colors duration-300 group-hover:text-black"
          dir="ltr"
        >
          {value}
        </span>
      </div>
    </div>
  );

  return href ? (
    <a
      href={href}
      className="block outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-xl"
    >
      {content}
    </a>
  ) : (
    content
  );
}
