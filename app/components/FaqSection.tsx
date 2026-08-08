"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Plus, Minus, HelpCircle, MessageSquare } from "lucide-react";

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [searchQuery, setSearchQuery] = useState("");

  const faqs = [
    {
      id: "FAQ-01",
      question: "How long does a typical project take?",
      answer:
        "Simple websites usually take 2 to 4 weeks. Bigger projects like full mobile apps, cloud software, or AI integrations usually take 4 to 8 weeks. We work in weekly stages and share updates and live previews throughout.",
      tags: ["timeline", "weeks", "process", "sprint"],
    },
    {
      id: "FAQ-02",
      question: "How much does it cost and how does pricing work?",
      answer:
        "We offer two ways to work together: a fixed price for a defined project (like building a website or app), or a monthly retainer for ongoing work (like adding features or maintaining your software). All quotes are clear with no hidden fees.",
      tags: ["pricing", "cost", "quote", "retainer"],
    },
    {
      id: "FAQ-03",
      question: "What technologies do you use to build projects?",
      answer:
        "We use modern, fast technologies: Next.js, React, TypeScript, React Native for mobile apps, Node.js, PostgreSQL, OpenAI APIs, WhatsApp APIs, and cloud platforms like AWS or Vercel. We always use the right tool for your specific project.",
      tags: ["tech stack", "nextjs", "react", "ai", "aws"],
    },
    {
      id: "FAQ-04",
      question: "Do I retain full ownership and intellectual property of the code?",
      answer:
        "100% yes. Upon final delivery and sign-off, full source code ownership, repository access, deployment credentials, design assets, and intellectual property rights belong entirely to your business.",
      tags: ["ownership", "ip", "code", "github"],
    },
    {
      id: "FAQ-05",
      question: "What support do you provide after the project launches?",
      answer:
        "Every project includes 30 days of free support after launch for bug fixes and small tweaks. We also offer ongoing support plans that include 24/7 monitoring, security updates, backups, SEO improvements, and new feature development.",
      tags: ["support", "maintenance", "warranty", "seo"],
    },
  ];

  const filteredFaqs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.tags.some((tag) => tag.includes(searchQuery.toLowerCase()))
  );

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 bg-[#F5F6F1] border-b border-[#DCDDD6]">
      <div className="max-w-[1180px] mx-auto px-5 sm:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="font-mono text-xs font-bold text-[#FF4B23] tracking-widest uppercase">
                FIG. 07 — FAQ
              </span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#12151B] tracking-tight">
              Common questions
            </h2>
            <p className="font-body text-base text-[#585D67] mt-3 max-w-xl">
              Everything you need to know about how we work, our pricing, and what you get.
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-[#8A8E96] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-[#C7C9C0] pl-9 pr-3 py-2 text-xs font-body text-[#12151B] rounded-xs focus:border-[#FF4B23] focus:outline-none shadow-2xs"
            />
          </div>
        </div>

        {/* Accordion List */}
        <div className="max-w-3xl space-y-4">
          {filteredFaqs.length === 0 ? (
            <div className="bg-white border border-[#C7C9C0] p-8 text-center rounded-xs space-y-2">
              <HelpCircle className="w-8 h-8 text-[#8A8E96] mx-auto" />
              <div className="font-display font-bold text-base text-[#12151B]">
                No matching questions found
              </div>
              <p className="font-body text-xs text-[#585D67]">
                Try searching for &quot;pricing&quot;, &quot;timeline&quot;, or &quot;tech stack&quot;.
              </p>
            </div>
          ) : (
            filteredFaqs.map((faq, idx) => {
              const isOpen = openIndex === idx;
              return (
                <motion.div
                  key={faq.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: idx * 0.05 }}
                  className="xmark bg-white border border-[#C7C9C0] rounded-xs overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 hover:bg-[#F5F6F1]/60 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs font-semibold text-[#FF4B23]">
                        {faq.id}
                      </span>
                      <span className="font-display font-bold text-base sm:text-lg text-[#12151B]">
                        {faq.question}
                      </span>
                    </div>
                    <div
                      className={`w-6 h-6 rounded-xs border border-[#C7C9C0] flex items-center justify-center font-mono text-xs transition-transform duration-300 shrink-0 ${
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
                          <p>{faq.answer}</p>
                          <div className="mt-4 pt-3 border-t border-[#DCDDD6] flex items-center justify-between text-[11px] font-mono text-[#8A8E96]">
                            <span className="flex items-center gap-1.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                              Still have questions?
                            </span>
                            <a
                              href="https://wa.me/916394575814"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[#1F3D8C] font-semibold hover:text-[#FF4B23] flex items-center gap-1"
                            >
                              <MessageSquare className="w-3 h-3" />
                              <span>Ask on WhatsApp</span>
                            </a>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })
          )}
        </div>

      </div>
    </section>
  );
}
