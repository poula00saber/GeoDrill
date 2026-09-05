/**
 * Single source of truth for site-wide stats. Every component that displays
 * a stat (years, projects, clients, services) MUST import from here so the
 * numbers stay in lockstep across pages and languages.
 *
 * Verification sources (live on the site today):
 *   - 17 years: matches the About page body text in both EN and AR
 *     ("more than 17 years" / "أكثر من ١٧ سنة")
 *   - 68 projects: counted in the live Projects filter UI (this is the real
 *     delivered-project portfolio count)
 *   - 72+ organizations: matches the Clients section heading
 *     ("72+ organizations trust GEODRILL")
 *   - 14 service areas: matches the homepage subtitle
 *     ("Fourteen specialized service areas...")
 *
 * If you change a number here, also verify it still matches the source.
 */

export interface SiteStat {
  /** Stable ID used as the React key. */
  id: "years" | "serviceAreas" | "projects" | "organizations";
  /** Numeric value, when applicable. Null for text-only stats. */
  value: number | null;
  /** Suffix appended after the number (e.g. "+"). Empty string when none. */
  suffix: string;
  /** Optional fixed text used when `value` is null (e.g. "KSA"). */
  text?: string;
  /** Translation key for the label (looked up in `dict.trust`). */
  labelKey: "years" | "services" | "ksa" | "projects" | "clients";
}

export const SITE_STATS: SiteStat[] = [
  {
    id: "years",
    value: 17,
    suffix: "+",
    labelKey: "years",
  },
  {
    id: "serviceAreas",
    value: 14,
    suffix: "",
    labelKey: "services",
  },
  {
    id: "projects",
    value: 68,
    suffix: "+",
    labelKey: "projects",
  },
  {
    id: "organizations",
    value: 72,
    suffix: "+",
    labelKey: "clients",
  },
];

export function getStat(id: SiteStat["id"]): SiteStat | undefined {
  return SITE_STATS.find((s) => s.id === id);
}