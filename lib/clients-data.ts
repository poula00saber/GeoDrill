// Single source of truth for client logos — imported by both the homepage
// marquee (Clients.tsx) and the full directory page (/clients).

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

export type ClientLogo = { src: string; name: string; slug: string };

export const CLIENT_LOGOS: ClientLogo[] = LOGO_FILES.map((f) => {
  const slug = f.replace(/\.png$/, "");
  return {
    slug,
    src: `/images/final/clients_logos/${f}`,
    name: slug.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase()),
  };
});
