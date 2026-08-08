"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, CheckCircle2, Zap, BarChart2, ShieldCheck, Layers, Sparkles, SquareArrowOutUpLeft, Cpu, Bot } from "lucide-react";
import Card3D from "./Card3D";

interface HeroProps {
  onOpenAuditModal: () => void;
}

export default function Hero({ onOpenAuditModal }: HeroProps) {
  const [activeMetricView, setActiveMetricView] = useState<"performance" | "agents">("performance");

  const fadeInUp = {
    hidden: { opacity: 0, y: 24 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
    }),
  };

  return (
    <section id="hero" className="pt-28 pb-16 lg:pt-36 lg:pb-24 relative overflow-hidden bg-grid-pattern border-b border-[#DCDDD6]">
      {/* Ambient Depth Glow Background */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[450px] bg-radial from-[#1F3D8C]/10 via-[#FF4B23]/5 to-transparent blur-3xl pointer-events-none rounded-full" />

      <div className="max-w-[1180px] mx-auto px-5 sm:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">

          {/* Left Column: Authoritative Engineering Copy */}
          <motion.div
            initial="hidden"
            animate="visible"
            className="lg:col-span-6 flex flex-col items-start space-y-6"
          >
            {/* Eyebrow Tag */}
            <motion.div custom={0} variants={fadeInUp} className="inline-flex items-center gap-2.5 px-3.5 py-1.5 bg-white/90 backdrop-blur-md border border-[#C7C9C0] rounded-xs shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-[#FF4B23] animate-pulse"></span>
              <span className="font-mono text-xs font-bold tracking-wider text-[#12151B] uppercase">
                WEBIFYIT — WEB & AI STUDIO
              </span>
              <span className="font-mono text-[10px] text-[#1F3D8C] border-l border-[#DCDDD6] pl-2 font-semibold">
                CUSTOM WEB & AI SOLUTIONS
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1 custom={1} variants={fadeInUp} className="font-display text-4xl sm:text-5xl lg:text-[52px] font-bold text-[#12151B] leading-[1.10] tracking-tight">
              We build custom software &{" "}
              <span className="relative inline-block text-[#1F3D8C]">
                smart AI solutions.
                <svg
                  className="absolute -bottom-1.5 left-0 w-full h-2.5 text-[#FF4B23]"
                  viewBox="0 0 100 12"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M0,7 Q50,0 100,7"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                  />
                </svg>
              </span>
            </motion.h1>

            {/* Subhead */}
            <motion.p custom={2} variants={fadeInUp} className="font-body text-base sm:text-lg text-[#585D67] max-w-xl leading-relaxed">
              We build fast websites, AI chatbots & voice assistants, and cloud software tools that help your business run better — in English and Hindi.
            </motion.p>

            {/* CTAs */}
            <motion.div custom={3} variants={fadeInUp} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto pt-2">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onOpenAuditModal}
                className="btn-primary text-base py-3.5 px-6 group shadow-3d-accent"
              >
                <SquareArrowOutUpLeft className="w-4 h-4 text-white" />
                <span>Get a Free Project Plan</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </motion.button>

              <motion.a
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                href="https://wa.me/916394575814?text=Hi%20WebifyIt!%20I%20would%20like%20to%20schedule%20a%20Technical%20Architecture%20Session."
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary text-base py-3.5 px-6 text-center flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5 text-[#25D366]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.572-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                </svg>
                <span>Book a Free Call</span>
              </motion.a>
            </motion.div>

            {/* Live Projects Showcase Strip */}
            <motion.div custom={4} variants={fadeInUp} className="pt-6 border-t border-[#DCDDD6] w-full space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="font-mono text-xs text-[#8A8E96] font-bold uppercase tracking-wider">
                    Live in Production
                  </span>
                </div>
                <a
                  href="#projects"
                  className="font-mono text-[11px] text-[#FF4B23] font-semibold hover:underline flex items-center gap-1 group"
                >
                  View all
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </a>
              </div>

              <div className="grid grid-cols-3 gap-3">
                {/* Project 1 */}
                <a
                  href="#projects"
                  className="group flex flex-col gap-1.5 p-3 bg-white border border-[#DCDDD6] rounded-xs hover:border-[#1F3D8C] hover:shadow-sm transition-all duration-200"
                >
                  <div className="flex items-center justify-between">
                    <div className="w-7 h-7 rounded-xs bg-[#1F3D8C] flex items-center justify-center font-mono font-bold text-white text-[10px]">
                      DE
                    </div>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  </div>
                  <div className="font-display font-bold text-xs text-[#12151B] group-hover:text-[#1F3D8C] transition-colors leading-tight">
                    Dine-Easy POS
                  </div>
                  <div className="font-mono text-[10px] text-[#FF4B23] font-semibold">
                    4.8x Orders ↑
                  </div>
                </a>

                {/* Project 2 */}
                <a
                  href="#projects"
                  className="group flex flex-col gap-1.5 p-3 bg-white border border-[#DCDDD6] rounded-xs hover:border-[#FF4B23] hover:shadow-sm transition-all duration-200"
                >
                  <div className="flex items-center justify-between">
                    <div className="w-7 h-7 rounded-xs bg-[#25D366] flex items-center justify-center font-mono font-bold text-white text-[10px]">
                      MZ
                    </div>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  </div>
                  <div className="font-display font-bold text-xs text-[#12151B] group-hover:text-[#FF4B23] transition-colors leading-tight">
                    MsgZone
                  </div>
                  <div className="font-mono text-[10px] text-[#FF4B23] font-semibold">
                    50k+ Msgs/Day
                  </div>
                </a>

                {/* Project 3 */}
                <a
                  href="#projects"
                  className="group flex flex-col gap-1.5 p-3 bg-white border border-[#DCDDD6] rounded-xs hover:border-[#12151B] hover:shadow-sm transition-all duration-200"
                >
                  <div className="flex items-center justify-between">
                    <div className="w-7 h-7 rounded-xs bg-[#12151B] flex items-center justify-center font-mono font-bold text-white text-[10px]">
                      HK
                    </div>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  </div>
                  <div className="font-display font-bold text-xs text-[#12151B] group-hover:text-[#585D67] transition-colors leading-tight">
                    HelpKey
                  </div>
                  <div className="font-mono text-[10px] text-[#FF4B23] font-semibold">
                    Instant Booking
                  </div>
                </a>
              </div>
            </motion.div>

          </motion.div>

          {/* Right Column: Interactive Browser Engine */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="lg:col-span-6 relative"
          >
            <Card3D intensity={3} className="shadow-3d">
              <div className="xmark bg-white border border-[#C7C9C0] p-4 sm:p-6 rounded-xs relative transition-all duration-500">

                {/* Browser Header Bar */}
                <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-[#DCDDD6] translate-z-10">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-[#FF4B23] shadow-xs"></span>
                    <span className="w-3 h-3 rounded-full bg-[#FFB800] opacity-80"></span>
                    <span className="w-3 h-3 rounded-full bg-emerald-500 opacity-80"></span>
                  </div>
                  <div className="px-3.5 py-1 bg-[#F5F6F1] border border-[#DCDDD6] rounded-xs font-mono text-[11px] text-[#12151B] font-medium flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                    engine.webifyit.in/telemetry
                  </div>
                  <div className="font-mono text-[10px] text-[#1F3D8C] font-bold uppercase tracking-wider">
                    SPEC_V5.0
                  </div>
                </div>

                {/* Metric Toggle */}
                <div className="flex items-center justify-between mb-4 p-3 bg-[#EEF2FB] border border-[#1F3D8C]/20 rounded-xs translate-z-20 shadow-2xs">
                  <div>
                    <div className="font-mono text-[11px] font-bold text-[#1F3D8C] uppercase tracking-wider flex items-center gap-1.5">
                      <Cpu className="w-3.5 h-3.5 text-[#1F3D8C]" />
                      WEBSITE SPEED & AI PERFORMANCE
                    </div>
                    <div className="font-body text-xs text-[#585D67]">
                      Lightning-fast websites & smart AI automation
                    </div>
                  </div>
                  <div className="flex gap-1 bg-white p-1 rounded-xs border border-[#C7C9C0]">
                    <button
                      onClick={() => setActiveMetricView("performance")}
                      className={`font-mono text-[10px] px-2.5 py-1 rounded-2xs transition-all ${activeMetricView === "performance"
                        ? "bg-[#1F3D8C] text-white font-bold"
                        : "text-[#585D67] hover:text-[#12151B]"
                        }`}
                    >
                      Latency
                    </button>
                    <button
                      onClick={() => setActiveMetricView("agents")}
                      className={`font-mono text-[10px] px-2.5 py-1 rounded-2xs transition-all ${activeMetricView === "agents"
                        ? "bg-[#FF4B23] text-white font-bold"
                        : "text-[#585D67] hover:text-[#12151B]"
                        }`}
                    >
                      AI Voice
                    </button>
                  </div>
                </div>

                {/* SVG Blueprint & Chart */}
                <div className="bg-[#F5F6F1] p-4 border border-[#DCDDD6] rounded-xs relative mb-4 translate-z-30 overflow-hidden">
                  <AnimatePresence mode="wait">
                    {activeMetricView === "performance" ? (
                      <motion.div
                        key="perf-graph"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <svg className="w-full h-44 overflow-visible" viewBox="0 0 400 160">
                          <line x1="0" y1="40" x2="400" y2="40" stroke="#DCDDD6" strokeDasharray="3,3" />
                          <line x1="0" y1="80" x2="400" y2="80" stroke="#DCDDD6" strokeDasharray="3,3" />
                          <line x1="0" y1="120" x2="400" y2="120" stroke="#DCDDD6" strokeDasharray="3,3" />

                          <path
                            d="M 10 130 Q 60 90 100 100 T 200 50 T 300 70 T 390 20 L 390 150 L 10 150 Z"
                            fill="url(#trafficGradient)"
                          />
                          <path
                            d="M 10 130 Q 60 90 100 100 T 200 50 T 300 70 T 390 20"
                            fill="none"
                            stroke="#1F3D8C"
                            strokeWidth="3"
                            className="draw-path"
                          />

                          <defs>
                            <linearGradient id="trafficGradient" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor="#1F3D8C" stopOpacity="0.25" />
                              <stop offset="100%" stopColor="#1F3D8C" stopOpacity="0.0" />
                            </linearGradient>
                          </defs>

                          <circle cx="200" cy="50" r="5" fill="#1F3D8C" className="animate-ping" />
                          <circle cx="200" cy="50" r="5" fill="#1F3D8C" />
                          <circle cx="390" cy="20" r="5" fill="#FF4B23" />
                        </svg>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="agent-graph"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <svg className="w-full h-44 overflow-visible" viewBox="0 0 400 160">
                          <line x1="0" y1="40" x2="400" y2="40" stroke="#DCDDD6" strokeDasharray="3,3" />
                          <line x1="0" y1="80" x2="400" y2="80" stroke="#DCDDD6" strokeDasharray="3,3" />
                          <line x1="0" y1="120" x2="400" y2="120" stroke="#DCDDD6" strokeDasharray="3,3" />

                          <path
                            d="M 10 140 Q 80 120 140 110 T 240 70 T 330 40 T 390 25 L 390 150 L 10 150 Z"
                            fill="url(#conversionsGradient)"
                          />
                          <path
                            d="M 10 140 Q 80 120 140 110 T 240 70 T 330 40 T 390 25"
                            fill="none"
                            stroke="#FF4B23"
                            strokeWidth="3"
                            className="draw-path"
                          />

                          <defs>
                            <linearGradient id="conversionsGradient" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor="#FF4B23" stopOpacity="0.25" />
                              <stop offset="100%" stopColor="#FF4B23" stopOpacity="0.0" />
                            </linearGradient>
                          </defs>

                          <circle cx="240" cy="70" r="5" fill="#FF4B23" className="animate-ping" />
                          <circle cx="240" cy="70" r="5" fill="#FF4B23" />
                          <circle cx="390" cy="25" r="5" fill="#1F3D8C" />
                        </svg>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md border border-[#C7C9C0] p-3 rounded-xs shadow-md font-mono text-xs">
                    <div className="text-[#8A8E96] text-[10px] font-bold">
                      {activeMetricView === "performance" ? "WEBSITE LOAD SPEED" : "AI VOICE SPEED"}
                    </div>
                    <div className="font-bold text-[#12151B] text-base flex items-center gap-2">
                      {activeMetricView === "performance" ? "42ms" : "<220ms"}
                      <span className="text-emerald-600 text-[11px] bg-emerald-50 px-1.5 py-0.5 rounded-2xs font-semibold">Ultra Fast</span>
                    </div>
                  </div>
                </div>

                {/* Bottom Metric Tiles */}
                <div className="grid grid-cols-2 gap-3 translate-z-30">
                  <div className="p-3.5 bg-white border border-[#DCDDD6] rounded-xs shadow-2xs">
                    <div className="font-mono text-[10px] text-[#8A8E96] uppercase font-semibold">Google Speed Score</div>
                    <div className="font-display font-bold text-xl text-[#12151B]">100 / 100</div>
                    <div className="w-full bg-[#F5F6F1] h-2 rounded-full mt-2 overflow-hidden border border-[#DCDDD6]">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 1.2, delay: 0.5 }}
                        className="bg-[#FF4B23] h-full"
                      />
                    </div>
                  </div>

                  <div className="p-3.5 bg-white border border-[#DCDDD6] rounded-xs shadow-2xs">
                    <div className="font-mono text-[10px] text-[#8A8E96] uppercase font-semibold">AI Language Support</div>
                    <div className="font-display font-bold text-xl text-[#12151B]">English & Hindi</div>
                    <div className="w-full bg-[#F5F6F1] h-2 rounded-full mt-2 overflow-hidden border border-[#DCDDD6]">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "95%" }}
                        transition={{ duration: 1.2, delay: 0.7 }}
                        className="bg-[#1F3D8C] h-full"
                      />
                    </div>
                  </div>
                </div>

              </div>
            </Card3D>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
