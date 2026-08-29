"use client";

import { useMemo, useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useLanguage } from "@/components/language-provider";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { SECTION_IDS } from "@/lib/content";
import { cn } from "@/lib/utils";

type Category =
  | "groundworks"
  | "structures"
  | "mep"
  | "finishing"
  | "insulation"
  | "industrial";

type Localized = { en: string; ar: string };

type ProjectEntry = {
  category: Category;
  title: Localized;
  meta: {
    sector: Localized;
    scope: Localized;
    location?: Localized;
  };
  thumbnails: string[];
  heroSrc: string;
};

const CATEGORY_ORDER: Category[] = [
  "groundworks",
  "structures",
  "mep",
  "finishing",
  "insulation",
  "industrial",
];

const DEFAULT_CATEGORY_LABELS: Record<Category, { en: string; ar: string }> = {
  groundworks: { en: "Groundworks", ar: "أعمال التربة" },
  structures: { en: "Structures & Steel", ar: "الهياكل والصلب" },
  mep: { en: "MEP", ar: "الكهروميكانيكا" },
  finishing: { en: "Finishing", ar: "التشطيبات" },
  insulation: { en: "Insulation", ar: "العزل" },
  industrial: { en: "Industrial", ar: "الصناعي" },
};

const P = (folder: string, file: string) =>
  `/images/final/projects/${folder}/${file}`;

