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
        "relative overflow-hidden bg-background py-12 sm:py-16 md:py-20",
        className,
      )}
    >
      {/* Soft background glow */}
      <div className="pointer-events-none absolute -left-24 top-1/4 h-72 w-72 rounded-full bg-primary/10 blur-[100px]" />
      <div className="pointer-events-none absolute -right-24 bottom-1/4 h-72 w-72 rounded-full bg-amber-500/10 blur-[100px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Category filter chips (single set of buttons) */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-8"
        >
          <StatChip
            label={isAr ? "الكل" : "All"}
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
          ).map((cat) => (
            <StatChip
              key={cat}
              label={t.filters[cat]}
              value={counts[cat]}
              icon={CATEGORY_ICONS[cat]}
              active={active === cat}
              onClick={() => setActive(cat)}
            />
          ))}
        </motion.div>

        {/* Search only */}
        <div className="mt-6 flex justify-end">
          <div className="relative w-full sm:w-80">
            <Search
              className={cn(
                "pointer-events-none absolute top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground",
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
                "w-full rounded-xl border border-border/70 bg-background/80 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/60 shadow-sm transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20",
                isAr ? "pr-10 pl-9" : "pl-10 pr-9",
              )}
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                className={cn(
                  "absolute top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
                  isAr ? "left-2.5" : "right-2.5",
                )}
                aria-label={isAr ? "مسح" : "Clear"}
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Featured */}
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
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-8 rounded-2xl border border-dashed border-border/70 bg-muted/20 p-10 text-center"
          >
            <Search className="mx-auto h-6 w-6 text-muted-foreground" />
            <p className="mt-3 text-sm font-semibold text-foreground">
              {isAr ? "لا توجد نتائج" : "No matching projects"}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              {isAr
                ? "جرب كلمة بحث مختلفة أو غيّر الفلتر."
                : "Try a different search or filter."}
            </p>
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setActive("all");
              }}
              className="mt-5 inline-flex h-9 items-center gap-2 rounded-lg border border-primary/40 bg-primary/10 px-4 text-xs font-semibold text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
            >
              {isAr ? "إعادة الضبط" : "Reset filters"}
            </button>
          </motion.div>
        )}

        {/* CTA */}
        {!showAll && visible.length > 0 && (
          <div className="mt-10 flex justify-center">
            <Link
              href={`/geotechnical/${locale}/projects`}
              className="group inline-flex items-center gap-2 rounded-xl bg-primary px-7 py-3 text-sm font-bold text-primary-foreground shadow-md shadow-primary/25 transition-all hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/30 active:scale-[0.98] rtl:flex-row-reverse"
            >
              <span>{t.viewAll}</span>
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 rtl:-scale-x-100" />
            </Link>
          </div>
        )}
      </div>

      {/* Drawer */}
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
        "group flex items-center gap-2.5 rounded-xl border p-2.5 text-start transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
        active
          ? "border-primary bg-primary/10 shadow-sm shadow-primary/10"
          : "border-border/70 bg-background/60 hover:border-primary/40 hover:bg-background",
      )}
    >
      <div
        className={cn(
          "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border transition-colors",
          active
            ? "border-primary/40 bg-primary text-primary-foreground"
            : "border-border/60 bg-muted/40 text-muted-foreground group-hover:text-primary",
        )}
      >
        <Icon className="h-3.5 w-3.5" strokeWidth={1.75} />
      </div>
      <div className="min-w-0">
        <div className="truncate font-mono text-[9px] uppercase tracking-wider text-muted-foreground">
          {label}
        </div>
        <div className="text-sm font-bold text-foreground">{value}</div>
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
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="group relative mt-6 overflow-hidden rounded-2xl border border-border/70 bg-card shadow-lg transition-colors hover:border-primary/40"
    >
      <div className="grid md:grid-cols-5">
        <div className="relative aspect-[16/9] overflow-hidden md:col-span-3 md:aspect-auto md:min-h-[320px]">
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
            style={{ backgroundImage: `url(${project.image})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent md:bg-gradient-to-r md:from-transparent md:via-black/10 md:to-black/60" />
          <div className="absolute start-4 top-4 flex items-center gap-1.5 rounded-full border border-white/20 bg-black/40 px-3 py-1.5 text-[10px] font-mono uppercase tracking-widest text-white backdrop-blur-md">
            <Icon className="h-3.5 w-3.5 text-primary" />
            {categoryLabel}
          </div>
        </div>

        <div className="relative flex flex-col justify-between p-6 md:col-span-2 md:p-7">
          <div
            className={cn(
              "absolute inset-0 bg-gradient-to-br opacity-15 pointer-events-none",
              tone,
            )}
          />
          <div className="relative">
            <span className="inline-block rounded-full border border-primary/20 bg-primary/10 px-2.5 py-0.5 font-mono text-[10px] font-bold uppercase tracking-widest text-primary">
              {isAr ? "مشروع مميز" : "Featured"}
            </span>
            <div className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground">
              <MapPin className="h-3.5 w-3.5 text-primary shrink-0" />
              <span className="font-mono uppercase tracking-wider">
                {project.location}
              </span>
            </div>
            <h3 className="mt-2 text-xl font-bold leading-snug text-foreground sm:text-2xl">
              {isAr ? project.nameAr : project.nameEn}
            </h3>
            <div className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground">
              <Briefcase className="h-3.5 w-3.5 text-primary shrink-0" />
              <span className="line-clamp-1">{project.client}</span>
            </div>
          </div>

          <div className="relative mt-6">
            <button
              type="button"
              onClick={onOpen}
              className={cn(
                "inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-xs font-bold text-primary-foreground shadow-md shadow-primary/20 transition-all hover:bg-primary/90 active:scale-[0.98]",
                isAr && "flex-row-reverse",
              )}
            >
              <span>{isAr ? "عرض التفاصيل" : "View Details"}</span>
              <ArrowUpRight className="h-3.5 w-3.5 rtl:-scale-x-100" />
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
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25, delay: Math.min(index * 0.03, 0.2) }}
      className={cn(
        "group flex flex-col overflow-hidden rounded-2xl border bg-card transition-all duration-300",
        isOpen
          ? "border-primary/60 shadow-lg shadow-primary/10"
          : "border-border/70 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5",
      )}
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
          style={{ backgroundImage: `url(${project.image})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
        <div className="absolute end-3 top-3 inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-black/50 px-2.5 py-1 text-[9px] font-mono uppercase tracking-wider text-white backdrop-blur-md">
          <Icon className="h-3 w-3 text-primary" />
          {categoryLabel}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
          <MapPin className="h-3 w-3 text-primary shrink-0" />
          <span className="font-mono uppercase tracking-wider line-clamp-1">
            {project.location}
          </span>
        </div>
        <h3 className="mt-1.5 line-clamp-2 text-sm font-bold leading-snug text-foreground">
          {isAr ? project.nameAr : project.nameEn}
        </h3>
        <div className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground">
          <Briefcase className="h-3 w-3 text-primary/70 shrink-0" />
          <span className="line-clamp-1">{project.client}</span>
        </div>

        <button
          type="button"
          onClick={onOpen}
          className={cn(
            "mt-4 flex w-full items-center justify-between rounded-lg border border-border/70 bg-background/50 px-3 py-2 text-xs font-semibold text-foreground transition-colors group-hover:border-primary/50 group-hover:bg-primary group-hover:text-primary-foreground",
            isAr && "flex-row-reverse",
          )}
        >
          <span>{isAr ? "عرض التفاصيل" : "View Details"}</span>
          <ArrowUpRight className="h-3.5 w-3.5 rtl:-scale-x-100" />
        </button>
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
      <div className="absolute inset-0 bg-black/75 backdrop-blur-sm" />

      <motion.div
        initial={{ opacity: 0, scale: 0.97, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.97, y: 16 }}
        transition={{ duration: 0.25 }}
        className="relative z-10 max-h-[90vh] w-full max-w-4xl overflow-hidden rounded-2xl border border-border/70 bg-card shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className={cn(
            "absolute top-3 z-20 flex h-9 w-9 items-center justify-center rounded-full border border-border/70 bg-background/90 text-foreground transition-colors hover:border-primary hover:bg-primary hover:text-primary-foreground",
            isAr ? "left-3" : "right-3",
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
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
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

          <div className="relative flex flex-col justify-between p-6 md:col-span-3 md:p-7">
            <div>
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <MapPin className="h-3.5 w-3.5 text-primary" />
                <span className="font-mono uppercase tracking-wider">
                  {project.location}
                </span>
              </div>
              <h3 className="mt-2 text-2xl font-bold leading-tight text-foreground sm:text-3xl">
                {isAr ? project.nameAr : project.nameEn}
              </h3>

              <div className="mt-5 grid gap-2.5 sm:grid-cols-2">
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

            <div className="mt-6 flex justify-end">
              <button
                type="button"
                onClick={onClose}
                className="inline-flex h-10 items-center rounded-xl bg-primary px-5 text-xs font-bold text-primary-foreground transition-colors hover:bg-primary/90 active:scale-[0.98]"
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
        "rounded-xl border border-border/60 bg-muted/30 p-3",
        span === 2 && "sm:col-span-2",
      )}
    >
      <div className="font-mono text-[9px] uppercase tracking-wider text-muted-foreground">
        {label}
      </div>
      <div className="mt-0.5 text-xs font-semibold text-foreground">
        {value}
      </div>
    </div>
  );
}
