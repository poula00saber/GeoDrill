// Single source of truth for client logos — imported by both the homepage
// marquee (Clients.tsx) and the full directory page (/clients).

const LOGO_FILES = [
  "abdulkareem_alsudais_sons.jpg",
  "abisco.jpg",
  "alfanar.jpg",
  "algafary_sanitary_ware.jpg",
  "alinma_bank.jpg",
  "almarai.jpg",
  "al_akaria.jpg",
  "al_qudia.jpg",
  "arplus.jpg",
  "atad_middle_east.jpg",
  "av_consulting.jpg",
  "bank_albilad.jpg",
  "binyah.jpg",
  "dam_almashru_construction.jpg",
  "dar_al_handasah.jpg",
  "dar_al_riyadh.jpg",
  "euro_group_engineering.jpg",
  "green_riyadh.jpg",
  "khatib_alami.jpg",
  "king_salman_park.jpg",
  "lagate.jpg",
  "marami.jpg",
  "masah_specialized_construction.jpg",
  "ministry_environment_water_agriculture.jpg",
  "ministry_municipal_rural_affairs.jpg",
  "ministry_of_finance.jpg",
  "ministry_of_housing.jpg",
  "national_water_company.jpg",
  "nesma_partners.jpg",
  "omrania_egis.jpg",
  "qaryah_company.jpg",
  "saptco.jpg",
  "saudi_architects.jpg",
  "saudi_binladin_group.jpg",
  "saudi_electricity_company.jpg",
  "sela.jpg",
  "seven_saudi_entertainment_ventures.jpg",
  "sports_boulevard.jpg",
  "suido_kiko_middle_east.jpg",
  "zidcon.jpg",
];

export type ClientLogo = { src: string; name: string; slug: string };

export const CLIENT_LOGOS: ClientLogo[] = LOGO_FILES.map((f) => {
  const slug = f.replace(/\.jpg$/, "");
  return {
    slug,
    src: `/images/final/clients_logos/${f}`,
    name: slug.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase()),
  };
});
