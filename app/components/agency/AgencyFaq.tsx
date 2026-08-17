"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

export default function AgencyFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "Do you work strictly white-label?",
      answer: "Yes. We work entirely behind the scenes. We use your email addresses, attend meetings under your agency's banner (if requested), and never disclose our involvement unless you explicitly give us permission."
    },
    {
      question: "Do we have to replace our current development team?",
      answer: "Absolutely not. We offer complementary capacity. We can act as overflow when your team is booked, handle specialized modules (like an AI integration), or deliver full project builds alongside your team."
    },
    {
      question: "Can we start with a small test project?",
      answer: "Yes. In fact, we encourage it. Starting with a pilot project or a small standalone module is the best way to verify our communication, code quality, and delivery speed before committing to a larger partnership."
    },
    {
      question: "How do you handle communication and updates?",
      answer: "We adapt to your stack. We typically join your Slack/Teams workspace and use your Jira/Linear board. We provide daily async updates and adhere to your required time zone overlaps to ensure seamless handoffs."
    },
    {
      question: "Who owns the code and intellectual property?",
      answer: "You and your client own 100% of the code, IP, and assets. Upon final payment, full repository access and deployment credentials are automatically transferred."
    },
    {
      question: "Will you ever contact our clients directly?",
      answer: "No. Our standard contract includes strict non-compete and non-solicitation clauses protecting your client relationships. We only interact with your clients if you explicitly ask us to join a technical scoping call as 'your backend team'."
    }
  ];

  return (
    <section className="py-20 bg-[#F5F6F1] border-b border-[#DCDDD6]">
      <div className="max-w-[1180px] mx-auto px-5 sm:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#12151B] tracking-tight">
            Partner FAQs
          </h2>
          <p className="font-body text-base text-[#585D67] mt-3">
            Honest answers about how we protect your agency.
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                className="bg-white border border-[#C7C9C0] rounded-xs overflow-hidden"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 hover:bg-[#F5F6F1]/50 transition-colors"
                >
                  <span className="font-display font-bold text-base sm:text-lg text-[#12151B]">
                    {faq.question}
                  </span>
                  <div
                    className={`w-6 h-6 rounded-xs border border-[#C7C9C0] flex items-center justify-center transition-transform duration-300 shrink-0 ${
                      isOpen ? "bg-[#12151B] text-white rotate-180" : "bg-white text-[#12151B]"
                    }`}
                  >
                    {isOpen ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      className="overflow-hidden border-t border-[#F5F6F1]"
                    >
                      <div className="p-5 sm:p-6 pt-3 text-sm text-[#585D67] font-body leading-relaxed">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
