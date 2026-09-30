import { notFound, permanentRedirect } from "next/navigation";
import { isLocale } from "@/geotech/lib/i18n";

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  if (!isLocale(lang)) {
    notFound();
  }

  permanentRedirect(`/contracting/${lang}/blog/${slug}`);
}
