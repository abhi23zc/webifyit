"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useAnimation, useReducedMotion } from "framer-motion";

// ─── Product config ───────────────────────────────────────────────
const products = {
  hisabai: {
    src: "/screens/hisabai-monster.png",
    name: "Hisab AI",
    tagline: "AI-Powered Expense Tracking",
    accentColor: "#7C3AED",
  },
  dineezy: {
    src: "/screens/dineezy.png",
    name: "Dineezy POS",
    tagline: "Restaurant Management System",
    accentColor: "#FF4B23",
  },
  msgzone: {
    src: "/screens/msgzone.png",
    name: "MsgZone",
    tagline: "WhatsApp Marketing Platform",
    accentColor: "#25D366",
  },
};

export type ProductKey = keyof typeof products;

interface ProductMockupProps {
  product?: ProductKey;
}

export default function ProductMockup({ product = "hisabai" }: ProductMockupProps) {
  const config = products[product] ?? products.hisabai;
  const shouldReduceMotion = useReducedMotion();
  const [imgLoaded, setImgLoaded] = useState(false);

  const floatVariants = {
    animate: shouldReduceMotion
      ? {}
      : {
          y: [0, -10, 0],
          transition: {
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut" as const,
          },
        },
  };

  return (
    <div className="relative w-full h-full flex items-center justify-center" aria-hidden="true">

      {/* ── Floating phone ─────────────────────────── */}
      <motion.div
        animate="animate"
        variants={floatVariants}
        className="relative"
        style={{
          /* 3-D perspective tilt — similar to reference */
          transform: "perspective(900px) rotateY(-18deg) rotateX(4deg)",
          willChange: "transform",
        }}
      >
        {/* Phone outer shell */}
        <div
          className="relative overflow-hidden"
          style={{
            width: "260px",
            height: "530px",
            background: "linear-gradient(145deg, #2a2a2e 0%, #111116 60%, #1e1e24 100%)",
            borderRadius: "44px",
            boxShadow: `
              inset 0 0 0 1.5px rgba(255,255,255,0.12),
              0 0 0 1px rgba(0,0,0,0.9),
              12px 30px 80px rgba(0,0,0,0.55),
              0 8px 24px rgba(0,0,0,0.4),
              -4px 0 20px rgba(0,0,0,0.3)
            `,
          }}
        >
          {/* Side highlight — left edge */}
          <div
            className="absolute top-0 left-0 h-full pointer-events-none"
            style={{
              width: "2px",
              background: "linear-gradient(to bottom, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.06) 50%, transparent 100%)",
              borderRadius: "44px 0 0 44px",
            }}
          />

          {/* Screen bezel */}
          <div
            className="absolute inset-0 flex flex-col"
            style={{
              margin: "10px",
              borderRadius: "36px",
              overflow: "hidden",
              background: "#0a0a0f",
            }}
          >
            {/* Status bar */}
            <div className="flex items-center justify-between px-5 pt-3 pb-1 flex-shrink-0" style={{ background: "#0a0a0f" }}>
              <span className="text-white text-[11px] font-semibold" style={{ fontFamily: "system-ui, sans-serif" }}>
                9:41
              </span>
              <div className="flex items-center gap-1.5">
                <svg width="16" height="10" viewBox="0 0 16 10" fill="white" opacity={0.8}>
                  <rect x="0" y="4" width="3" height="6" rx="0.5"/>
                  <rect x="4.5" y="2.5" width="3" height="7.5" rx="0.5"/>
                  <rect x="9" y="1" width="3" height="9" rx="0.5"/>
                  <rect x="13.5" y="0" width="2" height="10" rx="0.5"/>
                </svg>
                <svg width="15" height="11" viewBox="0 0 15 11" fill="white" opacity={0.8}>
                  <path d="M7.5 2.5C5.2 2.5 3.1 3.4 1.5 4.9L0 3.4C2 1.3 4.6 0 7.5 0s5.5 1.3 7.5 3.4l-1.5 1.5C11.9 3.4 9.8 2.5 7.5 2.5z"/>
                  <path d="M7.5 5.5C6.1 5.5 4.9 6.1 4 7l-1.5-1.5C3.9 4.2 5.6 3.5 7.5 3.5s3.6.7 5 1.8L11 6.9C10.1 6.1 8.9 5.5 7.5 5.5z"/>
                  <circle cx="7.5" cy="9.5" r="1.5"/>
                </svg>
                {/* Battery */}
                <div className="flex items-center gap-0.5">
                  <div style={{ width: "22px", height: "11px", borderRadius: "3px", border: "1.5px solid rgba(255,255,255,0.7)", padding: "1.5px", position: "relative" }}>
                    <div style={{ width: "75%", height: "100%", background: "white", borderRadius: "1px" }}/>
                    <div style={{ position: "absolute", right: "-4px", top: "50%", transform: "translateY(-50%)", width: "2.5px", height: "5px", background: "rgba(255,255,255,0.6)", borderRadius: "0 1px 1px 0" }}/>
                  </div>
                </div>
              </div>
            </div>

            {/* Dynamic Island */}
            <div className="flex justify-center mb-1 flex-shrink-0">
              <div style={{ width: "108px", height: "30px", background: "#000", borderRadius: "20px" }}/>
            </div>

            {/* App screen image — full area */}
            <div className="flex-1 relative overflow-hidden">
              {/* Always show placeholder bg */}
              <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, #1a1a26 0%, #0f0f18 100%)" }}/>
              <img
                src={config.src}
                alt={`${config.name} app screen`}
                onLoad={() => setImgLoaded(true)}
                className="absolute inset-0 w-full h-full object-cover object-top"
                style={{ opacity: imgLoaded ? 1 : 0, transition: "opacity 0.4s ease" }}
              />
            </div>

            {/* Home indicator */}
            <div className="flex justify-center py-2 flex-shrink-0" style={{ background: "#0a0a0f" }}>
              <div style={{ width: "120px", height: "4px", background: "rgba(255,255,255,0.4)", borderRadius: "2px" }}/>
            </div>
          </div>

          {/* Volume buttons (left side) */}
          <div className="absolute" style={{ left: "-3px", top: "110px", width: "3px", height: "34px", background: "#2a2a2e", borderRadius: "2px 0 0 2px", boxShadow: "-1px 0 3px rgba(0,0,0,0.5)" }}/>
          <div className="absolute" style={{ left: "-3px", top: "155px", width: "3px", height: "34px", background: "#2a2a2e", borderRadius: "2px 0 0 2px", boxShadow: "-1px 0 3px rgba(0,0,0,0.5)" }}/>
          {/* Power button (right side) */}
          <div className="absolute" style={{ right: "-3px", top: "130px", width: "3px", height: "60px", background: "#2a2a2e", borderRadius: "0 2px 2px 0", boxShadow: "1px 0 3px rgba(0,0,0,0.5)" }}/>
        </div>

        {/* Soft shadow beneath phone */}
        <div
          className="absolute -bottom-6 left-1/2 -translate-x-1/2 pointer-events-none"
          style={{
            width: "200px",
            height: "40px",
            background: "radial-gradient(ellipse at center, rgba(0,0,0,0.28) 0%, transparent 70%)",
            filter: "blur(8px)",
          }}
        />
      </motion.div>

    </div>
  );
}
