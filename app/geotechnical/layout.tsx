import type { Metadata } from "next";
import { Inter, IBM_Plex_Mono, IBM_Plex_Sans_Arabic } from "next/font/google";
import { LanguageProvider } from "@/geotech/components/providers/language-provider";
import { GeotechContactButton } from "@/geotech/components/geotech-contact-button";

const geotechSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const geotechMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

const geotechArabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-arabic",
  display: "swap",
});

export const metadata: Metadata = {
  title: "GEODRILL KSA | Geotechnical & Geoscience Experts",
  description:
    "Advanced geotechnical, geophysical and engineering investigation services delivering reliable subsurface intelligence for safer, smarter and more efficient project decisions in Saudi Arabia.",
  // Geotech brand favicon (light/dark marks), mirroring how /contracting ships
  // its own logo pair in the root layout.
  icons: {
    icon: [
      { url: "/geotech-logo.png", media: "(prefers-color-scheme: light)" },
      { url: "/geotech-logo2.png", media: "(prefers-color-scheme: dark)" },
    ],
    apple: "/geotech-logo.png",
  },
};

export default async function GeotechLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={`${geotechSans.variable} ${geotechMono.variable} ${geotechArabic.variable}`}
    >
      <LanguageProvider>
        {children}
        <GeotechContactButton />
      </LanguageProvider>
    </div>
  );
}
