import React from "react";
import HeroSection from "./HeroSection";
import BenefitsSection from "./BenefitsSection";
import ServicesSection from "./ServicesSection";
import GallerySection from "./GallerySection";
import PricingSection from "./PricingSection";
import TeamSection from "./TeamSection";
import TestimonialsSection from "./TestimonialsSection";
import FaqSection from "./FaqSection";
import ContactSection from "./ContactSection";
import MapSection from "./MapSection";
import FooterSection from "./FooterSection";
import CTABannerSection from "./CTABannerSection";

const SECTION_MAP: Record<string, React.ComponentType<{ section: any; design: any; meta: any }>> = {
  hero: HeroSection,
  benefits: BenefitsSection,
  services: ServicesSection,
  gallery: GallerySection,
  pricing: PricingSection,
  team: TeamSection,
  testimonials: TestimonialsSection,
  faq: FaqSection,
  contact: ContactSection,
  map: MapSection,
  footer: FooterSection,
  cta_banner: CTABannerSection,
};

export function renderSection(section: any, design: any, meta: any): React.ReactNode {
  const Component = SECTION_MAP[section.type];
  if (!Component) {
    return React.createElement("div", { className: "py-8 text-center text-gray-400 text-sm" }, `Unknown section: ${section.type}`);
  }
  return React.createElement(Component, { section, design, meta });
}
