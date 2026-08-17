"use client";

import React from "react";
import { motion } from "framer-motion";
import { Check, X, Shield, Cpu, Zap, Layers, Target, ArrowRight } from "lucide-react";
import Card3D from "./Card3D";

interface MarketPositioningMatrixProps {
  onOpenAuditModal: () => void;
}

export default function MarketPositioningMatrix({ onOpenAuditModal }: MarketPositioningMatrixProps) {
  const matrixData = [
    {
      feature: "Tech Stack",
      icon: <Layers className="w-4 h-4 text-[#1F3D8C]" />,
      generic: "WordPress, Wix, Generic Templates",
      genericPass: false,
      webifyIt: "Custom Next.js 16, Node.js, Proprietary APIs & Microservices",
      webifyItPass: true,
    },
    {
      feature: "Automation",
      icon: <Cpu className="w-4 h-4 text-[#FF4B23]" />,
      generic: "Standard Email Auto-responders & Basic Forms",
      genericPass: false,
      webifyIt: "Custom LLMs & Multi-lingual AI Voice & WhatsApp Agents",
      webifyItPass: true,
    },
    {
      feature: "Performance",
      icon: <Zap className="w-4 h-4 text-[#1F3D8C]" />,
      generic: "Slow loading speeds, high bounce rates, unoptimized code",
      genericPass: false,
      webifyIt: "Sub-100ms latency, 100/100 Google Lighthouse Core Web Vitals",
      webifyItPass: true,
    },
    {
      feature: "Solutions",
      icon: <Shield className="w-4 h-4 text-[#1F3D8C]" />,
      generic: '"We build basic, low-cost websites"',
      genericPass: false,
      webifyIt: '"We build custom websites, apps & AI tools that actually work for your business"',
      webifyItPass: true,
    },
    {
      feature: "Target Client",
      icon: <Target className="w-4 h-4 text-[#FF4B23]" />,
      generic: "Budget-focused commodity buyers",
      genericPass: false,
      webifyIt: "Growing businesses, startups & founders who want real results",
      webifyItPass: true,
    },
  ];

  return (
    <section id="positioning" className="py-20 bg-[#F5F6F1] border-b border-[#DCDDD6]">
      <div className="max-w-[1180px] mx-auto px-5 sm:px-8">
        {/* Header */}
        <div className="max-w-2xl mb-12">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="font-mono text-xs font-bold text-[#FF4B23] tracking-widest uppercase">
              FIG. 07 — MARKET POSITIONING MATRIX
            </span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#12151B] tracking-tight">
            Why regular agencies can&apos;t match what we do
          </h2>
          <p className="font-body text-base text-[#585D67] mt-3">
            We don&apos;t use templates. We build custom software, smart AI tools, and cloud platforms tailored to your business.
          </p>
        </div>

        {/* Matrix Card Container */}
        <Card3D intensity={4}>
          <div className="xmark bg-white border border-[#C7C9C0] rounded-xs shadow-3d overflow-hidden">
            {/* Table Header - Hidden on mobile */}
            <div className="hidden md:grid grid-cols-12 bg-[#12151B] text-white p-4 sm:p-6 items-center border-b border-[#12151B] font-mono text-xs uppercase tracking-wider">
              <div className="col-span-3 text-[#8A8E96] font-bold">Feature Category</div>
              <div className="col-span-4 text-red-400 font-semibold flex items-center gap-1.5">
                <X className="w-4 h-4 text-red-400 shrink-0" />
                Generic Agencies
              </div>
              <div className="col-span-5 text-[#25D366] font-extrabold flex items-center gap-1.5 text-sm">
                <Check className="w-5 h-5 text-[#25D366] shrink-0" />
                WebifyIt Engineering Studio
              </div>
            </div>

            {/* Mobile Header */}
            <div className="md:hidden bg-[#12151B] text-white p-4 border-b border-[#12151B] font-mono text-xs uppercase tracking-wider text-center">
              <span className="text-[#25D366] font-extrabold">WebifyIt</span>
              <span className="text-[#8A8E96]"> vs </span>
              <span className="text-red-400">Generic Agencies</span>
            </div>

            {/* Matrix Rows */}
            <div className="divide-y divide-[#DCDDD6]">
              {matrixData.map((row, idx) => (
                <motion.div
                  key={row.feature}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: idx * 0.08 }}
                  className="p-4 sm:p-6 hover:bg-[#F5F6F1]/50 transition-colors"
                >
                  {/* Desktop: 3-column grid */}
                  <div className="hidden md:grid grid-cols-12 items-center">
                    {/* Feature Label */}
                    <div className="col-span-3 font-mono text-xs font-bold text-[#12151B] flex items-center gap-2 pr-2">
                      <span className="p-1.5 bg-[#EEF2FB] rounded border border-[#1F3D8C]/20 shrink-0">
                        {row.icon}
                      </span>
                      <span>{row.feature}</span>
                    </div>

                    {/* Generic Agency */}
                    <div className="col-span-4 text-sm text-[#585D67] font-body pr-4 flex items-center gap-2">
                      <span className="w-4 h-4 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-[10px] font-bold shrink-0">
                        ✕
                      </span>
                      <span>{row.generic}</span>
                    </div>

                    {/* WebifyIt Engineering */}
                    <div className="col-span-5 text-sm font-semibold text-[#12151B] font-body bg-[#EEF2FB]/60 p-3 rounded-xs border border-[#1F3D8C]/20 flex items-center gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[11px] font-bold shrink-0 shadow-xs">
                        ✓
                      </span>
                      <span>{row.webifyIt}</span>
                    </div>
                  </div>

                  {/* Mobile: Stacked card layout */}
                  <div className="md:hidden space-y-3">
                    <div className="font-mono text-xs font-bold text-[#12151B] flex items-center gap-2">
                      <span className="p-1.5 bg-[#EEF2FB] rounded border border-[#1F3D8C]/20 shrink-0">
                        {row.icon}
                      </span>
                      <span>{row.feature}</span>
                    </div>

                    <div className="text-xs text-[#585D67] font-body flex items-start gap-2 pl-1">
                      <span className="w-4 h-4 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                        ✕
                      </span>
                      <span>{row.generic}</span>
                    </div>

                    <div className="text-xs font-semibold text-[#12151B] font-body bg-[#EEF2FB]/60 p-3 rounded-xs border border-[#1F3D8C]/20 flex items-start gap-2">
                      <span className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[11px] font-bold shrink-0 mt-0.5 shadow-xs">
                        ✓
                      </span>
                      <span>{row.webifyIt}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Bottom CTA Banner */}
            <div className="p-6 bg-[#EEF2FB] border-t border-[#1F3D8C]/20 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="font-mono text-xs text-[#1F3D8C] space-y-1 text-center sm:text-left">
                <div className="font-bold uppercase tracking-wider">NOW TAKING ON NEW PROJECTS</div>
                <div className="text-[#585D67] font-body text-xs">Let us build your custom website, AI chatbot, or mobile app.</div>
              </div>
              <button
                onClick={onOpenAuditModal}
                className="btn-primary py-3 px-6 text-xs font-semibold shadow-3d-accent shrink-0 flex items-center gap-2"
              >
                <span>Get a Free Quote</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </Card3D>
      </div>
    </section>
  );
}
