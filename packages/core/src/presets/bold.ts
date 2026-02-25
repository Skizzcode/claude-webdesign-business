import type { Design } from "../schemas/design";
import type { SectionType } from "../schemas/sections";

export const boldDesign: Design = {
  stylePreset: "bold",
  palette: {
    primary: "#dc2626",
    secondary: "#f97316",
    accent: "#fbbf24",
    background: "#0a0a0a",
    surface: "#171717",
    text: "#fafafa",
    textMuted: "#a3a3a3",
  },
  typography: {
    headingFont: "Space Grotesk",
    bodyFont: "DM Sans",
  },
  radius: 4,
  spacing: "compact",
};

/** Bold: bg-image hero, strong contrasts, asymmetric layouts */
export const boldPageLayouts: Record<string, SectionType[]> = {
  home: [
    "hero",         // bg_image layout, bold CTA
    "services",     // grid with images
    "benefits",     // 2-column large icons
    "gallery",      // showcase work
    "testimonials", // carousel
    "cta_banner",
    "footer",
  ],
  services: [
    "hero",
    "services",
    "pricing",
    "cta_banner",
    "footer",
  ],
  about: [
    "hero",
    "benefits",
    "team",
    "gallery",
    "footer",
  ],
  contact: [
    "hero",
    "contact",
    "map",
    "footer",
  ],
};
