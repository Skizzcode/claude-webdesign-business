import { z } from "zod";
import { INDUSTRY_IDS } from "../industry/types";

export const CTASchema = z.object({
  label: z.string(),
  href: z.string(),
});
export type CTA = z.infer<typeof CTASchema>;

export const IndustryIdEnum = z.enum(INDUSTRY_IDS as unknown as [string, ...string[]]);

export const IndustryClassificationSchema = z.object({
  industryId: IndustryIdEnum,
  confidence: z.number().min(0).max(1),
  topCandidates: z
    .array(
      z.object({
        id: IndustryIdEnum,
        confidence: z.number(),
        reason: z.string(),
      })
    )
    .optional(),
});
export type IndustryClassification = z.infer<typeof IndustryClassificationSchema>;

export const SocialLinkSchema = z.object({
  platform: z.enum([
    "facebook",
    "instagram",
    "twitter",
    "linkedin",
    "youtube",
    "tiktok",
    "xing",
    "yelp",
    "google",
  ]),
  url: z.string().url(),
});
export type SocialLink = z.infer<typeof SocialLinkSchema>;

export const MetaSchema = z.object({
  businessName: z.string(),
  industry: z.string().optional(),
  industryClassification: IndustryClassificationSchema.optional(),
  location: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().optional(),
  address: z.string().optional(),
  openingHours: z.string().optional(),
  socialLinks: z.array(SocialLinkSchema).optional(),
  primaryCTA: CTASchema.optional(),
  language: z.enum(["de", "en"]).default("de"),
  creditBrand: z
    .object({
      name: z.string(),
      url: z.string().url().optional(),
    })
    .optional(),
});
export type Meta = z.infer<typeof MetaSchema>;
