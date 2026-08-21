"use client";

import React, { useRef, useState, useCallback } from "react";
import { Upload, X, Loader2, ImageIcon } from "lucide-react";
import { uploadBlogImage } from "../../actions/upload";

interface ImageUploaderProps {
  /** Called with the public URL after successful upload */
  onUpload: (url: string) => void;
  /** Close the uploader dialog */
  onClose: () => void;
}

/**
 * Modal-style image uploader that handles file selection, upload to
 * Supabase Storage, and returns the public URL.
 */
export default function ImageUploader({ onUpload, onClose }: ImageUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [altText, setAltText] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);

  const handleFileSelect = useCallback((file: File) => {
    setError(null);

    // Client-side validation
    const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif", "image/avif"];
    if (!allowedTypes.includes(file.type)) {
      setError("Invalid file type. Use JPEG, PNG, WebP, GIF, or AVIF.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError("File too large. Maximum 5MB.");
      return;
    }

    setSelectedFile(file);
    // Generate local preview
    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target?.result as string);
    reader.readAsDataURL(file);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFileSelect(file);
  };

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragActive(false);
      const file = e.dataTransfer.files?.[0];
      if (file) handleFileSelect(file);
    },
    [handleFileSelect]
  );

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = () => setDragActive(false);

  const handleUpload = async () => {
    if (!selectedFile) return;

    setUploading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("file", selectedFile);

      const result = await uploadBlogImage(formData);

      if (result.success && result.url) {
        // Return markdown image syntax with alt text
        const markdown = altText
          ? `![${altText}](${result.url})`
          : `![](${result.url})`;
        onUpload(markdown);
      } else {
        setError(result.error || "Upload failed.");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed.");
    } finally {
      setUploading(false);
    }
  };

  const resetSelection = () => {
    setSelectedFile(null);
    setPreview(null);
    setAltText("");
    setError(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-xs border border-[#C7C9C0] shadow-3d w-full max-w-lg p-6 space-y-5 relative">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h3 className="font-display text-lg font-bold text-[#12151B]">
            Upload Image
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded hover:bg-[#F5F6F1] text-[#585D67] hover:text-[#12151B] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drop zone or preview */}
        {!preview ? (
          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onClick={() => fileInputRef.current?.click()}
            className={`flex flex-col items-center justify-center gap-3 p-8 border-2 border-dashed rounded-xs cursor-pointer transition-colors ${
              dragActive
                ? "border-[#1F3D8C] bg-[#EEF2FB]"
                : "border-[#DCDDD6] hover:border-[#C7C9C0] bg-[#F5F6F1]"
            }`}
          >
            <div className="w-12 h-12 rounded-full bg-[#EEF2FB] flex items-center justify-center">
              <Upload className="w-6 h-6 text-[#1F3D8C]" />
            </div>
            <div className="text-center">
              <p className="font-body text-sm font-medium text-[#12151B]">
                Drop an image here or click to browse
              </p>
              <p className="font-mono text-xs text-[#8A8E96] mt-1">
                JPEG, PNG, WebP, GIF, AVIF — Max 5MB
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="relative rounded-xs overflow-hidden border border-[#DCDDD6]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={preview}
                alt="Preview"
                className="w-full max-h-56 object-contain bg-[#F5F6F1]"
              />
              <button
                type="button"
                onClick={resetSelection}
                className="absolute top-2 right-2 p-1.5 bg-white/90 rounded-full border border-[#DCDDD6] hover:bg-red-50 hover:border-red-200 transition-colors"
              >
                <X className="w-4 h-4 text-[#585D67]" />
              </button>
            </div>

            {/* Alt text input */}
            <div className="space-y-1.5">
              <label className="font-mono text-xs font-bold text-[#12151B] flex items-center gap-1.5">
                <ImageIcon className="w-3.5 h-3.5 text-[#8A8E96]" />
                Alt Text (for accessibility & SEO)
              </label>
              <input
                type="text"
                value={altText}
                onChange={(e) => setAltText(e.target.value)}
                placeholder="Describe the image..."
                className="w-full bg-[#F5F6F1] border border-[#C7C9C0] px-3 py-2 rounded-xs font-body text-sm focus:border-[#1F3D8C] focus:outline-none"
              />
            </div>
          </div>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif,image/avif"
          onChange={handleInputChange}
          className="hidden"
        />

        {/* Error */}
        {error && (
          <p className="font-mono text-xs text-red-600 bg-red-50 border border-red-200 rounded p-2.5">
            {error}
          </p>
        )}

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 pt-2 border-t border-[#DCDDD6]">
          <button
            type="button"
            onClick={onClose}
            className="btn-ghost text-xs py-2 px-4"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleUpload}
            disabled={!selectedFile || uploading}
            className="btn-primary text-xs py-2.5 px-5 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {uploading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Uploading...
              </>
            ) : (
              <>
                <Upload className="w-4 h-4" />
                Insert Image
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
