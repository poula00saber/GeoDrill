"use client";

import type { ContactFormInput, ContactFormResult } from "@/types/contact";

/**
 * Reusable client-side helper that POSTs the contact form to our API route.
 * Uses multipart/form-data so an optional file attachment can be sent along.
 * Centralises fetch + error handling so components stay clean and consistent.
 */
export async function submitContactForm(
  data: ContactFormInput,
  file?: File | null,
): Promise<ContactFormResult> {
  try {
    const formData = new FormData();
    formData.set("fullName", data.fullName);
    formData.set("entityType", data.entityType ?? "individual");
    formData.set("companyName", data.companyName ?? "");
    formData.set("email", data.email);
    formData.set("phone", data.phone);
    formData.set("projectDescription", data.projectDescription ?? "");
    if (file) {
      formData.set("attachment", file, file.name);
    }

    const response = await fetch("/api/contact", {
      method: "POST",
      // Do NOT set Content-Type manually — the browser adds the multipart
      // boundary automatically when sending FormData.
      body: formData,
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