import type { Design } from "../schemas/design";
import type { StylePreset } from "../schemas/design";
import type { SectionType } from "../schemas/sections";
import { modernCleanDesign, modernCleanPageLayouts } from "./modern-clean";
import { boldDesign, boldPageLayouts } from "./bold";
import { elegantDesign, elegantPageLayouts } from "./elegant";

export const PRESET_DESIGNS: Record<StylePreset, Design> = {
  modern_clean: modernCleanDesign,
  bold: boldDesign,
  elegant: elegantDesign,
};

export const PRESET_LAYOUTS: Record<StylePreset, Record<string, SectionType[]>> = {
  modern_clean: modernCleanPageLayouts,
  bold: boldPageLayouts,
  elegant: elegantPageLayouts,
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

export { modernCleanDesign, boldDesign, elegantDesign };
