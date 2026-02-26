import type { Design } from "../schemas/design";
import type { SectionType } from "../schemas/sections";

export const luxuryMinimalDesign: Design = {
  stylePreset: "luxury_minimal",
  palette: {
    primary: "#1A1A1A",
    secondary: "#2D2D2D",
    accent: "#B8860B",
    background: "#FFFFFF",
    surface: "#FAFAFA",
    text: "#1A1A1A",
    textMuted: "#8B8680",
  },
  typography: {
    headingFont: "Cormorant Garamond",
    bodyFont: "Jost",
  },
  radius: 0,
  spacing: "airy",
};

/** Luxury Minimal: ultra-restrained, generous whitespace, refined serif typography */
export const luxuryMinimalPageLayouts: Record<string, SectionType[]> = {
  home: [
    "hero",
    "benefits",
    "services",
    "testimonials",
    "team",
    "footer",
  ],
  services: [
    "hero",
    "services",
    "cta_banner",
    "footer",
  ],
  about: [
    "hero",
    "team",
    "testimonials",
    "footer",
  ],
  contact: [
    "hero",
    "contact",
    "map",
    "footer",
  ],
};
