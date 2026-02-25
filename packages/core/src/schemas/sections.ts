import { z } from "zod";

// ── Shared primitives ─────────────────────────────────────────

const ImageRef = z.object({
  src: z.string().describe("Relative path in assets/ or absolute URL"),
  alt: z.string(),
  width: z.number().optional(),
  height: z.number().optional(),
});

const ButtonSchema = z.object({
  label: z.string(),
  href: z.string(),
  variant: z.enum(["primary", "secondary", "outline", "ghost"]).default("primary"),
});

const baseSectionFields = {
  id: z.string(),
  visible: z.boolean().default(true),
  paddingTop: z.enum(["none", "sm", "md", "lg"]).default("md"),
  paddingBottom: z.enum(["none", "sm", "md", "lg"]).default("md"),
  background: z.enum(["default", "surface", "primary", "dark"]).default("default"),
};

// ── Section: Hero ─────────────────────────────────────────────

export const HeroSectionSchema = z.object({
  ...baseSectionFields,
  type: z.literal("hero"),
  headline: z.string(),
  subheadline: z.string().optional(),
  buttons: z.array(ButtonSchema).max(3),
  image: ImageRef.optional(),
  layout: z.enum(["centered", "split_left", "split_right", "bg_image"]).default("centered"),
});

// ── Section: Benefits ─────────────────────────────────────────

export const BenefitItem = z.object({
  icon: z.string().optional().describe("Lucide icon name"),
  title: z.string(),
  description: z.string(),
});

export const BenefitsSectionSchema = z.object({
  ...baseSectionFields,
  type: z.literal("benefits"),
  headline: z.string().optional(),
  subtitle: z.string().optional(),
  items: z.array(BenefitItem).min(1).max(8),
  columns: z.enum(["2", "3", "4"]).default("3"),
});

// ── Section: Services ─────────────────────────────────────────

export const ServiceItem = z.object({
  icon: z.string().optional(),
  title: z.string(),
  description: z.string(),
  image: ImageRef.optional(),
  price: z.string().optional(),
  button: ButtonSchema.optional(),
});

export const ServicesSectionSchema = z.object({
  ...baseSectionFields,
  type: z.literal("services"),
  headline: z.string().optional(),
  subtitle: z.string().optional(),
  items: z.array(ServiceItem).min(1),
  layout: z.enum(["grid", "list", "cards"]).default("cards"),
});

// ── Section: Gallery ──────────────────────────────────────────

export const GallerySectionSchema = z.object({
  ...baseSectionFields,
  type: z.literal("gallery"),
  headline: z.string().optional(),
  images: z.array(ImageRef).min(1),
  columns: z.enum(["2", "3", "4"]).default("3"),
});

// ── Section: Pricing ──────────────────────────────────────────

export const PricingTier = z.object({
  name: z.string(),
  price: z.string(),
  period: z.string().optional(),
  features: z.array(z.string()),
  button: ButtonSchema.optional(),
  highlighted: z.boolean().default(false),
});

export const PricingSectionSchema = z.object({
  ...baseSectionFields,
  type: z.literal("pricing"),
  headline: z.string().optional(),
  subtitle: z.string().optional(),
  tiers: z.array(PricingTier).min(1).max(4),
});

// ── Section: Team ─────────────────────────────────────────────

export const TeamMember = z.object({
  name: z.string(),
  role: z.string(),
  bio: z.string().optional(),
  image: ImageRef.optional(),
});

export const TeamSectionSchema = z.object({
  ...baseSectionFields,
  type: z.literal("team"),
  headline: z.string().optional(),
  members: z.array(TeamMember).min(1),
});

// ── Section: Testimonials ─────────────────────────────────────

export const Testimonial = z.object({
  quote: z.string(),
  author: z.string(),
  role: z.string().optional(),
  image: ImageRef.optional(),
  rating: z.number().min(1).max(5).optional(),
});

export const TestimonialsSectionSchema = z.object({
  ...baseSectionFields,
  type: z.literal("testimonials"),
  headline: z.string().optional(),
  items: z.array(Testimonial).min(1),
  layout: z.enum(["carousel", "grid", "stacked"]).default("grid"),
});

