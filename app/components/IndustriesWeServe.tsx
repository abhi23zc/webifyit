"use client";

import React from "react";
import { motion } from "framer-motion";
import { UtensilsCrossed, Landmark, ShoppingCart, Factory, ArrowRight, CheckCircle2, MessageSquare } from "lucide-react";
import Card3D from "./Card3D";

interface IndustriesWeServeProps {
  onOpenAuditModal: () => void;
}

const industries = [
  {
    id: "IND-01",
    icon: <UtensilsCrossed className="w-6 h-6 text-[#FF4B23]" />,
    title: "Hospitality & Restaurants",
    tagline: "From walk-ins to full digital ops",
    painPoints: [
      "Booking friction & high no-show rates",
      "Manual order/inventory tracking slowing peak hours",
      "Slow customer response losing repeat business",
    ],
    proof: [
      { name: "Helpkey — Instant Booking Engine", stat: "Sub-50ms Booking", href: "#projects" },
      { name: "Dineezy — QR Order System", stat: "4.8x Order Speedup", href: "#projects" },
    ],
    accent: "border-[#FF4B23]/30 hover:border-[#FF4B23]",
    tagAccent: "bg-[#FF4B23]/10 text-[#FF4B23] border-[#FF4B23]/20",
  },
  {
    id: "IND-02",
    icon: <Landmark className="w-6 h-6 text-[#1F3D8C]" />,
    title: "Fintech & Financial Services",
    tagline: "Automate the ledger, accelerate the loan",
    painPoints: [
      "Manual ledgers & expense tracking eating hours daily",
      "Slow loan/lead qualification losing applicants",
      "Compliance overhead without digital audit trails",
    ],
    proof: [
      { name: "HisabAI — AI Financial Ledger", stat: "99.4% Scan Accuracy", href: "#projects" },
      { name: "GrowPlus — Lead Qualification Engine", stat: "3.2x Lead Conv.", href: "#projects" },
    ],
    accent: "border-[#1F3D8C]/30 hover:border-[#1F3D8C]",
    tagAccent: "bg-[#1F3D8C]/10 text-[#1F3D8C] border-[#1F3D8C]/20",
  },
  {
    id: "IND-03",
    icon: <ShoppingCart className="w-6 h-6 text-emerald-600" />,
    title: "Retail, E-commerce & SaaS",
    tagline: "Sell more with less manual work",
    painPoints: [
      "Fragmented customer messaging across channels",
      "Manual order updates burning staff hours",
      "No automated follow-up losing warm leads",
    ],
    proof: [
      { name: "MsgZone — WhatsApp Dispatch SaaS", stat: "50k+ Msgs/Day", href: "#projects" },
      { name: "OyeStore — E-commerce Platform", stat: "Full Automation", href: "#projects" },
    ],
    accent: "border-emerald-500/30 hover:border-emerald-500",
    tagAccent: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
  {
    id: "IND-04",
    icon: <Factory className="w-6 h-6 text-[#585D67]" />,
    title: "Manufacturing & Textile",
    tagline: "Take B2B and export buyers online",
    painPoints: [
      "Outdated static sites repelling digital-first buyers",
      "No digital lead capture for B2B or export inquiries",
      "Manual order inquiries via phone causing delays & errors",
    ],
    proof: [
      { name: "Renascence Hosiers — B2B Portal", stat: "Digital Lead Capture", href: "#projects" },
      { name: "Strong local Lucknow credibility", stat: "UP Manufacturing", href: "#projects" },
    ],
    accent: "border-[#585D67]/30 hover:border-[#12151B]",
    tagAccent: "bg-[#F5F6F1] text-[#585D67] border-[#C7C9C0]",
  },
];

export default function IndustriesWeServe({ onOpenAuditModal }: IndustriesWeServeProps) {
  return (
    <section id="industries" className="py-20 bg-[#F5F6F1] border-b border-[#DCDDD6]">
      <div className="max-w-[1180px] mx-auto px-5 sm:px-8">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="font-mono text-xs font-bold text-[#FF4B23] tracking-widest uppercase">
                WHO WE WORK WITH
              </span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#12151B] tracking-tight">
              We understand your industry's specific problems
            </h2>
            <p className="font-body text-base text-[#585D67] mt-3">
              We've built production software for businesses across these verticals. We know the pain points — and exactly what it takes to solve them.
            </p>
          </div>
          <button
            onClick={onOpenAuditModal}
            className="btn-primary text-sm py-3 px-5 shrink-0 flex items-center gap-2 self-start md:self-auto"
          >
            <span>Discuss Your Industry</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Industry Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-10">
          {industries.map((ind, idx) => (
            <motion.div
              key={ind.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className={`bg-white border p-6 sm:p-8 rounded-[1.5rem] flex flex-col h-full transition-all duration-300 hover:shadow-3d group ${ind.accent} relative overflow-hidden`}
            >
              {/* Subtle background glow */}
              <div className={`absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-500 pointer-events-none bg-current`} />

              <div className="relative z-10 flex flex-col h-full">
                {/* Card Header */}
                <div className="flex items-start justify-between pb-5 border-b border-[#DCDDD6] mb-5">
                  <div className={`p-3 rounded-xl border ${ind.tagAccent} bg-opacity-30`}>
                    {React.cloneElement(ind.icon as React.ReactElement<{ className?: string }>, { className: "w-6 h-6" })}
                  </div>
                  <span className="font-mono text-[10px] font-bold text-[#8A8E96] border border-[#DCDDD6] bg-[#F5F6F1] px-2.5 py-1 rounded-full">
                    {ind.id}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-display font-bold text-xl text-[#12151B] mb-1.5 leading-snug">
                  {ind.title}
                </h3>
                <p className="font-mono text-xs font-bold text-[#8A8E96] mb-6 uppercase tracking-wider">
                  {ind.tagline}
                </p>

                {/* Pain Points */}
                <div className="flex-1 space-y-3.5 mb-6">
                  {ind.painPoints.map((p) => (
                    <div key={p} className="flex items-start gap-2.5">
                      <div className="w-4 h-4 rounded-full bg-red-50 flex items-center justify-center shrink-0 border border-red-100 mt-0.5">
                        <svg className="w-2.5 h-2.5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                      </div>
                      <span className="font-body text-sm text-[#585D67] leading-relaxed">{p}</span>
                    </div>
                  ))}
                </div>

                {/* Proof Links */}
                <div className="pt-5 border-t border-[#DCDDD6] space-y-3 mt-auto">
                  <div className="font-mono text-[11px] text-[#8A8E96] uppercase font-bold flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                    How we solve it
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {ind.proof.map((p) => (
                      <a
                        key={p.name}
                        href={p.href}
                        className="flex items-center justify-between gap-2 group/proof p-2.5 bg-[#F5F6F1] border border-[#DCDDD6] rounded-xl hover:border-[#1F3D8C] hover:bg-white transition-all shadow-2xs"
                      >
                        <span className="font-body text-[12px] text-[#12151B] font-semibold group-hover/proof:text-[#FF4B23] transition-colors leading-tight">
                          {p.name}
                        </span>
                        <span className={`font-mono text-[9px] px-2 py-0.5 rounded-md border shrink-0 font-bold whitespace-nowrap ${ind.tagAccent}`}>
                          {p.stat}
                        </span>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white border border-[#DCDDD6] rounded-[1rem] p-5 sm:p-6 shadow-sm"
        >
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
            <p className="font-body text-sm text-[#585D67]">
              <strong className="text-[#12151B]">Don't see your industry?</strong>{" "}
              We build custom software for any business — talk to us.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onOpenAuditModal}
              className="btn-primary text-xs py-2.5 px-5 flex items-center gap-2"
            >
              <span>Get a Free Plan</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <a
              href="https://wa.me/919026665814?text=Hi%20WebifyIt!%20I%20want%20to%20discuss%20a%20project%20for%20my%20industry."
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary text-xs py-2.5 px-4 flex items-center gap-2"
            >
              <MessageSquare className="w-3.5 h-3.5 text-[#25D366]" />
              <span>WhatsApp Us</span>
            </a>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
