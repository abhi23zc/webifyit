"use client";

import { MotionConfig } from "framer-motion";

export function AnimationDisabler({ children }: { children: React.ReactNode }) {
  return (
    <MotionConfig reducedMotion="always">
      {children}
    </MotionConfig>
  );
}
