import type { MetadataRoute } from "next";
import { getAllPosts } from "./lib/blog-data";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getAllPosts();

  const blogUrls: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `https://webifyit.in/blog/${post.slug}`,
    lastModified: new Date(post.updatedDate || post.publishedDate),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [
    {
      url: "https://webifyit.in",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: "https://webifyit.in/blog",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...blogUrls,
  ];
}
