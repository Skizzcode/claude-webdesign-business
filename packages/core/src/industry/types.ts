import type { SectionType } from "../schemas/sections";
import type { StylePreset, SpacingPreset } from "../schemas/design";

// ── Industry Taxonomy ─────────────────────────────────────

export const INDUSTRY_IDS = [
  "healthcare_dentist",
  "healthcare_doctor",
  "healthcare_physio",
  "food_restaurant",
  "food_bakery",
  "beauty_salon",
  "fitness_gym",
  "home_services_plumbing",
  "home_services_electrical",
  "home_services_cleaning",
  "home_services_construction",
  "professional_law",
  "professional_tax",
  "real_estate",
  "education_daycare",
  "auto_repair",
  "other",
] as const;

export type IndustryId = (typeof INDUSTRY_IDS)[number];

// IndustryClassification type is defined via Zod in schemas/meta.ts

// ── CTA Sets ──────────────────────────────────────────────

export interface BilingualString {
  de: string;
  en: string;
}

export interface CTASet {
  primary: { label: BilingualString; href: string };
  secondary: { label: BilingualString; href: string };
  microcopy: BilingualString;
}

// ── Trust Signals ─────────────────────────────────────────

export interface TrustSignal {
  type: "certification" | "association" | "stat" | "guarantee" | "review_platform";
  label: BilingualString;
  icon?: string; // Lucide icon name
  placeholder: string;
}

// ── Art Direction ─────────────────────────────────────────

export interface PexelsQuery {
  query: string;
  orientation?: "landscape" | "portrait" | "square";
  color?: string;
}

export interface ArtDirection {
  heroQueries: PexelsQuery[];
  serviceQueries: PexelsQuery[];
  galleryQueries: PexelsQuery[];
  teamQueries: PexelsQuery[];
  doKeywords: string[];
  dontKeywords: string[];
  preferredComposition: "close_up" | "wide" | "overhead" | "portrait";
  videoSuitable: boolean;
  videoQueries?: PexelsQuery[];
}

// ── Copy Framework ────────────────────────────────────────

export interface CopyFramework {
  toneOfVoice: string;
  headlinePatterns: BilingualString[];
  benefitThemes: BilingualString[];
  faqTemplates: { question: BilingualString; answer: BilingualString }[];
  serviceCardStyle: "icon_title_desc" | "image_overlay" | "numbered_steps";
}

// ── Design Overrides ──────────────────────────────────────

export interface DesignHints {
  paletteStrategy: string;
  typographyHints?: Partial<Record<StylePreset, { heading: string; body: string }>>;
  radiusRange?: [number, number];
  spacingPreference?: SpacingPreset;
}

// ── Layout Blueprint ──────────────────────────────────────

export interface SectionBlueprint {
  type: SectionType;
  variant?: string;
  instructions?: string;
}

export interface PageBlueprint {
  slug: string;
  title: BilingualString;
  navLabel: BilingualString;
  sections: SectionBlueprint[];
}

export interface TemplateBlueprint {
  id: string;
  name: string;
  compatibleIndustries: IndustryId[];
  compatiblePresets: StylePreset[];
  pages: PageBlueprint[];
}

// ── The Full Profile ──────────────────────────────────────

export interface IndustryProfile {
  id: IndustryId;
  label: BilingualString;
  legacyKeys: string[];
  ctaSets: CTASet[];
  trustSignals: TrustSignal[];
  artDirection: ArtDirection;
  copyFramework: CopyFramework;
  designHints: DesignHints;
  prioritySections: SectionType[];
  skipSections?: SectionType[];
}
