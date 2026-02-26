import type { Design } from "../schemas/design";
import type { SectionType } from "../schemas/sections";

export const swissGridDesign: Design = {
  stylePreset: "swiss_grid",
  palette: {
    primary: "#1C1C1E",
    secondary: "#3A3A3C",
    accent: "#0066CC",
    background: "#FFFFFF",
    surface: "#F5F5F7",
    text: "#1C1C1E",
    textMuted: "#6E6E73",
  },
  typography: {
    headingFont: "Inter",
    bodyFont: "Inter",
  },
  radius: 2,
  spacing: "compact",
};

/** Swiss Grid: strict typographic grid, clean structure, minimal ornamentation */
export const swissGridPageLayouts: Record<string, SectionType[]> = {
  home: [
    "hero",
    "benefits",
    "services",
    "testimonials",
    "faq",
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
