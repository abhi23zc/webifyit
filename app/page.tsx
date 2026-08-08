"use client";

import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import LogoMarquee from "./components/LogoMarquee";
import Services from "./components/Services";
import MarketPositioningMatrix from "./components/MarketPositioningMatrix";
import LeadMagnets from "./components/LeadMagnets";
import ImpactStats from "./components/ImpactStats";
import Projects from "./components/Projects";
import Testimonials from "./components/Testimonials";
import LeadGenGrowth from "./components/LeadGenGrowth";
import FaqSection from "./components/FaqSection";
import FinalCta from "./components/FinalCta";
import Footer from "./components/Footer";
import AuditModal from "./components/AuditModal";
import QuickAuditFab from "./components/QuickAuditFab";
import MsgZoneNotification from "./components/MsgZoneNotification";

export default function Home() {
  const [isAuditModalOpen, setIsAuditModalOpen] = useState(false);
  const [msgZoneLead, setMsgZoneLead] = useState<{ name: string; focus: string } | null>(null);

  const handleOpenAuditModal = () => {
    setIsAuditModalOpen(true);
  };

  const handleCloseAuditModal = () => {
    setIsAuditModalOpen(false);
  };

  const handleLeadCaptured = (name: string, focus: string) => {
    setMsgZoneLead({ name, focus });
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Sticky Navigation */}
      <Navbar onOpenAuditModal={handleOpenAuditModal} />

      {/* Main Content Sections */}
      <main className="flex-grow">
        {/* 1. Hero Section (Phase 1 Positioning) */}
        <Hero onOpenAuditModal={handleOpenAuditModal} />

        {/* 2. Client Logo Marquee */}
        <LogoMarquee />

        {/* 3. Services (Phase 1 Engineering Capabilities) */}
        <Services />

        {/* 4. Market Positioning Matrix (Phase 6) */}
        <MarketPositioningMatrix onOpenAuditModal={handleOpenAuditModal} />

        {/* 5. Interactive Lead Magnets (Phase 3 AI Architect, Quiz, Calculator) */}
        <LeadMagnets onLeadCaptured={handleLeadCaptured} />

        {/* 6. Achievements / Stats */}
        <ImpactStats />

        {/* 7. Featured Work (Living Proof: Dine-Easy, MsgZone, HelpKey, HisabAI) */}
        <Projects onOpenAuditModal={handleOpenAuditModal} />

        {/* 8. Client Reviews & Engineering Testimonials */}
        <Testimonials />

        {/* 9. Process & Execution Engine */}
        <LeadGenGrowth onOpenAuditModal={handleOpenAuditModal} />

        {/* 10. Technical FAQ Accordion */}
        <FaqSection />

        {/* 11. Dark Full-Bleed Final CTA */}
        <FinalCta onOpenAuditModal={handleOpenAuditModal} />
      </main>

      {/* Footer (Phase 1 Refined Engineering Branding) */}
      <Footer onOpenAuditModal={handleOpenAuditModal} />

      {/* Quick Access Floating Action Button */}
      <QuickAuditFab onOpenAuditModal={handleOpenAuditModal} />

      {/* Technical Blueprint Request Modal (Phase 2) */}
      <AuditModal
        isOpen={isAuditModalOpen}
        onClose={handleCloseAuditModal}
        onLeadCaptured={handleLeadCaptured}
      />

      {/* MsgZone WhatsApp Automation Notification (Phase 4) */}
      <MsgZoneNotification
        isOpen={!!msgZoneLead}
        leadName={msgZoneLead?.name}
        auditFocus={msgZoneLead?.focus}
        onClose={() => setMsgZoneLead(null)}
      />
    </div>
  );
}
