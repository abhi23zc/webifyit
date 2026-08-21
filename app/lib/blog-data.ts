/**
 * Blog Data Layer — Single source of truth for all blog operations.
 *
 * Used by:
 *  - Server Components for SEO metadata (generateMetadata)
 *  - generateStaticParams for static pre-rendering
 *  - sitemap.ts for URL generation
 *  - BlogIndexClient / BlogPostClient for rendering
 *
 * Content Format:
 *  - New posts use `content_markdown` (single markdown string)
 *  - Legacy posts fall back to `content` (paragraph array)
 */

import { supabase } from "./supabase";

// ─── Types ──────────────────────────────────────────────────────

export interface BlogAuthor {
  name: string;
  role: string;
}

export type BlogStatus = "draft" | "published" | "scheduled";

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  author: BlogAuthor;
  publishedDate: string;
  updatedDate?: string;
  readTime: string;
  coverImageUrl?: string;
  coverImageAlt: string;
  contentMarkdown: string; // Primary: full markdown content
  content: string[]; // Legacy: paragraph array (for old posts)
  techTakeaways: string[];
  relatedSlugs: string[];
  status: BlogStatus;
  scheduledDate?: string;
  excerpt?: string;
  wordCount: number;
}

// ─── Helpers ────────────────────────────────────────────────────

/** Estimate read time from word count (avg 230 wpm for technical content) */
export function calculateReadTime(wordCount: number): string {
  const minutes = Math.max(1, Math.ceil(wordCount / 230));
  return `${minutes} min read`;
}

/** Count words in a markdown string (strips markdown syntax for accuracy) */
export function countWords(markdown: string): number {
  if (!markdown) return 0;
  // Strip common markdown syntax for accurate word count
  const stripped = markdown
    .replace(/```[\s\S]*?```/g, " ") // code blocks
    .replace(/`[^`]*`/g, " ") // inline code
    .replace(/!\[.*?\]\(.*?\)/g, " ") // images
    .replace(/\[([^\]]*)\]\(.*?\)/g, "$1") // links → keep text
    .replace(/#{1,6}\s/g, "") // headings
    .replace(/[*_~`>|-]/g, "") // formatting chars
    .replace(/\n+/g, " ")
    .trim();
  if (!stripped) return 0;
  return stripped.split(/\s+/).filter(Boolean).length;
}

/** Generate excerpt from markdown (first ~160 chars of prose) */
export function generateExcerpt(markdown: string, maxLength = 160): string {
  if (!markdown) return "";
  const stripped = markdown
    .replace(/```[\s\S]*?```/g, "")
    .replace(/`[^`]*`/g, "")
    .replace(/!\[.*?\]\(.*?\)/g, "")
    .replace(/\[([^\]]*)\]\(.*?\)/g, "$1")
    .replace(/#{1,6}\s/g, "")
    .replace(/[*_~`>|-]/g, "")
    .replace(/\n+/g, " ")
    .trim();
  if (stripped.length <= maxLength) return stripped;
  return stripped.slice(0, maxLength).replace(/\s\S*$/, "") + "…";
}

/** Maps a Supabase DB row to our frontend BlogPost interface */
function mapRowToPost(row: Record<string, unknown>): BlogPost {
  const contentArray = (row.content as string[] | null) || [];
  const contentMarkdown = (row.content_markdown as string) || "";
  const wordCount =
    (row.word_count as number) ||
    (contentMarkdown
      ? countWords(contentMarkdown)
      : contentArray.join(" ").split(/\s+/).length);

  return {
    slug: row.slug as string,
    title: row.title as string,
    description: row.description as string,
    category: row.category as string,
    tags: (row.tags as string[]) || [],
    author: {
      name: row.author_name as string,
      role: row.author_role as string,
    },
    publishedDate: row.published_date as string,
    updatedDate: (row.updated_date as string) || undefined,
    readTime:
      (row.read_time as string) || calculateReadTime(wordCount),
    coverImageUrl: (row.cover_image_url as string) || undefined,
    coverImageAlt: (row.cover_image_alt as string) || "",
    contentMarkdown,
    content: contentArray,
    techTakeaways: (row.tech_takeaways as string[]) || [],
    relatedSlugs: (row.related_slugs as string[]) || [],
    status: (row.status as BlogStatus) || "published",
    scheduledDate: (row.scheduled_date as string) || undefined,
    excerpt:
      (row.excerpt as string) ||
      (contentMarkdown ? generateExcerpt(contentMarkdown) : ""),
    wordCount,
  };
}

