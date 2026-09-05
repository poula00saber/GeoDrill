"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/geotech/components/providers/language-provider";
import { SectionHeading } from "@/geotech/components/section-heading";
import { ContourLines } from "@/geotech/components/geological/background";
import { cn } from "@/geotech/lib/utils";

type MethodKey =
  | "masw"
  | "gpr"
  | "ert"
  | "seismic"
  | "emi"
  | "microgravity"
  | "magnetic"
  | "borehole"
  | "crosshole"
  | "suspension";

export function GeophysicalTechnology() {
  const { dict, isArabic } = useLanguage();
  const [activeMethod, setActiveMethod] = useState<MethodKey>("masw");

  if (!dict) return null;

  const methods: MethodKey[] = [
    "masw",
    "gpr",
    "ert",
    "seismic",
    "emi",
    "microgravity",
    "magnetic",
    "borehole",
    "crosshole",
    "suspension",
  ];

  return (
    <section
      id="technology"
      className="relative overflow-hidden border-y border-border bg-deep py-20 text-deep-foreground sm:py-28 md:py-32"
    >
      {/* Faint technical grid + animated contour lines on the deep background */}
      <div
        className="pointer-events-none absolute inset-0 grid-technical"
        style={{ ['--grid-color' as string]: 'oklch(1 0 0 / 0.045)' }}
      />
      <ContourLines className="text-deep-foreground" opacity={0.1} />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={isArabic ? "التقنيات الجيوفيزيائية" : "Geophysical Technology"}
          title={dict.geophysical.title}
          description={dict.geophysical.description}
          align="center"
          tone="deep"
          className="mb-12"
        />

        <div className="grid gap-8 lg:grid-cols-[1fr_1.15fr] lg:items-start">
          {/* Method selector — vertical column */}
          <div className="flex flex-wrap gap-2 lg:flex-col lg:flex-nowrap">
            {methods.map((method) => (
              <button
                key={method}
                type="button"
                onClick={() => setActiveMethod(method)}
                aria-pressed={activeMethod === method}
                className={cn(
                  "group relative w-full rounded-md border px-4 py-3 text-start transition-colors",
                  activeMethod === method
                    ? "border-primary bg-primary/10"
                    : "border-deep-line hover:border-primary/50",
                )}
              >
                <span
                  className={cn(
                    "font-mono text-xs uppercase tracking-wider",
                    activeMethod === method ? "text-primary" : "text-deep-muted",
                  )}
                >
                  {dict.geophysical.methods[method].name}
                </span>
                <span className="mt-0.5 block text-sm font-medium text-deep-foreground/85">
                  {dict.geophysical.methods[method].full}
                </span>
              </button>
            ))}
          </div>

          {/* Visualizer + info */}
          <div>
            <div className="relative aspect-[16/10] overflow-hidden rounded-lg border border-deep-line bg-deep">
              <GeophysicalVisualizer method={activeMethod} />
              <span className="absolute bottom-3 start-4 font-mono text-[10px] uppercase tracking-wider text-deep-muted">
                {dict.geophysical.disclaimer}
              </span>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeMethod}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="mt-6 flex flex-col justify-center rounded-lg border border-deep-line bg-deep p-6"
              >
                <span className="font-mono text-xs uppercase tracking-wider text-primary">
                  {dict.geophysical.methods[activeMethod].name}
                </span>
                <h3 className="mt-2 text-lg font-semibold text-deep-foreground">
                  {dict.geophysical.methods[activeMethod].full}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-deep-muted text-pretty">
                  {dict.geophysical.methods[activeMethod].use}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
const GEO = "var(--geo)";
const DEEP_MUTED = "var(--deep-muted)";

function visualFor(method: MethodKey): string {
  switch (method) {
    case "masw":
      return "masw";
    case "gpr":
      return "gpr";
    case "ert":
      return "ert";
    case "seismic":
    case "crosshole":
      return "seismic";
    case "emi":
      return "emi";
    case "microgravity":
    case "suspension":
      return "microgravity";
    case "magnetic":
      return "magnetic";
    case "borehole":
      return "logging";
    default:
      return "masw";
  }
}

function GeophysicalVisualizer({ method }: { method: MethodKey }) {
  const visualId = visualFor(method);
  return (
    <div className="relative h-full w-full">
      <svg viewBox="0 0 600 300" className="h-full w-full" preserveAspectRatio="xMidYMid meet">
        <defs>
          <linearGradient id="beam" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor={GEO} stopOpacity="0.75" />
            <stop offset="100%" stopColor={GEO} stopOpacity="0" />
          </linearGradient>
        </defs>

        {[0, 1, 2, 3].map((i) => (
          <line
            key={i}
            x1="0"
            x2="600"
            y1={90 + i * 52}
            y2={90 + i * 52}
            stroke="currentColor"
            strokeOpacity="0.18"
            strokeWidth="1"
          />
        ))}
        <line x1="0" x2="600" y1="70" y2="70" stroke={GEO} strokeOpacity="0.5" strokeWidth="1.5" />

        <AnimatePresence mode="wait">
          <motion.g
            key={visualId}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            {visualId === "masw" ? (
              <>
                {[0, 1, 2, 3, 4].map((i) => (
                  <motion.circle
                    key={i}
                    cx="120"
                    cy="70"
                    fill="none"
                    stroke={GEO}
                    strokeWidth="1.2"
                    initial={{ r: 14, opacity: 0.8 }}
                    animate={{ r: 240, opacity: 0 }}
                    transition={{ duration: 3, delay: i * 0.6, repeat: Infinity }}
                  />
                ))}
              </>
            ) : null}

            {visualId === "gpr" ? (
              <>
                {[0, 1, 2].map((i) => (
                  <motion.path
                    key={i}
                    d="M300 70 L240 260 M300 70 L360 260"
                    stroke="url(#beam)"
                    strokeWidth="2"
                    fill="none"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 0.9, 0] }}
                    transition={{ duration: 2.2, delay: i * 0.7, repeat: Infinity }}
                  />
                ))}
              </>
            ) : null}

            {visualId === "ert" ? (
              <>
                {[0, 1, 2, 3].map((i) => (
                  <motion.ellipse
                    key={i}
                    cx={140 + i * 110}
                    cy={150 + (i % 2) * 50}
                    rx="70"
                    ry="34"
                    fill={GEO}
                    initial={{ opacity: 0.08 }}
                    animate={{ opacity: [0.08, 0.3, 0.08] }}
                    transition={{ duration: 3.4, delay: i * 0.4, repeat: Infinity }}
                  />
                ))}
              </>
            ) : null}

            {visualId === "seismic" ? (
              <>
                {[0, 1, 2].map((i) => (
                  <motion.path
                    key={i}
                    d="M60 70 C 180 150, 300 40, 420 160 S 540 90, 590 140"
                    fill="none"
                    stroke={GEO}
                    strokeWidth="1.6"
                    initial={{ pathLength: 0, opacity: 0.2 }}
                    animate={{ pathLength: 1, opacity: [0.2, 0.9, 0.2] }}
                    transition={{
                      duration: 3,
                      delay: i * 0.9,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                ))}
              </>
            ) : null}

            {visualId === "emi" ? (
              <>
                <motion.rect
                  x="270"
                  y="180"
                  width="70"
                  height="16"
                  rx="8"
                  fill={GEO}
                  initial={{ opacity: 0.3 }}
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 2.4, repeat: Infinity }}
                />
                {[0, 1, 2].map((i) => (
                  <motion.ellipse
                    key={i}
                    cx="305"
                    cy="188"
                    rx="60"
                    ry="28"
                    fill="none"
                    stroke={GEO}
                    strokeWidth="1"
                    initial={{ scale: 0.4, opacity: 0.9 }}
                    animate={{ scale: 2.2, opacity: 0 }}
                    style={{ transformOrigin: "305px 188px" }}
                    transition={{ duration: 2.6, delay: i * 0.8, repeat: Infinity }}
                  />
                ))}
              </>
            ) : null}

            {visualId === "microgravity" ? (
              <g>
                <motion.ellipse
                  cx="320"
                  cy="200"
                  rx="66"
                  ry="42"
                  fill="var(--deep)"
                  stroke={GEO}
                  strokeWidth="1.4"
                  initial={{ opacity: 0.4 }}
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
                <motion.path
                  d="M60 120 C 180 120, 240 96, 320 96 S 470 122, 590 120"
                  fill="none"
                  stroke={GEO}
                  strokeOpacity="0.6"
                  strokeWidth="1.2"
                  className="flow-dash"
                />
              </g>
            ) : null}

            {visualId === "magnetic" ? (
              <>
                {[0, 1, 2, 3, 4].map((i) => (
                  <motion.ellipse
                    key={i}
                    cx={120 + i * 90}
                    cy={150 + (i % 2) * 60}
                    rx="40"
                    ry="40"
                    fill="none"
                    stroke={GEO}
                    strokeWidth="1.2"
                    initial={{ opacity: 0.15, scale: 0.6 }}
                    animate={{ opacity: [0.15, 0.7], scale: [0.6, 1.2] }}
                    transition={{
                      duration: 3,
                      delay: i * 0.5,
                      repeat: Infinity,
                    }}
                  />
                ))}
              </>
            ) : null}

            {visualId === "logging" ? (
              <g>
                <rect x="280" y="90" width="40" height="200" fill="none" stroke={GEO} strokeWidth="2" />
                <motion.circle
                  cx="300"
                  cy="190"
                  r="14"
                  fill={GEO}
                  animate={{ y: [0, 60, 0] }}
                  transition={{ duration: 2.8, repeat: Infinity }}
                />
              </g>
            ) : null}

            <text x="12" y="18" fill={DEEP_MUTED} fontSize="10" fontFamily="monospace" opacity="0.6">
              {visualId.toUpperCase()}
            </text>
          </motion.g>
        </AnimatePresence>
      </svg>

      <div className="absolute start-3 top-3 flex items-center gap-2">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
        </span>
        <span className="font-mono text-[10px] uppercase tracking-wider text-primary">
          LIVE VISUALIZATION
        </span>
      </div>
    </div>
  );
}
