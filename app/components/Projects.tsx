"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Layers, Sparkles, X, Globe, SquareArrowOutUpLeft } from "lucide-react";
import Card3D from "./Card3D";

interface ProjectsProps {
  onOpenAuditModal: () => void;
}

export default function Projects({ onOpenAuditModal }: ProjectsProps) {
  const [filter, setFilter] = useState<string>("all");
  const [activePreviewUrl, setActivePreviewUrl] = useState<string | null>(null);

  const projects = [
    {
      id: "PRJ-01",
      name: "Dineezy",
      category: "web",
      description:
        "QR-driven restaurant management system featuring real-time kitchen order dispatch, table analytics, and instant POS integration.",
      stack: ["Next.js 16", "TypeScript", "PostgreSQL", "Prisma", "Socket.io", "Tailwind"],
      link: "https://dineezy.in",
      domain: "dineezy.in",
      highlight: "Real-Time Order Dispatch",
      stats: "4.8x Order Speedup",
    },
    {
      id: "PRJ-02",
      name: "MsgZone WhatsApp SaaS",
      category: "saas",
      description:
        "Enterprise bulk messaging platform delivering automated attachment dispatch, campaign scheduling, and real-time read analytics.",
      stack: ["Next.js", "TypeScript", "Node.js", "Redis", "Docker", "Razorpay"],
      link: "https://msgzone.live",
      domain: "msgzone.live",
      highlight: "High-Volume Dispatch Engine",
      stats: "50k+ Msgs / Day",
    },
    {
      id: "PRJ-03",
      name: "HisabAI",
      category: "ai",
      description:
        "AI financial ledger app featuring multi-lingual voice logging, optical receipt scanning, and automated tax expense categorisation.",
      stack: ["React Native", "TypeScript", "OpenAI Vision", "Tailwind"],
      link: "https://hisabai.in",
      domain: "hisabai.in",
      badge: "App Store & Play Store",
      highlight: "Voice & Vision AI",
      stats: "99.4% Scan Accuracy",
    },
    {
      id: "PRJ-04",
      name: "Synergon AI Engine",
      category: "ai",
      description:
        "All-in-one AI sales automation suite unifying voice agents, WhatsApp drip campaigns, automated lead scoring, and CRM sync.",
      stack: ["Next.js", "TypeScript", "AI Voice Agents", "WhatsApp API", "LLMs"],
      link: "https://synergon.ai",
      domain: "synergon.ai",
      highlight: "Autonomous Sales Pipeline",
      stats: "3.2x Lead Conv.",
    },
    {
      id: "PRJ-05",
      name: "Helpkey Hospitality Engine",
      category: "web",
      description:
        "Full-scale hotel booking platform with instant room availability lookup, multi-tier dynamic pricing, and Razorpay payment gate.",
      stack: ["Next.js", "TypeScript", "PostgreSQL", "Prisma", "Razorpay", "AWS"],
      link: "https://helpkey.vercel.app",
      domain: "helpkey.vercel.app",
      badge: "Web App + Android",
      highlight: "Instant Booking Engine",
      stats: "Sub-50ms Booking",
    },
    {
      id: "PRJ-06",
      name: "Interview AI Workspace",
      category: "ai",
      description:
        "AI mock-interview platform with real-time audio sentiment analysis, automated candidate grading, and adaptive question generation.",
      stack: ["Next.js", "TypeScript", "OpenAI", "WebRTC", "Firebase"],
      link: "#",
      domain: "Enterprise Platform",
      highlight: "Real-time Voice Sentiment AI",
      stats: "Instant Audio Feedback",
    },
  ];

  const filteredProjects =
    filter === "all"
      ? projects
      : projects.filter((p) => p.category === filter);

  return (
    <section id="projects" className="py-20 bg-[#F5F6F1] border-b border-[#DCDDD6]">
      <div className="max-w-[1180px] mx-auto px-5 sm:px-8">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="font-mono text-xs font-bold text-[#FF4B23] tracking-widest uppercase">
                FIG. 03 — FEATURED PROJECTS
              </span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#12151B] tracking-tight">
              Our work — live projects in production
            </h2>
            <p className="font-body text-base text-[#585D67] mt-3 max-w-2xl">
              Explore the apps and websites we’ve built for real businesses.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0">
            {[
              { label: "All Projects", key: "all" },
              { label: "Web & Mobile", key: "web" },
              { label: "AI Platforms", key: "ai" },
              { label: "SaaS Systems", key: "saas" },
            ].map((tab) => {
              const active = filter === tab.key;
              return (
                <button
                  key={tab.key}
                  onClick={() => setFilter(tab.key)}
                  className={`font-mono text-xs px-4 py-2 rounded-xs border transition-all relative shrink-0 font-medium ${active
                    ? "bg-[#12151B] text-white border-[#12151B] shadow-2xs"
                    : "bg-white text-[#585D67] border-[#C7C9C0] hover:border-[#12151B]"
                    }`}
                >
                  {tab.label}
                  {active && (
                    <motion.div
                      layoutId="activeFilterTab"
                      className="absolute inset-0 border-2 border-[#FF4B23] rounded-xs pointer-events-none"
                      transition={{ type: "spring", stiffness: 350, damping: 25 }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* 3D Project Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="h-full"
              >
                <Card3D intensity={12} className="h-full">
                  <div className="xmark bg-white border border-[#C7C9C0] p-6 rounded-xs flex flex-col justify-between hover:shadow-3d hover:border-[#1F3D8C] transition-all duration-300 group h-full">
                    <div>
                      {/* Header */}
                      <div className="flex items-center justify-between pb-4 border-b border-[#DCDDD6] mb-4 translate-z-10">
                        <span className="font-mono text-xs font-bold text-[#1F3D8C]">
                          {project.id}
                        </span>
                        {project.badge ? (
                          <span className="tag-pill tag-pill-accent text-[10px] font-bold">
                            {project.badge}
                          </span>
                        ) : (
                          <span className="font-mono text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-2xs border border-emerald-200">
                            {project.stats}
                          </span>
                        )}
                      </div>

                      {/* Title & Domain */}
                      <div className="mb-3 translate-z-20">
                        <h3 className="font-display text-xl font-bold text-[#12151B] group-hover:text-[#1F3D8C] transition-colors flex items-center justify-between">
                          <span>{project.name}</span>
                          {project.link !== "#" && (
                            <a
                              href={project.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-1.5 bg-[#F5F6F1] border border-[#DCDDD6] rounded-xs text-[#585D67] hover:bg-[#1F3D8C] hover:text-white transition-colors"
                              title="Visit live project"
                            >
                              <ExternalLink className="w-4 h-4" />
                            </a>
                          )}
                        </h3>
                        <div className="font-mono text-xs text-[#8A8E96] mt-1 flex items-center gap-1.5">
                          <Globe className="w-3 h-3 text-[#1F3D8C]" />
                          {project.domain}
                        </div>
                      </div>

                      <p className="font-body text-sm text-[#585D67] leading-relaxed mb-6 translate-z-10">
                        {project.description}
                      </p>
                    </div>

                    {/* Tech Stack Chips */}
                    <div className="translate-z-20 pt-4 border-t border-[#DCDDD6]">
                      <div className="font-mono text-[10px] text-[#8A8E96] uppercase tracking-wider mb-2 flex items-center gap-1 font-bold">
                        <Layers className="w-3 h-3 text-[#1F3D8C]" />
                        BUILT WITH
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {project.stack.map((tech) => (
                          <span key={tech} className="tag-pill text-[10px] bg-[#F5F6F1]">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </Card3D>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Bottom CTAs */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onOpenAuditModal}
            className="btn-primary text-sm py-3.5 px-6 flex items-center gap-2 shadow-3d-accent"
          >
            <SquareArrowOutUpLeft className="w-4 h-4" />
            <span>Start a New Project</span>
          </motion.button>
          <a
            href="https://wa.me/916394575814?text=Hi%20WebifyIt!%20I%20want%20to%20view%20your%20extended%20case%20studies."
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost text-sm py-3.5 px-6 font-semibold"
          >
            Request More Case Studies
          </a>
        </div>

      </div>
    </section>
  );
}
