import { redirect } from "next/navigation";

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  redirect(`/contracting/${lang === "ar" ? "ar" : "en"}/blog/${slug}`);
}
