import { GeophysicalTechnology } from "./sections/geophysical-technology";
import { GeologicalCrossSection } from "./sections/geological-cross-section";
import { GeologySlope } from "./sections/geology-slope";
import { HydrologySection } from "./sections/hydrology";
import { MiningExploration } from "./sections/mining-exploration";
import { ServiceVisualShowcase } from "./sections/service-visual-showcase";
import { serviceShowcaseConfig } from "@/geotech/lib/service-showcase-data";
import type { ComponentType } from "react";

/**
 * Reusable wrapper that renders the premium `ServiceVisualShowcase`
 * for every service that ships a pre-baked capability roster in
 * `serviceShowcaseConfig`.
 */
function ShowcaseFor({ slug }: { slug: string }) {
  const config = serviceShowcaseConfig[slug];
  if (!config) return null;
  return (
    <ServiceVisualShowcase slug={slug} capabilities={config.capabilities} />
  );
}

export const serviceVisuals: Partial<Record<string, ComponentType>> = {
  "geotechnical-investigation": GeologicalCrossSection,
  "geophysical-survey": GeophysicalTechnology,
  "material-testing-quality-control": () => (
    <ShowcaseFor slug="material-testing-quality-control" />
  ),
  "topographical-survey": () => <ShowcaseFor slug="topographical-survey" />,
  "hydrology-studies": HydrologySection,
  "hydrogeological-studies": () => (
    <ShowcaseFor slug="hydrogeological-studies" />
  ),
  "cavity-probing-grouting-micro-piling": () => (
    <ShowcaseFor slug="cavity-probing-grouting-micro-piling" />
  ),
  "geological-survey-rock-slope-stability": GeologySlope,
  "structural-assessment": () => <ShowcaseFor slug="structural-assessment" />,
  "environmental-survey": () => <ShowcaseFor slug="environmental-survey" />,
  "anchoring-shoring-design-execution": () => (
    <ShowcaseFor slug="anchoring-shoring-design-execution" />
  ),
  "dewatering-design-execution": () => (
    <ShowcaseFor slug="dewatering-design-execution" />
  ),
  "soil-improvement-concrete-repair": () => (
    <ShowcaseFor slug="soil-improvement-concrete-repair" />
  ),
  "mining-exploration": MiningExploration,
};
