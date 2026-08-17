"use client";

import React from "react";

export default function LogoMarquee() {
  const clients = [
    { name: "Helpkey", tagline: "HOTEL BOOKING & SAAS", code: "HK-01" },
    { name: "Renascence Hosiers", tagline: "TEXTILE & APPAREL", code: "RH-02" },
    { name: "Goodgut", tagline: "HEALTH & WELLNESS", code: "GG-03" },
    { name: "OyeStore", tagline: "E-COMMERCE PLATFORM", code: "OS-04" },
    { name: "GrowPlus", tagline: "FINANCIAL SERVICES", code: "GP-05" },
    { name: "Synergon", tagline: "AI SALES CRM", code: "SY-06" },
  ];

  // Duplicate for seamless infinite scrolling loop
  const marqueeList = [...clients, ...clients, ...clients];

  return (
    <section className="py-8 bg-white border-y border-[#DCDDD6] overflow-hidden">
      <div className="max-w-[1180px] mx-auto px-5 sm:px-8 mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#FF4B23]"></span>
          <span className="font-mono text-xs font-semibold uppercase tracking-widest text-[#585D67]">
            TRUSTED BY BUSINESSES
          </span>
        </div>
        <span className="font-mono text-[10px] text-[#8A8E96] uppercase tracking-wider hidden sm:inline">
          PROVEN PARTNERSHIPS
        </span>
      </div>

      <div className="relative w-full overflow-hidden flex items-center [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <div className="animate-marquee flex items-center gap-8 sm:gap-12 py-2">
          {marqueeList.map((client, idx) => (
            <div
              key={`${client.name}-${idx}`}
              className="flex items-center gap-3 px-4 py-2 border border-[#DCDDD6] bg-[#F5F6F1] rounded-xs hover:border-[#12151B] transition-colors whitespace-nowrap group shrink-0"
            >
              <span className="font-mono text-[10px] font-bold text-[#FF4B23] bg-white border border-[#C7C9C0] px-1.5 py-0.5 rounded-xs">
                {client.code}
              </span>
              <div className="flex flex-col">
                <span className="font-display font-bold text-base tracking-tight text-[#12151B] group-hover:text-[#1F3D8C] transition-colors">
                  {client.name}
                </span>
                <span className="font-mono text-[9px] text-[#8A8E96] tracking-wider">
                  {client.tagline}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
