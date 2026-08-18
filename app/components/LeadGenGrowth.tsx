"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Zap, MessageSquare, ArrowRight, ShieldCheck, Check } from "lucide-react";
import Card3D from "./Card3D";

interface LeadGenGrowthProps {
  onOpenAuditModal: () => void;
}

export default function LeadGenGrowth({ onOpenAuditModal }: LeadGenGrowthProps) {
  const timelineRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(timelineRef, { once: true, margin: "-100px" });
  const [pathLength, setPathLength] = useState(0);
  const pathRef = useRef<SVGPathElement>(null);
  const [activeStep, setActiveStep] = useState(-1);

  useEffect(() => {
    if (pathRef.current) {
      setPathLength(pathRef.current.getTotalLength());
    }
  }, []);

  // Sequential glow cycle: lights up each checkpoint 1→2→3→4 then repeats
  useEffect(() => {
    if (!isInView) return;
    let interval: NodeJS.Timeout;
    // Start the cycle after the draw-on animation finishes (2.5s)
    const startTimeout = setTimeout(() => {
      setActiveStep(0);
      interval = setInterval(() => {
        setActiveStep((prev) => (prev + 1) % 4);
      }, 1500);
    }, 2500);
    return () => {
      clearTimeout(startTimeout);
      if (interval) clearInterval(interval);
    };
  }, [isInView]);
  const steps = [
    {
      num: "1",
      title: "Understand",
      desc: "We start with a real conversation about your business — what's working, what's not, and where you want to go.",
      x: 25,
      y: 74.28,
    },
    {
      num: "2",
      title: "Qualify",
      desc: "We assess honestly whether we're the right partner and whether we can create real value for you.",
      x: 45.83,
      y: 60,
    },
    {
      num: "3",
      title: "Audit & Requirements",
      desc: "Once we know it's a fit, we go deep: current systems, workflows, gaps, and the exact requirements.",
      x: 66.66,
      y: 45.71,
    },
    {
      num: "4",
      title: "Growth & Scale",
      desc: "You get both a short-term execution plan and a long-term scaling roadmap with clear investment.",
      x: 87.5,
      y: 31.42,
    },
  ];

  return (
    <section id="growth" className="py-24 bg-white border-b border-[#DCDDD6] relative overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8 relative">
        
        {/* Desktop Layout - Exact match to inspiration */}
        <div ref={timelineRef} className="hidden lg:block relative w-full aspect-[1200/700] max-h-[700px] mt-12 mb-20 bg-white shadow-sm rounded-3xl border border-gray-100/50 overflow-hidden">
          
          {/* Big faint circle decoration */}
          <div className="absolute right-[-10%] top-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#F8F9FA] rounded-full z-0 pointer-events-none" />

          {/* Left Content (Titles & CTA) */}
          <div className="absolute top-16 left-12 w-[380px] z-30">
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="font-mono text-[10px] font-bold text-[#FF4B23] tracking-widest uppercase">
                FIG. 06 — PROCESS & EXECUTION
              </span>
            </div>
            <h2 className="font-display text-[42px] font-bold text-[#12151B] tracking-tight leading-[1.1] mb-6">
              How we work with you
            </h2>
            <p className="font-body text-base text-[#585D67] mb-10 leading-relaxed">
              Our process is designed to respect your time and ours — we qualify early, go deep when it matters, and give you full clarity before a single line of code is written.
            </p>
            <button
              onClick={onOpenAuditModal}
              className="bg-[#FF4B23] hover:bg-[#E03A16] text-white py-3.5 px-8 rounded-full text-sm font-medium transition-all shadow-[0_8px_20px_-6px_rgba(255,75,35,0.5)]"
            >
              Get Started
            </button>
          </div>

          {/* SVG Path Timeline */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-10" viewBox="0 0 1200 700" preserveAspectRatio="xMidYMid slice">
            <defs>
              <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="12" stdDeviation="8" floodColor="#FF4B23" floodOpacity="0.15" />
              </filter>
            </defs>
            {/* Faint base path (always visible) */}
            <path 
              d="M 0 350 C 150 350, 150 520, 300 520 C 425 520, 425 420, 550 420 C 675 420, 675 320, 800 320 C 925 320, 925 220, 1050 220 C 1125 220, 1150 180, 1200 180" 
              fill="none" 
              stroke="#FF4B23" 
              strokeWidth="3" 
              opacity="0.15"
              ref={pathRef}
            />
            {/* Draw-on animation for the path */}
            {pathLength > 0 && (
              <motion.path 
                d="M 0 350 C 150 350, 150 520, 300 520 C 425 520, 425 420, 550 420 C 675 420, 675 320, 800 320 C 925 320, 925 220, 1050 220 C 1125 220, 1150 180, 1200 180" 
                fill="none" 
                stroke="#FF4B23" 
                strokeWidth="3" 
                filter="url(#shadow)"
                initial={{ strokeDasharray: pathLength, strokeDashoffset: pathLength }}
                animate={isInView ? { strokeDashoffset: 0 } : { strokeDashoffset: pathLength }}
                transition={{ duration: 2.5, ease: "easeOut" }}
              />
            )}
          </svg>

          {/* Steps */}
          {steps.map((step, idx) => (
            <div 
              key={step.num}
              className="absolute z-20"
              style={{
                left: `${step.x}%`,
                top: `${step.y}%`,
              }}
            >
              {/* The Dot - glows when active */}
              <motion.div 
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.2 }}
                className="absolute -translate-x-1/2 -translate-y-1/2 w-7 h-7 rounded-full flex items-center justify-center"
                style={{
                  backgroundColor: activeStep === idx ? '#FF4B23' : '#FFFFFF',
                  boxShadow: activeStep === idx 
                    ? '0 0 20px rgba(255,75,35,0.6), 0 0 40px rgba(255,75,35,0.3), 0 0 60px rgba(255,75,35,0.15)' 
                    : '0 4px 10px rgba(0,0,0,0.1)',
                  border: activeStep === idx ? '2px solid rgba(255,75,35,0.8)' : '1px solid #F3F4F6',
                  transform: `translate(-50%, -50%) scale(${activeStep === idx ? 1.3 : 1})`,
                  transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                }}
              >
                <div 
                  className="rounded-full"
                  style={{
                    width: activeStep === idx ? '8px' : '8px',
                    height: activeStep === idx ? '8px' : '8px',
                    backgroundColor: activeStep === idx ? '#FFFFFF' : '#D1D5DB',
                    transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                  }}
                />
              </motion.div>
              {/* Expanding ring animation when active */}
              {activeStep === idx && (
                <motion.div
                  className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[#FF4B23]"
                  initial={{ width: 28, height: 28, opacity: 0.8 }}
                  animate={{ width: 56, height: 56, opacity: 0 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "easeOut" }}
                />
              )}

              {/* The Text Container (Always Below) */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 + idx * 0.2 }}
                className="absolute top-6 left-1/2 -translate-x-1/2 w-[240px] text-left"
              >
                <span className="absolute -top-12 -right-4 text-[130px] font-black text-[#CDD1D8] -z-10 select-none leading-none tracking-tighter">
                  {step.num}
                </span>
                <div className="relative z-10 pt-4">
                  <h3 className="font-display font-bold text-lg text-[#12151B] mb-2">{step.title}</h3>
                  <p className="font-body text-sm text-[#585D67] leading-relaxed">{step.desc}</p>
                </div>
              </motion.div>
            </div>
          ))}
        </div>

        {/* Mobile/Tablet Layout */}
        <div className="lg:hidden flex flex-col gap-12 mt-12 mb-20 relative">
          {/* Header for Mobile */}
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="font-mono text-[10px] font-bold text-[#FF4B23] tracking-widest uppercase">
                FIG. 06 — PROCESS & EXECUTION
              </span>
            </div>
            <h2 className="font-display text-4xl font-bold text-[#12151B] tracking-tight mb-4">
              How we work with you
            </h2>
            <p className="font-body text-sm text-[#585D67] leading-relaxed">
              Our process is designed to respect your time and ours — we qualify early, go deep when it matters, and give you full clarity before a single line of code is written.
            </p>
          </div>

          <div className="relative flex flex-col gap-16 ml-4">
            <div className="absolute left-[11px] top-4 bottom-4 w-[3px] bg-[#FF4B23] shadow-[0_0_10px_rgba(255,75,35,0.3)]" />
            
            {steps.map((step, idx) => (
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                key={step.num} 
                className="relative flex gap-6"
              >
                <div className="relative z-10 flex-shrink-0 mt-1">
                  <div 
                    className="w-7 h-7 rounded-full flex items-center justify-center"
                    style={{
                      backgroundColor: activeStep === idx ? '#FF4B23' : '#FFFFFF',
                      boxShadow: activeStep === idx 
                        ? '0 0 20px rgba(255,75,35,0.6), 0 0 40px rgba(255,75,35,0.3)' 
                        : '0 4px 10px rgba(0,0,0,0.1)',
                      border: activeStep === idx ? '2px solid rgba(255,75,35,0.8)' : '1px solid #F3F4F6',
                      transform: `scale(${activeStep === idx ? 1.3 : 1})`,
                      transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                    }}
                  >
                    <div 
                      className="rounded-full"
                      style={{
                        width: '8px',
                        height: '8px',
                        backgroundColor: activeStep === idx ? '#FFFFFF' : '#D1D5DB',
                        transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                      }}
                    />
                  </div>
                </div>
                
                <div className="relative pb-2 flex-1">
                  <span className="absolute -top-6 right-4 text-[90px] font-black text-[#CDD1D8] -z-10 select-none tracking-tighter leading-none">
                    {step.num}
                  </span>
                  <h3 className="font-display font-bold text-lg text-[#12151B] mb-2">{step.title}</h3>
                  <p className="font-body text-sm text-[#585D67] leading-relaxed max-w-[280px]">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <button
            onClick={onOpenAuditModal}
            className="mt-4 bg-[#FF4B23] hover:bg-[#E03A16] text-white py-3.5 px-8 rounded-full text-sm font-medium transition-all shadow-[0_8px_20px_-6px_rgba(255,75,35,0.5)] w-full sm:w-auto self-start"
          >
            Get Started
          </button>
        </div>

        {/* Floating Call to Action Bar */}
        <Card3D intensity={6}>
          <div className="bg-[#12151B] text-white p-8 rounded-xs shadow-2xl border border-[#12151B] flex flex-col md:flex-row items-center justify-between gap-6 xmark">
            <div className="space-y-2 text-center md:text-left">
              <div className="inline-flex items-center gap-2 font-mono text-xs text-[#FF4B23] uppercase tracking-wider font-bold">
                <Zap className="w-4 h-4" />
                FAST TRACK PROJECT INITIATION
              </div>
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Ready to see if we're the right fit?
              </h3>
              <p className="font-body text-sm text-[#8A8E96] max-w-xl">
                Tell us about your business and we'll give you an honest assessment — including whether we're the right team for the job.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
              <button
                onClick={onOpenAuditModal}
                className="btn-primary py-3.5 px-6 text-sm shadow-3d-accent flex items-center gap-2 w-full sm:w-auto justify-center"
              >
                <span>Get Free Website Review</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <a
                href="https://wa.me/919026665814?text=Hi%20WebifyIt!%20I%20want%20to%20chat%20on%20WhatsApp%20about%20a%20new%20project."
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary bg-white/10 text-white border-white/20 hover:bg-white/20 py-3.5 px-6 text-sm flex items-center gap-2 w-full sm:w-auto justify-center"
              >
                <MessageSquare className="w-4 h-4 text-[#25D366]" />
                <span>WhatsApp Us</span>
              </a>
            </div>
          </div>
        </Card3D>

      </div>
    </section>
  );
}
