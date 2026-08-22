"use server";

import { revalidatePath } from "next/cache";
import { supabase } from "../lib/supabase";
import { requireAuth } from "../lib/auth";

// ─── Types ──────────────────────────────────────────────────────

export type LeadStatus = "new" | "contacted" | "in_progress" | "closed";

export interface LeadInput {
  name: string;
  email?: string;
  phone?: string;
  business_description?: string;
  service_interest: string;
  source?: string;
}

export interface Lead {
  id: number;
  name: string;
  email: string | null;
  phone: string | null;
  business_description: string | null;
  service_interest: string;
  source: string;
  status: LeadStatus;
  notes: string | null;
  created_at: string;
}

export type ActionResult = {
  success: boolean;
  error?: string;
};

// ─── Public Form Submission ─────────────────────────────────────

export async function submitLead(data: LeadInput): Promise<ActionResult> {
  try {
    const { error } = await supabase.from("leads").insert([
      {
        name: data.name,
        email: data.email || null,
        phone: data.phone || null,
        business_description: data.business_description || null,
        service_interest: data.service_interest,
        source: data.source || "Website Form",
        status: "new",
      },
    ]);

    if (error) {
      console.error("Error saving lead:", error);
      return { success: false, error: error.message };
    }

    revalidatePath("/admin");
    return { success: true };
  } catch (err) {
    console.error("Unexpected error saving lead:", err);
    return {
      success: false,
      error: err instanceof Error ? err.message : "Failed to submit.",
    };
  }
}

// ─── Admin CRM Actions ───────────────────────────────────────────

export async function updateLeadStatus(
  id: number,
  status: LeadStatus
): Promise<ActionResult> {
  try {
    await requireAuth();

    const { error } = await supabase
      .from("leads")
      .update({ status })
      .eq("id", id);

    if (error) {
      console.error("Error updating lead status:", error);
      return { success: false, error: error.message };
    }

    revalidatePath("/admin");
    return { success: true };
  } catch (err) {
    console.error("Unexpected error updating lead status:", err);
    return {
      success: false,
      error: err instanceof Error ? err.message : "Unknown error",
    };
  }
}

export async function updateLeadNotes(
  id: number,
  notes: string
): Promise<ActionResult> {
  try {
    await requireAuth();

    const { error } = await supabase
      .from("leads")
      .update({ notes })
      .eq("id", id);

    if (error) {
      console.error("Error updating lead notes:", error);
      return { success: false, error: error.message };
    }

    revalidatePath("/admin");
    return { success: true };
  } catch (err) {
    console.error("Unexpected error updating lead notes:", err);
    return {
      success: false,
      error: err instanceof Error ? err.message : "Unknown error",
    };
  }
}

export async function deleteLead(id: number): Promise<ActionResult> {
  try {
    await requireAuth();

    const { error } = await supabase.from("leads").delete().eq("id", id);

    if (error) {
      console.error("Error deleting lead:", error);
      return { success: false, error: error.message };
    }

    revalidatePath("/admin");
    return { success: true };
  } catch (err) {
    console.error("Unexpected error deleting lead:", err);
    return {
      success: false,
      error: err instanceof Error ? err.message : "Unknown error",
    };
  }
}
