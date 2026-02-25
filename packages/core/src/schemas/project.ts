import { z } from "zod";
import { DesignSchema } from "./design";
import { MetaSchema } from "./meta";
import { SectionSchema } from "./sections";

export const AssetSchema = z.object({
  id: z.string(),
  filename: z.string(),
  originalUrl: z.string().optional(),
  mimeType: z.string().optional(),
  width: z.number().optional(),
  height: z.number().optional(),
});
export type Asset = z.infer<typeof AssetSchema>;

export const PageSchema = z.object({
  id: z.string(),
  slug: z.string(),
  title: z.string(),
  navLabel: z.string(),
  showInNav: z.boolean().default(true),
  sections: z.array(SectionSchema),
});
export type Page = z.infer<typeof PageSchema>;

export const SiteProjectSchema = z.object({
  id: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  sourceUrl: z.string().url().optional(),
  status: z.enum(["draft", "preview", "finalized", "exported"]).default("draft"),
  meta: MetaSchema,
  design: DesignSchema,
  pages: z.array(PageSchema).min(1),
  assets: z.object({
    images: z.array(AssetSchema),
    scrapedImagesAllowed: z.boolean().default(false),
  }),
});
export type SiteProject = z.infer<typeof SiteProjectSchema>;

export const ScrapedDataSchema = z.object({
  url: z.string().url(),
  scrapedAt: z.string(),
  businessName: z.string().optional(),
  tagline: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().optional(),
  address: z.string().optional(),
  openingHours: z.string().optional(),
  socialLinks: z
    .array(z.object({ platform: z.string(), url: z.string() }))
    .optional(),
  navLinks: z
    .array(z.object({ label: z.string(), href: z.string() }))
    .optional(),
  pages: z
    .array(
      z.object({
        url: z.string(),
        title: z.string().optional(),
        headings: z.array(z.string()).optional(),
        paragraphs: z.array(z.string()).optional(),
        images: z
          .array(z.object({ src: z.string(), alt: z.string().optional() }))
          .optional(),
      })
    )
    .optional(),
  allImages: z
    .array(z.object({ src: z.string(), alt: z.string().optional() }))
    .optional(),
  rawText: z.string().optional(),
});
export type ScrapedData = z.infer<typeof ScrapedDataSchema>;
