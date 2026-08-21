"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Layers, Sparkles, X, Globe, SquareArrowOutUpLeft, ChevronLeft, ChevronRight } from "lucide-react";
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
      trustLogos: [
        { name: "Next.js", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg" },
        { name: "TypeScript", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg" },
        { name: "PostgreSQL", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg" }
      ],
      link: "https://dineezy.in",
      domain: "dineezy.in",
      highlight: "Real-Time Order Dispatch",
      stats: "4.8x Order Speedup",
      media: {
        type: "image",
        url: "/images/dineezy/1.png"
      },
    },
    {
      id: "PRJ-02",
      name: "MsgZone WhatsApp SaaS",
      category: "saas",
      description:
        "Enterprise bulk messaging platform delivering automated attachment dispatch, campaign scheduling, and real-time read analytics.",
      trustLogos: [
        { name: "Node.js", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg" },
        { name: "Redis", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/redis/redis-original.svg" },
        { name: "Docker", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg" }
      ],
      link: "https://msgzone.in",
      domain: "msgzone.in",
      highlight: "High-Volume Dispatch Engine",
      stats: "50k+ Msgs / Day",
      media: {
        type: "image",
        url: "/images/msgzone/1.png"
      },
    },
    {
      id: "PRJ-03",
      name: "HisabAI",
      category: "ai",
      description:
        "AI financial ledger app featuring multi-lingual voice logging, optical receipt scanning, and automated tax expense categorisation.",
      trustLogos: [
        { name: "React Native", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" },
        { name: "OpenAI", url: "https://cdn.worldvectorlogo.com/logos/openai-2.svg" },
        { name: "TypeScript", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg" }
      ],
      link: "https://hisabai.in",
      domain: "hisabai.in",
      badge: "App Store & Play Store",
      highlight: "Voice & Vision AI",
      stats: "99.4% Scan Accuracy",
      media: {
        type: "image",
        url: "/images/hisab/1.png"
      },

    },
    {
      id: "PRJ-04",
      name: "Synergon AI Engine",
      category: "ai",
      description:
        "All-in-one AI sales automation suite unifying voice agents, WhatsApp drip campaigns, automated lead scoring, and CRM sync.",
      trustLogos: [
        { name: "Next.js", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg" },
        { name: "Python", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" },
        { name: "OpenAI", url: "https://cdn.worldvectorlogo.com/logos/openai-2.svg" }
      ],
      link: "https://synergon.ai",
      domain: "synergon.ai",
      highlight: "Autonomous Sales Pipeline",
      stats: "3.2x Lead Conv.",
      media: {
        type: "image",
        url: "/images/synergon/1.png"
      },
    },
    {
      id: "PRJ-05",
      name: "Helpkey Hospitality Engine",
      category: "web",
      description:
        "Full-scale hotel booking platform with instant room availability lookup, multi-tier dynamic pricing, and Razorpay payment gate.",
      trustLogos: [
        { name: "PostgreSQL", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg" },
        { name: "AWS", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg" },
        { name: "TypeScript", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg" }
      ],
      link: "https://helpkey.in",
      domain: "helpkey.in",
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
      trustLogos: [
        { name: "React", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" },
        { name: "OpenAI", url: "https://cdn.worldvectorlogo.com/logos/openai-2.svg" },
        { name: "Firebase", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/firebase/firebase-plain.svg" }
      ],
      link: "#",
      domain: "Enterprise Platform",
      highlight: "Real-time Voice Sentiment AI",
      stats: "Instant Audio Feedback",
      media: {
        type: "image",
        url: "/images/interview/1.png"
      }
    },
  ];

  const filteredProjects =
    filter === "all"
      ? projects
      : projects.filter((p) => p.category === filter);

  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Reset active index when filter changes
  useEffect(() => {
    setActiveIndex(0);
  }, [filter]);

  // Auto-play timer
  useEffect(() => {
    if (isHovered || filteredProjects.length === 0) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % filteredProjects.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [isHovered, filteredProjects.length]);

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

        {/* 3D Coverflow Carousel */}
        <div
          className="relative w-full py-12 flex items-center justify-center min-h-[480px] overflow-hidden"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onTouchStart={() => setIsHovered(true)}
          onTouchEnd={() => setIsHovered(false)}
        >
          <div className="relative w-[85vw] sm:w-[360px] md:w-[400px] h-[440px] flex items-center justify-center z-10">
            {filteredProjects.map((project, idx) => {
              const total = filteredProjects.length;

              // Calculate shortest distance in a circular array
              let offset = (idx - activeIndex) % total;
              if (offset < -Math.floor(total / 2)) offset += total;
              if (offset > Math.floor(total / 2)) offset -= total;

              const isActive = offset === 0;
              const distance = Math.abs(offset);
              const zIndex = 50 - distance;

              return (
                <motion.div
                  key={`${project.id}`}
                  initial={false}
                  animate={{
                    x: offset * 80 + "%",
                    scale: isActive ? 1 : 1 - (distance * 0.15),
                    opacity: isActive ? 1 : Math.max(0, 1 - (distance * 0.4)),
                    zIndex: zIndex,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                    mass: 1,
                  }}
                  className="absolute top-0 left-0 w-full h-full cursor-grab active:cursor-grabbing"
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.2}
                  onDragEnd={(e, { offset, velocity }) => {
                    const swipePower = Math.abs(offset.x) * velocity.x;
                    if (swipePower < -10000 || offset.x < -100) {
                      setActiveIndex((prev) => (prev + 1) % total);
                    } else if (swipePower > 10000 || offset.x > 100) {
                      setActiveIndex((prev) => (prev - 1 + total) % total);
                    }
                  }}
                  onClick={() => {
                    if (!isActive) setActiveIndex(idx);
                  }}
                >
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => {
                      if (!isActive) e.preventDefault();
                    }}
                    className={`group block bg-white border ${isActive ? 'border-[#1F3D8C] shadow-3d-blue' : 'border-[#C7C9C0] shadow-sm'} rounded-[1.5rem] p-3 flex flex-col h-full transition-all duration-300`}
                  >
                    {/* Media Mockup Header */}
                    <div className="w-full h-[200px] bg-[#EEF2FB] rounded-[1rem] mb-5 overflow-hidden relative border border-[#DCDDD6] flex items-center justify-center p-4">
                      {project.media ? (
                        <img src={project.media.url} alt={project.name} className="w-full h-full object-contain drop-shadow-lg group-hover:scale-105 transition-transform duration-500" />
                      ) : (
                        <div className="font-mono text-xs text-[#8A8E96]">Preview Available</div>
                      )}

                      {/* Floating Badge */}
                      <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-full border border-[#DCDDD6] shadow-sm flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                        <span className="font-mono text-[9px] font-bold text-[#12151B] uppercase">{project.stats}</span>
                      </div>
                    </div>

                    {/* Content Body */}
                    <div className="px-3 pb-3 flex flex-col justify-between flex-1">
                      <div>
                        {/* Header */}
                        <div className="flex items-center justify-between mb-3">
                          <span className="font-mono text-[10px] font-bold text-[#1F3D8C] bg-blue-50 px-2 py-0.5 rounded-sm border border-blue-100">
                            {project.id}
                          </span>
                          <span className="font-mono text-[10px] font-bold text-[#8A8E96] uppercase tracking-wider">
                            {project.domain}
                          </span>
                        </div>

                        {/* Title & Domain */}
                        <div className="mb-3">
                          <h3 className="font-display text-xl font-bold text-[#12151B] group-hover:text-[#1F3D8C] transition-colors flex items-center justify-between">
                            {project.name}
                            <ExternalLink className="w-4 h-4 text-[#8A8E96] opacity-0 group-hover:opacity-100 transition-opacity" />
                          </h3>
                        </div>

                        <p className="font-body text-sm text-[#585D67] leading-relaxed mb-6 line-clamp-2">
                          {project.description}
                        </p>
                      </div>

                      {/* Core Tech Stack Section */}
                      <div className="pt-4 border-t border-[#DCDDD6]">
                        <div className="font-mono text-[10px] text-[#8A8E96] uppercase tracking-wider mb-3 flex items-center gap-1 font-bold">
                          <Layers className="w-3 h-3 text-[#1F3D8C]" />
                          CORE TECH STACK
                        </div>
                        <div className="flex items-center gap-4">
                          {project.trustLogos.map(logo => (
                            <div key={logo.name} className="h-5 flex items-center justify-center grayscale group-hover:grayscale-0 transition-all duration-500 opacity-60 group-hover:opacity-100 drop-shadow-sm" title={logo.name}>
                              <img src={logo.url} alt={logo.name} className="h-full w-auto object-contain" />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </a>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Manual Controls */}
        <div className="flex items-center justify-center gap-4 mt-2 mb-8">
          <button
            onClick={() => setActiveIndex((prev) => (prev - 1 + filteredProjects.length) % filteredProjects.length)}
            className="p-3 rounded-full bg-white border border-[#DCDDD6] text-[#585D67] hover:border-[#1F3D8C] hover:text-[#1F3D8C] shadow-sm hover:shadow-md transition-all active:scale-95"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => setActiveIndex((prev) => (prev + 1) % filteredProjects.length)}
            className="p-3 rounded-full bg-white border border-[#DCDDD6] text-[#585D67] hover:border-[#1F3D8C] hover:text-[#1F3D8C] shadow-sm hover:shadow-md transition-all active:scale-95"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

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
            href="https://wa.me/919026665814?text=Hi%20WebifyIt!%20I%20want%20to%20view%20your%20extended%20case%20studies."
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
