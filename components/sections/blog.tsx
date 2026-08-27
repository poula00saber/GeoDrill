import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, CalendarDays } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { getBlogPosts, type BlogPost } from "@/lib/blog";
import { sanityImage } from "@/lib/sanity";
import { SECTION_IDS, content, type Lang } from "@/lib/content";

function pick(locale: Lang, ar?: string | null, en?: string | null) {
  return locale === "ar" && ar ? ar : (en ?? "");
}

export async function Blog({ locale }: { locale: Lang }) {
  const copy = content[locale].blog;
  const posts = (await getBlogPosts()).slice(0, 3);

  return (
    <section id={SECTION_IDS.blog} className="bg-background py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          kicker={copy.kicker}
          title={copy.title}
          sub={copy.sub}
          align="center"
        />
        {posts.length === 0 ? (
          <p className="mt-14 text-center text-muted-foreground">
            {copy.empty}
          </p>
        ) : (
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {posts.map((post) => (
              <BlogCard key={post._id} post={post} locale={locale} />
            ))}
          </div>
        )}
        <div className="mt-10 text-center">
          <Link
            href={`/contracting/${locale}/blog`}
            className="group inline-flex items-center gap-2 rounded-lg border-2 border-teal px-5 py-3 text-sm font-bold text-teal transition hover:bg-teal hover:text-navy"
          >
            {copy.viewAll}
            <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 rtl:-scale-x-100" />
          </Link>
        </div>
      </div>
    </section>
  );
}

export function BlogCard({ post, locale }: { post: BlogPost; locale: Lang }) {
  const title = pick(locale, post.titleAr, post.title);
  const image = post.coverImage
    ? sanityImage(post.coverImage)?.width(900).format("jpg").url()
    : null;
  const date = post.publishedAt ? new Date(post.publishedAt) : null;

  return (
    <Link
      href={`/contracting/${locale}/blog/${post.slug?.current}`}
      className="group relative block h-80 overflow-hidden rounded-2xl bg-navy"
    >
      {image ? (
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy to-teal/40" />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-navy/95 via-navy/50 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-6">
        <span className="inline-flex rounded-md bg-teal/20 px-2.5 py-1 text-xs font-semibold text-teal backdrop-blur-md">
          {locale === "ar" ? "مقال" : "Insight"}
        </span>
        <h3 className="mt-3 line-clamp-2 text-lg font-bold text-white">
          {title}
        </h3>
        <div className="mt-4 flex items-center gap-2 text-xs text-white/70">
          <CalendarDays className="size-3.5" />
          <span>
            {date
              ? date.toLocaleDateString(locale === "ar" ? "ar-SA" : "en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })
              : locale === "ar"
                ? "حديثًا"
                : "Recently"}
          </span>
        </div>
      </div>
    </Link>
  );
}
