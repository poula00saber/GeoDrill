import { GeotechnicalInvestigation } from "./sections/geotechnical-investigation";
import { GeophysicalTechnology } from "./sections/geophysical-technology";
import { GeologicalCrossSection } from "./sections/geological-cross-section";
import { GeologySlope } from "./sections/geology-slope";
import { HydrologySection } from "./sections/hydrology";
import { MiningExploration } from "./sections/mining-exploration";
import {
  AnchoringEngineeringVisual,
  CavityEngineeringVisual,
  DewateringEngineeringVisual,
  EnvironmentalVisual,
  HydrogeologicalVisual,
  MaterialTestingVisual,
  SoilImprovementVisual,
  StructuralVisual,
  TopographicalTechnologyVisual,
} from "./service-visuals";
import type { ComponentType } from "react";

function GeotechnicalInvestigationVisual() {
  return (
    <>
      <GeotechnicalInvestigation />
      <GeologicalCrossSection />
    </>
  );
}

export const serviceVisuals: Partial<Record<string, ComponentType>> = {
  "geotechnical-investigation": GeotechnicalInvestigationVisual,
  "geophysical-survey": GeophysicalTechnology,
  "material-testing-quality-control": MaterialTestingVisual,
  "topographical-survey": TopographicalTechnologyVisual,
  "hydrology-studies": HydrologySection,
  "hydrogeological-studies": HydrogeologicalVisual,
  "cavity-probing-grouting-micro-piling": CavityEngineeringVisual,
  "geological-survey-rock-slope-stability": GeologySlope,
  "structural-assessment": StructuralVisual,
  "environmental-survey": EnvironmentalVisual,
  "anchoring-shoring-design-execution": AnchoringEngineeringVisual,
  "dewatering-design-execution": DewateringEngineeringVisual,
  "soil-improvement-concrete-repair": SoilImprovementVisual,
  "mining-exploration": MiningExploration,
};
