"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Menu, X, SquareArrowOutUpLeft, Code, LayoutDashboard } from "lucide-react";
import Link from "next/link";

interface NavbarProps {
  onOpenAuditModal?: () => void;
}

export default function Navbar({ onOpenAuditModal }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = ["hero", "services", "projects", "industries", "lead-magnets", "growth", "qualification", "faq", "security"];
      const current = sections.find((sec) => {
        const el = document.getElementById(sec);
        if (el) {
          const rect = el.getBoundingClientRect();
          return rect.top <= 120 && rect.bottom >= 120;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Home", href: "/#hero", id: "hero" },
    { label: "Services", href: "/#services", id: "services" },
    { label: "Projects", href: "/#projects", id: "projects" },
    { label: "How We Work", href: "/#growth", id: "growth" },
    { label: "Blog", href: "/blog", id: "blog" },
  ];

  return (
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
        ? "bg-[#F5F6F1]/90 backdrop-blur-md border-b border-[#DCDDD6] py-3 shadow-xs"
        : "bg-[#F5F6F1]/70 backdrop-blur-xs py-5 border-b border-transparent"
        }`}
    >
      <div className="max-w-[1180px] mx-auto px-5 sm:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <img src="/images/logo.png" alt="WebifyIt" className="h-10 sm:h-12 w-auto object-contain" />
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <Link
                key={link.label}
                href={link.href}
                className={`font-body text-xs font-semibold transition-colors relative py-1 uppercase tracking-wider ${
                  isActive ? "text-[#12151B]" : "text-[#585D67] hover:text-[#12151B]"
                }`}
              >
                {link.label}
                {isActive && (
                  <motion.div
                    layoutId="activeNavIndicator"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#FF4B23]"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* CTA */}
        <div className="flex items-center gap-3">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => onOpenAuditModal && onOpenAuditModal()}
            className="hidden sm:inline-flex btn-primary text-xs tracking-wide py-2.5 px-4 items-center gap-1.5 shadow-3d-accent"
          >
            <SquareArrowOutUpLeft className="w-3.5 h-3.5" />
            <span>Get a Free Quote</span>
          </motion.button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            className="md:hidden p-2 text-[#12151B] border border-[#C7C9C0] bg-white rounded-xs"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden bg-[#FFFFFF] border-b border-[#DCDDD6] px-5 py-6 space-y-4 overflow-hidden shadow-lg"
          >
            <div className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="font-body text-base font-medium text-[#12151B] py-2.5 border-b border-[#F5F6F1] flex items-center justify-between group"
                >
                  <span>{link.label}</span>
                  <ArrowUpRight className="w-4 h-4 text-[#8A8E96] group-hover:text-[#FF4B23] transition-colors" />
                </Link>
              ))}
            </div>
            <div className="pt-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (onOpenAuditModal) onOpenAuditModal();
                }}
                className="w-full btn-primary justify-center text-sm py-3 shadow-3d-accent"
              >
                Get a Free Project Plan
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
