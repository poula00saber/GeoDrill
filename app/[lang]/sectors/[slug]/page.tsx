import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { PageHero } from '@/components/page-hero'
import { SectorGallery } from '@/components/pages/sector-gallery'
import { SectorNav } from '@/components/pages/sector-nav'
import { SECTORS, getSectorByKey } from '@/lib/sector-data'

type Props = {
  params: Promise<{ lang: string; slug: string }>
}

// Pre-render every sector for both locales.
export function generateStaticParams() {
  return ['en', 'ar'].flatMap((lang) => SECTORS.map((s) => ({ lang, slug: s.key })))
}

// Unknown slugs 404 instead of building on-demand.
export const dynamicParams = false

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, slug } = await params
  const sector = getSectorByKey(slug)
  const locale = lang === 'ar' ? 'ar' : 'en'
  return {
    title: sector ? `${sector.name[locale]} | GEODRILL` : 'GEODRILL',
    description: sector?.short[locale],
  }
}

export default async function SectorPage({ params }: Props) {
  const { lang, slug } = await params
  const locale = lang === 'ar' ? 'ar' : 'en'
  const sector = getSectorByKey(slug)
  if (!sector) notFound()

  const galleryTitle = locale === 'ar' ? 'صور الأعمال' : 'Selected works'
  const introLabel =
    locale === 'ar'
      ? 'ما الذي ننفذه في هذا القطاع؟'
      : 'Capabilities we deliver in this sector'
  const statLabels =
    locale === 'ar'
      ? ['مشاريع', 'شهادات معتمدة', 'رؤية 2030']
      : ['Projects', 'Certified', 'Vision 2030']

  return (
    <main className="min-h-svh bg-background">
      <Navbar />

      <PageHero
        image={sector.image}
        kicker={`${locale === 'ar' ? 'القطاع' : 'Sector'} · ${sector.name[locale]}`}
        title={sector.name[locale]}
        sub={sector.short[locale]}
        crumb={sector.name[locale]}
      />

      {/* Intro band */}
      <section className="border-b border-border bg-background">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 py-12 md:px-8 md:py-16 lg:flex-row lg:items-center lg:justify-between">
          <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
            {introLabel}
          </p>
          <div className="grid flex-shrink-0 grid-cols-3 gap-3 md:gap-4">
            {[`${sector.gallery.length}`, 'ISO', '2030'].map((v, i) => (
              <div key={`${v}-${i}`} className="flex flex-col gap-1">
                <span className="text-2xl font-bold text-foreground md:text-3xl">{v}</span>
                <span className="text-xs text-muted-foreground md:text-sm">{statLabels[i]}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modern bento gallery of this sector's works */}
      <section className="bg-background py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <SectorGallery items={sector.gallery} title={galleryTitle} />
        </div>
      </section>

      {/* Related sectors */}
      <SectorNav current={sector.key} currentName={sector.name[locale]} />

      <Footer />
    </main>
  )
}