"use client";

import React, { useRef, useCallback } from "react";
import {
  Bold,
  Italic,
  Heading2,
  Heading3,
  Code,
  CodeXml,
  Quote,
  List,
  ListOrdered,
  Link,
  Image,
  Minus,
  Eye,
  EyeOff,
} from "lucide-react";

// ─── Types ──────────────────────────────────────────────────────

interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
  preview: boolean;
  onTogglePreview: () => void;
  onImageUpload: () => void;
  placeholder?: string;
  minHeight?: string;
}

// ─── Component ──────────────────────────────────────────────────

export default function MarkdownEditor({
  value,
  onChange,
  preview,
  onTogglePreview,
  onImageUpload,
  placeholder = "Start writing your article in Markdown...",
  minHeight = "500px",
}: MarkdownEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // ─── Text manipulation helpers ──────────────────────────────

  const getTextarea = useCallback(() => textareaRef.current, []);

  const replaceSelection = useCallback(
    (replacement: string, cursorOffset?: number) => {
      const el = getTextarea();
      if (!el) return;

      const start = el.selectionStart;
      const end = el.selectionEnd;
      const before = value.slice(0, start);
      const after = value.slice(end);
      const newValue = before + replacement + after;
      onChange(newValue);

      requestAnimationFrame(() => {
        el.focus();
        const pos =
          cursorOffset !== undefined
            ? start + cursorOffset
            : start + replacement.length;
        el.setSelectionRange(pos, pos);
      });
    },
    [value, onChange, getTextarea]
  );

  const wrapSelection = useCallback(
    (prefix: string, suffix: string) => {
      const el = getTextarea();
      if (!el) return;
      const text = value.slice(el.selectionStart, el.selectionEnd);
      if (text) {
        replaceSelection(
          `${prefix}${text}${suffix}`,
          prefix.length + text.length + suffix.length
        );
      } else {
        replaceSelection(`${prefix}${suffix}`, prefix.length);
      }
    },
    [value, replaceSelection, getTextarea]
  );

  const prependLine = useCallback(
    (prefix: string) => {
      const el = getTextarea();
      if (!el) return;

      const start = el.selectionStart;
      const lineStart = value.lastIndexOf("\n", start - 1) + 1;
      const before = value.slice(0, lineStart);
      const after = value.slice(lineStart);
      const newValue = before + prefix + after;
      onChange(newValue);

      requestAnimationFrame(() => {
        el.focus();
        el.setSelectionRange(start + prefix.length, start + prefix.length);
      });
    },
    [value, onChange, getTextarea]
  );

  // ─── Toolbar handlers ───────────────────────────────────────

  const handleBold = useCallback(
    () => wrapSelection("**", "**"),
    [wrapSelection]
  );
  const handleItalic = useCallback(
    () => wrapSelection("*", "*"),
    [wrapSelection]
  );
  const handleInlineCode = useCallback(
    () => wrapSelection("`", "`"),
    [wrapSelection]
  );
  const handleH2 = useCallback(() => prependLine("## "), [prependLine]);
  const handleH3 = useCallback(() => prependLine("### "), [prependLine]);
  const handleQuote = useCallback(() => prependLine("> "), [prependLine]);
  const handleUL = useCallback(() => prependLine("- "), [prependLine]);
  const handleOL = useCallback(() => prependLine("1. "), [prependLine]);
  const handleHR = useCallback(
    () => replaceSelection("\n---\n"),
    [replaceSelection]
  );

  const handleCodeBlock = useCallback(() => {
    const el = getTextarea();
    if (!el) return;
    const text = value.slice(el.selectionStart, el.selectionEnd);
    if (text) {
      replaceSelection(`\n\`\`\`\n${text}\n\`\`\`\n`);
    } else {
      replaceSelection("\n```\n\n```\n", 5);
    }
  }, [value, replaceSelection, getTextarea]);

  const handleLink = useCallback(() => {
    const el = getTextarea();
    if (!el) return;
    const text = value.slice(el.selectionStart, el.selectionEnd);
    if (text) {
      replaceSelection(`[${text}](url)`, text.length + 3);
    } else {
      replaceSelection("[link text](url)", 1);
    }
  }, [value, replaceSelection, getTextarea]);

  // ─── Keyboard shortcuts ─────────────────────────────────────

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      const isMod = e.metaKey || e.ctrlKey;

      if (isMod && e.key === "b") {
        e.preventDefault();
        handleBold();
      } else if (isMod && e.key === "i") {
        e.preventDefault();
        handleItalic();
      } else if (isMod && e.key === "k") {
        e.preventDefault();
        handleLink();
      } else if (isMod && e.key === "e") {
        e.preventDefault();
        handleInlineCode();
      } else if (isMod && e.shiftKey && e.key === "P") {
        e.preventDefault();
        onTogglePreview();
      } else if (e.key === "Tab") {
        e.preventDefault();
        replaceSelection("  ");
      }
    },
    [
      handleBold,
      handleItalic,
      handleLink,
      handleInlineCode,
      onTogglePreview,
      replaceSelection,
    ]
  );

  // ─── Render ─────────────────────────────────────────────────

  return (
    <div className="border border-[#C7C9C0] rounded-xs overflow-hidden bg-white">
      {/* Toolbar */}
      <div className="flex items-center gap-0.5 px-3 py-2 bg-[#F5F6F1] border-b border-[#DCDDD6] flex-wrap">
        <ToolbarButton icon={<Bold className="w-4 h-4" />} label="Bold (Ctrl+B)" onClick={handleBold} />
        <ToolbarButton icon={<Italic className="w-4 h-4" />} label="Italic (Ctrl+I)" onClick={handleItalic} />
        <ToolbarSeparator />
        <ToolbarButton icon={<Heading2 className="w-4 h-4" />} label="Heading 2" onClick={handleH2} />
        <ToolbarButton icon={<Heading3 className="w-4 h-4" />} label="Heading 3" onClick={handleH3} />
        <ToolbarSeparator />
        <ToolbarButton icon={<Code className="w-4 h-4" />} label="Inline Code (Ctrl+E)" onClick={handleInlineCode} />
        <ToolbarButton icon={<CodeXml className="w-4 h-4" />} label="Code Block" onClick={handleCodeBlock} />
        <ToolbarSeparator />
        <ToolbarButton icon={<Quote className="w-4 h-4" />} label="Blockquote" onClick={handleQuote} />
        <ToolbarButton icon={<List className="w-4 h-4" />} label="Bullet List" onClick={handleUL} />
        <ToolbarButton icon={<ListOrdered className="w-4 h-4" />} label="Numbered List" onClick={handleOL} />
        <ToolbarSeparator />
        <ToolbarButton icon={<Link className="w-4 h-4" />} label="Link (Ctrl+K)" onClick={handleLink} />
        <ToolbarButton icon={<Image className="w-4 h-4" />} label="Insert Image" onClick={onImageUpload} />
        <ToolbarButton icon={<Minus className="w-4 h-4" />} label="Horizontal Rule" onClick={handleHR} />

        {/* Preview toggle (right-aligned) */}
        <div className="ml-auto flex items-center gap-2">
          <button
            type="button"
            onClick={onTogglePreview}
            title={preview ? "Hide Preview (Ctrl+Shift+P)" : "Show Preview (Ctrl+Shift+P)"}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded font-mono text-[10px] font-bold uppercase tracking-wider transition-colors ${
              preview
                ? "bg-[#1F3D8C] text-white"
                : "text-[#585D67] hover:bg-[#DCDDD6] hover:text-[#12151B]"
            }`}
          >
            {preview ? (
              <>
                <EyeOff className="w-3.5 h-3.5" /> Hide Preview
              </>
            ) : (
              <>
                <Eye className="w-3.5 h-3.5" /> Preview
              </>
            )}
          </button>
        </div>
      </div>

      {/* Editor textarea */}
      {!preview && (
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          style={{ minHeight }}
          className="w-full px-5 py-4 font-mono text-sm text-[#12151B] bg-white resize-y focus:outline-none leading-relaxed placeholder:text-[#8A8E96]"
          spellCheck
        />
      )}
    </div>
  );
}

// ─── Sub-components ───────────────────────────────────────────

function ToolbarButton({
  icon,
  label,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={label}
      className="p-1.5 rounded hover:bg-[#DCDDD6] text-[#585D67] hover:text-[#12151B] transition-colors"
    >
      {icon}
    </button>
  );
}

function ToolbarSeparator() {
  return <div className="w-px h-5 bg-[#DCDDD6] mx-1.5" />;
}
