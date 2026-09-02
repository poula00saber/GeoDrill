"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/geotech/components/providers/language-provider";
import { SectionHeading } from "@/geotech/components/section-heading";
import { CLIENT_LOGOS, type ClientLogo } from "@/lib/clients-data";

export function Clients() {
  const { locale, dict } = useLanguage();
  if (!dict) return null;

  const isAr = locale === "ar";
  const c = dict.clients;

  // Shuffle deterministically so the two marquee rows feel varied but stable.
  const half = Math.ceil(CLIENT_LOGOS.length / 2);
  const left = CLIENT_LOGOS.slice(0, half);
  const right = CLIENT_LOGOS.slice(half);

  return (
    <section
      id="clients"
      className="relative overflow-hidden border-y border-border bg-surface/30 py-20 sm:py-28 md:py-32"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={c.eyebrow}
          title={c.title}
          description={c.subtitle}
          align="center"
          className="mb-16"
        />
      </div>

      <div className="flex flex-col gap-6" dir="ltr">
        <LogoRow logos={left} duration={38} />
        <LogoRow logos={right} reverse duration={46} />
      </div>

      {/* Bottom CTA */}
      <div className="mx-auto mt-14 flex max-w-7xl flex-col items-center gap-4 px-4 text-center sm:px-6 lg:px-8">
        <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
          {isAr
            ? `أكثر من ${CLIENT_LOGOS.length} جهة تثق بجيو دريل`
            : `${CLIENT_LOGOS.length}+ organizations trust GEODRILL`}
        </p>
        <Link
          href={`/geotechnical/${locale}/clients`}
          className="group inline-flex items-center gap-2 rounded-lg border-2 border-primary bg-transparent px-6 py-3 text-sm font-bold uppercase tracking-wide text-foreground transition-all duration-300 hover:bg-primary hover:text-primary-foreground hover:shadow-lg hover:shadow-primary/20 rtl:flex-row-reverse"
        >
          {c.viewAll}
          <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 rtl:-scale-x-100" />
        </Link>
      </div>
    </section>
  );
}

function LogoRow({
  logos,
  reverse = false,
  duration = 40,
}: {
  logos: ClientLogo[];
  reverse?: boolean;
  duration?: number;
}) {
  // Repeat the row once so the marquee loops seamlessly.
  const items = useMemo(() => [...logos, ...logos], [logos]);

  return (
    <div className="relative overflow-hidden py-3" dir="ltr">
      <div className="pointer-events-none absolute inset-y-0 start-0 z-10 w-24 bg-gradient-to-r from-surface/40 to-transparent" aria-hidden />
      <div className="pointer-events-none absolute inset-y-0 end-0 z-10 w-24 bg-gradient-to-l from-surface/40 to-transparent" aria-hidden />

      <motion.div
        className="flex w-max shrink-0 items-center gap-5"
        initial={false}
        animate={{ x: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }}
        transition={{ duration, repeat: Infinity, ease: "linear" }}
      >
        {items.map((logo, i) => (
          <div
            key={`${logo.slug}-${i}`}
            className="group/logo relative shrink-0 before:pointer-events-none before:absolute before:-inset-3 before:-z-10 before:rounded-[inherit] before:bg-primary/0 before:blur-xl before:transition-colors before:duration-300 hover:before:bg-primary/10"
          >
            <div className="relative z-10 flex h-24 w-[200px] items-center justify-center rounded-xl border border-border/80 bg-card p-5 shadow-sm transition-all duration-500 ease-out group-hover/logo:-translate-y-1.5 group-hover/logo:scale-[1.015] group-hover/logo:border-primary/50 group-hover/logo:shadow-xl group-hover/logo:shadow-primary/15 sm:h-28 sm:w-[220px]">
              <span className="relative block h-14 w-[170px] rounded-lg border border-black/5 bg-gradient-to-br from-white to-slate-100 p-1.5 shadow-inner transition-transform duration-500 ease-out group-hover/logo:scale-105 sm:h-16 sm:w-[185px]">
                <Image
                  src={logo.src}
                  alt={logo.name}
                  fill
                  sizes="190px"
                  className="object-contain"
                />
              </span>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}