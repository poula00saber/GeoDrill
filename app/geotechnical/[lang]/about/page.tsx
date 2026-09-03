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

// Note: Can't export metadata with "use client"

export default function AboutPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen w-full">
        <AboutHero />
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
