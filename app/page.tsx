import type { Metadata } from "next";
import PortalHome from "@/components/portal-home";
import { JsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.geodrillksa.com"),
  title: "GEODRILL KSA | Geotechnical, Geoscience & Construction Experts",
  description:
    "GEODRILL KSA provides geotechnical, geoscience, engineering investigation, general contracting and construction solutions across Saudi Arabia.",
  alternates: {
    canonical: "https://www.geodrillksa.com/",
    languages: {
      "x-default": "https://www.geodrillksa.com/",
    },
  },
  openGraph: {
    title: "GEODRILL KSA | Geotechnical, Geoscience & Construction Experts",
    description:
      "GEODRILL KSA provides geotechnical, geoscience, engineering investigation, general contracting and construction solutions across Saudi Arabia.",
    url: "https://www.geodrillksa.com/",
    siteName: "GEODRILL KSA",
    type: "website",
    locale: "en_US",
    images: [{ url: "/logo.png", alt: "GEODRILL KSA" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "GEODRILL KSA | Geotechnical, Geoscience & Construction Experts",
    description:
      "GEODRILL KSA provides geotechnical, geoscience, engineering investigation, general contracting and construction solutions across Saudi Arabia.",
    images: ["/logo.png"],
  },
};

export default function Page() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Organization",
          "@id": "https://www.geodrillksa.com/#organization",
          name: "GEODRILL KSA",
          url: "https://www.geodrillksa.com/",
          logo: "https://www.geodrillksa.com/logo.png",
          description:
            "Geotechnical, geoscience, engineering investigation, general contracting and construction services in Saudi Arabia.",
          contactPoint: [
            {
              "@type": "ContactPoint",
              contactType: "Geotechnical and geoscience enquiries",
              email: "geotechnical@geodrillksa.com",
              areaServed: "SA",
              availableLanguage: ["English", "Arabic"],
            },
            {
              "@type": "ContactPoint",
              contactType: "General contracting enquiries",
              email: "contracting@geodrillksa.com",
              areaServed: "SA",
              availableLanguage: ["English", "Arabic"],
            },
          ],
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          "@id": "https://www.geodrillksa.com/#website",
          name: "GEODRILL KSA",
          alternateName: "GEODRILL",
          url: "https://www.geodrillksa.com/",
          inLanguage: ["en", "ar"],
          publisher: { "@id": "https://www.geodrillksa.com/#organization" },
        }}
      />
      <PortalHome />
    </>
  );
}
