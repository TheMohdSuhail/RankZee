import React from "react";
import { HeroSection } from "@/components/sections/hero-section";
import { ServicesOverview } from "@/components/sections/services-overview";
import { WhyChooseUs } from "@/components/sections/why-choose-us";
import { ProcessSteps } from "@/components/sections/process-steps";
import { StatsCounter } from "@/components/sections/stats-counter";
import { PortfolioPreview } from "@/components/sections/portfolio-preview";
import { TestimonialsSlider } from "@/components/sections/testimonials-slider";
import { PricingPreview } from "@/components/sections/pricing-preview";
import { FAQAccordion } from "@/components/sections/faq-accordion";
import { CTABanner } from "@/components/sections/cta-banner";
import { LeadFormSection } from "@/components/sections/lead-form-section";

export default function HomePage() {
  return (
    <div className="flex flex-col w-full overflow-hidden">
      {/* 1. Hero with interactive 3D particle & growth graph scene */}
      <HeroSection />

      {/* 2. Services Overview with 3D Tilt Cards */}
      <ServicesOverview />

      {/* 3. Why RankZee & Direct Comparative Breakdown */}
      <WhyChooseUs />

      {/* 4. Process Steps (01 Diagnostic to 04 Scale) */}
      <ProcessSteps />

      {/* 5. Animated Stats Counter */}
      <StatsCounter />

      {/* 6. Case Studies / Portfolio Preview */}
      <PortfolioPreview />

      {/* 7. Client Testimonials */}
      <TestimonialsSlider />

      {/* 8. Pricing Packages Preview */}
      <PricingPreview />

      {/* 9. Frequently Answered Questions (Schema-Compliant) */}
      <FAQAccordion />

      {/* 10. Urgent Audit CTA Banner */}
      <CTABanner />

      {/* 11. Lead Capture Form Section */}
      <LeadFormSection />
    </div>
  );
}

