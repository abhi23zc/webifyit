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
      title: "Understand",
      desc: "We start with a real conversation about your business — what's working, what's not, and where you want to go. No pitch, no pressure.",
    },
    {
      num: "02",
      title: "Qualify",
      desc: "We assess honestly whether we're the right partner and whether we can create real value for you. If we can't, we'll tell you — and point you elsewhere if we can.",
    },
    {
      num: "03",
      title: "Audit & Requirements",
      desc: "Once we know it's a fit, we go deep: current systems, workflows, gaps, and the exact requirements for what we're building.",
    },
    {
      num: "04",
      title: "Growth & Scale Roadmap",
      desc: "You get both a short-term execution plan and a long-term scaling roadmap — with clear investment and timeline, no surprises later.",
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
            How we work with you
          </h2>
          <p className="font-body text-base text-[#585D67] mt-3">
            Our process is designed to respect your time and ours — we qualify early, go deep when it matters, and give you full clarity before a single line of code is written.
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
                Ready to see if we're the right fit?
              </h3>
              <p className="font-body text-sm text-[#8A8E96] max-w-xl">
                Tell us about your business and we'll give you an honest assessment — including whether we're the right team for the job.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
              <button
                onClick={onOpenAuditModal}
                className="btn-primary py-3.5 px-6 text-sm shadow-3d-accent flex items-center gap-2 w-full sm:w-auto justify-center"
              >
                <span>Get Free Website Review</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <a
                href="https://wa.me/919026665814?text=Hi%20WebifyIt!%20I%20want%20to%20chat%20on%20WhatsApp%20about%20a%20new%20project."
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
