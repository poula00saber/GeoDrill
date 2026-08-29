"use client";

import { useLanguage } from "@/components/language-provider";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { cn } from "@/lib/utils";

export function Location() {
  const { t, lang } = useLanguage();
  const c = t.contact;
  const isAr = lang === "ar";

  const mapEmbedUrl =
    "https://maps.google.com/maps?q=24.6936953,46.8123783&t=&z=16&ie=UTF8&iwloc=&output=embed";

  const mapsExternalUrl =
    "https://maps.app.goo.gl/6rjVTm6tHWkJLi1eA?g_st=atm";

  const rows = [
    {
      label: isAr ? "العنوان" : "Address",
      value: c.address,
      href: mapsExternalUrl,
      target: "_blank",
      rel: "noopener noreferrer",
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
      ),
    },
    {
      label: isAr ? "الهاتف" : "Phone",
      value: c.phoneLabel,
      dir: "ltr",
      href: c.whatsapp,
      target: "_blank",
      rel: "noopener noreferrer",
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3-8.6A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.3 1.8.6 2.6a2 2 0 0 1-.5 2.1L8 9.5a16 16 0 0 0 6 6l1.1-1.1a2 2 0 0 1 2.1-.5c.8.3 1.7.5 2.6.6a2 2 0 0 1 1.7 2Z" />
        </svg>
      ),
    },
    {
      label: isAr ? "البريد الإلكتروني" : "Email",
      value: c.emailLabel,
      dir: "ltr",
      href: `mailto:${c.emailLabel}`,
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <rect x="2" y="4" width="20" height="16" rx="2" />
          <path d="m2 7 10 6 10-6" />
        </svg>
      ),
    },
  ];

  return (
    <section className="bg-background py-20 md:py-28 text-foreground transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <SectionHeading
            kicker={t.footer.locationsTitle}
            title={
              isAr ? "يسعدنا استقبالكم في مقرنا" : "Visit us at our offices"
            }
            sub={
              isAr
                ? "تفضل بزيارتنا أو تواصل معنا عبر الوسائل التالية."
                : "Reach out to our team or drop by our office anytime."
            }
            align="center"
          />
        </Reveal>

        {/* Info Cards */}
        <Reveal className="mt-12" delay={120}>
          <div className="grid gap-6 lg:grid-cols-3">
            {rows.map((row) => (
              <a
                key={row.label}
                href={row.href}
                target={row.target}
                rel={row.rel}
                className="group relative flex items-start gap-4 rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-teal hover:bg-teal hover:text-navy hover:shadow-xl hover:shadow-teal/20"
              >
                <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-accent text-teal-dark transition-colors duration-300 group-hover:bg-navy group-hover:text-teal [&_svg]:size-6">
                  {row.icon}
                </span>
                <div>
                  <p className="text-sm font-semibold text-foreground transition-colors duration-300 group-hover:text-navy">
                    {row.label}
                  </p>
                  <p
                    className={cn(
                      "mt-1 text-sm leading-relaxed text-muted-foreground transition-colors duration-300 group-hover:text-navy/80",
                      row.dir,
                    )}
                    dir={row.dir}
                  >
                    {row.value}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </Reveal>

        {/* Embedded Map Container */}
        <Reveal className="mt-10" delay={160}>
          <div className="relative h-[400px] w-full overflow-hidden rounded-2xl border border-border bg-card shadow-lg">
            <iframe
              title="Google Map Location"
              src={mapEmbedUrl}
              className="h-full w-full border-0 grayscale contrast-125 transition-all duration-300 dark:invert-[0.9] dark:hue-rotate-180"
              loading="lazy"
              allowFullScreen
            />
          </div>
        </Reveal>

        {/* Button */}
        <Reveal className="mt-8" delay={200}>
          <div className="flex justify-center">
            <a
              href={mapsExternalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-lg border-2 border-teal bg-transparent px-6 py-3 text-sm font-bold uppercase tracking-wide text-teal transition-all duration-300 hover:bg-teal hover:text-navy hover:shadow-lg hover:shadow-teal/20"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5"
                aria-hidden
              >
                <path d="M12 21s-7-4.35-7-11a7 7 0 0 1 14 0c0 6.65-7 11-7 11Z" />
                <circle cx="12" cy="10" r="2.5" />
              </svg>
              {isAr ? "افتح الموقع على الخريطة" : "Open in Google Maps"}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
