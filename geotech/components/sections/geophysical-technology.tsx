"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/geotech/components/providers/language-provider";
import { SectionHeading } from "@/geotech/components/section-heading";
import { cn } from "@/geotech/lib/utils";

type MethodKey = "masw" | "gpr" | "ert" | "seismic" | "emi" | "microgravity";

export function GeophysicalTechnology() {
  const { dict } = useLanguage();
  const [activeMethod, setActiveMethod] = useState<MethodKey>("masw");

  if (!dict) return null;

  const methods: MethodKey[] = [
    "masw",
    "gpr",
    "ert",
    "seismic",
    "emi",
    "microgravity",
  ];

  return (
    <section
      id="technology"
      className="relative overflow-hidden border-y border-border bg-gradient-to-b from-background via-surface to-background py-20 sm:py-28 md:py-32"
    >
      {/* Dark technical grid */}
      <div className="absolute inset-0 bg-grid opacity-30" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Geophysical Technology"
          title={dict.geophysical.title}
          description={dict.geophysical.description}
          align="center"
          className="mb-12"
        />

        {/* Method selector */}
        <div className="mb-8 flex flex-wrap justify-center gap-2">
          {methods.map((method) => (
            <button
              key={method}
              onClick={() => setActiveMethod(method)}
              className={cn(
                "rounded-md border px-4 py-2 font-mono text-xs uppercase tracking-wider transition-all",
                activeMethod === method
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border text-muted-foreground hover:text-foreground hover:border-primary/40",
              )}
            >
              {dict.geophysical.methods[method].name}
            </button>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
          {/* Visualizer */}
          <div className="relative aspect-[16/10] overflow-hidden rounded-lg border border-border/40 bg-background/50">
            <GeophysicalVisualizer method={activeMethod} />
          </div>

          {/* Method info */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeMethod}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col justify-center rounded-lg border border-border/40 bg-surface/50 p-6"
            >
              <span className="font-mono text-xs uppercase tracking-wider text-primary">
                {dict.geophysical.methods[activeMethod].name}
              </span>
              <h3 className="mt-2 text-lg font-semibold">
                {dict.geophysical.methods[activeMethod].full}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground text-pretty">
                {dict.geophysical.methods[activeMethod].use}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        <p className="mt-6 text-center font-mono text-[10px] uppercase tracking-wider text-muted-foreground/60">
          {dict.geophysical.disclaimer}
        </p>
      </div>
    </section>
  );
}

function GeophysicalVisualizer({ method }: { method: MethodKey }) {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={containerRef} className="relative h-full w-full">
      <svg
        viewBox="0 0 800 500"
        className="h-full w-full"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Ground line */}
        <line
          x1="0"
          y1="100"
          x2="800"
          y2="100"
          stroke="hsl(var(--primary))"
          strokeWidth="1"
          opacity="0.5"
        />
        <text
          x="10"
          y="90"
          fill="hsl(var(--muted-foreground))"
          fontSize="10"
          fontFamily="monospace"
          opacity="0.5"
        >
          SURFACE
        </text>

        {/* Layers */}
        <rect
          x="0"
          y="100"
          width="800"
          height="80"
          fill="hsl(var(--muted))"
          opacity="0.2"
        />
        <rect
          x="0"
          y="180"
          width="800"
          height="100"
          fill="hsl(var(--muted))"
          opacity="0.3"
        />
        <rect
          x="0"
          y="280"
          width="800"
          height="120"
          fill="hsl(var(--muted))"
          opacity="0.4"
        />
        <rect
          x="0"
          y="400"
          width="800"
          height="100"
          fill="hsl(var(--muted))"
          opacity="0.5"
        />

        {/* Grid */}
        {[0, 100, 200, 300, 400, 500, 600, 700, 800].map((x) => (
          <line
            key={x}
            x1={x}
            y1="100"
            x2={x}
            y2="500"
            stroke="hsl(var(--border))"
            strokeWidth="0.5"
            opacity="0.3"
          />
        ))}
        {[100, 200, 300, 400, 500].map((y) => (
          <line
            key={y}
            x1="0"
            y1={y}
            x2="800"
            y2={y}
            stroke="hsl(var(--border))"
            strokeWidth="0.5"
            opacity="0.3"
          />
        ))}

        <AnimatePresence mode="wait">
          {method === "masw" && <MaswViz key="masw" />}
          {method === "gpr" && <GprViz key="gpr" />}
          {method === "ert" && <ErtViz key="ert" />}
          {method === "seismic" && <SeismicViz key="seismic" />}
          {method === "emi" && <EmiViz key="emi" />}
          {method === "microgravity" && <MicrogravityViz key="microgravity" />}
        </AnimatePresence>
      </svg>

      {/* Label */}
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

function MaswViz() {
  return (
    <motion.g
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Surface waves */}
      {[0, 1, 2, 3, 4].map((i) => (
        <motion.path
          key={i}
          d={`M0,${120 + i * 20} Q200,${100 + i * 20} 400,${120 + i * 20} T800,${120 + i * 20}`}
          stroke="hsl(var(--primary))"
          strokeWidth="1.5"
          fill="none"
          opacity={0.6 - i * 0.1}
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, delay: i * 0.2 }}
        />
      ))}
      {/* Geophones */}
      {[100, 200, 300, 400, 500, 600, 700].map((x) => (
        <g key={x}>
          <line
            x1={x}
            y1="100"
            x2={x}
            y2="90"
            stroke="hsl(var(--primary))"
            strokeWidth="1.5"
          />
          <circle cx={x} cy="85" r="4" fill="hsl(var(--primary))" />
        </g>
      ))}
      <text
        x="350"
        y="75"
        fill="hsl(var(--primary))"
        fontSize="9"
        fontFamily="monospace"
        textAnchor="middle"
      >
        GEOPHONE ARRAY
      </text>
    </motion.g>
  );
}

