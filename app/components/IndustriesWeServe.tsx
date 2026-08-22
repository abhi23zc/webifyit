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
    title: "Manufacturing & Real Estates",
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
            const topMobileClass = [
              "top-[5rem]",
              "top-[6rem]",
              "top-[7rem]",
              "top-[8rem]"
            ][idx];

            const topDesktopClass = [
              "md:top-[6rem]",
              "md:top-[7.5rem]",
              "md:top-[9rem]",
              "md:top-[10.5rem]"
            ][idx];
            
            const maxHMobileClass = [
              "max-h-[calc(100vh-5.5rem)]",
              "max-h-[calc(100vh-6.5rem)]",
              "max-h-[calc(100vh-7.5rem)]",
              "max-h-[calc(100vh-8.5rem)]"
            ][idx];

            const maxHDesktopClass = [
              "md:max-h-[calc(100vh-6.5rem)]",
              "md:max-h-[calc(100vh-8rem)]",
              "md:max-h-[calc(100vh-9.5rem)]",
              "md:max-h-[calc(100vh-11rem)]"
            ][idx];

            return (
              <div
                key={ind.id}
                className={`group sticky w-full bg-white rounded-2xl border border-[#DCDDD6] shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden mb-12 flex flex-col md:flex-row overflow-y-auto scrollbar-hide ${topMobileClass} ${topDesktopClass} ${maxHMobileClass} ${maxHDesktopClass}`}
                style={{
                  zIndex: 10 + idx,
                }}
              >
                {/* Image Side */}
                <div className="w-full md:w-1/3 relative h-[240px] md:h-auto border-b md:border-b-0 md:border-r border-[#DCDDD6] bg-[#F5F6F1] shrink-0">
                  <Image
                    src={ind.image}
                    alt={ind.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  />
                </div>

                {/* Content Side */}
                <div className="w-full md:w-2/3 p-6 sm:p-8 lg:p-10 flex flex-col bg-white">
                  {/* Header */}
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      {React.cloneElement(ind.icon as React.ReactElement<{ className?: string }>, { className: "w-5 h-5 text-[#1F3D8C]" })}
                      <span className="font-mono text-xs font-bold text-[#8A8E96] uppercase tracking-widest">{ind.id}</span>
                    </div>
                    <h3 className="font-display font-bold text-2xl lg:text-3xl text-[#12151B] mb-2 tracking-tight">
                      {ind.title}
                    </h3>
                    <p className="font-body text-base text-[#585D67]">
                      {ind.tagline}
                    </p>
                  </div>

                  {/* Challenge & Solution Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6 pt-6 border-t border-[#F0F1EB]">
                    {/* The Challenge */}
                    <div>
                      <h4 className="font-mono text-[10px] font-bold text-[#8A8E96] uppercase tracking-widest mb-4">The Challenge</h4>
                      <ul className="space-y-3">
                        {ind.painPoints.map((p) => (
                          <li key={p} className="flex items-start gap-2.5">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#FF4B23] mt-2 shrink-0"></div>
                            <span className="font-body text-sm text-[#585D67] leading-relaxed">{p}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* The Solution */}
                    <div>
                      <h4 className="font-mono text-[10px] font-bold text-[#8A8E96] uppercase tracking-widest mb-4">How We Solve It</h4>
                      <div className="flex flex-col gap-2.5">
                        {ind.proof.map((p) => (
                          <a
                            key={p.name}
                            href={p.href}
                            className="group/link flex items-center justify-between p-3 rounded-xl border border-[#DCDDD6] bg-[#F8F9F5] hover:border-[#1F3D8C] hover:bg-white transition-all shadow-sm"
                          >
                            <span className="font-body text-xs sm:text-[13px] font-semibold text-[#12151B] leading-tight line-clamp-1">{p.name}</span>
                            <ArrowRight className="w-4 h-4 text-[#8A8E96] group-hover/link:text-[#FF4B23] group-hover/link:-rotate-45 transition-transform shrink-0" />
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
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
