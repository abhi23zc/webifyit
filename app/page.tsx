"use client";

import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import LogoMarquee from "./components/LogoMarquee";
import Services from "./components/Services";
import ImpactStats from "./components/ImpactStats";
import Projects from "./components/Projects";
import Testimonials from "./components/Testimonials";
import AnalyticsInsights from "./components/AnalyticsInsights";
import LeadGenGrowth from "./components/LeadGenGrowth";
import FaqSection from "./components/FaqSection";
import FinalCta from "./components/FinalCta";
import Footer from "./components/Footer";
import AuditModal from "./components/AuditModal";
import QuickAuditFab from "./components/QuickAuditFab";

export default function Home() {
  const [isAuditModalOpen, setIsAuditModalOpen] = useState(false);

  const handleOpenAuditModal = () => {
    setIsAuditModalOpen(true);
  };

  const handleCloseAuditModal = () => {
    setIsAuditModalOpen(false);
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Sticky Navigation */}
      <Navbar onOpenAuditModal={handleOpenAuditModal} />

      {/* Main Content Sections */}
      <main className="flex-grow">
        {/* 1. Hero Section */}
        <Hero onOpenAuditModal={handleOpenAuditModal} />

        {/* 2. Client Logo Marquee */}
        <LogoMarquee />

        {/* 3. Services (FIG. 01 — SERVICES) */}
        <Services />

        {/* 4. Achievements / Stats (FIG. 02 — IMPACT) */}
        <ImpactStats />

        {/* 5. Featured Work (FIG. 03 — PROJECTS) */}
        <Projects onOpenAuditModal={handleOpenAuditModal} />

        {/* 6. Testimonials (FIG. 04 — TESTIMONIALS) */}
        <Testimonials />

        {/* 7. Analytics & Insights (FIG. 05 — INSIGHTS) */}
        <AnalyticsInsights />

        {/* 8. Lead-Gen Enhancements (FIG. 06 — GROWTH) */}
        <LeadGenGrowth onOpenAuditModal={handleOpenAuditModal} />

        {/* 9. FAQ Accordion (FIG. 07 — FAQ) */}
        <FaqSection />

        {/* 10. Dark Full-Bleed Final CTA */}
        <FinalCta onOpenAuditModal={handleOpenAuditModal} />
      </main>

      {/* Footer */}
      <Footer onOpenAuditModal={handleOpenAuditModal} />

      {/* Quick Access Floating Action Button */}
      <QuickAuditFab onOpenAuditModal={handleOpenAuditModal} />

      {/* Lead Generation Audit Modal */}
      <AuditModal
        isOpen={isAuditModalOpen}
        onClose={handleCloseAuditModal}
      />
    </div>
  );
}
