"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Clock,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Share2,
  MessageCircle,
  Copy,
  Check,
  Hash,
} from "lucide-react";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import AuditModal from "../../../components/AuditModal";
import MsgZoneNotification from "../../../components/MsgZoneNotification";
import { trackBlogConversion } from "../../../lib/leadStore";
import BlogMarkdownRenderer from "../../_components/BlogMarkdownRenderer";
import TableOfContents from "../../_components/TableOfContents";
import type { BlogPost } from "../../../lib/blog-data";

interface BlogPostClientProps {
  post: BlogPost;
  relatedPosts: BlogPost[];
}

export default function BlogPostClient({
  post,
  relatedPosts,
}: BlogPostClientProps) {
  const [isAuditOpen, setIsAuditOpen] = useState(false);
  const [msgZoneLead, setMsgZoneLead] = useState<{
    name: string;
    focus: string;
  } | null>(null);
  const [readProgress, setReadProgress] = useState(0);
  const [copied, setCopied] = useState(false);

  // Reading progress bar
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0) {
        setReadProgress(Math.min((scrollTop / docHeight) * 100, 100));
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleRequestBlueprint = () => {
    trackBlogConversion(post.slug);
    setIsAuditOpen(true);
  };

  const handleLeadCaptured = (name: string, focus: string) => {
    setMsgZoneLead({ name, focus });
  };

  const articleUrl =
    typeof window !== "undefined"
      ? window.location.href
      : `https://webifyit.in/blog/${post.slug}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(articleUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const publishedDisplay = new Date(post.publishedDate).toLocaleDateString(
    "en-US",
    { month: "long", day: "numeric", year: "numeric" }
  );

  // Determine content: prefer markdown, fall back to paragraph array
  const hasMarkdown = !!post.contentMarkdown?.trim();

  return (
    <div className="flex flex-col min-h-screen bg-[#F5F6F1]">
      {/* Reading Progress Bar */}
      <div
        className="fixed top-0 left-0 h-[3px] bg-[#FF4B23] z-[60] transition-all duration-75"
        style={{ width: `${readProgress}%` }}
      />

      <Navbar onOpenAuditModal={handleRequestBlueprint} />

      <main className="flex-grow pt-28 pb-20">
        <div className="max-w-[1180px] mx-auto px-5 sm:px-8">
          {/* Back link */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 font-mono text-xs font-bold text-[#1F3D8C] hover:text-[#FF4B23] transition-colors mb-8 uppercase tracking-wider"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>

          <div className="flex gap-10">
            {/* Main Article Column */}
            <article className="flex-grow max-w-[860px] min-w-0">
              {/* Article Header */}
              <header className="border-b border-[#DCDDD6] pb-8 mb-8">
                <div className="flex items-center gap-3 font-mono text-xs text-[#8A8E96] mb-3 flex-wrap">
                  <span className="tag-pill tag-pill-blue font-bold">
                    {post.category}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {post.readTime}
                  </span>
                  <span>•</span>
                  <time dateTime={post.publishedDate}>{publishedDisplay}</time>
                  {post.wordCount > 0 && (
                    <>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Hash className="w-3.5 h-3.5" />
                        {post.wordCount.toLocaleString()} words
                      </span>
                    </>
                  )}
                </div>

                <h1 className="font-display text-3xl sm:text-4xl lg:text-[44px] font-extrabold text-[#12151B] tracking-tight leading-[1.15] mb-4">
                  {post.title}
                </h1>

                <p className="font-body text-lg text-[#585D67] leading-relaxed mb-6">
                  {post.description}
                </p>

                {/* Cover Image */}
                {post.coverImageUrl && (
                  <div className="mb-6 rounded-xs overflow-hidden border border-[#DCDDD6] shadow-3d">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={post.coverImageUrl}
                      alt={post.coverImageAlt || post.title}
                      className="w-full h-auto"
                      loading="eager"
                    />
                  </div>
                )}

                {/* Author & Share */}
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#1F3D8C] text-white rounded-full flex items-center justify-center font-display text-sm font-bold">
                      {post.author.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    <div>
                      <div className="font-body text-sm font-semibold text-[#12151B]">
                        {post.author.name}
                      </div>
                      <div className="font-mono text-[10px] text-[#8A8E96] uppercase">
                        {post.author.role}
                      </div>
                    </div>
                  </div>

                  {/* Share Buttons */}
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[10px] text-[#8A8E96] uppercase font-bold mr-1">
                      Share:
                    </span>
                    <a
                      href={`https://wa.me/?text=${encodeURIComponent(post.title + " — " + articleUrl)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-white border border-[#C7C9C0] rounded-xs hover:border-[#25D366] hover:bg-[#25D366]/10 transition-colors"
                      title="Share on WhatsApp"
                    >
                      <MessageCircle className="w-4 h-4 text-[#25D366]" />
                    </a>
                    <a
                      href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(articleUrl)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-white border border-[#C7C9C0] rounded-xs hover:border-[#0077B5] hover:bg-[#0077B5]/10 transition-colors"
                      title="Share on LinkedIn"
                    >
                      <svg
                        className="w-4 h-4 text-[#0077B5]"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                    </a>
                    <a
                      href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(articleUrl)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-white border border-[#C7C9C0] rounded-xs hover:border-[#12151B] hover:bg-[#12151B]/10 transition-colors"
                      title="Share on X (Twitter)"
                    >
                      <Share2 className="w-4 h-4 text-[#12151B]" />
                    </a>
                    <button
                      onClick={handleCopyLink}
                      className="p-2 bg-white border border-[#C7C9C0] rounded-xs hover:border-[#FF4B23] hover:bg-[#FF4B23]/10 transition-colors"
                      title="Copy article link"
                    >
                      {copied ? (
                        <Check className="w-4 h-4 text-emerald-600" />
                      ) : (
                        <Copy className="w-4 h-4 text-[#585D67]" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Article Tags */}
                <div className="flex flex-wrap gap-1.5 mt-5">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="tag-pill text-[10px] bg-[#F5F6F1]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </header>

              {/* Article Body — Markdown Rendered */}
              <section className="article-body">
                {hasMarkdown ? (
                  <BlogMarkdownRenderer content={post.contentMarkdown} />
                ) : (
                  // Legacy: plain paragraph rendering
                  <div className="space-y-6 font-body text-base text-[#12151B] leading-[1.8]">
                    {post.content.map((paragraph, idx) => (
                      <p key={idx}>{paragraph}</p>
                    ))}
                  </div>
                )}
              </section>

              {/* Technical Key Takeaways */}
              {post.techTakeaways.length > 0 && (
                <section className="my-10 p-6 bg-[#EEF2FB] border border-[#1F3D8C]/20 rounded-xs space-y-4">
                  <h2 className="font-mono text-xs font-bold text-[#1F3D8C] uppercase tracking-wider flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#FF4B23]" />
                    Key Takeaways
                  </h2>
                  <ul className="space-y-2.5 font-body text-sm text-[#12151B]">
                    {post.techTakeaways.map((takeaway) => (
                      <li
                        key={takeaway}
                        className="flex items-start gap-2.5"
                      >
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span className="font-medium">{takeaway}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {/* Inline CTA */}
              <div className="mt-10 mb-10 transition-transform duration-300 hover:scale-[1.01]">
                <div className="bg-[#12151B] text-white p-8 rounded-xs shadow-2xl border border-[#12151B] flex flex-col sm:flex-row items-center justify-between gap-6 xmark">
                  <div className="space-y-2 text-center sm:text-left">
                    <div className="font-mono text-xs font-bold text-[#FF4B23] uppercase tracking-wider">
                      LET&apos;S BUILD SOMETHING GREAT
                    </div>
                    <h3 className="font-display text-2xl font-bold text-white tracking-tight">
                      Have a project in mind?
                    </h3>
                    <p className="font-body text-xs text-[#8A8E96] max-w-md">
                      Tell us about your idea. We&apos;ll analyze your requirements
                      and get back with a clear plan of action.
                    </p>
                  </div>

                  <button
                    onClick={handleRequestBlueprint}
                    className="btn-primary py-3.5 px-6 text-sm shadow-3d-accent shrink-0 flex items-center gap-2"
                  >
                    <span>Get in Touch</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Related Articles */}
              {relatedPosts.length > 0 && (
                <section className="mt-16">
                  <h2 className="font-mono text-xs font-bold text-[#FF4B23] uppercase tracking-wider mb-6">
                    RELATED ARTICLES
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {relatedPosts.map((related) => (
                      <div key={related.slug} className="transition-transform duration-300 hover:scale-[1.02]">
                        <Link
                          href={`/blog/${related.slug}`}
                          className="block"
                        >
                          <div className="xmark bg-white border border-[#C7C9C0] p-5 rounded-xs hover:border-[#1F3D8C] hover:shadow-3d transition-all group">
                            <div className="flex items-center gap-2 font-mono text-[10px] text-[#8A8E96] mb-3">
                              <span className="tag-pill tag-pill-blue font-bold text-[10px]">
                                {related.category}
                              </span>
                              <span>{related.readTime}</span>
                            </div>
                            <h3 className="font-display text-base font-bold text-[#12151B] group-hover:text-[#1F3D8C] transition-colors leading-snug mb-2">
                              {related.title}
                            </h3>
                            <span className="font-mono text-xs font-bold text-[#FF4B23] flex items-center gap-1">
                              Read Article
                              <ArrowRight className="w-3.5 h-3.5" />
                            </span>
                          </div>
                        </Link>
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </article>

            {/* Sidebar: Table of Contents (desktop only) */}
            {hasMarkdown && (
              <aside className="hidden xl:block w-64 shrink-0 sticky top-28 self-start">
                <TableOfContents markdown={post.contentMarkdown} />
              </aside>
            )}
          </div>
        </div>
      </main>

      <Footer onOpenAuditModal={handleRequestBlueprint} />

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
