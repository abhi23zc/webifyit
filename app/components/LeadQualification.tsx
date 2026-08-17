"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, XCircle, ArrowRight, Users, Clock, Building2, Wallet, Briefcase, Send, ChevronDown } from "lucide-react";
import { saveNewLead } from "../lib/leadStore";

interface LeadQualificationProps {
  onOpenAuditModal: () => void;
}

const fitItems = [
  "Are ready to invest in a real solution, not just the cheapest quote",
  "Want a long-term technical partner, not a one-off vendor",
  "Trust us to recommend the right approach — even if it's not what you first asked for",
  "Have a real business problem to solve, not just \"I want a website\"",
  "Can share context and give timely feedback during the build",
];

const notFitItems = [
  "Need something built in 48 hours at the lowest possible price",
  "Aren't ready to share basic context about your business",
  "Want a vendor who says yes to everything with no pushback",
  "Are only comparing quotes, not evaluating a partner",
];

const teamSizeBands = ["1–10", "11–50", "51–250", "250+"];
const timelines = ["Exploring", "Ready in 1–3 months", "Ready now"];
const budgetBands = ["Under ₹50K", "₹50K – ₹2L", "₹2L – ₹5L", "₹5L+", "Let's discuss"];

interface QualFormData {
  businessName: string;
  industry: string;
  whatToBuild: string;
  teamSize: string;
  timeline: string;
  budget: string;
  phone: string;
}

