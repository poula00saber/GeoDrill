"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import Link from "next/link";
import {
  ArrowUpRight,
  Search,
  Building2,
  Layers,
  ScanLine,
  FlaskConical,
  ShieldCheck,
  Mountain,
  Anchor,
  X,
  MapPin,
  Briefcase,
  SlidersHorizontal,
} from "lucide-react";
import { useLanguage } from "@/geotech/components/providers/language-provider";
import { cn } from "@/geotech/lib/utils";
import {
  projects,
  type Project,
  type ProjectCategory,
  type ProjectFilter,
} from "@/geotech/lib/projects-data";

interface ProjectShowcaseProps {
  /** Show every project (projects page). Default renders a sampled grid. */
  showAll?: boolean;
  className?: string;
}

const CATEGORY_ICONS: Record<ProjectCategory, typeof Building2> = {
  geotechnical: Building2,
  geophysical: ScanLine,
  survey: Layers,
  testing: FlaskConical,
  structural: ShieldCheck,
  slope: Mountain,
  shoring: Anchor,
};

const CATEGORY_TONE: Record<ProjectCategory, string> = {
  geotechnical: "from-primary/30 to-primary/0",
  geophysical: "from-sky-500/30 to-sky-500/0",
  survey: "from-emerald-500/30 to-emerald-500/0",
  testing: "from-violet-500/30 to-violet-500/0",
  structural: "from-amber-500/30 to-amber-500/0",
  slope: "from-rose-500/30 to-rose-500/0",
  shoring: "from-cyan-500/30 to-cyan-500/0",
};

const FILTER_ORDER: ProjectFilter[] = [
  "all",
  "geotechnical",
  "geophysical",
  "survey",
  "testing",
  "structural",
  "slope",
  "shoring",
];