// ── Section: FAQ ──────────────────────────────────────────────

export const FaqItem = z.object({
  question: z.string(),
  answer: z.string(),
});

export const FaqSectionSchema = z.object({
  ...baseSectionFields,
  type: z.literal("faq"),
  headline: z.string().optional(),
  items: z.array(FaqItem).min(1),
});

// ── Section: Contact ──────────────────────────────────────────

export const ContactField = z.object({
  name: z.string(),
  label: z.string(),
  type: z.enum(["text", "email", "tel", "textarea", "select"]),
  required: z.boolean().default(false),
  options: z.array(z.string()).optional().describe("For select fields"),
});

export const ContactSectionSchema = z.object({
  ...baseSectionFields,
  type: z.literal("contact"),
  headline: z.string().optional(),
  subtitle: z.string().optional(),
  fields: z.array(ContactField).min(1),
  submitLabel: z.string().default("Absenden"),
  showAddress: z.boolean().default(true),
  showPhone: z.boolean().default(true),
  showEmail: z.boolean().default(true),
  showHours: z.boolean().default(true),
});

// ── Section: Map ──────────────────────────────────────────────

export const MapSectionSchema = z.object({
  ...baseSectionFields,
  type: z.literal("map"),
  headline: z.string().optional(),
  address: z.string(),
  description: z.string().optional(),
});

// ── Section: Footer ───────────────────────────────────────────

export const FooterLink = z.object({
  label: z.string(),
  href: z.string(),
});

export const FooterColumn = z.object({
  title: z.string(),
  links: z.array(FooterLink),
});

export const FooterSectionSchema = z.object({
  ...baseSectionFields,
  type: z.literal("footer"),
  columns: z.array(FooterColumn).optional(),
  copyright: z.string().optional(),
  showSocials: z.boolean().default(true),
  showCredit: z.boolean().default(true),
});

// ── Section: CTA Banner ───────────────────────────────────────

export const CTABannerSectionSchema = z.object({
  ...baseSectionFields,
  type: z.literal("cta_banner"),
  headline: z.string(),
  subtitle: z.string().optional(),
  buttons: z.array(ButtonSchema).max(2),
});

// ── Discriminated Union ───────────────────────────────────────

export const SectionSchema = z.discriminatedUnion("type", [
  HeroSectionSchema,
  BenefitsSectionSchema,
  ServicesSectionSchema,
  GallerySectionSchema,
  PricingSectionSchema,
  TeamSectionSchema,
  TestimonialsSectionSchema,
  FaqSectionSchema,
  ContactSectionSchema,
  MapSectionSchema,
  FooterSectionSchema,
  CTABannerSectionSchema,
]);

export type Section = z.infer<typeof SectionSchema>;
export type SectionType = Section["type"];

export const SECTION_TYPES: SectionType[] = [
  "hero",
  "benefits",
  "services",
  "gallery",
  "pricing",
  "team",
  "testimonials",
  "faq",
  "contact",
  "map",
  "footer",
  "cta_banner",
];

export type HeroSection = z.infer<typeof HeroSectionSchema>;
export type BenefitsSection = z.infer<typeof BenefitsSectionSchema>;
export type ServicesSection = z.infer<typeof ServicesSectionSchema>;
export type GallerySection = z.infer<typeof GallerySectionSchema>;
export type PricingSection = z.infer<typeof PricingSectionSchema>;
export type TeamSection = z.infer<typeof TeamSectionSchema>;
export type TestimonialsSection = z.infer<typeof TestimonialsSectionSchema>;
export type FaqSection = z.infer<typeof FaqSectionSchema>;
export type ContactSection = z.infer<typeof ContactSectionSchema>;
export type MapSection = z.infer<typeof MapSectionSchema>;
export type FooterSection = z.infer<typeof FooterSectionSchema>;
export type CTABannerSection = z.infer<typeof CTABannerSectionSchema>;
