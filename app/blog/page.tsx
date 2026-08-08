import type { Metadata } from "next";
import { getAllPosts, getAllCategories } from "../lib/blog-data";
import BlogIndexClient from "./_components/BlogIndexClient";

export const metadata: Metadata = {
  title: "Engineering Blog — Technical Architecture & AI Case Studies",
  description:
    "In-depth engineering analyses on custom SaaS development, autonomous AI voice agents, and cloud enterprise modernization for founders, CTOs, and tech leaders.",
  openGraph: {
    title: "Engineering Blog | WebifyIt Engineering Studio",
    description:
      "Technical architecture case studies, AI voice agent engineering breakdowns, and custom SaaS development insights.",
    url: "https://webifyit.in/blog",
    type: "website",
    siteName: "WebifyIt Engineering Studio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Engineering Blog | WebifyIt Engineering Studio",
    description:
      "Technical architecture case studies and AI engineering insights for founders and CTOs.",
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
