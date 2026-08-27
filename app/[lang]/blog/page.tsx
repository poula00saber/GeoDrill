import { redirect } from "next/navigation";

export default async function BlogPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  redirect(`/contracting/${lang === "ar" ? "ar" : "en"}/blog`);
}
