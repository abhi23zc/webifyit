import type { Metadata } from "next";
import { getAllPosts, getAllCategories } from "../lib/blog-data";
import BlogIndexClient from "./_components/BlogIndexClient";

export const metadata: Metadata = {
  title: "Blog — Insights, Tutorials & Updates",
  description:
    "Explore insights on technology, business, design, and more. Tips, tutorials, case studies, and stories from the WebifyIt team.",
  openGraph: {
    title: "Blog | WebifyIt",
    description:
      "Insights on technology, business, design, and more from WebifyIt.",
    url: "https://webifyit.in/blog",
    type: "website",
    siteName: "WebifyIt",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog | WebifyIt",
    description:
      "Insights on technology, business, design, and more from WebifyIt.",
  },
  alternates: {
    canonical: "https://webifyit.in/blog",
  },
};

export default async function BlogPage() {
  const posts = await getAllPosts();
  const categories = await getAllCategories();

  return <BlogIndexClient posts={posts} categories={categories} />;
}
