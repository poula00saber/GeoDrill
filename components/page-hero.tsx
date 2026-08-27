"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { useLanguage } from "@/components/language-provider";

export function PageHero({
  image,
  kicker,
  title,
  sub,
  crumb,
}: {
  image: string;
  kicker: string;
  title: string;
  sub?: string;
  crumb: string;
}) {
  const { lang } = useLanguage();
  return (
    // Added data-hero-banner attribute here
    <section
      data-hero-banner
      className="relative flex min-h-[46vh] items-end overflow-hidden bg-navy pt-28 pb-16 text-white md:pb-20"
    >
      <Image
        src={image}
        alt=""
        fill
        priority
        className="object-cover opacity-90"
        sizes="100vw"
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-navy via-navy/70 to-navy/40"
        aria-hidden
      />

      <div className="absolute inset-0 opacity-[0.05]" aria-hidden>
        <div className="dot-grid size-full" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 md:px-8">
        <nav
          aria-label="Breadcrumb"
          className="animate-in fade-in slide-in-from-top-4 fill-mode-both flex items-center gap-1.5 text-xs font-medium text-white/60 duration-700"
        >
          <Link
            href={`/contracting/${lang}`}
            className="transition-colors hover:text-teal"
          >
            {lang === "ar" ? "الرئيسية" : "Home"}
          </Link>
          <ChevronRight className="size-3 rtl:rotate-180" />
          <span className="text-teal">{crumb}</span>
        </nav>

        <div className="mt-6 max-w-3xl">
          <span className="animate-in fade-in slide-in-from-bottom-4 fill-mode-both inline-flex items-center text-sm font-semibold uppercase tracking-[0.18em] text-amber-200 duration-700">
            {kicker}
          </span>
          <h1
            className="animate-in fade-in slide-in-from-bottom-6 fill-mode-both mt-4 text-balance text-4xl font-extrabold leading-[1.05] tracking-tight duration-700 md:text-5xl lg:text-6xl"
            style={{ animationDelay: "120ms" }}
          >
            {title}
          </h1>
          {sub ? (
            <p
              className="animate-in fade-in slide-in-from-bottom-6 fill-mode-both mt-5 max-w-xl text-base leading-relaxed text-white/75 duration-700 md:text-lg"
              style={{ animationDelay: "220ms" }}
            >
              {sub}
            </p>
          ) : null}
        </div>
      </div>
    </section>
  );
}
