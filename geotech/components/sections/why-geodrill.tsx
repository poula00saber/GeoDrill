"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import {
  Users,
  Cpu,
  ClipboardCheck,
  Handshake,
  UserCog,
  ClipboardList,
  MonitorCog,
  Timer,
  Share2,
  HourglassIcon,
  Award,
  FileCheck2,
  FlaskConical,
  UserCheck,
  Leaf,
  DollarSign,
  Calendar,
  FolderCheck,
  Target,
} from "lucide-react";
import { useLanguage } from "@/geotech/components/providers/language-provider";
import { AnimatedCounter } from "@/geotech/components/animated-counter";
import { cn } from "@/geotech/lib/utils";

interface WhyGroup {
  title: string;
  items: string[];
}

const GROUP_ICONS = [Users, Cpu, ClipboardCheck, Handshake];

const ITEM_ICON_POOL = [
  UserCog,
  ClipboardList,
  MonitorCog,
  Timer,
  Share2,
  HourglassIcon,
  Award,
  FileCheck2,
  FlaskConical,
  UserCheck,
  Leaf,
  DollarSign,
];

const STATS = [
  { icon: Calendar, value: 17, suffix: "+", labelKey: "experience" },
  { icon: FolderCheck, value: 1000, suffix: "+", labelKey: "projects" },
  { icon: Users, value: 500, suffix: "+", labelKey: "clients" },
  { icon: Target, value: 10, suffix: "+", labelKey: "cities" },
] as const;

export function WhyGeoDrill() {
  const { dict, isArabic } = useLanguage();
  if (!dict?.whyGeoDrill) return null;

  const groups = Object.values(dict.whyGeoDrill.groups) as WhyGroup[];

  return (
    <section className="relative overflow-hidden py-20 sm:py-28 md:py-32">
      {/* ── Split hero ── */}
      <div className="mx-auto mb-20 grid max-w-7xl gap-10 px-4 sm:px-6 md:grid-cols-2 md:items-center lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
        >
          <p className="mb-3 flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-primary">
            <span className="h-px w-8 bg-primary" />
            {dict.whyGeoDrill.eyebrow}
          </p>
          <h2 className="text-4xl font-bold leading-tight sm:text-5xl">
            {dict.whyGeoDrill.headingLead ?? "Why Choose"}
            <br />
            <span className="text-primary">
              {dict.whyGeoDrill.brand ?? "GEODRILL"}
            </span>
          </h2>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-muted-foreground">
            {dict.whyGeoDrill.subtitle}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="relative aspect-[16/9] overflow-hidden rounded-xl border border-border/60 shadow-lg md:aspect-[4/3]"
        >
          <Image
            src="/images/why-geodrill.jpg"
            alt="GEODRILL field team on an active drilling site"
            fill
            className="object-cover transition-transform duration-700 hover:scale-105"
            sizes="(min-width: 768px) 50vw, 100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-black/40 via-transparent to-transparent" />
          <div className="absolute -bottom-8 -right-8 h-32 w-32 rotate-45 bg-primary/80" />
        </motion.div>
      </div>

      {/* ── 4-column advantage grid ── */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {groups.map((group, i) => {
            const GroupIcon = GROUP_ICONS[i % GROUP_ICONS.length];
            return (
              <motion.div
                key={group.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex flex-col items-center text-center"
              >
                {/* Group icon circle */}
                <motion.div
                  whileHover={{ scale: 1.08, rotate: 3 }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                  className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-primary/30 bg-primary/5 shadow-sm transition-all duration-300 hover:border-primary hover:bg-primary/10 hover:shadow-md hover:shadow-primary/20"
                >
                  <GroupIcon
                    className="h-7 w-7 text-primary"
                    strokeWidth={1.5}
                  />
                </motion.div>

                <h3 className="mt-4 font-mono text-xs font-semibold uppercase tracking-wider text-primary">
                  {group.title}
                </h3>

                <div className="mt-6 w-full space-y-3 text-start">
                  {group.items.map((item, j) => {
                    const [title, desc] = item.split(": ");
                    const ItemIcon =
                      ITEM_ICON_POOL[(i * 3 + j) % ITEM_ICON_POOL.length];
                    return (
                      <motion.div
                        key={j}
                        initial={{ opacity: 0, x: isArabic ? 20 : -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 + j * 0.05 }}
                        whileHover={{
                          y: -4,
                          transition: { duration: 0.2, ease: "easeOut" },
                        }}
                        className={cn(
                          "group relative flex gap-3 overflow-hidden rounded-xl border-2 border-border/60 bg-surface/60 p-4",
                          "transition-all duration-300 ease-out",
                          "hover:border-primary/50 hover:bg-primary/5 hover:shadow-lg hover:shadow-primary/10",
                        )}
                      >
                        {/* Left golden accent bar on hover */}
                        <span className="absolute inset-y-0 left-0 w-1 origin-left scale-y-0 bg-primary transition-transform duration-300 group-hover:scale-y-100" />

                        <ItemIcon
                          className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary transition-transform duration-300 group-hover:scale-110"
                          strokeWidth={1.5}
                        />
                        <div>
                          <p className="text-sm font-semibold text-foreground transition-colors group-hover:text-primary">
                            {title}
                          </p>
                          {desc && (
                            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                              {desc}
                            </p>
                          )}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* ── Stat bar — Individual Container Gold Hover on Selection ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className={cn(
            "mt-16 grid grid-cols-1 divide-y divide-white/10 overflow-hidden rounded-2xl bg-[#090D14] text-white shadow-2xl sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4 lg:divide-y-0",
            isArabic
              ? "lg:divide-x-reverse lg:divide-x lg:divide-white/15"
              : "lg:divide-x lg:divide-white/15",
          )}
        >
          {STATS.map((stat) => (
            <div
              key={stat.labelKey}
              className="group flex cursor-pointer items-center justify-between gap-4 px-6 py-6 transition-all duration-300 hover:bg-primary"
            >
              <div className="flex flex-col">
                {/* Number Badge Container — Fills with dark background on hover for contrast */}
                <div className="inline-block rounded-md transition-all duration-300">
                  <p className="text-2xl font-bold tracking-tight text-white transition-colors duration-300 group-hover:text-black sm:text-3xl">
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  </p>
                </div>

                <p className="mt-1 text-xs text-slate-400 transition-colors duration-300 group-hover:text-black/80 font-medium">
                  {dict.whyGeoDrill.stats[stat.labelKey]}
                </p>
              </div>

              {/* Golden Outline Icon Box — Inverts colors seamlessly on hover */}
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-primary/40 bg-transparent text-primary transition-all duration-300 group-hover:border-black/20 group-hover:bg-black group-hover:text-primary">
                <stat.icon
                  className="h-6 w-6 transition-transform duration-300 group-hover:scale-110"
                  strokeWidth={1.5}
                />
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
