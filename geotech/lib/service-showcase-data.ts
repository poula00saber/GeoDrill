import {
  Beaker,
  TestTube2,
  Layers3,
  ShieldAlert,
  Map,
  Satellite,
  Waves,
  Compass,
  Droplets,
  FlaskConical,
  ScanSearch,
  ScanLine,
  Eye,
  Hammer,
  Mountain,
  MountainSnow,
  Pickaxe,
  Building2,
  Anchor,
  Wrench,
  Leaf,
  Wind,
  Radio,
  Shovel,
  type LucideIcon,
} from "lucide-react";
import type { ShowcaseCapability } from "@/geotech/components/sections/service-visual-showcase";

const HERO = "/images/geotech/services/services-heros";
const PROJECTS = "/images/final/projects";

/**
 * Official capability rosters for every service that doesn't already have a
 * bespoke visual. Each row feeds the `ServiceVisualShowcase` so all 14
 * service pages share the same premium look — same chip strip, hero photo
 * panel and detail panel — but the data itself is tailored per service.
 *
 * Source of truth: text transcribed from old.geodrillksa.com (revised + trusted
 * by the client). Each list is condensed to the 4 most representative items
 * for the visual showcase; the full list lives on the service detail page in
 * the `servicesData.ts` overview + capabilities arrays.
 *
 * When real per-service photos arrive, swap the `image` URLs here.
 */

interface ServiceConfig {
  capabilities: ShowcaseCapability[];
}

