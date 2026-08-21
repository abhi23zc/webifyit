"use server";

import { supabase } from "../lib/supabase";

const STORAGE_BUCKET = "blog-images";
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/avif",
];

export interface UploadResult {
  success: boolean;
  url?: string;
  error?: string;
}

/**
 * Upload an image to Supabase Storage for blog content.
 * Accepts FormData with a "file" field.
 * Returns the public URL on success.
 */
export async function uploadBlogImage(
  formData: FormData
): Promise<UploadResult> {
  try {
    const file = formData.get("file") as File | null;

    if (!file) {
      return { success: false, error: "No file provided." };
    }

    // Validate file type
    if (!ALLOWED_TYPES.includes(file.type)) {
      return {
        success: false,
        error: `Invalid file type: ${file.type}. Allowed: JPEG, PNG, WebP, GIF, AVIF.`,
      };
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      return {
        success: false,
        error: `File too large (${(file.size / 1024 / 1024).toFixed(1)}MB). Maximum: 5MB.`,
      };
    }

    // Generate a unique filename to avoid collisions
    const ext = file.name.split(".").pop()?.toLowerCase() || "png";
    const timestamp = Date.now();
    const randomSuffix = Math.random().toString(36).substring(2, 8);
    const fileName = `${timestamp}-${randomSuffix}.${ext}`;
    const filePath = `uploads/${fileName}`;

    // Convert File to ArrayBuffer for Supabase upload
    const arrayBuffer = await file.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);

    const { error: uploadError } = await supabase.storage
      .from(STORAGE_BUCKET)
      .upload(filePath, buffer, {
        contentType: file.type,
        cacheControl: "31536000", // 1 year cache
        upsert: false,
      });

    if (uploadError) {
      console.error("Supabase upload error:", uploadError);
      return { success: false, error: uploadError.message };
    }

    // Get public URL
    const { data: urlData } = supabase.storage
      .from(STORAGE_BUCKET)
      .getPublicUrl(filePath);

    if (!urlData?.publicUrl) {
      return { success: false, error: "Failed to get public URL for image." };
    }

    return { success: true, url: urlData.publicUrl };
  } catch (err) {
    console.error("Unexpected error uploading image:", err);
    return {
      success: false,
      error: err instanceof Error ? err.message : "Upload failed.",
    };
  }
}
