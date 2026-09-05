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
      active === "all" ? projects : projects.filter((p) => p.category === active);
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

  const openProject = openId ? visible.find((p) => p.id === openId) ?? null : null;
  const OpenIcon = openProject ? CATEGORY_ICONS[openProject.category] : Building2;
  const openTone = openProject ? CATEGORY_TONE[openProject.category] : "";

  return (
    <section
      id="projects"
      className={cn(
        "relative overflow-hidden",
        "bg-gradient-to-b from-primary/10 via-primary/5 to-amber-500/10",
        "py-20 sm:py-28 md:py-32",
        className,
      )}
    >
      {/* Soft gold orbs */}
      <div className="pointer-events-none absolute -left-32 top-1/4 h-80 w-80 rounded-full bg-primary/15 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 bottom-1/4 h-80 w-80 rounded-full bg-amber-500/15 blur-3xl" />
      {/* Grid overlay */}
      <div className="pointer-events-none absolute inset-0 bg-grid-sm opacity-[0.05]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Eyebrow + heading */}
        <div className="mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.4 }}
            className="mb-3 flex items-center justify-center gap-3"
          >
            <span className="h-px w-8 bg-primary" />
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-primary">
              {t.eyebrow}
            </span>
            <span className="h-px w-8 bg-primary" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
            className="text-balance text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl"
          >
            {t.title}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="mt-4 text-balance text-base text-muted-foreground sm:text-lg"
          >
            {t.subtitle}
          </motion.p>
        </div>

        {/* Stat strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7"
        >
          <StatChip
            label={isAr ? "إجمالي المشاريع" : "Total Projects"}
            value={counts.all}
            icon={Layers}
            tone="primary"
            active={active === "all"}
          />
          {(
            ["geotechnical", "geophysical", "survey", "testing", "structural", "slope"] as ProjectCategory[]
          ).map((cat) => {
            const Icon = CATEGORY_ICONS[cat];
            return (
              <StatChip
                key={cat}
                label={t.filters[cat]}
                value={counts[cat]}
                icon={Icon}
                tone={cat}
                active={active === cat}
              />
            );
          })}
        </motion.div>

        {/* Search + filter bar */}
        <div className="mt-10 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          {/* Filter pills with sliding indicator */}
          <LayoutGroup id="filter-pills">
            <div className="flex flex-wrap gap-1.5 rounded-2xl border border-border/60 bg-background/60 p-1.5 backdrop-blur-sm">
              {FILTER_ORDER.map((f) => (
                <button
                  key={f}
                  type="button"
                  onClick={() => setActive(f)}
                  className={cn(
                    "relative rounded-xl px-3.5 py-1.5 text-xs font-medium transition-colors",
                    active === f
                      ? "text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {active === f && (
                    <motion.span
                      layoutId="filter-pill-indicator"
                      className="absolute inset-0 rounded-xl bg-primary shadow-md shadow-primary/30"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative">{filterLabel(f)}</span>
                </button>
              ))}
            </div>
          </LayoutGroup>

          {/* Search */}
          <div className="relative w-full lg:w-72">
            <Search
              className={cn(
                "pointer-events-none absolute top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground",
                isAr ? "right-3" : "left-3",
              )}
            />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={
                isAr ? "ابحث عن مشروع، موقع، عميل..." : "Search project, location, client…"
              }
              className={cn(
                "w-full rounded-xl border border-border/60 bg-background/60 py-2 text-xs text-foreground placeholder:text-muted-foreground/60 backdrop-blur-sm transition-colors focus:border-primary/60 focus:outline-none focus:ring-2 focus:ring-primary/20",
                isAr ? "pr-9 pl-9" : "pl-9 pr-9",
              )}
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                className={cn(
                  "absolute top-1/2 h-6 w-6 -translate-y-1/2 rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
                  isAr ? "left-2" : "right-2",
                )}
                aria-label={isAr ? "مسح" : "Clear"}
              >
                <X className="mx-auto h-3.5 w-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Featured project (bento, full width) */}
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
            className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          >
            <AnimatePresence mode="popLayout">
              {(query || active !== "all" ? visible : rest).map((project, i) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={i}
                  isAr={isAr}
                  isOpen={openId === project.id}
                  onOpen={() => setOpenId(project.id)}
                  categoryLabel={t.filters[project.category]}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        </LayoutGroup>

        {/* Empty state */}
        {visible.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-10 rounded-2xl border border-dashed border-border/60 bg-background/40 p-10 text-center"
          >
            <Search className="mx-auto h-6 w-6 text-muted-foreground" />
            <p className="mt-3 text-sm font-medium text-foreground">
              {isAr ? "لا توجد نتائج" : "No matching projects"}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              {isAr
                ? "جرب كلمة بحث مختلفة أو غيّر الفلتر."
                : "Try a different search term or filter."}
            </p>
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setActive("all");
              }}
              className="mt-4 inline-flex h-9 items-center gap-2 rounded-lg border border-primary/40 bg-primary/10 px-4 text-xs font-semibold text-primary transition-colors hover:bg-primary/20"
            >
              {isAr ? "إعادة الضبط" : "Reset filters"}
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
            className="group inline-flex items-center gap-2 rounded-xl border-2 border-primary bg-transparent px-6 py-3 text-sm font-bold uppercase tracking-wide text-foreground transition-all duration-300 hover:bg-primary hover:text-primary-foreground hover:shadow-lg hover:shadow-primary/30 rtl:flex-row-reverse"
          >
            {t.viewAll}
            <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 rtl:-scale-x-100" />
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
  tone,
  active,
}: {
  label: string;
  value: number;
  icon: typeof Building2;
  tone: ProjectCategory | "primary";
  active: boolean;
}) {
  return (
    <div
      className={cn(
        "relative flex items-center gap-2.5 overflow-hidden rounded-xl border bg-background/60 p-3 backdrop-blur-sm transition-all",
        active
          ? "border-primary/60 shadow-md shadow-primary/15"
          : "border-border/60 hover:border-primary/30",
      )}
    >
      <div
        className={cn(
          "flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg border",
          active
            ? "border-primary/40 bg-primary/15 text-primary"
            : "border-border/60 bg-surface/50 text-muted-foreground",
        )}
      >
        <Icon className="h-4 w-4" strokeWidth={1.75} />
      </div>
      <div className="min-w-0">
        <div className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground">
          {label}
        </div>
        <div className="text-base font-bold leading-tight text-foreground sm:text-lg">
          {value}
        </div>
      </div>
    </div>
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
    <motion.button
      type="button"
      onClick={onOpen}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6 }}
      className="group relative mt-10 grid w-full overflow-hidden rounded-3xl border border-border/60 bg-card text-start shadow-lg shadow-primary/5 transition-all hover:shadow-2xl hover:shadow-primary/15 md:grid-cols-5"
    >
      {/* Image */}
      <div className="relative aspect-[16/9] overflow-hidden md:col-span-3 md:aspect-auto md:h-full">
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
          style={{ backgroundImage: `url(${project.image})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-black/70 via-black/20 to-transparent" />
        <div className="absolute inset-0 bg-grid-sm opacity-[0.08]" />

        {/* Floating badge */}
        <div
          className={cn(
            "absolute start-4 top-4 inline-flex items-center gap-2 rounded-full border bg-background/70 px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest text-primary backdrop-blur-md",
            "border-primary/40",
          )}
        >
          <Icon className="h-3.5 w-3.5" />
          {categoryLabel}
        </div>

        {/* Floating project # */}
        <div className="absolute bottom-4 end-4 font-mono text-[10px] uppercase tracking-widest text-white/70">
          {isAr ? "مشروع مميز" : "Featured Project"}
        </div>
      </div>

      {/* Content */}
      <div className="relative flex flex-col justify-center gap-4 p-6 md:col-span-2 md:p-8 lg:p-10">
        <div className={cn("absolute inset-0 bg-gradient-to-br opacity-30", tone)} />

        <div className="relative">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <MapPin className="h-3 w-3 text-primary" />
            <span className="font-mono uppercase tracking-widest">
              {project.location}
            </span>
          </div>
          <h3 className="mt-3 text-balance text-xl font-bold leading-tight text-foreground sm:text-2xl lg:text-3xl">
            {isAr ? project.nameAr : project.nameEn}
          </h3>

          <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
            <Briefcase className="h-3 w-3 text-primary" />
            <span className="line-clamp-1">{project.client}</span>
          </div>

          <div
            className={cn(
              "mt-6 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-primary transition-transform duration-300",
              isAr ? "flex-row-reverse" : "",
              "group-hover:translate-x-1 rtl:group-hover:-translate-x-1",
            )}
          >
            <span>{isAr ? "عرض التفاصيل" : "View details"}</span>
            <ArrowUpRight className="h-3.5 w-3.5 rtl:-scale-x-100" />
          </div>
        </div>
      </div>

      {/* Animated bottom rule */}
      <div className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-gradient-to-r from-primary/0 via-primary to-primary/0 transition-transform duration-700 group-hover:scale-x-100" />
    </motion.button>
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
  const tone = CATEGORY_TONE[project.category];

  return (
    <motion.button
      type="button"
      onClick={onOpen}
      layout
      initial={{ opacity: 0, scale: 0.96, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.35, delay: Math.min(index * 0.04, 0.3) }}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-2xl border bg-card text-start transition-all duration-500",
        isOpen
          ? "border-primary/70 shadow-xl shadow-primary/15"
          : "border-border/60 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/10",
      )}
      aria-pressed={isOpen}
    >
      {/* Image */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted">
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
          style={{ backgroundImage: `url(${project.image})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
        <div className="absolute inset-0 bg-grid-sm opacity-[0.07]" />

        {/* Category badge */}
        <div
          className={cn(
            "absolute end-3 top-3 inline-flex items-center gap-1.5 rounded-full border bg-background/70 px-2.5 py-1 font-mono text-[9px] uppercase tracking-widest backdrop-blur-md",
            "border-primary/40 text-primary",
          )}
        >
          <Icon className="h-3 w-3" strokeWidth={2} />
          {categoryLabel}
        </div>

        {/* Hover overlay icon */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-500 group-hover:opacity-100">
          <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/40 bg-black/40 backdrop-blur-md transition-transform duration-500 group-hover:scale-100 scale-75">
            <ArrowUpRight className="h-5 w-5 text-white rtl:-scale-x-100" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="relative flex flex-1 flex-col gap-2 p-4">
        <div className={cn("absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity duration-500 group-hover:opacity-30", tone)} />

        <div className="relative flex items-center gap-1.5 text-[10px] text-muted-foreground">
          <MapPin className="h-3 w-3 text-primary" />
          <span className="font-mono uppercase tracking-widest line-clamp-1">
            {project.location}
          </span>
        </div>

        <h3 className="relative text-balance text-sm font-bold leading-snug text-foreground sm:text-base line-clamp-2">
          {isAr ? project.nameAr : project.nameEn}
        </h3>

        <div className="relative mt-auto flex items-center gap-1.5 text-[10px] text-muted-foreground">
          <Briefcase className="h-3 w-3 text-primary/70" />
          <span className="line-clamp-1">{project.client}</span>
        </div>
      </div>

      {/* Animated gold rule */}
      <div className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-gradient-to-r from-primary/0 via-primary to-primary/0 transition-transform duration-500 group-hover:scale-x-100" />
    </motion.button>
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
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[70] flex items-center justify-center p-4 sm:p-6"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 30, scale: 0.95 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="relative z-10 max-h-[90vh] w-full max-w-4xl overflow-hidden rounded-2xl border border-border/60 bg-card shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          type="button"
          onClick={onClose}
          className={cn(
            "absolute top-3 z-20 flex h-9 w-9 items-center justify-center rounded-full border border-border/60 bg-background/80 text-foreground backdrop-blur-md transition-colors hover:border-primary hover:text-primary",
            isAr ? "left-3" : "right-3",
          )}
          aria-label={isAr ? "إغلاق" : "Close"}
        >
          <X className="h-4 w-4" />
        </button>

        <div className="grid max-h-[90vh] overflow-y-auto md:grid-cols-5">
          {/* Image */}
          <div className="relative aspect-[16/10] overflow-hidden md:col-span-2 md:aspect-auto">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${project.image})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-black/70 via-transparent to-transparent" />
            <div
              className={cn(
                "absolute inset-0 bg-gradient-to-br opacity-50 mix-blend-multiply",
                tone,
              )}
            />

            <div
              className={cn(
                "absolute top-4 inline-flex items-center gap-2 rounded-full border border-primary/40 bg-background/80 px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest text-primary backdrop-blur-md",
                isAr ? "right-4" : "left-4",
              )}
            >
              <Icon className="h-3 w-3" />
              {categoryLabel}
            </div>
          </div>

          {/* Content */}
          <div className="relative md:col-span-3 md:p-8">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <MapPin className="h-3 w-3 text-primary" />
              <span className="font-mono uppercase tracking-widest">
                {project.location}
              </span>
            </div>

            <h3 className="mt-3 text-balance text-2xl font-bold leading-tight tracking-tight text-foreground sm:text-3xl">
              {isAr ? project.nameAr : project.nameEn}
            </h3>

            <p className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
              <Briefcase className="h-3.5 w-3.5 text-primary" />
              <span>{project.client}</span>
            </p>

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

            <div className="mt-8 flex items-center gap-3">
              <button
                type="button"
                onClick={onClose}
                className="inline-flex h-10 items-center gap-2 rounded-xl border border-border bg-background px-5 text-xs font-semibold text-foreground transition-colors hover:border-primary/50 hover:text-primary"
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
        "rounded-xl border border-border/60 bg-surface/50 p-3",
        span === 2 && "sm:col-span-2",
      )}
    >
      <div className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground">
        {label}
      </div>
      <div className="mt-1 text-sm font-semibold text-foreground">{value}</div>
    </div>
  );
}