// ─────────────────────────────────────────────────────────────────────
// 1. Material, Concrete & Asphalt Testing & On-Site Quality Control
// ─────────────────────────────────────────────────────────────────────
const materialTesting: ServiceConfig = {
  capabilities: [
    {
      id: "soil-aggregate",
      label: "Soil & Aggregate",
      description:
        "Soil classification, compaction and aggregate testing — sieve analysis, Atterberg limits, Proctor/CBR, sulfate & chloride, soundness and LA abrasion.",
      features: [
        "Sieve, hydrometer & Atterberg",
        "Proctor, CBR & relative density",
        "Soundness, LA & sulfate/chloride",
      ],
      image: `${PROJECTS}/01_groundworks/concrete_rebar_footing.jpg`,
      icon: Beaker,
      tone: "amber",
    },
    {
      id: "concrete",
      label: "Concrete Testing",
      description:
        "Fresh and hardened concrete testing — slump, temperature, air content, compressive strength, NDT (Schmidt, UPV, half-cell) and core testing.",
      features: [
        "Fresh: slump, temp, air, sampling",
        "NDT: Schmidt, UPV, pull-out, half-cell",
        "Destructive: cubes, cores, flexural",
      ],
      image: `${PROJECTS}/new_finishing_named_projects/worker_carpet_tile_install_sal.jpg`,
      icon: TestTube2,
      tone: "primary",
    },
    {
      id: "asphalt-cement",
      label: "Asphalt & Cement",
      description:
        "Asphalt mix design, Marshall stability, bitumen testing and cement quality control (fineness, setting time, compressive strength, LOI).",
      features: [
        "Marshall, extraction & coring",
        "Bitumen penetration, ductility, viscosity",
        "Cement: SG, setting, strength, fineness",
      ],
      image: `${PROJECTS}/05_waterproofing_and_insulation/insulation_rooftop_finished.jpg`,
      icon: Layers3,
      tone: "sky",
    },
    {
      id: "qc-steel-pile",
      label: "QC, Steel & Piles",
      description:
        "On-site QC, steel mechanical tests (yield, ultimate, elongation, bend) and pile integrity testing (PDA, PIT, CHL, MCL, pull-out).",
      features: [
        "Field density & on-site concrete QC",
        "Steel yield / ultimate / bend",
        "Pile: PDA, PIT, CHL, MCL, pull-out",
      ],
      image: `${PROJECTS}/new_misc_industrial/concrete_pour_lab.jpg`,
      icon: ShieldAlert,
      tone: "emerald",
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────
// 2. Topographical Survey
// ─────────────────────────────────────────────────────────────────────
const topographicalSurvey: ServiceConfig = {
  capabilities: [
    {
      id: "topo-cadastral",
      label: "Topographic & Cadastral",
      description:
        "Detailed topographic and cadastral surveys — contour mapping, grid elevations, land-record projects and setting-out of approved plans.",
      features: [
        "Contour & grid elevation maps",
        "Land-record / title establishment",
        "Setting-out structural plans",
      ],
      image: `${PROJECTS}/new_landscaping/landscape_garden_pathway_stones.jpg`,
      icon: Map,
      tone: "amber",
    },
    {
      id: "roads-infra",
      label: "Roads & Infrastructure",
      description:
        "Surveying for roads, infrastructure, water systems, sanitary drainage and geodetic network establishment.",
      features: [
        "Road & infrastructure surveys",
        "Water & sanitary drainage",
        "Geodetic network establishment",
      ],
      image: `${PROJECTS}/new_misc_industrial/excavation_roadside_traffic_cones.jpg`,
      icon: Compass,
      tone: "primary",
    },
    {
      id: "drone-gis-bim",
      label: "Drone, GIS & BIM",
      description:
        "Drone mapping, mobile mapping, GIS, remote sensing and BIM/architectural survey for digital project delivery.",
      features: [
        "Drone & mobile mapping",
        "GIS & remote sensing",
        "BIM & architectural survey",
      ],
      image: `${PROJECTS}/new_misc_industrial/gso_building_entrance_render.jpg`,
      icon: Satellite,
      tone: "sky",
    },
    {
      id: "bathymetric-urban",
      label: "Bathymetry & Planning",
      description:
        "Bathymetric surveys of reservoirs, channels and shorelines plus urban planning and information technology services.",
      features: [
        "Reservoir & channel bathymetry",
        "Urban planning",
        "Information technology",
      ],
      image: `${PROJECTS}/new_landscaping/landscape_pool_palm_walkway.jpg`,
      icon: Waves,
      tone: "violet",
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────
// 3. Hydrology Studies
// ─────────────────────────────────────────────────────────────────────
const hydrologyStudies: ServiceConfig = {
  capabilities: [
    {
      id: "flood",
      label: "Flood Risk",
      description:
        "Flood risk assessment and inundation mapping for various return periods to support planning, mitigation and emergency response.",
      features: [
        "Design-storm flood levels",
        "Inundation mapping",
        "Mitigation & drainage design",
      ],
      image: `${PROJECTS}/new_misc_industrial/excavation_roadside_traffic_cones.jpg`,
      icon: Waves,
      tone: "sky",
    },
    {
      id: "runoff",
      label: "Runoff & Drainage",
      description:
        "Surface-water runoff analysis for stormwater design and drainage planning using HEC-HMS and HEC-RAS.",
      features: [
        "Catchment runoff (HEC-HMS)",
        "Channel hydraulics (HEC-RAS)",
        "Detention pond design",
      ],
      image: `${PROJECTS}/new_misc_industrial/groundworks_water_truck_trench.jpg`,
      icon: Droplets,
      tone: "blue",
    },
    {
      id: "groundwater",
      label: "Groundwater",
      description:
        "Groundwater investigations for aquifer characterization, recharge potential and water balance.",
      features: [
        "Aquifer characterization",
        "Recharge estimation",
        "Water-balance studies",
      ],
      image: `${PROJECTS}/03_mep/mep_basement_plant_room.jpg`,
      icon: FlaskConical,
      tone: "violet",
    },
    {
      id: "watershed-resources",
      label: "Watershed & Resources",
      description:
        "Catchment and watershed analysis plus water-resource management strategies aligned with regulatory standards.",
      features: [
        "Catchment & watershed analysis",
        "Water-resource management",
        "Regulatory compliance",
      ],
      image: `${PROJECTS}/new_misc_industrial/gso_building_entrance_render.jpg`,
      icon: Compass,
      tone: "emerald",
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────
// 4. Hydrogeological Studies
// ─────────────────────────────────────────────────────────────────────
const hydrogeologicalStudies: ServiceConfig = {
  capabilities: [
    {
      id: "wells",
      label: "Water Wells",
      description:
        "Drilling of water wells for domestic, agricultural and industrial use, with full aquifer performance evaluation.",
      features: [
        "Domestic / agricultural / industrial wells",
        "Pumping & slug tests",
        "Aquifer performance evaluation",
      ],
      image: `${PROJECTS}/03_mep/mep_water_pump_ksb_blue.jpg`,
      icon: Droplets,
      tone: "sky",
    },
    {
      id: "permeability",
      label: "Permeability & Hydraulic Conductivity",
      description:
        "Permeability and hydraulic-conductivity testing using field and laboratory methods to size wells and predict yield.",
      features: [
        "Field permeability tests",
        "Constant / falling head lab tests",
        "Hydraulic-conductivity profiling",
      ],
      image: `${PROJECTS}/03_mep/mep_underfloor_conduit_closeup.jpg`,
      icon: FlaskConical,
      tone: "blue",
    },
    {
      id: "quality",
      label: "Water Quality",
      description:
        "Chemical and microbiological water-quality analysis for potable, agricultural and industrial supply projects.",
      features: [
        "Chemical parameter analysis",
        "Microbiological testing",
        "Compliance & potability reporting",
      ],
      image: `${PROJECTS}/03_mep/mep_basement_plant_room.jpg`,
      icon: TestTube2,
      tone: "violet",
    },
    {
      id: "geoelectric",
      label: "Geoelectric Surveys",
      description:
        "Geoelectrical surveys for subsurface profiling and aquifer mapping — fast, non-intrusive complement to drilling.",
      features: [
        "Vertical electrical sounding",
        "Resistivity tomography",
        "Aquifer mapping",
      ],
      image: `${PROJECTS}/new_landscaping/landscape_pool_palm_walkway.jpg`,
      icon: Radio,
      tone: "emerald",
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────
// 5. Cavity Probing, Grouting & Micropiling
// ─────────────────────────────────────────────────────────────────────
const cavityProbing: ServiceConfig = {
  capabilities: [
    {
      id: "probing",
      label: "Cavity Probing",
      description:
        "Locate and assess subsurface anomalies (karst voids, collapsing soils, settlement-prone zones) using probing and geophysics.",
      features: [
        "Targeted probing & drilling",
        "Karst & collapsing soils",
        "Settlement-prone zone mapping",
      ],
      image: `${PROJECTS}/01_groundworks/excavation_foundation_pits.jpg`,
      icon: Shovel,
      tone: "amber",
    },
    {
      id: "grouting",
      label: "Pressure Grouting",
      description:
        "Pressure grouting to fill voids, control settlement and enhance bearing capacity using cementitious and chemical grouts.",
      features: [
        "Void filling & densification",
        "Settlement control",
        "Bearing-capacity enhancement",
      ],
      image: `${PROJECTS}/01_groundworks/concrete_slab_reinforcement.jpg`,
      icon: Droplets,
      tone: "primary",
    },
    {
      id: "micropiling",
      label: "Micropiling & Underpinning",
      description:
        "Micropiling and underpinning for foundation support in restricted or sensitive areas where conventional piling isn't possible.",
      features: [
        "Restricted-access micropiles",
        "Sensitive-area underpinning",
        "Foundation retrofit",
      ],
      image: `${PROJECTS}/new_towers_highrise/structural_foundation_footings_v2.jpg`,
      icon: Hammer,
      tone: "sky",
    },
    {
      id: "compaction",
      label: "Compaction Grouting",
      description:
        "Soil improvement by compaction grouting to densify weak ground and reduce long-term settlement under structural loads.",
      features: [
        "Weak-ground densification",
        "Long-term settlement control",
        "Infrastructure upgrade support",
      ],
      image: `${PROJECTS}/01_groundworks/infrastructure_compaction_roller.jpg`,
      icon: Wrench,
      tone: "violet",
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────
// 6. Geological Survey & Rock Slope Stability
// ─────────────────────────────────────────────────────────────────────
const geologicalSurvey: ServiceConfig = {
  capabilities: [
    {
      id: "mapping",
      label: "Geological Mapping",
      description:
        "Detailed structural and lithological mapping, terrain classification and geomorphological analysis for infrastructure, mining and environmental projects.",
      features: [
        "Structural & lithological maps",
        "Terrain classification",
        "Geomorphological analysis",
      ],
      image: `${PROJECTS}/01_groundworks/excavation_deep_trench.jpg`,
      icon: Mountain,
      tone: "amber",
    },
    {
      id: "models",
      label: "Geological Modelling",
      description:
        "High-resolution geological models built from field surveys, remote sensing and GIS to guide planning and design.",
      features: [
        "Field surveys & remote sensing",
        "GIS-based modelling",
        "Planning & design support",
      ],
      image: `${PROJECTS}/new_misc_industrial/glass_facade_curved_building.jpg`,
      icon: Compass,
      tone: "primary",
    },
    {
      id: "kinematic",
      label: "Kinematic Analysis",
      description:
        "Kinematic analysis to identify potential failure mechanisms — planar, wedge and toppling — for road cuts, quarries and dams.",
      features: [
        "Planar / wedge / toppling checks",
        "Road cut & quarry analysis",
        "Dam & infrastructure slopes",
      ],
      image: `${PROJECTS}/new_misc_industrial/steel_frame_silo_tank_structure.jpg`,
      icon: MountainSnow,
      tone: "sky",
    },
    {
      id: "limit-equilibrium",
      label: "Limit Equilibrium & Mitigation",
      description:
        "Limit-equilibrium modeling plus slope classification to propose effective mitigation for road cuts, tunnels and mountainous developments.",
      features: [
        "Limit equilibrium (Slide / SLOPE/W)",
        "Slope classification (RMR / GSI / Q)",
        "Mitigation design",
      ],
      image: `${PROJECTS}/01_groundworks/excavation_deep_trench.jpg`,
      icon: ShieldAlert,
      tone: "violet",
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────
// 7. Structural Assessment
// ─────────────────────────────────────────────────────────────────────
const structuralAssessment: ServiceConfig = {
  capabilities: [
    {
      id: "visual",
      label: "Visual Inspections",
      description:
        "On-site visual surveys that identify cracks, deformation, corrosion and other visible defects across buildings, bridges and industrial facilities.",
      features: [
        "Crack mapping & width monitoring",
        "Deflection & deformation surveys",
        "Photo log + deficiency register",
      ],
      image: `${PROJECTS}/02_structures_and_steel/steel_frame_closeup_sky.jpg`,
      icon: Eye,
      tone: "amber",
    },
    {
      id: "ndt",
      label: "Non-Destructive Testing",
      description:
        "NDT methods — Schmidt hammer, ultrasonic pulse velocity, cover meter and half-cell potential — that reveal hidden defects without damaging the structure.",
      features: [
        "Schmidt hammer & UPV",
        "Cover meter & rebar scanning",
        "Half-cell corrosion potential",
      ],
      image: `${PROJECTS}/02_structures_and_steel/steel_panel_ladder_detail.jpg`,
      icon: ScanLine,
      tone: "primary",
    },
    {
      id: "analysis",
      label: "Structural Analysis",
      description:
        "Engineering analysis of buildings, bridges and industrial facilities against current loads and codes — load path, capacity verification and code compliance.",
      features: [
        "Load path & capacity verification",
        "Code compliance review",
        "Modeling with recognized software",
      ],
      image: `${PROJECTS}/02_structures_and_steel/steel_frame_industrial_tanks.jpg`,
      icon: Building2,
      tone: "blue",
    },
    {
      id: "damage-incident-foundation",
      label: "Damage, Incident & Foundation",
      description:
        "Damage, deterioration and change-of-use assessments plus post-incident evaluations and integrated foundation design support with grouting, repair & micropiling.",
      features: [
        "Damage & change-of-use",
        "Post-incident evaluation",
        "Foundation design integration",
      ],
      image: `${PROJECTS}/02_structures_and_steel/steel_modular_units_desert.jpg`,
      icon: ShieldAlert,
      tone: "rose",
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────
// 8. Environmental Survey
// ─────────────────────────────────────────────────────────────────────
const environmentalSurvey: ServiceConfig = {
  capabilities: [
    {
      id: "eia",
      label: "EIA & Audits",
      description:
        "Environmental impact assessments and audits using international standards to evaluate impacts and propose mitigation measures.",
      features: [
        "Environmental Impact Assessments",
        "Environmental audits",
        "Mitigation & monitoring plans",
      ],
      image: `${PROJECTS}/new_landscaping/landscape_pool_palm_walkway.jpg`,
      icon: Leaf,
      tone: "emerald",
    },
    {
      id: "baseline",
      label: "Baseline Studies",
      description:
        "Pre-project baseline studies for air, water, soil and noise — plus physical, chemical and microbiological analyses of soil and water.",
      features: [
        "Air, water, soil & noise baseline",
        "Physical / chemical / microbiological",
        "Permit & compliance support",
      ],
      image: `${PROJECTS}/new_landscaping/landscape_garden_pathway_stones.jpg`,
      icon: FlaskConical,
      tone: "amber",
    },
    {
      id: "monitoring",
      label: "Compliance Monitoring",
      description:
        "Ongoing monitoring during construction and operations to verify compliance with approved limits and regulatory requirements.",
      features: [
        "Construction-phase monitoring",
        "Operational compliance",
        "Regulatory reporting",
      ],
      image: `${PROJECTS}/new_misc_industrial/gso_building_entrance_render.jpg`,
      icon: Wind,
      tone: "sky",
    },
    {
      id: "ecological",
      label: "Ecological Surveys",
      description:
        "Ecological surveys for flora, fauna and habitat baseline — supporting responsible project planning in infrastructure, industrial and resource sectors.",
      features: [
        "Flora & fauna baseline",
        "Habitat assessment",
        "Biodiversity-action plans",
      ],
      image: `${PROJECTS}/new_landscaping/landscape_pool_deck_pergola.jpg`,
      icon: Eye,
      tone: "violet",
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────
// 9. Anchoring & Shoring Design & Execution
// ─────────────────────────────────────────────────────────────────────
const anchoringShoring: ServiceConfig = {
  capabilities: [
    {
      id: "anchors",
      label: "Ground Anchors & Tiebacks",
      description:
        "Design and installation of ground anchors and tiebacks to retain excavations and stabilize slopes in deep-excavation projects.",
      features: [
        "Multi-strand & monobar anchors",
        "Tiebacks for deep excavations",
        "Load verification testing",
      ],
      image: `${PROJECTS}/01_groundworks/excavation_deep_trench.jpg`,
      icon: Anchor,
      tone: "amber",
    },
    {
      id: "walls",
      label: "Retaining Walls",
      description:
        "Retaining-wall systems — soldier beams & lagging, secant-pile and diaphragm walls — for deep cuts and basement construction.",
      features: [
        "Soldier beams & lagging",
        "Secant-pile walls",
        "Diaphragm / sheet-pile walls",
      ],
      image: `${PROJECTS}/01_groundworks/concrete_column_reinforcement.jpg`,
      icon: Layers3,
      tone: "primary",
    },
    {
      id: "shotcrete-nails",
      label: "Shotcrete & Soil Nails",
      description:
        "Shotcrete facing and soil nails for slope reinforcement and excavation support — flexible solutions for variable ground conditions.",
      features: [
        "Shotcrete facing",
        "Soil nail systems",
        "Erosion control",
      ],
      image: `${PROJECTS}/02_structures_and_steel/steel_frame_complete_blockwork.jpg`,
      icon: Wrench,
      tone: "sky",
    },
    {
      id: "slope-reinforcement",
      label: "Slope Reinforcement",
      description:
        "Reinforcement systems for cut slopes and unstable ground — combining nailing, mesh and shotcrete for long-term stability.",
      features: [
        "Cut-slope reinforcement",
        "Wire-mesh & steel grids",
        "Long-term stability assurance",
      ],
      image: `${PROJECTS}/01_groundworks/excavation_foundation_pits.jpg`,
      icon: MountainSnow,
      tone: "violet",
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────
// 10. Dewatering Design & Execution
// ─────────────────────────────────────────────────────────────────────
const dewatering: ServiceConfig = {
  capabilities: [
    {
      id: "deep-wells",
      label: "Deep Wells",
      description:
        "Deep-well dewatering for major excavations below the water table — boreholes, screens, submersible pumps and discharge treatment.",
      features: [
        "Deep-well boreholes & screens",
        "Submersible pumps",
        "Discharge & treatment design",
      ],
      image: `${PROJECTS}/new_mep_variety/mep_water_pump_ksb_blue.jpg`,
      icon: Droplets,
      tone: "sky",
    },
    {
      id: "wellpoints",
      label: "Wellpoint Systems",
      description:
        "Vacuum wellpoint systems for shallow excavations in sandy and silty soils — quick to install and remove.",
      features: [
        "Vacuum headers",
        "Self-jetting wellpoints",
        "Shallow drawdown control",
      ],
      image: `${PROJECTS}/03_mep/mep_basement_plant_room.jpg`,
      icon: FlaskConical,
      tone: "blue",
    },
    {
      id: "eductors",
      label: "Eductor Systems",
      description:
        "Eductor (jet-eductor) systems for confined excavations and deep, narrow shafts where conventional pumping can't reach.",
      features: [
        "Multi-stage eductor lifts",
        "Confined-space operation",
        "Energy-efficient pumping",
      ],
      image: `${PROJECTS}/03_mep/mep_underfloor_conduit_slab.jpg`,
      icon: Waves,
      tone: "violet",
    },
    {
      id: "sump-monitoring",
      label: "Sump & Monitoring",
      description:
        "Open sump pumping for minor inflows plus real-time drawdown and pump-system monitoring for safe, dry excavation.",
      features: [
        "Sump pits & submersible pumps",
        "Real-time drawdown monitoring",
        "Pump-system optimization",
      ],
      image: `${PROJECTS}/03_mep/mep_facade_duct_install.jpg`,
      icon: Compass,
      tone: "emerald",
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────
// 11. Soil Improvement & Concrete Repair
// ─────────────────────────────────────────────────────────────────────
const soilImprovement: ServiceConfig = {
  capabilities: [
    {
      id: "frp",
      label: "FRP Strengthening",
      description:
        "Fiber-reinforced polymer wrapping to upgrade flexural and shear capacity of beams, columns and slabs.",
      features: [
        "CFRP / GFRP laminates",
        "Column confinement wrapping",
        "Beam & slab flexural upgrade",
      ],
      image: `${PROJECTS}/02_structures_and_steel/steel_panel_ladder_detail.jpg`,
      icon: Layers3,
      tone: "primary",
    },
    {
      id: "micropiling",
      label: "Micropiling",
      description:
        "Small-diameter drilled and grouted piles to transfer structural loads through weak zones to competent strata.",
      features: [
        "Drilled micropiles 150–300 mm",
        "High-capacity threaded bars",
        "Low-headroom installation",
      ],
      image: `${PROJECTS}/new_towers_highrise/structural_foundation_footings_v2.jpg`,
      icon: Hammer,
      tone: "amber",
    },
    {
      id: "soil-injection",
      label: "Soil Injection",
      description:
        "Permeation, compaction and resin injection to densify loose soils and stabilize structures affected by settlement.",
      features: [
        "Permeation & compaction grouting",
        "Polyurethane resin injection",
        "Settlement-prone ground",
      ],
      image: `${PROJECTS}/01_groundworks/infrastructure_compaction_roller.jpg`,
      icon: Wrench,
      tone: "sky",
    },
    {
      id: "jacketing-epoxy",
      label: "Jacketing & Epoxy Repair",
      description:
        "Concrete and steel column jacketing plus epoxy crack injection, polyurethane resin systems and chemical-resistant floor screeds.",
      features: [
        "RC & steel column jacketing",
        "Epoxy crack injection",
        "Self-leveling screeds",
      ],
      image: `${PROJECTS}/05_waterproofing_and_insulation/insulation_epoxy_floor_dots.jpg`,
      icon: ShieldAlert,
      tone: "violet",
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────
// 12. Mining Exploration
// ─────────────────────────────────────────────────────────────────────
const miningExploration: ServiceConfig = {
  capabilities: [
    {
      id: "mapping-mine",
      label: "Geological Mapping",
      description:
        "Geological mapping of mineral prospects — lithology, alteration, structure and vein mapping — to define drill targets.",
      features: [
        "Lithology & alteration maps",
        "Structural & vein mapping",
        "3D geological model",
      ],
      image: `${PROJECTS}/new_misc_industrial/steel_frame_silo_tank_structure.jpg`,
      icon: Mountain,
      tone: "amber",
    },
    {
      id: "geochem",
      label: "Geochemical Sampling",
      description:
        "Soil, rock and trench sampling with multi-element analysis and QA/QC protocols to identify drill targets.",
      features: [
        "Soil, rock & trench sampling",
        "Sample preparation",
        "Multi-element ICP analysis",
      ],
      image: `${PROJECTS}/new_misc_industrial/groundworks_water_truck_trench.jpg`,
      icon: FlaskConical,
      tone: "primary",
    },
    {
      id: "drilling",
      label: "Core Drilling & Geophysics",
      description:
        "RC and diamond core drilling with logging, sampling and downhole geophysics for resource definition.",
      features: [
        "Reverse-circulation drilling",
        "Diamond core drilling",
        "Downhole geophysics",
      ],
      image: `${PROJECTS}/01_groundworks/concrete_rebar_footing.jpg`,
      icon: Pickaxe,
      tone: "sky",
    },
    {
      id: "resource-licensing",
      label: "Resource & Licensing",
      description:
        "Resource estimation to JORC / NI 43-101 plus mining-licence documentation — exploration, exploitation and renewal.",
      features: [
        "3D block-model estimation",
        "JORC / NI 43-101 reporting",
        "Mining-licence documentation",
      ],
      image: `${PROJECTS}/new_misc_industrial/gso_building_entrance_render.jpg`,
      icon: Compass,
      tone: "emerald",
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────
// Registry
// ─────────────────────────────────────────────────────────────────────
export const serviceShowcaseConfig: Record<string, ServiceConfig> = {
  "material-testing-quality-control": materialTesting,
  "topographical-survey": topographicalSurvey,
  "hydrology-studies": hydrologyStudies,
  "hydrogeological-studies": hydrogeologicalStudies,
  "cavity-probing-grouting-micro-piling": cavityProbing,
  "geological-survey-rock-slope-stability": geologicalSurvey,
  "structural-assessment": structuralAssessment,
  "environmental-survey": environmentalSurvey,
  "anchoring-shoring-design-execution": anchoringShoring,
  "dewatering-design-execution": dewatering,
  "soil-improvement-concrete-repair": soilImprovement,
  "mining-exploration": miningExploration,
};