import type { Design } from "../schemas/design";
import type { SectionType } from "../schemas/sections";

export const techModernDesign: Design = {
  stylePreset: "tech_modern",
  palette: {
    primary: "#0A0A0F",
    secondary: "#1E1E2E",
    accent: "#6366F1",
    background: "#0A0A0F",
    surface: "#13131F",
    text: "#F8FAFC",
    textMuted: "#94A3B8",
  },
  typography: {
    headingFont: "Space Grotesk",
    bodyFont: "Inter",
  },
  radius: 12,
  spacing: "compact",
};

/** Tech Modern: dark UI, high contrast, feature-focused, indigo accents */
export const techModernPageLayouts: Record<string, SectionType[]> = {
  home: [
    "hero",
    "benefits",
    "services",
    "pricing",
    "testimonials",
    "faq",
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
    "cta_banner",
    "footer",
  ],
  contact: [
    "hero",
    "contact",
    "footer",
  ],
};
