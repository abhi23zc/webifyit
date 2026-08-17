"use client";

import React from "react";
import { motion } from "framer-motion";
import { Shield, Lock, Server, KeyRound, FileCheck } from "lucide-react";

const trustItems = [
  {
    id: "SEC-01",
    icon: <Shield className="w-5 h-5 text-[#FF4B23]" />,
    title: "IP Ownership",
    desc: "You own 100% of the code, data, and IP we build for you — always, from day one. No questions, no conditions.",
  },
  {
    id: "SEC-02",
    icon: <Lock className="w-5 h-5 text-[#FF4B23]" />,
    title: "Confidentiality First",
    desc: "Every engagement starts with an NDA. Your business data, credentials, and roadmap stay confidential — never shared, never reused for another client.",
  },
  {
    id: "SEC-03",
    icon: <Server className="w-5 h-5 text-[#FF4B23]" />,
    title: "Secure Infrastructure",
    desc: "We build on secure, industry-standard cloud infrastructure with encrypted data in transit and at rest, role-based access control, and audit logging.",
  },
  {
    id: "SEC-04",
    icon: <KeyRound className="w-5 h-5 text-[#FF4B23]" />,
    title: "Access Control",
    desc: "Only the engineers actively working on your project have access to your systems and repositories — access is revoked at project close or on request.",
  },
  {
    id: "SEC-05",
    icon: <FileCheck className="w-5 h-5 text-[#FF4B23]" />,
    title: "Compliance-Aware Practices",
    desc: "We follow GDPR-aligned data handling principles for international clients and adapt our approach to industry-specific requirements as needed.",
  },
];

export default function DataProtection() {
  return (
    <section id="security" className="py-20 bg-[#12151B] text-white relative overflow-hidden">
      {/* Subtle ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-radial from-[#1F3D8C]/15 via-[#FF4B23]/8 to-transparent blur-3xl pointer-events-none rounded-full" />

      <div className="max-w-[1180px] mx-auto px-5 sm:px-8 relative z-10">

        {/* Header */}
        <div className="max-w-2xl mb-12">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="font-mono text-xs font-bold text-[#FF4B23] tracking-widest uppercase">
              FIG. 09 — TRUST & SECURITY
            </span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Built on trust — how we protect your business
          </h2>
          <p className="font-body text-base text-[#8A8E96] mt-3">
            For international clients and enterprise buyers especially — here's exactly how we handle your data, IP, and confidential information.
          </p>
        </div>

        {/* 5-Item Grid: 3 + 2 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
          {trustItems.slice(0, 3).map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="glass-panel-dark border border-white/10 hover:border-[#FF4B23]/50 p-6 rounded-xs transition-all duration-300 group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="p-2.5 bg-[#FF4B23]/10 border border-[#FF4B23]/20 rounded-xs group-hover:bg-[#FF4B23]/20 transition-colors">
                  {item.icon}
                </div>
                <span className="font-mono text-[10px] text-white/30 border border-white/10 px-1.5 py-0.5 rounded-2xs">
                  {item.id}
                </span>
              </div>
              <h3 className="font-display font-bold text-base text-white mb-2 group-hover:text-[#FF4B23] transition-colors">
                {item.title}
              </h3>
              <p className="font-body text-sm text-[#8A8E96] leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
          {trustItems.slice(3).map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: (idx + 3) * 0.1 }}
              className="glass-panel-dark border border-white/10 hover:border-[#FF4B23]/50 p-6 rounded-xs transition-all duration-300 group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="p-2.5 bg-[#FF4B23]/10 border border-[#FF4B23]/20 rounded-xs group-hover:bg-[#FF4B23]/20 transition-colors">
                  {item.icon}
                </div>
                <span className="font-mono text-[10px] text-white/30 border border-white/10 px-1.5 py-0.5 rounded-2xs">
                  {item.id}
                </span>
              </div>
              <h3 className="font-display font-bold text-base text-white mb-2 group-hover:text-[#FF4B23] transition-colors">
                {item.title}
              </h3>
              <p className="font-body text-sm text-[#8A8E96] leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Honest disclaimer bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="border border-white/10 rounded-xs p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center gap-3"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0 mt-1 sm:mt-0" />
          <p className="font-mono text-xs text-[#8A8E96] leading-relaxed">
            <span className="text-white font-semibold">Honest note:</span>{" "}
            We don't claim formal certifications (ISO 27001, SOC 2) we don't hold.
            "GDPR-aligned practices" and "industry-standard infrastructure" are the honest, accurate description of how we operate.
            International clients who need formal compliance evidence can discuss this directly with our team.
          </p>
        </motion.div>

      </div>
    </section>
  );
}
