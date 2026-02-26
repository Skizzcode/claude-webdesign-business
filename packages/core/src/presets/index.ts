import type { Design, StylePreset } from "../schemas/design";
import type { SectionType } from "../schemas/sections";
import { swissGridDesign, swissGridPageLayouts } from "./swiss-grid";
import { warmLocalDesign, warmLocalPageLayouts } from "./warm-local";
import { techModernDesign, techModernPageLayouts } from "./tech-modern";
import { luxuryMinimalDesign, luxuryMinimalPageLayouts } from "./luxury-minimal";
import { editorialDesign, editorialPageLayouts } from "./editorial";
import { glassmorphismDesign, glassmorphismPageLayouts } from "./glassmorphism";
import { brutalistCleanDesign, brutalistCleanPageLayouts } from "./brutalist-clean";
import { nordicSoftDesign, nordicSoftPageLayouts } from "./nordic-soft";

export const PRESET_DESIGNS: Record<StylePreset, Design> = {
  swiss_grid: swissGridDesign,
  warm_local: warmLocalDesign,
  tech_modern: techModernDesign,
  luxury_minimal: luxuryMinimalDesign,
  editorial: editorialDesign,
  glassmorphism: glassmorphismDesign,
  brutalist_clean: brutalistCleanDesign,
  nordic_soft: nordicSoftDesign,
};

export const PRESET_LAYOUTS: Record<StylePreset, Record<string, SectionType[]>> = {
  swiss_grid: swissGridPageLayouts,
  warm_local: warmLocalPageLayouts,
  tech_modern: techModernPageLayouts,
  luxury_minimal: luxuryMinimalPageLayouts,
  editorial: editorialPageLayouts,
  glassmorphism: glassmorphismPageLayouts,
  brutalist_clean: brutalistCleanPageLayouts,
  nordic_soft: nordicSoftPageLayouts,
};

/** Maps legacy preset names to new ones for backward compatibility */
export const LEGACY_PRESET_MAP: Record<string, StylePreset> = {
  modern_clean: "swiss_grid",
  bold: "brutalist_clean",
  elegant: "luxury_minimal",
};

/** Normalize any preset string (including legacy names) to a valid StylePreset */
export function normalizePreset(value: string): StylePreset {
  if (value in PRESET_DESIGNS) return value as StylePreset;
  if (value in LEGACY_PRESET_MAP) return LEGACY_PRESET_MAP[value];
  return "swiss_grid";
}

/** Metadata for UI preset selector cards */
export const PRESET_META: Record<
  StylePreset,
  {
    label: string;
    description: string;
    headingFont: string;
    colorDots: [string, string, string];
  }
> = {
  swiss_grid: {
    label: "Swiss Grid",
    description: "Sachlich, präzise, typografisch stark",
    headingFont: "Inter",
    colorDots: ["#1C1C1E", "#0066CC", "#FFFFFF"],
  },
  warm_local: {
    label: "Warm Local",
    description: "Einladend, handwerklich, mit Charakter",
    headingFont: "Playfair Display",
    colorDots: ["#2C1810", "#C8860A", "#FDF8F3"],
  },
  tech_modern: {
    label: "Tech Modern",
    description: "Dunkel, modern, hoher Kontrast",
    headingFont: "Space Grotesk",
    colorDots: ["#0A0A0F", "#6366F1", "#13131F"],
  },
  luxury_minimal: {
    label: "Luxury Minimal",
    description: "Elegant, minimalistisch, viel Weißraum",
    headingFont: "Cormorant Garamond",
    colorDots: ["#1A1A1A", "#B8860B", "#FFFFFF"],
  },
  editorial: {
    label: "Editorial",
    description: "Mutig, redaktionell, starke Typografie",
    headingFont: "DM Serif Display",
    colorDots: ["#111111", "#E63946", "#FFFFFF"],
  },
  glassmorphism: {
    label: "Glassmorphism",
    description: "Modernes Frosted-Glass-Design",
    headingFont: "Plus Jakarta Sans",
    colorDots: ["#0F172A", "#818CF8", "#1E293B"],
  },
  brutalist_clean: {
    label: "Brutalist Clean",
    description: "Roh, direkt, unverwechselbar",
    headingFont: "Syne",
    colorDots: ["#000000", "#FF3B00", "#FFFFFF"],
  },
  nordic_soft: {
    label: "Nordic Soft",
    description: "Skandinavisch, natürlich, beruhigend",
    headingFont: "Nunito",
    colorDots: ["#2D4A3E", "#82C09A", "#F9F7F4"],
  },
};

export function getDesignForPreset(preset: StylePreset): Design {
  return PRESET_DESIGNS[preset];
}

export function getPageLayoutForPreset(
  preset: StylePreset,
  pageSlug: string
): SectionType[] {
  const layouts = PRESET_LAYOUTS[preset];
  return layouts[pageSlug] || layouts["home"];
}

// Named exports for direct import (backward compat for any direct imports)
export {
  swissGridDesign,
  warmLocalDesign,
  techModernDesign,
  luxuryMinimalDesign,
  editorialDesign,
  glassmorphismDesign,
  brutalistCleanDesign,
  nordicSoftDesign,
};
