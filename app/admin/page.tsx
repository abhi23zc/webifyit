"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  Plus,
  ArrowRight,
  ArrowLeft,
  RefreshCw,
  ShieldCheck,
  BookOpen,
  Users,
  LogOut,
} from "lucide-react";
import { ToastProvider } from "./_components/Toast";
import BlogManager from "./_components/BlogManager";
import PostList from "./_components/PostList";
import LeadsCRM from "./_components/LeadsCRM";
import { logout } from "../actions/auth";
import type { BlogPost } from "../lib/blog-data";
import type { Lead } from "../actions/leads";

type MainTab = "blog" | "leads";
type BlogView = "list" | "create" | "edit";

function AdminContent() {
  const [mainTab, setMainTab] = useState<MainTab>("leads");
  const [blogView, setBlogView] = useState<BlogView>("list");
  const [editSlug, setEditSlug] = useState<string | null>(null);
  const [editData, setEditData] = useState<Partial<Record<string, unknown>> | null>(null);

  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [postsLoading, setPostsLoading] = useState(true);

  const [leads, setLeads] = useState<Lead[]>([]);
  const [leadsLoading, setLeadsLoading] = useState(true);

  // ─── Data fetching ──────────────────────────────────────────

  const fetchPosts = useCallback(async () => {
    setPostsLoading(true);
    try {
      const res = await fetch("/api/admin/posts");
      if (res.ok) {
        const data = await res.json();
        setPosts(data.posts || []);
      }
    } catch (err) {
      console.error("Failed to fetch posts:", err);
    } finally {
      setPostsLoading(false);
    }
  }, []);

  const fetchLeads = useCallback(async () => {
    setLeadsLoading(true);
    try {
      const res = await fetch("/api/admin/leads");
      if (res.ok) {
        const data = await res.json();
        setLeads(data.leads || []);
      }
    } catch (err) {
      console.error("Failed to fetch leads:", err);
    } finally {
      setLeadsLoading(false);
    }
  }, []);

  // Fetch both on mount
  useEffect(() => {
    let cancelled = false;

    (async () => {
      setPostsLoading(true);
      setLeadsLoading(true);
      try {
        const [postsRes, leadsRes] = await Promise.all([
          fetch("/api/admin/posts"),
          fetch("/api/admin/leads"),
        ]);

        if (!cancelled) {
          if (postsRes.ok) {
            const data = await postsRes.json();
            setPosts(data.posts || []);
          }
          if (leadsRes.ok) {
            const data = await leadsRes.json();
            setLeads(data.leads || []);
          }
        }
      } catch (err) {
        console.error("Failed to fetch admin data:", err);
      } finally {
        if (!cancelled) {
          setPostsLoading(false);
          setLeadsLoading(false);
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  // ─── Blog handlers ──────────────────────────────────────────

  const handleEditPost = useCallback(
    (slug: string) => {
      const post = posts.find((p) => p.slug === slug);
      if (!post) return;

      setEditSlug(slug);
      setEditData({
        title: post.title,
        slug: post.slug,
        description: post.description,
        category: post.category,
        customCategory: "",
        tags: post.tags,
        author_name: post.author.name,
        author_role: post.author.role,
        cover_image_url: post.coverImageUrl || "",
        cover_image_alt: post.coverImageAlt || "",
        content_markdown: post.contentMarkdown || post.content.join("\n\n"),
        tech_takeaways: post.techTakeaways.length > 0 ? post.techTakeaways : [""],
        related_slugs: post.relatedSlugs,
        status: post.status,
        scheduled_date: post.scheduledDate || "",
      });
      setBlogView("edit");
    },
    [posts]
  );

  const handlePostSaved = useCallback(() => {
    fetchPosts();
  }, [fetchPosts]);

  const handleBackToBlogList = useCallback(() => {
    setBlogView("list");
    setEditSlug(null);
    setEditData(null);
  }, []);

  // ─── Render ─────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-[#F5F6F1]">
      {/* Top bar */}
      <header className="sticky top-0 z-40 bg-white border-b border-[#DCDDD6] px-5 sm:px-8 py-3">
        <div className="max-w-[1180px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-[#1F3D8C]" />
              <span className="font-display text-lg font-bold text-[#12151B]">
                Admin
              </span>
            </div>
            <span className="font-mono text-[10px] text-[#8A8E96] uppercase tracking-wider hidden sm:inline">
              WebifyIt Control Room
            </span>
          </div>

          <div className="flex items-center gap-3">
            {mainTab === "blog" && blogView !== "list" && (
              <button
                onClick={handleBackToBlogList}
                className="btn-ghost text-xs py-2 px-3 flex items-center gap-1.5"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                All Posts
              </button>
            )}
            {mainTab === "blog" && blogView === "list" && (
              <button
                onClick={() => setBlogView("create")}
                className="btn-primary text-xs py-2 px-4 flex items-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" />
                New Article
              </button>
            )}
            <Link
              href="/"
              className="btn-secondary text-xs py-2 px-3 flex items-center gap-1.5"
            >
              <span className="hidden sm:inline">Back to Site</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <form action={logout}>
              <button
                type="submit"
                className="text-xs py-2 px-3 flex items-center gap-1.5 rounded-xs border border-[#C7C9C0] bg-white text-[#585D67] hover:border-red-300 hover:bg-red-50 hover:text-red-600 transition-colors"
                title="Sign out"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </form>
          </div>
        </div>

        {/* Main tab switcher */}
        <div className="max-w-[1180px] mx-auto flex items-center gap-2 mt-3">
          <button
            onClick={() => setMainTab("leads")}
            className={`font-mono text-xs px-4 py-2 rounded-xs font-bold flex items-center gap-2 transition-all ${
              mainTab === "leads"
                ? "bg-[#FF4B23] text-white"
                : "bg-[#F5F6F1] text-[#585D67] hover:text-[#12151B]"
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            Leads CRM
            {leads.length > 0 && (
              <span className="bg-white/20 px-1.5 py-0.5 rounded text-[10px]">
                {leads.length}
              </span>
            )}
          </button>
          <button
            onClick={() => setMainTab("blog")}
            className={`font-mono text-xs px-4 py-2 rounded-xs font-bold flex items-center gap-2 transition-all ${
              mainTab === "blog"
                ? "bg-[#1F3D8C] text-white"
                : "bg-[#F5F6F1] text-[#585D67] hover:text-[#12151B]"
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            Blog CMS
            {posts.length > 0 && (
              <span className="bg-white/20 px-1.5 py-0.5 rounded text-[10px]">
                {posts.length}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-[1180px] mx-auto px-5 sm:px-8 py-8">
        {/* ─── LEADS CRM TAB ─────────────────────────────── */}
        {mainTab === "leads" && (
          <LeadsCRM initialLeads={leads} loading={leadsLoading} onRefresh={fetchLeads} />
        )}

        {/* ─── BLOG CMS TAB ──────────────────────────────── */}
        {mainTab === "blog" && (
          <>
            {blogView === "list" && (
              <div className="space-y-6">
                {/* Stats bar */}
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                  <div className="bg-white border border-[#C7C9C0] rounded-xs p-4 xmark">
                    <div className="font-mono text-[10px] text-[#8A8E96] uppercase">Total</div>
                    <div className="font-display text-2xl font-bold text-[#12151B] mt-1">
                      {posts.length}
                    </div>
                  </div>
                  <div className="bg-white border border-[#C7C9C0] rounded-xs p-4 xmark">
                    <div className="font-mono text-[10px] text-[#8A8E96] uppercase">
                      Published
                    </div>
                    <div className="font-display text-2xl font-bold text-emerald-600 mt-1">
                      {posts.filter((p) => p.status === "published").length}
                    </div>
                  </div>
                  <div className="bg-white border border-[#C7C9C0] rounded-xs p-4 xmark">
                    <div className="font-mono text-[10px] text-[#8A8E96] uppercase">Drafts</div>
                    <div className="font-display text-2xl font-bold text-[#8A8E96] mt-1">
                      {posts.filter((p) => p.status === "draft").length}
                    </div>
                  </div>
                  <div className="bg-white border border-[#C7C9C0] rounded-xs p-4 xmark">
                    <div className="font-mono text-[10px] text-[#8A8E96] uppercase">
                      Total Words
                    </div>
                    <div className="font-display text-2xl font-bold text-[#1F3D8C] mt-1">
                      {posts.reduce((sum, p) => sum + (p.wordCount || 0), 0).toLocaleString()}
                    </div>
                  </div>
                </div>

                {postsLoading ? (
                  <div className="flex items-center justify-center py-12 text-[#8A8E96]">
                    <RefreshCw className="w-5 h-5 animate-spin mr-2" />
                    <span className="font-mono text-xs">Loading posts...</span>
                  </div>
                ) : (
                  <PostList initialPosts={posts} onEdit={handleEditPost} onRefresh={fetchPosts} />
                )}
              </div>
            )}

            {blogView === "create" && (
              <div className="bg-white border border-[#C7C9C0] rounded-xs p-6 sm:p-8 shadow-3d">
                <BlogManager onSaved={handlePostSaved} />
              </div>
            )}

            {blogView === "edit" && editSlug && editData && (
              <div className="bg-white border border-[#C7C9C0] rounded-xs p-6 sm:p-8 shadow-3d">
                <BlogManager
                  editSlug={editSlug}
                  initialData={editData as Record<string, unknown>}
                  onSaved={handlePostSaved}
                />
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}

// ─── Page Export (wraps in ToastProvider) ────────────────────────

export default function AdminDashboard() {
  return (
    <ToastProvider>
      <AdminContent />
    </ToastProvider>
  );
}
