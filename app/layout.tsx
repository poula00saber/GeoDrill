import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Inter, Cairo } from 'next/font/google'
import { LanguageProvider } from '@/components/language-provider'
import { ThemeProvider } from '@/components/theme-provider'
import ThemeFavicon from '@/components/theme-favicon'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const cairo = Cairo({
  subsets: ['arabic', 'latin'],
  variable: '--font-cairo',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'GEODRILL Construction Experts | Strength in Execution',
  description:
    'GEODRILL Construction Experts delivers integrated engineering and construction solutions across Saudi Arabia, general contracting, infrastructure, concrete, steel, MEP, and finishing.',
  generator: 'v0.app',
  icons: {
    icon: [
      { url: '/logo.png', media: '(prefers-color-scheme: light)' },
      { url: '/logo2.png', media: '(prefers-color-scheme: dark)' },
    ],
    apple: '/logo.png',
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#0FB5B9' },
    { media: '(prefers-color-scheme: dark)', color: '#0d2b34' },
  ],
  colorScheme: 'light dark',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      dir="ltr"
      suppressHydrationWarning
      className={`${inter.variable} ${cairo.variable} bg-background`}
    >
      <body className="font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          disableTransitionOnChange={false}
        >
          <LanguageProvider>{children}</LanguageProvider>
        </ThemeProvider>
        <ThemeFavicon />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
