"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle2, ArrowRight, Sparkles, SquareArrowOutUpLeft } from "lucide-react";

interface AuditModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AuditModal({ isOpen, onClose }: AuditModalProps) {
  const [submitted, setSubmitted] = useState(false);
  const [step, setStep] = useState<1 | 2>(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    websiteUrl: "",
    serviceNeeded: "Free 10-Point Audit",
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const resetAndClose = () => {
    setSubmitted(false);
    setStep(1);
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#12151B]/80 backdrop-blur-xs">
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 20 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="bg-[#F5F6F1] border-2 border-[#12151B] w-full max-w-lg rounded-xs shadow-2xl p-6 sm:p-8 relative xmark"
        >
          {/* Close Button */}
          <button
            onClick={resetAndClose}
            className="absolute top-4 right-4 w-8 h-8 bg-white border border-[#C7C9C0] rounded-xs flex items-center justify-center text-[#12151B] hover:bg-[#FF4B23] hover:text-white transition-colors"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-8 text-center space-y-4"
            >
              <div className="w-12 h-12 bg-[#FF4B23] text-white flex items-center justify-center font-mono font-bold text-xl rounded-xs mx-auto shadow-md">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="font-display text-2xl font-bold text-[#12151B]">
                Audit Request Received!
              </h3>
              <p className="font-body text-sm text-[#585D67] max-w-md mx-auto leading-relaxed">
                Thank you, <span className="font-semibold text-[#12151B]">{formData.name}</span>. Our technical leads will analyze <span className="font-mono text-xs text-[#1F3D8C]">{formData.websiteUrl || "your project requirements"}</span> and deliver your 10-point audit report to <span className="font-semibold text-[#12151B]">{formData.email}</span> within 24 hours.
              </p>

              <div className="p-3 bg-white border border-[#DCDDD6] rounded-xs text-left font-mono text-xs text-[#585D67] space-y-1.5">
                <div className="text-[10px] uppercase font-bold text-[#FF4B23]">WHAT HAPPENS NEXT:</div>
                <div className="flex items-center gap-2">✓ 100/100 Core Web Vitals Analysis</div>
                <div className="flex items-center gap-2">✓ SEO Bottleneck & Keyword Audit</div>
                <div className="flex items-center gap-2">✓ Conversion Funnel UX Diagnostic</div>
              </div>

              <div className="pt-4">
                <button
                  onClick={resetAndClose}
                  className="btn-primary text-xs py-2.5 px-6"
                >
                  Close & Return
                </button>
              </div>
            </motion.div>
          ) : (
            <div>
              {/* Step indicator */}
              <div className="flex items-center justify-between mb-4 border-b border-[#DCDDD6] pb-3">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#FF4B23] animate-pulse"></span>
                  <span className="font-mono text-xs font-semibold text-[#FF4B23] uppercase tracking-widest">
                    SPEC_AUDIT_REQUEST
                  </span>
                </div>
                <div className="font-mono text-xs text-[#8A8E96]">
                  STEP {step} OF 2
                </div>
              </div>

              <h3 className="font-display text-2xl font-bold text-[#12151B] tracking-tight">
                Get Your Free Website Audit
              </h3>
              <p className="font-body text-xs text-[#585D67] mb-6">
                Enter your website & contact details for a comprehensive technical report.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                {step === 1 ? (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-4"
                  >
                    <div>
                      <label className="block font-mono text-[11px] uppercase text-[#585D67] mb-1">
                        Website URL or App Link *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="https://yourcompany.com"
                        value={formData.websiteUrl}
                        onChange={(e) => setFormData({ ...formData, websiteUrl: e.target.value })}
                        className="w-full bg-white border border-[#C7C9C0] p-2.5 text-sm rounded-xs font-mono text-[#12151B] focus:border-[#FF4B23] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block font-mono text-[11px] uppercase text-[#585D67] mb-1">
                        Primary Audit Focus
                      </label>
                      <select
                        value={formData.serviceNeeded}
                        onChange={(e) => setFormData({ ...formData, serviceNeeded: e.target.value })}
                        className="w-full bg-white border border-[#C7C9C0] p-2.5 text-sm rounded-xs font-body text-[#12151B] focus:border-[#FF4B23] focus:outline-none"
                      >
                        <option value="Free 10-Point Audit">Full 10-Point Digital Audit</option>
                        <option value="Web & App Development">Web & App Speed Optimization</option>
                        <option value="AI Integration">AI Integration Feasibility</option>
                        <option value="Lead Generation">Lead Funnel Audit</option>
                        <option value="Custom SaaS">Custom SaaS Architecture</option>
                      </select>
                    </div>

                    <div className="pt-2">
                      <button
                        type="button"
                        onClick={() => {
                          if (formData.websiteUrl) setStep(2);
                        }}
                        disabled={!formData.websiteUrl}
                        className="w-full btn-primary py-3 justify-center text-sm font-semibold disabled:opacity-50"
                      >
                        <span>Continue to Contact Info</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-4"
                  >
                    <div>
                      <label className="block font-mono text-[11px] uppercase text-[#585D67] mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Dipak Bhargav"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-white border border-[#C7C9C0] p-2.5 text-sm rounded-xs font-body text-[#12151B] focus:border-[#FF4B23] focus:outline-none"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block font-mono text-[11px] uppercase text-[#585D67] mb-1">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          required
                          placeholder="name@company.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full bg-white border border-[#C7C9C0] p-2.5 text-sm rounded-xs font-body text-[#12151B] focus:border-[#FF4B23] focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block font-mono text-[11px] uppercase text-[#585D67] mb-1">
                          WhatsApp / Phone *
                        </label>
                        <input
                          type="tel"
                          required
                          placeholder="+91 98765 43210"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full bg-white border border-[#C7C9C0] p-2.5 text-sm rounded-xs font-body text-[#12151B] focus:border-[#FF4B23] focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="pt-2 flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="btn-secondary py-3 text-xs"
                      >
                        Back
                      </button>
                      <button
                        type="submit"
                        className="flex-1 btn-primary py-3 justify-center text-sm font-semibold"
                      >
                        <SquareArrowOutUpLeft className="w-4 h-4" />
                        <span>Submit Audit Request</span>
                      </button>
                    </div>
                  </motion.div>
                )}
              </form>
            </div>
          )}

        </motion.div>
      </div>
    </AnimatePresence>
  );
}
