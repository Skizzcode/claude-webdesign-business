import type { Design } from "../schemas/design";
import type { SectionType } from "../schemas/sections";

export const warmLocalDesign: Design = {
  stylePreset: "warm_local",
  palette: {
    primary: "#2C1810",
    secondary: "#5C3827",
    accent: "#C8860A",
    background: "#FDF8F3",
    surface: "#F5EDE0",
    text: "#2C1810",
    textMuted: "#8B6756",
  },
  typography: {
    headingFont: "Playfair Display",
    bodyFont: "Lato",
  },
  radius: 8,
  spacing: "airy",
};

/** Warm Local: inviting, artisan feel, generous whitespace, serif headings */
export const warmLocalPageLayouts: Record<string, SectionType[]> = {
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
    "gallery",
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
