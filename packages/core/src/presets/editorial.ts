import type { Design } from "../schemas/design";
import type { SectionType } from "../schemas/sections";

export const editorialDesign: Design = {
  stylePreset: "editorial",
  palette: {
    primary: "#111111",
    secondary: "#333333",
    accent: "#E63946",
    background: "#FFFFFF",
    surface: "#F7F7F7",
    text: "#111111",
    textMuted: "#666666",
  },
  typography: {
    headingFont: "DM Serif Display",
    bodyFont: "DM Sans",
  },
  radius: 4,
  spacing: "normal",
};

/** Editorial: bold magazine typography, strong hierarchy, editorial grid */
export const editorialPageLayouts: Record<string, SectionType[]> = {
  home: [
    "hero",
    "services",
    "benefits",
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
