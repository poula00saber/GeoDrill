import { notFound } from 'next/navigation';
import { GeotechHome } from '@/app/geotechnical/page';
import { isLocale, locales } from '@/geotech/lib/i18n';

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export default async function GeotechnicalLocalePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  return <GeotechHome />;
}
