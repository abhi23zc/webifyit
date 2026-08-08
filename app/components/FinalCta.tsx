"use client";

import React from "react";

interface FinalCtaProps {
  onOpenAuditModal: () => void;
}

export default function FinalCta({ onOpenAuditModal }: FinalCtaProps) {
  return (
    <section id="contact" className="py-20 bg-[#12151B] text-white relative bg-grid-dark overflow-hidden">
      <div className="max-w-[1180px] mx-auto px-5 sm:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-2xl text-left mb-14">
          <div className="inline-flex items-center gap-2 mb-3 px-3 py-1 bg-white/10 border border-white/20 rounded-xs">
            <span className="w-2 h-2 rounded-full bg-[#FF4B23]"></span>
            <span className="font-mono text-xs font-semibold text-white uppercase tracking-widest">
              NEXT STEPS — GET STARTED
            </span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
            Ready to transform your digital presence?
          </h2>
          <p className="font-body text-base sm:text-lg text-[#8A8E96] mt-4">
            Pick the option that works best for you and let’s get started.
          </p>
        </div>

        {/* 3 Option Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Option 1: Book Strategy Call */}
          <div className="bg-white/5 border border-white/15 p-6 sm:p-8 rounded-xs hover:border-[#FF4B23] transition-all duration-300 flex flex-col justify-between group">
            <div>
              <div className="font-mono text-xs text-[#FF4B23] mb-4">OPTION 01</div>
              <h3 className="font-display text-xl font-bold text-white mb-2 group-hover:text-[#FF4B23] transition-colors">
                Book a strategy call
              </h3>
              <p className="font-body text-sm text-[#8A8E96] leading-relaxed mb-6">
                Talk to our team in a quick 15-minute call. Tell us about your project and we’ll guide you on the best solution.
              </p>
            </div>
            <a
              href="https://wa.me/916394575814?text=Hi%20WebifyIt!%20I%20want%20to%20book%20a%20strategy%20call."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full btn-primary justify-between text-xs py-3 px-4"
            >
              <span>Book your call</span>
              <span>→</span>
            </a>
          </div>

          {/* Option 2: Get Free Audit (Featured Signal Orange Accent Border) */}
          <div className="bg-[#FF4B23]/10 border-2 border-[#FF4B23] p-6 sm:p-8 rounded-xs transition-all duration-300 flex flex-col justify-between relative shadow-lg">
            <div className="absolute -top-3 right-4 bg-[#FF4B23] text-white font-mono text-[10px] uppercase font-bold px-2 py-0.5 rounded-xs">
              RECOMMENDED
            </div>
            <div>
              <div className="font-mono text-xs text-[#FF4B23] mb-4">OPTION 02</div>
              <h3 className="font-display text-xl font-bold text-white mb-2">
                Get a free audit
              </h3>
              <p className="font-body text-sm text-[#DCDDD6] leading-relaxed mb-6">
                We’ll review your website and send you a detailed report on speed, design, SEO, and what’s stopping people from contacting you.
              </p>
            </div>
            <button
              onClick={onOpenAuditModal}
              className="w-full btn-primary justify-between text-xs py-3 px-4"
            >
              <span>Request audit now</span>
              <span>→</span>
            </button>
          </div>

          {/* Option 3: Start Conversation */}
          <div className="bg-white/5 border border-white/15 p-6 sm:p-8 rounded-xs hover:border-white transition-all duration-300 flex flex-col justify-between group">
            <div>
              <div className="font-mono text-xs text-[#8A8E96] mb-4">OPTION 03</div>
              <h3 className="font-display text-xl font-bold text-white mb-2 group-hover:text-[#EEF2FB] transition-colors">
                Start a conversation
              </h3>
              <p className="font-body text-sm text-[#8A8E96] leading-relaxed mb-6">
                Have questions? Send us a message and we&apos;ll reply within 24 hours.
              </p>
            </div>
            <a
              href="mailto:webifyit.in@gmail.com?subject=WebifyIt%20Inquiry"
              className="w-full btn-secondary bg-transparent text-white border-white/30 hover:border-white hover:bg-white/10 justify-between text-xs py-3 px-4"
            >
              <span>Contact us</span>
              <span>→</span>
            </a>
          </div>

        </div>

      </div>
    </section>
  );
}
