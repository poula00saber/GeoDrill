"use client";

import { useState } from "react";
import {
  Anchor,
  ArrowDown,
  Building2,
  Droplets,
  Eye,
  FlaskConical,
  Gauge,
  Layers3,
  Map,
  Radio,
  ScanSearch,
  ShieldCheck,
  Waves,
  Wind,
  Wrench,
} from "lucide-react";
import { motion } from "framer-motion";
import { SectionHeading } from "@/geotech/components/section-heading";
import { servicesData } from "@/geotech/lib/services-data";

function CapabilityItems({ slug }: { slug: string }) {
  const service = servicesData[slug];
  const items = Array.isArray(service.capabilities)
    ? service.capabilities
    : Object.values(service.capabilities).flat();

  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <div
          key={item}
          className="flex items-start gap-3 rounded-lg border border-border/60 bg-card/60 p-4 transition-all hover:-translate-y-1 hover:border-primary/60 hover:shadow-lg hover:shadow-primary/10"
        >
          <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
            <ScanSearch className="h-4 w-4" />
          </span>
          <span className="text-sm leading-relaxed text-foreground/90">
            {item}
          </span>
        </div>
      ))}
    </div>
  );
}

export function MaterialTestingVisual() {
  const service = servicesData["material-testing-quality-control"];
  const groups = Object.entries(
    service.capabilities as Record<string, string[]>,
  );
  const [active, setActive] = useState(0);
  const group = groups[active];

  return (
    <div>
      <SectionHeading
        eyebrow="Test Categories"
        title="Quality Control Across Every Material"
      />
      <div className="mt-8 grid gap-6 lg:grid-cols-[280px_1fr]">
        <div className="flex gap-2 overflow-x-auto lg:flex-col">
          {groups.map(([name], index) => (
            <button
              key={name}
              onClick={() => setActive(index)}
              className={`shrink-0 rounded-md border px-4 py-3 text-start text-sm transition-all lg:text-start ${
                active === index
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border bg-surface/40 text-muted-foreground hover:border-primary/50 hover:text-foreground"
              }`}
            >
              <span className="me-2 font-mono text-[10px]">
                {String(index + 1).padStart(2, "0")}
              </span>
              {name}
            </button>
          ))}
        </div>
        <motion.div
          key={group[0]}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-lg border border-border bg-surface/40 p-6"
        >
          <div className="mb-5 flex items-center gap-3 text-primary">
            <FlaskConical className="h-6 w-6" />
            <h3 className="font-bold lg:text-lg">{group[0]}</h3>
          </div>
          <ul className="grid gap-3 sm:grid-cols-2">
            {group[1].map((item) => (
              <li
                key={item}
                className="flex gap-2 text-sm leading-relaxed text-muted-foreground"
              >
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                {item}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </div>
  );
}

function EngineeringCrossSection({
  title,
  label,
  icon: Icon,
  detail,
}: {
  title: string;
  label: string;
  icon: typeof Anchor;
  detail: string;
}) {
  return (
    <div>
      <SectionHeading
        eyebrow="Engineering Detail"
        title={title}
        description={detail}
      />
      <div className="relative mt-8 overflow-hidden rounded-lg border border-border bg-surface/30 p-6">
        <svg
          viewBox="0 0 800 300"
          className="h-auto min-h-[250px] w-full"
          role="img"
          aria-label={label}
        >
          <line
            x1="0"
            y1="55"
            x2="800"
            y2="55"
            stroke="hsl(var(--primary))"
            strokeWidth="2"
          />
          <text
            x="18"
            y="40"
            fill="hsl(var(--muted-foreground))"
            fontSize="11"
            fontFamily="monospace"
          >
            GROUND LEVEL
          </text>
          <rect
            x="0"
            y="56"
            width="800"
            height="60"
            fill="hsl(35 45% 35% / 0.22)"
          />
          <rect
            x="0"
            y="116"
            width="800"
            height="70"
            fill="hsl(25 25% 30% / 0.24)"
          />
          <rect
            x="0"
            y="186"
            width="800"
            height="114"
            fill="hsl(220 20% 25% / 0.28)"
          />
          <path
            d="M120 55 L120 270 M680 55 L680 270"
            stroke="hsl(var(--primary))"
            strokeWidth="2"
            strokeDasharray="6 6"
            opacity="0.45"
          />
          <path
            d="M400 55 L400 240"
            stroke="hsl(var(--primary))"
            strokeWidth="3"
          />
          <circle
            cx="400"
            cy="220"
            r="24"
            fill="hsl(var(--primary) / 0.18)"
            stroke="hsl(var(--primary))"
            strokeWidth="2"
          />
          <path
            d="M400 220 L530 155"
            stroke="hsl(var(--primary))"
            strokeWidth="2"
            strokeDasharray="8 5"
          />
          <path
            d="M400 220 L400 285"
            stroke="hsl(var(--primary))"
            strokeWidth="5"
          />
          <text
            x="425"
            y="215"
            fill="hsl(var(--primary))"
            fontSize="11"
            fontFamily="monospace"
          >
            {label}
          </text>
        </svg>
        <div className="absolute inset-x-6 top-4 flex items-center justify-between font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
          <span>SUBSURFACE DETAIL</span>
          <span className="text-primary">{label}</span>
        </div>
        <div className="pointer-events-none absolute left-1/2 top-24 flex -translate-x-1/2 flex-col items-center text-primary">
          <Icon className="h-10 w-10" strokeWidth={1.4} />
          <ArrowDown className="mt-2 h-6 w-6 animate-pulse" />
        </div>
        <div className="absolute bottom-5 start-6 flex items-center gap-2 rounded-md border border-primary/30 bg-background/80 px-3 py-2 text-xs text-foreground backdrop-blur-sm">
          <Layers3 className="h-4 w-4 text-primary" />
          Subsurface condition and intervention
        </div>
      </div>
    </div>
  );
}

export function CavityEngineeringVisual() {
  return (
    <EngineeringCrossSection
      title="Void Detection, Grouting and Micropiling"
      label="VOID + GROUT + MICROPILE"
      icon={Wrench}
      detail="A visual anchor for the three linked ground-improvement capabilities."
    />
  );
}

export function AnchoringEngineeringVisual() {
  return (
    <EngineeringCrossSection
      title="Anchoring and Shoring Systems"
      label="TIEBACK / RETAINING WALL"
      icon={Anchor}
      detail="Retaining walls, ground anchors and tiebacks support safe excavation."
    />
  );
}

export function DewateringEngineeringVisual() {
  return (
    <EngineeringCrossSection
      title="Groundwater Control"
      label="DRAWDOWN / WELLPOINT"
      icon={Droplets}
      detail="Deep wells, wellpoints and sump pumps control groundwater around excavation."
    />
  );
}

function IconCapabilityVisual({
  title,
  eyebrow,
  slug,
  icons,
}: {
  title: string;
  eyebrow: string;
  slug: string;
  icons: (typeof Gauge)[];
}) {
  const service = servicesData[slug];
  const items = Array.isArray(service.capabilities)
    ? service.capabilities
    : Object.values(service.capabilities).flat();

  return (
    <div>
      <SectionHeading eyebrow={eyebrow} title={title} />
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item, index) => {
          const Icon = icons[index % icons.length];
          return (
            <motion.div
              key={item}
              whileHover={{ y: -5 }}
              className="rounded-lg border border-border/70 bg-surface/40 p-5 transition-colors hover:border-primary/60 hover:bg-primary/5"
            >
              <Icon className="h-7 w-7 text-primary" strokeWidth={1.5} />
              <p className="mt-4 text-sm font-medium leading-relaxed text-foreground/90">
                {item}
              </p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

export function HydrogeologicalVisual() {
  return (
    <IconCapabilityVisual
      eyebrow="Groundwater Systems"
      title="Water Resource Investigation"
      slug="hydrogeological-studies"
      icons={[Droplets, Gauge, Waves, FlaskConical, Radio]}
    />
  );
}

export function EnvironmentalVisual() {
  return (
    <IconCapabilityVisual
      eyebrow="Environmental Monitoring"
      title="Evidence for Responsible Development"
      slug="environmental-survey"
      icons={[Wind, Droplets, ScanSearch, ShieldCheck, Eye]}
    />
  );
}

export function StructuralVisual() {
  return (
    <IconCapabilityVisual
      eyebrow="Structural Assessment"
      title="Inspect, Measure and Understand Existing Structures"
      slug="structural-assessment"
      icons={[Building2, ScanSearch, Gauge, ShieldCheck, Wrench, Eye]}
    />
  );
}

export function TopographicalTechnologyVisual() {
  return (
    <IconCapabilityVisual
      eyebrow="Survey Technology"
      title="Precision Mapping Technologies"
      slug="topographical-survey"
      icons={[Map, Radio, ScanSearch, Building2]}
    />
  );
}

export function SoilImprovementVisual() {
  return (
    <IconCapabilityVisual
      eyebrow="Structural Rehabilitation"
      title="FRP, Jacketing and Epoxy Repair"
      slug="soil-improvement-concrete-repair"
      icons={[Wrench, ShieldCheck, Layers3, Building2, Gauge]}
    />
  );
}

export function GeotechnicalServiceVisual() {
  return (
    <>
      <SectionHeading
        eyebrow="Investigation Workflow"
        title="Drill, Sample, Test, Analyze and Report"
      />
      <CapabilityItems slug="geotechnical-investigation" />
    </>
  );
}
