"use client";

import React from "react";
import { motion } from "framer-motion";
import { Zap, MessageSquare, ArrowRight, ShieldCheck, Check } from "lucide-react";
import Card3D from "./Card3D";

interface LeadGenGrowthProps {
  onOpenAuditModal: () => void;
}

export default function LeadGenGrowth({ onOpenAuditModal }: LeadGenGrowthProps) {
  const steps = [
    {
      num: "01",
      title: "Technical Discovery & Audit",
      desc: "We analyze your existing website speed, Lighthouse metrics, lead conversion drops, and search visibility.",
    },
    {
      num: "02",
      title: "Custom 3D Architecture & Wireframing",
      desc: "We engineer a high-speed, modern visual layout with custom micro-interactions and interactive widgets.",
    },
    {
      num: "03",
      title: "Production Build & API Integration",
      desc: "Full-stack development with Next.js 16, TypeScript, WhatsApp API automation, and Razorpay payment setup.",
    },
    {
      num: "04",
      title: "Launch & Continuous Optimization",
      desc: "Instant cloud deployment with sub-100ms TTFB caching, analytics telemetry, and 24/7 technical monitoring.",
    },
  ];

  return (
    <section id="growth" className="py-20 bg-[#F5F6F1] border-b border-[#DCDDD6]">
      <div className="max-w-[1180px] mx-auto px-5 sm:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-12">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="font-mono text-xs font-bold text-[#FF4B23] tracking-widest uppercase">
              FIG. 06 — PROCESS & EXECUTION
            </span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#12151B] tracking-tight">
            How we engineer high-converting platforms
          </h2>
          <p className="font-body text-base text-[#585D67] mt-3">
            Our structured 4-stage process guarantees rapid delivery without compromising code quality, security, or design fidelity.
          </p>
        </div>

        {/* 4 Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {steps.map((step, idx) => (
            <Card3D key={step.num} intensity={10} className="h-full">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="xmark bg-white border border-[#C7C9C0] p-6 rounded-xs flex flex-col justify-between hover:shadow-3d hover:border-[#1F3D8C] transition-all duration-300 h-full group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#DCDDD6] translate-z-10">
                    <span className="font-mono font-extrabold text-2xl text-[#1F3D8C] group-hover:text-[#FF4B23] transition-colors">
                      {step.num}
                    </span>
                    <span className="w-2 h-2 rounded-full bg-[#FF4B23] group-hover:animate-ping" />
                  </div>

                  <h3 className="font-display font-bold text-lg text-[#12151B] mb-2 translate-z-20">
                    {step.title}
                  </h3>
                  <p className="font-body text-xs text-[#585D67] leading-relaxed translate-z-10">
                    {step.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#DCDDD6] mt-4 flex items-center gap-1.5 font-mono text-[10px] text-[#8A8E96] uppercase font-bold translate-z-10">
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  Phase Verified
                </div>
              </motion.div>
            </Card3D>
          ))}
        </div>

        {/* Floating Call to Action Bar */}
        <Card3D intensity={6}>
          <div className="bg-[#12151B] text-white p-8 rounded-xs shadow-2xl border border-[#12151B] flex flex-col md:flex-row items-center justify-between gap-6 xmark">
            <div className="space-y-2 text-center md:text-left">
              <div className="inline-flex items-center gap-2 font-mono text-xs text-[#FF4B23] uppercase tracking-wider font-bold">
                <Zap className="w-4 h-4" />
                FAST TRACK PROJECT INITIATION
              </div>
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Ready to transform your web platform?
              </h3>
              <p className="font-body text-sm text-[#8A8E96] max-w-xl">
                Get a free website technical audit, Lighthouse score breakdown, and custom architecture roadmap within 24 hours.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
              <button
                onClick={onOpenAuditModal}
                className="btn-primary py-3.5 px-6 text-sm shadow-3d-accent flex items-center gap-2 w-full sm:w-auto justify-center"
              >
                <span>Request Free Audit</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <a
                href="https://wa.me/916394575814?text=Hi%20WebifyIt!%20I%20want%20to%20chat%20on%20WhatsApp%20about%20a%20new%20project."
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary bg-white/10 text-white border-white/20 hover:bg-white/20 py-3.5 px-6 text-sm flex items-center gap-2 w-full sm:w-auto justify-center"
              >
                <MessageSquare className="w-4 h-4 text-[#25D366]" />
                <span>WhatsApp Us</span>
              </a>
            </div>
          </div>
        </Card3D>

      </div>
    </section>
  );
}
