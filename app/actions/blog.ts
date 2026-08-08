"use server";

import { revalidatePath } from "next/cache";
import { supabase } from "../lib/supabase";

export interface BlogInput {
  slug: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  author_name: string;
  author_role: string;
  read_time: string;
  cover_image_alt?: string;
  content: string[];
  tech_takeaways: string[];
  related_slugs: string[];
}

export async function createPost(data: BlogInput) {
  const { error } = await supabase.from("blogs").insert([data]);

  if (error) {
    console.error("Error creating post:", error);
    return { success: false, error: error.message };
  }

  // Instantly rebuild the static blog pages so the new post appears!
  revalidatePath("/blog");
  revalidatePath("/sitemap.xml");

  return { success: true };
}

export async function updatePost(slug: string, data: Partial<BlogInput>) {
  const { error } = await supabase
    .from("blogs")
    .update({ ...data, updated_date: new Date().toISOString() })
    .eq("slug", slug);

  if (error) {
    console.error("Error updating post:", error);
    return { success: false, error: error.message };
  }

  // Rebuild the specific post and the blog index
  revalidatePath("/blog");
  revalidatePath(`/blog/${slug}`);
  revalidatePath("/sitemap.xml");

  return { success: true };
}

export async function deletePost(slug: string) {
  const { error } = await supabase.from("blogs").delete().eq("slug", slug);

  if (error) {
    console.error("Error deleting post:", error);
    return { success: false, error: error.message };
  }

  revalidatePath("/blog");
  revalidatePath("/sitemap.xml");

  return { success: true };
}
