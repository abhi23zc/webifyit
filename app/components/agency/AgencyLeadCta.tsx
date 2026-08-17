"use client";

import React from "react";
import { ArrowRight, Lock } from "lucide-react";

export default function AgencyLeadCta() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Connect to CRM / lead capture
    alert("Partner inquiry submitted. We will be in touch within 24 hours.");
  };

  return (
    <section className="py-24 bg-[#12151B] text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-dark opacity-50"></div>
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#1F3D8C]/20 to-transparent blur-3xl pointer-events-none" />
      
      <div className="max-w-[1180px] mx-auto px-5 sm:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-8 items-center">
          
          <div className="max-w-xl">
            <h2 className="font-display text-4xl sm:text-5xl font-bold tracking-tight mb-6">
              Ready to expand your technical capacity?
            </h2>
            <p className="font-body text-lg text-[#8A8E96] mb-8 leading-relaxed">
              Send us a brief. We will review the requirement, suggest the right delivery model, and tell you honestly whether WebifyIt is a good fit.
            </p>
            <div className="flex items-center gap-3 text-sm font-mono text-[#DCDDD6] bg-white/5 border border-white/10 px-4 py-2.5 rounded-md w-fit mb-8">
              <Lock className="w-4 h-4 text-emerald-400" />
              <span>100% Confidential. Strict NDA enforced.</span>
            </div>
          </div>

          <div className="bg-white text-[#12151B] p-8 sm:p-10 rounded-xl shadow-2xl relative">
            <div className="font-display font-bold text-2xl mb-6">Start with one project</div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#585D67]">Name</label>
                  <input type="text" required className="w-full bg-[#F5F6F1] border border-[#DCDDD6] rounded-md px-4 py-2.5 text-sm focus:outline-none focus:border-[#1F3D8C] focus:ring-1 focus:ring-[#1F3D8C]" placeholder="John Doe" />
                </div>
                <div className="space-y-1.5">
                  <label className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#585D67]">Work Email</label>
                  <input type="email" required className="w-full bg-[#F5F6F1] border border-[#DCDDD6] rounded-md px-4 py-2.5 text-sm focus:outline-none focus:border-[#1F3D8C] focus:ring-1 focus:ring-[#1F3D8C]" placeholder="john@agency.com" />
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#585D67]">Agency Name</label>
                  <input type="text" required className="w-full bg-[#F5F6F1] border border-[#DCDDD6] rounded-md px-4 py-2.5 text-sm focus:outline-none focus:border-[#1F3D8C] focus:ring-1 focus:ring-[#1F3D8C]" placeholder="Acme Digital" />
                </div>
                <div className="space-y-1.5">
                  <label className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#585D67]">Website</label>
                  <input type="url" className="w-full bg-[#F5F6F1] border border-[#DCDDD6] rounded-md px-4 py-2.5 text-sm focus:outline-none focus:border-[#1F3D8C] focus:ring-1 focus:ring-[#1F3D8C]" placeholder="https://agency.com" />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#585D67]">What do you need help with?</label>
                <select required defaultValue="" className="w-full bg-[#F5F6F1] border border-[#DCDDD6] rounded-md px-4 py-2.5 text-sm focus:outline-none focus:border-[#1F3D8C] focus:ring-1 focus:ring-[#1F3D8C] appearance-none">
                  <option value="" disabled>Select an option</option>
                  <option value="custom-software">Custom Software / Web App</option>
                  <option value="saas">SaaS Development</option>
                  <option value="ai-integration">AI Automation / Integration</option>
                  <option value="mobile-app">Mobile App Development</option>
                  <option value="retainer">Dedicated Team Retainer</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#585D67]">Project Brief</label>
                <textarea required rows={3} className="w-full bg-[#F5F6F1] border border-[#DCDDD6] rounded-md px-4 py-2.5 text-sm focus:outline-none focus:border-[#1F3D8C] focus:ring-1 focus:ring-[#1F3D8C] resize-none" placeholder="Tell us about the client requirement and timeline..."></textarea>
              </div>

              <button type="submit" className="w-full bg-[#FF4B23] hover:bg-[#E03A16] text-white font-bold py-3.5 rounded-md flex items-center justify-center gap-2 transition-colors mt-2">
                <span>Submit partner inquiry</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              
              <p className="text-center font-mono text-[10px] text-[#8A8E96] mt-4">
                Alternatively, <a href="#" className="text-[#1F3D8C] underline hover:text-[#12151B]">book a technical scoping call</a>.
              </p>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
}
