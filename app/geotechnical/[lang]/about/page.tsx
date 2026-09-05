"use client";

import { Navigation } from "@/geotech/components/navigation";
import { Footer } from "@/geotech/components/sections/footer";
import { WhoWeAre } from "@/geotech/components/sections/who-we-are";
import { WhatSetsUsApart } from "@/geotech/components/sections/what-sets-us-apart-detail";
import { VisionMissionGoals } from "@/geotech/components/sections/vision-mission-goals";
import { SoftwareSection } from "@/geotech/components/sections/software-section";
import { Organizations } from "@/geotech/components/sections/organizations";
import { ContactSection } from "@/geotech/components/sections/contact";
import { AboutHero } from "@/geotech/components/sections/about-hero";
import { Clients } from "@/geotech/components/sections/clients";
import { GoldGradientBand } from "@/geotech/components/sections/gold-gradient-band";
import { use } from "react";

// Note: Can't export metadata with "use client"

interface PageProps {
  params: Promise<{ lang: string }>;
}

export default function AboutPage({ params }: PageProps) {
  const { lang } = use(params);
  const isAr = lang === "ar";

  return (
    <>
      <Navigation />
      <main className="min-h-screen w-full">
        <AboutHero />
        <GoldGradientBand
          eyebrow={isAr ? "من نحن" : "Who We Are"}
          title={
            isAr ? "شريكك الموثوق في علوم الأرض" : "Your Trusted Geoscience Partner"
          }
          description={
            isAr
              ? "تعرف على قصة جيودريل، والمبادئ التي تقود عملنا، وفريقنا الذي يجعل الدقة ممكنة في الموقع."
              : "Discover the GEODRILL story, the principles that drive our work, and the team that makes precision possible on site."
          }
        />
        <WhoWeAre />
        <WhatSetsUsApart />
        <VisionMissionGoals />
        <SoftwareSection />
        <Clients />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}