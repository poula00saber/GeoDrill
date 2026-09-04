"use client";

import { motion } from "framer-motion";
import { Award, Cpu, MapPin, Users2, Quote } from "lucide-react";
import { useLanguage } from "@/geotech/components/providers/language-provider";

const features = [
  {
    icon: Award,
    titleKey: "experience",
    fallbackTitle: "Experience",
    fallbackDesc: "Decades of hands-on geotechnical expertise.",
    fallbackTitleAr: "الخبرة",
    fallbackDescAr: "عقود من الخبرة العملية في مجال الجيوتقنية.",
  },
  {
    icon: Cpu,
    titleKey: "technology",
    fallbackTitle: "Technology",
    fallbackDesc: "Advanced tools and modern methodologies.",
    fallbackTitleAr: "التقنية",
    fallbackDescAr: "أدوات متقدمة ومنهجيات حديثة.",
  },
  {
    icon: MapPin,
    titleKey: "localKnowledge",
    fallbackTitle: "Local Knowledge",
    fallbackDesc: "In-depth understanding of regional ground conditions.",
    fallbackTitleAr: "المعرفة المحلية",
    fallbackDescAr: "فهم عميق لظروف الأرض في المنطقة.",
  },
  {
    icon: Users2,
    titleKey: "partnership",
    fallbackTitle: "Partnership",
    fallbackDesc: "Long-term relationships built on trust.",
    fallbackTitleAr: "الشراكة",
    fallbackDescAr: "علاقات طويلة الأمد مبنية على الثقة.",
  },
];

export function WhoWeAre() {
  const { dict, isArabic } = useLanguage();
  if (!dict?.about) return null;

  return (
    <section
      id="our-story"
      className="relative overflow-hidden py-20 sm:py-28 md:py-32 border-b border-border"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 md:gap-16 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: isArabic ? 40 : -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8 }}
          >
            <span className="mb-3 inline-block font-mono text-xs uppercase tracking-widest text-primary">
              {isArabic ? "قصتنا" : "Our Story"}
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-8">
              {dict.about.title}
            </h2>
            <div className="space-y-6 text-muted-foreground">
              <p className="text-base sm:text-lg leading-relaxed">
                {dict.about.p1}
              </p>
              <p className="text-base sm:text-lg leading-relaxed">
                {dict.about.p2}
              </p>
            </div>

            {/* Feature grid with hover effects */}
            <div className="mt-10 grid grid-cols-2 gap-x-8 gap-y-6">
              {features.map((feature, i) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={i}
                    className="group flex items-start gap-3 rounded-lg p-3 -m-3 cursor-default transition-all duration-300 hover:bg-primary/5 hover:scale-[1.02]"
                    whileHover={{ y: -2 }}
                    transition={{ duration: 0.2 }}
                  >
                    <motion.div
                      className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-md text-primary transition-all duration-300 group-hover:bg-primary/10 group-hover:scale-110"
                      whileHover={{ rotate: [0, -8, 8, -8, 0] }}
                      transition={{ duration: 0.4 }}
                    >
                      <Icon className="h-5 w-5 transition-all duration-300 group-hover:text-primary/80" />
                    </motion.div>
                    <div>
                      <h4 className="text-sm font-semibold text-foreground transition-colors duration-300 group-hover:text-primary">
                        {dict.about.features?.[feature.titleKey]?.title ||
                          (isArabic
                            ? feature.fallbackTitleAr
                            : feature.fallbackTitle)}
                      </h4>
                      <p className="mt-1 text-xs leading-relaxed text-muted-foreground transition-colors duration-300 group-hover:text-foreground/80">
                        {dict.about.features?.[feature.titleKey]?.description ||
                          (isArabic
                            ? feature.fallbackDescAr
                            : feature.fallbackDesc)}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: isArabic ? -40 : 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative h-96 sm:h-[500px] md:h-[550px] rounded-lg overflow-hidden border border-border/40 group"
          >
            <motion.img
              src="/images/office-building-exterior.jpg"
              alt="GEODRILL headquarters building"
              className="h-full w-full object-cover transition-all duration-700 group-hover:scale-105"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.6 }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent transition-opacity duration-500 group-hover:from-black/80" />

            {/* Quote overlay with hover effect */}
            <motion.div
              className="absolute inset-x-4 bottom-4 sm:inset-x-6 sm:bottom-6 rounded-lg bg-[#0b1220]/90 backdrop-blur-sm p-5 sm:p-6 flex items-start gap-4 transition-all duration-300 group-hover:bg-[#0b1220]/95 group-hover:backdrop-blur-md group-hover:scale-[1.02] group-hover:shadow-lg"
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
            >
              <motion.span
                className="flex-shrink-0 flex h-10 w-10 items-center justify-center rounded-full bg-primary/20 text-primary transition-all duration-300 group-hover:bg-primary/30 group-hover:scale-110"
                whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                transition={{ duration: 0.5 }}
              >
                <Quote className="h-5 w-5" />
              </motion.span>
              <motion.p className="text-sm sm:text-base leading-relaxed text-white/90 transition-all duration-300 group-hover:text-white">
                {dict.about.p3 ||
                  (isArabic
                    ? "مهمتنا بسيطة: تقديم بيانات جيوتقنية دقيقة وحلول عملية تمكن عملاءنا من البناء بثقة."
                    : "Our mission is simple: provide accurate geotechnical data and practical solutions that enable our clients to build with confidence.")}
              </motion.p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