const PROJECTS: Record<Category, ProjectEntry> = {
  groundworks: {
    category: "groundworks",
    title: {
      en: "Groundworks & Site Development",
      ar: "أعمال التربة وتطوير الموقع",
    },
    meta: {
      sector: { en: "Infrastructure", ar: "البنية التحتية" },
      scope: { en: "Ground Works & Excavation", ar: "أعمال التربة والحفريات" },
    },
    heroSrc: P("01_groundworks", "groundworks_bulldozer_action.jpg"),
    thumbnails: [
      P("01_groundworks", "groundworks_bulldozer_action.jpg"),
      P("01_groundworks", "groundworks_desert_grading.jpg"),
      P("01_groundworks", "groundworks_site_leveling.jpg"),
      P("01_groundworks", "excavation_deep_trench.jpg"),
      P("01_groundworks", "excavation_foundation_pits.jpg"),
      P("01_groundworks", "excavation_trench_wall.jpg"),
      P("01_groundworks", "concrete_column_reinforcement.jpg"),
      P("01_groundworks", "concrete_rebar_footing.jpg"),
      P("01_groundworks", "concrete_slab_reinforcement.jpg"),
      P("01_groundworks", "infrastructure_column_layout.jpg"),
      P("01_groundworks", "infrastructure_compaction_roller.jpg"),
      P("01_groundworks", "infrastructure_trench_layout.jpg"),
    ],
  },
  structures: {
    category: "structures",
    title: {
      en: "Steel Structures & Engineering",
      ar: "الهياكل المعدنية والهندسة",
    },
    meta: {
      sector: { en: "Industrial & Commercial", ar: "الصناعي والتجاري" },
      scope: { en: "Steel Structures", ar: "الهياكل المعدنية" },
    },
    heroSrc: P("02_structures_and_steel", "steel_frame_erection_wide.jpg"),
    thumbnails: [
      P("02_structures_and_steel", "steel_frame_erection_wide.jpg"),
      P("02_structures_and_steel", "steel_crane_lifting.jpg"),
      P("02_structures_and_steel", "steel_frame_closeup_sky.jpg"),
      P("02_structures_and_steel", "steel_frame_industrial_tanks.jpg"),
      P("02_structures_and_steel", "steel_interior_beams_lighting.jpg"),
      P("02_structures_and_steel", "steel_interior_open_frame2.jpg"),
      P("02_structures_and_steel", "steel_modular_exterior.jpg"),
      P("02_structures_and_steel", "steel_modular_units_desert.jpg"),
      P("02_structures_and_steel", "steel_modular_units_row.jpg"),
      P("02_structures_and_steel", "steel_panel_ladder_detail.jpg"),
      P("02_structures_and_steel", "steel_roof_access_lift.jpg"),
      P("02_structures_and_steel", "steel_roof_truss_angle.jpg"),
      P("02_structures_and_steel", "steel_warehouse_exterior_pipes.jpg"),
      P("02_structures_and_steel", "steel_warehouse_exterior_red.jpg"),
      P("02_structures_and_steel", "steel_warehouse_exterior_tan.jpg"),
      P("02_structures_and_steel", "steel_warehouse_frame_complete.jpg"),
      P("new_towers_highrise", "highrise_steel_frame_tower_crane.jpg"),
      P("new_towers_highrise", "multiple_tower_cranes_site.jpg"),
      P("new_towers_highrise", "residential_tower_facade_progress.jpg"),
      P("new_steel_variety", "steel_frame_complete_blockwork.jpg"),
      P("new_steel_variety", "steel_frame_exterior_wall_low.jpg"),
    ],
  },
  mep: {
    category: "mep",
    title: {
      en: "MEP & Building Systems",
      ar: "الأعمال الكهروميكانيكية وأنظمة المباني",
    },
    meta: {
      sector: { en: "General Contracting", ar: "التعاقد العام" },
      scope: { en: "MEP Works", ar: "الأعمال الكهروميكانيكية" },
    },
    heroSrc: P("03_mep", "mep_hvac_plantroom.jpg"),
    thumbnails: [
      P("03_mep", "mep_hvac_plantroom.jpg"),
      P("03_mep", "mep_basement_plant_room.jpg"),
      P("03_mep", "mep_ceiling_ductwork_red_pipes.jpg"),
      P("03_mep", "mep_ceiling_warehouse.jpg"),
      P("03_mep", "mep_interior_beam_lighting.jpg"),
      P("03_mep", "mep_underfloor_conduit_closeup.jpg"),
      P("03_mep", "mep_underfloor_conduit_slab.jpg"),
      P("new_mep_variety", "mep_copper_acoustic_ceiling_panels.jpg"),
      P("new_mep_variety", "mep_pex_plumbing_red_blue.jpg"),
      P("new_mep_variety", "mep_fire_pump_enclosure_cage.jpg"),
      P("new_mep_variety", "mep_water_pump_ksb_blue.jpg"),
    ],
  },
  finishing: {
    category: "finishing",
    title: { en: "Precision Finishing Works", ar: "أعمال التشطيبات الدقيقة" },
    meta: {
      sector: { en: "Hospitality & Residential", ar: "الضيافة والسكني" },
      scope: { en: "Finishing Works", ar: "أعمال التشطيبات" },
    },
    heroSrc: P("04_finishing", "finishing_lobby_reception.jpg"),
    thumbnails: [
      P("04_finishing", "finishing_lobby_reception.jpg"),
      P("04_finishing", "finishing_bathroom_marble.jpg"),
      P("04_finishing", "finishing_bathroom_marble_2.jpg"),
      P("04_finishing", "finishing_bedroom_suite.jpg"),
      P("04_finishing", "finishing_bedroom_wood_floor.jpg"),
      P("04_finishing", "finishing_corridor_hallway.jpg"),
      P("04_finishing", "finishing_glass_office_partition.jpg"),
      P("04_finishing", "finishing_living_room_millwork.jpg"),
      P("04_finishing", "finishing_open_ceiling_lights.jpg"),
      P("04_finishing", "finishing_staircase_glass_rail.jpg"),
      P("04_finishing", "finishing_staircase_wood_floor.jpg"),
      P("04_finishing", "finishing_window_black_frame.jpg"),
      P("new_finishing_villa", "villa_hallway_marble_medallion.jpg"),
      P("new_finishing_residential", "finishing_kitchen_white_modern.jpg"),
      P("new_finishing_named_projects", "gso_building_night_facade.jpg"),
      P("new_finishing_named_projects", "hamc_lounge_reception_render.jpg"),
      P("new_finishing_commercial", "finishing_lobby_stairs_marble.jpg"),
    ],
  },
  insulation: {
    category: "insulation",
    title: {
      en: "Waterproofing & Insulation",
      ar: "العزل ومقاومة المياه",
    },
    meta: {
      sector: { en: "Industrial & Commercial", ar: "الصناعي والتجاري" },
      scope: { en: "Waterproofing & Insulation", ar: "العزل ومقاومة المياه" },
    },
    heroSrc: P(
      "05_waterproofing_and_insulation",
      "insulation_rooftop_finished.jpg",
    ),
    thumbnails: [
      P("05_waterproofing_and_insulation", "insulation_rooftop_finished.jpg"),
      P("05_waterproofing_and_insulation", "insulation_bridge_deck_waterproof.jpg"),
      P("05_waterproofing_and_insulation", "insulation_drainage_cells.jpg"),
      P("05_waterproofing_and_insulation", "insulation_epoxy_corridor_floor.jpg"),
      P("05_waterproofing_and_insulation", "insulation_epoxy_floor_dots.jpg"),
      P("05_waterproofing_and_insulation", "insulation_membrane_seam_detail.jpg"),
      P("05_waterproofing_and_insulation", "insulation_pool_waterproofing.jpg"),
      P("05_waterproofing_and_insulation", "insulation_rooftop_curved_coating.jpg"),
      P("05_waterproofing_and_insulation", "insulation_rooftop_hvac_units.jpg"),
      P("05_waterproofing_and_insulation", "insulation_rooftop_membrane_wet.jpg"),
      P("05_waterproofing_and_insulation", "insulation_rooftop_white_coating.jpg"),
      P("05_waterproofing_and_insulation", "insulation_warehouse_floor_pour.jpg"),
      P("05_waterproofing_and_insulation", "insulation_warehouse_floor_wide.jpg"),
    ],
  },
  industrial: {
    category: "industrial",
    title: {
      en: "Industrial Facility Construction",
      ar: "إنشاء المنشآت الصناعية",
    },
    meta: {
      sector: { en: "Industrial", ar: "الصناعي" },
      scope: {
        en: "Steel Structures & MEP",
        ar: "الهياكل المعدنية والكهروميكانيكا",
      },
    },
    heroSrc: P("06_industrial", "sector_industrial.jpg"),
    thumbnails: [
      P("06_industrial", "sector_industrial.jpg"),
      P("06_industrial", "steel_frame_industrial_tanks.jpg"),
      P("06_industrial", "steel_warehouse_exterior_pipes.jpg"),
      P("new_misc_industrial", "steel_frame_silo_tank_structure.jpg"),
      P("new_towers_highrise", "tower_crane_skyline_view.jpg"),
    ],
  },
};

