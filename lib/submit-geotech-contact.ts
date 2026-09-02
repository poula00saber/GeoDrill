"use client";

/**
 * Reusable client-side helper that POSTs the geotech contact form to
 * /api/geotech-contact. Centralises fetch + error handling so the contact
 * section stays clean and consistent with the construction site flow.
 */

export interface GeotechContactPayload {
  fullName: string;
  company?: string;
  email: string;
  phone?: string;
  projectType?: string;
  requiredService?: string;
  projectLocation?: string;
  projectDescription: string;
}

export interface GeotechContactResult {
  ok: boolean;
  message: string;
}

export async function submitGeotechContact(
  data: GeotechContactPayload,
): Promise<GeotechContactResult> {
  try {
    const response = await fetch("/api/geotech-contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const body = (await response.json().catch(() => null)) as
      | (Partial<GeotechContactResult> & { message?: string })
      | null;

    if (!response.ok) {
      return {
        ok: false,
        message:
          body?.message ??
          "Something went wrong. Please try again or contact us directly.",
      };
    }

    return {
      ok: true,
      message: body?.message ?? "Consultation request sent.",
    };
  } catch {
    return {
      ok: false,
      message:
        "Network error. Please check your connection and try again in a moment.",
    };
  }
}