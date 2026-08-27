"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/components/language-provider";
import { SectionHeading } from "@/components/section-heading";
import { SECTION_IDS } from "@/lib/content";
import { CLIENT_LOGOS, type ClientLogo } from "@/lib/clients-data";

export function Clients() {
  const { t, lang } = useLanguage();
  const c = t.clients;
  const viewAllLabel =
    (c as { viewAll?: string }).viewAll ??
    (lang === "ar" ? "عرض كل العملاء" : "View All Clients");

  const half = Math.ceil(CLIENT_LOGOS.length / 2);
  const rowA = [...CLIENT_LOGOS.slice(0, half), ...CLIENT_LOGOS.slice(0, half)];
  const rowB = [...CLIENT_LOGOS.slice(half), ...CLIENT_LOGOS.slice(half)];

  return (
    <section
      id={SECTION_IDS.clients}
      className="bg-muted py-20 md:py-28 transition-colors duration-300"
    >
      <div className="mx-auto mb-14 max-w-7xl px-6">
        <SectionHeading
          kicker={c.kicker}
          title={c.title}
          sub={c.sub}
          align="center"
        />
      </div>

      <div className="flex flex-col gap-8" dir="ltr">
        <LogoRow logos={rowA} />
        <LogoRow logos={rowB} reverse />
      </div>

      {/* View all */}
      <div className="mx-auto mt-14 flex max-w-7xl flex-col items-center gap-3 px-6 text-center">
        <p className="text-sm text-muted-foreground">
          {lang === "ar"
            ? `أكثر من ${CLIENT_LOGOS.length} جهة تثق في جيودريل عبر المملكة`
            : `${CLIENT_LOGOS.length}+ organizations trust GeoDrill across the Kingdom`}
        </p>
        <Link
          href={`/${lang ?? "en"}/clients`}
          className="group inline-flex items-center gap-2 rounded-lg border-2 border-teal bg-transparent px-6 py-3 text-sm font-bold uppercase tracking-wide text-teal transition-all duration-300 hover:bg-teal hover:text-navy hover:shadow-lg hover:shadow-teal/20"
        >
          {viewAllLabel}
          <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 rtl:-scale-x-100" />
        </Link>
      </div>
    </section>
  );
}

function LogoRow({
  logos,
  reverse,
}: {
  logos: ClientLogo[];
  reverse?: boolean;
}) {
  return (
    <div className="relative overflow-hidden py-3" dir="ltr">
      <div
        className="pointer-events-none absolute inset-y-0 start-0 z-10 w-28 bg-gradient-to-r from-muted to-transparent"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-y-0 end-0 z-10 w-28 bg-gradient-to-l from-muted to-transparent"
        aria-hidden
      />
      <ul
        className={`${reverse ? "marquee-b" : "marquee-a"} flex w-max shrink-0 items-center gap-5`}
      >
        {logos.map((logo, i) => (
          <li key={`${logo.src}-${i}`} className="group/logo relative shrink-0 before:pointer-events-none before:absolute before:-inset-3 before:-z-10 before:rounded-[inherit] before:bg-teal/0 before:blur-xl before:transition-colors before:duration-300 hover:before:bg-teal/15">
            <div className="relative z-10 flex h-28 w-[210px] items-center justify-center rounded-2xl border border-border/80 bg-gradient-to-br from-card via-background to-muted/80 p-6 shadow-sm backdrop-blur-md transition-all duration-500 ease-out group-hover/logo:-translate-y-1.5 group-hover/logo:scale-[1.015] group-hover/logo:border-teal/70 group-hover/logo:shadow-xl group-hover/logo:shadow-teal/25 dark:border-white/10 dark:from-white/[0.1] dark:via-navy/80 dark:to-white/[0.04] sm:h-32 sm:w-[230px]">
              <span className="relative block h-16 w-[180px] rounded-xl border border-black/5 bg-gradient-to-br from-white to-slate-100 p-1.5 shadow-inner transition-transform duration-500 ease-out group-hover/logo:scale-105 dark:border-white/20 dark:from-white/95 dark:to-slate-200 sm:h-20 sm:w-[205px]">
                <Image
                  src={logo.src}
                  alt={logo.name}
                  fill
                  sizes="200px"
                  className="object-contain"
                />
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
