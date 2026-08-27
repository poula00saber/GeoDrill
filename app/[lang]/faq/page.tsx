import { redirect } from "next/navigation";

export default async function FaqPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  redirect(`/contracting/${lang === "ar" ? "ar" : "en"}/faq`);
}
