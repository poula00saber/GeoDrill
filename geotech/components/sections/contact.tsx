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
  FileCheck2,
  Clock,
  ShieldCheck,
  ArrowRight,
  ArrowLeft,
  X,
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

const ACCEPTED_MIME = new Set([
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/webp",
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.ms-powerpoint",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  "application/dwg",
  "image/vnd.dxf",
  "application/x-dwg",
  "application/x-autocad",
  "application/acad",
  "application/dxf",
]);

const ACCEPTED_EXT = /\.(pdf|doc|docx|ppt|pptx|dwg|dxf|jpe?g|png|gif|webp)$/i;
const ACCEPT_HINT =
  ".jpg,.jpeg,.png,.gif,.webp,.pdf,.doc,.docx,.ppt,.pptx,.dwg,.dxf";
const MAX_FILE_BYTES = 10 * 1024 * 1024; // 10 MB

export function ContactSection() {
  const { dict, locale } = useLanguage();
  const isAr = locale === "ar";

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
        isAr
          ? "نوع الملف غير مدعوم. يرجى رفع ملف PDF أو DWG أو DXF أو صورة أو Word أو PowerPoint."
          : "Unsupported file type. Please upload a PDF, DWG, DXF, image, Word, or PowerPoint document.",
      );
      setAttachmentFile(null);
      return;
    }
    if (file.size > MAX_FILE_BYTES) {
      setFileError(
        isAr
          ? "الملف كبير جدًا. الحد الأقصى هو 10 ميجابايت."
          : "File is too large. Maximum size is 10 MB.",
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
      className="relative overflow-hidden border-y border-border/60 bg-gradient-to-b from-background via-surface/20 to-background py-20 sm:py-28 md:py-32"
    >
      <ContourLines className="text-primary" opacity={0.05} />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left Column: Info & 2 Large Buttons (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <SectionHeading
                eyebrow={isAr ? "تواصل معنا" : "Contact"}
                title={dict.contact.title}
                description={dict.contact.subtitle}
                className="mb-10 text-start"
              />

              <div className="space-y-4">
                <ContactItem
                  icon={Mail}
                  label={dict.contact.info.email}
                  value={siteConfig.email}
                  href={`mailto:${siteConfig.email}`}
                  isAr={isAr}
                />
                <ContactItem
                  icon={Phone}
                  label={dict.contact.info.phone}
                  value={siteConfig.phone}
                  href={siteConfig.phoneHref}
                  isAr={isAr}
                />
                <ContactItem
                  icon={MapPin}
                  label={dict.contact.info.address}
                  value={`${siteConfig.address.line1}, ${siteConfig.address.line2}, ${siteConfig.address.city}, ${siteConfig.address.country}`}
                  isAr={isAr}
                />
              </div>
            </div>

            {/* 2 Large Action / Status Buttons Replacing HUD */}
            <div className="mt-10 grid gap-4">
              {/* Button 1: Respond in 24-48 Hours */}
              <div className="flex h-16 w-full items-center justify-center gap-3.5 rounded-2xl border border-primary/30 bg-primary/10 px-6 font-semibold text-primary shadow-lg backdrop-blur-md transition-all duration-300 hover:border-primary hover:bg-primary/15">
                <Clock className="h-6 w-6 shrink-0 text-primary" />
                <span className="text-base sm:text-lg">
                  {isAr
                    ? "الاستجابة خلال 24 - 48 ساعة"
                    : "Respond in 24 to 48 Hours"}
                </span>
              </div>

              {/* Button 2: Immediate Technical Support */}
              <a
                href={siteConfig.phoneHref}
                className="flex h-16 w-full items-center justify-center gap-3.5 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 px-6 font-semibold text-emerald-600 dark:text-emerald-400 shadow-lg backdrop-blur-md transition-all duration-300 hover:border-emerald-500 hover:bg-emerald-500/15"
              >
                <ShieldCheck className="h-6 w-6 shrink-0 text-emerald-500" />
                <span className="text-base sm:text-lg">
                  {isAr ? "تواصل عن طريق الواتس اب" : "Call us on Whatsapp"}
                </span>
              </a>
            </div>
          </div>

          {/* Right Column: Form Container (7 Cols) */}
          <div className="lg:col-span-7">
            <div className="relative rounded-3xl border border-border/60 bg-card/80 p-6 shadow-2xl backdrop-blur-xl transition-all duration-300 hover:border-border sm:p-8">
              {/* Form Corner Accents */}
              <span className="absolute top-3 left-3 font-mono text-xs text-primary/40">
                +
              </span>
              <span className="absolute top-3 right-3 font-mono text-xs text-primary/40">
                +
              </span>
              <span className="absolute bottom-3 left-3 font-mono text-xs text-primary/40">
                +
              </span>
              <span className="absolute bottom-3 right-3 font-mono text-xs text-primary/40">
                +
              </span>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <FormField
                    label={dict.contact.form.fullName}
                    error={
                      errors.fullName?.message &&
                      (isAr
                        ? dict.contact.validation.nameRequired
                        : errors.fullName.message)
                    }
                    required
                  >
                    <Input
                      {...register("fullName")}
                      className="bg-background/60 transition-all duration-200 focus:bg-background focus:ring-2 focus:ring-primary/20"
                    />
                  </FormField>
                  <FormField label={dict.contact.form.company}>
                    <Input
                      {...register("company")}
                      className="bg-background/60 transition-all duration-200 focus:bg-background focus:ring-2 focus:ring-primary/20"
                    />
                  </FormField>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <FormField
                    label={dict.contact.form.email}
                    error={
                      errors.email?.message &&
                      (isAr
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
                      className="bg-background/60 transition-all duration-200 focus:bg-background focus:ring-2 focus:ring-primary/20"
                    />
                  </FormField>
                  <FormField label={dict.contact.form.phone}>
                    <Input
                      type="tel"
                      {...register("phone")}
                      className="bg-background/60 transition-all duration-200 focus:bg-background focus:ring-2 focus:ring-primary/20"
                    />
                  </FormField>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <FormField label={dict.contact.form.projectType}>
                    <Input
                      {...register("projectType")}
                      className="bg-background/60 transition-all duration-200 focus:bg-background focus:ring-2 focus:ring-primary/20"
                    />
                  </FormField>
                  <FormField label={dict.contact.form.requiredService}>
                    <Input
                      {...register("requiredService")}
                      className="bg-background/60 transition-all duration-200 focus:bg-background focus:ring-2 focus:ring-primary/20"
                    />
                  </FormField>
                </div>

                <FormField label={dict.contact.form.projectLocation}>
                  <Input
                    {...register("projectLocation")}
                    className="bg-background/60 transition-all duration-200 focus:bg-background focus:ring-2 focus:ring-primary/20"
                  />
                </FormField>

                <FormField
                  label={dict.contact.form.projectDescription}
                  error={
                    errors.projectDescription?.message &&
                    (isAr
                      ? dict.contact.validation.descriptionRequired
                      : errors.projectDescription.message)
                  }
                  required
                >
                  <Textarea
                    {...register("projectDescription")}
                    rows={4}
                    className="resize-none bg-background/60 transition-all duration-200 focus:bg-background focus:ring-2 focus:ring-primary/20"
                  />
                </FormField>

                {/* File Dropzone */}
                <FormField label={dict.contact.form.uploadDocuments}>
                  <label
                    className={`group relative flex w-full cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed px-4 py-5 transition-all duration-300 ${
                      fileError
                        ? "border-destructive/60 bg-destructive/5 hover:border-destructive"
                        : attachmentFile
                          ? "border-primary/60 bg-primary/5 hover:border-primary"
                          : "border-border/60 bg-background/40 hover:border-primary/50 hover:bg-background/80"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`flex h-10 w-10 items-center justify-center rounded-xl border transition-all duration-300 ${
                          attachmentFile
                            ? "border-primary/40 bg-primary/10 text-primary"
                            : "border-border bg-card text-muted-foreground group-hover:border-primary/30 group-hover:text-primary"
                        }`}
                      >
                        {attachmentFile ? (
                          <FileCheck2 className="h-5 w-5" />
                        ) : (
                          <Upload className="h-5 w-5" />
                        )}
                      </div>

                      <div className="flex flex-col text-start">
                        <span className="truncate text-sm font-semibold text-foreground">
                          {attachmentFile
                            ? attachmentFile.name
                            : isAr
                              ? "انقر لرفع مخطط أو وثيقة"
                              : "Click to upload drawing or document"}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {attachmentFile
                            ? `${(attachmentFile.size / (1024 * 1024)).toFixed(2)} MB`
                            : isAr
                              ? "PDF, DWG, DXF, Word, PowerPoint, Images (بحد أقصى 10 ميجابايت)"
                              : "PDF, DWG, DXF, Word, PowerPoint, Images (Max 10MB)"}
                        </span>
                      </div>

                      {attachmentFile && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            handleFileChange(null);
                          }}
                          className="ms-auto flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                          aria-label={isAr ? "إزالة الملف" : "Remove file"}
                        >
                          <X className="h-4 w-4" />
                        </button>
                      )}
                    </div>

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
                    <p className="mt-1 text-xs text-destructive">{fileError}</p>
                  ) : (
                    <p className="mt-1 text-xs text-muted-foreground">
                      {isAr
                        ? "أرفق مخططًا للموقع أو رسمًا أو عرضًا توضيحيًا لمساعدتنا في تحديد نطاق عمل مشروعك."
                        : "Attach a site plan, drawing, presentation, or specification to help us scope your project."}
                    </p>
                  )}
                </FormField>

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={submitting}
                  className="group relative h-12 w-full overflow-hidden rounded-xl bg-primary text-primary-foreground shadow-lg transition-all duration-300 hover:bg-primary/90 hover:shadow-primary/25"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2 font-semibold">
                    {submitting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        {dict.contact.form.submitting}
                      </>
                    ) : (
                      <>
                        {dict.contact.form.submit}
                        {isAr ? (
                          <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
                        ) : (
                          <Send className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                        )}
                      </>
                    )}
                  </span>
                </Button>

                {/* Form Status Notifications */}
                <AnimatePresence>
                  {success && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="flex items-center gap-3 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4"
                    >
                      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white">
                        <Check className="h-4 w-4" />
                      </div>
                      <p className="text-sm font-medium text-emerald-600 dark:text-emerald-400">
                        {dict.contact.form.success}
                      </p>
                    </motion.div>
                  )}
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="rounded-xl border border-destructive/30 bg-destructive/10 p-4"
                    >
                      <p className="text-sm font-medium text-destructive">
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
      <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {label}
        {required && <span className="text-primary">*</span>}
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
  isAr,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  href?: string;
  isAr?: boolean;
}) {
  const content = (
    <div className="group flex items-start gap-4 rounded-2xl border border-border/50 bg-card/60 p-4 shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/50 hover:bg-card hover:shadow-md hover:shadow-primary/5">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 transition-colors duration-300 group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground">
        <Icon
          className="h-5 w-5 text-primary transition-colors duration-300 group-hover:text-primary-foreground"
          strokeWidth={1.75}
        />
      </div>
      <div className="flex flex-col text-start">
        <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
          {label}
        </span>
        <span
          className="mt-0.5 text-sm font-semibold text-foreground"
          dir="ltr"
        >
          {value}
        </span>
      </div>
      {href && (
        <div className="ms-auto flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground opacity-0 transition-all duration-300 group-hover:opacity-100">
          {isAr ? (
            <ArrowLeft className="h-4 w-4" />
          ) : (
            <ArrowRight className="h-4 w-4" />
          )}
        </div>
      )}
    </div>
  );

  return href ? (
    <a href={href} className="block">
      {content}
    </a>
  ) : (
    content
  );
}
