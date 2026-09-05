"use client";

import { ArrowUp } from "lucide-react";
import { useLanguage } from "../providers/language-provider";
import { useTheme } from "@/components/theme-provider";
import { Logo } from "@/components/logo";
import { ContourLines } from "../geological/background";
import { siteConfig } from "../../lib/site-config";

export function Footer() {
  const { dict, locale } = useLanguage();
  const { theme, resolvedTheme } = useTheme();
  if (!dict) return null;

  // Build absolute locale prefix so footer links always resolve under the
  // correct language tree (e.g. /geotechnical/ar/about).
  const localePrefix = `/geotechnical/${locale}`;

  // Geotech brand logo — dark-mark on light backgrounds, light-mark on dark.
  const logoSrc =
    (resolvedTheme ?? theme) === "dark"
      ? "/geotech-logo2.png"
      : "/geotech-logo.png";

  const navItems = [
    { label: dict.nav.about, href: `${localePrefix}/about` },
    { label: dict.nav.services, href: `${localePrefix}/services` },
    { label: dict.nav.projects, href: `${localePrefix}/projects` },
    { label: dict.nav.qhse, href: `${localePrefix}/qhse` },
    { label: dict.nav.clients, href: `${localePrefix}/clients` },
    { label: dict.nav.contact, href: `${localePrefix}/contact` },
  ];

  const socials = [
    {
      icon: LinkedinIcon,
      href: siteConfig.social.linkedin,
      hoverClass:
        "hover:bg-[#0A66C2] hover:border-[#0A66C2] hover:text-white hover:shadow-lg hover:shadow-[#0A66C2]/30",
    },
    {
      icon: InstagramIcon,
      href: siteConfig.social.instagram,
      hoverClass:
        "hover:bg-gradient-to-tr hover:from-[#f09433] hover:via-[#dc2743] hover:to-[#bc1888] hover:border-transparent hover:text-white hover:shadow-lg hover:shadow-[#dc2743]/30",
    },
    {
      icon: XIcon,
      href: siteConfig.social.twitter,
      hoverClass:
        "hover:bg-black hover:border-white/20 hover:text-white hover:shadow-lg hover:shadow-black/50 dark:hover:bg-white dark:hover:text-black",
    },
    {
      icon: FacebookIcon,
      href: siteConfig.social.facebook,
      hoverClass:
        "hover:bg-[#1877F2] hover:border-[#1877F2] hover:text-white hover:shadow-lg hover:shadow-[#1877F2]/30",
    },
  ];

  return (
    <footer className="relative overflow-hidden border-t border-border bg-background">
      {/* Animated contour lines (subtle gold) */}
      <ContourLines className="text-primary" opacity={0.17} />

      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Logo src={logoSrc} size="h-30" />
            <p className="mt-6 max-w-md text-sm leading-relaxed text-muted-foreground text-pretty">
              {dict.footer.tagline}
            </p>

            {/* Social Icons — Scales up with brand colors */}
            <div className="mt-6 flex gap-3">
              {socials.map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group flex h-10 w-10 items-center justify-center rounded-lg border border-border/60 bg-surface/50 text-muted-foreground transition-all duration-300 hover:-translate-y-1 hover:scale-110 ${social.hoverClass}`}
                >
                  <social.icon className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
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
                  className="transition-colors hover:text-primary"
                >
                  {siteConfig.email}
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.phoneHref}
                  className="transition-colors hover:text-primary"
                  dir="ltr"
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
            © {new Date().getFullYear()} {siteConfig.name}. {dict.footer.rights}
          </p>
          <div className="flex items-center gap-4">
            <span className="font-mono text-xs text-muted-foreground/60">
              {siteConfig.handle}
            </span>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="group flex h-9 w-9 items-center justify-center rounded-lg border border-border/60 bg-surface/50 transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:bg-primary hover:text-primary-foreground hover:shadow-md"
              aria-label={dict.common.backToTop}
            >
              <ArrowUp className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* Inline brand icons */
type IconProps = { className?: string };

function LinkedinIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden
    >
      <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.5 8h4V23h-4V8zm7.5 0h3.8v2.05h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1V23h-4v-7.5c0-1.79-.03-4.1-2.5-4.1-2.5 0-2.88 1.95-2.88 3.96V23h-4V8z" />
    </svg>
  );
}

function InstagramIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className={className}
      aria-hidden
    >
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function XIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231zm-1.161 17.52h1.833L7.084 4.126H5.117l11.966 15.644z" />
    </svg>
  );
}

function FacebookIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden
    >
      <path d="M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.79-4.7 4.53-4.7 1.31 0 2.68.24 2.68.24v2.97h-1.51c-1.49 0-1.95.93-1.95 1.89v2.26h3.32l-.53 3.49h-2.79V24C19.61 23.1 24 18.1 24 12.07z" />
    </svg>
  );
}
