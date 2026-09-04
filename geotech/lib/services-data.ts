// geotech/lib/services-data.ts
//
// VERIFIED against old.geodrillksa.com — every overview paragraph and capability
// line below is transcribed (lightly cleaned of ligature/typo artifacts) from the
// live page for that service. Nothing here is invented.
//
// Where the source page names NO specific standard/code, `standardsReferenced`
// is omitted entirely rather than filled with a plausible-sounding one — several
// entries in the previous version of this file cited standards (FHWA, EPA,
// Eurocode 7, ASFE, Bieniawski RMR, ASTM E1527, ASTM D4050/D5343, ASTM C1107,
// ACI 201/546) that do not appear anywhere on the corresponding GEODRILL page.
// Do not reintroduce them without a real source.
//
// Image paths point to where each photo should live locally. The comment above
// each gallery array gives the exact source URL to download from — pull all of
// them, since GEODRILL already has real field photography for every one of
// these services; no stock or placeholder images should replace them.

export type ServiceCategory = "Ground" | "Testing" | "Engineering" | "Studies";

export interface ServiceContent {
  slug: string;
  category: ServiceCategory;
  title: string;
  heroImage: string;
  heroAlt: string;
  shortDescription: string;
  overview: string[];
  capabilities: string[] | Record<string, string[]>;
  standardsReferenced?: string[];
  processSteps?: { label: string; description?: string }[];
  gallery: { src: string; alt: string; caption: string }[];
  relatedServices: string[];
}