export function ProjectShowcase({
  showAll = false,
  className,
}: ProjectShowcaseProps) {
  const { locale, dict } = useLanguage();
  const isAr = locale === "ar";
  const [active, setActive] = useState<ProjectFilter>("all");
  const [query, setQuery] = useState("");
  const [openId, setOpenId] = useState<string | null>(null);

  const t = dict?.projectNavigator;

  const filtered = useMemo<Project[]>(() => {
    const base =
      active === "all"
        ? projects
        : projects.filter((p) => p.category === active);
    const q = query.trim().toLowerCase();
    const list = q
      ? base.filter((p) => {
          const name = (isAr ? p.nameAr : p.nameEn).toLowerCase();
          return (
            name.includes(q) ||
            p.location.toLowerCase().includes(q) ||
            p.client.toLowerCase().includes(q)
          );
        })
      : base;
    return list.sort(
      (a, b) =>
        FILTER_ORDER.indexOf(a.category) - FILTER_ORDER.indexOf(b.category),
    );
  }, [active, query, isAr]);

  const visible = showAll ? filtered : filtered.slice(0, 9);

  // Featured: pick the first available card
  const featured = visible[0];
  const rest = visible.slice(1);

  const counts = useMemo(() => {
    const c: Record<ProjectFilter, number> = {
      all: projects.length,
      geotechnical: 0,
      geophysical: 0,
      survey: 0,
      testing: 0,
      structural: 0,
      slope: 0,
      shoring: 0,
    };
    for (const p of projects) c[p.category]++;
    return c;
  }, []);

  if (!t) return null;

  const filterLabel = (f: ProjectFilter) =>
    f === "all" ? t.all : t.filters[f as ProjectCategory];

  const openProject = openId
    ? (visible.find((p) => p.id === openId) ?? null)
    : null;
  const OpenIcon = openProject
    ? CATEGORY_ICONS[openProject.category]
    : Building2;
  const openTone = openProject ? CATEGORY_TONE[openProject.category] : "";

  return (
    <section
      id="projects"
      className={cn(
        "relative overflow-hidden",
        "bg-gradient-to-b from-background via-background/95 to-background",
        "py-12 sm:py-16 md:py-20",
        className,
      )}
    >
      {/* Background glow effects */}
      <div className="pointer-events-none absolute -left-32 top-1/4 h-96 w-96 rounded-full bg-primary/10 blur-[120px]" />
      <div className="pointer-events-none absolute -right-32 bottom-1/4 h-96 w-96 rounded-full bg-amber-500/10 blur-[120px]" />
      <div className="pointer-events-none absolute inset-0 bg-grid-sm opacity-[0.03]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Stat strip - now fully clickable buttons */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="grid grid-cols-2 gap-2.5 sm:grid-cols-4 lg:grid-cols-8"
        >
          <StatChip
            label={isAr ? "الكل" : "All Projects"}
            value={counts.all}
            icon={Layers}
            active={active === "all"}
            onClick={() => setActive("all")}
          />
          {(
            [
              "geotechnical",
              "geophysical",
              "survey",
              "testing",
              "structural",
              "slope",
              "shoring",
            ] as ProjectCategory[]
          ).map((cat) => {
            const Icon = CATEGORY_ICONS[cat];
            return (
              <StatChip
                key={cat}
                label={t.filters[cat]}
                value={counts[cat]}
                icon={Icon}
                active={active === cat}
                onClick={() => setActive(cat)}
              />
            );
          })}
        </motion.div>

        {/* Search + Filter toolbar */}
        <div className="mt-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          {/* Segmented Filter Control */}
          <LayoutGroup id="filter-pills">
            <div className="flex flex-wrap items-center gap-1.5 rounded-2xl border border-border/80 bg-background/80 p-1.5 shadow-sm backdrop-blur-md">
              <span className="flex items-center gap-1 px-2.5 py-1 text-[11px] font-semibold text-muted-foreground/70 border-e border-border/50">
                <SlidersHorizontal className="h-3.5 w-3.5" />
                {!isAr && "Filter"}
              </span>
              {FILTER_ORDER.map((f) => {
                const Icon =
                  f === "all" ? Layers : CATEGORY_ICONS[f as ProjectCategory];
                const isActive = active === f;

                return (
                  <button
                    key={f}
                    type="button"
                    onClick={() => setActive(f)}
                    className={cn(
                      "group relative flex items-center gap-2 rounded-xl px-3.5 py-2 text-xs font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
                      isActive
                        ? "text-primary-foreground shadow-md"
                        : "text-muted-foreground hover:bg-muted/50 hover:text-foreground",
                    )}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="filter-pill-indicator"
                        className="absolute inset-0 rounded-xl bg-primary shadow-lg shadow-primary/25"
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 32,
                        }}
                      />
                    )}
                    <span className="relative z-10 flex items-center gap-1.5">
                      <Icon
                        className={cn(
                          "h-3.5 w-3.5 transition-transform duration-300 group-hover:scale-110",
                          isActive
                            ? "text-primary-foreground"
                            : "text-primary/70",
                        )}
                      />
                      {filterLabel(f)}
                    </span>
                    <span
                      className={cn(
                        "relative z-10 flex h-4 min-w-[16px] items-center justify-center rounded-full px-1 text-[10px] font-mono transition-colors",
                        isActive
                          ? "bg-primary-foreground/20 text-primary-foreground"
                          : "bg-muted text-muted-foreground group-hover:bg-muted-foreground/20",
                      )}
                    >
                      {counts[f]}
                    </span>
                  </button>
                );
              })}
            </div>
          </LayoutGroup>

          {/* Search bar */}
          <div className="relative w-full lg:w-80">
            <Search
              className={cn(
                "pointer-events-none absolute top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/70 transition-colors",
                isAr ? "right-3.5" : "left-3.5",
              )}
            />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={
                isAr
                  ? "ابحث عن مشروع، موقع، عميل..."
                  : "Search project, location, client…"
              }
              className={cn(
                "w-full rounded-2xl border border-border/80 bg-background/80 py-2.5 text-xs text-foreground placeholder:text-muted-foreground/60 shadow-sm backdrop-blur-md transition-all duration-200 focus:border-primary focus:bg-background focus:outline-none focus:ring-2 focus:ring-primary/20",
                isAr ? "pr-10 pl-9" : "pl-10 pr-9",
              )}
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                className={cn(
                  "absolute top-1/2 h-6 w-6 -translate-y-1/2 rounded-full flex items-center justify-center text-muted-foreground transition-all hover:bg-muted hover:text-foreground",
                  isAr ? "left-2.5" : "right-2.5",
                )}
                aria-label={isAr ? "مسح" : "Clear"}
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Featured Project Banner */}
        {featured && !query && active === "all" && (
          <FeaturedCard
            project={featured}
            isAr={isAr}
            onOpen={() => setOpenId(featured.id)}
            categoryLabel={t.filters[featured.category]}
          />
        )}

        {/* Grid */}
        <LayoutGroup>
          <motion.div
            layout
            className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
          >
            <AnimatePresence mode="popLayout">
              {(query || active !== "all" ? visible : rest).map(
                (project, i) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    index={i}
                    isAr={isAr}
                    isOpen={openId === project.id}
                    onOpen={() => setOpenId(project.id)}
                    categoryLabel={t.filters[project.category]}
                  />
                ),
              )}
            </AnimatePresence>
          </motion.div>
        </LayoutGroup>

        {/* Empty state */}
        {visible.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-10 rounded-3xl border border-dashed border-border/80 bg-background/50 p-12 text-center backdrop-blur-sm"
          >
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-muted/60 text-muted-foreground">
              <Search className="h-6 w-6" />
            </div>
            <p className="mt-4 text-base font-semibold text-foreground">
              {isAr ? "لا توجد نتائج" : "No matching projects found"}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              {isAr
                ? "جرب كلمة بحث مختلفة أو غيّر الفلتر المحدّد."
                : "Try adjusting your search or active filter criteria."}
            </p>
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setActive("all");
              }}
              className="mt-5 inline-flex h-10 items-center gap-2 rounded-xl border border-primary/30 bg-primary/10 px-5 text-xs font-bold text-primary shadow-sm transition-all hover:bg-primary hover:text-primary-foreground"
            >
              <X className="h-3.5 w-3.5" />
              {isAr ? "إعادة الضبط" : "Reset all filters"}
            </button>
          </motion.div>
        )}

        {!showAll && visible.length > 0 && (
          <p className="mt-8 text-center font-mono text-[10px] uppercase tracking-wider text-muted-foreground/70">
            {t.placeholder}
          </p>
        )}

        {/* CTA */}
        <div className="mt-12 flex justify-center">
          <Link
            href={`/geotechnical/${locale}/projects`}
            className="group relative inline-flex items-center gap-3 overflow-hidden rounded-2xl bg-primary px-8 py-3.5 text-xs font-bold uppercase tracking-wider text-primary-foreground shadow-lg shadow-primary/25 transition-all duration-300 hover:scale-[1.02] hover:bg-primary/90 hover:shadow-xl hover:shadow-primary/30 active:scale-[0.98] rtl:flex-row-reverse"
          >
            <span>{t.viewAll}</span>
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 rtl:-scale-x-100" />
          </Link>
        </div>
      </div>

      {/* Detail drawer */}
      <AnimatePresence>
        {openProject && (
          <ProjectDrawer
            project={openProject}
            isAr={isAr}
            onClose={() => setOpenId(null)}
            categoryLabel={t.filters[openProject.category]}
            Icon={OpenIcon}
            tone={openTone}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

function StatChip({
  label,
  value,
  icon: Icon,
  active,
  onClick,
}: {
  label: string;
  value: number;
  icon: typeof Building2;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "group relative flex items-center gap-2.5 overflow-hidden rounded-2xl border p-2.5 text-start transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
        active
          ? "border-primary bg-primary/10 shadow-md shadow-primary/10"
          : "border-border/70 bg-background/60 hover:border-primary/40 hover:bg-background/90",
      )}
    >
      <div
        className={cn(
          "flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl border transition-all duration-300",
          active
            ? "border-primary/40 bg-primary text-primary-foreground shadow-sm"
            : "border-border/60 bg-muted/50 text-muted-foreground group-hover:border-primary/30 group-hover:text-primary",
        )}
      >
        <Icon className="h-4 w-4" strokeWidth={1.75} />
      </div>
      <div className="min-w-0 flex-1">
        <div className="truncate font-mono text-[9px] uppercase tracking-wider text-muted-foreground group-hover:text-foreground">
          {label}
        </div>
        <div className="text-sm font-bold leading-tight text-foreground">
          {value}
        </div>
      </div>
    </button>
  );
}

