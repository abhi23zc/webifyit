"use client";

import React, { useRef, useState } from "react";
import { motion, useSpring, useTransform } from "framer-motion";

interface Card3DProps {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
  depth?: number;
  onClick?: () => void;
}

export default function Card3D({
  children,
  className = "",
  intensity = 3, // Toned down significantly for ultra-subtle premium feel
  depth = 10,
  onClick,
}: Card3DProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [spotlightPos, setSpotlightPos] = useState({ x: 50, y: 50 });

  // Smooth, high-damping spring values for micro-tilt
  const mouseX = useSpring(0, { stiffness: 200, damping: 30 });
  const mouseY = useSpring(0, { stiffness: 200, damping: 30 });

  // Very subtle 3D rotation (max 2-3 degrees)
  const rotateX = useTransform(mouseY, [-0.5, 0.5], [intensity, -intensity]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-intensity, intensity]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const xPos = (e.clientX - rect.left) / width - 0.5;
    const yPos = (e.clientY - rect.top) / height - 0.5;

    mouseX.set(xPos);
    mouseY.set(yPos);

    setSpotlightPos({
      x: ((e.clientX - rect.left) / width) * 100,
      y: ((e.clientY - rect.top) / height) * 100,
    });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div className="perspective-1000 h-full">
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={onClick}
        animate={{
          y: isHovered ? -3 : 0,
        }}
        style={{
          rotateX: isHovered ? rotateX : 0,
          rotateY: isHovered ? rotateY : 0,
          transformStyle: "preserve-3d",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className={`relative transition-all duration-300 h-full ${className}`}
      >
        {/* Subtle Mouse Spotlight Glow */}
        {isHovered && (
          <div
            className="absolute inset-0 pointer-events-none rounded-inherit z-10 opacity-40 transition-opacity duration-300"
            style={{
              background: `radial-gradient(350px circle at ${spotlightPos.x}% ${spotlightPos.y}%, rgba(255, 75, 35, 0.05), transparent 80%)`,
            }}
          />
        )}

        {/* Card Content Wrapper */}
        <div style={{ transformStyle: "preserve-3d" }} className="w-full h-full">
          {children}
        </div>
      </motion.div>
    </div>
  );
}
