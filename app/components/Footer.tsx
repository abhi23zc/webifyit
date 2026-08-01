"use client";

import React from "react";

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
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 bg-[#FF4B23] text-white flex items-center justify-center font-mono font-bold text-xs rounded-xs">
                W//I
              </div>
              <span className="font-display text-2xl font-bold tracking-tight text-white">
                Webify<span className="text-[#FF4B23]">It</span>
              </span>
            </div>

            <p className="font-body text-sm text-[#8A8E96] leading-relaxed max-w-md">
              Transform your business with cutting-edge web & app solutions. We build high-performance digital experiences that engage, convert, and retain customers.
            </p>

            <div className="font-mono text-xs text-[#8A8E96] flex items-center gap-2 pt-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              HEADQUARTERED IN KANPUR, UTTAR PRADESH, INDIA
            </div>
          </div>

          {/* Services Links */}
          <div className="md:col-span-3 space-y-3">
            <div className="font-mono text-xs font-bold text-[#FF4B23] uppercase tracking-wider">
              SERVICES
            </div>
            <ul className="space-y-2 font-body text-sm text-[#8A8E96]">
              <li><a href="#services" className="hover:text-white transition-colors">Web Development</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">App Development</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">AI Integration</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">SEO Optimization</a></li>
              <li><a href="#growth" className="hover:text-white transition-colors">Lead Generation</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Custom SaaS Platforms</a></li>
            </ul>
          </div>

          {/* Resources Links */}
          <div className="md:col-span-2 space-y-3">
            <div className="font-mono text-xs font-bold text-[#FF4B23] uppercase tracking-wider">
              RESOURCES
            </div>
            <ul className="space-y-2 font-body text-sm text-[#8A8E96]">
              <li><a href="#projects" className="hover:text-white transition-colors">Case Studies</a></li>
              <li><button onClick={onOpenAuditModal} className="hover:text-white transition-colors text-left">Free Website Audit</button></li>
              <li><a href="#faq" className="hover:text-white transition-colors">FAQ</a></li>
              <li><a href="#insights" className="hover:text-white transition-colors">Analytics Guide</a></li>
              <li><a href="#growth" className="hover:text-white transition-colors">SEO Checklist</a></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="md:col-span-2 space-y-3">
            <div className="font-mono text-xs font-bold text-[#FF4B23] uppercase tracking-wider">
              CONTACT
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
            © 2026 WebifyIt. All rights reserved. Built with precision.
          </div>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Sitemap</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
