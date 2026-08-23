import type { Metadata } from 'next'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { ClientsGallery } from '@/components/pages/clients-gallery'
import { CLIENT_LOGOS } from '@/lib/clients-data'

// Pre-render the clients page for both locales.
export function generateStaticParams() {
  return ['en', 'ar'].map((lang) => ({ lang }))
}

export const dynamicParams = false

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params
  const locale = lang === 'ar' ? 'ar' : 'en'
  return {
    title:
      locale === 'ar'
        ? `عملاؤنا | جيو دريل`
        : `Our Clients | GEODRILL`,
    description: CLIENT_LOGOS.length + '+ organizations trust GEODRILL across the Kingdom.',
  }
}

export default async function ClientsPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const locale = lang === 'ar' ? 'ar' : 'en'

  return (
    <>
      <Navbar />
      <main key={locale} className="min-h-svh lang-enter bg-background">
        <div className="pb-24 pt-36 md:pt-40">
          <ClientsGallery />
        </div>
        <Footer />
      </main>
    </>
  );
}