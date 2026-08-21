"use client";

import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import type { Components } from "react-markdown";

interface MarkdownPreviewProps {
  content: string;
  className?: string;
}

/**
 * Renders markdown content with proper styling matching the blog design system.
 * Supports GFM (tables, strikethrough, task lists) and syntax highlighting.
 */
export default function MarkdownPreview({
  content,
  className = "",
}: MarkdownPreviewProps) {
  if (!content.trim()) {
    return (
      <div className={`px-5 py-12 text-center text-[#8A8E96] font-body text-sm ${className}`}>
        Nothing to preview yet. Start writing in the editor.
      </div>
    );
  }

  const components: Components = {
    h1: ({ children }) => (
      <h1 className="font-display text-3xl font-extrabold text-[#12151B] tracking-tight mt-10 mb-4 pb-3 border-b border-[#DCDDD6]">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="font-display text-2xl font-bold text-[#12151B] tracking-tight mt-8 mb-3">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="font-display text-xl font-bold text-[#12151B] mt-6 mb-2">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="font-display text-lg font-semibold text-[#12151B] mt-5 mb-2">
        {children}
      </h4>
    ),
    p: ({ children }) => (
      <p className="font-body text-base text-[#12151B] leading-[1.8] mb-5">
        {children}
      </p>
    ),
    a: ({ href, children }) => (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-[#1F3D8C] font-medium underline underline-offset-2 decoration-[#1F3D8C]/30 hover:decoration-[#1F3D8C] transition-colors"
      >
        {children}
      </a>
    ),
    strong: ({ children }) => (
      <strong className="font-semibold text-[#12151B]">{children}</strong>
    ),
    em: ({ children }) => <em className="italic text-[#585D67]">{children}</em>,
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-[#1F3D8C] pl-4 py-1 my-5 bg-[#EEF2FB]/50 rounded-r-xs">
        {children}
      </blockquote>
    ),
    ul: ({ children }) => (
      <ul className="list-disc list-outside pl-6 space-y-1.5 mb-5 font-body text-base text-[#12151B] leading-[1.7]">
        {children}
      </ul>
    ),
    ol: ({ children }) => (
      <ol className="list-decimal list-outside pl-6 space-y-1.5 mb-5 font-body text-base text-[#12151B] leading-[1.7]">
        {children}
      </ol>
    ),
    li: ({ children }) => <li className="pl-1">{children}</li>,
    code: ({ className: codeClassName, children, ...props }) => {
      // Determine if this is an inline code or a code block
      const isInline = !codeClassName;
      if (isInline) {
        return (
          <code className="font-mono text-sm bg-[#F5F6F1] border border-[#DCDDD6] px-1.5 py-0.5 rounded text-[#FF4B23]">
            {children}
          </code>
        );
      }
      return (
        <code className={`${codeClassName || ""} font-mono text-sm`} {...props}>
          {children}
        </code>
      );
    },
    pre: ({ children }) => (
      <pre className="bg-[#12151B] text-[#E8E8E8] rounded-xs p-5 overflow-x-auto my-5 text-sm leading-relaxed border border-[#12151B]">
        {children}
      </pre>
    ),
    hr: () => <hr className="border-t border-[#DCDDD6] my-8" />,
    img: ({ src, alt }) => (
      <figure className="my-6">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt || ""}
          className="w-full rounded-xs border border-[#DCDDD6] shadow-3d"
          loading="lazy"
        />
        {alt && (
          <figcaption className="mt-2 text-center font-mono text-xs text-[#8A8E96]">
            {alt}
          </figcaption>
        )}
      </figure>
    ),
    table: ({ children }) => (
      <div className="overflow-x-auto my-5 border border-[#DCDDD6] rounded-xs">
        <table className="w-full text-sm font-body">{children}</table>
      </div>
    ),
    thead: ({ children }) => (
      <thead className="bg-[#F5F6F1] border-b border-[#DCDDD6]">
        {children}
      </thead>
    ),
    th: ({ children }) => (
      <th className="px-4 py-2.5 text-left font-mono text-xs font-bold text-[#12151B] uppercase tracking-wider">
        {children}
      </th>
    ),
    td: ({ children }) => (
      <td className="px-4 py-2.5 border-t border-[#DCDDD6] text-[#585D67]">
        {children}
      </td>
    ),
  };

  return (
    <div className={`prose-container px-5 py-4 ${className}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
        components={components}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
