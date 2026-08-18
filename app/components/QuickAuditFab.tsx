"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, SquareArrowOutUpLeft } from "lucide-react";

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
              <span>Request a Technical Blueprint</span>
            </button>

            <a
              href="https://wa.me/919026665814?text=Hi%20WebifyIt!%20I%20want%20to%20discuss%20a%20new%20project."
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
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setExpanded(!expanded)}
        className="bg-[#12151B] text-white p-3.5 sm:p-4 rounded-full shadow-2xl hover:bg-[#FF4B23] transition-all flex items-center justify-center gap-0 group relative overflow-hidden"
      >
        <SquareArrowOutUpLeft className="w-5 h-5 text-[#FF4B23] group-hover:text-white transition-colors z-10 relative" />
        <span className="font-mono text-xs font-semibold whitespace-nowrap max-w-0 opacity-0 group-hover:max-w-[200px] group-hover:opacity-100 group-hover:ml-3 group-hover:pr-2 transition-all duration-300 ease-in-out z-10 relative">
          Audit & Strategy
        </span>
      </motion.button>
    </div>
  );
}
