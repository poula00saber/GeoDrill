"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Check,
  Loader2,
  Send,
  Upload,
} from "lucide-react";
import { useLanguage } from "@/geotech/components/providers/language-provider";
import { SectionHeading } from "@/geotech/components/section-heading";
import { Button } from "@/geotech/components/ui/button";
import { Input } from "@/geotech/components/ui/input";
import { Textarea } from "@/geotech/components/ui/textarea";
import { Label } from "@/geotech/components/ui/label";
import { ContourLines } from "@/geotech/components/geological/background";
import { siteConfig } from "@/geotech/lib/site-config";
import { submitGeotechContact } from "@/lib/submit-geotech-contact";

const schema = z.object({
  fullName: z.string().min(1, "Please enter your full name"),
  company: z.string().optional(),
  email: z
    .string()
    .min(1, "Please enter your email")
    .email("Please enter a valid email address"),
  phone: z.string().optional(),
  projectType: z.string().optional(),
  requiredService: z.string().optional(),
  projectLocation: z.string().optional(),
  projectDescription: z.string().min(1, "Please describe your project"),
});

type FormData = z.infer<typeof schema>;

// Allowed attachment types: PDFs, CAD files (DWG/DXF), images, and Word docs.
const ACCEPTED_MIME = new Set([
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/webp",
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/dwg",
  "image/vnd.dxf",
  "application/x-dwg",
  "application/x-autocad",
  "application/acad",
  "application/dxf",
]);
// AutoCAD files are often reported with a generic MIME type, so also accept
// them via their file extension.
const ACCEPTED_EXT = /\.(pdf|doc|docx|dwg|dxf|jpe?g|png|gif|webp)$/i;
const ACCEPT_HINT = ".jpg,.jpeg,.png,.gif,.webp,.pdf,.doc,.docx,.dwg,.dxf";
const MAX_FILE_BYTES = 10 * 1024 * 1024; // 10 MB

