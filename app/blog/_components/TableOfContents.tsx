"use client";

import React, { useState, useEffect } from "react";
import { List } from "lucide-react";

interface TocItem {
  id: string;
  text: string;
  level: 2 | 3;
}

interface TableOfContentsProps {
  markdown: string;
}

/**
 * Auto-generated Table of Contents from markdown headings.
 * Shows H2 and H3 headings with scroll-spy active state.
 */
export default function TableOfContents({ markdown }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");

  // Parse headings from markdown
  const headings: TocItem[] = React.useMemo(() => {
    if (!markdown) return [];
    const lines = markdown.split("\n");
    const items: TocItem[] = [];

    for (const line of lines) {
      const h2Match = line.match(/^##\s+(.+)$/);
      const h3Match = line.match(/^###\s+(.+)$/);

      if (h2Match) {
        const text = h2Match[1].replace(/[*_`\[\]]/g, "").trim();
        const id = text
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, "");
        items.push({ id, text, level: 2 });
      } else if (h3Match) {
        const text = h3Match[1].replace(/[*_`\[\]]/g, "").trim();
        const id = text
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, "");
        items.push({ id, text, level: 3 });
      }
    }
    return items;
  }, [markdown]);

  // Scroll spy: track which heading is currently in view
  useEffect(() => {
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Find the first visible heading
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
            break;
          }
        }
      },
      {
        rootMargin: "-80px 0px -60% 0px",
        threshold: 0,
      }
    );

    const elements = headings
      .map((h) => document.getElementById(h.id))
      .filter(Boolean) as HTMLElement[];

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length < 3) return null; // Don't show TOC for short articles

  return (
    <nav
      className="border border-[#DCDDD6] rounded-xs p-5 bg-white"
      aria-label="Table of contents"
    >
      <div className="flex items-center gap-2 mb-3 font-mono text-[10px] font-bold text-[#8A8E96] uppercase tracking-wider">
        <List className="w-3.5 h-3.5" />
        In This Article
      </div>
      <ul className="space-y-1">
        {headings.map((heading) => (
          <li key={heading.id}>
            <a
              href={`#${heading.id}`}
              onClick={(e) => {
                e.preventDefault();
                const el = document.getElementById(heading.id);
                if (el) {
                  el.scrollIntoView({ behavior: "smooth", block: "start" });
                  setActiveId(heading.id);
                }
              }}
              className={`block text-sm py-1 transition-colors ${
                heading.level === 3 ? "pl-4" : "pl-0"
              } ${
                activeId === heading.id
                  ? "text-[#1F3D8C] font-semibold border-l-2 border-[#1F3D8C] pl-3"
                  : "text-[#585D67] hover:text-[#12151B] border-l-2 border-transparent pl-3"
              }`}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
