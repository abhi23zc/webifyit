"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Users, BookOpen, CheckCircle, Clock, Eye, Sparkles, Filter, RefreshCw, PhoneCall, Tag, ArrowRight, ShieldCheck } from "lucide-react";
import { getStoredLeads, getStoredBlogAnalytics, LeadItem, BlogAnalytics } from "../lib/leadStore";
import Card3D from "../components/Card3D";
import BlogManager from "./_components/BlogManager";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<"leads" | "cms" | "publish">("leads");
  const [leads, setLeads] = useState<LeadItem[]>([]);
  const [blogs, setBlogs] = useState<BlogAnalytics[]>([]);
  const [leadFilter, setLeadFilter] = useState<string>("all");
  const [statusMsg, setStatusMsg] = useState<string | null>(null);

  useEffect(() => {
    setLeads(getStoredLeads());
    setBlogs(getStoredBlogAnalytics());
  }, []);

  const refreshData = () => {
    setLeads(getStoredLeads());
    setBlogs(getStoredBlogAnalytics());
    setStatusMsg("Data telemetry refreshed!");
    setTimeout(() => setStatusMsg(null), 3000);
  };

  const handleUpdateStatus = (id: string, newStatus: LeadItem["status"]) => {
    const updated = leads.map((l) => (l.id === id ? { ...l, status: newStatus } : l));
    setLeads(updated);
    if (typeof window !== "undefined") {
      localStorage.setItem("webifyit_leads", JSON.stringify(updated));
    }
  };

  const filteredLeads =
    leadFilter === "all"
      ? leads
      : leads.filter((l) => l.taggedDomain.toLowerCase().includes(leadFilter.toLowerCase()));

  return (
    <div className="min-h-screen bg-[#12151B] text-white p-5 sm:p-8 font-sans">
      <div className="max-w-[1280px] mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-white/10 pb-6 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2 font-mono text-xs text-[#25D366]">
              <span className="w-2.5 h-2.5 rounded-full bg-[#25D366] animate-pulse" />
              <span>ABHISHEK&apos;S COMMAND CENTER // WEBIFYIT CONTROL ROOM</span>
            </div>
            <h1 className="font-display text-3xl font-extrabold tracking-tight">
              Internal Lead CRM & Blog Telemetry CMS
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={refreshData}
              className="btn-secondary bg-white/10 text-white border-white/20 hover:bg-white/20 text-xs py-2 px-3 flex items-center gap-1.5 font-mono"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Refresh Telemetry</span>
            </button>
            <Link
              href="/"
              className="btn-primary text-xs py-2 px-4 shadow-3d-accent font-semibold flex items-center gap-1.5"
            >
              <span>Back to Studio Site</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {statusMsg && (
          <div className="p-3 bg-[#25D366]/20 border border-[#25D366] text-[#25D366] rounded-xs font-mono text-xs">
            ✓ {statusMsg}
          </div>
        )}

        {/* Top Summary Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 font-mono">
          <div className="bg-[#1A1E26] p-4 rounded-xs border border-white/10">
            <div className="text-[10px] text-[#8A8E96] uppercase">TOTAL CAPTURED LEADS</div>
            <div className="text-2xl font-bold text-white mt-1">{leads.length} Leads</div>
            <div className="text-[10px] text-[#25D366] mt-1">Tagged by AI/Web/SaaS</div>
          </div>

          <div className="bg-[#1A1E26] p-4 rounded-xs border border-white/10">
            <div className="text-[10px] text-[#8A8E96] uppercase">30-DAY BLOG VIEWS</div>
            <div className="text-2xl font-bold text-[#FF4B23] mt-1">
              {blogs.reduce((a, b) => a + b.views30Days, 0).toLocaleString()} Views
            </div>
            <div className="text-[10px] text-[#8A8E96] mt-1">Across 3 Technical Articles</div>
          </div>

          <div className="bg-[#1A1E26] p-4 rounded-xs border border-white/10">
            <div className="text-[10px] text-[#8A8E96] uppercase">PIPELINE CONVERSIONS</div>
            <div className="text-2xl font-bold text-emerald-400 mt-1">
              {blogs.reduce((a, b) => a + b.conversions, 0)} Blueprint Requests
            </div>
            <div className="text-[10px] text-emerald-400 mt-1">Originating from Blog</div>
          </div>

          <div className="bg-[#1A1E26] p-4 rounded-xs border border-white/10">
            <div className="text-[10px] text-[#8A8E96] uppercase">MSGZONE AUTOMATION</div>
            <div className="text-2xl font-bold text-[#25D366] mt-1">100% ACTIVE</div>
            <div className="text-[10px] text-[#8A8E96] mt-1">Instant WhatsApp Dispatched</div>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-3 border-b border-white/10 pb-4">
          <button
            onClick={() => setActiveTab("leads")}
            className={`font-mono text-xs px-4 py-2.5 rounded-xs font-bold flex items-center gap-2 transition-all ${
              activeTab === "leads"
                ? "bg-[#FF4B23] text-white"
                : "bg-[#1A1E26] text-[#8A8E96] hover:text-white"
            }`}
          >
            <Users className="w-4 h-4" />
            PHASE 4: INCOMING LEADS CRM ({leads.length})
          </button>

          <button
            onClick={() => setActiveTab("cms")}
            className={`font-mono text-xs px-4 py-2.5 rounded-xs font-bold flex items-center gap-2 transition-all ${
              activeTab === "cms"
                ? "bg-[#1F3D8C] text-white"
                : "bg-[#1A1E26] text-[#8A8E96] hover:text-white"
            }`}
          >
            <BookOpen className="w-4 h-4" />
            PHASE 5: BLOG METRICS
          </button>

          <button
            onClick={() => setActiveTab("publish")}
            className={`font-mono text-xs px-4 py-2.5 rounded-xs font-bold flex items-center gap-2 transition-all ${
              activeTab === "publish"
                ? "bg-[#25D366] text-[#12151B]"
                : "bg-[#1A1E26] text-[#8A8E96] hover:text-white"
            }`}
          >
            <Sparkles className="w-4 h-4" />
            PUBLISH NEW BLOG
          </button>
        </div>

        {/* --- TAB 1: LEADS CRM --- */}
        {activeTab === "leads" && (
          <div className="space-y-4">
            {/* Filter Pills */}
            <div className="flex items-center gap-2 font-mono text-xs overflow-x-auto pb-2">
              <span className="text-[#8A8E96] font-bold uppercase">Filter Tag:</span>
              {["all", "AI Agent", "Web Architecture", "Custom SaaS", "Mobile App Engine"].map((tag) => (
                <button
                  key={tag}
                  onClick={() => setLeadFilter(tag)}
                  className={`px-3 py-1 rounded-xs border transition-colors ${
                    leadFilter === tag
                      ? "bg-white text-[#12151B] font-bold border-white"
                      : "bg-[#1A1E26] text-[#8A8E96] border-white/10 hover:border-white/30"
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>

            {/* Leads Table */}
            <div className="bg-[#1A1E26] border border-white/10 rounded-xs overflow-hidden">
              <div className="grid grid-cols-12 bg-[#0B0D10] p-4 text-[11px] font-mono text-[#8A8E96] uppercase border-b border-white/10">
                <div className="col-span-2 font-bold">ID / Timestamp</div>
                <div className="col-span-2 font-bold">Name & Contact</div>
                <div className="col-span-4 font-bold">Business Specs / Requirement</div>
                <div className="col-span-2 font-bold">Domain Tag</div>
                <div className="col-span-2 font-bold text-right">Status Action</div>
              </div>

              <div className="divide-y divide-white/5">
                {filteredLeads.map((lead) => (
                  <div key={lead.id} className="grid grid-cols-12 p-4 text-xs items-center hover:bg-white/5 transition-colors">
                    <div className="col-span-2 font-mono">
                      <div className="font-bold text-[#FF4B23]">{lead.id}</div>
                      <div className="text-[10px] text-[#8A8E96]">{lead.timestamp}</div>
                      <div className="text-[9px] text-[#25D366] mt-0.5">{lead.source}</div>
                    </div>

                    <div className="col-span-2">
                      <div className="font-bold text-white">{lead.name}</div>
                      <div className="font-mono text-[11px] text-[#25D366] flex items-center gap-1">
                        <PhoneCall className="w-3 h-3" />
                        {lead.contact}
                      </div>
                      {lead.email && <div className="text-[10px] text-[#8A8E96] truncate">{lead.email}</div>}
                    </div>

                    <div className="col-span-4 text-[#8A8E96] pr-4">
                      <div className="text-white font-medium mb-1">{lead.businessDescription}</div>
                      <div className="font-mono text-[10px] text-[#1F3D8C] bg-[#EEF2FB]/10 px-2 py-0.5 rounded inline-block border border-white/10">
                        Focus: {lead.auditFocus}
                      </div>
                    </div>

                    <div className="col-span-2">
                      <span className="font-mono text-[10px] px-2.5 py-1 rounded border font-bold bg-[#1F3D8C]/20 border-[#1F3D8C] text-[#25D366] flex items-center gap-1 w-max">
                        <Tag className="w-3 h-3" />
                        {lead.taggedDomain}
                      </span>
                    </div>

                    <div className="col-span-2 flex items-center justify-end gap-2">
                      <select
                        value={lead.status}
                        onChange={(e) => handleUpdateStatus(lead.id, e.target.value as LeadItem["status"])}
                        className="bg-[#12151B] border border-white/20 text-xs font-mono p-1.5 rounded text-white focus:outline-none"
                      >
                        <option value="New">New</option>
                        <option value="In Review">In Review</option>
                        <option value="Blueprint Sent">Blueprint Sent</option>
                        <option value="Closed">Closed</option>
                      </select>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* --- TAB 2: BLOG CMS METRICS --- */}
        {activeTab === "cms" && (
          <div className="space-y-6">
            <div className="bg-[#1A1E26] border border-white/10 rounded-xs overflow-hidden">
              <div className="grid grid-cols-12 bg-[#0B0D10] p-4 text-[11px] font-mono text-[#8A8E96] uppercase border-b border-white/10">
                <div className="col-span-5 font-bold">Article Title & Category</div>
                <div className="col-span-2 font-bold">Read Time</div>
                <div className="col-span-2 font-bold text-center">30-Day Live Views</div>
                <div className="col-span-3 font-bold text-right">Pipeline Conversions</div>
              </div>

              <div className="divide-y divide-white/5">
                {blogs.map((blog) => (
                  <div key={blog.id} className="grid grid-cols-12 p-4 text-xs items-center hover:bg-white/5 transition-colors">
                    <div className="col-span-5 pr-4">
                      <div className="font-mono text-[10px] text-[#25D366] font-bold">{blog.category}</div>
                      <Link href={`/blog/${blog.slug}`} className="font-bold text-white hover:text-[#FF4B23] transition-colors text-sm">
                        {blog.title}
                      </Link>
                    </div>

                    <div className="col-span-2 font-mono text-[#8A8E96]">
                      {blog.readTime}
                    </div>

                    <div className="col-span-2 font-mono text-center font-bold text-[#FF4B23] text-base">
                      {blog.views30Days.toLocaleString()}
                    </div>

                    <div className="col-span-3 text-right font-mono">
                      <div className="font-extrabold text-emerald-400 text-base">
                        {blog.conversions} Conversions
                      </div>
                      <div className="text-[10px] text-[#8A8E96]">
                        {((blog.conversions / blog.views30Days) * 100).toFixed(1)}% Conversion Rate
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* --- TAB 3: PUBLISH NEW BLOG --- */}
        {activeTab === "publish" && (
          <div className="space-y-6">
            <BlogManager />
          </div>
        )}

      </div>
    </div>
  );
}
