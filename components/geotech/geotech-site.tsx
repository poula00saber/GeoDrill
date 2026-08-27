"use client";

import { Navigation } from "@/components/geotech/navigation";
import { Hero } from "@/components/geotech/sections/hero";
import { TrustBar } from "@/components/geotech/sections/trust-bar";
import { Introduction } from "@/components/geotech/sections/introduction";
import { Approach } from "@/components/geotech/sections/approach";
import { ServiceExplorer } from "@/components/geotech/sections/service-explorer";
import { GeotechnicalInvestigation } from "@/components/geotech/sections/geotechnical-investigation";
import { GeologicalCrossSection } from "@/components/geotech/sections/geological-cross-section";
import { GeophysicalTechnology } from "@/components/geotech/sections/geophysical-technology";
import { GeologySlope } from "@/components/geotech/sections/geology-slope";
import { HydrologySection } from "@/components/geotech/sections/hydrology";
import { SurveyTesting } from "@/components/geotech/sections/survey-testing";
import { GroundEngineering } from "@/components/geotech/sections/ground-engineering";
import { StructuralAssessment } from "@/components/geotech/sections/structural-assessment";
import { MiningExploration } from "@/components/geotech/sections/mining-exploration";
import { AboutSection } from "@/components/geotech/sections/about";
import { WhatSetsApart } from "@/components/geotech/sections/what-sets-apart";
import { QhseSection } from "@/components/geotech/sections/qhse";
import { Organizations } from "@/components/geotech/sections/organizations";
import { Projects } from "@/components/geotech/sections/projects";
import { ContactSection } from "@/components/geotech/sections/contact";
import { Footer } from "@/components/geotech/sections/footer";
import { LanguageProvider } from "@/components/geotech/providers/language-provider";
import { ThemeProvider } from "@/components/geotech/providers/theme-provider";

export function GeotechSite() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <div className="geotech-theme">
          <Navigation />
          <main>
            <Hero />
            <TrustBar />
            <Introduction />
            <Approach />
            <ServiceExplorer />
            <GeotechnicalInvestigation />
            <GeologicalCrossSection />
            <GeophysicalTechnology />
            <GeologySlope />
            <HydrologySection />
            <SurveyTesting />
            <GroundEngineering />
            <StructuralAssessment />
            <MiningExploration />
            <AboutSection />
            <WhatSetsApart />
            <QhseSection />
            <Organizations />
            <Projects />
            <ContactSection />
          </main>
          <Footer />
        </div>
      </LanguageProvider>
    </ThemeProvider>
  );
}
