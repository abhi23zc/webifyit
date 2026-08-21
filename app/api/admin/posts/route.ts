import { NextResponse } from "next/server";
import { getAllPostsAdmin } from "../../../lib/blog-data";

/**
 * GET /api/admin/posts
 * Returns all blog posts including drafts for admin management.
 */
export async function GET() {
  try {
    const posts = await getAllPostsAdmin();
    return NextResponse.json({ posts });
  } catch (error) {
    console.error("Error fetching admin posts:", error);
    return NextResponse.json(
      { posts: [], error: "Failed to fetch posts" },
      { status: 500 }
    );
  }
}

// Disable caching for admin data
export const dynamic = "force-dynamic";