export function ContactSection() {
  const { dict, locale } = useLanguage();
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [attachmentFile, setAttachmentFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  if (!dict) return null;

  const handleFileChange = (file: File | null) => {
    setFileError("");
    if (!file) {
      setAttachmentFile(null);
      return;
    }
    if (!ACCEPTED_MIME.has(file.type) && !ACCEPTED_EXT.test(file.name)) {
      setFileError(
        locale !== "ar"
          ? "Unsupported file type. Please upload a PDF, DWG, DXF, image, or Word document."
          : "نوع الملف غير مدعوم. يرجى رفع ملف PDF أو DWG أو DXF أو صورة أو Word.",
      );
      setAttachmentFile(null);
      return;
    }
    if (file.size > MAX_FILE_BYTES) {
      setFileError(
        locale !== "ar"
          ? "File is too large. Maximum size is 10 MB."
          : "الملف كبير جدًا. الحد الأقصى هو 10 ميجابايت.",
      );
      setAttachmentFile(null);
      return;
    }
    setAttachmentFile(file);
  };

  const onSubmit = async (data: FormData) => {
    setSubmitting(true);
    setError(false);
    setSuccess(false);
    try {
      const result = await submitGeotechContact(data, attachmentFile);
      if (result.ok) {
        setSuccess(true);
        setAttachmentFile(null);
        setFileError("");
        reset();
        setTimeout(() => setSuccess(false), 5000);
      } else {
        setError(true);
      }
    } catch {
      setError(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="relative overflow-hidden border-y border-border bg-surface/30 py-20 sm:py-28 md:py-32"
    >
      <ContourLines className="text-primary" opacity={0.04} />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left: Info */}
          <div>
            <SectionHeading
              eyebrow="Contact"
              title={dict.contact.title}
              description={dict.contact.subtitle}
              className="mb-10"
            />

            <div className="space-y-4">
              <ContactItem
                icon={Mail}
                label={dict.contact.info.email}
                value={siteConfig.email}
                href={`mailto:${siteConfig.email}`}
              />
              <ContactItem
                icon={Phone}
                label={dict.contact.info.phone}
                value={siteConfig.phone}
                href={siteConfig.phoneHref}
              />
              <ContactItem
                icon={MapPin}
                label={dict.contact.info.address}
                value={`${siteConfig.address.line1}, ${siteConfig.address.line2}, ${siteConfig.address.city}, ${siteConfig.address.country}`}
              />
            </div>

            {/* Technical graphic */}
            <div className="mt-10 hidden lg:block">
              <div className="rounded-lg border border-border/40 bg-card p-4">
                <div className="flex items-center gap-2 border-b border-border/40 pb-2">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                    GEODRILL / PROJECT INTAKE
                  </span>
                </div>
                <div className="mt-3 grid grid-cols-2 gap-3">
                  <div>
                    <span className="font-mono text-[9px] uppercase tracking-wider text-muted-foreground/60">
                      Status
                    </span>
                    <p className="font-mono text-xs text-primary">Ready</p>
                  </div>
                  <div>
                    <span className="font-mono text-[9px] uppercase tracking-wider text-muted-foreground/60">
                      Response
                    </span>
                    <p className="font-mono text-xs">24-48h</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div className="relative">
            <div className="rounded-lg border border-border/40 bg-card p-6 sm:p-8">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <FormField
                    label={dict.contact.form.fullName}
                    error={
                      errors.fullName?.message &&
                      (locale === "ar"
                        ? dict.contact.validation.nameRequired
                        : errors.fullName.message)
                    }
                    required
                  >
                    <Input
                      {...register("fullName")}
                      className="bg-background"
                    />
                  </FormField>
                  <FormField label={dict.contact.form.company}>
                    <Input {...register("company")} className="bg-background" />
                  </FormField>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <FormField
                    label={dict.contact.form.email}
                    error={
                      errors.email?.message &&
                      (locale === "ar"
                        ? errors.email.type === "email"
                          ? dict.contact.validation.emailInvalid
                          : dict.contact.validation.emailRequired
                        : errors.email.message)
                    }
                    required
                  >
                    <Input
                      type="email"
                      {...register("email")}
                      className="bg-background"
                    />
                  </FormField>
                  <FormField label={dict.contact.form.phone}>
                    <Input
                      type="tel"
                      {...register("phone")}
                      className="bg-background"
                    />
                  </FormField>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <FormField label={dict.contact.form.projectType}>
                    <Input
                      {...register("projectType")}
                      className="bg-background"
                    />
                  </FormField>
                  <FormField label={dict.contact.form.requiredService}>
                    <Input
                      {...register("requiredService")}
                      className="bg-background"
                    />
                  </FormField>
                </div>

                <FormField label={dict.contact.form.projectLocation}>
                  <Input
                    {...register("projectLocation")}
                    className="bg-background"
                  />
                </FormField>

                <FormField
                  label={dict.contact.form.projectDescription}
                  error={
                    errors.projectDescription?.message &&
                    (locale === "ar"
                      ? dict.contact.validation.descriptionRequired
                      : errors.projectDescription.message)
                  }
                  required
                >
                  <Textarea
                    {...register("projectDescription")}
                    rows={4}
                    className="resize-none bg-background"
                  />
                </FormField>

                <FormField label={dict.contact.form.uploadDocuments}>
                  <label
                    className={
                      fileError
                        ? "flex w-full cursor-pointer items-center justify-between gap-3 rounded-md border border-dashed border-destructive/60 bg-background px-4 py-3 transition-colors hover:border-primary/40"
                        : "flex w-full cursor-pointer items-center justify-between gap-3 rounded-md border border-dashed border-border bg-background px-4 py-3 transition-colors hover:border-primary/40"
                    }
                  >
                    <span className="flex min-w-0 items-center gap-3">
                      <Upload className="h-4 w-4 shrink-0 text-muted-foreground" />
                      <span className="truncate text-sm">
                        {attachmentFile
                          ? attachmentFile.name
                          : locale !== "ar"
                            ? "PDF, DWG, DXF (max 10MB)"
                            : "PDF، DWG، DXF (بحد أقصى 10 ميجابايت)"}
                      </span>
                    </span>
                    {attachmentFile ? (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          handleFileChange(null);
                        }}
                        className="shrink-0 rounded-full px-2 py-0.5 text-xs font-semibold text-destructive transition-colors hover:bg-destructive/10"
                        aria-label={
                          locale !== "ar" ? "Remove file" : "إزالة الملف"
                        }
                      >
                        {locale !== "ar" ? "Remove" : "إزالة"}
                      </button>
                    ) : (
                      <span className="shrink-0 text-xs font-medium text-primary">
                        {locale !== "ar" ? "Browse" : "تصفح"}
                      </span>
                    )}
                    <input
                      type="file"
                      accept={ACCEPT_HINT}
                      onChange={(e) =>
                        handleFileChange(e.target.files?.[0] ?? null)
                      }
                      className="sr-only"
                    />
                  </label>
                  {fileError ? (
                    <p className="text-xs text-destructive">{fileError}</p>
                  ) : (
                    <p className="text-xs text-muted-foreground">
                      {locale !== "ar"
                        ? "Attach a site plan, drawing, or specification to help us scope your project."
                        : "أرفق مخططًا للموقع أو رسمًا أو مواصفات لمساعدتنا في تحديد نطاق مشروعك."}
                    </p>
                  )}
                </FormField>

                <Button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="me-2 h-4 w-4 animate-spin" />
                      {dict.contact.form.submitting}
                    </>
                  ) : (
                    <>
                      {dict.contact.form.submit}
                      <Send className="ms-2 h-4 w-4" />
                    </>
                  )}
                </Button>

                <AnimatePresence>
                  {success && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="flex items-center gap-3 rounded-md border border-primary/30 bg-primary/10 p-3"
                    >
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary">
                        <Check className="h-4 w-4 text-primary-foreground" />
                      </div>
                      <p className="text-sm text-primary">
                        {dict.contact.form.success}
                      </p>
                    </motion.div>
                  )}
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="rounded-md border border-destructive/30 bg-destructive/10 p-3"
                    >
                      <p className="text-sm text-destructive">
                        {dict.contact.form.error}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FormField({
  label,
  children,
  error,
  required,
}: {
  label: string;
  children: React.ReactNode;
  error?: string;
  required?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <Label className="text-xs font-medium text-muted-foreground">
        {label}
        {required && <span className="text-primary"> *</span>}
      </Label>
      {children}
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}

function ContactItem({
  icon: Icon,
  label,
  value,
  href,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  href?: string;
}) {
  const content = (
    <div className="group flex items-start gap-4 rounded-lg border border-border/40 bg-card p-4 transition-colors hover:border-primary/40">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-primary/10">
        <Icon className="h-5 w-5 text-primary" strokeWidth={1.5} />
      </div>
      <div className="flex flex-col">
        <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
          {label}
        </span>
        <span className="text-sm font-medium text-foreground">{value}</span>
      </div>
    </div>
  );

  return href ? <a href={href}>{content}</a> : content;
}
