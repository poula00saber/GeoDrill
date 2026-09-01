import { Navigation } from '@/components/navigation';
import { Hero } from '@/components/sections/hero';
import { TrustBar } from '@/components/sections/trust-bar';
import { Introduction } from '@/components/sections/introduction';
import { Approach } from '@/components/sections/approach';
import { ServiceExplorer } from '@/components/sections/service-explorer';
import { GeotechnicalInvestigation } from '@/components/sections/geotechnical-investigation';
import { GeologicalCrossSection } from '@/components/sections/geological-cross-section';
import { GeophysicalTechnology } from '@/components/sections/geophysical-technology';
import { GeologySlope } from '@/components/sections/geology-slope';
import { HydrologySection } from '@/components/sections/hydrology';
import { SurveyTesting } from '@/components/sections/survey-testing';
import { GroundEngineering } from '@/components/sections/ground-engineering';
import { StructuralAssessment } from '@/components/sections/structural-assessment';
import { MiningExploration } from '@/components/sections/mining-exploration';
import { AboutSection } from '@/components/sections/about';
import { WhatSetsApart } from '@/components/sections/what-sets-apart';
import { QhseSection } from '@/components/sections/qhse';
import { Organizations } from '@/components/sections/organizations';
import { Projects } from '@/components/sections/projects';
import { ContactSection } from '@/components/sections/contact';
import { Footer } from '@/components/sections/footer';

export default function Home() {
  return (
    <>
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
    </>
  );
}
