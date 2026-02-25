import { z } from "zod";

export const StylePreset = z.enum(["modern_clean", "bold", "elegant"]);
export type StylePreset = z.infer<typeof StylePreset>;

export const PaletteSchema = z.object({
  primary: z.string().describe("Primary brand color (hex)"),
  secondary: z.string().describe("Secondary accent color (hex)"),
  accent: z.string().optional().describe("Optional third accent (hex)"),
  background: z.string().describe("Page background color"),
  surface: z.string().describe("Card/section background color"),
  text: z.string().describe("Primary text color"),
  textMuted: z.string().describe("Secondary/muted text color"),
});
export type Palette = z.infer<typeof PaletteSchema>;

export const TypographySchema = z.object({
  headingFont: z.string().describe("Google Fonts family for headings"),
  bodyFont: z.string().describe("Google Fonts family for body text"),
});
export type Typography = z.infer<typeof TypographySchema>;

export const SpacingPreset = z.enum(["compact", "normal", "airy"]);
export type SpacingPreset = z.infer<typeof SpacingPreset>;

export const DesignSchema = z.object({
  stylePreset: StylePreset,
  palette: PaletteSchema,
  typography: TypographySchema,
  radius: z.number().min(0).max(24).describe("Border radius in px"),
  spacing: SpacingPreset,
});
export type Design = z.infer<typeof DesignSchema>;
