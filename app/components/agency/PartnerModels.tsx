"use client";

import React from "react";
import { motion } from "framer-motion";
import { Briefcase, Boxes } from "lucide-react";

export default function PartnerModels() {
  return (
    <section className="py-20 bg-white border-b border-[#DCDDD6]">
      <div className="max-w-[1180px] mx-auto px-5 sm:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-[#1F3D8C]"></span>
            <span className="font-mono text-xs font-bold text-[#12151B] tracking-widest uppercase">
              FLEXIBLE ENGAGEMENT
            </span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#12151B] tracking-tight">
            How we integrate with you
          </h2>
          <p className="font-body text-base text-[#585D67] mt-3">
            Whether you need a single project delivered or a dedicated team for ongoing work, we adapt to your commercial model.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Model 1 */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="border border-[#DCDDD6] p-8 sm:p-10 rounded-xl bg-gradient-to-br from-white to-[#F5F6F1] shadow-sm relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
              <Briefcase className="w-32 h-32 text-[#1F3D8C]" />
            </div>
            <div className="relative z-10">
              <div className="w-12 h-12 bg-[#1F3D8C] rounded-lg flex items-center justify-center mb-6">
                <Briefcase className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-display font-bold text-2xl text-[#12151B] mb-3">Project-Based Delivery</h3>
              <p className="font-body text-sm text-[#585D67] leading-relaxed mb-6">
                Fixed-scope, fixed-price delivery for specific client briefs. You mark up our wholesale quote, and we deliver the fully tested product.
              </p>
              <ul className="space-y-3 font-mono text-xs text-[#12151B] font-semibold">
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-[#FF4B23] rounded-full"></span> Fixed budget & timeline</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-[#FF4B23] rounded-full"></span> Defined MVP or V1 builds</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-[#FF4B23] rounded-full"></span> Zero financial risk for your agency</li>
              </ul>
            </div>
          </motion.div>

          {/* Model 2 */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="border border-[#DCDDD6] p-8 sm:p-10 rounded-xl bg-gradient-to-br from-[#12151B] to-[#1a1e26] shadow-xl text-white relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
              <Boxes className="w-32 h-32 text-white" />
            </div>
            <div className="relative z-10">
              <div className="w-12 h-12 bg-white/10 border border-white/20 rounded-lg flex items-center justify-center mb-6">
                <Boxes className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-display font-bold text-2xl text-white mb-3">Dedicated Retainer</h3>
              <p className="font-body text-sm text-[#8A8E96] leading-relaxed mb-6">
                A dedicated block of engineering hours per month to act as your continuous overflow capacity for multiple client projects.
              </p>
              <ul className="space-y-3 font-mono text-xs text-[#DCDDD6] font-semibold">
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span> Flexible monthly hour blocks</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span> Spread across multiple clients</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span> Direct Slack/Jira integration</li>
              </ul>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
