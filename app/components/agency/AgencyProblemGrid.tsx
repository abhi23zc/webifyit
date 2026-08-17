"use client";

import React from "react";
import { motion } from "framer-motion";
import { XCircle, CheckCircle2 } from "lucide-react";

export default function AgencyProblemGrid() {
  const problems = [
    {
      title: "Turning down complex work",
      problem: "You have clients asking for custom SaaS or AI tools, but your current team only builds basic websites.",
      solution: "Say yes to every brief. We handle the complex backend, API, and AI engineering.",
    },
    {
      title: "Hiring overhead & risk",
      problem: "Hiring senior full-stack developers is expensive and risky when project pipeline fluctuates.",
      solution: "Scale your capacity instantly up or down with zero hiring or firing overhead.",
    },
    {
      title: "Unreliable freelancers",
      problem: "Managing multiple freelancers leads to missed deadlines, poor code quality, and communication black holes.",
      solution: "Get a dedicated, managed engineering pod that works directly in your Slack/Jira.",
    },
  ];

  return (
    <section className="py-20 bg-white border-b border-[#DCDDD6]">
      <div className="max-w-[1180px] mx-auto px-5 sm:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#12151B] tracking-tight">
            The agency growth bottleneck
          </h2>
          <p className="font-body text-base text-[#585D67] mt-3">
            Growing an agency is hard when your delivery capacity doesn&apos;t match your sales pipeline.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {problems.map((item, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className="border border-[#DCDDD6] rounded-xl p-6 sm:p-8 bg-[#F5F6F1] flex flex-col h-full hover:border-[#1F3D8C] transition-colors"
            >
              <h3 className="font-display font-bold text-lg text-[#12151B] mb-6">
                {item.title}
              </h3>
              
              <div className="mb-6 flex-1">
                <div className="flex items-start gap-2 mb-2">
                  <XCircle className="w-4 h-4 text-[#FF4B23] shrink-0 mt-0.5" />
                  <span className="font-mono text-[10px] font-bold text-[#8A8E96] uppercase tracking-wider">The Problem</span>
                </div>
                <p className="font-body text-sm text-[#585D67] leading-relaxed pl-6">
                  {item.problem}
                </p>
              </div>

              <div className="pt-6 border-t border-[#DCDDD6]">
                <div className="flex items-start gap-2 mb-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="font-mono text-[10px] font-bold text-[#1F3D8C] uppercase tracking-wider">With WebifyIt</span>
                </div>
                <p className="font-body text-sm text-[#12151B] font-semibold leading-relaxed pl-6">
                  {item.solution}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
