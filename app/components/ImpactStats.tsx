"use client";

import React from "react";
import { motion } from "framer-motion";
import { Zap, ShieldCheck, Award, TrendingUp } from "lucide-react";
import Card3D from "./Card3D";

export default function ImpactStats() {
  const stats = [
    {
      id: "ST-01",
      number: "100%",
      label: "Lighthouse Performance",
      subtext: "Sub-100ms Core Web Vitals across all client builds",
      icon: <Zap className="w-5 h-5 text-[#FF4B23]" />,
    },
    {
      id: "ST-02",
      number: "3.8x",
      label: "Average Funnel Lift",
      subtext: "Conversion rate increase post digital overhaul",
      icon: <TrendingUp className="w-5 h-5 text-[#60A5FA]" />,
    },
    {
      id: "ST-03",
      number: "99.99%",
      label: "Guaranteed Cloud SLA",
      subtext: "High-availability edge server deployment",
      icon: <ShieldCheck className="w-5 h-5 text-[#FF4B23]" />,
    },
    {
      id: "ST-04",
      number: "25+",
      label: "Shipped Platforms",
      subtext: "Bespoke SaaS, AI agents, and enterprise web apps",
      icon: <Award className="w-5 h-5 text-[#60A5FA]" />,
    },
  ];

  return (
    <section id="impact" className="py-16 bg-[#12151B] text-white relative overflow-hidden bg-grid-dark">
      {/* Subtle Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] bg-radial from-[#1F3D8C]/20 via-[#FF4B23]/10 to-transparent blur-3xl pointer-events-none rounded-full" />

      <div className="max-w-[1180px] mx-auto px-5 sm:px-8 relative z-10">
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, idx) => (
            <Card3D key={stat.id} intensity={12}>
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="glass-panel-dark p-6 rounded-xs border border-white/10 hover:border-[#FF4B23]/60 transition-all duration-300 flex flex-col justify-between h-full group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4 translate-z-10">
                    <div className="p-2.5 bg-white/5 border border-white/10 rounded-xs group-hover:border-[#FF4B23] transition-colors">
                      {stat.icon}
                    </div>
                    <span className="font-mono text-[10px] text-[#8A8E96] border border-white/10 px-2 py-0.5 rounded-2xs">
                      {stat.id}
                    </span>
                  </div>

                  <div className="font-display font-extrabold text-4xl text-white tracking-tight mb-1 group-hover:text-[#FF4B23] transition-colors translate-z-20">
                    {stat.number}
                  </div>
                  <div className="font-display font-semibold text-base text-white/90 mb-2 translate-z-10">
                    {stat.label}
                  </div>
                  <p className="font-body text-xs text-[#8A8E96] leading-relaxed translate-z-10">
                    {stat.subtext}
                  </p>
                </div>
              </motion.div>
            </Card3D>
          ))}
        </div>

      </div>
    </section>
  );
}