export default function LeadQualification({ onOpenAuditModal }: LeadQualificationProps) {
  const [showForm, setShowForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState<QualFormData>({
    businessName: "",
    industry: "",
    whatToBuild: "",
    teamSize: "",
    timeline: "",
    budget: "",
    phone: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    saveNewLead({
      name: form.businessName || "Qualification Lead",
      contact: form.phone,
      businessDescription: `${form.businessName} (${form.industry}) — ${form.whatToBuild}`,
      auditFocus: "High-Performance Web Architecture",
      source: "Blueprint Form",
      taggedDomain: "Web Architecture",
    });
  };

  return (
    <section id="qualification" className="py-20 bg-white border-b border-[#DCDDD6]">
      <div className="max-w-[1180px] mx-auto px-5 sm:px-8">

        {/* Header */}
        <div className="max-w-2xl mb-12">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="font-mono text-xs font-bold text-[#FF4B23] tracking-widest uppercase">
              FIG. 07 — CLIENT FIT
            </span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#12151B] tracking-tight">
            Is WebifyIt right for you?
          </h2>
          <p className="font-body text-base text-[#585D67] mt-3">
            We're selective about who we work with — not because we're difficult, but because we only take on work where we can create real, lasting value.
          </p>
        </div>

        {/* Two-Column Fit Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">

          {/* Good Fit */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-[#F0FDF4] border border-emerald-200 rounded-xs p-6 sm:p-7"
          >
            <div className="flex items-center gap-2.5 mb-5 pb-4 border-b border-emerald-200">
              <div className="w-7 h-7 rounded-xs bg-emerald-500 flex items-center justify-center">
                <CheckCircle2 className="w-4 h-4 text-white" />
              </div>
              <div>
                <div className="font-mono text-[10px] text-emerald-600 uppercase tracking-wider font-bold">Great Fit</div>
                <div className="font-display text-base font-bold text-[#12151B]">We work best with clients who...</div>
              </div>
            </div>
            <ul className="space-y-3.5">
              {fitItems.map((item, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="flex items-start gap-3"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span className="font-body text-sm text-[#12151B] leading-relaxed">{item}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Not a Fit */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-[#FFF8F6] border border-[#FF4B23]/20 rounded-xs p-6 sm:p-7"
          >
            <div className="flex items-center gap-2.5 mb-5 pb-4 border-b border-[#FF4B23]/20">
              <div className="w-7 h-7 rounded-xs bg-[#FF4B23]/10 border border-[#FF4B23]/30 flex items-center justify-center">
                <XCircle className="w-4 h-4 text-[#FF4B23]" />
              </div>
              <div>
                <div className="font-mono text-[10px] text-[#FF4B23] uppercase tracking-wider font-bold">Not a Match</div>
                <div className="font-display text-base font-bold text-[#12151B]">We're probably not the right fit if you...</div>
              </div>
            </div>
            <ul className="space-y-3.5">
              {notFitItems.map((item, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: 10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="flex items-start gap-3"
                >
                  <XCircle className="w-4 h-4 text-[#FF4B23]/60 shrink-0 mt-0.5" />
                  <span className="font-body text-sm text-[#585D67] leading-relaxed">{item}</span>
                </motion.li>
              ))}
            </ul>
            {/* Redirect note */}
            <div className="mt-6 pt-4 border-t border-[#FF4B23]/15">
              <p className="font-mono text-xs text-[#8A8E96]">
                If we're not the right fit, we'll tell you honestly — and point you to someone who is.
              </p>
            </div>
          </motion.div>

        </div>

        {/* CTA to expand the qualification form */}
        <AnimatePresence>
          {!showForm && !submitted && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#12151B] text-white p-6 sm:p-7 rounded-xs"
            >
              <div>
                <div className="font-mono text-xs text-[#FF4B23] uppercase tracking-wider font-bold mb-1">
                  Sounds like us?
                </div>
                <p className="font-display text-lg sm:text-xl font-bold text-white">
                  Tell us about your project — 60 seconds.
                </p>
                <p className="font-body text-sm text-[#8A8E96] mt-1">
                  Answer a few quick questions and we'll come back with an honest assessment.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full sm:w-auto">
                <button
                  onClick={() => setShowForm(true)}
                  className="btn-primary text-sm py-3 px-6 w-full sm:w-auto flex items-center justify-center gap-2"
                >
                  <span>Share Your Project</span>
                  <ChevronDown className="w-4 h-4" />
                </button>
                <button
                  onClick={onOpenAuditModal}
                  className="btn-secondary text-sm py-3 px-5 w-full sm:w-auto flex items-center justify-center gap-2 bg-transparent text-white border-white/20 hover:border-white hover:bg-white/10"
                >
                  <span>Skip to Free Plan</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Inline Qualification Form */}
        <AnimatePresence>
          {showForm && !submitted && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="overflow-hidden"
            >
              <div className="bg-[#F5F6F1] border border-[#DCDDD6] rounded-xs p-6 sm:p-8">
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#DCDDD6]">
                  <div>
                    <div className="font-mono text-xs font-bold text-[#FF4B23] uppercase tracking-wider mb-0.5">
                      QUALIFICATION FORM
                    </div>
                    <h3 className="font-display text-xl font-bold text-[#12151B]">Tell us about your project</h3>
                  </div>
                  <span className="font-mono text-xs text-[#8A8E96]">~60 seconds</span>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Row 1: Business Name + Industry */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-mono text-[11px] uppercase text-[#585D67] mb-1.5 flex items-center gap-1.5">
                        <Building2 className="w-3 h-3" /> Business Name
                      </label>
                      <input
                        type="text"
                        placeholder="e.g., Sharma Textiles Pvt Ltd"
                        value={form.businessName}
                        onChange={(e) => setForm({ ...form, businessName: e.target.value })}
                        className="w-full bg-white border border-[#C7C9C0] p-2.5 text-sm rounded-xs font-body text-[#12151B] focus:border-[#FF4B23] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block font-mono text-[11px] uppercase text-[#585D67] mb-1.5 flex items-center gap-1.5">
                        <Briefcase className="w-3 h-3" /> Industry
                      </label>
                      <input
                        type="text"
                        placeholder="e.g., Manufacturing, Restaurant, SaaS"
                        value={form.industry}
                        onChange={(e) => setForm({ ...form, industry: e.target.value })}
                        className="w-full bg-white border border-[#C7C9C0] p-2.5 text-sm rounded-xs font-body text-[#12151B] focus:border-[#FF4B23] focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Row 2: What to build */}
                  <div>
                    <label className="block font-mono text-[11px] uppercase text-[#585D67] mb-1.5">
                      What are you looking to build or fix?
                    </label>
                    <textarea
                      rows={3}
                      placeholder="e.g., We need a custom inventory system and AI WhatsApp support for our wholesale business in Lucknow."
                      value={form.whatToBuild}
                      onChange={(e) => setForm({ ...form, whatToBuild: e.target.value })}
                      className="w-full bg-white border border-[#C7C9C0] p-2.5 text-sm rounded-xs font-body text-[#12151B] focus:border-[#FF4B23] focus:outline-none resize-none"
                    />
                  </div>

                  {/* Row 3: Team Size Pills */}
                  <div>
                    <label className="block font-mono text-[11px] uppercase text-[#585D67] mb-2 flex items-center gap-1.5">
                      <Users className="w-3 h-3" /> Team Size
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {teamSizeBands.map((band) => (
                        <button
                          key={band}
                          type="button"
                          onClick={() => setForm({ ...form, teamSize: band })}
                          className={`font-mono text-xs px-3.5 py-1.5 rounded-xs border transition-all ${
                            form.teamSize === band
                              ? "bg-[#12151B] text-white border-[#12151B]"
                              : "bg-white text-[#585D67] border-[#C7C9C0] hover:border-[#12151B]"
                          }`}
                        >
                          {band}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Row 4: Timeline Pills */}
                  <div>
                    <label className="block font-mono text-[11px] uppercase text-[#585D67] mb-2 flex items-center gap-1.5">
                      <Clock className="w-3 h-3" /> Timeline
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {timelines.map((t) => (
                        <button
                          key={t}
                          type="button"
                          onClick={() => setForm({ ...form, timeline: t })}
                          className={`font-mono text-xs px-3.5 py-1.5 rounded-xs border transition-all ${
                            form.timeline === t
                              ? "bg-[#FF4B23] text-white border-[#FF4B23]"
                              : "bg-white text-[#585D67] border-[#C7C9C0] hover:border-[#FF4B23]"
                          }`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Row 5: Budget + Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-mono text-[11px] uppercase text-[#585D67] mb-2 flex items-center gap-1.5">
                        <Wallet className="w-3 h-3" /> Budget Comfort Band{" "}
                        <span className="text-[#8A8E96] normal-case tracking-normal">(optional)</span>
                      </label>
                      <div className="flex flex-wrap gap-1.5">
                        {budgetBands.map((b) => (
                          <button
                            key={b}
                            type="button"
                            onClick={() => setForm({ ...form, budget: b })}
                            className={`font-mono text-[11px] px-2.5 py-1 rounded-xs border transition-all ${
                              form.budget === b
                                ? "bg-[#1F3D8C] text-white border-[#1F3D8C]"
                                : "bg-white text-[#585D67] border-[#C7C9C0] hover:border-[#1F3D8C]"
                            }`}
                          >
                            {b}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="block font-mono text-[11px] uppercase text-[#585D67] mb-1.5">
                        WhatsApp Number *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 98765 43210"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        className="w-full bg-white border border-[#C7C9C0] p-2.5 text-sm rounded-xs font-body text-[#12151B] focus:border-[#FF4B23] focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Submit */}
                  <div className="flex items-center gap-3 pt-2">
                    <button
                      type="submit"
                      className="btn-primary text-sm py-3 px-6 flex items-center gap-2 shadow-3d-accent"
                    >
                      <Send className="w-4 h-4" />
                      <span>Send My Project Brief</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowForm(false)}
                      className="btn-secondary text-sm py-3 px-4"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Success State */}
        <AnimatePresence>
          {submitted && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-[#F0FDF4] border border-emerald-200 rounded-xs p-8 text-center"
            >
              <div className="w-12 h-12 bg-emerald-500 rounded-xs flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-display text-xl font-bold text-[#12151B] mb-2">
                Brief received — we'll be in touch.
              </h3>
              <p className="font-body text-sm text-[#585D67] max-w-md mx-auto">
                Thank you. We review every brief personally and will come back to you on WhatsApp within 24 hours with an honest assessment.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
