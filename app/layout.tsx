import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Inter, Cairo } from 'next/font/google'
import { LanguageProvider } from '@/components/language-provider'
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
  title: 'GeoDrill Construction Experts | Strength in Execution',
  description:
    'GeoDrill Construction Experts delivers integrated engineering and construction solutions across Saudi Arabia — general contracting, infrastructure, concrete, steel, MEP, and finishing.',
  generator: 'v0.app',
}

export const viewport: Viewport = {
  themeColor: '#0FB5B9',
  colorScheme: 'light',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" dir="ltr" className={`${inter.variable} ${cairo.variable} bg-background`}>
      <body className="font-sans antialiased">
        <LanguageProvider>{children}</LanguageProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
