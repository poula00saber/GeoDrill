export type ClientCategory =
  | "government"
  | "infrastructure"
  | "water-energy"
  | "contracting";

export type ClientLogo = {
  src: string;
  name: string;
  slug: string;
  category: ClientCategory;
};

// Sector metadata mapping
const CLIENT_METADATA: Record<
  string,
  { name: string; category: ClientCategory }
> = {
  abdulkareem_alsudais_sons: {
    name: "Abdulkareem AlSudais & Sons",
    category: "contracting",
  },
  abisco: { name: "Abisco", category: "infrastructure" },
  alfanar: { name: "Alfanar", category: "water-energy" },
  "algafary-sanitary-ware": {
    name: "Algafary Sanitary Ware",
    category: "infrastructure",
  },
  alinma: { name: "Alinma Bank", category: "infrastructure" },
  almarai: { name: "Almarai", category: "infrastructure" },
  al_akaria: { name: "Al Akaria", category: "infrastructure" },
  aplus: { name: "Aplus", category: "contracting" },
  "atad-middle-east": { name: "ATAD Middle East", category: "contracting" },
  "av-consulting": { name: "AV Consulting", category: "infrastructure" },
  "bank-albilad": { name: "Bank Albilad", category: "infrastructure" },
  binyah: { name: "Binyah", category: "infrastructure" },
  "dam-almashru": { name: "Dam Almashru", category: "contracting" },
  "dar-al-handasah": { name: "Dar Al-Handasah", category: "infrastructure" },
  "dar-al-riyadh": { name: "Dar Al-Riyadh", category: "infrastructure" },
  "diyah-company": { name: "Diyah Company", category: "contracting" },
  "euro-group": { name: "Euro Group", category: "contracting" },
  "green-riyadh": { name: "Green Riyadh", category: "government" },
  "khatib-alami": { name: "Khatib & Alami", category: "infrastructure" },
  "king-salman-park": {
    name: "King Salman Park Foundation",
    category: "government",
  },
  lagate: { name: "Lagate", category: "contracting" },
  marami: { name: "Marami", category: "contracting" },
  masah: { name: "Masah Company", category: "contracting" },
  "ministry-environment-water-agriculture": {
    name: "Ministry of Environment, Water & Agriculture",
    category: "government",
  },
  "ministry-finance": { name: "Ministry of Finance", category: "government" },
  "ministry-housing": { name: "Ministry of Housing", category: "government" },
  "ministry-municipal-rural-affairs": {
    name: "Ministry of Municipal & Rural Affairs",
    category: "government",
  },
  "national-water-company": {
    name: "National Water Company",
    category: "water-energy",
  },
  "nesma-partners": { name: "Nesma & Partners", category: "contracting" },
  "omrania-egis": { name: "Omrania Egis", category: "infrastructure" },
  qiddiya: { name: "Qiddiya Investment Company", category: "government" },
  saptco: { name: "SAPTCO", category: "infrastructure" },
  "saudi-architects": { name: "Saudi Architects", category: "infrastructure" },
  "saudi-binladin-group": {
    name: "Saudi Binladin Group",
    category: "contracting",
  },
  "saudi-electricity": {
    name: "Saudi Electricity Company",
    category: "water-energy",
  },
  sela: { name: "Sela", category: "government" },
  seven: { name: "SEVEN", category: "government" },
  "sports-boulevard": { name: "Sports Boulevard", category: "government" },
  "suido-kiko": { name: "Suido Kiko Middle East", category: "water-energy" },
  zidcon: { name: "Zidcon Contracting", category: "contracting" },
};

const LOGO_FILES = [
  "abdulkareem_alsudais_sons.png",
  "abisco.png",
  "alfanar.png",
  "algafary-sanitary-ware.png",
  "alinma.png",
  "almarai.png",
  "al_akaria.png",
  "aplus.png",
  "atad-middle-east.png",
  "av-consulting.png",
  "bank-albilad.png",
  "binyah.png",
  "dam-almashru.png",
  "dar-al-handasah.png",
  "dar-al-riyadh.png",
  "diyah-company.png",
  "euro-group.png",
  "green-riyadh.png",
  "khatib-alami.png",
  "king-salman-park.png",
  "lagate.png",
  "marami.png",
  "masah.png",
  "ministry-environment-water-agriculture.png",
  "ministry-finance.png",
  "ministry-housing.png",
  "ministry-municipal-rural-affairs.png",
  "national-water-company.png",
  "nesma-partners.png",
  "omrania-egis.png",
  "qiddiya.png",
  "saptco.png",
  "saudi-architects.png",
  "saudi-binladin-group.png",
  "saudi-electricity.png",
  "sela.png",
  "seven.png",
  "sports-boulevard.png",
  "suido-kiko.png",
  "zidcon.png",
];

export const CLIENT_LOGOS: ClientLogo[] = LOGO_FILES.map((f) => {
  const slug = f.replace(/\.png$/, "");
  const meta = CLIENT_METADATA[slug];

  return {
    slug,
    src: `/images/final/clients_logos/${f}`,
    name:
      meta?.name ??
      slug.replace(/[-_]/g, " ").replace(/\b\w/g, (l) => l.toUpperCase()),
    category: meta?.category ?? "infrastructure",
  };
});
