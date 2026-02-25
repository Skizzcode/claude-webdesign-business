import type { Design } from "../schemas/design";
import type { SectionType } from "../schemas/sections";

export const elegantDesign: Design = {
  stylePreset: "elegant",
  palette: {
    primary: "#7c3aed",
    secondary: "#a78bfa",
    accent: "#c084fc",
    background: "#faf9f7",
    surface: "#f5f3ef",
    text: "#1c1917",
    textMuted: "#78716c",
  },
  typography: {
    headingFont: "Playfair Display",
    bodyFont: "Source Sans 3",
  },
  radius: 12,
  spacing: "airy",
};

/** Elegant: split hero, serif headings, refined spacing, muted tones */
export const elegantPageLayouts: Record<string, SectionType[]> = {
  home: [
    "hero",         // split_left with image
    "benefits",     // 3-column with descriptions
    "services",     // list layout, sophisticated
    "testimonials", // stacked with large quotes
    "faq",
    "cta_banner",
    "footer",
  ],
  services: [
    "hero",
    "services",
    "testimonials",
    "cta_banner",
    "footer",
  ],
  about: [
    "hero",
    "team",
    "gallery",
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
