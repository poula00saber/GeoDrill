"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { FAQS } from "@/lib/faq";
import { content } from "@/lib/content";

function AccordionItem({
  q,
  a,
  isOpen,
  onToggle,
}: {
  q: string;
  a: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      className={`overflow-hidden rounded-2xl border transition-all duration-300 ${
        isOpen
          ? "border-teal/50 bg-card shadow-md"
          : "border-border bg-muted/40 hover:border-teal/30 dark:bg-card/50 dark:hover:border-border/60"
      }`}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-start sm:px-6 sm:py-5"
      >
        <span
          className={`text-sm font-semibold transition-colors sm:text-base ${
            isOpen ? "text-foreground" : "text-foreground/80"
          }`}
        >
          {q}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.25 }}
          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-colors ${
            isOpen
              ? "bg-teal text-navy"
              : "bg-navy/10 text-navy dark:bg-white/10 dark:text-white"
          }`}
        >
          <svg
            viewBox="0 0 24 24"
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <p className="px-5 pb-5 text-sm leading-7 text-muted-foreground sm:px-6 sm:pb-6">
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Faq() {
  const params = useParams<{ locale?: string }>();
  const isArabic = params?.locale === "ar";
  const locale = isArabic ? "ar" : "en";
  const copy = content[locale].faq;
  const items = FAQS[locale];
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="pt-6 pb-24 md:pt-12">
      <section className="mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          className="mx-auto max-w-2xl text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-flex rounded-full border border-teal/30 bg-teal/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-teal">
            {copy.kicker}
          </span>
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-foreground md:text-4xl">
            {copy.title}
          </h1>
          {copy.sub && (
            <p className="mt-3 text-base leading-7 text-muted-foreground">
              {copy.sub}
            </p>
          )}
        </motion.div>

        <div className="mt-14 grid gap-6 md:grid-cols-[0.85fr_1.4fr] md:gap-8">
          {/* Side panel */}
          <motion.div
            initial={{ opacity: 0, x: isArabic ? 30 : -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="flex flex-col justify-between rounded-3xl border border-border bg-card p-7 shadow-sm dark:bg-navy/60"
          >
            <div>
              <h2 className="text-lg font-bold text-foreground">
                {copy.sideTitle}
              </h2>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                {copy.sideBody}
              </p>
              <Link
                href={`/${locale}#contact`}
                className="mt-5 inline-flex items-center gap-2 rounded-xl bg-teal px-5 py-2.5 text-sm font-semibold text-navy shadow-sm transition-all hover:bg-teal/80 active:scale-95"
              >
                {copy.sideCta}
              </Link>
            </div>

            {/* Branded panel */}
            <div className="relative mt-8 flex h-40 w-full flex-col items-center justify-center overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-navy to-teal/40 text-center shadow-inner">
              <span className="text-4xl font-extrabold tracking-tight text-white">
                GEODRILL
              </span>
              <span className="mt-1 text-xs text-white/70">
                {isArabic
                  ? "بناء الثقة عبر المملكة"
                  : "Building trust across the Kingdom"}
              </span>
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy/40 to-transparent" />
            </div>
          </motion.div>

          {/* Accordion */}
          <motion.div
            className="flex flex-col gap-3"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {items.map((item, i) => (
              <AccordionItem
                key={item.q}
                q={item.q}
                a={item.a}
                isOpen={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? null : i)}
              />
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
