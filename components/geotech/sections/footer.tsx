"use client";

import { Link as LinkIcon, ArrowUp } from "lucide-react";
import { useLanguage } from "@/components/geotech/providers/language-provider";
import { ContourLines } from "@/components/geotech/geological/background";
import { siteConfig } from "@/lib/geotech-site-config";

export function Footer() {
  const { dict } = useLanguage();
  if (!dict) return null;

  const navItems = [
    { label: dict.nav.about, href: "#about" },
    { label: dict.nav.services, href: "#services" },
    { label: dict.nav.technology, href: "#technology" },
    { label: dict.nav.projects, href: "#projects" },
    { label: dict.nav.qhse, href: "#qhse" },
    { label: dict.nav.contact, href: "#contact" },
  ];

  const socials = [
    { icon: LinkIcon, href: siteConfig.social.linkedin },
    { icon: LinkIcon, href: siteConfig.social.instagram },
    { icon: LinkIcon, href: siteConfig.social.twitter },
    { icon: LinkIcon, href: siteConfig.social.facebook },
  ];

  return (
    <footer className="relative overflow-hidden border-t border-border/40 bg-background">
      <ContourLines className="text-primary" opacity={0.03} />

      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5">
              <svg viewBox="0 0 40 40" className="h-10 w-10">
                <rect
                  x="2"
                  y="2"
                  width="36"
                  height="36"
                  rx="6"
                  fill="hsl(var(--primary))"
                />
                <path
                  d="M10 14 L20 8 L30 14 L30 26 L20 32 L10 26 Z"
                  fill="none"
                  stroke="hsl(var(--primary-foreground))"
                  strokeWidth="2"
                  strokeLinejoin="round"
                />
                <circle
                  cx="20"
                  cy="20"
                  r="3"
                  fill="hsl(var(--primary-foreground))"
                />
              </svg>
              <div className="flex flex-col leading-none">
                <span className="text-lg font-bold tracking-tight">
                  GEODRILL
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
                  KSA Â· GEOTECH
                </span>
              </div>
            </div>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-muted-foreground text-pretty">
              {dict.footer.tagline}
            </p>
            <div className="mt-6 flex gap-3">
              {socials.map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-md border border-border/40 bg-surface/50 text-muted-foreground transition-all hover:border-primary/40 hover:text-primary"
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="mb-4 font-mono text-xs uppercase tracking-wider text-muted-foreground">
              {dict.footer.navigation}
            </h3>
            <ul className="space-y-2.5">
              {navItems.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="group flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <span className="h-px w-0 bg-primary transition-all duration-300 group-hover:w-4" />
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-4 font-mono text-xs uppercase tracking-wider text-muted-foreground">
              {dict.footer.contactTitle}
            </h3>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              <li>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="transition-colors hover:text-foreground"
                >
                  {siteConfig.email}
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.phoneHref}
                  className="transition-colors hover:text-foreground"
                >
                  {siteConfig.phone}
                </a>
              </li>
              <li className="text-pretty">
                {siteConfig.address.line1}
                <br />
                {siteConfig.address.line2}
                <br />
                {siteConfig.address.city}, {siteConfig.address.country}
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border/40 pt-6 sm:flex-row">
          <p className="font-mono text-xs text-muted-foreground">
            Â© {new Date().getFullYear()} {siteConfig.name}.{" "}
            {dict.footer.rights}
          </p>
          <div className="flex items-center gap-4">
            <span className="font-mono text-xs text-muted-foreground/60">
              {siteConfig.handle}
            </span>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="flex h-8 w-8 items-center justify-center rounded-md border border-border/40 transition-colors hover:border-primary/40 hover:text-primary"
              aria-label={dict.common.backToTop}
            >
              <ArrowUp className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
