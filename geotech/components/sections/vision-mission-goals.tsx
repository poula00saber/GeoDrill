"use client";

import { motion } from "framer-motion";
import { Flag, Target, TrendingUp } from "lucide-react";
import { useLanguage } from "@/geotech/components/providers/language-provider";

export function VisionMissionGoals() {
  const { dict, isArabic } = useLanguage();
  if (!dict?.vision || !dict?.mission) return null;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  const defaultGoals = [
    "Establish a strong and trusted market presence",
    "Ensure client satisfaction through quality service",
    "Promote innovation and sustainability",
    "Invest in ongoing team development",
  ];

  const goals =
    dict.about?.goals && Array.isArray(dict.about.goals)
      ? dict.about.goals
      : defaultGoals;

  const cards = [
    {
      icon: Flag,
      label: isArabic ? "الرؤية" : "Vision",
      title: dict.vision.title,
      body: dict.vision.description,
      type: "text" as const,
    },
    {
      icon: Target,
      label: isArabic ? "الرسالة" : "Mission",
      title: dict.mission.title,
      body: dict.mission.description,
      type: "text" as const,
    },
    {
      icon: TrendingUp,
      label: isArabic ? "الأهداف" : "Goals",
      title: isArabic ? "الأهداف الاستراتيجية" : "Strategic Objectives",
      goals,
      type: "list" as const,
    },
  ];

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
          {cards.map((card, i) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={i}
                variants={itemVariants}
                className="group rounded-xl border border-border/40 bg-card p-8 sm:p-10 text-center hover:border-primary/40 hover:shadow-lg transition-all"
              >
                <span className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-md shadow-primary/20">
                  <Icon className="h-7 w-7" />
                </span>

                <span className="mb-2 inline-block font-mono text-xs uppercase tracking-widest text-primary">
                  {card.label}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold leading-tight mb-4">
                  {card.title}
                </h3>

                {card.type === "text" ? (
                  <p className="text-sm sm:text-base leading-relaxed text-muted-foreground">
                    {card.body}
                  </p>
                ) : (
                  <ul
                    className={`space-y-3 text-sm sm:text-base leading-relaxed text-muted-foreground ${
                      isArabic ? "text-right" : "text-left"
                    }`}
                  >
                    {card.goals!.map((goal: string, gi: number) => (
                      <li key={gi} className="flex gap-3">
                        <span className="text-primary font-bold flex-shrink-0">
                          ·
                        </span>
                        <span>{goal}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
