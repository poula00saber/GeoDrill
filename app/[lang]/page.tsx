import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { About } from "@/components/sections/about";
import { VisionMission } from "@/components/sections/vision-mission";
import { WhyUs } from "@/components/sections/why-us";
import { Sectors } from "@/components/sections/sectors";
import { Services } from "@/components/sections/services";
import { Process } from "@/components/sections/process";
import { Projects } from "@/components/sections/projects";
import { Clients } from "@/components/sections/clients";
import { Blog } from "@/components/sections/blog";
import { FaqSlider } from "@/components/sections/faq-slider";
import { Certifications } from "@/components/sections/certifications";
import { Location } from "@/components/sections/location";
import { Contact } from "@/components/sections/contact";
import { Footer } from "@/components/footer";
import { WhatsAppButton } from "@/components/whatsapp-button";

export default async function Page({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale = lang === "ar" ? "ar" : "en";

  return (
    <>
        <Navbar />
      <main key={locale} className="min-h-svh lang-enter">
        <Hero />
        <About />
        <VisionMission />
        <WhyUs />
        <Sectors />
        <Services />
        <Process />
        <Projects />
        <Clients />
        <Blog locale={locale} />
        <FaqSlider />
        <Certifications />
        <Location />
        <Contact />
        <Footer />
      </main>

      {/* Rendered outside main to prevent CSS transform trap */}
      <WhatsAppButton />
    </>
  );
}
