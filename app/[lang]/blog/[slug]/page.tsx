import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, CalendarDays } from "lucide-react";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { getBlogPost } from "@/lib/blog";
import { sanityImage } from "@/lib/sanity";
import { type Lang } from "@/lib/content";

function pick(locale: Lang, ar?: string | null, en?: string | null) {
  return locale === "ar" && ar ? ar : (en ?? "");
}

function PortableText({
  blocks,
  locale,
}: {
  blocks?: unknown[] | null;
  locale: Lang;
}) {
  const paragraphs = (blocks ?? []).flatMap((block) => {
    if (!block || typeof block !== "object" || !("children" in block))
      return [];
    const children = (block as { children?: unknown[] }).children ?? [];
    const text = children
      .map((child) =>
        child && typeof child === "object" && "text" in child
          ? String((child as { text: unknown }).text)
          : "",
      )
      .join("");
    return text ? [text] : [];
  });
  return paragraphs.length ? (
    paragraphs.map((paragraph, index) => (
      <p
        key={`${paragraph}-${index}`}
        className="mb-6 text-lg leading-8 text-foreground/85"
      >
        {paragraph}
      </p>
    ))
  ) : (
    <p className="text-muted-foreground">
      {locale === "ar" ? "لا يوجد محتوى بعد." : "No article content yet."}
    </p>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  const locale: Lang = lang === "ar" ? "ar" : "en";
  const post = await getBlogPost(slug);
  return {
    title: post
      ? `${pick(locale, post.titleAr, post.title)} | GEODRILL`
      : "GEODRILL",
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  const locale: Lang = lang === "ar" ? "ar" : "en";
  const post = await getBlogPost(slug);
  if (!post?.slug?.current) notFound();
  const title = pick(locale, post.titleAr, post.title);
  const image = post.coverImage
    ? sanityImage(post.coverImage)?.width(1600).format("jpg").url()
    : null;
  const body = locale === "ar" && post.bodyAr?.length ? post.bodyAr : post.body;

  return (
    <>
      <Navbar />
      <main
        className="min-h-svh bg-background text-foreground"
        dir={locale === "ar" ? "rtl" : "ltr"}
      >
        <header className="relative flex min-h-[45vh] items-center justify-center overflow-hidden bg-navy px-6 py-32 text-center text-white">
          {image && (
            <Image
              src={image}
              alt={title}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-navy/95 via-navy/60 to-navy/50" />
          <div className="relative z-10 max-w-4xl">
            <Link
              href={`/${locale}/blog`}
              className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-teal hover:text-white"
            >
              <ArrowLeft className="size-4 rtl:rotate-180" />
              {locale === "ar" ? "العودة إلى المدونة" : "Back to blog"}
            </Link>
            <h1 className="text-balance text-3xl font-extrabold leading-tight md:text-5xl">
              {title}
            </h1>
          </div>
        </header>
        <article className="mx-auto max-w-3xl px-6 py-12 md:py-20">
          <div className="mb-10 flex items-center gap-2 text-sm text-muted-foreground">
            <CalendarDays className="size-4 text-teal" />
            {post.publishedAt
              ? new Date(post.publishedAt).toLocaleDateString(
                  locale === "ar" ? "ar-SA" : "en-US",
                  { year: "numeric", month: "long", day: "numeric" },
                )
              : locale === "ar"
                ? "حديثًا"
                : "Recently"}
          </div>
          <PortableText blocks={body} locale={locale} />
        </article>
        <Footer />
      </main>
    </>
  );
}
