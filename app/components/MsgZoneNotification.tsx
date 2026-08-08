"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, X, ExternalLink, Play, Sparkles } from "lucide-react";

interface MsgZoneNotificationProps {
  leadName?: string;
  auditFocus?: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function MsgZoneNotification({
  leadName = "Valued Founder",
  auditFocus = "Custom Software Architecture",
  isOpen,
  onClose,
}: MsgZoneNotificationProps) {
  const [playAudioSim, setPlayAudioSim] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setPlayAudioSim(true);
      const timer = setTimeout(() => setPlayAudioSim(false), 4000);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed bottom-6 right-6 z-50 max-w-md w-full px-4">
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          className="bg-[#12151B] border-2 border-[#25D366] text-white p-5 rounded-sm shadow-2xl relative overflow-hidden"
        >
          {/* Header Tag */}
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#25D366] animate-ping" />
              <span className="font-mono text-xs font-bold text-[#25D366] uppercase tracking-wider">
                MSGZONE AUTOMATION ENGINE
              </span>
            </div>
            <button
              onClick={onClose}
              className="text-[#8A8E96] hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Incoming WhatsApp Preview Box */}
          <div className="bg-[#0B141A] p-4 rounded-xs border border-[#25D366]/30 font-sans text-xs space-y-2.5">
            <div className="flex items-center justify-between text-[10px] text-[#25D366] font-mono">
              <span className="font-bold uppercase flex items-center gap-1">
                <CheckCircle className="w-3 h-3" />
                INSTANT WHATSAPP DISPATCHED
              </span>
              <span>Just now</span>
            </div>

            <div className="bg-[#202C33] text-white p-3 rounded-xs rounded-tl-none border-l-2 border-[#25D366] text-xs leading-relaxed space-y-2">
              <p>
                <span className="font-semibold text-[#25D366]">Hi {leadName},</span> this is the{" "}
                <span className="font-bold">WebifyIt Engineering Team</span>.
              </p>
              <p>
                We received your request regarding{" "}
                <span className="text-[#FF4B23] font-semibold">{auditFocus}</span>. Our architects are reviewing your business profile and will share a feasibility blueprint shortly.
              </p>
              <div className="bg-[#111B21] p-2 rounded border border-white/10 flex items-center justify-between text-[11px] text-[#8A8E96]">
                <div className="flex items-center gap-2">
                  <Play className="w-4 h-4 text-[#25D366] fill-[#25D366]" />
                  <span>1-Min Real-time AI System Demo</span>
                </div>
                <span className="text-[10px] text-[#25D366] font-mono">0:58</span>
              </div>
            </div>
          </div>

          {/* Footer Action */}
          <div className="mt-3 flex items-center justify-between text-[11px] font-mono text-[#8A8E96]">
            <span>Status: 200 OK (MsgZone API)</span>
            <button
              onClick={onClose}
              className="text-[#25D366] font-semibold hover:underline flex items-center gap-1"
            >
              <span>Dismiss Simulation</span>
              <ExternalLink className="w-3 h-3" />
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
