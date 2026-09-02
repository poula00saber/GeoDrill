import { redirect } from "next/navigation";
import { PageTransition } from "@/geotech/components/page-transition";
import { Navigation } from "@/geotech/components/navigation";
import { Hero } from "@/geotech/components/sections/hero";
import { TrustBar } from "@/geotech/components/sections/trust-bar";
import { Introduction } from "@/geotech/components/sections/introduction";
import { Approach } from "@/geotech/components/sections/approach";
import { ServiceExplorer } from "@/geotech/components/sections/service-explorer";
import { WhatSetsApart } from "@/geotech/components/sections/what-sets-apart";
import { Organizations } from "@/geotech/components/sections/organizations";
import { ContactSection } from "@/geotech/components/sections/contact";
import { WhyGeoDrill } from "@/geotech/components/sections/why-geodrill";
import { SelectedExperience } from "@/geotech/components/sections/selected-experience";
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
        <WhyGeoDrill />
        <SelectedExperience />
        <WhatSetsApart />
        <Organizations />
        <ContactSection />
      </main>
      <Footer />
    </PageTransition>
  );
}

export default function GeotechnicalIndex() {
  redirect("/geotechnical/en");
}
