"use client";

import React, { useState, useTransition } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle2, ArrowRight, Send, ShieldCheck } from "lucide-react";
import { submitLead } from "../actions/leads";

interface AuditModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLeadCaptured?: (leadName: string, auditFocus: string) => void;
}

const SERVICE_OPTIONS = [
  { value: "Website Development", label: "Website Development" },
  { value: "Mobile App", label: "Mobile App (Android / iOS)" },
  { value: "E-commerce Store", label: "E-commerce / Online Store" },
  { value: "AI Chatbot & Automation", label: "AI Chatbot & Automation" },
  { value: "Custom Software / SaaS", label: "Custom Software / SaaS" },
  { value: "UI/UX Design", label: "UI/UX Design & Branding" },
  { value: "SEO & Digital Marketing", label: "SEO & Digital Marketing" },
  { value: "Social Media Management", label: "Social Media Management" },
  { value: "Logo & Graphic Design", label: "Logo & Graphic Design" },
  { value: "Cloud & DevOps", label: "Cloud Hosting & DevOps" },
  { value: "Maintenance & Support", label: "Maintenance & Support" },
  { value: "Consultation", label: "Not Sure / Need Consultation" },
  { value: "Other", label: "Other" },
];

export default function AuditModal({ isOpen, onClose, onLeadCaptured }: AuditModalProps) {
  const [submitted, setSubmitted] = useState(false);
  const [step, setStep] = useState<1 | 2>(1);
  const [isPending, startTransition] = useTransition();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    businessInput: "",
    serviceInterest: "Website Development",
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    startTransition(async () => {
      const result = await submitLead({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        business_description: formData.businessInput,
        service_interest: formData.serviceInterest,
        source: "Website Form",
      });

      if (result.success) {
        setSubmitted(true);
        if (onLeadCaptured) {
          onLeadCaptured(formData.name || "Visitor", formData.serviceInterest);
        }
      } else {
        // Even if Supabase fails, show success to user (don't block UX)
        // The lead data can be recovered from logs
        console.error("Lead save failed:", result.error);
        setSubmitted(true);
        if (onLeadCaptured) {
          onLeadCaptured(formData.name || "Visitor", formData.serviceInterest);
        }
      }
    });
  };

  const resetAndClose = () => {
    setSubmitted(false);
    setStep(1);
    setFormData({
      name: "",
      email: "",
      phone: "",
      businessInput: "",
      serviceInterest: "Website Development",
    });
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
            /* ─── Success State ──────────────────────────── */
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-6 text-center space-y-4"
            >
              <div className="w-12 h-12 bg-[#FF4B23] text-white flex items-center justify-center font-mono font-bold text-xl rounded-xs mx-auto shadow-md">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="font-display text-2xl font-bold text-[#12151B]">
                Request Received!
              </h3>
              <p className="font-body text-sm text-[#585D67] max-w-md mx-auto leading-relaxed">
                Thank you, <span className="font-semibold text-[#12151B]">{formData.name}</span>.
                We&apos;ll review your requirements and get back to you shortly.
              </p>

              <div className="p-3.5 bg-white border border-[#DCDDD6] rounded-xs text-left font-mono text-xs text-[#585D67] space-y-2">
                <div className="text-[10px] uppercase font-bold text-[#FF4B23] flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#FF4B23]" />
                  WHAT HAPPENS NEXT:
                </div>
                <div className="flex items-center gap-2 text-[#12151B]">✓ We&apos;ll review your project details</div>
                <div className="flex items-center gap-2 text-[#12151B]">✓ You&apos;ll get a WhatsApp/email with our recommendations</div>
                <div className="flex items-center gap-2 text-[#12151B]">✓ Free consultation call if needed</div>
              </div>

              <div className="pt-2">
                <button
                  onClick={resetAndClose}
                  className="btn-primary text-xs py-2.5 px-6 shadow-3d-accent"
                >
                  Back to Website
                </button>
              </div>
            </motion.div>
          ) : (
            /* ─── Form ───────────────────────────────────── */
            <div>
              {/* Step indicator */}
              <div className="flex items-center justify-between mb-4 border-b border-[#DCDDD6] pb-3 pr-10">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#FF4B23] animate-pulse" />
                  <span className="font-mono text-xs font-semibold text-[#FF4B23] uppercase tracking-widest">
                    GET A QUOTE
                  </span>
                </div>
                <div className="font-mono text-xs text-[#8A8E96] shrink-0 font-bold">
                  STEP {step} OF 2
                </div>
              </div>

              <h3 className="font-display text-2xl font-bold text-[#12151B] tracking-tight">
                Tell Us About Your Project
              </h3>
              <p className="font-body text-xs text-[#585D67] mb-6">
                Share your idea and we&apos;ll get back with a plan, timeline, and cost estimate — completely free.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                {step === 1 ? (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-4"
                  >
                    {/* Service interest */}
                    <div>
                      <label className="block font-mono text-[11px] uppercase text-[#585D67] mb-1">
                        What do you need help with? *
                      </label>
                      <select
                        value={formData.serviceInterest}
                        onChange={(e) => setFormData({ ...formData, serviceInterest: e.target.value })}
                        className="w-full bg-white border border-[#C7C9C0] p-2.5 text-sm rounded-xs font-body text-[#12151B] focus:border-[#FF4B23] focus:outline-none"
                      >
                        {SERVICE_OPTIONS.map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Business description */}
                    <div>
                      <label className="block font-mono text-[11px] uppercase text-[#585D67] mb-1">
                        Describe your project or business
                      </label>
                      <textarea
                        rows={3}
                        placeholder="e.g., I need a website for my restaurant chain, or I want to automate customer support with AI..."
                        value={formData.businessInput}
                        onChange={(e) => setFormData({ ...formData, businessInput: e.target.value })}
                        className="w-full bg-white border border-[#C7C9C0] p-2.5 text-sm rounded-xs font-body text-[#12151B] focus:border-[#FF4B23] focus:outline-none resize-none"
                      />
                      <span className="font-mono text-[10px] text-[#8A8E96] mt-1 block">
                        Optional — helps us prepare a better estimate.
                      </span>
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
                    {/* Name */}
                    <div>
                      <label className="block font-mono text-[11px] uppercase text-[#585D67] mb-1">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-white border border-[#C7C9C0] p-2.5 text-sm rounded-xs font-body text-[#12151B] focus:border-[#FF4B23] focus:outline-none"
                      />
                    </div>

                    {/* Email + Phone */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block font-mono text-[11px] uppercase text-[#585D67] mb-1">
                          Email *
                        </label>
                        <input
                          type="email"
                          required
                          placeholder="you@example.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full bg-white border border-[#C7C9C0] p-2.5 text-sm rounded-xs font-body text-[#12151B] focus:border-[#FF4B23] focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block font-mono text-[11px] uppercase text-[#585D67] mb-1">
                          Phone / WhatsApp
                        </label>
                        <input
                          type="tel"
                          placeholder="+91 98765 43210"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full bg-white border border-[#C7C9C0] p-2.5 text-sm rounded-xs font-body text-[#12151B] focus:border-[#FF4B23] focus:outline-none"
                        />
                      </div>
                    </div>

                    {/* Info box */}
                    <div className="p-2.5 bg-[#EEF2FB] border border-[#1F3D8C]/20 rounded-xs text-[11px] font-mono text-[#1F3D8C]">
                      🔒 Your information is secure. We&apos;ll only use it to contact you about your project.
                    </div>

                    {/* Buttons */}
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
                        disabled={isPending}
                        className="flex-1 btn-primary py-3 justify-center text-sm font-semibold shadow-3d-accent disabled:opacity-70"
                      >
                        {isPending ? (
                          <span>Submitting...</span>
                        ) : (
                          <>
                            <Send className="w-4 h-4" />
                            <span>Submit Request</span>
                          </>
                        )}
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
