import type { Design } from "../schemas/design";
import type { SectionType } from "../schemas/sections";

export const glassmorphismDesign: Design = {
  stylePreset: "glassmorphism",
  palette: {
    primary: "#0F172A",
    secondary: "#1E293B",
    accent: "#818CF8",
    background: "#0F172A",
    surface: "#1E293B",
    text: "#F1F5F9",
    textMuted: "#94A3B8",
  },
  typography: {
    headingFont: "Plus Jakarta Sans",
    bodyFont: "Inter",
  },
  radius: 20,
  spacing: "normal",
};

/** Glassmorphism: dark navy, frosted glass cards, lavender accents, modern blur */
export const glassmorphismPageLayouts: Record<string, SectionType[]> = {
  home: [
    "hero",
    "benefits",
    "services",
    "pricing",
    "testimonials",
    "cta_banner",
    "footer",
  ],
  services: [
    "hero",
    "services",
    "benefits",
    "cta_banner",
    "footer",
  ],
  about: [
    "hero",
    "team",
    "footer",
  ],
  contact: [
    "hero",
    "contact",
    "footer",
  ],
};
