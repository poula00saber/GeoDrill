"use client";

/**
 * Reusable client-side helper that POSTs the geotech contact form to
 * /api/geotech-contact. Uses multipart/form-data so an optional file
 * attachment (PDF / DWG / DXF / image / Word) can be sent along, mirroring
 * the construction site flow.
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
  file?: File | null,
): Promise<GeotechContactResult> {
  try {
    const formData = new FormData();
    formData.set("fullName", data.fullName);
    formData.set("company", data.company ?? "");
    formData.set("email", data.email);
    formData.set("phone", data.phone ?? "");
    formData.set("projectType", data.projectType ?? "");
    formData.set("requiredService", data.requiredService ?? "");
    formData.set("projectLocation", data.projectLocation ?? "");
    formData.set("projectDescription", data.projectDescription ?? "");
    if (file) {
      formData.set("attachment", file, file.name);
    }

    const response = await fetch("/api/geotech-contact", {
      method: "POST",
      // Do NOT set Content-Type manually — the browser adds the multipart
      // boundary automatically when sending FormData.
      body: formData,
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