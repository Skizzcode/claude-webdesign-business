import type { Design } from "../schemas/design";
import type { SectionType } from "../schemas/sections";

export const brutalistCleanDesign: Design = {
  stylePreset: "brutalist_clean",
  palette: {
    primary: "#000000",
    secondary: "#111111",
    accent: "#FF3B00",
    background: "#FFFFFF",
    surface: "#F0F0F0",
    text: "#000000",
    textMuted: "#555555",
  },
  typography: {
    headingFont: "Syne",
    bodyFont: "Syne",
  },
  radius: 0,
  spacing: "compact",
};

/** Brutalist Clean: raw black/white, sharp edges, bold accent, unapologetic structure */
export const brutalistCleanPageLayouts: Record<string, SectionType[]> = {
  home: [
    "hero",
    "services",
    "benefits",
    "gallery",
    "cta_banner",
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
    "footer",
  ],
  contact: [
    "hero",
    "contact",
    "footer",
  ],
};
