import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import AgencyHero from "../components/agency/AgencyHero";
import AgencyProblemGrid from "../components/agency/AgencyProblemGrid";
import PartnershipFlow from "../components/agency/PartnershipFlow";
import CapabilityCards from "../components/agency/CapabilityCards";
import PartnerModels from "../components/agency/PartnerModels";
import AgencyFaq from "../components/agency/AgencyFaq";
import AgencyLeadCta from "../components/agency/AgencyLeadCta";

export const metadata = {
  title: "White-Label Software & AI Engineering Partner | Webifyit",
  description: "Webifyit helps digital agencies deliver custom software, SaaS, web apps, and AI solutions with flexible white-label engineering capacity.",
};

export default function AgencyPartnerPage() {
  return (
    <main className="min-h-screen bg-[#F5F6F1] font-body text-[#12151B]">
      <Navbar />
      
      <AgencyHero />
      <AgencyProblemGrid />
      <CapabilityCards />
      <PartnerModels />
      <PartnershipFlow />
      <AgencyFaq />
      
      <AgencyLeadCta />
      
      <Footer />
    </main>
  );
}
