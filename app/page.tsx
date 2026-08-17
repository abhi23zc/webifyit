"use client";

import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import LogoMarquee from "./components/LogoMarquee";
import Services from "./components/Services";
import LeadMagnets from "./components/LeadMagnets";
import ImpactStats from "./components/ImpactStats";
import Projects from "./components/Projects";
import IndustriesWeServe from "./components/IndustriesWeServe";
import Testimonials from "./components/Testimonials";
import LeadGenGrowth from "./components/LeadGenGrowth";
import LeadQualification from "./components/LeadQualification";
import FaqSection from "./components/FaqSection";
import DataProtection from "./components/DataProtection";
import FinalCta from "./components/FinalCta";
import Footer from "./components/Footer";
import AuditModal from "./components/AuditModal";
import QuickAuditFab from "./components/QuickAuditFab";

export default function Home() {
  const [isAuditModalOpen, setIsAuditModalOpen] = useState(false);

  const handleOpenAuditModal = () => setIsAuditModalOpen(true);
  const handleCloseAuditModal = () => setIsAuditModalOpen(false);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Sticky Navigation */}
      <Navbar onOpenAuditModal={handleOpenAuditModal} />

      <main className="flex-grow">
        {/* 1. Hero — "What do you do?" */}
        <Hero onOpenAuditModal={handleOpenAuditModal} />

        {/* 2. Client Logo Strip — "Who have you worked with?" */}
        <LogoMarquee />

        {/* 3. Services — "What exactly can you build for me?" */}
        <Services />

        {/* 4. Interactive Lead Magnets — "Prove it — let me test your AI tools" */}
        <LeadMagnets />

        {/* 5. Impact Stats — "What results have you delivered?" */}
        <ImpactStats />

        {/* 6. Projects / Case Studies — "Show me real work" */}
        <Projects onOpenAuditModal={handleOpenAuditModal} />

        {/* 7. Industries We Serve — "Do you understand MY industry?" */}
        <IndustriesWeServe onOpenAuditModal={handleOpenAuditModal} />

        {/* 8. Client Testimonials — "What do your clients say?" */}
        <Testimonials />

        {/* 9. How We Work — "How would working together actually work?" */}
        <LeadGenGrowth onOpenAuditModal={handleOpenAuditModal} />

        {/* 10. Lead Qualification — "Am I the right fit for you?" */}
        <LeadQualification onOpenAuditModal={handleOpenAuditModal} />

        {/* 11. FAQ — "I have some concerns..." */}
        <FaqSection />

        {/* 12. Data Protection & Security — "Can I trust you with my data / IP?" */}
        <DataProtection />

        {/* 13. Final CTA — "OK, I'm ready — what's next?" */}
        <FinalCta onOpenAuditModal={handleOpenAuditModal} />
      </main>

      {/* Footer */}
      <Footer onOpenAuditModal={handleOpenAuditModal} />

      {/* Quick Access FAB */}
      <QuickAuditFab onOpenAuditModal={handleOpenAuditModal} />

      {/* Blueprint Request Modal */}
      <AuditModal
        isOpen={isAuditModalOpen}
        onClose={handleCloseAuditModal}
      />
    </div>
  );
}
