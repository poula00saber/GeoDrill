"use client";

import {
  MessagesSquare,
  Compass,
  PencilRuler,
  FileCheck2,
  HardHat,
  ShieldCheck,
  ClipboardCheck,
  Handshake,
  Target,
  Shield,
  Settings,
  Clock,
  type LucideIcon,
} from "lucide-react";
import { useLanguage } from "@/components/language-provider";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";

const STEP_ICONS: LucideIcon[] = [
  MessagesSquare,
  Compass,
  PencilRuler,
  FileCheck2,
  HardHat,
  ShieldCheck,
  ClipboardCheck,
  Handshake,
];

const HIGHLIGHT_ICONS: LucideIcon[] = [Target, Shield, Settings, Clock];

const DEFAULT_HIGHLIGHTS = [
  { title: "Strategic Approach", text: "Every detail planned for success." },
  { title: "Safety First", text: "Zero compromises on site safety." },
  { title: "Precision Driven", text: "Engineering accuracy in every step." },
  { title: "On-Time Delivery", text: "Commitment you can rely on." },
];

export function Process() {
  const { t } = useLanguage();
  const p = t.process;
  const steps = p.steps;
  const highlights =
    (p as { highlights?: typeof DEFAULT_HIGHLIGHTS }).highlights ??
    DEFAULT_HIGHLIGHTS;

  return (
    <section className="relative overflow-hidden bg-navy py-20 md:py-28 text-white">
      {/* Background Dot Grid */}
      <div
        className="dot-grid pointer-events-none absolute inset-0 text-white/[0.05]"
        aria-hidden
      />

      <div className="relative mx-auto max-w-7xl px-6">
        <SectionHeading
          kicker={p.kicker}
          title={p.title}
          sub={p.sub}
          align="center"
          invert
        />

        {/* 8-Step Cards Grid */}
        <ol className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => {
            const Icon = STEP_ICONS[i % STEP_ICONS.length];

            return (
              <Reveal key={step.num} delay={(i % 4) * 90} as="li">
                <div className="group relative flex h-full flex-col justify-between rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-teal hover:bg-teal hover:text-navy hover:shadow-xl hover:shadow-teal/20">
                  <div>
                    {/* Header: Icon & Step Number Badge */}
                    <div className="flex items-center justify-between gap-4">
                      <span className="flex size-11 items-center justify-center rounded-lg bg-teal/10 text-teal transition-colors duration-300 group-hover:bg-navy group-hover:text-teal">
                        <Icon className="size-5" strokeWidth={1.75} />
                      </span>
                      <span className="font-mono text-2xl font-bold text-teal transition-colors duration-300 group-hover:text-navy">
                        {step.num}
                      </span>
                    </div>

                    <h3 className="mt-5 text-base font-semibold text-white transition-colors duration-300 group-hover:text-navy">
                      {step.title}
                    </h3>

                    <p className="mt-2 text-xs leading-relaxed text-white/60 transition-colors duration-300 group-hover:text-navy/80">
                      {step.text}
                    </p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </ol>

        {/* Bottom Highlights Bar */}
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {highlights.map((h, i) => {
            const Icon = HIGHLIGHT_ICONS[i % HIGHLIGHT_ICONS.length];
            return (
              <Reveal key={h.title} delay={i * 60}>
                <div className="group flex items-start gap-3.5 rounded-xl border border-white/10 bg-white/5 p-4 transition-all duration-300 hover:-translate-y-1 hover:border-teal hover:bg-teal hover:text-navy">
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-md bg-teal/10 text-teal transition-colors duration-300 group-hover:bg-navy group-hover:text-teal">
                    <Icon className="size-4" strokeWidth={1.75} />
                  </span>
                  <div>
                    <h4 className="text-xs font-semibold text-white transition-colors duration-300 group-hover:text-navy">
                      {h.title}
                    </h4>
                    <p className="mt-0.5 text-[11px] text-white/50 transition-colors duration-300 group-hover:text-navy/80">
                      {h.text}
                    </p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
