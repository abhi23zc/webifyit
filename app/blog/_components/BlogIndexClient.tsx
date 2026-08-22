"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Clock, ArrowRight, Search, X } from "lucide-react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import AuditModal from "../../components/AuditModal";
import MsgZoneNotification from "../../components/MsgZoneNotification";
import type { BlogPost } from "../../lib/blog-data";

interface BlogIndexClientProps {
  posts: BlogPost[];
  categories: string[];
}

export default function BlogIndexClient({
  posts,
  categories,
}: BlogIndexClientProps) {
  const [isAuditOpen, setIsAuditOpen] = useState(false);
  const [msgZoneLead, setMsgZoneLead] = useState<{
    name: string;
    focus: string;
  } | null>(null);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const handleLeadCaptured = (name: string, focus: string) => {
    setMsgZoneLead({ name, focus });
  };

  const filteredPosts = posts.filter((post) => {
    const matchesCategory =
      activeCategory === "All" || post.category === activeCategory;
    const matchesSearch =
      !searchQuery.trim() ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some((t) =>
        t.toLowerCase().includes(searchQuery.toLowerCase())
      ) ||
      post.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const [featuredPost, ...remainingPosts] =
    activeCategory === "All" && !searchQuery.trim()
      ? filteredPosts
      : [null, ...filteredPosts].filter(Boolean) as BlogPost[];

  return (
    <div className="flex flex-col min-h-screen bg-[#F5F6F1]">
      <Navbar onOpenAuditModal={() => setIsAuditOpen(true)} />

      <main className="flex-grow pt-28 pb-20">
        <div className="max-w-[1180px] mx-auto px-5 sm:px-8">
          {/* Blog Header */}
          <header className="max-w-3xl mb-10">
            <div className="inline-flex items-center gap-2 mb-3 px-3 py-1 bg-[#EEF2FB] border border-[#1F3D8C]/20 rounded-xs">
              <span className="w-2 h-2 rounded-full bg-[#FF4B23] animate-pulse" />
              <span className="font-mono text-xs font-bold text-[#1F3D8C] uppercase tracking-wider">
                OUR BLOG
              </span>
            </div>
            <h1 className="font-display text-4xl sm:text-5xl font-bold text-[#12151B] tracking-tight">
              Insights, Tutorials & Updates
            </h1>
            <p className="font-body text-base text-[#585D67] mt-4 leading-relaxed">
              Ideas, stories, and practical guides on technology, business,
              design, and building great products — written for founders,
              creators, and curious minds.
            </p>
          </header>

          {/* Filters & Search */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#DCDDD6] pb-4 mb-8">
            <nav
              className="flex items-center gap-2 overflow-x-auto pb-1"
              aria-label="Blog categories"
            >
              {["All", ...categories].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`font-mono text-xs px-4 py-2 rounded-xs border font-semibold transition-all shrink-0 ${
                    activeCategory === cat
                      ? "bg-[#12151B] text-white border-[#12151B] shadow-2xs"
                      : "bg-white text-[#585D67] border-[#C7C9C0] hover:border-[#12151B]"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </nav>

            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8A8E96]" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white border border-[#C7C9C0] pl-9 pr-8 py-2 text-xs rounded-xs font-mono text-[#12151B] focus:border-[#1F3D8C] focus:outline-none"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-[#8A8E96] hover:text-[#12151B]"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Featured Post (first article gets hero treatment) */}
          {featuredPost && activeCategory === "All" && !searchQuery.trim() && (
            <div className="mb-10 transition-transform duration-300 hover:scale-[1.01]">
              <Link href={`/blog/${featuredPost.slug}`} className="block">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="xmark bg-white border border-[#C7C9C0] rounded-xs shadow-3d hover:border-[#1F3D8C] transition-all group overflow-hidden"
                >
                  {/* Cover image for featured post */}
                  {featuredPost.coverImageUrl && (
                    <div className="w-full h-48 sm:h-64 overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={featuredPost.coverImageUrl}
                        alt={featuredPost.coverImageAlt || featuredPost.title}
                        className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
                      />
                    </div>
                  )}

                  <div className="p-8">
                    <div className="flex items-center gap-3 font-mono text-[10px] text-[#8A8E96] mb-4">
                      <span className="tag-pill tag-pill-accent font-bold text-[10px]">
                        LATEST
                      </span>
                      <span className="tag-pill tag-pill-blue font-bold text-[10px]">
                        {featuredPost.category}
                      </span>
                      <span>{featuredPost.readTime}</span>
                    </div>

                    <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-[#12151B] group-hover:text-[#1F3D8C] transition-colors mb-3 leading-snug">
                      {featuredPost.title}
                    </h2>
                    <p className="font-body text-sm text-[#585D67] leading-relaxed max-w-3xl mb-4">
                      {featuredPost.description}
                    </p>

                    <div className="flex items-center justify-between pt-4 border-t border-[#DCDDD6]">
                      <div className="flex items-center gap-4 font-mono text-xs text-[#585D67]">
                        <span className="font-semibold text-[#12151B]">
                          {featuredPost.author.name}
                        </span>
                        <time dateTime={featuredPost.publishedDate}>
                          {new Date(
                            featuredPost.publishedDate
                          ).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </time>
                      </div>

                      <span className="font-mono text-xs font-bold text-[#FF4B23] group-hover:underline flex items-center gap-1.5">
                        Read Article
                        <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>

                    {/* Tag Chips */}
                    <div className="flex flex-wrap gap-1.5 mt-4">
                      {featuredPost.tags.slice(0, 5).map((tag) => (
                        <span
                          key={tag}
                          className="tag-pill text-[10px] bg-[#F5F6F1]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </Link>
            </div>
          )}

          {/* Blog Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {(activeCategory === "All" && !searchQuery.trim()
              ? remainingPosts
              : filteredPosts
            ).map((post, idx) => (
              <div key={post.slug} className="h-full transition-transform duration-300 hover:scale-[1.02]">
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="h-full"
                >
                  <article className="xmark bg-white border border-[#C7C9C0] rounded-xs shadow-3d hover:border-[#1F3D8C] transition-all flex flex-col justify-between h-full group overflow-hidden">
                    {/* Card cover image */}
                    {post.coverImageUrl && (
                      <div className="w-full h-40 overflow-hidden">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={post.coverImageUrl}
                          alt={post.coverImageAlt || post.title}
                          className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
                        />
                      </div>
                    )}

                    <div className="p-6 flex flex-col flex-grow">
                      <div>
                        <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#DCDDD6] font-mono text-[10px] text-[#8A8E96]">
                          <span className="tag-pill tag-pill-blue font-bold text-[10px]">
                            {post.category}
                          </span>
                          <time dateTime={post.publishedDate}>
                            {new Date(post.publishedDate).toLocaleDateString(
                              "en-US",
                              {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              }
                            )}
                          </time>
                        </div>

                        <h2 className="font-display text-lg font-bold text-[#12151B] group-hover:text-[#1F3D8C] transition-colors mb-2 leading-snug">
                          <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                        </h2>

                        <p className="font-body text-xs text-[#585D67] leading-relaxed mb-4 line-clamp-3">
                          {post.description}
                        </p>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-1 mb-3">
                          {post.tags.slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              className="font-mono text-[9px] text-[#8A8E96] bg-[#F5F6F1] border border-[#DCDDD6] px-1.5 py-0.5 rounded"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="pt-4 border-t border-[#DCDDD6] mt-auto flex items-center justify-between font-mono text-xs text-[#585D67]">
                        <div className="flex items-center gap-3 text-[11px]">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5 text-[#8A8E96]" />
                            {post.readTime}
                          </span>
                          <span className="font-semibold text-[#12151B] text-[10px]">
                            {post.author.name}
                          </span>
                        </div>

                        <Link
                          href={`/blog/${post.slug}`}
                          className="font-bold text-[#FF4B23] hover:underline flex items-center gap-1 text-xs"
                        >
                          Read →
                        </Link>
                      </div>
                    </div>
                  </article>
                </motion.div>
              </div>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-16 font-body text-[#585D67]">
              <p className="text-lg font-semibold text-[#12151B] mb-2">
                No articles found
              </p>
              <p className="text-sm">
                Try adjusting your search or category filter.
              </p>
            </div>
          )}

          {/* CTA Banner */}
          <div className="mt-16 transition-transform duration-300 hover:scale-[1.01]">
            <div className="bg-[#12151B] text-white p-8 rounded-xs shadow-2xl border border-[#12151B] flex flex-col sm:flex-row items-center justify-between gap-6 xmark">
              <div className="space-y-2 text-center sm:text-left">
                <div className="font-mono text-xs font-bold text-[#FF4B23] uppercase tracking-wider">
                  LET&apos;S BUILD SOMETHING GREAT
                </div>
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  Have a project in mind?
                </h3>
                <p className="font-body text-sm text-[#8A8E96] max-w-xl">
                  Tell us about your idea and we&apos;ll get back to you with a
                  clear plan of action.
                </p>
              </div>

              <button
                onClick={() => setIsAuditOpen(true)}
                className="btn-primary py-3.5 px-6 text-sm shadow-3d-accent shrink-0 flex items-center gap-2"
              >
                <span>Get in Touch</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer onOpenAuditModal={() => setIsAuditOpen(true)} />

      <AuditModal
        isOpen={isAuditOpen}
        onClose={() => setIsAuditOpen(false)}
        onLeadCaptured={handleLeadCaptured}
      />

      <MsgZoneNotification
        isOpen={!!msgZoneLead}
        leadName={msgZoneLead?.name}
        auditFocus={msgZoneLead?.focus}
        onClose={() => setMsgZoneLead(null)}
      />
    </div>
  );
}
