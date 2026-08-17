"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Code2, Users, ShieldCheck } from "lucide-react";

export default function AgencyHero() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
    }),
  };

  return (
    <section className="pt-32 pb-20 lg:pt-40 lg:pb-28 relative overflow-hidden bg-grid-pattern border-b border-[#DCDDD6]">
      <div className="absolute top-0 right-0 w-1/2 h-[500px] bg-gradient-to-bl from-[#1F3D8C]/10 to-transparent blur-3xl pointer-events-none rounded-bl-full" />
      
      <div className="max-w-[1180px] mx-auto px-5 sm:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <motion.div initial="hidden" animate="visible" className="lg:col-span-7 flex flex-col items-start space-y-6">
            <motion.div custom={0} variants={fadeInUp} className="inline-flex items-center gap-2.5 px-3.5 py-1.5 bg-white/90 border border-[#C7C9C0] rounded-xs shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="font-mono text-[10px] font-bold tracking-wider text-[#12151B] uppercase">
                WHITE-LABEL ENGINEERING PARTNER
              </span>
            </motion.div>

            <motion.h1 custom={1} variants={fadeInUp} className="font-display text-4xl sm:text-5xl lg:text-[56px] font-bold text-[#12151B] leading-[1.05] tracking-tight">
              You sell.<br/>
              <span className="text-[#1F3D8C]">We build.</span><br/>
              You deliver.
            </motion.h1>

            <motion.p custom={2} variants={fadeInUp} className="font-body text-base sm:text-lg text-[#585D67] max-w-xl leading-relaxed">
              Scale your agency without hiring overhead. We provide elite, white-label engineering capacity for custom software, SaaS, and AI automation. You keep the client, we deliver the code.
            </motion.p>

            <motion.div custom={3} variants={fadeInUp} className="flex flex-col sm:flex-row items-center gap-4 pt-4 w-full sm:w-auto">
              <button className="btn-primary text-base py-3.5 px-6 group w-full sm:w-auto shadow-3d-accent">
                <span>Start with one project</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
              <button className="btn-secondary text-base py-3.5 px-6 w-full sm:w-auto text-[#12151B] border-[#C7C9C0] hover:bg-[#F5F6F1]">
                Book a partner call
              </button>
            </motion.div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3, duration: 0.8 }} className="lg:col-span-5 relative w-full h-full flex justify-center lg:justify-end">
            <div className="bg-white border border-[#DCDDD6] rounded-xl shadow-2xl p-6 w-full max-w-md relative overflow-hidden">
               <div className="absolute top-0 left-0 w-full h-1 bg-[#1F3D8C]"></div>
               <div className="font-mono text-xs font-bold text-[#8A8E96] uppercase mb-5 tracking-widest">Partner Commitments</div>
               <div className="space-y-4">
                  <div className="flex items-center gap-4 pb-4 border-b border-[#F5F6F1]">
                     <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center shrink-0">
                       <ShieldCheck className="w-5 h-5 text-emerald-600" />
                     </div>
                     <div>
                        <div className="font-display font-bold text-[#12151B]">100% White-Label</div>
                        <div className="font-body text-[11px] text-[#585D67]">Strict NDA. We work invisibly behind you.</div>
                     </div>
                  </div>
                  <div className="flex items-center gap-4 pb-4 border-b border-[#F5F6F1]">
                     <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
                       <Code2 className="w-5 h-5 text-[#1F3D8C]" />
                     </div>
                     <div>
                        <div className="font-display font-bold text-[#12151B]">Full IP Ownership</div>
                        <div className="font-body text-[11px] text-[#585D67]">You & your client own all the source code.</div>
                     </div>
                  </div>
                  <div className="flex items-center gap-4">
                     <div className="w-10 h-10 rounded-lg bg-orange-50 flex items-center justify-center shrink-0">
                       <Users className="w-5 h-5 text-[#FF4B23]" />
                     </div>
                     <div>
                        <div className="font-display font-bold text-[#12151B]">Dedicated Capacity</div>
                        <div className="font-body text-[11px] text-[#585D67]">Overflow or full-team flexible allocation.</div>
                     </div>
                  </div>
               </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
