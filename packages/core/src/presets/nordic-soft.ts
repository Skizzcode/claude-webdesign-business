import type { Design } from "../schemas/design";
import type { SectionType } from "../schemas/sections";

export const nordicSoftDesign: Design = {
  stylePreset: "nordic_soft",
  palette: {
    primary: "#2D4A3E",
    secondary: "#3D6456",
    accent: "#82C09A",
    background: "#F9F7F4",
    surface: "#EDF3EF",
    text: "#2D4A3E",
    textMuted: "#6B8C7E",
  },
  typography: {
    headingFont: "Nunito",
    bodyFont: "Nunito",
  },
  radius: 16,
  spacing: "airy",
};

/** Nordic Soft: Scandinavian calm, muted forest greens, rounded shapes, natural feel */
export const nordicSoftPageLayouts: Record<string, SectionType[]> = {
  home: [
    "hero",
    "benefits",
    "services",
    "gallery",
    "testimonials",
    "cta_banner",
    "footer",
  ],
  services: [
    "hero",
    "services",
    "benefits",
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
