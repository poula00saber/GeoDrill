import { notFound, permanentRedirect } from "next/navigation";
import { isLocale } from "@/geotech/lib/i18n";

export default async function FaqPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) {
    notFound();
  }

  permanentRedirect(`/contracting/${lang}/faq`);
}