function GprViz() {
  return (
    <motion.g
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Antenna */}
      <rect
        x="380"
        y="80"
        width="40"
        height="15"
        fill="hsl(var(--primary))"
        rx="2"
      />
      <text
        x="400"
        y="75"
        fill="hsl(var(--primary))"
        fontSize="9"
        fontFamily="monospace"
        textAnchor="middle"
      >
        GPR
      </text>
      {/* Radar cone */}
      <motion.path
        d="M400,100 L200,500 L600,500 Z"
        fill="hsl(var(--primary))"
        opacity="0.1"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.15 }}
        transition={{ duration: 0.5 }}
      />
      {/* Radar waves */}
      {[1, 2, 3, 4].map((i) => (
        <motion.path
          key={i}
          d={`M400,100 L${400 - i * 60},500 L${400 + i * 60},500 Z`}
          fill="none"
          stroke="hsl(var(--primary))"
          strokeWidth="1"
          opacity={0.4 - i * 0.08}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.4 - i * 0.08 }}
          transition={{
            duration: 1,
            delay: i * 0.15,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          style={{ transformOrigin: "400px 100px" }}
        />
      ))}
      {/* Buried utility */}
      <rect
        x="300"
        y="320"
        width="200"
        height="20"
        fill="hsl(var(--primary))"
        opacity="0.4"
        rx="4"
      />
      <text
        x="400"
        y="355"
        fill="hsl(var(--muted-foreground))"
        fontSize="9"
        fontFamily="monospace"
        textAnchor="middle"
      >
        UTILITY
      </text>
    </motion.g>
  );
}

function ErtViz() {
  return (
    <motion.g
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Electrodes */}
      {[100, 200, 300, 400, 500, 600, 700].map((x) => (
        <g key={x}>
          <line
            x1={x}
            y1="100"
            x2={x}
            y2="120"
            stroke="hsl(var(--primary))"
            strokeWidth="2"
          />
          <circle cx={x} cy="125" r="3" fill="hsl(var(--primary))" />
        </g>
      ))}
      {/* Resistivity zones */}
      <motion.rect
        x="100"
        y="150"
        width="200"
        height="100"
        fill="hsl(var(--primary))"
        opacity="0.15"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.15 }}
      />
      <motion.rect
        x="350"
        y="200"
        width="250"
        height="150"
        fill="hsl(var(--primary))"
        opacity="0.25"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.25 }}
        transition={{ delay: 0.2 }}
      />
      <motion.rect
        x="150"
        y="280"
        width="300"
        height="120"
        fill="hsl(var(--primary))"
        opacity="0.1"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        transition={{ delay: 0.4 }}
      />
      {/* Current flow lines */}
      {[0, 1, 2].map((i) => (
        <motion.path
          key={i}
          d={`M${100 + i * 50},120 Q400,${200 + i * 60} ${700 - i * 50},120`}
          stroke="hsl(var(--primary))"
          strokeWidth="1"
          fill="none"
          opacity="0.3"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, delay: i * 0.2 }}
        />
      ))}
      <text
        x="400"
        y="490"
        fill="hsl(var(--muted-foreground))"
        fontSize="9"
        fontFamily="monospace"
        textAnchor="middle"
      >
        RESISTIVITY MODEL
      </text>
    </motion.g>
  );
}

