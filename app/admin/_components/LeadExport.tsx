"use client";

import React from "react";
import { Download } from "lucide-react";
import type { Lead } from "../../actions/leads";

interface LeadExportProps {
  leads: Lead[];
}

/**
 * Exports the given leads to a CSV file and triggers a browser download.
 */
export default function LeadExport({ leads }: LeadExportProps) {
  const handleExport = () => {
    if (leads.length === 0) return;

    const headers = [
      "ID",
      "Name",
      "Email",
      "Phone",
      "Service Interest",
      "Description",
      "Source",
      "Status",
      "Notes",
      "Submitted At",
    ];

    const escapeCsvField = (field: string | null | undefined): string => {
      if (field == null) return "";
      const str = String(field);
      // Escape quotes and wrap in quotes if contains comma, quote, or newline
      if (/[",\n]/.test(str)) {
        return `"${str.replace(/"/g, '""')}"`;
      }
      return str;
    };

    const rows = leads.map((lead) => [
      lead.id,
      escapeCsvField(lead.name),
      escapeCsvField(lead.email),
      escapeCsvField(lead.phone),
      escapeCsvField(lead.service_interest),
      escapeCsvField(lead.business_description),
      escapeCsvField(lead.source),
      escapeCsvField(lead.status),
      escapeCsvField(lead.notes),
      escapeCsvField(lead.created_at),
    ]);

    const csvContent = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");

    // Add BOM for Excel UTF-8 compatibility
    const blob = new Blob(["\uFEFF" + csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    const timestamp = new Date().toISOString().split("T")[0];

    link.href = url;
    link.download = `leads-export-${timestamp}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <button
      type="button"
      onClick={handleExport}
      disabled={leads.length === 0}
      className="btn-secondary text-xs py-2 px-3 flex items-center gap-1.5 disabled:opacity-50 disabled:cursor-not-allowed"
      title="Export leads to CSV"
    >
      <Download className="w-3.5 h-3.5" />
      <span>Export CSV</span>
    </button>
  );
}
