import './globals.css';
import type { Metadata } from 'next';
import { Inter, IBM_Plex_Mono } from 'next/font/google';
import { IBM_Plex_Sans_Arabic } from 'next/font/google';
import { ThemeProvider } from '@/components/providers/theme-provider';
import { LanguageProvider } from '@/components/providers/language-provider';
import { siteConfig } from '@/lib/site-config';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap',
});

const ibmPlexArabic = IBM_Plex_Sans_Arabic({
  subsets: ['arabic'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-arabic',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: 'GEODRILL KSA — Geotechnical & Geoscience Experts',
    template: '%s | GEODRILL KSA',
  },
  description:
    'Advanced geotechnical, geophysical and engineering investigation services delivering reliable subsurface intelligence for safer, smarter and more efficient project decisions in Saudi Arabia.',
  keywords: [
    'Geotechnical Engineering Saudi Arabia',
    'Geotechnical Investigation Saudi Arabia',
    'Geophysical Survey Saudi Arabia',
    'GPR Survey Saudi Arabia',
    'MASW Saudi Arabia',
    'Soil Investigation Saudi Arabia',
    'Geological Survey Saudi Arabia',
    'Rock Slope Stability Saudi Arabia',
    'Topographical Survey Saudi Arabia',
    'Hydrogeological Studies Saudi Arabia',
    'Ground Investigation Riyadh',
  ],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteConfig.url,
    title: 'GEODRILL KSA — Geotechnical & Geoscience Experts',
    description:
      'Advanced geotechnical, geophysical and engineering investigation services delivering reliable subsurface intelligence for safer, smarter and more efficient project decisions.',
    siteName: 'GEODRILL KSA',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GEODRILL KSA — Geotechnical & Geoscience Experts',
    description:
      'Advanced geotechnical, geophysical and engineering investigation services in Saudi Arabia.',
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: siteConfig.url,
    languages: {
      'en': `${siteConfig.url}/en`,
      'ar': `${siteConfig.url}/ar`,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <body className={`${inter.variable} ${ibmPlexMono.variable} ${ibmPlexArabic.variable} font-sans antialiased`}>
        <ThemeProvider>
          <LanguageProvider>{children}</LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
