import type { Metadata } from "next";
import { Inter, IBM_Plex_Mono, IBM_Plex_Sans_Arabic } from "next/font/google";
import { LanguageProvider } from "@/geotech/components/providers/language-provider";

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
};

export default function GeotechLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="geotech-theme min-h-screen bg-background text-foreground" dir="ltr" lang="en">
      <div
        className={`${geotechSans.variable} ${geotechMono.variable} ${geotechArabic.variable}`}
      >
        <LanguageProvider>{children}</LanguageProvider>
      </div>
    </div>
  );
}
