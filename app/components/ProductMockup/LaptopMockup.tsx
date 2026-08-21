"use client";

import React, { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

// ─── Product config ───────────────────────────────────────────────
const products = {
  hisabai: {
    src: "/screens/hisabai-monster.png", // fallback to something if no laptop
    name: "Hisab AI",
    tagline: "AI-Powered Expense Tracking",
  },
  dineezy: {
    src: "/screens/dineezy-dark.png",
    name: "Dineezy POS",
    tagline: "Restaurant Management System",
  },
  msgzone: {
    src: "/screens/msgzone-laptop.png",
    name: "MsgZone",
    tagline: "WhatsApp Marketing Platform",
  },
};

export type ProductKey = keyof typeof products;

interface LaptopMockupProps {
  product?: ProductKey;
}

export default function LaptopMockup({ product = "dineezy" }: LaptopMockupProps) {
  const config = products[product] ?? products.dineezy;
  const shouldReduceMotion = useReducedMotion();
  const [imgLoaded, setImgLoaded] = useState(false);

  const floatVariants = {
    animate: shouldReduceMotion
      ? {}
      : {
          y: [0, -12, 0],
          transition: {
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut" as const,
          },
        },
  };

  return (
    <div className="relative w-full h-full flex items-center justify-center" aria-hidden="true" style={{ perspective: "1800px" }}>
      
      {/* ── Floating laptop ─────────────────────────── */}
      <motion.div
        animate="animate"
        variants={floatVariants}
        className="relative flex flex-col items-center"
        style={{
          transformStyle: "preserve-3d",
          transform: "rotateY(-18deg) rotateX(15deg) rotateZ(-2deg)",
          willChange: "transform",
        }}
      >
        {/* Soft shadow beneath laptop */}
        <div 
          className="absolute pointer-events-none" 
          style={{
             bottom: "-50px", left: "-5%", right: "-5%", height: "40px",
             background: "radial-gradient(ellipse at center, rgba(0,0,0,0.4) 0%, transparent 60%)",
             filter: "blur(12px)",
             transform: "translateZ(-100px) rotateX(90deg)"
          }}
        />

        {/* Laptop Lid (Screen) */}
        <motion.div
          className="relative flex items-center justify-center"
          initial={shouldReduceMotion ? { rotateX: -8 } : { rotateX: -90 }}
          whileInView={{ rotateX: -8 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
          style={{
            width: "520px",
            height: "340px",
            transformOrigin: "bottom center",
            transformStyle: "preserve-3d",
          }}
        >
          {/* ── FRONT: Screen Side ── */}
          <div
            className="absolute inset-0 flex flex-col items-center justify-center"
            style={{
              background: "linear-gradient(to bottom right, #2a2a2f, #111116)",
              borderRadius: "16px 16px 0 0",
              border: "1px solid rgba(255,255,255,0.1)",
              borderBottom: "none",
              boxShadow: `
                inset 0 0 0 1px rgba(0,0,0,0.8),
                inset 0 2px 4px rgba(255,255,255,0.2)
              `,
              transform: "translateZ(1px)",
              backfaceVisibility: "hidden"
            }}
          >
            {/* Outer edge highlight (metallic rim) */}
            <div className="absolute inset-0 rounded-[16px_16px_0_0] pointer-events-none" style={{
              boxShadow: "inset 0 1px 1px rgba(255,255,255,0.15), inset 0 0 0 3px #18181b"
            }} />

            {/* Seamless Glass Bezel */}
            <div
              className="absolute inset-[4px] bottom-[14px] flex flex-col"
              style={{
                background: "#000",
                borderRadius: "10px",
                boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.05), 0 0 2px rgba(0,0,0,1)",
                overflow: "hidden",
              }}
            >
              {/* Screen Glare (Diagonal highlight) */}
              <div 
                className="absolute top-0 left-0 w-full h-full pointer-events-none z-10"
                style={{
                  background: "linear-gradient(105deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 30%, transparent 31%, transparent 100%)",
                }}
              />

              {/* Camera */}
              <div className="flex justify-center items-center h-5 flex-shrink-0 bg-black z-20">
                <div className="w-1.5 h-1.5 rounded-full bg-[#111] border border-[#222]"></div>
                <div className="w-1 h-1 rounded-full bg-emerald-500 ml-2 opacity-50 blur-[1px]"></div> {/* active light */}
              </div>

              {/* Screen Image */}
              <div className="flex-1 relative overflow-hidden bg-[#1a1a26]">
                <img
                  src={config.src}
                  alt={`${config.name} app screen`}
                  onLoad={() => setImgLoaded(true)}
                  className="absolute inset-0 w-full h-full object-cover object-top"
                  style={{ opacity: imgLoaded ? 1 : 0, transition: "opacity 0.6s ease" }}
                />
              </div>
              
              {/* Logo Area */}
              <div className="h-5 flex items-center justify-center flex-shrink-0 bg-black z-20">
                <div className="text-[7px] text-zinc-600 font-bold uppercase tracking-[0.25em]">
                  WebifyIt
                </div>
              </div>
            </div>
          </div>

          {/* ── BACK: Outer Cover Side ── */}
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(to bottom right, #cfd0d4, #a4a5ab)",
              borderRadius: "16px 16px 0 0",
              border: "1px solid #d4d4d8",
              borderBottom: "none",
              boxShadow: "inset 0 1px 2px rgba(255,255,255,0.8)",
              transform: "translateZ(-1px) rotateY(180deg)",
              backfaceVisibility: "hidden"
            }}
          >
            {/* Faded embossed logo on the back */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-30 flex items-center gap-2">
              <span className="font-display font-bold text-xl tracking-[0.2em] text-[#12151B]">
                WEBIFYIT
              </span>
            </div>
          </div>
        </motion.div>

        {/* Laptop Base (Keyboard Deck) */}
        <div
          className="absolute"
          style={{
            top: "100%",
            width: "520px",
            height: "360px",
            background: "linear-gradient(to bottom, #cfd0d4, #a4a5ab)",
            borderRadius: "4px 4px 20px 20px",
            transformOrigin: "top center",
            transform: "rotateX(90deg) translateY(-1px)", /* Flat on the desk */
            transformStyle: "preserve-3d",
            border: "1px solid #d4d4d8",
            boxShadow: "inset 0 1px 2px rgba(255,255,255,0.8), inset 0 -1px 2px rgba(0,0,0,0.1)",
          }}
        >
          {/* Hinge */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-[#18181b]"
               style={{ width: "340px", height: "16px", borderRadius: "0 0 4px 4px", boxShadow: "inset 0 -2px 5px rgba(0,0,0,0.5)" }} />

          {/* Keyboard Well */}
          <div
            className="absolute top-8 left-1/2 -translate-x-1/2 bg-[#27272a]"
            style={{
              width: "460px",
              height: "170px",
              borderRadius: "6px",
              boxShadow: "inset 0 2px 10px rgba(0,0,0,0.8), 0 1px 0 rgba(255,255,255,0.7)",
              border: "1px solid #3f3f46"
            }}
          >
            {/* Faux Keys */}
            <div 
              className="w-full h-full" 
              style={{
                backgroundImage: `
                  linear-gradient(90deg, transparent 92%, #27272a 92%),
                  linear-gradient(0deg, transparent 88%, #27272a 88%)
                `,
                backgroundSize: "28px 27px",
                backgroundPosition: "5px 5px",
                opacity: 0.5
              }}
            />
          </div>

          {/* Trackpad */}
          <div
            className="absolute top-[210px] left-1/2 -translate-x-1/2"
            style={{
              width: "160px",
              height: "120px",
              borderRadius: "6px",
              background: "linear-gradient(to bottom, #bcbdc4, #c9cacc)",
              boxShadow: "inset 0 2px 6px rgba(0,0,0,0.15), 0 1px 1px rgba(255,255,255,0.9)",
              border: "1px solid rgba(0,0,0,0.05)"
            }}
          ></div>
          
          {/* Front Lip Depth (creates 3D thickness for the base) */}
          <div
            className="absolute bottom-0 left-0 w-full"
            style={{
              height: "12px",
              background: "linear-gradient(to right, #7a7b82, #94959c, #7a7b82)",
              transformOrigin: "bottom center",
              transform: "rotateX(-90deg) translateY(12px)",
              borderRadius: "0 0 16px 16px",
              boxShadow: "0 25px 50px rgba(0,0,0,0.5)",
              borderTop: "1px solid rgba(255,255,255,0.4)"
            }}
          >
            {/* Trackpad notch */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-1.5 bg-[#8b8c94] rounded-b-sm shadow-inner"></div>
          </div>
        </div>
      </motion.div>

    </div>
  );
}
