"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, SquareArrowOutUpLeft } from "lucide-react";
import dynamic from "next/dynamic";

// Dynamic import for Three.js component (no SSR)
const LaptopMockup = dynamic(
  () => import("./ProductMockup/LaptopMockup"),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full min-h-[350px] lg:min-h-[500px] flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-[#DCDDD6] border-t-[#FF4B23] rounded-full animate-spin" />
      </div>
    ),
  }
);

const MobileMockup = dynamic(
  () => import("./ProductMockup/ProductMockup"),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full min-h-[350px] lg:min-h-[500px] flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-[#DCDDD6] border-t-[#FF4B23] rounded-full animate-spin" />
      </div>
    ),
  }
);

interface HeroProps {
  onOpenAuditModal: () => void;
}

export default function Hero({ onOpenAuditModal }: HeroProps) {
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
            <motion.div custom={0} variants={fadeInUp} className="inline-flex items-center gap-2.5 px-3.5 py-1.5 bg-white/90 backdrop-blur-md border border-[#C7C9C0] rounded-xs shadow-2xs flex-wrap">
              <span className="w-2 h-2 rounded-full bg-[#FF4B23] animate-pulse"></span>
              <span className="font-mono text-xs font-bold tracking-wider text-[#12151B] uppercase">
                BUILT FOR BUSINESSES
              </span>
              <span className="font-mono text-[10px] text-emerald-600 border-l border-[#DCDDD6] pl-2 font-semibold hidden sm:inline">
                HIGH CONVERSION WEBSITES & APPS
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1 custom={1} variants={fadeInUp} className="font-display text-4xl sm:text-5xl lg:text-[52px] font-bold text-[#12151B] leading-[1.10] tracking-tight">
              We engineer custom software,{" "}
              <span className="relative inline-block text-[#1F3D8C]">
                SaaS & AI.
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
              Your full-stack engineering partner. Get scalable custom web applications, enterprise SaaS platforms, and autonomous AI assistants built to accelerate your business.
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
                href="https://wa.me/919026665814?text=Hi%20WebifyIt!%20I%20would%20like%20to%20schedule%20a%20Technical%20Architecture%20Session."
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

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* Project 1 */}
                <a
                  href="#projects"
                  className="group flex flex-col gap-1.5 p-3 bg-white border border-[#DCDDD6] rounded-xs hover:border-[#1F3D8C] hover:shadow-sm transition-all duration-200"
                >
                  <div className="flex items-center justify-between">
                    <img src="/dineezy-logo.png" alt="Dineezy POS" className="w-8 h-8 rounded-xs object-contain" />
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  </div>
                  <div className="font-display font-bold text-xs text-[#12151B] group-hover:text-[#1F3D8C] transition-colors leading-tight">
                    Dineezy POS
                  </div>
                  <div className="font-mono text-[10px] text-[#585D67]">
                    Restaurant QR ordering & table management system
                  </div>
                </a>

                {/* Project 2 */}
                <a
                  href="#projects"
                  className="group flex flex-col gap-1.5 p-3 bg-white border border-[#DCDDD6] rounded-xs hover:border-[#FF4B23] hover:shadow-sm transition-all duration-200"
                >
                  <div className="flex items-center justify-between">
                    <img src="https://m.msgzone.in/assets/logo.png" alt="MsgZone" className="w-8 h-8 rounded-xs object-contain" />
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  </div>
                  <div className="font-display font-bold text-xs text-[#12151B] group-hover:text-[#FF4B23] transition-colors leading-tight">
                    MsgZone
                  </div>
                  <div className="font-mono text-[10px] text-[#585D67]">
                    Bulk WhatsApp messaging & marketing automation
                  </div>
                </a>

                {/* Project 3 */}
                <a
                  href="#projects"
                  className="group flex flex-col gap-1.5 p-3 bg-white border border-[#DCDDD6] rounded-xs hover:border-[#12151B] hover:shadow-sm transition-all duration-200"
                >
                  <div className="flex items-center justify-between">
                    <img src="https://hisabai.in/app-icon.svg" alt="Hisab AI" className="w-8 h-8 rounded-xs object-contain" />
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  </div>
                  <div className="font-display font-bold text-xs text-[#12151B] group-hover:text-[#585D67] transition-colors leading-tight">
                    Hisab AI
                  </div>
                  <div className="font-mono text-[10px] text-[#585D67]">
                    AI-powered expense tracking & bill splitting app
                  </div>
                </a>
              </div>
            </motion.div>

          </motion.div>

          {/* Right Column: 3D Product Mockup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="lg:col-span-6 relative w-full flex items-center justify-center pt-8 lg:pt-0"
          >
            {/* Desktop Mockup (Hidden on mobile) */}
            <div className="hidden lg:block w-full h-[400px] sm:h-[480px] lg:h-[560px]">
              <LaptopMockup product="dineezy" />
            </div>
            
            {/* Mobile Mockup (Hidden on desktop) */}
            <div className="block lg:hidden w-full h-[450px] sm:h-[500px]">
              <MobileMockup product="hisabai" />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
