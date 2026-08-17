"use client";

import React from "react";
import { motion } from "framer-motion";

export default function PartnershipFlow() {
  const steps = [
    {
      num: "01",
      title: "Send a Brief",
      desc: "Send us your client's requirements. We'll review them within 24 hours to determine if we're a good technical fit.",
    },
    {
      num: "02",
      title: "Technical Scoping",
      desc: "We provide a clear technical architecture plan, timeline, and wholesale white-label quote for your agency.",
    },
    {
      num: "03",
      title: "Agile Development",
      desc: "We build the project using weekly sprints. You get staging links to share progress with your client seamlessly.",
    },
    {
      num: "04",
      title: "Handoff & Support",
      desc: "Full IP and source code transfer. We stay on for 30 days of free support, or you can opt for an ongoing retainer.",
    },
  ];

  return (
    <section className="py-20 bg-[#12151B] text-white overflow-hidden relative">
      <div className="absolute inset-0 bg-grid-dark opacity-50"></div>
      <div className="max-w-[1180px] mx-auto px-5 sm:px-8 relative z-10">
        
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight">
            How the partnership works
          </h2>
          <p className="font-body text-base text-[#8A8E96] mt-3">
            A frictionless process designed to protect your client relationship.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className="relative"
            >
              {/* Connector line */}
              {idx < steps.length - 1 && (
                <div className="hidden md:block absolute top-6 left-full w-full h-[1px] bg-gradient-to-r from-white/20 to-transparent -ml-4 z-0"></div>
              )}
              
              <div className="relative z-10 flex flex-col gap-4">
                <div className="w-12 h-12 rounded-full bg-white/5 border border-white/20 flex items-center justify-center font-mono text-sm font-bold text-[#FF4B23]">
                  {step.num}
                </div>
                <h3 className="font-display font-bold text-lg text-white">
                  {step.title}
                </h3>
                <p className="font-body text-sm text-[#8A8E96] leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
