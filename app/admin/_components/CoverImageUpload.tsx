"use client";

import React, { useRef, useState, useCallback } from "react";
import { Upload, X, Loader2, ImageIcon } from "lucide-react";
import { uploadBlogImage } from "../../actions/upload";

interface CoverImageUploadProps {
  value: string; // Current cover image URL
  altText: string;
  onUrlChange: (url: string) => void;
  onAltChange: (alt: string) => void;
}

/**
 * Inline cover image uploader with preview.
 * Used in the blog editor form for the hero/OG image.
 */
export default function CoverImageUpload({
  value,
  altText,
  onUrlChange,
  onAltChange,
}: CoverImageUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);

  const handleUpload = useCallback(
    async (file: File) => {
      setError(null);

      // Validate
      const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif", "image/avif"];
      if (!allowedTypes.includes(file.type)) {
        setError("Invalid file type. Use JPEG, PNG, WebP, GIF, or AVIF.");
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        setError("File too large. Maximum 5MB.");
        return;
      }

      setUploading(true);
      try {
        const formData = new FormData();
        formData.append("file", file);
        const result = await uploadBlogImage(formData);

        if (result.success && result.url) {
          onUrlChange(result.url);
        } else {
          setError(result.error || "Upload failed.");
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Upload failed.");
      } finally {
        setUploading(false);
      }
    },
    [onUrlChange]
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleUpload(file);
  };

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragActive(false);
      const file = e.dataTransfer.files?.[0];
      if (file) handleUpload(file);
    },
    [handleUpload]
  );

  const handleRemove = () => {
    onUrlChange("");
    onAltChange("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="space-y-3">
      <label className="font-mono text-xs font-bold text-[#12151B] flex items-center gap-1.5">
        <ImageIcon className="w-3.5 h-3.5 text-[#8A8E96]" />
        Cover Image (OG / Social Card)
      </label>

      {value ? (
        <div className="space-y-2">
          <div className="relative rounded-xs overflow-hidden border border-[#DCDDD6]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={value}
              alt={altText || "Cover preview"}
              className="w-full h-40 object-cover bg-[#F5F6F1]"
            />
            <button
              type="button"
              onClick={handleRemove}
              className="absolute top-2 right-2 p-1.5 bg-white/90 rounded-full border border-[#DCDDD6] hover:bg-red-50 hover:border-red-200 transition-colors"
            >
              <X className="w-4 h-4 text-[#585D67]" />
            </button>
          </div>
          <input
            type="text"
            value={altText}
            onChange={(e) => onAltChange(e.target.value)}
            placeholder="Cover image alt text..."
            className="w-full bg-[#F5F6F1] border border-[#C7C9C0] px-3 py-2 rounded-xs font-body text-sm focus:border-[#1F3D8C] focus:outline-none"
          />
        </div>
      ) : (
        <div
          onDrop={handleDrop}
          onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
          onDragLeave={() => setDragActive(false)}
          onClick={() => fileInputRef.current?.click()}
          className={`flex items-center justify-center gap-3 p-5 border-2 border-dashed rounded-xs cursor-pointer transition-colors ${
            dragActive
              ? "border-[#1F3D8C] bg-[#EEF2FB]"
              : "border-[#DCDDD6] hover:border-[#C7C9C0] bg-[#F5F6F1]"
          }`}
        >
          {uploading ? (
            <div className="flex items-center gap-2 text-[#585D67]">
              <Loader2 className="w-5 h-5 animate-spin" />
              <span className="font-mono text-xs">Uploading...</span>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-[#585D67]">
              <Upload className="w-5 h-5" />
              <span className="font-body text-sm">
                Drop cover image or click to upload
              </span>
              <span className="font-mono text-[10px] text-[#8A8E96]">
                (5MB max)
              </span>
            </div>
          )}
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif,image/avif"
        onChange={handleInputChange}
        className="hidden"
      />

      {error && (
        <p className="font-mono text-xs text-red-600">{error}</p>
      )}
    </div>
  );
}
