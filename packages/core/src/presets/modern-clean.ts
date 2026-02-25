import type { Design } from "../schemas/design";
import type { SectionType } from "../schemas/sections";

export const modernCleanDesign: Design = {
  stylePreset: "modern_clean",
  palette: {
    primary: "#2563eb",
    secondary: "#0ea5e9",
    accent: "#f59e0b",
    background: "#ffffff",
    surface: "#f8fafc",
    text: "#0f172a",
    textMuted: "#64748b",
  },
  typography: {
    headingFont: "Inter",
    bodyFont: "Inter",
  },
  radius: 8,
  spacing: "airy",
};

/** Modern Clean: centered hero, clean grid layouts, airy spacing */
export const modernCleanPageLayouts: Record<string, SectionType[]> = {
  home: [
    "hero",         // centered layout with big headline
    "benefits",     // 3-column icon grid
    "services",     // card grid
    "testimonials", // grid layout
    "cta_banner",   // call-to-action
    "faq",          // accordion
    "footer",
  ],
  services: [
    "hero",
    "services",     // detailed list layout
    "benefits",
    "cta_banner",
    "footer",
  ],
  about: [
    "hero",
    "team",
    "testimonials",
    "cta_banner",
    "footer",
  ],
  contact: [
    "hero",
    "contact",
    "map",
    "footer",
  ],
};
