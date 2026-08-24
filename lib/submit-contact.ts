"use client";

import type { ContactFormInput, ContactFormResult } from "@/types/contact";

/**
 * Reusable client-side helper that POSTs the contact form to our API route.
 * Centralises fetch + error handling so components stay clean and consistent.
 */
export async function submitContactForm(
  data: ContactFormInput,
): Promise<ContactFormResult> {
  try {
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const body = (await response.json().catch(() => null)) as
      | (Partial<ContactFormResult> & { message?: string })
      | null;

    if (!response.ok) {
      return {
        ok: false,
        message:
          body?.message ??
          "Something went wrong. Please try again or contact us directly.",
      };
    }

    return { ok: true, message: body?.message ?? "Message sent." };
  } catch {
    return {
      ok: false,
      message:
        "Network error. Please check your connection and try again in a moment.",
    };
  }
}