"use client";

import { motion } from "framer-motion";
import { cn } from "@/geotech/lib/utils";

interface GoldGradientBandProps {
  eyebrow?: string;
  title?: string;
  description?: string;
  className?: string;
}

/**
 * Decorative gold-gradient band rendered directly under a page hero.
 * Content (eyebrow / title / description) is centered horizontally and
 * vertically so it sits in the middle of the gradient regardless of
 * the document's writing direction.
 */
export function GoldGradientBand({
  eyebrow,
  title,
  description,
  className,
}: GoldGradientBandProps) {
  return (
    <section
      className={cn(
        "relative overflow-hidden",
        "bg-gradient-to-r from-primary/5 via-primary/10 to-amber-500/5",
        "border-y border-primary/10",
        className,
      )}
    >
      {/* Soft blurred orbs with reduced opacity */}
      <div className="pointer-events-none absolute -left-16 top-1/2 h-40 w-40 -translate-y-1/2 rounded-full bg-primary/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-16 top-1/2 h-40 w-40 -translate-y-1/2 rounded-full bg-amber-500/10 blur-3xl" />

      <div className="relative mx-auto flex max-w-7xl flex-col items-center justify-center px-4 py-8 text-center sm:px-6 sm:py-10 lg:px-8">
        {eyebrow && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.4 }}
            className="mb-3 flex items-center justify-center gap-3"
          >
            <span className="h-px w-8 bg-primary/40" />
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-primary/80">
              {eyebrow}
            </span>
            <span className="h-px w-8 bg-primary/40" />
          </motion.div>
        )}

        {title && (
          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="text-balance text-2xl font-bold tracking-tight text-foreground sm:text-3xl md:text-4xl"
          >
            {title}
          </motion.h2>
        )}

        {description && (
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-3 max-w-2xl text-balance text-sm leading-relaxed text-muted-foreground sm:text-base"
          >
            {description}
          </motion.p>
        )}
      </div>
    </section>
  );
}
