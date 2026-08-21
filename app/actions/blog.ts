"use server";

import { revalidatePath } from "next/cache";
import { supabase } from "../lib/supabase";
import {
  countWords,
  calculateReadTime,
  generateExcerpt,
} from "../lib/blog-data";

// ─── Types ──────────────────────────────────────────────────────

export interface BlogInput {
  slug: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  author_name: string;
  author_role: string;
  cover_image_url?: string;
  cover_image_alt?: string;
  content_markdown: string;
  content?: string[]; // Legacy field, kept for backward compat
  tech_takeaways: string[];
  related_slugs: string[];
  status: "draft" | "published" | "scheduled";
  scheduled_date?: string;
}

export type ActionResult = {
  success: boolean;
  error?: string;
};

// ─── Actions ────────────────────────────────────────────────────

export async function createPost(data: BlogInput): Promise<ActionResult> {
  try {
    const wordCount = countWords(data.content_markdown);
    const readTime = calculateReadTime(wordCount);
    const excerpt = generateExcerpt(data.content_markdown);

    const row = {
      slug: data.slug,
      title: data.title,
      description: data.description,
      category: data.category,
      tags: data.tags,
      author_name: data.author_name,
      author_role: data.author_role,
      cover_image_url: data.cover_image_url || null,
      cover_image_alt: data.cover_image_alt || null,
      content_markdown: data.content_markdown,
      content: data.content || [], // Legacy compat
      tech_takeaways: data.tech_takeaways,
      related_slugs: data.related_slugs,
      status: data.status,
      scheduled_date: data.scheduled_date || null,
      read_time: readTime,
      word_count: wordCount,
      excerpt,
      published_date:
        data.status === "published" ? new Date().toISOString() : null,
    };

    const { error } = await supabase.from("blogs").insert([row]);

    if (error) {
      console.error("Error creating post:", error);
      return { success: false, error: error.message };
    }

    if (data.status === "published") {
      revalidatePath("/blog");
      revalidatePath("/sitemap.xml");
    }

    return { success: true };
  } catch (err) {
    console.error("Unexpected error creating post:", err);
    return {
      success: false,
      error: err instanceof Error ? err.message : "Unknown error",
    };
  }
}

export async function updatePost(
  slug: string,
  data: Partial<BlogInput>
): Promise<ActionResult> {
  try {
    const updates: Record<string, unknown> = {
      updated_date: new Date().toISOString(),
    };

    // Map input fields to DB columns
    if (data.title !== undefined) updates.title = data.title;
    if (data.description !== undefined) updates.description = data.description;
    if (data.category !== undefined) updates.category = data.category;
    if (data.tags !== undefined) updates.tags = data.tags;
    if (data.author_name !== undefined) updates.author_name = data.author_name;
    if (data.author_role !== undefined) updates.author_role = data.author_role;
    if (data.cover_image_url !== undefined)
      updates.cover_image_url = data.cover_image_url;
    if (data.cover_image_alt !== undefined)
      updates.cover_image_alt = data.cover_image_alt;
    if (data.tech_takeaways !== undefined)
      updates.tech_takeaways = data.tech_takeaways;
    if (data.related_slugs !== undefined)
      updates.related_slugs = data.related_slugs;
    if (data.status !== undefined) updates.status = data.status;
    if (data.scheduled_date !== undefined)
      updates.scheduled_date = data.scheduled_date;
    if (data.slug !== undefined) updates.slug = data.slug;

    // Recalculate derived fields if content changed
    if (data.content_markdown !== undefined) {
      updates.content_markdown = data.content_markdown;
      updates.word_count = countWords(data.content_markdown);
      updates.read_time = calculateReadTime(updates.word_count as number);
      updates.excerpt = generateExcerpt(data.content_markdown);
    }

    // Set published_date when transitioning to published
    if (data.status === "published") {
      // Only set published_date if it wasn't already published
      const { data: existing } = await supabase
        .from("blogs")
        .select("published_date, status")
        .eq("slug", slug)
        .single();

      if (existing && !existing.published_date) {
        updates.published_date = new Date().toISOString();
      }
    }

    const { error } = await supabase
      .from("blogs")
      .update(updates)
      .eq("slug", slug);

    if (error) {
      console.error("Error updating post:", error);
      return { success: false, error: error.message };
    }

    revalidatePath("/blog");
    revalidatePath(`/blog/${slug}`);
    if (data.slug && data.slug !== slug) {
      revalidatePath(`/blog/${data.slug}`);
    }
    revalidatePath("/sitemap.xml");

    return { success: true };
  } catch (err) {
    console.error("Unexpected error updating post:", err);
    return {
      success: false,
      error: err instanceof Error ? err.message : "Unknown error",
    };
  }
}

export async function deletePost(slug: string): Promise<ActionResult> {
  try {
    const { error } = await supabase.from("blogs").delete().eq("slug", slug);

    if (error) {
      console.error("Error deleting post:", error);
      return { success: false, error: error.message };
    }

    revalidatePath("/blog");
    revalidatePath("/sitemap.xml");

    return { success: true };
  } catch (err) {
    console.error("Unexpected error deleting post:", err);
    return {
      success: false,
      error: err instanceof Error ? err.message : "Unknown error",
    };
  }
}

export async function togglePostStatus(
  slug: string,
  newStatus: "draft" | "published"
): Promise<ActionResult> {
  return updatePost(slug, { status: newStatus });
}

export async function duplicatePost(slug: string): Promise<ActionResult> {
  try {
    const { data, error: fetchError } = await supabase
      .from("blogs")
      .select("*")
      .eq("slug", slug)
      .single();

    if (fetchError || !data) {
      return { success: false, error: "Original post not found." };
    }

    // Create a duplicate with modified slug and title, set as draft
    const newSlug = `${data.slug}-copy-${Date.now().toString(36)}`;
    const newTitle = `${data.title} (Copy)`;

    const row = {
      slug: newSlug,
      title: newTitle,
      description: data.description,
      category: data.category,
      tags: data.tags,
      author_name: data.author_name,
      author_role: data.author_role,
      cover_image_url: data.cover_image_url,
      cover_image_alt: data.cover_image_alt,
      content_markdown: data.content_markdown,
      content: data.content,
      tech_takeaways: data.tech_takeaways,
      related_slugs: data.related_slugs,
      status: "draft",
      scheduled_date: null,
      read_time: data.read_time,
      word_count: data.word_count,
      excerpt: data.excerpt,
      published_date: null,
    };

    const { error: insertError } = await supabase.from("blogs").insert([row]);

    if (insertError) {
      return { success: false, error: insertError.message };
    }

    return { success: true };
  } catch (err) {
    console.error("Error duplicating post:", err);
    return {
      success: false,
      error: err instanceof Error ? err.message : "Unknown error",
    };
  }
}
