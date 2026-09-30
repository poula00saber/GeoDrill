import { Analytics } from "@vercel/analytics/next";
import type { Metadata, Viewport } from "next";
import { IBM_Plex_Sans_Arabic } from "next/font/google";
import { LanguageProvider } from "@/components/language-provider";
import { ThemeProvider } from "@/components/theme-provider";
import ThemeFavicon from "@/components/theme-favicon";
import { WhatsAppButton } from "@/components/whatsapp-button";
import "./globals.css";

const ibmPlex = IBM_Plex_Sans_Arabic({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-ibm-plex",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.geodrillksa.com"),
  verification: process.env.GOOGLE_SITE_VERIFICATION
    ? { google: process.env.GOOGLE_SITE_VERIFICATION }
    : undefined,
  title: "GEODRILL KSA | Geotechnical, Geoscience & Construction Experts",
  description:
    "GEODRILL KSA provides geotechnical, geoscience, engineering investigation, general contracting and construction solutions across Saudi Arabia.",
  generator: "GEODRILL KSA",
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
  icons: {
    icon: [
      { url: "/logo.png", media: "(prefers-color-scheme: light)" },
      { url: "/logo2.png", media: "(prefers-color-scheme: dark)" },
    ],
    apple: "/logo.png",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#0FB5B9" },
    { media: "(prefers-color-scheme: dark)", color: "#0d2b34" },
  ],
  colorScheme: "light dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="und"
      dir="ltr"
      suppressHydrationWarning
      className={`${ibmPlex.variable} bg-background`}
    >
      <body className="font-sans antialiased" suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          disableTransitionOnChange={false}
        >
          <LanguageProvider>
            {children}
            <WhatsAppButton />
          </LanguageProvider>
        </ThemeProvider>
        <ThemeFavicon />
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  );
}