const tabs: Category[] = CATEGORY_ORDER;
const FADE = { duration: 0.28, ease: "easeOut" } as const;

export function Projects() {
  const { t, lang } = useLanguage();
  const p = t.projects;

  const override = (
    p as { categories?: Partial<Record<Category, string>> }
  ).categories;
  const labelOf = (key: Category) =>
    override?.[key] ?? DEFAULT_CATEGORY_LABELS[key][lang];

  const [activeTab, setActiveTab] = useState<Category>("groundworks");
  const [focused, setFocused] = useState(0);
  const thumbContainerRef = useRef<HTMLDivElement>(null);
  // Tracks the direction of the last photo step so the hero can slide into
  // view following the site's reading direction (next/prev respected per
  // language: English slides right-to-left, Arabic slides left-to-right).
  const navDirRef = useRef<1 | -1>(1);

  const displayed: Category = activeTab;
  const entry = PROJECTS[displayed];
  const heroIdx = Math.min(focused, entry.thumbnails.length - 1);
  const heroSrc = entry.thumbnails[heroIdx];

  const isAr = lang === "ar";
  // Slide offset direction per language. For "next":
  //  - EN (LTR): photo enters from the right and moves left (rtl motion)
  //  - AR (RTL): photo enters from the left and moves right (ltr motion)
  // For "prev" the directions are reversed.
  const enterX =
    navDirRef.current === 1 ? (isAr ? -60 : 60) : isAr ? 60 : -60;
  const exitX = -enterX;

  const selectCategory = (tab: Category) => {
    setActiveTab(tab);
    setFocused(0);
    navDirRef.current = 1;
  };

  // Step strictly inside current category's thumbnails array
  const stepPhoto = (dir: 1 | -1) => {
    navDirRef.current = dir;
    const total = entry.thumbnails.length;
    setFocused((prev) => (prev + dir + total) % total);
  };

  // Keep the active thumbnail horizontally centered inside the filmstrip
  // WITHOUT scrolling the page — scrollIntoView would jump the page down to
  // the projects section on mount, so we adjust only the container's scrollLeft.
  useEffect(() => {
    const container = thumbContainerRef.current;
    if (!container) return;
    const activeEl = container.children[heroIdx] as HTMLElement | undefined;
    if (!activeEl) return;
    const targetLeft =
      activeEl.offsetLeft - container.clientWidth / 2 + activeEl.clientWidth / 2;
    container.scrollTo({ left: Math.max(0, targetLeft), behavior: "smooth" });
  }, [heroIdx, displayed]);

  const meta = useMemo(
    () => [
      {
        label: lang === "ar" ? "القطاع" : "Sector",
        value: entry.meta.sector[lang],
      },
      {
        label: lang === "ar" ? "النطاق" : "Scope",
        value: entry.meta.scope[lang],
      },
      ...(entry.meta.location
        ? [
            {
              label: lang === "ar" ? "الموقع" : "Location",
              value: (entry.meta.location as Localized)[lang],
            },
          ]
        : []),
    ],
    [lang, entry],
  );

  return (
    <section id={SECTION_IDS.projects} className="bg-background py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <SectionHeading
            kicker={p.kicker}
            title={p.title}
            sub={p.sub}
            align="center"
          />
        </Reveal>

        {/* 1 — Category Pill Bar */}
        <Reveal className="mt-10">
          <div className="flex flex-wrap items-center justify-center gap-3">
            {tabs.map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => selectCategory(tab)}
                className={cn(
                  "rounded-full border-2 px-5 py-2.5 text-sm font-bold uppercase tracking-wide transition-all duration-300",
                  activeTab === tab
                    ? "border-teal bg-teal text-navy shadow-lg shadow-teal/30"
                    : "border-teal/40 bg-teal/5 text-teal hover:border-teal/70 hover:bg-teal/10",
                )}
              >
                {labelOf(tab)}
              </button>
            ))}
          </div>
        </Reveal>

        {/* 2 — Hero Showcase & Lowered Scrollable Filmstrip */}
        <Reveal className="mt-12">
          <div className="relative pb-10">
            {/* Main Hero Container (Scales up & elevates z-index on hover) */}
            <div className="group relative z-0 h-[70vh] min-h-[420px] w-full overflow-hidden rounded-3xl bg-navy/95 transition-all duration-500 ease-out hover:z-30 hover:scale-[1.02] hover:shadow-2xl">
              <AnimatePresence mode="wait">
                <motion.div
                  key={heroSrc}
                  initial={{ opacity: 0, x: enterX }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: exitX }}
                  transition={FADE}
                  className="absolute inset-0 flex items-center justify-center p-4"
                >
                  <Image
                    src={heroSrc}
                    alt={entry.title[lang]}
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, 90vw"
                    className="object-contain"
                  />
                </motion.div>
              </AnimatePresence>

              {/* Dark Gradient Overlay */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/20 to-transparent" />

              {/* Badge Top-End — single pill, no duplicate */}
              <div className="absolute end-6 top-6 z-10">
                <span className="rounded-full border border-teal/60 bg-navy/40 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-wide text-teal backdrop-blur-sm">
                  {DEFAULT_CATEGORY_LABELS[displayed][lang]}
                </span>
              </div>

              {/* Title & Meta Bottom-Start */}
              <div className="absolute bottom-20 start-6 end-6 z-10 sm:bottom-24 sm:start-10 sm:end-10">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`${entry.category}-${heroIdx}`}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={FADE}
                  >
                    <h3 className="w-fit rounded-xl bg-navy/90 px-6 py-3 text-xl font-bold text-white backdrop-blur-sm md:text-2xl">
                      {entry.title[lang]}
                    </h3>

                    <ul className="mt-4 flex flex-col gap-1.5 sm:flex-row sm:flex-wrap sm:gap-x-8 sm:gap-y-1.5">
                      {meta.map((m) => (
                        <li
                          key={m.label}
                          className="flex items-center gap-2 text-sm text-white/90"
                        >
                          <span className="size-1.5 shrink-0 rounded-full bg-teal" />
                          <span className="font-semibold">{m.label}:</span>
                          <span className="text-white/75">{m.value}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Previous / Next Arrows (Navigates through current category's photos) */}
              <button
                type="button"
                onClick={() => stepPhoto(-1)}
                aria-label={lang === "ar" ? "السابق" : "Previous"}
                className="absolute start-4 top-1/2 z-20 -translate-y-1/2 inline-flex size-11 items-center justify-center rounded-full bg-teal text-navy shadow-lg shadow-teal/30 transition-transform hover:scale-110 active:scale-95"
              >
                <ChevronLeft className="size-6 rtl:-scale-x-100" />
              </button>
              <button
                type="button"
                onClick={() => stepPhoto(1)}
                aria-label={lang === "ar" ? "التالي" : "Next"}
                className="absolute end-4 top-1/2 z-20 -translate-y-1/2 inline-flex size-11 items-center justify-center rounded-full bg-teal text-navy shadow-lg shadow-teal/30 transition-transform hover:scale-110 active:scale-95"
              >
                <ChevronRight className="size-6 rtl:-scale-x-100" />
              </button>
            </div>

            {/* 3 — Lowered Filmstrip (Shows ALL photos for active category) */}
            <div className="relative z-10 -mt-6 px-2 sm:-mt-8 sm:px-8">
              <div
                ref={thumbContainerRef}
                className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-none sm:gap-3"
              >
                {entry.thumbnails.map((src, i) => (
                  <button
                    key={`${entry.category}-${i}`}
                    type="button"
                    onClick={() => setFocused(i)}
                    aria-label={entry.title[lang]}
                    className={cn(
                      "group relative aspect-[4/3] w-28 shrink-0 overflow-hidden rounded-xl border-2 bg-navy transition-all duration-300 sm:w-36",
                      heroIdx === i
                        ? "border-teal shadow-md shadow-teal/20 scale-105"
                        : "border-transparent opacity-70 hover:opacity-100",
                    )}
                  >
                    <Image
                      src={src}
                      alt=""
                      fill
                      sizes="(max-width: 768px) 112px, 144px"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <span className="absolute inset-0 bg-navy/0 transition-colors group-hover:bg-navy/10" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
