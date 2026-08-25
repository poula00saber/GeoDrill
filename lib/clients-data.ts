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
  "dar-al-handasah": {
    name: "Dar Al-Handasah",
    category: "infrastructure",
  },
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
  "ministry-finance": {
    name: "Ministry of Finance",
    category: "government",
  },
  "ministry-housing": {
    name: "Ministry of Housing",
    category: "government",
  },
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
  "saudi-architects": {
    name: "Saudi Architects",
    category: "infrastructure",
  },
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
  "suido-kiko": {
    name: "Suido Kiko Middle East",
    category: "water-energy",
  },
  zidcon: { name: "Zidcon Contracting", category: "contracting" },

  almunajem: { name: "Almunajem Foods", category: "contracting" },
  atkins: { name: "Atkins", category: "infrastructure" },
  "awfa-investment": { name: "AWFA Investment", category: "contracting" },
  china: { name: "China State Construction", category: "contracting" },
  "dar-el-omran": { name: "Dar El Omran", category: "infrastructure" },
  diriyah: {
    name: "Diriyah Gate Development Authority",
    category: "government",
  },
  "dr-suliman": {
    name: "Dr. Sulaiman Al Habib Group",
    category: "contracting",
  },
  exentec: { name: "Exentec", category: "contracting" },
  fad: { name: "FAD", category: "contracting" },
  "fao-real-estate": { name: "FAO Real Estate", category: "contracting" },
  gaca: {
    name: "General Authority of Civil Aviation",
    category: "government",
  },
  italconsult: { name: "Italconsult", category: "infrastructure" },
  jasara: { name: "Jasara Program Management", category: "government" },
  lime: { name: "Lime Real Estate", category: "contracting" },
  mgc: { name: "MGC", category: "contracting" },
  "ministry-of-interior": {
    name: "Ministry of Interior",
    category: "government",
  },
  mobtakeron: { name: "Mobtakeron", category: "contracting" },
  modon: {
    name: "MODON — Saudi Authority for Industrial Cities",
    category: "government",
  },
  nupco: { name: "NUPCO", category: "water-energy" },
  "omq-realstate": { name: "OMQ Real Estate", category: "contracting" },
  othaim: { name: "Al Othaim", category: "contracting" },
  rafen: { name: "Rafen", category: "contracting" },
  rakhaa: { name: "Rakhaa", category: "contracting" },
  "riyad-airports": {
    name: "Riyadh Airports Company",
    category: "government",
  },
  sets: { name: "SETS", category: "contracting" },
  "snc-lavalin": { name: "SNC-Lavalin", category: "infrastructure" },
  "soudah-development": {
    name: "Soudah Development",
    category: "government",
  },
  "suidi-tashyeed": { name: "Saudi Tashyeed", category: "contracting" },
  summertown: { name: "Summertown", category: "contracting" },
  "taj-dhabi": { name: "Taj Dhabi", category: "contracting" },
  "thomas-bell": {
    name: "Thomas Bell-Wright International Consultants",
    category: "infrastructure",
  },
  zawaya: { name: "Zawaya", category: "contracting" },
};

const LOGO_FILES = [
  "abdulkareem_alsudais_sons.png",
  "abisco.png",
  "al_akaria.png",
  "alfanar.png",
  "algafary-sanitary-ware.png",
  "alinma.png",
  "almarai.png",
  "almunajem.png",
  "aplus.png",
  "atad-middle-east.png",
  "atkins.png",
  "av-consulting.png",
  "awfa investment.png",
  "bank-albilad.png",
  "binyah.png",
  "china.png",
  "dam-almashru.png",
  "dar el omran.png",
  "dar-al-handasah.png",
  "dar-al-riyadh.png",
  "diriyah.png",
  "diyah-company.png",
  "dr suliman.png",
  "euro-group.png",
  "exentec.png",
  "fad.png",
  "fao real estate.png",
  "gaca.png",
  "green-riyadh.png",
  "italconsult.png",
  "jasara.png",
  "khatib-alami.png",
  "king-salman-park.png",
  "lagate.png",
  "lime.png",
  "marami.png",
  "masah.png",
  "mgc.png",
  "ministry of interior.png",
  "ministry-environment-water-agriculture.png",
  "ministry-finance.png",
  "ministry-housing.png",
  "ministry-municipal-rural-affairs.png",
  "mobtakeron.png",
  "modon.png",
  "national-water-company.png",
  "nesma-partners.png",
  "nupco.png",
  "omq realstate.png",
  "omrania-egis.png",
  "othaim.png",
  "qiddiya.png",
  "rafen.png",
  "rakhaa.png",
  "riyad airports.png",
  "saptco.png",
  "saudi-architects.png",
  "saudi-binladin-group.png",
  "saudi-electricity.png",
  "sela.png",
  "sets.png",
  "seven.png",
  "snc lavalin.png",
  "soudah development.png",
  "sports-boulevard.png",
  "suidi tashyeed.png",
  "suido-kiko.png",
  "summertown.png",
  "taj dhabi.png",
  "thomas bell.png",
  "zawaya.png",
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
