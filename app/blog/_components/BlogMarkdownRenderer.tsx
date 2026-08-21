"use client";

import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import type { Components } from "react-markdown";

interface BlogMarkdownRendererProps {
  content: string;
}

/**
 * Renders markdown blog content with the Formwork design system styling.
 * Used on the public-facing blog post pages.
 * Supports: headings, bold/italic, links, images with captions, code blocks
 * with syntax highlighting, blockquotes, tables (GFM), lists, and horizontal rules.
 */
export default function BlogMarkdownRenderer({
  content,
}: BlogMarkdownRendererProps) {
  const components: Components = {
    h1: ({ children }) => (
      <h1 className="font-display text-3xl font-extrabold text-[#12151B] tracking-tight mt-12 mb-5 pb-3 border-b border-[#DCDDD6]">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2
        id={generateId(children)}
        className="font-display text-2xl font-bold text-[#12151B] tracking-tight mt-10 mb-4 scroll-mt-24"
      >
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3
        id={generateId(children)}
        className="font-display text-xl font-bold text-[#12151B] mt-8 mb-3 scroll-mt-24"
      >
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="font-display text-lg font-semibold text-[#12151B] mt-6 mb-2">
        {children}
      </h4>
    ),
    p: ({ children }) => (
      <p className="font-body text-base text-[#12151B] leading-[1.85] mb-5">
        {children}
      </p>
    ),
    a: ({ href, children }) => (
      <a
        href={href}
        target={href?.startsWith("http") ? "_blank" : undefined}
        rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
        className="text-[#1F3D8C] font-medium underline underline-offset-2 decoration-[#1F3D8C]/30 hover:decoration-[#1F3D8C] transition-colors"
      >
        {children}
      </a>
    ),
    strong: ({ children }) => (
      <strong className="font-semibold text-[#12151B]">{children}</strong>
    ),
    em: ({ children }) => <em className="italic">{children}</em>,
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-[#1F3D8C] pl-5 py-2 my-6 bg-[#EEF2FB]/50 rounded-r-xs italic">
        {children}
      </blockquote>
    ),
    ul: ({ children }) => (
      <ul className="list-disc list-outside pl-6 space-y-2 mb-6 font-body text-base text-[#12151B] leading-[1.7]">
        {children}
      </ul>
    ),
    ol: ({ children }) => (
      <ol className="list-decimal list-outside pl-6 space-y-2 mb-6 font-body text-base text-[#12151B] leading-[1.7]">
        {children}
      </ol>
    ),
    li: ({ children }) => <li className="pl-1">{children}</li>,
    code: ({ className: codeClassName, children }) => {
      const isInline = !codeClassName;
      if (isInline) {
        return (
          <code className="font-mono text-[0.9em] bg-[#F5F6F1] border border-[#DCDDD6] px-1.5 py-0.5 rounded text-[#FF4B23] font-medium">
            {children}
          </code>
        );
      }
      return (
        <code className={`${codeClassName || ""} font-mono text-sm`}>
          {children}
        </code>
      );
    },
    pre: ({ children }) => (
      <pre className="bg-[#12151B] text-[#E8E8E8] rounded-xs p-5 overflow-x-auto my-6 text-sm leading-relaxed border border-[#12151B] shadow-3d">
        {children}
      </pre>
    ),
    hr: () => <hr className="border-t border-[#DCDDD6] my-10" />,
    img: ({ src, alt }) => (
      <figure className="my-8">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt || ""}
          className="w-full rounded-xs border border-[#DCDDD6] shadow-3d"
          loading="lazy"
        />
        {alt && (
          <figcaption className="mt-2.5 text-center font-mono text-xs text-[#8A8E96] italic">
            {alt}
          </figcaption>
        )}
      </figure>
    ),
    table: ({ children }) => (
      <div className="overflow-x-auto my-6 border border-[#DCDDD6] rounded-xs shadow-3d">
        <table className="w-full text-sm font-body">{children}</table>
      </div>
    ),
    thead: ({ children }) => (
      <thead className="bg-[#F5F6F1] border-b border-[#DCDDD6]">
        {children}
      </thead>
    ),
    th: ({ children }) => (
      <th className="px-4 py-3 text-left font-mono text-xs font-bold text-[#12151B] uppercase tracking-wider">
        {children}
      </th>
    ),
    td: ({ children }) => (
      <td className="px-4 py-3 border-t border-[#DCDDD6] text-[#585D67]">
        {children}
      </td>
    ),
    tr: ({ children }) => (
      <tr className="hover:bg-[#F5F6F1]/50 transition-colors">{children}</tr>
    ),
  };

  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeHighlight]}
      components={components}
    >
      {content}
    </ReactMarkdown>
  );
}

// ─── Utility ──────────────────────────────────────────────────

/** Generate a URL-safe ID from heading content (for anchor links / TOC) */
function generateId(children: React.ReactNode): string {
  const text = extractText(children);
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

/** Recursively extract text from React children */
function extractText(children: React.ReactNode): string {
  if (typeof children === "string") return children;
  if (typeof children === "number") return String(children);
  if (Array.isArray(children)) return children.map(extractText).join("");
  if (React.isValidElement(children)) {
    const props = children.props as Record<string, unknown>;
    if (props.children) {
      return extractText(props.children as React.ReactNode);
    }
  }
  return "";
}
