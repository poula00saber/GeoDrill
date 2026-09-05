"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/geotech/components/providers/language-provider";
import { SectionHeading } from "@/geotech/components/section-heading";
import { TechnicalBadge } from "@/geotech/components/technical-badge";
import { cn } from "@/geotech/lib/utils";
import {
  projects,
  type Project,
  type ProjectCategory,
  type ProjectFilter,
} from "@/geotech/lib/projects-data";

interface ProjectNavigatorProps {
  /** Show every project (projects page). Default renders a sampled grid. */
  showAll?: boolean;
  className?: string;
}

// Ordered list of filterable service categories.
const CATEGORIES: ProjectFilter[] = [
  "all",
  "geotechnical",
  "geophysical",
  "survey",
  "testing",
  "structural",
  "slope",
  "shoring",
];

export function ProjectNavigator({
  showAll = false,
  className,
}: ProjectNavigatorProps) {
  const { locale, dict } = useLanguage();
  const isAr = locale === "ar";
  const [active, setActive] = useState<ProjectFilter>("all");

  const ordered = useMemo<Project[]>(() => {
    const list =
      active === "all"
        ? projects
        : projects.filter((p) => p.category === active);
    return list.sort(
      (a, b) =>
        CATEGORIES.indexOf(a.category) - CATEGORIES.indexOf(b.category),
    );
  }, [active]);

  const t = dict?.projectNavigator;
  if (!t) return null;

  const visible = showAll ? ordered : ordered.slice(0, 9);

  const filterLabel = (f: ProjectFilter) =>
    f === "all" ? t.all : t.filters[f as ProjectCategory];
return (
    <section
      id="projects"
      className={cn("relative overflow-hidden py-20 sm:py-28 md:py-32", className)}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={t.eyebrow}
          title={t.title}
          description={t.subtitle}
          align="center"
          className="mb-12"
        />

        {/* Filters */}
        <div className="mb-10 flex flex-wrap justify-center gap-2">
          {CATEGORIES.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setActive(f)}
              className={cn(
                "rounded-full border px-3.5 py-1.5 text-xs font-medium transition-all",
                active === f
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border text-muted-foreground hover:border-primary/40 hover:text-foreground",
              )}
            >
              {filterLabel(f)}
            </button>
          ))}
        </div>

        {/* Grid */}
        <motion.div layout className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {visible.map((project, i) => (
              <Card
                key={project.id}
                project={project}
                featured={i === 0 && !showAll}
                isAr={isAr}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {!showAll && (
          <p className="mt-6 text-center font-mono text-[10px] uppercase tracking-wider text-muted-foreground/70">
            {t.placeholder}
          </p>
        )}

        {/* Link to the projects screen */}
        <div className="mt-14 flex justify-center">
          <Link
            href={`/geotechnical/${locale}/projects`}
            className="group inline-flex items-center gap-2 rounded-lg border-2 border-primary bg-transparent px-6 py-3 text-sm font-bold uppercase tracking-wide text-foreground transition-all duration-300 hover:bg-primary hover:text-primary-foreground hover:shadow-lg hover:shadow-primary/20 rtl:flex-row-reverse"
          >
            {t.viewAll}
            <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 rtl:-scale-x-100" />
          </Link>
        </div>
      </div>
    </section>
  );
}
function Card({
  project,
  featured,
  isAr,
}: {
  project: Project;
  featured: boolean;
  isAr: boolean;
}) {
  const { dict } = useLanguage();
  const t = dict?.projectNavigator;
  if (!t) return null;

  const name = isAr ? project.nameAr : project.nameEn;
  const meta = [project.client, project.location].filter(Boolean).join(" • ");

  return (
    <motion.article
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.35 }}
      className={cn(
        "group relative overflow-hidden rounded-lg border border-border/40 bg-card",
        featured && "sm:col-span-2 lg:row-span-2",
      )}
    >
      <div
        className={cn(
          "relative overflow-hidden",
          featured
            ? "aspect-[16/10] lg:aspect-auto lg:h-full lg:min-h-[380px]"
            : "aspect-[4/3]",
        )}
      >
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
          style={{ backgroundImage: `url(${project.image})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
        <div className="absolute inset-0 bg-grid-sm opacity-10" aria-hidden />

        {/* Category badge */}
        <div className="absolute end-3 top-3">
          <TechnicalBadge variant="primary">
            {t.filters[project.category]}
          </TechnicalBadge>
        </div>

        {/* Content */}
        <div className="absolute inset-x-0 bottom-0 p-4">
          <p className="mb-1 line-clamp-1 text-xs text-white/70">{meta}</p>
          <h3
            className={cn(
              "font-semibold text-white line-clamp-3",
              featured ? "text-xl" : "text-base",
            )}
          >
            {name}
          </h3>
          <div
            className="absolute inset-x-4 bottom-0 h-px origin-left scale-x-0 bg-primary transition-transform duration-500 group-hover:scale-x-100 rtl:origin-right"
            aria-hidden
          />
        </div>
      </div>
    </motion.article>
  );
}