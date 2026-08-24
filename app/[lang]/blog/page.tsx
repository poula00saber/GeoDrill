import type { Metadata } from "next";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { BlogCard } from "@/components/sections/blog";
import { getBlogPosts } from "@/lib/blog";
import { content, type Lang } from "@/lib/content";

export function generateStaticParams() {
  return ["en", "ar"].map((lang) => ({ lang }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const locale: Lang = (await params).lang === "ar" ? "ar" : "en";
  return {
    title: `${content[locale].blog.title} | GEODRILL`,
    description: content[locale].blog.sub,
  };
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const locale: Lang = (await params).lang === "ar" ? "ar" : "en";
  const posts = await getBlogPosts();
  const copy = content[locale].blog;

  return (
    <>
      <Navbar />
      <main
        className="min-h-svh bg-background pt-28 text-foreground md:pt-36"
        dir={locale === "ar" ? "rtl" : "ltr"}
      >
        <section className="mx-auto max-w-7xl px-6 pb-14 text-center md:pb-20">
          <span className="text-sm font-semibold uppercase tracking-[0.25em] text-teal">
            {copy.kicker}
          </span>
          <h1 className="mt-4 text-balance text-4xl font-extrabold tracking-tight md:text-6xl">
            {copy.title}
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
            {copy.sub}
          </p>
        </section>
        <section className="mx-auto max-w-7xl px-6 pb-24">
          {posts.length ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <BlogCard key={post._id} post={post} locale={locale} />
              ))}
            </div>
          ) : (
            <p className="py-16 text-center text-muted-foreground">
              {copy.empty}
            </p>
          )}
        </section>
        <Footer />
      </main>
    </>
  );
}
