/**
 * Shared types and validation helpers for the contact form.
 * Imported by both the client form and the server API route.
 */

/** Raw payload the client sends to `/api/contact`. */
export interface ContactFormInput {
  fullName: string;
  /** Who is enquiring: an individual or a company. */
  entityType?: "individual" | "company";
  /** Company name — required for companies, defaults to "Individual" otherwise. */
  companyName?: string;
  email: string;
  phone: string;
  /** The customer's project description / idea. Optional. */
  projectDescription?: string;
  /**
   * Optional file attachment (photo / PDF / Word).
   * Send through the API as multipart/form-data; the server decodes it.
   */
  attachment?: {
    name: string;
    type: string;
    size: number;
    /** base64-encoded file content (server-side only). */
    data: string;
  } | null;
}

/** Standard result shape returned by the API and the client helper. */
export interface ContactFormResult {
  ok: boolean;
  message: string;
}

/** Field-level errors, keyed by field name. */
export type ContactFieldErrors = Partial<
  Record<keyof ContactFormInput, string>
>;

export interface ValidationResult {
  ok: boolean;
  errors: ContactFieldErrors;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
/** Digits with optional leading +, separators and spaces; 7-20 chars. */
const PHONE_RE = /^\+?[\d\s().-]{7,20}$/;

/**
 * Validates required fields, e-mail format and phone format.
 * Runs on the client (for instant feedback) and again on the server
 * (as the real line of defense).
 */
export function validateContactInput(data: ContactFormInput): ValidationResult {
  const errors: ContactFieldErrors = {};

  if (!data.fullName?.trim()) {
    errors.fullName = "Full name is required.";
  }

  if (data.entityType === "company" && !data.companyName?.trim()) {
    errors.companyName = "Please enter your company name.";
  }

  if (!data.email?.trim()) {
    errors.email = "Email address is required.";
  } else if (!EMAIL_RE.test(data.email.trim())) {
    errors.email = "Please enter a valid email address.";
  }

  if (!data.phone?.trim()) {
    errors.phone = "Phone number is required.";
  } else if (!PHONE_RE.test(data.phone.trim())) {
    errors.phone = "Please enter a valid phone number.";
  }

  return { ok: Object.keys(errors).length === 0, errors };
}

export function isContactFormInput(value: unknown): value is ContactFormInput {
  if (!value || typeof value !== "object") return false;
  const v = value as Record<string, unknown>;
  return (
    typeof v.fullName === "string" &&
    typeof v.email === "string" &&
    typeof v.phone === "string"
  );
}