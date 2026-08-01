"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, MessageCircle, X, SquareArrowOutUpLeft } from "lucide-react";

interface QuickAuditFabProps {
  onOpenAuditModal: () => void;
}

export default function QuickAuditFab({ onOpenAuditModal }: QuickAuditFabProps) {
  const [showFab, setShowFab] = useState(false);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowFab(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!showFab) return null;

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3">
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="bg-white border-2 border-[#12151B] p-4 rounded-xs shadow-2xl xmark w-64 space-y-3"
          >
            <div className="flex items-center justify-between border-b border-[#DCDDD6] pb-2">
              <span className="font-mono text-[10px] font-bold text-[#FF4B23] uppercase tracking-wider">
                QUICK SPEC ACTIONS
              </span>
              <button
                onClick={() => setExpanded(false)}
                className="text-[#8A8E96] hover:text-[#12151B]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="font-body text-xs text-[#585D67]">
              Ready to optimize your web & app performance? Select an option below:
            </p>

            <button
              onClick={() => {
                setExpanded(false);
                onOpenAuditModal();
              }}
              className="w-full btn-primary text-xs py-2 px-3 justify-center gap-1.5"
            >
              <SquareArrowOutUpLeft className="w-3.5 h-3.5" />
              <span>Get Free Website Audit</span>
            </button>

            <a
              href="https://wa.me/916394575814?text=Hi%20WebifyIt!%20I%20want%20to%20discuss%20a%20new%20project."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full btn-secondary text-xs py-2 px-3 justify-center gap-1.5"
            >
              <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
              <span>WhatsApp Strategy Call</span>
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        onClick={() => setExpanded(!expanded)}
        className="bg-[#12151B] text-white p-3.5 rounded-xs border-2 border-[#12151B] shadow-xl hover:bg-[#FF4B23] hover:border-[#FF4B23] transition-colors flex items-center gap-2 font-mono text-xs font-semibold"
      >
        <SquareArrowOutUpLeft className="w-4 h-4 text-[#FF4B23] animate-pulse" />
        <span className="hidden sm:inline">Audit & Strategy</span>
      </motion.button>
    </div>
  );
}
