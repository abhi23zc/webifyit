"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  BookOpen,
  Pencil,
  Trash2,
  Eye,
  EyeOff,
  Clock,
  Hash,
  Loader2,
  Copy,
  Search,
  Filter,
  ArrowUpDown,
  Calendar,
} from "lucide-react";
import { useTransition } from "react";
import { deletePost, togglePostStatus, duplicatePost } from "../../actions/blog";
import { useToast } from "./Toast";
import type { BlogPost } from "../../lib/blog-data";

// ─── Types ──────────────────────────────────────────────────────

interface PostListProps {
  initialPosts: BlogPost[];
  onEdit: (slug: string) => void;
  onRefresh: () => void;
}

type SortField = "date" | "title" | "words";
type SortDir = "asc" | "desc";
type StatusFilter = "all" | "published" | "draft" | "scheduled";

// ─── Component ──────────────────────────────────────────────────

export default function PostList({ initialPosts, onEdit, onRefresh }: PostListProps) {
  const { showToast } = useToast();
  const [isPending, startTransition] = useTransition();
  const [actionSlug, setActionSlug] = useState<string | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);
  const [deletedSlugs, setDeletedSlugs] = useState<Set<string>>(new Set());
  const [statusOverrides, setStatusOverrides] = useState<Map<string, string>>(new Map());

  // Filters & sorting
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [sortField, setSortField] = useState<SortField>("date");
  const [sortDir, setSortDir] = useState<SortDir>("desc");

  // ─── Derived post list ──────────────────────────────────────

  const posts = useMemo(() => {
    let result = initialPosts
      .filter((p) => !deletedSlugs.has(p.slug))
      .map((p) => ({
        ...p,
        status: (statusOverrides.get(p.slug) as typeof p.status) || p.status,
      }));

    // Status filter
    if (statusFilter !== "all") {
      result = result.filter((p) => p.status === statusFilter);
    }

    // Search filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    // Sort
    result.sort((a, b) => {
      let cmp = 0;
      switch (sortField) {
        case "date":
          cmp =
            new Date(a.publishedDate || a.updatedDate || 0).getTime() -
            new Date(b.publishedDate || b.updatedDate || 0).getTime();
          break;
        case "title":
          cmp = a.title.localeCompare(b.title);
          break;
        case "words":
          cmp = (a.wordCount || 0) - (b.wordCount || 0);
          break;
      }
      return sortDir === "desc" ? -cmp : cmp;
    });

    return result;
  }, [initialPosts, deletedSlugs, statusOverrides, statusFilter, searchQuery, sortField, sortDir]);

  // ─── Actions ────────────────────────────────────────────────

  const handleDelete = (slug: string) => {
    setActionSlug(slug);
    startTransition(async () => {
      const result = await deletePost(slug);
      if (result.success) {
        setDeletedSlugs((prev) => new Set(prev).add(slug));
        showToast("Post deleted successfully.", "success");
      } else {
        showToast(result.error || "Failed to delete post.", "error");
      }
      setActionSlug(null);
      setConfirmDelete(null);
    });
  };

  const handleToggleStatus = (slug: string, currentStatus: string) => {
    const newStatus = currentStatus === "published" ? "draft" : "published";
    setActionSlug(slug);
    startTransition(async () => {
      const result = await togglePostStatus(slug, newStatus as "draft" | "published");
      if (result.success) {
        setStatusOverrides((prev) => new Map(prev).set(slug, newStatus));
        showToast(
          newStatus === "published" ? "Post published!" : "Post moved to drafts.",
          "success"
        );
      } else {
        showToast(result.error || "Failed to update status.", "error");
      }
      setActionSlug(null);
    });
  };

  const handleDuplicate = (slug: string) => {
    const post = initialPosts.find((p) => p.slug === slug);
    if (!post) return;

    setActionSlug(slug);
    startTransition(async () => {
      const result = await duplicatePost(slug);
      if (result.success) {
        showToast("Post duplicated as draft.", "success");
        onRefresh();
      } else {
        showToast(result.error || "Failed to duplicate.", "error");
      }
      setActionSlug(null);
    });
  };

  const toggleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDir((d) => (d === "desc" ? "asc" : "desc"));
    } else {
      setSortField(field);
      setSortDir("desc");
    }
  };

  // ─── Empty state ────────────────────────────────────────────

  if (initialPosts.length === 0 && !deletedSlugs.size) {
    return (
      <div className="text-center py-16 bg-white border border-[#DCDDD6] rounded-xs">
        <BookOpen className="w-12 h-12 text-[#8A8E96] mx-auto mb-4" />
        <p className="font-display text-lg font-bold text-[#12151B] mb-1">
          No articles yet
        </p>
        <p className="font-body text-sm text-[#585D67]">
          Create your first post to get started.
        </p>
      </div>
    );
  }

  // ─── Render ─────────────────────────────────────────────────

  return (
    <div className="space-y-4">
      {/* Toolbar: Search + Filters + Sort */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
        {/* Search */}
        <div className="relative flex-grow w-full sm:w-auto">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8A8E96]" />
          <input
            type="text"
            placeholder="Search posts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white border border-[#C7C9C0] pl-9 pr-4 py-2 text-sm rounded-xs font-body text-[#12151B] focus:border-[#1F3D8C] focus:outline-none"
          />
        </div>

        {/* Status filter */}
        <div className="flex items-center gap-1.5">
          <Filter className="w-3.5 h-3.5 text-[#8A8E96]" />
          {(["all", "published", "draft", "scheduled"] as StatusFilter[]).map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`font-mono text-[10px] px-2.5 py-1.5 rounded-xs border font-bold uppercase transition-colors ${
                statusFilter === status
                  ? "bg-[#12151B] text-white border-[#12151B]"
                  : "bg-white text-[#585D67] border-[#C7C9C0] hover:border-[#12151B]"
              }`}
            >
              {status}
            </button>
          ))}
        </div>

        {/* Sort controls */}
        <div className="flex items-center gap-1.5 ml-auto">
          <ArrowUpDown className="w-3.5 h-3.5 text-[#8A8E96]" />
          {([
            { field: "date" as SortField, label: "Date" },
            { field: "title" as SortField, label: "Title" },
            { field: "words" as SortField, label: "Words" },
          ]).map(({ field, label }) => (
            <button
              key={field}
              onClick={() => toggleSort(field)}
              className={`font-mono text-[10px] px-2 py-1.5 rounded-xs border font-bold transition-colors ${
                sortField === field
                  ? "bg-[#1F3D8C] text-white border-[#1F3D8C]"
                  : "bg-white text-[#585D67] border-[#C7C9C0] hover:border-[#1F3D8C]"
              }`}
            >
              {label} {sortField === field && (sortDir === "desc" ? "↓" : "↑")}
            </button>
          ))}
        </div>
      </div>

      {/* Results count */}
      <div className="font-mono text-[10px] text-[#8A8E96] uppercase tracking-wider">
        Showing {posts.length} of {initialPosts.length - deletedSlugs.size} articles
        {searchQuery && ` matching "${searchQuery}"`}
      </div>

      {/* Post list */}
      {posts.length === 0 ? (
        <div className="text-center py-10 bg-white border border-[#DCDDD6] rounded-xs">
          <p className="font-body text-sm text-[#585D67]">
            No posts match your filters.
          </p>
        </div>
      ) : (
        <div className="border border-[#C7C9C0] rounded-xs overflow-hidden bg-white divide-y divide-[#DCDDD6]">
          {posts.map((post) => (
            <div
              key={post.slug}
              className="flex items-center gap-4 p-4 hover:bg-[#F5F6F1]/50 transition-colors"
            >
              {/* Status indicator */}
              <div className="shrink-0">
                {post.status === "published" ? (
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" title="Published" />
                ) : post.status === "scheduled" ? (
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500" title="Scheduled" />
                ) : (
                  <div className="w-2.5 h-2.5 rounded-full bg-[#8A8E96]" title="Draft" />
                )}
              </div>

              {/* Post info */}
              <div className="flex-grow min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <h4 className="font-body text-sm font-semibold text-[#12151B] truncate">
                    {post.title}
                  </h4>
                  <span
                    className={`font-mono text-[9px] px-1.5 py-0.5 rounded border font-bold uppercase shrink-0 ${
                      post.status === "published"
                        ? "bg-emerald-50 border-emerald-200 text-emerald-700"
                        : post.status === "scheduled"
                        ? "bg-amber-50 border-amber-200 text-amber-700"
                        : "bg-gray-100 border-gray-200 text-gray-600"
                    }`}
                  >
                    {post.status}
                  </span>
                </div>
                <div className="flex items-center gap-3 font-mono text-[10px] text-[#8A8E96] flex-wrap">
                  <span className="tag-pill tag-pill-blue text-[9px] py-0 px-1.5">
                    {post.category}
                  </span>
                  <span className="flex items-center gap-0.5">
                    <Clock className="w-3 h-3" />
                    {post.readTime}
                  </span>
                  {post.wordCount > 0 && (
                    <span className="flex items-center gap-0.5">
                      <Hash className="w-3 h-3" />
                      {post.wordCount.toLocaleString()} words
                    </span>
                  )}
                  {post.publishedDate && (
                    <span className="flex items-center gap-0.5">
                      <Calendar className="w-3 h-3" />
                      {new Date(post.publishedDate).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-1 shrink-0">
                {/* View live */}
                {post.status === "published" && (
                  <Link
                    href={`/blog/${post.slug}`}
                    target="_blank"
                    className="p-2 rounded hover:bg-[#EEF2FB] text-[#1F3D8C] transition-colors"
                    title="View live"
                  >
                    <Eye className="w-4 h-4" />
                  </Link>
                )}

                {/* Toggle publish/draft */}
                <button
                  type="button"
                  onClick={() => handleToggleStatus(post.slug, post.status)}
                  disabled={isPending && actionSlug === post.slug}
                  className="p-2 rounded hover:bg-[#F5F6F1] text-[#585D67] hover:text-[#12151B] transition-colors"
                  title={post.status === "published" ? "Unpublish" : "Publish"}
                >
                  {isPending && actionSlug === post.slug ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : post.status === "published" ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>

                {/* Edit */}
                <button
                  type="button"
                  onClick={() => onEdit(post.slug)}
                  className="p-2 rounded hover:bg-[#EEF2FB] text-[#1F3D8C] transition-colors"
                  title="Edit"
                >
                  <Pencil className="w-4 h-4" />
                </button>

                {/* Duplicate */}
                <button
                  type="button"
                  onClick={() => handleDuplicate(post.slug)}
                  disabled={isPending && actionSlug === post.slug}
                  className="p-2 rounded hover:bg-[#F5F6F1] text-[#585D67] hover:text-[#12151B] transition-colors"
                  title="Duplicate as draft"
                >
                  <Copy className="w-4 h-4" />
                </button>

                {/* Delete */}
                {confirmDelete === post.slug ? (
                  <div className="flex items-center gap-1 ml-1">
                    <button
                      type="button"
                      onClick={() => handleDelete(post.slug)}
                      disabled={isPending}
                      className="px-2.5 py-1 bg-red-500 text-white text-[10px] font-mono font-bold rounded hover:bg-red-600 transition-colors"
                    >
                      {isPending && actionSlug === post.slug ? (
                        <Loader2 className="w-3 h-3 animate-spin" />
                      ) : (
                        "Delete"
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => setConfirmDelete(null)}
                      className="px-2.5 py-1 bg-[#F5F6F1] text-[10px] font-mono font-bold rounded text-[#585D67] hover:bg-[#DCDDD6] transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => setConfirmDelete(post.slug)}
                    className="p-2 rounded hover:bg-red-50 text-[#8A8E96] hover:text-red-500 transition-colors"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
