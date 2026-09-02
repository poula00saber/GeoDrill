"use client";

import { Phone } from "lucide-react";
import { useLanguage } from "@/geotech/components/providers/language-provider";

export function GeotechContactButton() {
  const { locale } = useLanguage();

  // You can update this number later
  const phoneNumber = "+966"; // Placeholder - update with actual number

  return (
    <a
      href={`tel:${phoneNumber}`}
      aria-label="Contact via phone"
      className="fixed bottom-6 end-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-[0_8px_30px_rgba(212,212,16,0.3)] transition-all duration-300 hover:scale-110 hover:shadow-[0_12px_40px_rgba(212,212,16,0.5)] active:scale-95"
    >
      <Phone className="h-6 w-6" />
    </a>
  );
}
