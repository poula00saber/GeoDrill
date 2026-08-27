"use client";

import { useLanguage } from "@/components/language-provider";
import { Logo } from "@/components/logo";

export function Footer() {
  const { t, lang } = useLanguage();
  const f = t.footer;
  const year = new Date().getFullYear();

  const socials = [
    {
      label: "Instagram",
      href: f.social.instagram,
      path: "M12 2.2c3.2 0 3.6 0 4.9.1 1.2.1 1.8.2 2.2.4.6.2 1 .5 1.4.9.4.4.7.8.9 1.4.2.4.4 1 .4 2.2.1 1.3.1 1.7.1 4.9s0 3.6-.1 4.9c-.1 1.2-.2 1.8-.4 2.2-.2.6-.5 1-.9 1.4-.4.4-.8.7-1.4.9-.4.2-1 .4-2.2.4-1.3.1-1.7.1-4.9.1s-3.6 0-4.9-.1c-1.2-.1-1.8-.2-2.2-.4-.6-.2-1-.5-1.4-.9-.4-.4-.7-.8-.9-1.4-.2-.4-.4-1-.4-2.2C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.9c.1-1.2.2-1.8.4-2.2.2-.6.5-1 .9-1.4.4-.4.8-.7 1.4-.9.4-.2 1-.4 2.2-.4C8.4 2.2 8.8 2.2 12 2.2Zm0 3.6a6.2 6.2 0 1 0 0 12.4 6.2 6.2 0 0 0 0-12.4Zm0 10.2a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm6.4-10.5a1.4 1.4 0 1 1-2.9 0 1.4 1.4 0 0 1 2.9 0Z",
    },
    {
      label: "X (Twitter)",
      href: f.social.x,
      path: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.451-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z",
    },
    {
      label: "LinkedIn",
      href: f.social.linkedin,
      path: "M19 0h-14C2.2 0 0 2.2 0 5v14c0 2.8 2.2 5 5 5h14c2.8 0 5-2.2 5-5V5c0-2.8-2.2-5-5-5ZM8.3 19H5.4V9.2h2.9V19ZM6.8 8c-.9 0-1.7-.8-1.7-1.8S5.9 4.5 6.8 4.5s1.7.8 1.7 1.7S7.8 8 6.8 8Zm12.3 11h-2.9v-5.3c0-1.3 0-2.9-1.8-2.9s-2 1.4-2 2.8V19H9.4V9.2h2.8v1.3h.1c.4-.8 1.3-1.6 2.7-1.6 2.9 0 3.4 1.9 3.4 4.4V19Z",
    },
    {
      label: "Facebook",
      href: f.social.facebook,
      path: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z",
    },
  ];

  return (
    <footer className="bg-navy text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 md:grid-cols-2 lg:grid-cols-4">
        <div className="flex flex-col gap-4">
          <Logo onDark />
          <p className="max-w-xs text-sm leading-relaxed text-white/60">
            {f.tagline}
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-teal">
            {f.quickLinks}
          </h3>
          <ul className="flex flex-col gap-2.5">
            {t.nav.map((item) => {
              const pageHref =
                item.id === "blog"
                  ? `/contracting/${lang ?? "en"}/blog`
                  : item.id === "faq"
                    ? `/contracting/${lang ?? "en"}/faq`
                    : `#${item.id}`;
              return (
                <li key={item.id}>
                  <a
                    href={pageHref}
                    className="text-sm text-white/60 transition-colors hover:text-white"
                  >
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-teal">
            {f.servicesTitle}
          </h3>
          <ul className="flex flex-col gap-2.5">
            {t.services.items.slice(0, 6).map((s) => (
              <li key={s.key} className="text-sm text-white/60">
                {s.title}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-teal">
            {f.contactTitle}
          </h3>
          <ul className="flex flex-col gap-2.5 text-sm text-white/60">
            <li>{t.contact.address}</li>
            {/* TODO: replace with verified real phone/email from client */}
            <li dir="ltr" className="ltr:text-left rtl:text-right">
              {t.contact.phoneLabel}
            </li>
            <li dir="ltr" className="ltr:text-left rtl:text-right">
              {t.contact.emailLabel}
            </li>
          </ul>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-teal">
              {f.followLabel}
            </h4>
            <div className="mt-3 flex items-center gap-3">
              {socials.map(({ label, href, path }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex size-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/70 transition-all duration-300 hover:scale-110 hover:border-teal hover:bg-teal hover:text-navy"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="size-5"
                    aria-hidden
                  >
                    <path d={path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-6 py-6 text-xs text-white/50 sm:flex-row">
          <p>
            &copy; {year} {f.rights}
          </p>
          <p>{f.group}</p>
        </div>
      </div>
    </footer>
  );
}
