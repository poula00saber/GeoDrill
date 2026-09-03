"use client";

import { motion } from "framer-motion";
import { ArrowRight, Award, Building2, Users, MapPin } from "lucide-react";
import { useLanguage } from "@/geotech/components/providers/language-provider";

const stats = [
  {
    icon: Award,
    value: "20+",
    labelKey: "yearsExperience",
    fallback: "Years of Experience",
  },
  {
    icon: Building2,
    value: "1000+",
    labelKey: "projectsCompleted",
    fallback: "Projects Completed",
  },
  {
    icon: Users,
    value: "500+",
    labelKey: "satisfiedClients",
    fallback: "Satisfied Clients",
  },
  {
    icon: MapPin,
    value: "10+",
    labelKey: "citiesServed",
    fallback: "Cities Served",
  },
];

export function AboutHero() {
  const { dict, isArabic } = useLanguage();
  const copy = isArabic
    ? {
        eyebrow: "عن جيودريل",
        titleLead: "نبني الثقة",
        titleEnd: "من أعماق الأرض",
        description:
          "جيودريل شركة هندسية جيوتقنية رائدة تقدم حلولًا موثوقة لعلوم الأرض تدعم أعمال البناء الآمنة والمستدامة والناجحة.",
        story: "قصتنا",
        stats: [
          "سنوات من الخبرة",
          "مشروعًا مكتملًا",
          "عميلًا راضيًا",
          "مدينة نخدمها",
        ],
      }
    : {
        eyebrow: "About GEODRILL",
        titleLead: "Building Confidence",
        titleEnd: "from the Ground Up",
        description:
          "GEODRILL is a leading geotechnical engineering company delivering reliable subsurface solutions that support safe, sustainable and successful construction.",
        story: "Our Story",
        stats: [
          "Years of Experience",
          "Projects Completed",
          "Satisfied Clients",
          "Cities Served",
        ],
      };

  return (
    <section className="relative w-full overflow-hidden bg-[#0b1220] pt-24 pb-0">
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-grid opacity-20" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 pt-10 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-12">
          {/* Left: text */}
          <motion.div
            initial={{ opacity: 0, x: isArabic ? 40 : -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="mb-4 inline-block font-mono text-xs font-semibold uppercase tracking-widest text-primary">
              {copy.eyebrow}
            </span>
            <h1 className="text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
              {copy.titleLead}
              <br />
              <span className="text-primary">{copy.titleEnd}</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/70">
              {copy.description}
            </p>

            <div className="mt-8">
              <a
                href="#our-story"
                className="inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.02]"
              >
                {copy.story}
                <ArrowRight className="h-4 w-4 rtl:rotate-180" />
              </a>
            </div>
          </motion.div>

          {/* Right: hero image */}
          <motion.div
            initial={{ opacity: 0, x: isArabic ? -40 : 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="relative h-64 w-full overflow-hidden rounded-xl border border-white/10 sm:h-80 lg:h-96"
          >
            {/*
              PHOTO NEEDED: hero-engineers-site.jpg
              Two engineers in hi-vis GEODRILL vests + hard hats,
              standing facing a drill rig at golden hour, city skyline
              in background. Landscape orientation, min 1600x1000px.
            */}
            <img
              src="/images/contact-us-hero.jpg"
              alt="GEODRILL engineers at a drilling site"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          </motion.div>
        </div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 grid grid-cols-2 gap-6 border-t border-white/10 py-8 sm:grid-cols-4 lg:mt-16"
        >
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div key={i} className="flex items-center gap-3">
                <Icon className="h-6 w-6 flex-shrink-0 text-primary" />
                <div>
                  <div className="text-2xl font-bold text-white sm:text-3xl">
                    {stat.value}
                  </div>
                  <div className="text-xs text-white/60 sm:text-sm">
                    {dict?.about?.[stat.labelKey] ||
                      copy.stats[i] ||
                      stat.fallback}
                  </div>
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
