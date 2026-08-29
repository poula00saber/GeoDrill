"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useState } from "react";
import { FAQS } from "@/lib/faq";
import { content, type Lang } from "@/lib/content";

export function FaqSlider({ locale }: { locale: Lang }) {
  const isArabic = locale === "ar";
  const items = FAQS[locale];

  const [start, setStart] = useState(0);
  const visible = items.slice(start, start + 3);
  const canPrev = start > 0;
  const canNext = start + 3 < items.length;

  const goPrev = () => canPrev && setStart((s) => Math.max(0, s - 3));
  const goNext = () =>
    canNext && setStart((s) => Math.min(items.length - 3, s + 3));

  const arrowPath = (next: boolean) => {
    if (isArabic) return next ? "M15 19l-7-7 7-7" : "M9 5l7 7-7 7";
    return next ? "M9 5l7 7-7 7" : "M15 19l-7-7 7-7";
  };

  return (
    <section className="relative overflow-hidden rounded-3xl bg-muted py-14 dark:bg-navy/60 md:py-16">
      <motion.div
        className="relative mx-auto max-w-2xl px-4 text-center sm:px-6"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-extrabold tracking-tight text-foreground md:text-3xl">
          {isArabic ? (
            <>
              تعرّف أكثر على <span className="text-teal">جيو دريل</span>
            </>
          ) : (
            <>
              Get to know <span className="text-teal">GEODRILL</span>
            </>
          )}
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          {isArabic
            ? "إجابات واضحة على أكثر الأسئلة التي تهمك"
            : "Clear answers to the questions that matter most to you"}
        </p>
      </motion.div>

      <div className="relative mx-auto mt-10 flex max-w-5xl items-center gap-3 px-4 sm:px-6 md:mt-12 md:gap-5">
        <button
          type="button"
          onClick={isArabic ? goNext : goPrev}
          disabled={isArabic ? !canNext : !canPrev}
          aria-label={isArabic ? "التالي" : "Previous"}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border bg-card text-foreground shadow-sm transition-all hover:bg-teal hover:text-navy disabled:cursor-not-allowed disabled:opacity-30 sm:h-10 sm:w-10"
        >
          <svg
            viewBox="0 0 24 24"
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
          >
            <path
              d={arrowPath(false)}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <div className="grid flex-1 gap-4 sm:grid-cols-3">
          {visible.map((item) => (
            <motion.div
              key={item.q}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className="rounded-2xl border border-border bg-card p-5 text-center shadow-sm"
            >
              <h3 className="text-sm font-bold text-foreground">{item.q}</h3>
              <p className="mt-2 text-xs leading-6 text-muted-foreground">
                {item.a}
              </p>
              <Link
                href={`/contracting/${locale}/faq`}
                className="mt-3 inline-flex items-center gap-1 rounded-full bg-teal/10 px-3 py-1.5 text-xs font-semibold text-teal transition-colors hover:bg-teal/20"
              >
                {isArabic ? "اعرف المزيد" : "Learn more"}
                <svg
                  viewBox="0 0 24 24"
                  className="h-3.5 w-3.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    d={
                      isArabic
                        ? "M19 12H5M12 19l-7-7 7-7"
                        : "M5 12h14M12 5l7 7-7 7"
                    }
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
            </motion.div>
          ))}
        </div>

        <button
          type="button"
          onClick={isArabic ? goPrev : goNext}
          disabled={isArabic ? !canPrev : !canNext}
          aria-label={isArabic ? "السابق" : "Next"}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-teal text-navy shadow-sm transition-all hover:bg-teal/80 disabled:cursor-not-allowed disabled:opacity-30 sm:h-10 sm:w-10"
        >
          <svg
            viewBox="0 0 24 24"
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
          >
            <path
              d={arrowPath(true)}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      <div className="relative mt-10 text-center">
        <Link
          href={`/contracting/${locale}/faq`}
          className="group inline-flex items-center gap-2 rounded-lg border-2 border-teal bg-transparent px-6 py-3 text-sm font-bold uppercase tracking-wide text-teal transition-all duration-300 hover:bg-teal hover:text-navy hover:shadow-lg hover:shadow-teal/20"
        >
          {isArabic ? "عرض جميع الأسئلة" : "Read all questions"}
          <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 rtl:-scale-x-100" />
        </Link>
      </div>
    </section>
  );
}
