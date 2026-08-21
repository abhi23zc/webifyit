"use client";

import React, { useState, useMemo, useCallback } from "react";
import {
  Users,
  Search,
  Filter,
  ArrowUpDown,
  RefreshCw,
} from "lucide-react";
import type { Lead, LeadStatus } from "../../actions/leads";
import LeadDetailRow from "./LeadDetailRow";
import LeadExport from "./LeadExport";

// ─── Types ──────────────────────────────────────────────────────

interface LeadsCRMProps {
  initialLeads: Lead[];
  loading: boolean;
  onRefresh: () => void;
}

type SortField = "date" | "name" | "status";
type SortDir = "asc" | "desc";
type StatusFilterValue = "all" | LeadStatus;

// ─── Component ──────────────────────────────────────────────────

export default function LeadsCRM({ initialLeads, loading, onRefresh }: LeadsCRMProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilterValue>("all");
  const [sortField, setSortField] = useState<SortField>("date");
  const [sortDir, setSortDir] = useState<SortDir>("desc");

  // Local mutation tracking (optimistic updates without full refetch)
  const [statusOverrides, setStatusOverrides] = useState<Map<number, LeadStatus>>(new Map());
  const [deletedIds, setDeletedIds] = useState<Set<number>>(new Set());

  const handleStatusChange = useCallback((id: number, status: LeadStatus) => {
    setStatusOverrides((prev) => new Map(prev).set(id, status));
  }, []);

  const handleDelete = useCallback((id: number) => {
    setDeletedIds((prev) => new Set(prev).add(id));
  }, []);

  // ─── Derived leads list ─────────────────────────────────────

  const leads = useMemo(() => {
    let result = initialLeads
      .filter((l) => !deletedIds.has(l.id))
      .map((l) => ({
        ...l,
        status: statusOverrides.get(l.id) || l.status,
      }));

    // Status filter
    if (statusFilter !== "all") {
      result = result.filter((l) => l.status === statusFilter);
    }

    // Search filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (l) =>
          l.name.toLowerCase().includes(q) ||
          (l.email || "").toLowerCase().includes(q) ||
          (l.phone || "").toLowerCase().includes(q) ||
          l.service_interest.toLowerCase().includes(q) ||
          (l.business_description || "").toLowerCase().includes(q)
      );
    }

    // Sort
    result.sort((a, b) => {
      let cmp = 0;
      switch (sortField) {
        case "date":
          cmp = new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
          break;
        case "name":
          cmp = a.name.localeCompare(b.name);
          break;
        case "status":
          cmp = a.status.localeCompare(b.status);
          break;
      }
      return sortDir === "desc" ? -cmp : cmp;
    });

    return result;
  }, [initialLeads, deletedIds, statusOverrides, statusFilter, searchQuery, sortField, sortDir]);

  const toggleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDir((d) => (d === "desc" ? "asc" : "desc"));
    } else {
      setSortField(field);
      setSortDir("desc");
    }
  };

  // ─── Stats ──────────────────────────────────────────────────

  const activeLeads = initialLeads.filter((l) => !deletedIds.has(l.id));
  const stats = {
    total: activeLeads.length,
    new: activeLeads.filter((l) => (statusOverrides.get(l.id) || l.status) === "new").length,
    inProgress: activeLeads.filter(
      (l) => (statusOverrides.get(l.id) || l.status) === "in_progress"
    ).length,
    closed: activeLeads.filter((l) => (statusOverrides.get(l.id) || l.status) === "closed").length,
  };

  // ─── Render ─────────────────────────────────────────────────

  return (
    <div className="space-y-6">
      {/* Stats bar */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white border border-[#C7C9C0] rounded-xs p-4 xmark">
          <div className="font-mono text-[10px] text-[#8A8E96] uppercase">Total Leads</div>
          <div className="font-display text-2xl font-bold text-[#12151B] mt-1">
            {stats.total}
          </div>
        </div>
        <div className="bg-white border border-[#C7C9C0] rounded-xs p-4 xmark">
          <div className="font-mono text-[10px] text-[#8A8E96] uppercase">New</div>
          <div className="font-display text-2xl font-bold text-blue-600 mt-1">{stats.new}</div>
        </div>
        <div className="bg-white border border-[#C7C9C0] rounded-xs p-4 xmark">
          <div className="font-mono text-[10px] text-[#8A8E96] uppercase">In Progress</div>
          <div className="font-display text-2xl font-bold text-purple-600 mt-1">
            {stats.inProgress}
          </div>
        </div>
        <div className="bg-white border border-[#C7C9C0] rounded-xs p-4 xmark">
          <div className="font-mono text-[10px] text-[#8A8E96] uppercase">Closed</div>
          <div className="font-display text-2xl font-bold text-emerald-600 mt-1">
            {stats.closed}
          </div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
        {/* Search */}
        <div className="relative flex-grow w-full sm:w-auto">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8A8E96]" />
          <input
            type="text"
            placeholder="Search leads..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white border border-[#C7C9C0] pl-9 pr-4 py-2 text-sm rounded-xs font-body text-[#12151B] focus:border-[#1F3D8C] focus:outline-none"
          />
        </div>

        {/* Status filter */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <Filter className="w-3.5 h-3.5 text-[#8A8E96]" />
          {(["all", "new", "contacted", "in_progress", "closed"] as StatusFilterValue[]).map(
            (status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`font-mono text-[10px] px-2.5 py-1.5 rounded-xs border font-bold uppercase transition-colors ${
                  statusFilter === status
                    ? "bg-[#12151B] text-white border-[#12151B]"
                    : "bg-white text-[#585D67] border-[#C7C9C0] hover:border-[#12151B]"
                }`}
              >
                {status === "in_progress" ? "In Progress" : status}
              </button>
            )
          )}
        </div>

        {/* Sort */}
        <div className="flex items-center gap-1.5">
          <ArrowUpDown className="w-3.5 h-3.5 text-[#8A8E96]" />
          {([
            { field: "date" as SortField, label: "Date" },
            { field: "name" as SortField, label: "Name" },
          ]).map(({ field, label }) => (
            <button
              key={field}
              onClick={() => toggleSort(field)}
              className={`font-mono text-[10px] px-2 py-1.5 rounded-xs border font-bold transition-colors ${
                sortField === field
                  ? "bg-[#1F3D8C] text-white border-[#1F3D8C]"
                  : "bg-white text-[#585D67] border-[#C7C9C0] hover:border-[#1F3D8C]"
              }`}
            >
              {label} {sortField === field && (sortDir === "desc" ? "↓" : "↑")}
            </button>
          ))}
        </div>

        {/* Refresh + Export */}
        <div className="flex items-center gap-2 ml-auto">
          <button
            type="button"
            onClick={onRefresh}
            disabled={loading}
            className="btn-ghost text-xs py-2 px-3"
            title="Refresh"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
          </button>
          <LeadExport leads={leads} />
        </div>
      </div>

      {/* Results count */}
      <div className="font-mono text-[10px] text-[#8A8E96] uppercase tracking-wider">
        Showing {leads.length} of {activeLeads.length} leads
        {searchQuery && ` matching "${searchQuery}"`}
      </div>

      {/* Leads list */}
      {loading ? (
        <div className="flex items-center justify-center py-16 text-[#8A8E96]">
          <RefreshCw className="w-5 h-5 animate-spin mr-2" />
          <span className="font-mono text-xs">Loading leads...</span>
        </div>
      ) : leads.length === 0 ? (
        <div className="text-center py-16 bg-white border border-[#DCDDD6] rounded-xs">
          <Users className="w-12 h-12 text-[#8A8E96] mx-auto mb-4" />
          <p className="font-display text-lg font-bold text-[#12151B] mb-1">
            {activeLeads.length === 0 ? "No leads yet" : "No leads match your filters"}
          </p>
          <p className="font-body text-sm text-[#585D67]">
            {activeLeads.length === 0
              ? "Leads submitted via the website form will appear here."
              : "Try adjusting your search or status filter."}
          </p>
        </div>
      ) : (
        <div className="border border-[#C7C9C0] rounded-xs overflow-hidden bg-white">
          {leads.map((lead) => (
            <LeadDetailRow
              key={lead.id}
              lead={lead}
              onStatusChange={handleStatusChange}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}
