// ── Schemas ───────────────────────────────────────────────
export * from "./schemas/design";
export * from "./schemas/meta";
export * from "./schemas/sections";
export * from "./schemas/project";

// ── Presets ───────────────────────────────────────────────
export * from "./presets/index";

// ── Section Registry ─────────────────────────────────────
export { createDefaultSection, SECTION_LABELS } from "./section-registry";

// ── Industry Intelligence ───────────────────────────────
export * from "./industry/index";

// ── Utils ────────────────────────────────────────────────
export { v4, slugify, truncate, safeJsonParse, INDUSTRIES } from "./utils";
