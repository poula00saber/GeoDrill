import { notFound } from "next/navigation";
import { getDirection, isLocale } from "@/geotech/lib/i18n";

export default async function GeotechnicalLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  return (
    <div lang={lang} dir={getDirection(lang)}>
      {children}
    </div>
  );
}