function FeaturedCard({
  project,
  isAr,
  onOpen,
  categoryLabel,
}: {
  project: Project;
  isAr: boolean;
  onOpen: () => void;
  categoryLabel: string;
}) {
  const Icon = CATEGORY_ICONS[project.category];
  const tone = CATEGORY_TONE[project.category];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="group relative mt-8 overflow-hidden rounded-3xl border border-border/70 bg-card shadow-xl shadow-black/5 transition-all duration-300 hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/10"
    >
      <div className="grid md:grid-cols-5">
        {/* Image Section */}
        <div className="relative aspect-[16/9] overflow-hidden md:col-span-3 md:aspect-auto md:min-h-[360px]">
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
            style={{ backgroundImage: `url(${project.image})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent md:bg-gradient-to-r md:from-transparent md:via-black/20 md:to-black/80" />

          {/* Category Badge */}
          <div className="absolute start-4 top-4 flex items-center gap-1.5 rounded-full border border-white/20 bg-black/40 px-3 py-1.5 text-[10px] font-mono uppercase tracking-widest text-white backdrop-blur-md">
            <Icon className="h-3.5 w-3.5 text-primary" />
            {categoryLabel}
          </div>

          <div className="absolute bottom-4 start-4 md:hidden">
            <span className="rounded-md bg-primary/90 px-2 py-1 font-mono text-[9px] font-bold uppercase tracking-widest text-primary-foreground">
              {isAr ? "مشروع مميز" : "Featured"}
            </span>
          </div>
        </div>

        {/* Content Section */}
        <div className="relative flex flex-col justify-between p-6 sm:p-8 md:col-span-2">
          <div
            className={cn(
              "absolute inset-0 bg-gradient-to-br opacity-20 pointer-events-none",
              tone,
            )}
          />

          <div className="relative z-10">
            <div className="hidden items-center justify-between md:flex">
              <span className="rounded-full bg-primary/10 px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-widest text-primary border border-primary/20">
                {isAr ? "مشروع مميز" : "Featured Project"}
              </span>
            </div>

            <div className="mt-4 flex items-center gap-1.5 text-xs text-muted-foreground">
              <MapPin className="h-3.5 w-3.5 text-primary shrink-0" />
              <span className="font-mono uppercase tracking-wider">
                {project.location}
              </span>
            </div>

            <h3 className="mt-2 text-2xl font-bold leading-snug text-foreground sm:text-3xl">
              {isAr ? project.nameAr : project.nameEn}
            </h3>

            <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
              <Briefcase className="h-3.5 w-3.5 text-primary shrink-0" />
              <span className="line-clamp-1">{project.client}</span>
            </div>
          </div>

          <div className="relative z-10 mt-8 pt-4 border-t border-border/50">
            <button
              type="button"
              onClick={onOpen}
              className={cn(
                "group/btn inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-xs font-bold text-primary-foreground shadow-md shadow-primary/20 transition-all duration-300 hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/30 active:scale-95",
                isAr && "flex-row-reverse",
              )}
            >
              <span>{isAr ? "عرض التفاصيل" : "View Project Details"}</span>
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 rtl:-scale-x-100" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function ProjectCard({
  project,
  index,
  isAr,
  isOpen,
  onOpen,
  categoryLabel,
}: {
  project: Project;
  index: number;
  isAr: boolean;
  isOpen: boolean;
  onOpen: () => void;
  categoryLabel: string;
}) {
  const Icon = CATEGORY_ICONS[project.category];

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.96, y: 15 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.3, delay: Math.min(index * 0.03, 0.25) }}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-border/70 bg-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5"
    >
      {/* Visual Header */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted">
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
          style={{ backgroundImage: `url(${project.image})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80" />

        {/* Badge */}
        <div className="absolute end-3 top-3 inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-black/50 px-2.5 py-1 text-[9px] font-mono uppercase tracking-wider text-white backdrop-blur-md">
          <Icon className="h-3 w-3 text-primary" />
          {categoryLabel}
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col justify-between p-5">
        <div>
          <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
            <MapPin className="h-3 w-3 text-primary shrink-0" />
            <span className="font-mono uppercase tracking-wider line-clamp-1">
              {project.location}
            </span>
          </div>

          <h3 className="mt-2 text-base font-bold leading-snug text-foreground line-clamp-2">
            {isAr ? project.nameAr : project.nameEn}
          </h3>

          <div className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground">
            <Briefcase className="h-3 w-3 text-primary/70 shrink-0" />
            <span className="line-clamp-1">{project.client}</span>
          </div>
        </div>

        <div className="mt-5 pt-3 border-t border-border/50">
          <button
            type="button"
            onClick={onOpen}
            className={cn(
              "w-full inline-flex items-center justify-between rounded-xl border border-border/80 bg-background/50 px-3.5 py-2 text-xs font-semibold text-foreground transition-all duration-200 group-hover:border-primary/50 group-hover:bg-primary group-hover:text-primary-foreground",
              isAr && "flex-row-reverse",
            )}
          >
            <span>{isAr ? "عرض التفاصيل" : "View Details"}</span>
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 rtl:-scale-x-100" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

function ProjectDrawer({
  project,
  isAr,
  onClose,
  categoryLabel,
  Icon,
  tone,
}: {
  project: Project;
  isAr: boolean;
  onClose: () => void;
  categoryLabel: string;
  Icon: typeof Building2;
  tone: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[70] flex items-center justify-center p-4 sm:p-6"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="relative z-10 max-h-[90vh] w-full max-w-4xl overflow-hidden rounded-3xl border border-border/80 bg-card shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className={cn(
            "absolute top-4 z-20 flex h-9 w-9 items-center justify-center rounded-full border border-border/80 bg-background/80 text-foreground backdrop-blur-md transition-all hover:border-primary hover:bg-primary hover:text-primary-foreground",
            isAr ? "left-4" : "right-4",
          )}
          aria-label={isAr ? "إغلاق" : "Close"}
        >
          <X className="h-4 w-4" />
        </button>

        <div className="grid max-h-[90vh] overflow-y-auto md:grid-cols-5">
          <div className="relative aspect-[16/10] overflow-hidden md:col-span-2 md:aspect-auto">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${project.image})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <div
              className={cn(
                "absolute inset-0 bg-gradient-to-br opacity-40 mix-blend-multiply",
                tone,
              )}
            />

            <div
              className={cn(
                "absolute top-4 inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-black/50 px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider text-white backdrop-blur-md",
                isAr ? "right-4" : "left-4",
              )}
            >
              <Icon className="h-3.5 w-3.5 text-primary" />
              {categoryLabel}
            </div>
          </div>

          <div className="relative flex flex-col justify-between p-6 md:col-span-3 md:p-8">
            <div>
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <MapPin className="h-3.5 w-3.5 text-primary" />
                <span className="font-mono uppercase tracking-wider">
                  {project.location}
                </span>
              </div>

              <h3 className="mt-3 text-2xl font-bold leading-tight tracking-tight text-foreground sm:text-3xl">
                {isAr ? project.nameAr : project.nameEn}
              </h3>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <DetailRow
                  label={isAr ? "الفئة" : "Category"}
                  value={categoryLabel}
                />
                <DetailRow
                  label={isAr ? "الموقع" : "Location"}
                  value={project.location}
                />
                <DetailRow
                  label={isAr ? "العميل" : "Client"}
                  value={project.client}
                  span={2}
                />
              </div>
            </div>

            <div className="mt-8 flex justify-end">
              <button
                type="button"
                onClick={onClose}
                className="inline-flex h-10 items-center justify-center rounded-xl bg-primary px-6 text-xs font-bold text-primary-foreground shadow-md transition-all hover:bg-primary/90 active:scale-95"
              >
                {isAr ? "إغلاق" : "Close"}
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function DetailRow({
  label,
  value,
  span,
}: {
  label: string;
  value: string;
  span?: number;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-border/70 bg-muted/30 p-3.5",
        span === 2 && "sm:col-span-2",
      )}
    >
      <div className="font-mono text-[9px] uppercase tracking-wider text-muted-foreground">
        {label}
      </div>
      <div className="mt-1 text-xs font-bold text-foreground">{value}</div>
    </div>
  );
}
