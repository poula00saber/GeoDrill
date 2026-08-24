"use client";

import { useState, type FormEvent } from "react";
import { useLanguage } from "@/components/language-provider";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { SECTION_IDS } from "@/lib/content";
import { submitContactForm } from "@/lib/submit-contact";
import {
  validateContactInput,
  type ContactFormInput,
} from "@/types/contact";

type Status = "idle" | "sending" | "success" | "error";

const EMPTY_FORM: ContactFormInput = {
  fullName: "",
  entityType: "individual",
  companyName: "",
  email: "",
  phone: "",
  projectDescription: "",
};

export function Contact() {
  const { t, lang } = useLanguage();
  const c = t.contact;

  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const [form, setForm] = useState<ContactFormInput>(EMPTY_FORM);
  const [fieldErrors, setFieldErrors] = useState<
    Partial<Record<keyof ContactFormInput, string>>
  >({});

  const inputClass = (hasError?: string) =>
    `w-full rounded-xl border bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:ring-2 ${
      hasError
        ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
        : "border-border focus:border-teal focus:ring-teal/20"
    }`;

  const segClass = (active: boolean) =>
    `rounded-xl border px-3 py-2.5 text-sm font-medium transition-colors ${
      active
        ? "border-teal bg-teal text-navy"
        : "border-border bg-background text-muted-foreground hover:border-teal/40"
    }`;

  const setField = (key: keyof ContactFormInput, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMessage("");
    setFieldErrors({});

    const validation = validateContactInput(form);
    if (!validation.ok) {
      setFieldErrors(validation.errors);
      setStatus("error");
      setMessage(
        lang !== "ar"
          ? "Please review the highlighted fields."
          : "يرجى مراجعة الحقول المحددة.",
      );
      return;
    }

    setStatus("sending");
    // Resolve the effective company name: individuals default to "Individual".
    const payload: ContactFormInput =
      form.entityType === "company"
        ? form
        : { ...form, companyName: "Individual" };
    const result = await submitContactForm(payload);
    if (result.ok) {
      setStatus("success");
      setMessage(c.form.sent);
      setForm(EMPTY_FORM);
    } else {
      setStatus("error");
      setMessage(result.message);
    }
  }

  return (
    <section id={SECTION_IDS.contact} className="bg-muted py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="flex flex-col gap-8">
            <SectionHeading kicker={c.kicker} title={c.title} sub={c.sub} />

            <div className="flex flex-col gap-4">
              <InfoRow icon={<PinIcon />} label={c.infoTitle} value={c.address} />
              {/* TODO: replace with verified real phone/email from client */}
              <InfoRow icon={<PhoneIcon />} value={c.phoneLabel} dir="ltr" />
              <InfoRow icon={<MailIcon />} value={c.emailLabel} dir="ltr" />
            </div>
          </div>

          <Reveal delay={120}>
            {status === "success" ? (
              <div className="flex h-full min-h-64 flex-col items-center justify-center gap-4 rounded-2xl border border-teal/30 bg-card p-10 text-center">
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-teal/15 text-teal">
                  <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                </span>
                <p className="text-lg font-medium text-foreground">{c.form.sent}</p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-6 md:p-8"
              >
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="flex flex-col gap-2">
                    <span className="text-sm font-medium text-foreground">{c.form.name}</span>
                    <input type="text" value={form.fullName} onChange={(e) => setField("fullName", e.target.value)} className={inputClass(fieldErrors.fullName)} />
                    {fieldErrors.fullName && <span className="text-xs text-red-600">{fieldErrors.fullName}</span>}
                  </label>
                  <div className="flex flex-col gap-2">
                    <span className="text-sm font-medium text-foreground">{c.form.entityLabel}</span>
                    <div className="grid grid-cols-2 gap-2">
                      <button type="button" onClick={() => setField("entityType", "individual")} className={segClass(form.entityType !== "company")}>
                        {c.form.entityIndividual}
                      </button>
                      <button type="button" onClick={() => setField("entityType", "company")} className={segClass(form.entityType === "company")}>
                        {c.form.entityCompany}
                      </button>
                    </div>
                  </div>
                </div>
                {form.entityType === "company" && (
                  <label className="flex flex-col gap-2">
                    <span className="text-sm font-medium text-foreground">{c.form.companyName}</span>
                    <input type="text" value={form.companyName} onChange={(e) => setField("companyName", e.target.value)} className={inputClass(fieldErrors.companyName)} />
                    {fieldErrors.companyName && <span className="text-xs text-red-600">{fieldErrors.companyName}</span>}
                  </label>
                )}
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="flex flex-col gap-2">
                    <span className="text-sm font-medium text-foreground">{c.form.email}</span>
                    <input type="email" value={form.email} onChange={(e) => setField("email", e.target.value)} className={inputClass(fieldErrors.email)} />
                    {fieldErrors.email && <span className="text-xs text-red-600">{fieldErrors.email}</span>}
                  </label>
                  <label className="flex flex-col gap-2">
                    <span className="text-sm font-medium text-foreground">{c.form.phone}</span>
                    <input type="tel" value={form.phone} onChange={(e) => setField("phone", e.target.value)} className={inputClass(fieldErrors.phone)} />
                    {fieldErrors.phone && <span className="text-xs text-red-600">{fieldErrors.phone}</span>}
                  </label>
                </div>
                <label className="flex flex-col gap-2">
                  <span className="text-sm font-medium text-foreground">{c.form.projectDescription}</span>
                  <textarea rows={4} value={form.projectDescription ?? ""} onChange={(e) => setField("projectDescription", e.target.value)} className={inputClass()} />
                </label>
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="mt-2 inline-flex items-center justify-center rounded-xl bg-navy px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-teal hover:text-white disabled:opacity-60"
                >
                  {status === "sending" ? c.form.sending : c.form.send}
                </button>
                {status === "error" && (
                  <p className="flex items-center gap-2 text-sm text-red-600">{message}</p>
                )}
              </form>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  )
}

function InfoRow({
  icon,
  label,
  value,
  dir,
}: {
  icon: React.ReactNode
  label?: string
  value: string
  dir?: 'ltr'
}) {
  return (
    <div className="flex items-start gap-4">
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent text-teal-dark [&_svg]:h-5 [&_svg]:w-5">
        {icon}
      </span>
      <div className="flex flex-col">
        {label ? <span className="text-sm font-semibold text-foreground">{label}</span> : null}
        <span className="text-sm leading-relaxed text-muted-foreground" dir={dir}>
          {value}
        </span>
      </div>
    </div>
  )
}

function PinIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  )
}
function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3-8.6A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.3 1.8.6 2.6a2 2 0 0 1-.5 2.1L8 9.5a16 16 0 0 0 6 6l1.1-1.1a2 2 0 0 1 2.1-.5c.8.3 1.7.5 2.6.6a2 2 0 0 1 1.7 2Z" />
    </svg>
  )
}
function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m2 7 10 6 10-6" />
    </svg>
  )
}
