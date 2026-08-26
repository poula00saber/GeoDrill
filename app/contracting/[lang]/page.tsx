import { ContractingSite } from "@/components/contracting-site";

/**
 * Branded route for the General Contracting Division site.
 * Serves the same bilingual content as the legacy `/[lang]` route.
 *   /contracting/en  and  /contracting/ar
 */
export default async function Page({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale = lang === "ar" ? "ar" : "en";

  return <ContractingSite locale={locale} />;
}