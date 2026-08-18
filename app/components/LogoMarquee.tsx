"use client";

import React from "react";

export default function LogoMarquee() {
  const clients = [
    { name: "Helpkey", tagline: "HOTEL BOOKING & SAAS", logo: null, initials: "HK", bgColor: "#12151B" },
    { name: "Renascence Hosiers", tagline: "TEXTILE & APPAREL", logo: null, initials: "RH", bgColor: "#7C3AED" },
    { name: "Goodgut", tagline: "HEALTH & WELLNESS", logo: "/logos/goodgut.png" },
    { name: "OyeStore", tagline: "E-COMMERCE PLATFORM", logo: "/logos/oyestore.png" },
    { name: "GrowPlus", tagline: "FINANCIAL SERVICES", logo: "/logos/growplus.png" },
    { name: "Synergon", tagline: "AI SALES CRM", logo: "/logos/synergon.png" },
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
              {client.logo ? (
                <img
                  src={client.logo}
                  alt={client.name}
                  className="w-8 h-8 rounded-xs object-contain"
                />
              ) : (
                <div
                  className="w-8 h-8 rounded-xs flex items-center justify-center font-mono font-bold text-white text-[11px]"
                  style={{ backgroundColor: client.bgColor }}
                >
                  {client.initials}
                </div>
              )}
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
