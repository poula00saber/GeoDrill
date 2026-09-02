"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/geotech/components/providers/language-provider";
import { SectionHeading } from "@/geotech/components/section-heading";

interface NeedItem {
  need: string;
  services: string[];
}

export function WhatAreYouSolving() {
  const { dict, isArabic } = useLanguage();
  if (!dict) return null;

  const needs: NeedItem[] = [
    {
      need: "UNDERSTAND THE GROUND",
      services: [
        "geotechnical-investigation",
        "geophysical-survey",
        "geological-survey",
        "hydrogeological-studies",
      ],
    },
    {
      need: "TEST MATERIALS",
      services: ["material-testing"],
    },
    {
      need: "UNDERSTAND TERRAIN",
      services: ["topographical-survey"],
    },
    {
      need: "MANAGE WATER",
      services: ["hydrology", "hydrogeological-studies", "dewatering"],
    },
    {
      need: "STABILIZE / IMPROVE GROUND",
      services: [
        "cavity-probing",
        "grouting",
        "micropiling",
        "anchoring-shoring",
        "soil-improvement",
      ],
    },
    {
      need: "ASSESS EXISTING STRUCTURE",
      services: ["structural-assessment"],
    },
    {
      need: "EXPLORE MINERAL RESOURCES",
      services: ["mining-exploration"],
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section className="relative overflow-hidden py-20 sm:py-28 md:py-32 border-y border-border bg-surface/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Discovery"
          title="What are you trying to solve?"
          subtitle="Select your project need to explore relevant services"
          align="center"
          className="mb-16"
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="space-y-4"
        >
          {needs.map((item, i) => (
            <motion.div key={i} variants={itemVariants}>
              <div className="group rounded-lg border border-border/40 bg-surface/50 p-6 sm:p-7 hover:border-primary/40 hover:bg-surface transition-all cursor-pointer">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <p className="font-mono text-xs uppercase tracking-widest text-primary mb-2">
                      {item.need}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {item.services.length} service
                      {item.services.length !== 1 ? "s" : ""}
                    </p>
                  </div>
                  <motion.div
                    whileHover={{ x: isArabic ? -4 : 4 }}
                    className="flex-shrink-0"
                  >
                    <ArrowRight className="w-5 h-5 text-primary/60 group-hover:text-primary transition-colors" />
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
