import { Navbar } from '@/components/navbar'
import { Hero } from '@/components/hero'
import { About } from '@/components/sections/about'
import { VisionMission } from '@/components/sections/vision-mission'
import { WhyUs } from '@/components/sections/why-us'
import { Sectors } from '@/components/sections/sectors'
import { Services } from '@/components/sections/services'
import { Process } from '@/components/sections/process'
import { Projects } from '@/components/sections/projects'
import { Clients } from '@/components/sections/clients'
import { Certifications } from '@/components/sections/certifications'
import { Contact } from '@/components/sections/contact'
import { Footer } from '@/components/footer'

export default async function Page({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  const locale = lang === 'ar' ? 'ar' : 'en'

  // key + lang-enter produce a smooth fade whenever the locale route changes
  return (
    <main key={locale} className="min-h-svh lang-enter">
      <Navbar />
      <Hero />
      <About />
      <VisionMission />
      <WhyUs />
      <Sectors />
      <Services />
      <Process />
      <Projects />
      <Clients />
      <Certifications />
      <Contact />
      <Footer />
    </main>
  )
}