export const servicesData: Record<string, ServiceContent> = {
  // ─────────────────────────────────────────────────────────────────────
  "geotechnical-investigation": {
    slug: "geotechnical-investigation",
    category: "Ground",
    title: "Geotechnical Investigation",
    // source: old.geodrillksa.com/wp-content/uploads/2021/11/Geotechnical-Investigation.webp
    heroImage: "/images/services/geotechnical-investigation/hero.webp",
    heroAlt: "Geotechnical investigation drilling equipment on site",
    shortDescription:
      "Comprehensive soil and rock investigation using modern drilling techniques and in-situ testing.",
    overview: [
      "The GEODRILL Geotechnical Division is composed of skilled geotechnical engineers, geophysicists, and geologists with deep expertise across diverse subsurface conditions. We apply modern, cost-effective investigation techniques and advanced design software to deliver practical ground solutions.",
      "Our team performs a wide range of drilling and in-situ testing using various drilling methods, supporting comprehensive subsurface investigations. All fieldwork is executed in compliance with ASTM, BS, SBC and other relevant industry standards.",
      "GEODRILL is committed to providing high-quality services, technical consultation, and on-site inspections across all areas of geotechnical engineering.",
    ],
    capabilities: [
      "Soil Investigation (Boring, Coring and Sampling — SPT & CPT)",
      "Pressuremeter Testing",
      "Packer (Lugeon) Test for Rock",
      "Falling & Constant Head Permeability",
      "Plate Load Test",
      "Percolation Testing",
      "DCP and DPSH Testing",
      "Soil Electrical Resistivity",
      "Soil Thermal Resistivity",
      "Test Pits Excavation",
      "In-Situ CBR",
      "Installation of Piezometers (Water Table Monitoring Wells)",
      "Pull-out Testing",
    ],
    standardsReferenced: ["ASTM", "BS", "SBC"],
    gallery: [
      // source: .../2025/08/1-e1755843969145-1024x1011.webp
      {
        src: "/images/services/geotechnical-investigation/gallery-1.webp",
        alt: "Geotechnical investigation fieldwork",
        caption: "Field investigation and drilling operations",
      },
      // source: .../2025/08/Geodrill-profile-source-1-26.webp
      {
        src: "/images/services/geotechnical-investigation/gallery-2.webp",
        alt: "Borehole drilling rig on site",
        caption: "Borehole drilling rig on site",
      },
      // source: .../2025/08/Geodrill-profile-source-1-25.webp
      {
        src: "/images/services/geotechnical-investigation/gallery-3.webp",
        alt: "SPT sampling during investigation",
        caption: "SPT sampling during a field investigation",
      },
      // source: .../2025/08/Geodrill-profile-source-1-41.webp
      {
        src: "/images/services/geotechnical-investigation/gallery-4.webp",
        alt: "In-situ testing equipment",
        caption: "In-situ testing equipment deployed on site",
      },
      // source: .../2025/08/Geodrill-profile-source-1-40.webp
      {
        src: "/images/services/geotechnical-investigation/gallery-5.webp",
        alt: "Test pit excavation",
        caption: "Test pit excavation and logging",
      },
      // source: .../2025/08/Geodrill-profile-source-1-44.webp
      {
        src: "/images/services/geotechnical-investigation/gallery-6.webp",
        alt: "Piezometer installation",
        caption: "Piezometer installation for water table monitoring",
      },
      // source: .../2025/08/Geodrill-profile-source-1-50.webp
      {
        src: "/images/services/geotechnical-investigation/gallery-7.webp",
        alt: "Soil sample recovery",
        caption: "Soil sample recovery and labeling",
      },
      // source: .../2025/08/Geodrill-profile-source-1-54.webp
      {
        src: "/images/services/geotechnical-investigation/gallery-8.webp",
        alt: "Geotechnical crew on active site",
        caption: "GEODRILL field crew on an active investigation site",
      },
    ],
    relatedServices: ["geophysical-survey", "material-testing-quality-control"],
  },

  // ─────────────────────────────────────────────────────────────────────
  "material-testing-quality-control": {
    slug: "material-testing-quality-control",
    category: "Testing",
    title: "Material Testing & Quality Control",
    // source: .../2025/08/Material-Testing-Quality-Control-1024x1024.webp
    heroImage: "/images/services/material-testing/hero.webp",
    heroAlt: "Material testing laboratory equipment and concrete samples",
    shortDescription:
      "Independent testing of soil, concrete, asphalt, cement, aggregates and steel, plus on-site quality control.",
    overview: [
      "GEODRILL supports major construction projects by providing independent, high-quality materials testing, helping ensure reliable data and eliminating potential conflicts of interest in project quality assurance.",
      "In alignment with our commitment to innovation, cost-effectiveness, and engineering excellence, GEODRILL delivers a broad range of construction materials testing services through highly qualified and certified professionals.",
      "Testing capabilities cover soil, rock and aggregates; concrete, cement and chemical additives; asphalt, bitumen and paving materials; and masonry blocks, building stones, steel and water. GEODRILL also offers on-site testing services for large-scale projects, supported by technical expertise and efficient mobilization — ensuring compliance with quality standards and project specifications.",
    ],
    // NOTE: this service has 11 real test-category groups on the source page —
    // the previous file only had 4. All 11 are below; do not drop any.
    capabilities: {
      "Concrete — Fresh Concrete Tests": [
        "Temperature of Freshly Mixed Hydraulic-Cement Concrete (ASTM C1064/C1064M)",
        "Sampling Freshly Mixed Concrete (ASTM C172)",
        "Slump of Hydraulic-Cement Concrete (ASTM C143)",
        "Unit Weight, Yield and Air Content (ASTM C138)",
        "Air Content (ASTM C173 or C231)",
        "Making and Curing Concrete Test Specimens in the Field (ASTM C31 or BS 1881)",
      ],
      "Soil/Fill/Backfill Materials Testing": [
        "Field Density Test, Sand Cone Method (ASTM D1556)",
        "Field Density Test, Nuclear Method (ASTM D2922)",
        "Washed Sieve Analysis (ASTM C136)",
        "Atterberg Limits (ASTM D4318)",
        "Moisture-Density Relationship of Cohesive Soil (ASTM D1557)",
        "Max./Min. Index Densities of Non-Cohesive Soil, Relative Density (ASTM D4253)",
        "Hydrometer Analysis, incl. Sieve Analysis (ASTM D422)",
        "CBR Test (ASTM D1883)",
        "Sulphate and Chloride Content (BS 1377)",
        "Plate Bearing Test (ASTM D1194)",
        "Lab Permeability, Constant Head (ASTM D2434)",
        "Lab Permeability, Falling Head (ASTM E2396)",
        "Triaxial Test (ASTM D2850)",
        "Consolidation Test (ASTM D2435)",
        "Direct Shear Test (ASTM D3080)",
        "Unconfined Compression Test for Soil (ASTM D2166)",
        "Unconfined Compression Test for Rock (ASTM D2938)",
      ],
      "On-site Soil/Fill/Backfill Quality Control": [
        "Field Density Test, Sand Cone Method (ASTM D1556)",
        "Field Density Test, Nuclear Method (ASTM D2922)",
        "CBR Test (ASTM D1883)",
        "Plate Bearing Test (ASTM D1194)",
      ],
      "Concrete — Hardened Concrete (Non-Destructive)": [
        "Schmidt Hammer Test (ASTM C805)",
        "Ultrasonic Test (ASTM C597)",
        "Pull-out Test (ASTM C900)",
        "Corrosion Analysis / Half-Cell Potential (ASTM C876)",
      ],
      "Concrete — Destructive Tests": [
        "Compressive Strength (ASTM C39)",
        "Splitting Tensile Strength (ASTM C496)",
        "Flexural Strength (ASTM C78)",
        "Concrete Core Test (ASTM C42)",
        "Concrete Mix Design",
        "Chemical Analysis — Carbonation, Cement Content, Chlorides/Sulfates",
      ],
      "Concrete — On-site Quality Control": [
        "Slump Test (ASTM C143)",
        "Concrete Temperature (ASTM C143)",
        "Concrete Sampling, Cylinder or Cube (ASTM C31)",
        "Compressive Strength, Cylinder or Cube (ASTM C39)",
        "Density, Cylinder or Cube",
        "Air Content & Unit Weight",
      ],
      "Asphalt Testing": [
        "Bitumen Penetration (AASHTO T49)",
        "Bitumen Softening Point, Ring & Ball (AASHTO T53)",
        "Bitumen Flash & Fire Point (ASTM D92)",
        "Bitumen Viscosity (ASTM D88)",
        "Bitumen Ductility (ASTM D113)",
        "Asphalt Extraction (ASTM D6847)",
        "Maximum Theoretical Specific Gravity, Gmm (ASTM D2041)",
        "Marshall & Flow Test (ASTM D6927)",
        "Asphalt Mix Design; Asphalt Coring at Site (ASTM D2950)",
      ],
      "Cement Tests": [
        "Specific Gravity of Cement (ASTM C188)",
        "Setting Time (ASTM C191)",
        "Compressive Strength (ASTM C109)",
        "Fineness of Hydraulic Cement (ASTM C204)",
        "Loss on Ignition (ASTM C114)",
      ],
      "Aggregate Tests": [
        "Sampling Aggregates (ASTM D75)",
        "Reducing Field Samples to Testing Size (ASTM C702)",
        "Sieve Analysis of Aggregates (ASTM C136)",
        "Material Finer than No. 200 Sieve, by Washing (ASTM C117)",
        "Specific Gravity & Absorption, Coarse Aggregate (ASTM C127)",
        "Specific Gravity & Absorption, Fine Aggregate (ASTM C128)",
        "Organic Impurities in Fine Aggregate (ASTM C40)",
        "Total Moisture Content by Drying (ASTM C566)",
        "Unit Weight and Voids in Aggregates (ASTM C29)",
        "Resistance to Degradation, Coarse Aggregate (ASTM C131)",
        "Clay Lumps and Friable Particles (ASTM C142)",
        "Soundness of Aggregate (ASTM C88)",
        "Potential Reactivity of Aggregate (ASTM C289)",
        "Flat and Elongated Particles, Coarse Aggregate (ASTM D4791 / BS 812)",
        "Chloride in Aggregate (BS 812)",
        "Sulfate in Aggregate (BS 812)",
        "Crushing Value of Aggregate (BS 812)",
        "10% Fines Value of Aggregate (BS 812)",
        "Aggregate Shape Test — Angularity Number (BS 812)",
      ],
      "Steel Tests": [
        "Yield & Ultimate Stress (ASTM A370)",
        "Elongation at Breakage (ASTM A370)",
        "Cold Bend Test (ASTM A370)",
      ],
      "Pile Testing": [
        "High Strain Pile Dynamic Analysis, PDA (Cast In-Situ and Driven Piles)",
        "Cross Hole Sonic Logging (CHL)",
        "Mechanical Caliper Logging (MCL)",
        "Low Strain Pile Integrity Testing, PIT (Cast In-Situ Concrete Piles)",
        "Pile Instrumentation (PI)",
        "Pile Pull-out Test (PPOT)",
      ],
    },
    standardsReferenced: ["ASTM", "AASHTO", "BS"],
    gallery: [
      // source: .../2025/08/Geodrill-profile-source-1-60.webp
      {
        src: "/images/services/material-testing/gallery-1.webp",
        alt: "Fresh concrete slump testing",
        caption: "Fresh concrete slump testing on site",
      },
      // source: .../2025/08/Geodrill-profile-source-1-62.webp
      {
        src: "/images/services/material-testing/gallery-2.webp",
        alt: "Soil sample preparation in lab",
        caption: "Soil sample preparation for laboratory testing",
      },
      // source: .../2025/08/Geodrill-profile-source-1-69.webp
      {
        src: "/images/services/material-testing/gallery-3.webp",
        alt: "Field density testing, sand cone method",
        caption: "Field density testing, sand cone method",
      },
      // source: .../2025/08/Geodrill-profile-source-1-75.webp
      {
        src: "/images/services/material-testing/gallery-4.webp",
        alt: "Schmidt hammer non-destructive test",
        caption: "Schmidt hammer test on hardened concrete",
      },
      // source: .../2025/08/Geodrill-profile-source-1-78-e1756188182498.webp
      {
        src: "/images/services/material-testing/gallery-5.webp",
        alt: "Concrete core extraction",
        caption: "Concrete core extraction for compressive strength testing",
      },
      // source: .../2025/08/Geodrill-profile-source-1-83.webp
      {
        src: "/images/services/material-testing/gallery-6.webp",
        alt: "Asphalt sample testing",
        caption: "Asphalt mix sample testing",
      },
      // source: .../2025/08/Geodrill-profile-source-1-100.webp
      {
        src: "/images/services/material-testing/gallery-7.webp",
        alt: "Aggregate sieve analysis",
        caption: "Aggregate sieve analysis in the lab",
      },
      // source: .../2025/08/Geodrill-profile-source-1-101.webp
      {
        src: "/images/services/material-testing/gallery-8.webp",
        alt: "Pile integrity testing equipment",
        caption: "Low strain pile integrity testing (PIT) equipment",
      },
    ],
    relatedServices: ["topographical-survey", "geotechnical-investigation"],
  },

  // ─────────────────────────────────────────────────────────────────────
  "topographical-survey": {
    slug: "topographical-survey",
    category: "Testing",
    title: "Topographical Survey",
    // source: .../2025/08/Topographical-Survey-1024x1024.webp
    heroImage: "/images/services/topographical-survey/hero.webp",
    heroAlt: "Topographical survey mapping with drone and GPS equipment",
    shortDescription:
      "High-precision topographic surveying using GPS, GIS, drone mapping and mobile mapping systems.",
    overview: [
      "GEODRILL is proud to deliver high-precision topographic surveying services across the Kingdom of Saudi Arabia, supported by a team of qualified professionals and state-of-the-art equipment.",
      "Our capabilities include the use of advanced technologies such as GPS, GIS, drone mapping, and mobile mapping systems. With well-established infrastructure and extensive experience in engineering and construction projects, we provide accurate, cost-effective, and reliable survey solutions tailored to the specific needs of our clients.",
      "Our services support all phases of infrastructure and development projects, ensuring compliance with the highest technical and industry standards.",
    ],
    capabilities: {
      "Core Survey Activities": [
        "Land Record Projects",
        "Site Surveying — Cadastral, Water Systems, Sanitary Drainage Works",
        "Site Surveying for Roads and Infrastructure",
        "Setting Out Structural Plans",
        "Establishment of Geodetic Networks",
        "Setting Out Approved Site Plans",
        "Topographic, Detailed Cadastral, Contour and Grid Elevation Survey",
        "Matching / Establishment of Title on Site",
      ],
      "Additional Survey Capabilities": [
        "Drone Survey",
        "Mobile Mapping",
        "Bathymetric Survey",
        "Geographic Information Systems (GIS)",
        "Remote Sensing",
        "Urban Planning",
        "Building Information Modeling (BIM)",
        "Architectural Survey",
      ],
    },
    gallery: [
      // source: .../2025/09/Geodrill-profile-source-1-109.webp
      {
        src: "/images/services/topographical-survey/gallery-1.webp",
        alt: "GPS topographic survey equipment",
        caption: "GPS survey equipment in the field",
      },
      // source: .../2025/09/Geodrill-profile-source-1-110.webp
      {
        src: "/images/services/topographical-survey/gallery-2.webp",
        alt: "Drone mapping in progress",
        caption: "Drone mapping survey in progress",
      },
      // source: .../2025/09/Geodrill-profile-source-1-111.webp
      {
        src: "/images/services/topographical-survey/gallery-3.webp",
        alt: "Total station setup on site",
        caption: "Total station setup for site survey",
      },
      // source: .../2025/09/Geodrill-profile-source-1-115.webp
      {
        src: "/images/services/topographical-survey/gallery-4.webp",
        alt: "Contour mapping fieldwork",
        caption: "Fieldwork supporting contour and grid elevation mapping",
      },
      // source: .../2025/09/Geodrill-profile-source-1-120.webp
      {
        src: "/images/services/topographical-survey/gallery-5.webp",
        alt: "GIS data collection on site",
        caption: "GIS-based data collection on site",
      },
    ],
    relatedServices: [
      "hydrology-studies",
      "geological-survey-rock-slope-stability",
    ],
  },

  // ─────────────────────────────────────────────────────────────────────
  "geophysical-survey": {
    slug: "geophysical-survey",
    category: "Ground",
    title: "Geophysical Survey",
    // source: .../2025/08/Geophysical-Survey-1024x1024.webp
    heroImage: "/images/services/geophysical-survey/hero.webp",
    heroAlt:
      "Geophysical survey equipment including GPR and seismic instruments",
    shortDescription:
      "A full range of geophysical methods — MASW, GPR, resistivity, seismic, EMI, magnetic, gravity and borehole logging — processed and interpreted from our Riyadh data centre.",
    overview: [
      "GEODRILL takes pride in its highly experienced and versatile team, particularly in geophysical survey projects. Our key personnel bring extensive expertise in project management, geophysical services, and equipment rental — individually or combined.",
      "We are committed to delivering high-resolution survey results with precision. Data can be processed and interpreted on-site or at our Riyadh-based data centre, with reporting available in various professional formats.",
      "At GEODRILL, we continually strive to advance survey methodologies and provide tailored solutions to even the most complex challenges.",
    ],
    // NOTE: this is the deepest service on the old site — 17 survey types across
    // 10 distinct methods. The previous file collapsed this to 6 generic items;
    // all 10 method sections and their real application lists are below.
    capabilities: {
      "Range of Geophysical Surveys": [
        "MASW (Multi-channel Analysis of Surface Waves)",
        "Electrical Resistivity Tomography",
        "Microgravity Surveys",
        "Electromagnetism (EM34)",
        "Ground Penetrating Radar",
        "Radio Detection / Utilities Detection",
        "Vertical Electric Sounding",
        "Cross-hole Seismic",
        "Down-hole Seismic",
        "Refraction Seismic",
        "Reflection Seismic",
        "Magnetic Survey",
        "Gravity Exploration (Macro)",
        "Suspension Logging",
        "Vertical Electrical Tomography (VET)",
        "Resistivity and Temperature Logging",
        "Acoustic Televiewer & Camera Logging",
      ],
      "MASW — Applications": [
        "Site Classification for Seismic Hazard Analysis (e.g. NEHRP, Eurocode)",
        "Determination of Vs30 (Average Shear-Wave Velocity, Upper 30m)",
        "Detection of Soft Layers, Weak Zones and Cavities",
        "Soil Liquefaction Potential Studies",
        "Compaction Control and Ground Improvement Verification",
        "Subsurface Profiling for Infrastructure Design (Roads, Dams, Buildings)",
      ],
      "Ground Penetrating Radar (GPR) — Applications": [
        "Detection of Underground Utilities (Pipes & Cables)",
        "Soil/Bedrock Interface Detection, Shallow Geological Investigations",
        "Detection of Subsurface Cavities, Voids & Fractures",
        "Detection of Ground Contamination for Environmental Studies",
        "Mineral Exploration via Crack & Fracture Studies",
        "Water Table Detection",
        "Road Investigations (Layer Thickness & Subsidence)",
        "Honeycomb Weathering & Void Detection in Concrete Elements",
      ],
      "Seismic Refraction — Used to Determine": [
        "Bedrock Profile, Rock Quality & Depth",
        "Thickness of Overburden / Weathered Layer",
        "Slope Stability Study Guidance",
        "Pipeline Route Studies (Soil/Rock Properties)",
        "Fractures & Weak Zone Determination",
        "Groundwater/Aquifer Topography",
        "Rippability Assessment in Mines",
      ],
      "Electrical Resistivity — Sounding & Tomography": [
        "Landfill Studies",
        "Dam Structure Analysis",
        "Mineral Prospecting",
        "Bedrock Quality & Depth Measurement",
        "Groundwater Resource Determination",
        "Stratigraphic Studies (Soil/Rock Depths)",
        "Oil/Fuel Contamination Detection",
        "Sinkhole, Cavity & Fracture Detection",
      ],
      "EMI — Electromagnetic Induction": [
        "Locating and Tracing Buried Utilities (Pipes/Wires)",
        "Depth Estimation of Located Facilities",
      ],
      "Cross-Hole & Down-Hole Seismic": [
        "Elastic Property Determination Between Boreholes (P & S Wave Travel Times)",
        "Dynamic Moduli Calculation",
        "Single-Hole Seismic Wave Velocity Calculation (Down-Hole)",
      ],
      "Magnetic Surveys — Applications": [
        "Preliminary/Certification Site Surveys",
        "Detection of Underground Buried Tanks & Drums",
        "Geological Mapping",
        "Mineral Exploration & Fracture Detection",
        "Archaeological Studies",
      ],
      "Microgravity Surveys — Applications": [
        "Mapping of Lateral Lithological Changes",
        "Mineral Exploration (Sulphide, Copper, Iron, Zinc Deposits)",
        "Bedrock Topography Under Landfills",
        "Underground Cavity & Void Detection",
        "Detection & Mapping of Large Metallic Mineral Deposits",
        "Locating Contacts Between Geological Units of Different Mass/Density",
      ],
      "Optical & Acoustic Logging — Applications": [
        "Fracture Detection and Evaluation",
        "Detection of Thin Beds",
        "Determination of Bedding Dip",
        "Lithological Interpretation",
      ],
      "Suspension Logging — Applications": [
        "Hydrogeology — Aquifer Characteristics, Groundwater Flow, Contamination Levels",
        "Geotechnical Engineering — Soil and Rock Stability for Construction",
        "Mining & Exploration — Ore Body Mapping and Mineral Concentration",
        "Oil & Gas — Reservoir Properties and Formation Integrity",
      ],
    },
    gallery: [
      // source: .../2025/09/Geodrill-profile-source-1-128.webp
      {
        src: "/images/services/geophysical-survey/gallery-1.webp",
        alt: "Geophysical survey field equipment",
        caption: "Geophysical survey field equipment setup",
      },
      // source: .../2025/09/Geophysical-Survey.webp
      {
        src: "/images/services/geophysical-survey/gallery-2.webp",
        alt: "Geophysical survey crew on site",
        caption: "GEODRILL geophysics crew on site",
      },
      // source: .../2025/09/Geodrill-profile-source-1-140.webp
      {
        src: "/images/services/geophysical-survey/gallery-3.webp",
        alt: "MASW survey array",
        caption: "MASW geophone array in the field",
      },
      // source: .../2025/09/Geodrill-profile-source-1-142.webp
      {
        src: "/images/services/geophysical-survey/gallery-4.webp",
        alt: "GPR survey in progress",
        caption: "Ground penetrating radar (GPR) survey in progress",
      },
      // source: .../2025/09/Geodrill-profile-source-1-146.webp
      {
        src: "/images/services/geophysical-survey/gallery-5.webp",
        alt: "Seismic refraction survey setup",
        caption: "Seismic refraction survey setup",
      },
      // source: .../2025/09/Geodrill-profile-source-1-161.webp
      {
        src: "/images/services/geophysical-survey/gallery-6.webp",
        alt: "Magnetic survey equipment",
        caption: "Magnetic survey equipment in the field",
      },
      // source: .../2025/09/Geodrill-profile-source-1-172.webp
      {
        src: "/images/services/geophysical-survey/gallery-7.webp",
        alt: "Suspension logging in borehole",
        caption: "Suspension logging operation at a borehole",
      },
    ],
    relatedServices: [
      "geotechnical-investigation",
      "geological-survey-rock-slope-stability",
    ],
  },

  // ─────────────────────────────────────────────────────────────────────
  "hydrology-studies": {
    slug: "hydrology-studies",
    category: "Studies",
    title: "Hydrology Studies",
    // source: .../2025/08/Hydrology-Studies-1024x1024.webp
    heroImage: "/images/services/hydrology/hero.webp",
    heroAlt: "Hydrological field measurement and water flow analysis",
    shortDescription:
      "Surface and groundwater analysis, flood risk assessment, and hydrological modeling.",
    overview: [
      "At GEODRILL we offer comprehensive hydrological studies aimed at understanding surface and groundwater behavior for infrastructure planning, risk mitigation, and sustainable development. Our team utilizes advanced software, GIS-based modeling, and field investigations to assess water flow, flood risks, recharge potential, and water balance.",
      "We support government, industrial, and private sector clients with accurate data, reliable simulations, and practical recommendations tailored to project-specific and regional conditions.",
    ],
    capabilities: [
      "Flood Risk Assessment and Inundation Mapping for Various Return Periods",
      "Surface Water Runoff Analysis for Stormwater Design and Drainage Planning",
      "Groundwater Investigations for Aquifer Characterization and Recharge Potential",
      "Hydrological & Hydraulic Modeling Using Industry-Standard Tools",
      "Catchment and Watershed Analysis to Support Planning and Environmental Impact Studies",
      "Water Resource Management Strategies Aligned with Regulatory Standards",
    ],
    gallery: [
      // source: .../2025/09/Geodrill-profile-source-1-178.webp
      {
        src: "/images/services/hydrology/gallery-1.webp",
        alt: "Hydrological field survey",
        caption: "Hydrological field data collection",
      },
      // source: .../2025/09/Geodrill-profile-source-1-179.webp
      {
        src: "/images/services/hydrology/gallery-2.webp",
        alt: "Water flow measurement",
        caption: "Surface water flow measurement",
      },
      // source: .../2025/09/Main.webp
      {
        src: "/images/services/hydrology/gallery-3.webp",
        alt: "Watershed and catchment terrain",
        caption:
          "Watershed and catchment terrain assessed for hydrological modeling",
      },
      // source: .../2025/09/Geodrill-profile-source-1-182.webp
      {
        src: "/images/services/hydrology/gallery-4.webp",
        alt: "Drainage infrastructure survey",
        caption: "Drainage and stormwater infrastructure survey",
      },
    ],
    relatedServices: ["hydrogeological-studies", "topographical-survey"],
  },

  // ─────────────────────────────────────────────────────────────────────
  "hydrogeological-studies": {
    slug: "hydrogeological-studies",
    category: "Ground",
    title: "Hydrogeological Studies",
    // source: .../2025/08/Hydrogeological-Studies-1024x1024.webp
    heroImage: "/images/services/hydrogeological/hero.webp",
    heroAlt: "Hydrogeological well drilling and groundwater testing",
    shortDescription:
      "Groundwater assessment, aquifer characterization and geoelectrical investigation for water resource management.",
    overview: [
      "GEODRILL is a specialized firm offering expert hydrogeological and environmental survey services. We deliver dependable solutions in groundwater assessment, aquifer characterization, and geophysical investigations, utilizing advanced technologies and a team of experienced professionals.",
      "With a strong commitment to quality, efficiency, and environmental compliance, GEODRILL supports clients in optimizing water resource management while meeting national and international regulatory standards.",
    ],
    capabilities: [
      "Drilling of Water Wells for Domestic, Agricultural, and Industrial Use",
      "Aquifer Performance Evaluation Through Pumping and Slug Tests",
      "Permeability and Hydraulic Conductivity Testing",
      "Water Quality Analysis for Chemical and Microbiological Parameters",
      "Geoelectrical Surveys for Subsurface Profiling and Aquifer Mapping",
    ],
    gallery: [
      // source: .../2025/09/Geodrill-profile-source-1-187.webp
      {
        src: "/images/services/hydrogeological/gallery-1.webp",
        alt: "Water well drilling rig",
        caption: "Water well drilling operation",
      },
      // source: .../2025/09/Geodrill-profile-source-1-188.webp
      {
        src: "/images/services/hydrogeological/gallery-2.webp",
        alt: "Aquifer pumping test",
        caption: "Aquifer performance pumping test",
      },
      // source: .../2025/09/Geodrill-profile-source-1-190.webp
      {
        src: "/images/services/hydrogeological/gallery-3.webp",
        alt: "Geoelectrical survey for groundwater",
        caption: "Geoelectrical survey for aquifer mapping",
      },
    ],
    relatedServices: ["hydrology-studies", "geotechnical-investigation"],
  },

  // ─────────────────────────────────────────────────────────────────────
  "cavity-probing-grouting-micro-piling": {
    slug: "cavity-probing-grouting-micro-piling",
    category: "Engineering",
    title: "Cavity Probing, Grouting & Micropiling",
    // source: .../2025/08/Cavity-Probing-Grouting-Micro-piling-Services-1-1024x1024.webp
    heroImage: "/images/services/cavity-probing/hero.webp",
    heroAlt: "Micropile installation and cavity grouting operations",
    shortDescription:
      "Subsurface void detection, pressure grouting, and micropile foundation solutions for complex ground conditions.",
    overview: [
      "GEODRILL offers specialized services in cavity probing, grouting, and micropiling to improve ground stability and support structures in complex geological conditions. Our geotechnical team uses advanced methods to detect underground voids, fill them with pressure grouting, and reinforce foundations through high-performance micropiles.",
      "These services are essential in addressing challenges such as karst formations, collapsing soils, and settlement-prone zones. They are ideal for infrastructure upgrades, structural retrofits, and sites requiring precise foundation solutions.",
    ],
    capabilities: [
      "Cavity Probing — Locate and Assess Subsurface Anomalies",
      "Pressure Grouting — Fill Voids, Control Settlement, Enhance Bearing Capacity",
      "Micropiling & Underpinning — Foundation Support in Restricted or Sensitive Areas",
      "Soil Improvement — Compaction Grouting to Densify Weak Ground",
    ],
    gallery: [
      // source: .../2025/09/Geodrill-profile-source-1-228.webp
      {
        src: "/images/services/cavity-probing/gallery-1.webp",
        alt: "Micropile installation rig",
        caption: "Micropile installation rig on site",
      },
      // source: .../2025/09/Geodrill-profile-source-1-229.webp
      {
        src: "/images/services/cavity-probing/gallery-2.webp",
        alt: "Pressure grouting operation",
        caption: "Pressure grouting operation",
      },
      // source: .../2025/09/Geodrill-profile-source-1-230.webp
      {
        src: "/images/services/cavity-probing/gallery-3.webp",
        alt: "Cavity probing equipment",
        caption: "Cavity probing equipment deployed on site",
      },
      // source: .../2025/09/Geodrill-profile-source-1-233.webp
      {
        src: "/images/services/cavity-probing/gallery-4.webp",
        alt: "Underpinning works in progress",
        caption: "Underpinning works in progress",
      },
    ],
    relatedServices: [
      "geotechnical-investigation",
      "soil-improvement-concrete-repair",
    ],
  },

  // ─────────────────────────────────────────────────────────────────────
  "geological-survey-rock-slope-stability": {
    slug: "geological-survey-rock-slope-stability",
    category: "Ground",
    title: "Geological Survey & Rock Slope Stability",
    // source: .../2025/08/Geological-Survey-Rock-Slope-Stability-Services-1-1024x1024.webp
    heroImage: "/images/services/geological-survey/hero.webp",
    heroAlt: "Rock slope stability assessment and geological mapping",
    shortDescription:
      "Geological characterization and rock slope stability assessment for infrastructure, mining and mountainous developments.",
    overview: [
      "GEODRILL provides comprehensive geological survey and rock slope stability services tailored to meet the demands of modern infrastructure, mining, and environmental projects. Our expert team of geologists and geotechnical engineers applies advanced techniques to deliver accurate, site-specific geological insights essential for safe and sustainable development.",
      "Our geological survey services include detailed structural and lithological mapping, terrain classification, geomorphological analysis, and geotechnical investigations. Using a combination of field surveys, remote sensing, and GIS-based tools, we generate high-resolution geological models that guide planning and design.",
      "In rock slope stability, GEODRILL conducts thorough assessments to evaluate potential failure mechanisms. We utilize kinematic analysis, limit equilibrium modeling, and slope classification systems to identify hazards and propose effective mitigation measures. These evaluations are crucial in projects involving road cuts, tunnels, quarries, dams, and mountainous developments.",
    ],
    // NOTE: the source page has no numbered capability list and names no
    // formal classification standard (no RMR, Q-System, RQD, or ISRM
    // citation anywhere on the page) — the items below are extracted
    // directly from the narrative above, not invented beyond it.
    capabilities: {
      "Geological Survey": [
        "Structural and Lithological Mapping",
        "Terrain Classification",
        "Geomorphological Analysis",
        "Geotechnical Investigations",
        "Field Surveys, Remote Sensing & GIS-Based Modeling",
      ],
      "Rock Slope Stability": [
        "Kinematic Analysis",
        "Limit Equilibrium Modeling",
        "Slope Classification Systems",
        "Failure Mechanism and Hazard Identification",
        "Mitigation Measure Design (Road Cuts, Tunnels, Quarries, Dams, Mountainous Developments)",
      ],
    },
    gallery: [
      // source: .../2025/09/Geodrill-profile-source-1-194.webp
      {
        src: "/images/services/geological-survey/gallery-1.webp",
        alt: "Geological field mapping",
        caption: "Geological field mapping in mountainous terrain",
      },
      // source: .../2025/09/Geodrill-profile-source-1-197.webp
      {
        src: "/images/services/geological-survey/gallery-2.webp",
        alt: "Rock slope assessment site",
        caption: "Rock slope stability assessment on site",
      },
      // source: .../2025/09/Geodrill-profile-source-1-200.webp
      {
        src: "/images/services/geological-survey/gallery-3.webp",
        alt: "Terrain classification survey",
        caption: "Terrain classification and structural mapping",
      },
    ],
    relatedServices: ["geotechnical-investigation", "geophysical-survey"],
  },

  // ─────────────────────────────────────────────────────────────────────
  "structural-assessment": {
    slug: "structural-assessment",
    category: "Studies",
    title: "Structural Assessment",
    // source: .../2025/08/Structural-Assessment-Services-1024x1024.webp
    heroImage: "/images/services/structural-assessment/hero.webp",
    heroAlt: "Structural inspection and damage assessment on building",
    shortDescription:
      "Expert evaluation of building safety, integrity, and performance using visual inspection and non-destructive testing.",
    overview: [
      "GEODRILL provides expert structural assessment services to evaluate the safety, integrity, and performance of existing buildings and infrastructure. Our experienced team of civil and structural engineers conducts comprehensive evaluations using visual inspections, non-destructive testing (NDT), and advanced structural analysis tools.",
      "We assess a wide range of structures including buildings, bridges, and industrial facilities for damage, deterioration, change in use, or post-incident conditions. Our reports deliver clear, actionable recommendations to support renovation, compliance, risk mitigation, and sustainability.",
      "GEODRILL's structural department also supports foundation system design when required, working closely with our grouting, repair, micropiling, and underpinning divisions to deliver integrated structural solutions.",
    ],
    // NOTE: no standards are named on this specific page — the ASTM codes
    // that appeared here previously (C805/C597) belong to Material Testing's
    // NDT section, not this one. Do not carry them over.
    capabilities: [
      "Visual Structural Inspections",
      "Non-Destructive Testing (NDT) of Existing Structures",
      "Structural Analysis of Buildings, Bridges and Industrial Facilities",
      "Damage, Deterioration and Change-of-Use Assessments",
      "Post-Incident Structural Condition Assessments",
      "Foundation System Design Support (Integrated with Grouting, Repair, Micropiling & Underpinning)",
    ],
    gallery: [
      // source: .../2025/09/Geodrill-profile-source-1-202.webp
      {
        src: "/images/services/structural-assessment/gallery-1.webp",
        alt: "Structural inspection of building",
        caption: "Structural inspection of an existing building",
      },
      // source: .../2025/09/Geodrill-profile-source-1-205.webp
      {
        src: "/images/services/structural-assessment/gallery-2.webp",
        alt: "Non-destructive testing equipment",
        caption: "Non-destructive testing (NDT) equipment in use",
      },
      // source: .../2025/09/Geodrill-profile-source-1-206.webp
      {
        src: "/images/services/structural-assessment/gallery-3.webp",
        alt: "Damage assessment site visit",
        caption: "Site visit for a damage and deterioration assessment",
      },
      // source: .../2025/09/Geodrill-profile-source-1-207.webp
      {
        src: "/images/services/structural-assessment/gallery-4.webp",
        alt: "Structural engineer on site",
        caption: "Structural engineer conducting a field evaluation",
      },
    ],
    relatedServices: [
      "geotechnical-investigation",
      "cavity-probing-grouting-micro-piling",
    ],
  },

  // ─────────────────────────────────────────────────────────────────────
  "environmental-survey": {
    slug: "environmental-survey",
    category: "Testing",
    title: "Environmental Survey",
    // source: .../2025/08/Environmental-Survey-Services-1024x1024.webp
    heroImage: "/images/services/environmental-survey/hero.webp",
    heroAlt: "Environmental site assessment and soil sampling",
    shortDescription:
      "Environmental impact assessment, baseline studies, and monitoring to support sustainable development and compliance.",
    overview: [
      "GEODRILL provides comprehensive Environmental Survey Services to support sustainable development and regulatory compliance. Our team conducts detailed assessments to evaluate environmental impacts, monitor site conditions, and guide responsible project planning.",
      "Using international standards and best practices, GEODRILL delivers accurate reports and practical recommendations. We help clients in infrastructure, industrial, and resource sectors reduce environmental risks and meet regulatory requirements efficiently.",
    ],
    // NOTE: the source page does not use US-specific "Phase I/II ESA"
    // terminology or cite ASTM E1527/EPA — those were invented previously.
    // The real service list is these 5 items.
    capabilities: [
      "Environmental Impact Assessments (EIA)",
      "Baseline Studies",
      "Air, Water, Soil, and Noise Monitoring",
      "Ecological Surveys",
      "Environmental Audits",
    ],
    gallery: [
      // source: .../2025/09/Geodrill-profile-source-1-210.webp
      {
        src: "/images/services/environmental-survey/gallery-1.webp",
        alt: "Environmental site survey",
        caption: "Environmental site assessment fieldwork",
      },
      // source: .../2025/09/Geodrill-profile-source-1-211.webp
      {
        src: "/images/services/environmental-survey/gallery-2.webp",
        alt: "Soil and water sampling",
        caption: "Soil and water sampling for baseline studies",
      },
      // source: .../2025/09/Geodrill-profile-source-1-213.webp
      {
        src: "/images/services/environmental-survey/gallery-3.webp",
        alt: "Ecological survey in the field",
        caption: "Ecological survey fieldwork",
      },
    ],
    relatedServices: ["hydrogeological-studies", "geotechnical-investigation"],
  },

  // ─────────────────────────────────────────────────────────────────────
  "anchoring-shoring-design-execution": {
    slug: "anchoring-shoring-design-execution",
    category: "Engineering",
    title: "Anchoring & Shoring Design & Execution",
    // source: .../2025/08/Anchoring-Shoring-Design-and-Execution-1-1024x1024.webp
    heroImage: "/images/services/anchoring-shoring/hero.webp",
    heroAlt: "Ground anchoring and shoring system installation",
    shortDescription:
      "Design and execution of retaining walls, ground anchors, tiebacks and shoring systems for safe excavation and structural stability.",
    overview: [
      "GEODRILL provides expert anchoring and shoring solutions to ensure safe excavation and structural stability across various construction and geotechnical projects. Our engineers design and implement systems tailored to project needs and site conditions.",
      "Using advanced geotechnical analysis and field validation, we support deep excavations, slope reinforcement, and basement constructions. With a focus on safety, compliance, and performance, GEODRILL delivers reliable and efficient ground support solutions.",
    ],
    // NOTE: source page names no formal standard (no FHWA, Eurocode 7, or
    // ASFE citation) — those were invented previously and are US/European
    // frameworks not stated anywhere on a KSA firm's page. Omitted here.
    capabilities: [
      "Retaining Walls",
      "Soldier Beams and Lagging",
      "Ground Anchors",
      "Tiebacks",
      "Shotcrete",
      "Soil Nails",
    ],
    gallery: [
      // source: .../2025/08/19.webp
      {
        src: "/images/services/anchoring-shoring/gallery-1.webp",
        alt: "Ground anchor installation",
        caption: "Ground anchor installation on a deep excavation",
      },
      // source: .../2025/08/21.webp
      {
        src: "/images/services/anchoring-shoring/gallery-2.webp",
        alt: "Soldier beam and lagging wall",
        caption: "Soldier beam and lagging retaining system",
      },
      // source: .../2025/08/22.webp
      {
        src: "/images/services/anchoring-shoring/gallery-3.webp",
        alt: "Shotcrete application on slope",
        caption: "Shotcrete application for slope reinforcement",
      },
      // source: .../2025/08/24.webp
      {
        src: "/images/services/anchoring-shoring/gallery-4.webp",
        alt: "Soil nail wall installation",
        caption: "Soil nail wall installation",
      },
    ],
    relatedServices: [
      "cavity-probing-grouting-micro-piling",
      "geotechnical-investigation",
    ],
  },

  // ─────────────────────────────────────────────────────────────────────
  "dewatering-design-execution": {
    slug: "dewatering-design-execution",
    category: "Engineering",
    title: "Dewatering Design & Execution",
    // source: .../2025/08/Dewatering-Design-and-Execution-3-1024x1024.webp
    heroImage: "/images/services/dewatering/hero.webp",
    heroAlt: "Dewatering pumping system for excavation site",
    shortDescription:
      "Groundwater control systems — deep wells, wellpoints, eductors and sump pumps — for safe, dry excavation.",
    overview: [
      "GEODRILL provides expert dewatering design and execution services to control groundwater during construction and excavation. Our team conducts detailed hydrogeological assessments and implements tailored systems such as deep wells, wellpoints, eductors, and sump pumps based on soil conditions and site requirements.",
      "We ensure safe and dry work environments through efficient execution, real-time monitoring, and pump system optimization. Our solutions minimize risks like settlement, slope instability, and delays, while maintaining full compliance with environmental and safety regulations.",
    ],
    // NOTE: source page names no formal standard (no FHWA or ACI citation) —
    // omitted, since those were invented previously.
    capabilities: [
      "Hydrogeological Assessment for Dewatering Design",
      "Deep Wells",
      "Wellpoints",
      "Eductors",
      "Sump Pumps",
      "Real-Time Monitoring and Pump System Optimization",
    ],
    gallery: [
      // source: .../2025/08/Dewatering-design-and-execution.webp
      {
        src: "/images/services/dewatering/gallery-1.webp",
        alt: "Dewatering pump system on site",
        caption: "Dewatering pump system installed on an excavation site",
      },
      // source: .../2025/08/Dewatering-design-and-execution2.webp
      {
        src: "/images/services/dewatering/gallery-2.webp",
        alt: "Wellpoint dewatering setup",
        caption: "Wellpoint dewatering setup around an excavation",
      },
    ],
    relatedServices: ["hydrology-studies", "hydrogeological-studies"],
  },

  // ─────────────────────────────────────────────────────────────────────
  "soil-improvement-concrete-repair": {
    slug: "soil-improvement-concrete-repair",
    category: "Engineering",
    title: "Soil Improvement & Concrete Repair",
    // source: .../2025/08/Soil-improvement-and-Concrete-Repair-Services-1-1024x1024.webp
    heroImage: "/images/services/soil-improvement/hero.webp",
    heroAlt: "FRP strengthening and concrete repair works",
    shortDescription:
      "FRP strengthening, micropiling, soil injection, jacketing and epoxy floor repair for structural rehabilitation.",
    overview: [
      "GEODRILL provides specialized services in soil improvement and concrete structural rehabilitation to support the integrity and longevity of infrastructure projects. Our offerings include modern solutions such as FRP technology, micropiling, soil injection, jacketing works and epoxy floor repair.",
      "These services ensure enhanced structural performance, mitigate risks from ground settlement and deterioration, and extend the service life of civil structures. With advanced techniques and experienced professionals, we deliver reliable, safe, and cost-effective solutions tailored to diverse geotechnical and construction challenges.",
    ],
    // NOTE: the previous file listed compaction/jet grouting, CLSM and
    // polyurethane grouting — none of which appear on this page (they belong
    // to Cavity Probing/Grouting instead). The real, named techniques here
    // are FRP, micropiling, soil injection, jacketing, and epoxy floor
    // repair. No standard (ASTM C1107, ACI 201/546) is cited on the page.
    capabilities: [
      "FRP (Fiber Reinforced Polymer) Strengthening",
      "Micropiling",
      "Soil Injection",
      "Jacketing Works",
      "Epoxy Floor Repair",
    ],
    gallery: [
      // source: .../2025/10/Geodrill-profile-source-1-242.webp
      {
        src: "/images/services/soil-improvement/gallery-1.webp",
        alt: "FRP strengthening application",
        caption: "FRP strengthening application on a structural element",
      },
      // source: .../2025/10/Geodrill-profile-source-1-245.webp
      {
        src: "/images/services/soil-improvement/gallery-2.webp",
        alt: "Soil injection works",
        caption: "Soil injection works on site",
      },
      // source: .../2025/10/Geodrill-profile-source-1-249.webp
      {
        src: "/images/services/soil-improvement/gallery-3.webp",
        alt: "Concrete jacketing works",
        caption: "Concrete column jacketing works",
      },
      // source: .../2025/10/Geodrill-profile-source-1-252.webp
      {
        src: "/images/services/soil-improvement/gallery-4.webp",
        alt: "Epoxy floor repair",
        caption: "Epoxy floor repair in progress",
      },
    ],
    relatedServices: [
      "cavity-probing-grouting-micro-piling",
      "structural-assessment",
    ],
  },

  // ─────────────────────────────────────────────────────────────────────
  "mining-exploration": {
    slug: "mining-exploration",
    category: "Studies",
    title: "Mining Exploration",
    // source: .../2025/08/mineral-exploration-services-1-1024x1024.webp
    heroImage: "/images/services/mining-exploration/hero.webp",
    heroAlt: "Mining exploration drill rig and geological sampling",
    shortDescription:
      "End-to-end mineral exploration — mapping, sampling, geophysics, drilling and resource estimation — to JORC/NI 43-101 classification.",
    overview: [
      "GEODRILL provides end-to-end Mineral Exploration services designed to identify and evaluate economically viable mineral resources. Our team of experienced geologists, geophysicists, and field engineers utilizes advanced techniques and technologies to conduct precise, efficient, and sustainable exploration campaigns.",
      "Our services include geological mapping, geochemical sampling, geophysical surveys, core drilling, resource estimation, and 3D modelling. We apply industry-standard classification systems (JORC, NI 43-101) to deliver reliable data and support informed decision-making at every stage from early reconnaissance to detailed resource assessment.",
      "GEODRILL's commitment to scientific integrity, safety, and environmental stewardship ensures that each exploration program is executed with the highest standards of quality and regulatory compliance.",
    ],
    capabilities: [
      "Geological Mapping",
      "Geochemical Sampling",
      "Geophysical Surveys",
      "Core Drilling",
      "Resource Estimation",
      "3D Modelling",
    ],
    standardsReferenced: ["JORC", "NI 43-101"],
    gallery: [
      // source: .../2025/10/Geodrill-profile-source-1-254.webp
      {
        src: "/images/services/mining-exploration/gallery-1.webp",
        alt: "Mining exploration drill rig",
        caption: "Exploration drill rig on site",
      },
      // source: .../2025/10/Geodrill-profile-source-1-257.webp
      {
        src: "/images/services/mining-exploration/gallery-2.webp",
        alt: "Geological sampling for mineral exploration",
        caption: "Geological sampling for mineral exploration",
      },
      // source: .../2025/10/Geodrill-profile-source-1-260.webp
      {
        src: "/images/services/mining-exploration/gallery-3.webp",
        alt: "Core logging in the field",
        caption: "Core logging during an exploration campaign",
      },
      // source: .../2025/10/Geodrill-profile-source-1-264.webp
      {
        src: "/images/services/mining-exploration/gallery-4.webp",
        alt: "Mining exploration field team",
        caption: "GEODRILL field team on a mineral exploration campaign",
      },
    ],
    relatedServices: ["geotechnical-investigation", "geophysical-survey"],
  },
};

export const serviceCategories: Record<ServiceCategory, string[]> = {
  Ground: [
    "geotechnical-investigation",
    "geophysical-survey",
    "geological-survey-rock-slope-stability",
    "hydrogeological-studies",
  ],
  Testing: [
    "material-testing-quality-control",
    "topographical-survey",
    "environmental-survey",
  ],
  Engineering: [
    "cavity-probing-grouting-micro-piling",
    "anchoring-shoring-design-execution",
    "dewatering-design-execution",
    "soil-improvement-concrete-repair",
  ],
  Studies: ["hydrology-studies", "structural-assessment", "mining-exploration"],
};

export function getServiceBySlug(slug: string): ServiceContent | null {
  return servicesData[slug] || null;
}

export function getAllServiceSlugs(): string[] {
  return Object.keys(servicesData);
}

export function getServicesInCategory(
  category: ServiceCategory,
): ServiceContent[] {
  const slugs = serviceCategories[category] || [];
  return slugs.map((slug) => servicesData[slug]).filter(Boolean);
}
