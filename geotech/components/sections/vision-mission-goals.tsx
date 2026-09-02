"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/geotech/components/providers/language-provider";

export function VisionMissionGoals() {
  const { dict, isArabic } = useLanguage();
  if (!dict?.vision || !dict?.mission) return null;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section className="relative overflow-hidden py-20 sm:py-28 md:py-32 border-b border-border bg-surface/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid gap-8 md:grid-cols-3"
        >
          {/* Vision */}
          <motion.div variants={itemVariants} className="group">
            <div className="mb-4">
              <span className="inline-block font-mono text-xs uppercase tracking-widest text-primary mb-3">
                Vision
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold leading-tight">
                {dict.vision.title}
              </h3>
            </div>
            <p className="text-base leading-relaxed text-muted-foreground">
              {dict.vision.description}
            </p>
          </motion.div>

          {/* Mission */}
          <motion.div
            variants={itemVariants}
            className="group md:border-l-2 md:border-r-2 md:border-border/40 md:px-8"
          >
            <div className="mb-4">
              <span className="inline-block font-mono text-xs uppercase tracking-widest text-primary mb-3">
                Mission
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold leading-tight">
                {dict.mission.title}
              </h3>
            </div>
            <p className="text-base leading-relaxed text-muted-foreground">
              {dict.mission.description}
            </p>
          </motion.div>

          {/* Goals */}
          <motion.div variants={itemVariants} className="group">
            <div className="mb-4">
              <span className="inline-block font-mono text-xs uppercase tracking-widest text-primary mb-3">
                Goals
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold leading-tight mb-4">
                Strategic Objectives
              </h3>
            </div>
            <ul className="space-y-3 text-base leading-relaxed text-muted-foreground">
              {dict.about?.goals && Array.isArray(dict.about.goals) ? (
                dict.about.goals.map((goal: string, i: number) => (
                  <li key={i} className="flex gap-3">
                    <span className="text-primary font-bold flex-shrink-0">
                      ·
                    </span>
                    <span>{goal}</span>
                  </li>
                ))
              ) : (
                <>
                  <li className="flex gap-3">
                    <span className="text-primary font-bold flex-shrink-0">
                      ·
                    </span>
                    <span>Establish a strong and trusted market presence</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary font-bold flex-shrink-0">
                      ·
                    </span>
                    <span>
                      Ensure client satisfaction through quality service
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary font-bold flex-shrink-0">
                      ·
                    </span>
                    <span>Promote innovation and sustainability</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary font-bold flex-shrink-0">
                      ·
                    </span>
                    <span>Invest in ongoing team development</span>
                  </li>
                </>
              )}
            </ul>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
