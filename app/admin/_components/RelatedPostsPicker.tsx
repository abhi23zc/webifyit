"use client";

import React, { useState, useEffect, useMemo } from "react";
import { X, Search, Link2 } from "lucide-react";

interface RelatedPostsPickerProps {
  selectedSlugs: string[];
  currentSlug?: string; // Exclude from results
  onChange: (slugs: string[]) => void;
}

interface PostOption {
  slug: string;
  title: string;
  category: string;
}

/**
 * Searchable dropdown to select related posts.
 * Fetches all posts from the API and lets the user pick related articles.
 */
export default function RelatedPostsPicker({
  selectedSlugs,
  currentSlug,
  onChange,
}: RelatedPostsPickerProps) {
  const [allPosts, setAllPosts] = useState<PostOption[]>([]);
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  // Fetch posts on mount
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/admin/posts");
        if (res.ok && !cancelled) {
          const data = await res.json();
          const posts = (data.posts || []).map(
            (p: { slug: string; title: string; category: string }) => ({
              slug: p.slug,
              title: p.title,
              category: p.category,
            })
          );
          setAllPosts(posts);
        }
      } catch {
        // Silently fail
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  // Filter available posts
  const availablePosts = useMemo(() => {
    return allPosts.filter((p) => {
      if (p.slug === currentSlug) return false;
      if (selectedSlugs.includes(p.slug)) return false;
      if (query.trim()) {
        const q = query.toLowerCase();
        return (
          p.title.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [allPosts, currentSlug, selectedSlugs, query]);

  // Selected posts details
  const selectedPosts = useMemo(() => {
    return selectedSlugs
      .map((slug) => allPosts.find((p) => p.slug === slug))
      .filter(Boolean) as PostOption[];
  }, [selectedSlugs, allPosts]);

  const addPost = (slug: string) => {
    onChange([...selectedSlugs, slug]);
    setQuery("");
    setIsOpen(false);
  };

  const removePost = (slug: string) => {
    onChange(selectedSlugs.filter((s) => s !== slug));
  };

  return (
    <div className="space-y-3">
      <label className="font-mono text-xs font-bold text-[#12151B] flex items-center gap-1.5">
        <Link2 className="w-3.5 h-3.5 text-[#8A8E96]" />
        Related Posts (optional)
      </label>

      {/* Selected posts */}
      {selectedPosts.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {selectedPosts.map((post) => (
            <span
              key={post.slug}
              className="inline-flex items-center gap-1.5 bg-[#EEF2FB] border border-[#1F3D8C]/20 text-[#1F3D8C] font-body text-xs px-2.5 py-1 rounded"
            >
              <span className="truncate max-w-[200px]">{post.title}</span>
              <button
                type="button"
                onClick={() => removePost(post.slug)}
                className="hover:text-red-500 transition-colors shrink-0"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
        </div>
      )}

      {/* Search input */}
      <div className="relative">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8A8E96]" />
          <input
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setIsOpen(true);
            }}
            onFocus={() => setIsOpen(true)}
            placeholder="Search posts to link..."
            className="w-full bg-[#F5F6F1] border border-[#C7C9C0] pl-9 pr-4 py-2 text-sm rounded-xs font-body text-[#12151B] focus:border-[#1F3D8C] focus:outline-none"
          />
        </div>

        {/* Dropdown */}
        {isOpen && availablePosts.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-[#C7C9C0] rounded-xs shadow-3d max-h-48 overflow-y-auto z-20">
            {availablePosts.slice(0, 8).map((post) => (
              <button
                key={post.slug}
                type="button"
                onClick={() => addPost(post.slug)}
                className="w-full text-left px-3 py-2 hover:bg-[#F5F6F1] transition-colors border-b border-[#DCDDD6] last:border-b-0"
              >
                <div className="font-body text-sm font-medium text-[#12151B] truncate">
                  {post.title}
                </div>
                <div className="font-mono text-[10px] text-[#8A8E96]">
                  {post.category}
                </div>
              </button>
            ))}
          </div>
        )}

        {isOpen && availablePosts.length === 0 && query.trim() && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-[#C7C9C0] rounded-xs shadow-3d px-3 py-3 z-20">
            <p className="font-body text-xs text-[#8A8E96]">No matching posts found.</p>
          </div>
        )}
      </div>

      {/* Click outside to close */}
      {isOpen && (
        <div
          className="fixed inset-0 z-10"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}
