"use client";

import React from "react";
import Link from "next/link";

interface FooterProps {
  onOpenAuditModal: () => void;
}

export default function Footer({ onOpenAuditModal }: FooterProps) {
  return (
    <footer className="bg-[#12151B] text-white pt-16 pb-12 border-t border-white/10">
      <div className="max-w-[1180px] mx-auto px-5 sm:px-8">

        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/10">

          {/* Brand Blurb */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center">
              <img src="/images/logo.png" alt="WebifyIt" className="h-10 sm:h-12 w-auto object-contain brightness-0 invert" />
            </div>

            <p className="font-body text-sm text-[#8A8E96] leading-relaxed max-w-md">
              Custom Websites, Mobile Apps & AI Tools. We design and build fast websites, smart AI chatbots, and cloud software that helps your business grow.
            </p>

            <div className="font-mono text-xs text-[#8A8E96] flex items-center gap-2 pt-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              HEADQUARTERED IN KANPUR, UTTAR PRADESH, INDIA
            </div>
          </div>

          {/* Core Engineering Services */}
          <div className="md:col-span-3 space-y-3">
            <div className="font-mono text-xs font-bold text-[#FF4B23] uppercase tracking-wider">
              OUR SERVICES
            </div>
            <ul className="space-y-2 font-body text-sm text-[#8A8E96]">
              <li><a href="#services" className="hover:text-white transition-colors">Custom Websites</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">AI Chatbots & Voice Assistants</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Cloud SaaS Platforms</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Mobile Apps</a></li>
              <li><a href="#lead-magnets" className="hover:text-white transition-colors">Free AI Business Planner</a></li>
              <li><a href="#positioning" className="hover:text-white transition-colors">Why Choose Us</a></li>
            </ul>
          </div>

          {/* Living Proof & Resources */}
          <div className="md:col-span-2 space-y-3">
            <div className="font-mono text-xs font-bold text-[#FF4B23] uppercase tracking-wider">
              LIVING PROOF & BLOG
            </div>
            <ul className="space-y-2 font-body text-sm text-[#8A8E96]">
              <li><a href="#projects" className="hover:text-white transition-colors">Dineezy POS Engine</a></li>
              <li><a href="#projects" className="hover:text-white transition-colors">MsgZone WhatsApp SaaS</a></li>
              <li><a href="#projects" className="hover:text-white transition-colors">HelpKey Engine</a></li>
              <li><Link href="/blog" className="hover:text-white transition-colors font-semibold text-white">Engineering Blog</Link></li>
              <li><Link href="/admin" className="hover:text-white transition-colors font-semibold text-[#FF4B23]">Internal Lead CRM</Link></li>
              <li><button onClick={onOpenAuditModal} className="hover:text-white transition-colors text-left text-xs font-mono text-[#25D366]">Request Blueprint →</button></li>
            </ul>
          </div>

          {/* Technical Contact */}
          <div className="md:col-span-2 space-y-3">
            <div className="font-mono text-xs font-bold text-[#FF4B23] uppercase tracking-wider">
              GET IN TOUCH
            </div>
            <div className="space-y-2 font-body text-sm text-[#8A8E96]">
              <a href="mailto:webifyit.in@gmail.com" className="block hover:text-white transition-colors break-all">
                webifyit.in@gmail.com
              </a>
              <a href="tel:+916394575814" className="block hover:text-white transition-colors">
                +91 63945 75814
              </a>
              <div className="text-xs text-[#8A8E96] pt-1">
                Kanpur, Uttar Pradesh, India
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Legal Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-[#8A8E96]">
          <div>
            © 2026 WebifyIt. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Site Speed Report</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
