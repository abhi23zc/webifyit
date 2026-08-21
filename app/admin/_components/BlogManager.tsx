"use client";

import React, { useState, useTransition, useCallback, useEffect } from "react";
import {
  ArrowRight,
  Loader2,
  Save,
  Send,
  FileText,
  Tag,
  Hash,
  Clock,
  AlertTriangle,
  Calendar,
} from "lucide-react";
import { createPost, updatePost, type BlogInput } from "../../actions/blog";
import { countWords, calculateReadTime } from "../../lib/blog-data";
import { useToast } from "./Toast";
import MarkdownEditor from "./MarkdownEditor";
import MarkdownPreview from "./MarkdownPreview";
import ImageUploader from "./ImageUploader";
import CoverImageUpload from "./CoverImageUpload";
import RelatedPostsPicker from "./RelatedPostsPicker";

// ─── Types ──────────────────────────────────────────────────────

interface BlogFormData {
  title: string;
  slug: string;
  description: string;
  category: string;
  customCategory: string;
  tags: string[];
  author_name: string;
  author_role: string;
  cover_image_url: string;
  cover_image_alt: string;
  content_markdown: string;
  tech_takeaways: string[];
  related_slugs: string[];
  status: "draft" | "published" | "scheduled";
  scheduled_date: string;
}

interface BlogManagerProps {
  /** If provided, the editor is in "edit" mode for this post. */
  editSlug?: string;
  initialData?: Partial<BlogFormData>;
  onSaved?: () => void;
}

const CATEGORIES = [
  "Technology",
  "Business",
  "Design",
  "Tutorials",
  "Case Studies",
  "Product Updates",
  "Industry Insights",
  "AI & Automation",
  "Web Development",
  "Mobile",
];

const INITIAL_FORM: BlogFormData = {
  title: "",
  slug: "",
  description: "",
  category: "",
  customCategory: "",
  tags: [],
  author_name: "Abhishek Verma",
  author_role: "Tech Lead",
  cover_image_url: "",
  cover_image_alt: "",
  content_markdown: "",
  tech_takeaways: [""],
  related_slugs: [],
  status: "draft",
  scheduled_date: "",
};

// ─── Component ──────────────────────────────────────────────────