// ─── Public API ─────────────────────────────────────────────────

/** Returns all published blog posts sorted by publishedDate descending. */
export async function getAllPosts(): Promise<BlogPost[]> {
  try {
    const { data, error } = await supabase
      .from("blogs")
      .select("*")
      .eq("status", "published")
      .order("published_date", { ascending: false });

    if (error) throw error;
    if (!data) return [];

    return data.map(mapRowToPost);
  } catch (error) {
    console.error("Error fetching all posts:", error);
    // Fallback: try without status filter for backward compatibility
    try {
      const { data } = await supabase
        .from("blogs")
        .select("*")
        .order("published_date", { ascending: false });
      if (data) return data.map(mapRowToPost);
    } catch {
      // Silent fallback failure
    }
    return [];
  }
}

/** Returns ALL posts including drafts (for admin). */
export async function getAllPostsAdmin(): Promise<BlogPost[]> {
  try {
    const { data, error } = await supabase
      .from("blogs")
      .select("*")
      .order("published_date", { ascending: false });

    if (error) throw error;
    if (!data) return [];

    return data.map(mapRowToPost);
  } catch (error) {
    console.error("Error fetching admin posts:", error);
    return [];
  }
}

/** Returns a single blog post by slug, or null if not found. */
export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const { data, error } = await supabase
      .from("blogs")
      .select("*")
      .eq("slug", slug)
      .single();

    if (error || !data) return null;
    return mapRowToPost(data);
  } catch (error) {
    console.error("Error fetching post by slug:", error);
    return null;
  }
}

/** Returns all slugs for published posts — used by generateStaticParams. */
export async function getAllSlugs(): Promise<string[]> {
  try {
    const { data, error } = await supabase
      .from("blogs")
      .select("slug, status")
      .eq("status", "published");

    if (error || !data) {
      // Fallback without status filter
      const fallback = await supabase.from("blogs").select("slug");
      return fallback.data?.map((row) => row.slug) || [];
    }
    return data.map((row) => row.slug);
  } catch (error) {
    console.error("Error fetching all slugs:", error);
    return [];
  }
}

/** Returns all unique categories from published posts. */
export async function getAllCategories(): Promise<string[]> {
  try {
    const { data, error } = await supabase
      .from("blogs")
      .select("category, status")
      .eq("status", "published");

    if (error || !data) {
      // Fallback without status filter
      const fallback = await supabase.from("blogs").select("category");
      const cats = fallback.data?.map((row) => row.category) || [];
      return [...new Set(cats)];
    }
    const categories = data.map((row) => row.category);
    return [...new Set(categories)];
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}

/** Returns paginated posts with total count. */
export async function getPaginatedPosts(
  page: number = 1,
  perPage: number = 12
): Promise<{ posts: BlogPost[]; total: number }> {
  try {
    const from = (page - 1) * perPage;
    const to = from + perPage - 1;

    const { data, error, count } = await supabase
      .from("blogs")
      .select("*", { count: "exact" })
      .eq("status", "published")
      .order("published_date", { ascending: false })
      .range(from, to);

    if (error) throw error;

    return {
      posts: (data || []).map(mapRowToPost),
      total: count || 0,
    };
  } catch (error) {
    console.error("Error fetching paginated posts:", error);
    return { posts: [], total: 0 };
  }
}
