"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { UtensilsCrossed, Landmark, ShoppingCart, Factory, ArrowRight, CheckCircle2, MessageSquare, Key, QrCode, Calculator, TrendingUp, MessageCircle, ShoppingBag, Shirt, MapPin } from "lucide-react";
import Card3D from "./Card3D";

interface IndustriesWeServeProps {
  onOpenAuditModal: () => void;
}

const industries = [
  {
    id: "IND-01",
    icon: <UtensilsCrossed className="w-6 h-6 text-[#FF4B23]" />,
    image: "/images/industries/hospitality.png",
    title: "Hospitality & Restaurants",
    tagline: "From walk-ins to full digital ops",
    painPoints: [
      "Booking friction & high no-show rates",
      "Manual order/inventory tracking slowing peak hours",
      "Slow customer response losing repeat business",
    ],
    proof: [
      { name: "Helpkey — Instant Booking", stat: "Sub-50ms Booking", href: "#projects", logo: <Key className="w-3.5 h-3.5 text-white" />, logoBg: "bg-gradient-to-br from-orange-400 to-red-500" },
      { name: "Dineezy — QR Order System", stat: "4.8x Order Speedup", href: "#projects", imgSrc: "/dineezy-logo.png" },
    ],
    accent: "border-[#FF4B23]/30 hover:border-[#FF4B23]",
    tagAccent: "bg-[#FF4B23]/10 text-[#FF4B23] border-[#FF4B23]/20",
  },
  {
    id: "IND-02",
    icon: <Landmark className="w-6 h-6 text-[#1F3D8C]" />,
    image: "/images/industries/fintech.png",
    title: "Fintech & Financial Services",
    tagline: "Automate the ledger, accelerate the loan",
    painPoints: [
      "Manual ledgers & expense tracking eating hours daily",
      "Slow loan/lead qualification losing applicants",
      "Compliance overhead without digital audit trails",
    ],
    proof: [
      { name: "HisabAI — AI Financial Ledger", stat: "99.4% Scan Accuracy", href: "#projects", logo: <Calculator className="w-3.5 h-3.5 text-white" />, logoBg: "bg-gradient-to-br from-blue-500 to-indigo-600" },
      { name: "GrowPlus — Lead Qualification", stat: "3.2x Lead Conv.", href: "#projects", imgSrc: "/logos/growplus.png" },
    ],
    accent: "border-[#1F3D8C]/30 hover:border-[#1F3D8C]",
    tagAccent: "bg-[#1F3D8C]/10 text-[#1F3D8C] border-[#1F3D8C]/20",
  },
  {
    id: "IND-03",
    icon: <ShoppingCart className="w-6 h-6 text-emerald-600" />,
    image: "/images/industries/retail.png",
    title: "Retail, E-commerce & SaaS",
    tagline: "Sell more with less manual work",
    painPoints: [
      "Fragmented customer messaging across channels",
      "Manual order updates burning staff hours",
      "No automated follow-up losing warm leads",
    ],
    proof: [
      { name: "MsgZone — WhatsApp Dispatch", stat: "50k+ Msgs/Day", href: "#projects", logo: <MessageCircle className="w-3.5 h-3.5 text-white" />, logoBg: "bg-gradient-to-br from-emerald-400 to-green-600" },
      { name: "OyeStore — E-commerce Platform", stat: "Full Automation", href: "#projects", imgSrc: "/logos/oyestore.png" },
    ],
    accent: "border-emerald-500/30 hover:border-emerald-500",
    tagAccent: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
  {
    id: "IND-04",
    icon: <Factory className="w-6 h-6 text-[#585D67]" />,
    image: "/images/industries/manufacturing.png",
    title: "Manufacturing & Textile",
    tagline: "Take B2B and export buyers online",
    painPoints: [
      "Outdated static sites repelling digital-first buyers",
      "No digital lead capture for B2B or export inquiries",
      "Manual order inquiries via phone causing delays & errors",
    ],
    proof: [
      { name: "Renascence Hosiers — B2B Portal", stat: "Digital Lead Capture", href: "#projects", logo: <Shirt className="w-3.5 h-3.5 text-white" />, logoBg: "bg-gradient-to-br from-gray-600 to-slate-800" },
      { name: "Lucknow Hub — Local B2B", stat: "UP Manufacturing", href: "#projects", logo: <MapPin className="w-3.5 h-3.5 text-white" />, logoBg: "bg-gradient-to-br from-stone-500 to-gray-700" },
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

        {/* Industry Layout */}
        <div className="flex flex-col w-full relative pb-20">
          {industries.map((ind, idx) => {
            return (
              <motion.div
                key={ind.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className={`flex flex-col md:flex-row h-full gap-10 lg:gap-20 items-center group sticky bg-[#F5F6F1] pt-8 lg:pt-12 pb-16 lg:pb-32 ${idx > 0 ? 'border-t border-[#DCDDD6]/80' : ''}`}
                style={{
                  top: `calc(10vh + ${idx * 40}px)`,
                  zIndex: 10 + idx,
                }}
              >
                {/* Image Side */}
                <div className="w-full md:w-1/2 shrink-0 relative rounded-[2rem] overflow-hidden aspect-[4/3] border border-[#DCDDD6] shadow-sm bg-white">
                  <Image
                    src={ind.image}
                    alt={ind.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  />
                </div>

                {/* Content Side */}
                <div className="flex-1 flex flex-col w-full py-2">
                  {/* Card Header */}
                  <div className="flex items-start justify-between pb-5 border-b border-[#DCDDD6] mb-5">
                    <div className={`p-3 sm:p-3.5 rounded-xl border ${ind.tagAccent} bg-white`}>
                      {React.cloneElement(ind.icon as React.ReactElement<{ className?: string }>, { className: "w-6 h-6 sm:w-7 sm:h-7" })}
                    </div>
                    <span className="font-mono text-xs font-bold text-[#8A8E96] border border-[#DCDDD6] bg-white px-3 py-1.5 rounded-full shadow-sm">
                      {ind.id}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-display font-bold text-2xl lg:text-3xl text-[#12151B] mb-2 leading-snug">
                    {ind.title}
                  </h3>
                  <p className="font-mono text-sm font-bold text-[#8A8E96] mb-6 uppercase tracking-wider">
                    {ind.tagline}
                  </p>

                  {/* Pain Points */}
                  <div className="flex-1 space-y-3.5 mb-8">
                    {ind.painPoints.map((p) => (
                      <div key={p} className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full bg-red-50 flex items-center justify-center shrink-0 border border-red-100 mt-0.5">
                          <svg className="w-3 h-3 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                        </div>
                        <span className="font-body text-base text-[#585D67] leading-relaxed">{p}</span>
                      </div>
                    ))}
                  </div>

                  {/* Proof Links */}
                  <div className="pt-5 border-t border-[#DCDDD6] space-y-3 mt-auto">
                    <div className="font-mono text-xs text-[#8A8E96] uppercase font-bold flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      How we solve it
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {ind.proof.map((p) => (
                        <a
                          key={p.name}
                          href={p.href}
                          className="flex items-center justify-between gap-3 group/proof p-2.5 bg-white border border-[#DCDDD6] rounded-[14px] hover:border-[#1F3D8C] transition-all shadow-sm hover:shadow-md"
                        >
                          <div className="flex items-center gap-3 overflow-hidden">
                            {p.imgSrc ? (
                              <div className="w-8 h-8 shrink-0 relative rounded-[10px] overflow-hidden border border-[#DCDDD6] bg-[#F5F6F1]">
                                <Image src={p.imgSrc} alt={p.name} fill className="object-contain p-1" />
                              </div>
                            ) : (
                              <div className={`w-8 h-8 rounded-[10px] shrink-0 flex items-center justify-center shadow-inner ${p.logoBg}`}>
                                {p.logo}
                              </div>
                            )}
                            <span className="font-body text-xs sm:text-[13px] text-[#12151B] font-semibold group-hover/proof:text-[#1F3D8C] transition-colors leading-tight line-clamp-1">
                              {p.name}
                            </span>
                          </div>
                          <span className={`font-mono text-[9px] px-2.5 py-1 rounded-md border shrink-0 font-bold whitespace-nowrap ${ind.tagAccent} hidden 2xl:block`}>
                            {p.stat}
                          </span>
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
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
