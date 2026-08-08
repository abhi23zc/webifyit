/**
 * Blog Content Database — Single source of truth for all blog articles.
 *
 * Used by:
 *  - Server Components for SEO metadata (generateMetadata)
 *  - generateStaticParams for static pre-rendering
 *  - sitemap.ts for URL generation
 *  - BlogIndexClient / BlogPostClient for rendering
 */

export interface BlogAuthor {
  name: string;
  role: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  description: string; // Meta description — max 160 chars
  category: string;
  tags: string[];
  author: BlogAuthor;
  publishedDate: string; // ISO 8601
  updatedDate?: string; // ISO 8601
  readTime: string;
  coverImageAlt: string;
  content: string[]; // Paragraph array (body content)
  techTakeaways: string[];
  relatedSlugs: string[];
}

import { supabase } from "./supabase";

export interface BlogAuthor {
  name: string;
  role: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  author: BlogAuthor; // We'll map author_name and author_role to this
  publishedDate: string; // from published_date
  updatedDate?: string; // from updated_date
  readTime: string; // from read_time
  coverImageAlt: string; // from cover_image_alt
  content: string[];
  techTakeaways: string[]; // from tech_takeaways
  relatedSlugs: string[]; // from related_slugs
}

/** Maps a Supabase DB row to our frontend BlogPost interface */
function mapRowToPost(row: any): BlogPost {
  return {
    slug: row.slug,
    title: row.title,
    description: row.description,
    category: row.category,
    tags: row.tags || [],
    author: {
      name: row.author_name,
      role: row.author_role,
    },
    publishedDate: row.published_date,
    updatedDate: row.updated_date,
    readTime: row.read_time,
    coverImageAlt: row.cover_image_alt || "",
    content: row.content || [],
    techTakeaways: row.tech_takeaways || [],
    relatedSlugs: row.related_slugs || [],
  };
}

// ─── Public API ─────────────────────────────────────────────────

/** Returns all blog posts sorted by publishedDate descending (newest first). */
export async function getAllPosts(): Promise<BlogPost[]> {
  try {
    const { data, error } = await supabase
      .from("blogs")
      .select("*")
      .order("published_date", { ascending: false });

    if (error) throw error;
    if (!data) return [];

    return data.map(mapRowToPost);
  } catch (error) {
    console.error("Error fetching all posts:", error);
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

/** Returns all slugs — used by generateStaticParams. */
export async function getAllSlugs(): Promise<string[]> {
  try {
    const { data, error } = await supabase.from("blogs").select("slug");
    if (error || !data) return [];
    return data.map((row) => row.slug);
  } catch (error) {
    console.error("Error fetching all slugs:", error);
    return [];
  }
}

/** Returns all unique categories. */
export async function getAllCategories(): Promise<string[]> {
  try {
    const { data, error } = await supabase.from("blogs").select("category");
    if (error || !data) return [];
    const categories = data.map((row) => row.category);
    return [...new Set(categories)];
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}
