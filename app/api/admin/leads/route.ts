import { NextResponse } from "next/server";
import { supabase } from "../../../lib/supabase";
import type { Lead } from "../../../actions/leads";

/**
 * GET /api/admin/leads
 * Returns all leads sorted by most recent first.
 */
export async function GET() {
  try {
    const { data, error } = await supabase
      .from("leads")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching leads:", error);
      return NextResponse.json(
        { leads: [], error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ leads: (data || []) as Lead[] });
  } catch (error) {
    console.error("Error fetching leads:", error);
    return NextResponse.json(
      { leads: [], error: "Failed to fetch leads" },
      { status: 500 }
    );
  }
}

// Disable caching for admin data
export const dynamic = "force-dynamic";
