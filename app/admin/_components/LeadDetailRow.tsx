"use client";

import React, { useState, useTransition, useCallback } from "react";
import {
  ChevronDown,
  ChevronUp,
  Mail,
  Phone,
  MessageCircle,
  Copy,
  Check,
  Trash2,
  Loader2,
  Calendar,
  Tag,
  StickyNote,
} from "lucide-react";
import { updateLeadStatus, updateLeadNotes, deleteLead, type Lead, type LeadStatus } from "../../actions/leads";
import { useToast } from "./Toast";

// ─── Constants ────────────────────────────────────────────────

const STATUS_CONFIG: Record<LeadStatus, { label: string; color: string }> = {
  new: { label: "New", color: "bg-blue-50 border-blue-200 text-blue-700" },
  contacted: { label: "Contacted", color: "bg-amber-50 border-amber-200 text-amber-700" },
  in_progress: { label: "In Progress", color: "bg-purple-50 border-purple-200 text-purple-700" },
  closed: { label: "Closed", color: "bg-emerald-50 border-emerald-200 text-emerald-700" },
};

interface LeadDetailRowProps {
  lead: Lead;
  onStatusChange: (id: number, status: LeadStatus) => void;
  onDelete: (id: number) => void;
}

// ─── Component ──────────────────────────────────────────────────