export default function BlogManager({
  editSlug,
  initialData,
  onSaved,
}: BlogManagerProps) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [showImageUploader, setShowImageUploader] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [tagInput, setTagInput] = useState("");
  const { showToast } = useToast();

  const [form, setForm] = useState<BlogFormData>(() => ({
    ...INITIAL_FORM,
    ...initialData,
  }));

  // Derived stats
  const wordCount = countWords(form.content_markdown);
  const readTime = calculateReadTime(wordCount);

  // Track unsaved changes
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasUnsavedChanges) {
        e.preventDefault();
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [hasUnsavedChanges]);

  // ─── Form update helper ───────────────────────────────────────

  const updateForm = useCallback(
    <K extends keyof BlogFormData>(key: K, value: BlogFormData[K]) => {
      setForm((prev) => ({ ...prev, [key]: value }));
      setHasUnsavedChanges(true);

    },
    []
  );

  // Auto-generate slug from title
  const handleTitleChange = useCallback(
    (title: string) => {
      const slug = title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "");
      setForm((prev) => ({ ...prev, title, slug }));
      setHasUnsavedChanges(true);

    },
    []
  );

  // ─── Tag management ───────────────────────────────────────────

  const addTag = useCallback(() => {
    const tag = tagInput.trim();
    if (tag && !form.tags.includes(tag)) {
      updateForm("tags", [...form.tags, tag]);
      setTagInput("");
    }
  }, [tagInput, form.tags, updateForm]);

  const removeTag = useCallback(
    (tag: string) => {
      updateForm(
        "tags",
        form.tags.filter((t) => t !== tag)
      );
    },
    [form.tags, updateForm]
  );

  // ─── Takeaway management ──────────────────────────────────────

  const updateTakeaway = useCallback(
    (index: number, value: string) => {
      const updated = [...form.tech_takeaways];
      updated[index] = value;
      updateForm("tech_takeaways", updated);
    },
    [form.tech_takeaways, updateForm]
  );

  const addTakeaway = useCallback(() => {
    updateForm("tech_takeaways", [...form.tech_takeaways, ""]);
  }, [form.tech_takeaways, updateForm]);

  const removeTakeaway = useCallback(
    (index: number) => {
      updateForm(
        "tech_takeaways",
        form.tech_takeaways.filter((_, i) => i !== index)
      );
    },
    [form.tech_takeaways, updateForm]
  );

  // ─── Image upload handler ─────────────────────────────────────

  const handleImageInsert = useCallback(
    (markdown: string) => {
      // Insert the image markdown at the end of content (or at cursor if we had ref)
      updateForm(
        "content_markdown",
        form.content_markdown + "\n\n" + markdown + "\n"
      );
      setShowImageUploader(false);
    },
    [form.content_markdown, updateForm]
  );

  // ─── Form submission ──────────────────────────────────────────

  const handleSubmit = useCallback(
    (publishStatus: "draft" | "published") => {
      setError(null);


      // Validation
      if (!form.title.trim()) {
        setError("Title is required.");
        return;
      }
      if (!form.slug.trim()) {
        setError("Slug is required.");
        return;
      }
      if (!form.description.trim()) {
        setError("Meta description is required.");
        return;
      }
      if (!form.category && !form.customCategory) {
        setError("Category is required.");
        return;
      }
      if (!form.content_markdown.trim()) {
        setError("Article content is required.");
        return;
      }

      const category = form.customCategory || form.category;
      const takeaways = form.tech_takeaways.filter((t) => t.trim());

      const payload: BlogInput = {
        slug: form.slug,
        title: form.title,
        description: form.description,
        category,
        tags: form.tags,
        author_name: form.author_name,
        author_role: form.author_role,
        cover_image_url: form.cover_image_url || undefined,
        cover_image_alt: form.cover_image_alt || undefined,
        content_markdown: form.content_markdown,
        tech_takeaways: takeaways,
        related_slugs: form.related_slugs,
        status: publishStatus,
        scheduled_date: form.scheduled_date || undefined,
      };

      startTransition(async () => {
        const result = editSlug
          ? await updatePost(editSlug, payload)
          : await createPost(payload);

        if (result.success) {
          setHasUnsavedChanges(false);
          showToast(
            editSlug
              ? "Article updated successfully!"
              : publishStatus === "draft"
              ? "Draft saved."
              : "Article published!",
            "success"
          );
          if (!editSlug) {
            setForm(INITIAL_FORM);
          }
          onSaved?.();
        } else {
          setError(result.error || "Failed to save post.");
          showToast(result.error || "Failed to save post.", "error");
        }
      });
    },
    [form, editSlug, onSaved, showToast]
  );

  // ─── Render ─────────────────────────────────────────────────

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#DCDDD6] pb-4">
        <div>
          <h2 className="font-display text-xl font-bold text-[#12151B]">
            {editSlug ? "Edit Article" : "Compose New Article"}
          </h2>
          <p className="font-body text-xs text-[#585D67] mt-1">
            Write in Markdown. Preview renders exactly as the live blog.
          </p>
        </div>

        {/* Live stats */}
        <div className="flex items-center gap-4 font-mono text-xs text-[#8A8E96]">
          <span className="flex items-center gap-1">
            <Hash className="w-3.5 h-3.5" />
            {wordCount.toLocaleString()} words
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            {readTime}
          </span>
          {hasUnsavedChanges && (
            <span className="flex items-center gap-1 text-[#FF4B23]">
              <AlertTriangle className="w-3.5 h-3.5" />
              Unsaved
            </span>
          )}
        </div>
      </div>

      {/* Error message */}
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-xs text-red-800 text-sm font-semibold">
          {error}
        </div>
      )}

      {/* ─── FORM ─────────────────────────────────────────── */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit("published");
        }}
        className="space-y-8"
      >
        {/* ── Section: Meta ──────────────────────────────── */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Title */}
          <div className="space-y-1.5 lg:col-span-2">
            <label className="font-mono text-xs font-bold text-[#12151B]">
              Article Title *
            </label>
            <input
              type="text"
              required
              value={form.title}
              onChange={(e) => handleTitleChange(e.target.value)}
              className="w-full bg-[#F5F6F1] border border-[#C7C9C0] px-4 py-3 rounded-xs font-display text-lg font-bold text-[#12151B] focus:border-[#1F3D8C] focus:outline-none placeholder:font-normal placeholder:text-[#8A8E96]"
              placeholder="e.g. How We Built a Real-Time Order System for 50+ Restaurants"
            />
          </div>

          {/* Slug */}
          <div className="space-y-1.5">
            <label className="font-mono text-xs font-bold text-[#12151B]">
              URL Slug *
            </label>
            <div className="flex items-center gap-0 bg-[#F5F6F1] border border-[#C7C9C0] rounded-xs overflow-hidden focus-within:border-[#1F3D8C]">
              <span className="font-mono text-xs text-[#8A8E96] pl-3 shrink-0">
                /blog/
              </span>
              <input
                type="text"
                required
                value={form.slug}
                onChange={(e) => updateForm("slug", e.target.value)}
                className="flex-grow bg-transparent px-1 py-2.5 font-mono text-sm text-[#12151B] focus:outline-none"
              />
            </div>
          </div>

          {/* Category */}
          <div className="space-y-1.5">
            <label className="font-mono text-xs font-bold text-[#12151B]">
              Category *
            </label>
            <select
              value={form.category}
              onChange={(e) => {
                updateForm("category", e.target.value);
                if (e.target.value) updateForm("customCategory", "");
              }}
              className="w-full bg-[#F5F6F1] border border-[#C7C9C0] px-4 py-2.5 rounded-xs font-body text-sm text-[#12151B] focus:border-[#1F3D8C] focus:outline-none"
            >
              <option value="">Select or type custom...</option>
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            {!form.category && (
              <input
                type="text"
                value={form.customCategory}
                onChange={(e) => updateForm("customCategory", e.target.value)}
                placeholder="Custom category name"
                className="w-full bg-[#F5F6F1] border border-[#C7C9C0] px-4 py-2 rounded-xs font-body text-sm mt-1.5 focus:border-[#1F3D8C] focus:outline-none"
              />
            )}
          </div>

          {/* Description */}
          <div className="space-y-1.5 lg:col-span-2">
            <label className="font-mono text-xs font-bold text-[#12151B] flex items-center justify-between">
              <span>Meta Description * (SEO)</span>
              <span
                className={`font-normal ${
                  form.description.length > 160
                    ? "text-red-500"
                    : "text-[#8A8E96]"
                }`}
              >
                {form.description.length}/160
              </span>
            </label>
            <textarea
              required
              maxLength={200}
              rows={2}
              value={form.description}
              onChange={(e) => updateForm("description", e.target.value)}
              className="w-full bg-[#F5F6F1] border border-[#C7C9C0] px-4 py-2.5 rounded-xs font-body text-sm text-[#12151B] focus:border-[#1F3D8C] focus:outline-none resize-none"
              placeholder="Concise summary for search engines and social cards..."
            />
          </div>
        </section>

        {/* ── Section: Author & Cover ────────────────────── */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 border-t border-[#DCDDD6] pt-6">
          <div className="space-y-1.5">
            <label className="font-mono text-xs font-bold text-[#12151B]">
              Author Name
            </label>
            <input
              type="text"
              value={form.author_name}
              onChange={(e) => updateForm("author_name", e.target.value)}
              className="w-full bg-[#F5F6F1] border border-[#C7C9C0] px-4 py-2.5 rounded-xs font-body text-sm focus:border-[#1F3D8C] focus:outline-none"
            />
          </div>
          <div className="space-y-1.5">
            <label className="font-mono text-xs font-bold text-[#12151B]">
              Author Role
            </label>
            <input
              type="text"
              value={form.author_role}
              onChange={(e) => updateForm("author_role", e.target.value)}
              className="w-full bg-[#F5F6F1] border border-[#C7C9C0] px-4 py-2.5 rounded-xs font-body text-sm focus:border-[#1F3D8C] focus:outline-none"
            />
          </div>
          <div className="space-y-1.5">
            <label className="font-mono text-xs font-bold text-[#12151B]">
              Status
            </label>
            <select
              value={form.status}
              onChange={(e) =>
                updateForm("status", e.target.value as BlogFormData["status"])
              }
              className="w-full bg-[#F5F6F1] border border-[#C7C9C0] px-4 py-2.5 rounded-xs font-body text-sm text-[#12151B] focus:border-[#1F3D8C] focus:outline-none"
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
              <option value="scheduled">Scheduled</option>
            </select>
          </div>

          {/* Cover Image */}
          <div className="lg:col-span-3">
            <CoverImageUpload
              value={form.cover_image_url}
              altText={form.cover_image_alt}
              onUrlChange={(url) => updateForm("cover_image_url", url)}
              onAltChange={(alt) => updateForm("cover_image_alt", alt)}
            />
          </div>
        </section>

        {/* ── Section: Tags ──────────────────────────────── */}
        <section className="border-t border-[#DCDDD6] pt-6 space-y-3">
          <label className="font-mono text-xs font-bold text-[#12151B] flex items-center gap-1.5">
            <Tag className="w-3.5 h-3.5 text-[#8A8E96]" />
            SEO Tags
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addTag();
                }
              }}
              className="flex-grow bg-[#F5F6F1] border border-[#C7C9C0] px-4 py-2.5 rounded-xs font-body text-sm focus:border-[#1F3D8C] focus:outline-none"
              placeholder="Type a tag and press Enter..."
            />
            <button
              type="button"
              onClick={addTag}
              className="btn-secondary text-xs py-2 px-4 shrink-0"
            >
              Add
            </button>
          </div>
          {form.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {form.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1.5 bg-[#12151B] text-white font-mono text-[11px] px-2.5 py-1 rounded"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => removeTag(tag)}
                    className="hover:text-[#FF4B23] transition-colors"
                    aria-label={`Remove tag: ${tag}`}
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          )}
        </section>

        {/* ── Section: Content Editor ────────────────────── */}
        <section className="border-t border-[#DCDDD6] pt-6 space-y-3">
          <label className="font-mono text-xs font-bold text-[#12151B] flex items-center gap-1.5">
            <FileText className="w-3.5 h-3.5 text-[#8A8E96]" />
            Article Content (Markdown) *
          </label>

          <MarkdownEditor
            value={form.content_markdown}
            onChange={(val) => updateForm("content_markdown", val)}
            preview={showPreview}
            onTogglePreview={() => setShowPreview((p) => !p)}
            onImageUpload={() => setShowImageUploader(true)}
            minHeight="500px"
          />

          {/* Preview panel (rendered below editor when active) */}
          {showPreview && (
            <div className="border border-[#C7C9C0] rounded-xs bg-white overflow-hidden">
              <div className="px-4 py-2 bg-[#EEF2FB] border-b border-[#DCDDD6] font-mono text-[10px] font-bold text-[#1F3D8C] uppercase tracking-wider">
                Live Preview
              </div>
              <MarkdownPreview
                content={form.content_markdown}
                className="max-h-[600px] overflow-y-auto"
              />
            </div>
          )}
        </section>

        {/* ── Section: Tech Takeaways ────────────────────── */}
        <section className="border-t border-[#DCDDD6] pt-6 space-y-3">
          <div className="flex items-center justify-between">
            <label className="font-mono text-xs font-bold text-[#12151B]">
              Key Points (optional)
            </label>
            <button
              type="button"
              onClick={addTakeaway}
              className="font-mono text-xs font-bold text-[#1F3D8C] hover:underline"
            >
              + Add Point
            </button>
          </div>
          <div className="space-y-2">
            {form.tech_takeaways.map((takeaway, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <span className="font-mono text-xs text-[#8A8E96] w-5 shrink-0">
                  {idx + 1}.
                </span>
                <input
                  type="text"
                  value={takeaway}
                  onChange={(e) => updateTakeaway(idx, e.target.value)}
                  className="flex-grow bg-[#F5F6F1] border border-[#C7C9C0] px-3 py-2 rounded-xs font-body text-sm focus:border-[#1F3D8C] focus:outline-none"
                  placeholder="e.g. Reduced page load time by 60% with edge caching"
                />
                {form.tech_takeaways.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeTakeaway(idx)}
                    className="text-[#8A8E96] hover:text-red-500 transition-colors p-1"
                    aria-label="Remove takeaway"
                  >
                    ×
                  </button>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* ── Section: Related Posts ─────────────────────── */}
        <section className="border-t border-[#DCDDD6] pt-6">
          <RelatedPostsPicker
            selectedSlugs={form.related_slugs}
            currentSlug={editSlug}
            onChange={(slugs) => updateForm("related_slugs", slugs)}
          />
        </section>

        {/* ── Section: Scheduled Date ────────────────────── */}
        {form.status === "scheduled" && (
          <section className="border-t border-[#DCDDD6] pt-6 space-y-2">
            <label className="font-mono text-xs font-bold text-[#12151B] flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-[#8A8E96]" />
              Scheduled Publish Date
            </label>
            <input
              type="datetime-local"
              value={form.scheduled_date}
              onChange={(e) => updateForm("scheduled_date", e.target.value)}
              className="w-full sm:w-72 bg-[#F5F6F1] border border-[#C7C9C0] px-4 py-2.5 rounded-xs font-mono text-sm text-[#12151B] focus:border-[#1F3D8C] focus:outline-none"
            />
            <p className="font-mono text-[10px] text-[#8A8E96]">
              Post will be automatically visible after this date.
            </p>
          </section>
        )}

        {/* ── Section: Actions ────────────────────────────── */}
        <section className="border-t border-[#DCDDD6] pt-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          <p className="font-mono text-[10px] text-[#8A8E96] uppercase">
            Read time & word count are auto-calculated on save.
          </p>

          <div className="flex items-center gap-3">
            {/* Save as Draft */}
            <button
              type="button"
              onClick={() => handleSubmit("draft")}
              disabled={isPending}
              className="btn-secondary text-xs py-2.5 px-5 flex items-center gap-2"
            >
              {isPending ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Save className="w-4 h-4" />
              )}
              Save Draft
            </button>

            {/* Publish */}
            <button
              type="submit"
              disabled={isPending}
              className="btn-primary text-xs py-2.5 px-6 flex items-center gap-2 shadow-3d-accent"
            >
              {isPending ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  {editSlug ? "Update & Publish" : "Publish Article"}
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </section>
      </form>

      {/* Image Uploader Modal */}
      {showImageUploader && (
        <ImageUploader
          onUpload={handleImageInsert}
          onClose={() => setShowImageUploader(false)}
        />
      )}
    </div>
  );
}
