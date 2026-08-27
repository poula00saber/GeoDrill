import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowUpRight,
  CalendarDays,
  Clock3,
  Newspaper,
} from "lucide-react";
import { notFound } from "next/navigation";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { getBlogPost, getBlogPosts, type BlogPost } from "@/lib/blog";
import { sanityImage } from "@/lib/sanity";
import { content, type Lang } from "@/lib/content";

function pick(locale: Lang, ar?: string | null, en?: string | null) {
  return locale === "ar" && ar ? ar : (en ?? "");
}

function formatDate(date: string | null | undefined, locale: Lang) {
  return date
    ? new Date(date).toLocaleDateString(locale === "ar" ? "ar-SA" : "en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : locale === "ar"
      ? "حديثًا"
      : "Recently";
}

// Real reading-time estimate from the actual portable-text body, not a
// placeholder. ~200 wpm (~180 for Arabic, denser script) is the standard
// approximation used for this kind of block content.
function estimateReadMinutes(blocks?: unknown[] | null, locale: Lang = "en") {
  const text = (blocks ?? [])
    .flatMap((block) => {
      if (!block || typeof block !== "object" || !("children" in block))
        return [];
      const children = (block as { children?: unknown[] }).children ?? [];
      return children.map((child) =>
        child && typeof child === "object" && "text" in child
          ? String((child as { text: unknown }).text)
          : "",
      );
    })
    .join(" ");
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  const wpm = locale === "ar" ? 180 : 200;
  return Math.max(1, Math.round(words / wpm));
}

function BrandBackdrop() {
  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden>
      <div className="absolute -end-32 -top-40 size-[32rem] rounded-full bg-teal/10 blur-3xl" />
      <div className="absolute -start-24 bottom-0 size-64 rounded-full bg-amber-400/10 blur-3xl" />
      <div
        className="absolute inset-0 opacity-[0.035] dark:opacity-[0.05]"
        style={{
          backgroundImage:
            "radial-gradient(currentColor 1px, transparent 1px), radial-gradient(currentColor 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
    </div>
  );
}

export async function BlogIndexPage({ locale }: { locale: Lang }) {
  const posts = await getBlogPosts();
  const copy = content[locale].blog;
  const featured = posts[0];
  const remaining = posts.slice(1);
  const isAr = locale === "ar";

  return (
    <>
      <Navbar />
      <main
        className="min-h-svh bg-background text-foreground"
        dir={isAr ? "rtl" : "ltr"}
      >
        <section className="relative overflow-hidden border-b border-border/60 px-6 pb-16 pt-32 md:pb-24 md:pt-40">
          <BrandBackdrop />
          <div className="relative mx-auto max-w-7xl">
            <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.25em] text-teal">
              <span className="h-px w-10 bg-teal" />
              {copy.kicker}
            </div>
            <h1 className="mt-5 max-w-4xl text-balance text-5xl font-extrabold leading-[0.98] tracking-tight md:text-7xl">
              {copy.title}
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
              {copy.sub}
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-14 md:py-20">
          {featured ? (
            <FeaturedPost post={featured} locale={locale} />
          ) : (
            <EmptyState locale={locale} message={copy.empty} />
          )}

          {remaining.length > 0 && (
            <div className="mt-16">
              <div className="mb-7 flex items-end justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="h-px w-8 bg-teal" aria-hidden />
                  <h2 className="text-2xl font-bold md:text-3xl">
                    {isAr ? "كل المقالات" : "More from GEODRILL"}
                  </h2>
                </div>
                <span className="font-mono text-xs text-muted-foreground">
                  {String(posts.length).padStart(2, "0")} / INSIGHTS
                </span>
              </div>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {remaining.map((post) => (
                  <BlogCard key={post._id} post={post} locale={locale} />
                ))}
              </div>
            </div>
          )}
        </section>
        <Footer />
      </main>
    </>
  );
}

// Full-bleed cinematic treatment (matches the Hero/FAQ brand language) with
// the read/date/title overlaid directly on the image, instead of a split
// card with a mostly-empty text panel next to it.
function FeaturedPost({ post, locale }: { post: BlogPost; locale: Lang }) {
  const isAr = locale === "ar";
  const title = pick(locale, post.titleAr, post.title);
  const excerpt = pick(locale, post.excerptAr, post.excerpt);
  const image = post.coverImage
    ? sanityImage(post.coverImage)?.width(1600).format("jpg").url()
    : null;
  const readMins = estimateReadMinutes(
    isAr && post.bodyAr?.length ? post.bodyAr : post.body,
    locale,
  );

  return (
    <Link
      href={`/contracting/${locale}/blog/${post.slug?.current}`}
      className="group relative block h-[26rem] overflow-hidden rounded-3xl border border-border/70 bg-navy shadow-xl shadow-navy/10 md:h-[32rem]"
    >
      {image ? (
        <Image
          src={image}
          alt={title}
          fill
          priority
          sizes="100vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
      ) : (
        <div
          className="absolute inset-0 bg-gradient-to-br from-navy via-navy to-teal/40 opacity-[0.15]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(19,181,176,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(19,181,176,.5) 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/50 to-navy/10" />

      <span className="absolute start-7 top-7 inline-flex items-center gap-1.5 rounded-full border border-teal/40 bg-navy/60 px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-teal backdrop-blur-md">
        {isAr ? "أحدث مقال" : "Latest Insight"}
      </span>

      <div className="absolute inset-x-0 bottom-0 p-7 text-white md:p-10">
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-white/70">
          <span className="flex items-center gap-1.5">
            <CalendarDays className="size-3.5 text-teal" />
            {formatDate(post.publishedAt, locale)}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock3 className="size-3.5 text-teal" />
            {isAr ? `${readMins} دقائق قراءة` : `${readMins} min read`}
          </span>
        </div>
        <h2 className="mt-4 max-w-3xl text-balance text-3xl font-extrabold leading-tight md:text-5xl">
          {title}
        </h2>
        {excerpt && (
          <p className="mt-4 line-clamp-2 max-w-2xl text-sm leading-relaxed text-white/75 md:text-base">
            {excerpt}
          </p>
        )}
        <span className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-teal">
          {isAr ? "اقرأ المقال" : "Read article"}
          <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 rtl:-scale-x-100" />
        </span>
      </div>
    </Link>
  );
}

export function BlogCard({ post, locale }: { post: BlogPost; locale: Lang }) {
  const isAr = locale === "ar";
  const title = pick(locale, post.titleAr, post.title);
  const image = post.coverImage
    ? sanityImage(post.coverImage)?.width(900).format("jpg").url()
    : null;
  const readMins = estimateReadMinutes(
    isAr && post.bodyAr?.length ? post.bodyAr : post.body,
    locale,
  );

  return (
    <Link
      href={`/contracting/${locale}/blog/${post.slug?.current}`}
      className="group relative block overflow-hidden rounded-2xl border border-border/70 bg-card/60 transition-all duration-500 hover:-translate-y-1 hover:border-teal/50 hover:shadow-xl hover:shadow-teal/10"
    >
      {/* Brand accent tick, consistent with the client-logo tiles elsewhere on the site */}
      <span
        className="absolute inset-x-0 top-0 z-10 h-[3px] w-0 bg-teal transition-all duration-500 group-hover:w-full"
        aria-hidden
      />

      <div className="relative h-56 overflow-hidden bg-navy">
        {image ? (
          <Image
            src={image}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy to-teal/40" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-navy/80 to-transparent" />
        <span className="absolute start-5 top-5 rounded-full border border-white/15 bg-navy/60 px-3 py-1 text-xs font-bold text-teal backdrop-blur-md">
          {isAr ? "مقال" : "Insight"}
        </span>
      </div>
      <div className="p-6">
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <CalendarDays className="size-3.5 text-teal" />
            {formatDate(post.publishedAt, locale)}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock3 className="size-3.5 text-teal" />
            {isAr ? `${readMins} د` : `${readMins} min`}
          </span>
        </div>
        <h3 className="mt-3 line-clamp-2 text-xl font-bold leading-snug transition-colors group-hover:text-teal">
          {title}
        </h3>
        <span className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-teal">
          {isAr ? "اقرأ المزيد" : "Read more"}
          <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 rtl:-scale-x-100" />
        </span>
      </div>
    </Link>
  );
}

function EmptyState({ locale, message }: { locale: Lang; message: string }) {
  return (
    <div className="flex flex-col items-center gap-4 rounded-3xl border border-dashed border-border py-24 text-center">
      <span className="flex size-14 items-center justify-center rounded-full bg-teal/10 text-teal">
        <Newspaper className="size-6" strokeWidth={1.75} />
      </span>
      <p className="max-w-sm text-muted-foreground">{message}</p>
    </div>
  );
}

/**
 * Upgraded from plain-paragraphs-only to handle the block types Sanity's
 * portable text actually produces: headings (h2-h4), block quotes, bulleted
 * and numbered lists, and inline marks (bold/italic/links). The previous
 * version silently flattened all of this to <p> tags — any heading, list, or
 * bold text in the CMS content was being dropped, not just unstyled.
 */
function renderMarks(text: string, marks: string[] = [], markDefs: any[] = []) {
  let node: React.ReactNode = text;
  for (const mark of marks) {
    const linkDef = markDefs?.find(
      (d) => d._key === mark && d._type === "link",
    );
    if (linkDef?.href) {
      node = (
        <a
          key={mark}
          href={linkDef.href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-teal underline underline-offset-2 hover:text-teal-dark"
        >
          {node}
        </a>
      );
    } else if (mark === "strong") {
      node = <strong className="font-bold text-foreground">{node}</strong>;
    } else if (mark === "em") {
      node = <em className="italic">{node}</em>;
    }
  }
  return node;
}

function PortableText({
  blocks,
  locale,
}: {
  blocks?: unknown[] | null;
  locale: Lang;
}) {
  const items = (blocks ?? []) as any[];
  if (!items.length) {
    return (
      <p className="text-muted-foreground">
        {locale === "ar" ? "لا يوجد محتوى بعد." : "No article content yet."}
      </p>
    );
  }

  const elements: React.ReactNode[] = [];
  let listBuffer: {
    items: React.ReactNode[];
    type: "bullet" | "number";
  } | null = null;

  const flushList = (key: string) => {
    if (!listBuffer) return;
    const Tag = listBuffer.type === "number" ? "ol" : "ul";
    elements.push(
      <Tag
        key={key}
        className={
          listBuffer.type === "number"
            ? "mb-7 list-decimal ps-6 space-y-2"
            : "mb-7 list-disc ps-6 space-y-2"
        }
      >
        {listBuffer.items}
      </Tag>,
    );
    listBuffer = null;
  };

  items.forEach((block, index) => {
    if (!block || typeof block !== "object" || !("children" in block)) return;
    const { style, listItem, children, markDefs } = block as {
      style?: string;
      listItem?: "bullet" | "number";
      children?: any[];
      markDefs?: any[];
    };

    const content = (children ?? []).map((child, i) =>
      child && typeof child === "object" && "text" in child ? (
        <span key={i}>
          {renderMarks(String(child.text), child.marks, markDefs)}
        </span>
      ) : null,
    );

    if (listItem) {
      if (!listBuffer || listBuffer.type !== listItem) {
        flushList(`list-${index}`);
        listBuffer = { items: [], type: listItem };
      }
      listBuffer.items.push(
        <li key={index} className="leading-8 text-foreground/85">
          {content}
        </li>,
      );
      return;
    }
    flushList(`list-${index}`);

    if (style === "h2") {
      elements.push(
        <h2
          key={index}
          className="mb-5 mt-10 text-2xl font-extrabold tracking-tight text-foreground first:mt-0"
        >
          {content}
        </h2>,
      );
    } else if (style === "h3") {
      elements.push(
        <h3 key={index} className="mb-4 mt-8 text-xl font-bold text-foreground">
          {content}
        </h3>,
      );
    } else if (style === "h4") {
      elements.push(
        <h4 key={index} className="mb-3 mt-6 text-lg font-bold text-foreground">
          {content}
        </h4>,
      );
    } else if (style === "blockquote") {
      elements.push(
        <blockquote
          key={index}
          className="mb-7 border-s-4 border-teal bg-teal/5 py-3 ps-5 text-lg italic leading-8 text-foreground/80"
        >
          {content}
        </blockquote>,
      );
    } else {
      elements.push(
        <p key={index} className="mb-7 text-lg leading-9 text-foreground/85">
          {content}
        </p>,
      );
    }
  });
  flushList("list-end");

  return <>{elements}</>;
}

export async function BlogPostPage({
  locale,
  slug,
}: {
  locale: Lang;
  slug: string;
}) {
  const post = await getBlogPost(slug);
  if (!post?.slug?.current) notFound();
  const isAr = locale === "ar";
  const title = pick(locale, post.titleAr, post.title);
  const image = post.coverImage
    ? sanityImage(post.coverImage)?.width(1600).format("jpg").url()
    : null;
  const body = isAr && post.bodyAr?.length ? post.bodyAr : post.body;
  const readMins = estimateReadMinutes(body, locale);

  return (
    <>
      <Navbar />
      <main
        className="min-h-svh bg-background text-foreground"
        dir={isAr ? "rtl" : "ltr"}
      >
        <header className="relative flex min-h-[58vh] items-end overflow-hidden bg-navy px-6 pb-14 pt-32 text-white md:pb-20">
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
          <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/65 to-navy/25" />
          <div className="relative z-10 mx-auto w-full max-w-5xl">
            <Link
              href={`/contracting/${locale}/blog`}
              className="mb-10 inline-flex items-center gap-2 text-sm font-bold text-teal transition-colors hover:text-white"
            >
              <ArrowLeft className="size-4 rtl:rotate-180" />
              {isAr ? "العودة إلى المدونة" : "Back to journal"}
            </Link>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-white/65">
              <CalendarDays className="size-4 text-teal" />
              {formatDate(post.publishedAt, locale)}
              <span className="mx-1 text-white/30">/</span>
              <Clock3 className="size-4 text-teal" />
              {isAr ? `${readMins} دقائق قراءة` : `${readMins} min read`}
            </div>
            <h1 className="mt-5 max-w-4xl text-balance text-4xl font-extrabold leading-tight md:text-6xl">
              {title}
            </h1>
          </div>
        </header>
        <article className="mx-auto max-w-3xl px-6 py-14 md:py-24">
          <PortableText blocks={body} locale={locale} />
        </article>
        <Footer />
      </main>
    </>
  );
}

export function blogMetadata(locale: Lang, post?: BlogPost | null): Metadata {
  return {
    title: post
      ? `${pick(locale, post.titleAr, post.title)} | GEODRILL`
      : `${content[locale].blog.title} | GEODRILL`,
    description: post
      ? pick(locale, post.excerptAr, post.excerpt)
      : content[locale].blog.sub,
  };
}
