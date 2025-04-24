import HeroSection from "@/components/hero-section"
import ServicesSection from "@/components/services-section"
import TrustSection from "@/components/trust-section"
import PackagesSection from "@/components/packages-section"
import ConversionSection from "@/components/conversion-section"
import SeoSection from "@/components/seo-section"
import AnalyticsSection from "@/components/analytics-section"
import LeadGenSection from "@/components/lead-gen-section"
import StatsSection from "@/components/stats-section"
import ContactPage from "@/components/contact-form"


export default function Home() {
  return (
    <div className="flex flex-col w-full">
      <div id="home">
        <HeroSection />
      </div>
      <ServicesSection />
      <StatsSection />
      <TrustSection />

      <AnalyticsSection />
      <LeadGenSection />
      <ConversionSection />


    </div>
  )
}
