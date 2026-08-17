"use client";

export interface LeadItem {
  id: string;
  name: string;
  contact: string; // phone or email
  email?: string;
  businessDescription: string;
  auditFocus: string;
  source: "Blueprint Form" | "AI Architect" | "Bottleneck Quiz" | "Savings Calculator";
  taggedDomain: "AI Agent" | "Web Architecture" | "Custom SaaS" | "Mobile App Engine";
  status: "New" | "In Review" | "Blueprint Sent" | "Closed";
  timestamp: string;
  // Optional qualification fields (from LeadQualification section & AI Advisor)
  teamSize?: "1-10" | "11-50" | "51-250" | "250+";
  timeline?: "Exploring" | "Ready in 1-3 months" | "Ready now";
  budgetBand?: string;
}

export interface BlogAnalytics {
  id: string;
  slug: string;
  title: string;
  category: string;
  readTime: string;
  views30Days: number;
  conversions: number;
  publishedDate: string;
}

const DEFAULT_LEADS: LeadItem[] = [
  {
    id: "LEAD-101",
    name: "Ramesh Sharma",
    contact: "+91 98390 12345",
    email: "ramesh@lucknowtextiles.com",
    businessDescription: "Wholesale manufacturing in Lucknow, managing inventory manually",
    auditFocus: "Custom SaaS Architecture",
    source: "Blueprint Form",
    taggedDomain: "Custom SaaS",
    status: "In Review",
    timestamp: "2026-08-06 14:30",
  },
  {
    id: "LEAD-102",
    name: "Vikram Malhotra",
    contact: "+91 91234 56789",
    email: "vikram@spicemarket.in",
    businessDescription: "Multi-branch restaurant chain needing AI order & WhatsApp customer support",
    auditFocus: "AI Integration Feasibility",
    source: "AI Architect",
    taggedDomain: "AI Agent",
    status: "Blueprint Sent",
    timestamp: "2026-08-06 16:15",
  },
  {
    id: "LEAD-103",
    name: "Ananya Gupta",
    contact: "+91 98765 11223",
    email: "ananya@logisticsflow.co",
    businessDescription: "Fleet tracking & client booking web application",
    auditFocus: "High-Performance Web Architecture",
    source: "Savings Calculator",
    taggedDomain: "Web Architecture",
    status: "New",
    timestamp: "2026-08-06 17:05",
  },
];

const DEFAULT_BLOG_ANALYTICS: BlogAnalytics[] = [
  {
    id: "BLOG-01",
    slug: "manufacturing-cloud-erp-transition",
    title: "How to Transition Your Traditional Manufacturing Business to a Custom Cloud ERP",
    category: "Industrial Tech & SaaS",
    readTime: "6 min read",
    views30Days: 1420,
    conversions: 38,
    publishedDate: "Aug 2, 2026",
  },
  {
    id: "BLOG-02",
    slug: "why-off-the-shelf-crms-fail-restaurants",
    title: "Why Off-the-Shelf CRMs Fail High-Volume Restaurants (and How We Solved It with Dineezy)",
    category: "Proprietary Architecture",
    readTime: "8 min read",
    views30Days: 2190,
    conversions: 64,
    publishedDate: "Jul 28, 2026",
  },
  {
    id: "BLOG-03",
    slug: "deploying-multilingual-autonomous-ai-voice-agents",
    title: "Deploying Multi-lingual Autonomous AI Voice Agents for 24/7 Operations",
    category: "AI Engineering",
    readTime: "7 min read",
    views30Days: 3450,
    conversions: 92,
    publishedDate: "Jul 15, 2026",
  },
];

export function getStoredLeads(): LeadItem[] {
  if (typeof window === "undefined") return DEFAULT_LEADS;
  const data = localStorage.getItem("webifyit_leads");
  if (!data) {
    localStorage.setItem("webifyit_leads", JSON.stringify(DEFAULT_LEADS));
    return DEFAULT_LEADS;
  }
  try {
    return JSON.parse(data);
  } catch {
    return DEFAULT_LEADS;
  }
}

export function saveNewLead(lead: Omit<LeadItem, "id" | "timestamp" | "status">): LeadItem {
  const current = getStoredLeads();
  const newLeadItem: LeadItem = {
    ...lead,
    id: `LEAD-${Math.floor(100 + Math.random() * 900)}`,
    status: "New",
    timestamp: new Date().toISOString().replace("T", " ").substring(0, 16),
  };
  const updated = [newLeadItem, ...current];
  if (typeof window !== "undefined") {
    localStorage.setItem("webifyit_leads", JSON.stringify(updated));
  }
  return newLeadItem;
}

export function getStoredBlogAnalytics(): BlogAnalytics[] {
  if (typeof window === "undefined") return DEFAULT_BLOG_ANALYTICS;
  const data = localStorage.getItem("webifyit_blog_cms");
  if (!data) {
    localStorage.setItem("webifyit_blog_cms", JSON.stringify(DEFAULT_BLOG_ANALYTICS));
    return DEFAULT_BLOG_ANALYTICS;
  }
  try {
    return JSON.parse(data);
  } catch {
    return DEFAULT_BLOG_ANALYTICS;
  }
}

export function trackBlogConversion(slug: string) {
  if (typeof window === "undefined") return;
  const blogs = getStoredBlogAnalytics();
  const updated = blogs.map((b) => (b.slug === slug ? { ...b, conversions: b.conversions + 1 } : b));
  localStorage.setItem("webifyit_blog_cms", JSON.stringify(updated));
}
