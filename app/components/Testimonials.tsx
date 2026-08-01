"use client";

import React from "react";
import { motion } from "framer-motion";
import { Star, CheckCircle, Quote } from "lucide-react";
import Card3D from "./Card3D";

export default function Testimonials() {
  const reviews = [
    {
      id: "REV-01",
      quote:
        "WebifyIt transformed our online ordering experience. DineEzy operates smoothly during peak hours, and order dispatch latency dropped dramatically.",
      author: "Aditya Sharma",
      role: "Operations Lead, DineEzy",
      metric: "4.8x Order Speedup",
      rating: 5,
    },
    {
      id: "REV-02",
      quote:
        "MsgZone handled over 50,000 automated dispatch messages daily without a single bottleneck. Their technical execution is top tier.",
      author: "Vikram Malhotra",
      role: "Founder, MsgZone Live",
      metric: "50k+ Msgs Daily",
      rating: 5,
    },
    {
      id: "REV-03",
      quote:
        "HisabAI's voice logging feature simplified expense tracking for thousands of our active mobile app users. Highly recommended team!",
      author: "Neha Kapoor",
      role: "Product Manager, HisabAI",
      metric: "99.4% Voice Accuracy",
      rating: 5,
    },
  ];

  return (
    <section id="testimonials" className="py-20 bg-[#F5F6F1] border-b border-[#DCDDD6]">
      <div className="max-w-[1180px] mx-auto px-5 sm:px-8">
        
        {/* Header */}
        <div className="max-w-2xl mb-12">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="font-mono text-xs font-bold text-[#FF4B23] tracking-widest uppercase">
              FIG. 04 — VERIFIED CLIENT TESTIMONIALS
            </span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#12151B] tracking-tight">
            Trusted by founders & product teams
          </h2>
          <p className="font-body text-base text-[#585D67] mt-3">
            Direct feedback from business leaders who rely on our software platforms to run their operations.
          </p>
        </div>

        {/* 3D Review Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((rev, idx) => (
            <Card3D key={rev.id} intensity={12} className="h-full">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="xmark bg-white border border-[#C7C9C0] p-6 rounded-xs flex flex-col justify-between hover:shadow-3d hover:border-[#1F3D8C] transition-all duration-300 h-full group"
              >
                <div>
                  {/* Top Bar */}
                  <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#DCDDD6] translate-z-10">
                    <div className="flex items-center gap-1">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-[#FF4B23] text-[#FF4B23]" />
                      ))}
                    </div>
                    <span className="font-mono text-[10px] text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-2xs border border-emerald-200 flex items-center gap-1">
                      <CheckCircle className="w-3 h-3" />
                      {rev.metric}
                    </span>
                  </div>

                  <Quote className="w-7 h-7 text-[#1F3D8C]/20 mb-2 translate-z-10" />

                  <p className="font-body text-sm text-[#12151B] leading-relaxed mb-6 font-medium translate-z-20">
                    &quot;{rev.quote}&quot;
                  </p>
                </div>

                {/* Author Info */}
                <div className="pt-4 border-t border-[#DCDDD6] translate-z-10">
                  <div className="font-display font-bold text-sm text-[#12151B] group-hover:text-[#FF4B23] transition-colors">
                    {rev.author}
                  </div>
                  <div className="font-mono text-xs text-[#8A8E96] mt-0.5">
                    {rev.role}
                  </div>
                </div>

              </motion.div>
            </Card3D>
          ))}
        </div>

      </div>
    </section>
  );
}