function SeismicViz() {
  return (
    <motion.g
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Source */}
      <circle cx="100" cy="100" r="6" fill="hsl(var(--primary))" />
      <text
        x="100"
        y="85"
        fill="hsl(var(--primary))"
        fontSize="9"
        fontFamily="monospace"
        textAnchor="middle"
      >
        SOURCE
      </text>
      {/* Wave fronts */}
      {[1, 2, 3, 4, 5].map((i) => (
        <motion.circle
          key={i}
          cx="100"
          cy="100"
          r={i * 70}
          fill="none"
          stroke="hsl(var(--primary))"
          strokeWidth="1"
          opacity={0.5 - i * 0.08}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.5 - i * 0.08 }}
          transition={{ duration: 2, delay: i * 0.2, repeat: Infinity }}
          style={{ transformOrigin: "100px 100px" }}
        />
      ))}
      {/* Reflected wave */}
      <motion.path
        d="M100,100 Q400,300 700,100"
        stroke="hsl(var(--primary))"
        strokeWidth="1.5"
        fill="none"
        strokeDasharray="4 4"
        opacity="0.5"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.5, delay: 0.5 }}
      />
      {/* Bedrock line */}
      <line
        x1="0"
        y1="300"
        x2="800"
        y2="300"
        stroke="hsl(var(--primary))"
        strokeWidth="1"
        opacity="0.4"
        strokeDasharray="6 6"
      />
      <text
        x="750"
        y="295"
        fill="hsl(var(--muted-foreground))"
        fontSize="9"
        fontFamily="monospace"
        textAnchor="end"
      >
        BEDROCK
      </text>
    </motion.g>
  );
}

function EmiViz() {
  return (
    <motion.g
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Instrument */}
      <rect
        x="350"
        y="75"
        width="100"
        height="20"
        fill="hsl(var(--primary))"
        rx="3"
      />
      <text
        x="400"
        y="70"
        fill="hsl(var(--primary))"
        fontSize="9"
        fontFamily="monospace"
        textAnchor="middle"
      >
        EMI
      </text>
      {/* EM field */}
      {[1, 2, 3, 4].map((i) => (
        <motion.ellipse
          key={i}
          cx="400"
          cy="150"
          rx={i * 80}
          ry={i * 40}
          fill="none"
          stroke="hsl(var(--primary))"
          strokeWidth="1"
          opacity={0.4 - i * 0.08}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 - i * 0.08 }}
          transition={{ delay: i * 0.15 }}
        />
      ))}
      {/* Buried object */}
      <rect
        x="320"
        y="350"
        width="160"
        height="30"
        fill="hsl(var(--primary))"
        opacity="0.3"
        rx="4"
      />
      <text
        x="400"
        y="395"
        fill="hsl(var(--muted-foreground))"
        fontSize="9"
        fontFamily="monospace"
        textAnchor="middle"
      >
        ANOMALY
      </text>
      {/* Signal lines */}
      <motion.line
        x1="400"
        y1="100"
        x2="400"
        y2="350"
        stroke="hsl(var(--primary))"
        strokeWidth="1"
        strokeDasharray="3 3"
        opacity="0.4"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1 }}
      />
    </motion.g>
  );
}

function MicrogravityViz() {
  return (
    <motion.g
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Measurement points */}
      {[100, 200, 300, 400, 500, 600, 700].map((x) => (
        <g key={x}>
          <circle cx={x} cy="100" r="3" fill="hsl(var(--primary))" />
          <text
            x={x}
            y="90"
            fill="hsl(var(--muted-foreground))"
            fontSize="8"
            fontFamily="monospace"
            textAnchor="middle"
          >
            g
          </text>
        </g>
      ))}
      {/* Gravity curve */}
      <motion.path
        d="M100,100 L200,100 L250,100 Q300,80 350,100 L400,100 Q450,120 500,100 L550,100 Q600,80 650,100 L700,100"
        stroke="hsl(var(--primary))"
        strokeWidth="2"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.5 }}
      />
      {/* Cavity */}
      <motion.ellipse
        cx="400"
        cy="300"
        rx="80"
        ry="50"
        fill="hsl(var(--primary))"
        opacity="0.2"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.5 }}
      />
      <text
        x="400"
        y="305"
        fill="hsl(var(--muted-foreground))"
        fontSize="9"
        fontFamily="monospace"
        textAnchor="middle"
      >
        CAVITY
      </text>
      {/* Gravity low indicator */}
      <motion.text
        x="400"
        y="75"
        fill="hsl(var(--primary))"
        fontSize="9"
        fontFamily="monospace"
        textAnchor="middle"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        GRAVITY LOW
      </motion.text>
    </motion.g>
  );
}
