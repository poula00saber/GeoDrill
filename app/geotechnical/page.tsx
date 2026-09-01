import { redirect } from "next/navigation";
import { PageTransition } from "@/geotech/components/page-transition";

export default function GeotechnicalIndex() {
  redirect("/geotechnical/en");
}
import { Navigation } from "@/geotech/components/navigation";
import { Hero } from "@/geotech/components/sections/hero";
import { TrustBar } from "@/geotech/components/sections/trust-bar";
import { Introduction } from "@/geotech/components/sections/introduction";
import { Approach } from "@/geotech/components/sections/approach";
import { ServiceExplorer } from "@/geotech/components/sections/service-explorer";
import { GeotechnicalInvestigation } from "@/geotech/components/sections/geotechnical-investigation";
import { GeologicalCrossSection } from "@/geotech/components/sections/geological-cross-section";
import { GeophysicalTechnology } from "@/geotech/components/sections/geophysical-technology";
import { GeologySlope } from "@/geotech/components/sections/geology-slope";
import { HydrologySection } from "@/geotech/components/sections/hydrology";
import { SurveyTesting } from "@/geotech/components/sections/survey-testing";
import { GroundEngineering } from "@/geotech/components/sections/ground-engineering";
import { StructuralAssessment } from "@/geotech/components/sections/structural-assessment";
import { MiningExploration } from "@/geotech/components/sections/mining-exploration";
import { AboutSection } from "@/geotech/components/sections/about";
import { WhatSetsApart } from "@/geotech/components/sections/what-sets-apart";
import { QhseSection } from "@/geotech/components/sections/qhse";
import { Organizations } from "@/geotech/components/sections/organizations";
import { Projects } from "@/geotech/components/sections/projects";
import { ContactSection } from "@/geotech/components/sections/contact";
import { Footer } from "@/geotech/components/sections/footer";

export function GeotechHome() {
  return (
    <PageTransition>
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
    </PageTransition>
  );
}
