"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle2, ArrowRight, SquareArrowOutUpLeft, ShieldCheck } from "lucide-react";
import { saveNewLead } from "../lib/leadStore";

interface AuditModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLeadCaptured?: (leadName: string, auditFocus: string) => void;
}

export default function AuditModal({ isOpen, onClose, onLeadCaptured }: AuditModalProps) {
  const [submitted, setSubmitted] = useState(false);
  const [step, setStep] = useState<1 | 2>(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    businessInput: "",
    auditFocus: "AI Integration Feasibility",
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    // Save lead to local storage CRM
    saveNewLead({
      name: formData.name || "Anonymous Founder",
      contact: formData.phone || formData.email || "No contact provided",
      email: formData.email,
      businessDescription: formData.businessInput || "General Web & AI Inquiry",
      auditFocus: formData.auditFocus,
      source: "Blueprint Form",
      taggedDomain:
        formData.auditFocus.includes("AI") ? "AI Agent" :
          formData.auditFocus.includes("SaaS") ? "Custom SaaS" :
            formData.auditFocus.includes("Mobile") ? "Mobile App Engine" : "Web Architecture",
    });

    if (onLeadCaptured) {
      onLeadCaptured(formData.name || "Founder", formData.auditFocus);
    }
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
          className="bg-[#F5F6F1] border-2 border-[#12151B] w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-xs shadow-2xl p-6 sm:p-8 relative"
        >
          {/* Close Button */}
          <button
            onClick={resetAndClose}
            className="absolute top-4 right-4 z-10 w-8 h-8 bg-white border border-[#C7C9C0] rounded-xs flex items-center justify-center text-[#12151B] hover:bg-[#FF4B23] hover:text-white transition-colors"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-6 text-center space-y-4"
            >
              <div className="w-12 h-12 bg-[#FF4B23] text-white flex items-center justify-center font-mono font-bold text-xl rounded-xs mx-auto shadow-md">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="font-display text-2xl font-bold text-[#12151B]">
                Your Project Plan Request Received!
              </h3>
              <p className="font-body text-sm text-[#585D67] max-w-md mx-auto leading-relaxed">
                Thank you, <span className="font-semibold text-[#12151B]">{formData.name}</span>. Our team is reviewing:
                <br />
                <span className="font-mono text-xs text-[#1F3D8C] bg-[#EEF2FB] px-2.5 py-1 rounded inline-block mt-1 border border-[#1F3D8C]/20">
                  {formData.businessInput || "Your Business Architecture Requirements"}
                </span>
              </p>

              <div className="p-3.5 bg-white border border-[#DCDDD6] rounded-xs text-left font-mono text-xs text-[#585D67] space-y-2">
                <div className="text-[10px] uppercase font-bold text-[#FF4B23] flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#FF4B23]" />
                  WHAT HAPPENS NEXT:
                </div>
                <div className="flex items-center gap-2 text-[#12151B]">✓ WhatsApp message with your plan details</div>
                <div className="flex items-center gap-2 text-[#12151B]">✓ Custom tech & tool suggestions for your business</div>
                <div className="flex items-center gap-2 text-[#12151B]">✓ Cost estimate & time savings breakdown</div>
              </div>

              <div className="pt-2">
                <button
                  onClick={resetAndClose}
                  className="btn-primary text-xs py-2.5 px-6 shadow-3d-accent"
                >
                  Go Back to Website
                </button>
              </div>
            </motion.div>
          ) : (
            <div>
              {/* Step indicator */}
              <div className="flex items-center justify-between mb-4 border-b border-[#DCDDD6] pb-3 pr-10">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#FF4B23] animate-pulse"></span>
                  <span className="font-mono text-xs font-semibold text-[#FF4B23] uppercase tracking-widest">
                    SPEC_REQ_START
                  </span>
                </div>
                <div className="font-mono text-xs text-[#8A8E96] shrink-0 font-bold">
                  STEP {step} OF 2
                </div>
              </div>

              <h3 className="font-display text-2xl font-bold text-[#12151B] tracking-tight">
                Get a Free Project Plan
              </h3>
              <p className="font-body text-xs text-[#585D67] mb-6">
                Tell us about your business and we’ll send you a free plan with tool suggestions and cost estimate.
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
                        Website URL OR briefly describe your business
                      </label>
                      <textarea
                        rows={3}
                        placeholder="e.g., Wholesale manufacturing in Lucknow OR https://mycompany.com"
                        value={formData.businessInput}
                        onChange={(e) => setFormData({ ...formData, businessInput: e.target.value })}
                        className="w-full bg-white border border-[#C7C9C0] p-2.5 text-sm rounded-xs font-body text-[#12151B] focus:border-[#FF4B23] focus:outline-none resize-none"
                      />
                      <span className="font-mono text-[10px] text-[#8A8E96] mt-1 block">
                        Optional — helps our architects prepare a more targeted blueprint.
                      </span>
                    </div>

                    <div>
                      <label className="block font-mono text-[11px] uppercase text-[#585D67] mb-1">
                        What service are you interested in?
                      </label>
                      <select
                        value={formData.auditFocus}
                        onChange={(e) => setFormData({ ...formData, auditFocus: e.target.value })}
                        className="w-full bg-white border border-[#C7C9C0] p-2.5 text-sm rounded-xs font-body text-[#12151B] focus:border-[#FF4B23] focus:outline-none"
                      >
                        <option value="AI Integration Feasibility">AI Chatbot & Voice Assistant</option>
                        <option value="Custom SaaS Architecture">Cloud Software (SaaS)</option>
                        <option value="High-Performance Web Architecture">Fast Website / Web App</option>
                        <option value="Bespoke Mobile App Engine">Mobile App (Android / iOS)</option>
                      </select>
                    </div>

                    <div className="pt-2">
                      <button
                        type="button"
                        onClick={() => setStep(2)}
                        className="w-full btn-primary py-3 justify-center text-sm font-semibold shadow-3d-accent"
                      >
                        <span>Continue</span>
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
                        placeholder="Abhishek Verma"
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

                    <div className="p-2.5 bg-[#EEF2FB] border border-[#1F3D8C]/20 rounded-xs text-[11px] font-mono text-[#1F3D8C]">
                      ⚡ We will send you a WhatsApp message to confirm your request.
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
                        className="flex-1 btn-primary py-3 justify-center text-sm font-semibold shadow-3d-accent"
                      >
                        <SquareArrowOutUpLeft className="w-4 h-4" />
                        <span>Submit Request</span>
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
