import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getAllSlugs,
  getPostBySlug,
  getAllPosts,
} from "../../lib/blog-data";
import BlogPostClient from "./_components/BlogPostClient";

// ─── Static Pre-rendering ───────────────────────────────────────
// Pre-render all blog posts at build time for instant TTFB.
export async function generateStaticParams() {
  const slugs = await getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

// ─── Dynamic SEO Metadata ───────────────────────────────────────
// Generates unique title, description, OG, Twitter, canonical, and
// keywords per blog post. Required to be in a Server Component.
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return { title: "Post Not Found" };
  }

  return {
    title: post.title,
    description: post.description,
    keywords: post.tags,
    authors: [{ name: post.author.name }],
    openGraph: {
      title: post.title,
      description: post.description,
      url: `https://webifyit.in/blog/${slug}`,
      type: "article",
      publishedTime: post.publishedDate,
      modifiedTime: post.updatedDate,
      authors: [post.author.name],
      tags: post.tags,
      siteName: "WebifyIt Engineering Studio",
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
    alternates: {
      canonical: `https://webifyit.in/blog/${slug}`,
    },
  };
}

// ─── Page Component (Server) ────────────────────────────────────
export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  // Resolve related posts
  const allPosts = await getAllPosts();
  const relatedPosts = post.relatedSlugs
    .map((rs) => allPosts.find((p) => p.slug === rs))
    .filter(Boolean) as typeof allPosts;

  // JSON-LD Article structured data for Google rich results
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    author: {
      "@type": "Person",
      name: post.author.name,
      jobTitle: post.author.role,
    },
    publisher: {
      "@type": "Organization",
      name: "WebifyIt Engineering Studio",
      url: "https://webifyit.in",
    },
    datePublished: post.publishedDate,
    dateModified: post.updatedDate || post.publishedDate,
    mainEntityOfPage: `https://webifyit.in/blog/${slug}`,
    keywords: post.tags.join(", "),
    articleSection: post.category,
    wordCount: post.content.join(" ").split(/\s+/).length,
    inLanguage: "en",
  };

  return (
    <>
      {/* Inject JSON-LD structured data into <head> */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BlogPostClient post={post} relatedPosts={relatedPosts} />
    </>
  );
}
