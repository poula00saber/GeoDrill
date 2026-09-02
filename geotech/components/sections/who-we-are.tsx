"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/geotech/components/providers/language-provider";

export function WhoWeAre() {
  const { dict, isArabic } = useLanguage();
  if (!dict?.about) return null;

  return (
    <section className="relative overflow-hidden py-20 sm:py-28 md:py-32 border-b border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 md:gap-16 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: isArabic ? 40 : -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-8">
              {dict.about.title}
            </h2>
            <div className="space-y-6 text-muted-foreground">
              <p className="text-base sm:text-lg leading-relaxed">
                {dict.about.p1}
              </p>
              <p className="text-base sm:text-lg leading-relaxed">
                {dict.about.p2}
              </p>
              <p className="text-base sm:text-lg leading-relaxed">
                {dict.about.p3}
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: isArabic ? -40 : 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative h-96 sm:h-[500px] md:h-[600px] rounded-lg overflow-hidden bg-surface/50 border border-border/40"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/10 flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl sm:text-7xl font-bold text-primary/20 mb-4">
                  ◆
                </div>
                <p className="text-sm sm:text-base text-muted-foreground">
                  {dict.geotechnical?.title || "GeoDrill field work"}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
