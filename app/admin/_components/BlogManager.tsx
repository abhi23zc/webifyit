"use client";

import React, { useState, useTransition } from "react";
import { Plus, Trash, Check, Loader2, ArrowRight } from "lucide-react";
import { createPost, type BlogInput } from "../../actions/blog";

export default function BlogManager() {
  const [isPending, startTransition] = useTransition();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState<BlogInput>({
    title: "",
    slug: "",
    description: "",
    category: "",
    author_name: "Abhishek Verma",
    author_role: "Tech Lead",
    read_time: "5 min read",
    tags: [],
    content: [""],
    tech_takeaways: [""],
    related_slugs: [],
  });

  const [tagInput, setTagInput] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    // Filter out empty arrays
    const cleanData = {
      ...formData,
      content: formData.content.filter((c) => c.trim() !== ""),
      tech_takeaways: formData.tech_takeaways.filter((t) => t.trim() !== ""),
    };

    if (cleanData.content.length === 0) {
      setError("Please add at least one paragraph of content.");
      return;
    }

    startTransition(async () => {
      const res = await createPost(cleanData);
      if (res.success) {
        setSuccess(true);
        // Reset form except author details
        setFormData({
          title: "",
          slug: "",
          description: "",
          category: "",
          author_name: "Abhishek Verma",
          author_role: "Tech Lead",
          read_time: "5 min read",
          tags: [],
          content: [""],
          tech_takeaways: [""],
          related_slugs: [],
        });
      } else {
        setError(res.error || "Failed to publish blog post.");
      }
    });
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData({ ...formData, tags: [...formData.tags, tagInput.trim()] });
      setTagInput("");
    }
  };

  const handleArrayChange = (
    index: number,
    value: string,
    field: "content" | "tech_takeaways"
  ) => {
    const newArr = [...formData[field]];
    newArr[index] = value;
    setFormData({ ...formData, [field]: newArr });
  };

  const handleAddArrayItem = (field: "content" | "tech_takeaways") => {
    setFormData({ ...formData, [field]: [...formData[field], ""] });
  };

  const handleRemoveArrayItem = (
    index: number,
    field: "content" | "tech_takeaways"
  ) => {
    const newArr = formData[field].filter((_, i) => i !== index);
    setFormData({ ...formData, [field]: newArr });
  };

  return (
    <div className="bg-white border border-[#C7C9C0] p-6 rounded-xs shadow-3d">
      <div className="flex items-center justify-between border-b border-[#DCDDD6] pb-4 mb-6">
        <div>
          <h2 className="font-display text-xl font-bold text-[#12151B]">
            Publish New Blog Post
          </h2>
          <p className="font-body text-xs text-[#585D67] mt-1">
            Publishing here will save to Supabase and instantly rebuild the
            static blog pages via Server Actions.
          </p>
        </div>
      </div>

      {success && (
        <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 rounded text-emerald-800 text-sm font-semibold flex items-center gap-2">
          <Check className="w-4 h-4" />
          Blog post published successfully! The live site has been updated.
        </div>
      )}

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded text-red-800 text-sm font-semibold">
          Error: {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="font-mono text-xs font-bold text-[#12151B]">
              Article Title
            </label>
            <input
              required
              type="text"
              value={formData.title}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  title: e.target.value,
                  slug: e.target.value
                    .toLowerCase()
                    .replace(/[^a-z0-9]+/g, "-")
                    .replace(/(^-|-$)+/g, ""),
                })
              }
              className="w-full bg-[#F5F6F1] border border-[#C7C9C0] px-4 py-2.5 rounded-xs font-body text-sm focus:border-[#1F3D8C] focus:outline-none"
              placeholder="e.g. Deploying Multilingual AI Agents"
            />
          </div>

          <div className="space-y-2">
            <label className="font-mono text-xs font-bold text-[#12151B]">
              URL Slug
            </label>
            <input
              required
              type="text"
              value={formData.slug}
              onChange={(e) =>
                setFormData({ ...formData, slug: e.target.value })
              }
              className="w-full bg-[#F5F6F1] border border-[#C7C9C0] px-4 py-2.5 rounded-xs font-mono text-xs text-[#585D67]"
              placeholder="deploying-multilingual-ai"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="font-mono text-xs font-bold text-[#12151B]">
            Meta Description (max 160 chars)
          </label>
          <textarea
            required
            maxLength={160}
            rows={2}
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            className="w-full bg-[#F5F6F1] border border-[#C7C9C0] px-4 py-2.5 rounded-xs font-body text-sm"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <label className="font-mono text-xs font-bold text-[#12151B]">
              Category
            </label>
            <select
              required
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
              className="w-full bg-[#F5F6F1] border border-[#C7C9C0] px-4 py-2.5 rounded-xs font-body text-sm"
            >
              <option value="">Select Category...</option>
              <option value="AI Engineering">AI Engineering</option>
              <option value="Industrial Tech & SaaS">Industrial Tech & SaaS</option>
              <option value="Proprietary Architecture">
                Proprietary Architecture
              </option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="font-mono text-xs font-bold text-[#12151B]">
              Author Name
            </label>
            <input
              required
              type="text"
              value={formData.author_name}
              onChange={(e) =>
                setFormData({ ...formData, author_name: e.target.value })
              }
              className="w-full bg-[#F5F6F1] border border-[#C7C9C0] px-4 py-2.5 rounded-xs font-body text-sm"
            />
          </div>
          <div className="space-y-2">
            <label className="font-mono text-xs font-bold text-[#12151B]">
              Read Time
            </label>
            <input
              required
              type="text"
              value={formData.read_time}
              onChange={(e) =>
                setFormData({ ...formData, read_time: e.target.value })
              }
              className="w-full bg-[#F5F6F1] border border-[#C7C9C0] px-4 py-2.5 rounded-xs font-body text-sm"
            />
          </div>
        </div>

        {/* Tags */}
        <div className="space-y-2 border-t border-[#DCDDD6] pt-6">
          <label className="font-mono text-xs font-bold text-[#12151B]">
            SEO Tags
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleAddTag())}
              className="flex-grow bg-[#F5F6F1] border border-[#C7C9C0] px-4 py-2.5 rounded-xs font-body text-sm"
              placeholder="e.g. Next.js"
            />
            <button
              type="button"
              onClick={handleAddTag}
              className="btn-primary px-4 shadow-3d shrink-0"
            >
              Add Tag
            </button>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {formData.tags.map((tag) => (
              <span
                key={tag}
                className="bg-[#12151B] text-white font-mono text-[10px] px-2 py-1 rounded flex items-center gap-1"
              >
                {tag}
                <button
                  type="button"
                  onClick={() =>
                    setFormData({
                      ...formData,
                      tags: formData.tags.filter((t) => t !== tag),
                    })
                  }
                  className="hover:text-[#FF4B23]"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* Content Paragraphs */}
        <div className="space-y-4 border-t border-[#DCDDD6] pt-6">
          <div className="flex items-center justify-between">
            <label className="font-mono text-xs font-bold text-[#12151B]">
              Article Content (Paragraphs)
            </label>
            <button
              type="button"
              onClick={() => handleAddArrayItem("content")}
              className="text-xs font-bold text-[#1F3D8C] hover:underline flex items-center gap-1"
            >
              <Plus className="w-3 h-3" /> Add Paragraph
            </button>
          </div>
          {formData.content.map((p, idx) => (
            <div key={idx} className="flex gap-3">
              <textarea
                required
                rows={3}
                value={p}
                onChange={(e) =>
                  handleArrayChange(idx, e.target.value, "content")
                }
                className="flex-grow bg-[#F5F6F1] border border-[#C7C9C0] px-4 py-2.5 rounded-xs font-body text-sm leading-relaxed"
                placeholder={`Paragraph ${idx + 1}...`}
              />
              <button
                type="button"
                onClick={() => handleRemoveArrayItem(idx, "content")}
                className="text-red-500 hover:text-red-700 shrink-0 self-start p-2"
                disabled={formData.content.length === 1}
              >
                <Trash className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        {/* Tech Takeaways */}
        <div className="space-y-4 border-t border-[#DCDDD6] pt-6">
          <div className="flex items-center justify-between">
            <label className="font-mono text-xs font-bold text-[#12151B]">
              Key Engineering Takeaways
            </label>
            <button
              type="button"
              onClick={() => handleAddArrayItem("tech_takeaways")}
              className="text-xs font-bold text-[#1F3D8C] hover:underline flex items-center gap-1"
            >
              <Plus className="w-3 h-3" /> Add Takeaway
            </button>
          </div>
          {formData.tech_takeaways.map((t, idx) => (
            <div key={idx} className="flex gap-3 items-center">
              <span className="font-mono text-xs text-[#8A8E96] shrink-0">
                {idx + 1}.
              </span>
              <input
                required
                type="text"
                value={t}
                onChange={(e) =>
                  handleArrayChange(idx, e.target.value, "tech_takeaways")
                }
                className="flex-grow bg-[#F5F6F1] border border-[#C7C9C0] px-4 py-2 rounded-xs font-body text-sm"
              />
              <button
                type="button"
                onClick={() => handleRemoveArrayItem(idx, "tech_takeaways")}
                className="text-red-500 hover:text-red-700 shrink-0"
              >
                <Trash className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        <div className="pt-8 border-t border-[#DCDDD6] flex justify-end">
          <button
            type="submit"
            disabled={isPending}
            className="btn-primary py-3 px-8 shadow-3d flex items-center gap-2"
          >
            {isPending ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" /> Publishing...
              </>
            ) : (
              <>
                Publish Article to Database <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

// Quick helper to render X icon since it was missing from lucide import
function X({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}