export default function LeadDetailRow({ lead, onStatusChange, onDelete }: LeadDetailRowProps) {
  const { showToast } = useToast();
  const [expanded, setExpanded] = useState(false);
  const [notes, setNotes] = useState(lead.notes || "");
  const [notesDirty, setNotesDirty] = useState(false);
  const [copied, setCopied] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [isPending, startTransition] = useTransition();

  const statusConfig = STATUS_CONFIG[lead.status];

  const handleStatusChange = useCallback(
    (newStatus: LeadStatus) => {
      startTransition(async () => {
        const result = await updateLeadStatus(lead.id, newStatus);
        if (result.success) {
          onStatusChange(lead.id, newStatus);
          showToast(`Status updated to "${STATUS_CONFIG[newStatus].label}"`, "success");
        } else {
          showToast(result.error || "Failed to update status.", "error");
        }
      });
    },
    [lead.id, onStatusChange, showToast]
  );

  const handleSaveNotes = useCallback(() => {
    if (!notesDirty) return;
    startTransition(async () => {
      const result = await updateLeadNotes(lead.id, notes);
      if (result.success) {
        setNotesDirty(false);
        showToast("Notes saved.", "success");
      } else {
        showToast(result.error || "Failed to save notes.", "error");
      }
    });
  }, [lead.id, notes, notesDirty, showToast]);

  const handleDelete = useCallback(() => {
    startTransition(async () => {
      const result = await deleteLead(lead.id);
      if (result.success) {
        onDelete(lead.id);
        showToast("Lead deleted.", "success");
      } else {
        showToast(result.error || "Failed to delete lead.", "error");
      }
      setConfirmDelete(false);
    });
  }, [lead.id, onDelete, showToast]);

  const handleCopyContact = useCallback(() => {
    const contact = lead.phone || lead.email || "";
    navigator.clipboard.writeText(contact);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [lead.phone, lead.email]);

  const whatsappUrl = lead.phone
    ? `https://wa.me/${lead.phone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
        `Hi ${lead.name}, thanks for reaching out about ${lead.service_interest}! `
      )}`
    : null;

  const mailtoUrl = lead.email
    ? `mailto:${lead.email}?subject=${encodeURIComponent(
        `Re: Your inquiry about ${lead.service_interest}`
      )}`
    : null;

  const formattedDate = new Date(lead.created_at).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="border-b border-[#DCDDD6] last:border-b-0">
      {/* ─── Collapsed Row ──────────────────────────────── */}
      <button
        type="button"
        onClick={() => setExpanded((e) => !e)}
        className="w-full flex items-center gap-4 p-4 hover:bg-[#F5F6F1]/50 transition-colors text-left"
      >
        {/* Status dot */}
        <div
          className={`w-2.5 h-2.5 rounded-full shrink-0 ${
            lead.status === "new"
              ? "bg-blue-500"
              : lead.status === "contacted"
              ? "bg-amber-500"
              : lead.status === "in_progress"
              ? "bg-purple-500"
              : "bg-emerald-500"
          }`}
        />

        {/* Name & contact */}
        <div className="min-w-0 w-48 shrink-0">
          <div className="font-body text-sm font-semibold text-[#12151B] truncate">
            {lead.name}
          </div>
          <div className="font-mono text-[10px] text-[#8A8E96] truncate">
            {lead.email || lead.phone || "No contact"}
          </div>
        </div>

        {/* Service */}
        <div className="hidden sm:block shrink-0">
          <span className="tag-pill tag-pill-blue text-[10px]">
            {lead.service_interest}
          </span>
        </div>

        {/* Description preview */}
        <div className="flex-grow min-w-0 hidden md:block">
          <p className="font-body text-xs text-[#585D67] truncate">
            {lead.business_description || "—"}
          </p>
        </div>

        {/* Date */}
        <div className="font-mono text-[10px] text-[#8A8E96] shrink-0 hidden lg:block">
          {new Date(lead.created_at).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          })}
        </div>

        {/* Status badge */}
        <span
          className={`font-mono text-[9px] px-2 py-1 rounded border font-bold uppercase shrink-0 ${statusConfig.color}`}
        >
          {statusConfig.label}
        </span>

        {/* Chevron */}
        <div className="shrink-0 text-[#8A8E96]">
          {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </div>
      </button>

      {/* ─── Expanded Detail Panel ──────────────────────── */}
      {expanded && (
        <div className="px-4 pb-5 pt-1 bg-[#F5F6F1]/30 space-y-4">
          {/* Meta info grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs">
            <div className="flex items-center gap-2 text-[#585D67]">
              <Calendar className="w-3.5 h-3.5 text-[#8A8E96]" />
              Submitted: {formattedDate}
            </div>
            <div className="flex items-center gap-2 text-[#585D67]">
              <Tag className="w-3.5 h-3.5 text-[#8A8E96]" />
              Source: {lead.source}
            </div>
            {lead.email && (
              <div className="flex items-center gap-2 text-[#585D67]">
                <Mail className="w-3.5 h-3.5 text-[#8A8E96]" />
                {lead.email}
              </div>
            )}
            {lead.phone && (
              <div className="flex items-center gap-2 text-[#585D67]">
                <Phone className="w-3.5 h-3.5 text-[#8A8E96]" />
                {lead.phone}
              </div>
            )}
          </div>

          {/* Full description */}
          {lead.business_description && (
            <div className="bg-white border border-[#DCDDD6] rounded-xs p-3">
              <div className="font-mono text-[10px] font-bold text-[#8A8E96] uppercase mb-1.5">
                Project Description
              </div>
              <p className="font-body text-sm text-[#12151B] leading-relaxed whitespace-pre-wrap">
                {lead.business_description}
              </p>
            </div>
          )}

          {/* Notes */}
          <div className="space-y-1.5">
            <label className="font-mono text-[10px] font-bold text-[#8A8E96] uppercase flex items-center gap-1.5">
              <StickyNote className="w-3.5 h-3.5" />
              Internal Notes
            </label>
            <textarea
              value={notes}
              onChange={(e) => {
                setNotes(e.target.value);
                setNotesDirty(true);
              }}
              onBlur={handleSaveNotes}
              rows={3}
              placeholder="Add follow-up notes, call summary, etc..."
              className="w-full bg-white border border-[#C7C9C0] px-3 py-2 rounded-xs font-body text-sm text-[#12151B] focus:border-[#1F3D8C] focus:outline-none resize-none"
            />
            {notesDirty && (
              <p className="font-mono text-[9px] text-[#8A8E96]">
                Saves automatically when you click away.
              </p>
            )}
          </div>

          {/* Actions row */}
          <div className="flex items-center justify-between gap-3 pt-2 border-t border-[#DCDDD6]">
            {/* Status selector */}
            <div className="flex items-center gap-2">
              <span className="font-mono text-[10px] text-[#8A8E96] uppercase font-bold">
                Status:
              </span>
              <select
                value={lead.status}
                onChange={(e) => handleStatusChange(e.target.value as LeadStatus)}
                disabled={isPending}
                className="font-mono text-xs px-2 py-1.5 rounded-xs border border-[#C7C9C0] bg-white text-[#12151B] focus:border-[#1F3D8C] focus:outline-none"
              >
                {(Object.keys(STATUS_CONFIG) as LeadStatus[]).map((status) => (
                  <option key={status} value={status}>
                    {STATUS_CONFIG[status].label}
                  </option>
                ))}
              </select>
              {isPending && <Loader2 className="w-3.5 h-3.5 animate-spin text-[#8A8E96]" />}
            </div>

            {/* Quick actions */}
            <div className="flex items-center gap-1.5">
              {whatsappUrl && (
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-white border border-[#C7C9C0] rounded-xs hover:border-[#25D366] hover:bg-[#25D366]/10 transition-colors"
                  title="Message on WhatsApp"
                >
                  <MessageCircle className="w-4 h-4 text-[#25D366]" />
                </a>
              )}
              {mailtoUrl && (
                <a
                  href={mailtoUrl}
                  className="p-2 bg-white border border-[#C7C9C0] rounded-xs hover:border-[#1F3D8C] hover:bg-[#1F3D8C]/10 transition-colors"
                  title="Send email"
                >
                  <Mail className="w-4 h-4 text-[#1F3D8C]" />
                </a>
              )}
              <button
                type="button"
                onClick={handleCopyContact}
                className="p-2 bg-white border border-[#C7C9C0] rounded-xs hover:border-[#FF4B23] hover:bg-[#FF4B23]/10 transition-colors"
                title="Copy contact"
              >
                {copied ? (
                  <Check className="w-4 h-4 text-emerald-600" />
                ) : (
                  <Copy className="w-4 h-4 text-[#585D67]" />
                )}
              </button>

              {/* Delete */}
              {confirmDelete ? (
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={handleDelete}
                    disabled={isPending}
                    className="px-2.5 py-1.5 bg-red-500 text-white text-[10px] font-mono font-bold rounded hover:bg-red-600 transition-colors"
                  >
                    {isPending ? <Loader2 className="w-3 h-3 animate-spin" /> : "Confirm"}
                  </button>
                  <button
                    type="button"
                    onClick={() => setConfirmDelete(false)}
                    className="px-2.5 py-1.5 bg-[#F5F6F1] text-[10px] font-mono font-bold rounded text-[#585D67] hover:bg-[#DCDDD6] transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setConfirmDelete(true)}
                  className="p-2 bg-white border border-[#C7C9C0] rounded-xs hover:bg-red-50 hover:border-red-200 transition-colors"
                  title="Delete lead"
                >
                  <Trash2 className="w-4 h-4 text-[#8A8E96] hover:text-red-500" />
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
