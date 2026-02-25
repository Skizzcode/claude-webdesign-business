import {
  v4,
  type SiteProject,
  type StylePreset,
  type ScrapedData,
  type IndustryClassification,
  SiteProjectSchema,
  getDesignForPreset,
  getIndustryProfile,
  selectBlueprint,
  type IndustryProfile,
  type TemplateBlueprint,
  type IndustryId,
} from "@website-engine/core";
import { createLLMAdapter } from "../llm";
import { classifyIndustry } from "./industry-classifier";

export interface GenerateOptions {
  scrapedData: ScrapedData;
  preset: StylePreset;
  language: "de" | "en";
  industry?: string;
  projectId?: string;
  seed?: string;
  onProgress?: (msg: string) => void;
}

// ── System Prompt (industry-aware) ────────────────────────

function buildSystemPrompt(
  language: "de" | "en",
  profile: IndustryProfile
): string {
  const lang = language === "de" ? "German" : "English";
  const ctaSet = profile.ctaSets[0];
  const ctaLabel = ctaSet
    ? ctaSet.primary.label[language === "de" ? "de" : "en"]
    : "Kontakt";

  return `You are a professional web copywriter and website architect for small local businesses.
You create conversion-optimized website content in ${lang}.

Your output must be ONLY valid JSON — no markdown, no code fences, no explanation.
The JSON must conform exactly to the SiteProject schema provided.

## Industry: ${profile.label.en}
## Tone of Voice
${profile.copyFramework.toneOfVoice}

## Key Principles
- Write compelling, professional ${lang} copy tailored to the ${profile.label.en} industry
- Focus on conversion: clear CTAs, social proof, trust signals
- Use the business's actual information (name, phone, services, etc.)
- If information is missing, create plausible professional placeholder text
- Every page must have at least a hero section and footer
- The primary CTA should encourage: "${ctaLabel}"
- Keep text concise but persuasive
- For testimonials, create realistic placeholder quotes
- NEVER fabricate real reviews, certifications, or specific credentials
- Use trust signals as placeholder templates (e.g. "[Zertifizierung einfügen]")
- Use appropriate Lucide icon names (Star, Clock, Shield, Phone, MapPin, Heart, Wrench, Scissors, etc.)`;
}

// ── User Prompt (industry-enriched) ───────────────────────

function buildGenerationPrompt(
  options: GenerateOptions,
  profile: IndustryProfile,
  blueprint: TemplateBlueprint,
  classification: IndustryClassification
): string {
  const { scrapedData, preset, language } = options;
  const design = getDesignForPreset(preset);
  const lang = language === "de" ? "de" : "en";

  // CTA instructions from profile
  const ctaSet = profile.ctaSets[0];
  const ctaInstructions = ctaSet
    ? `### CTA Strategy
- Primary CTA: "${ctaSet.primary.label[lang]}" (href: ${ctaSet.primary.href})
- Secondary CTA: "${ctaSet.secondary.label[lang]}" (href: ${ctaSet.secondary.href})
- CTA Microcopy: "${ctaSet.microcopy[lang]}"`
    : "";

  // Trust signals
  const trustSignals = profile.trustSignals
    .map((t) => `- ${t.label[lang]} (icon: ${t.icon || "Shield"}, placeholder: "${t.placeholder}")`)
    .join("\n");

  // Benefit themes
  const benefitThemes = profile.copyFramework.benefitThemes
    .map((b) => b[lang])
    .join(", ");

  // Headline inspirations
  const headlinePatterns = profile.copyFramework.headlinePatterns
    .map((h) => h[lang])
    .join(" | ");

  // FAQ templates
  const faqTemplates = profile.copyFramework.faqTemplates
    .map((f) => `Q: ${f.question[lang]} / A: ${f.answer[lang]}`)
    .join("\n");

  // Design hints
  const designHintText = `Palette strategy: ${profile.designHints.paletteStrategy}
${
  profile.designHints.typographyHints?.[preset]
    ? `Suggested fonts: heading="${profile.designHints.typographyHints[preset]!.heading}", body="${profile.designHints.typographyHints[preset]!.body}"`
    : ""
}
${profile.designHints.radiusRange ? `Border radius: ${profile.designHints.radiusRange[0]}-${profile.designHints.radiusRange[1]}px` : ""}`;

  // Blueprint pages with section instructions
  const pageInstructions = blueprint.pages
    .map((page) => {
      const sectionList = page.sections
        .map((s) => {
          let line = `  - ${s.type}`;
          if (s.variant) line += ` (layout: "${s.variant}")`;
          if (s.instructions) line += ` — ${s.instructions}`;
          return line;
        })
        .join("\n");

      return `### ${page.title[lang]} (slug: "${page.slug}")
- navLabel: "${page.navLabel[lang]}"
- Sections:\n${sectionList}`;
    })
    .join("\n\n");

  // Available images (scraped)
  const imageRefs = (scrapedData as any).downloadedImages
    ? (scrapedData as any).downloadedImages.map((img: any) => img.localFile)
    : [];

  return `Generate a complete SiteProject JSON for this business.

## Business Data (scraped)
- Name: ${scrapedData.businessName || "Unknown Business"}
- Detected Industry: ${profile.label[lang]} (confidence: ${Math.round(classification.confidence * 100)}%)
- Phone: ${scrapedData.phone || "Not found"}
- Email: ${scrapedData.email || "Not found"}
- Address: ${scrapedData.address || "Not found"}
- Opening Hours: ${scrapedData.openingHours || "Not found"}
- Tagline: ${scrapedData.tagline || "None"}
- Social Links: ${JSON.stringify(scrapedData.socialLinks || [])}

## Scraped page content (use for accurate service descriptions, about text, etc.):
${scrapedData.rawText?.slice(0, 6000) || "No text content available"}

## Available Images:
${imageRefs.length > 0 ? imageRefs.join("\n") : "No images available — leave image fields empty or use placeholder references"}

## Industry Intelligence

${ctaInstructions}

### Trust Signals (use as benefit items or standalone badges)
${trustSignals}

### Benefit Themes to Emphasize
${benefitThemes}

### Headline Inspirations (adapt to this business, don't copy verbatim)
${headlinePatterns}

### FAQ Templates (adapt to this specific business)
${faqTemplates}

## Design Configuration
### Preset: ${preset}
${JSON.stringify(design, null, 2)}

### Industry Design Hints
${designHintText}

## Pages to Generate (blueprint: "${blueprint.name}"):
${pageInstructions}

## Required JSON Structure:
{
  "id": "${options.projectId || v4()}",
  "createdAt": "${new Date().toISOString()}",
  "updatedAt": "${new Date().toISOString()}",
  "sourceUrl": "${scrapedData.url}",
  "status": "preview",
  "meta": {
    "businessName": "...",
    "industry": "${profile.id}",
    "language": "${language}",
    // ... other meta fields from scraped data (phone, email, address, openingHours, socialLinks)
  },
  "design": ${JSON.stringify(design)},
  "pages": [
    // Each page from the blueprint above
    // Each section must have: id (uuid), type, visible: true, paddingTop, paddingBottom, background
    // Plus type-specific fields matching the schema
  ],
  "assets": {
    "images": [],
    "scrapedImagesAllowed": false
  }
}

## Section Type Schemas (follow exactly):
- hero: { headline, subheadline?, buttons: [{label, href, variant}], image?, layout: "centered"|"split_left"|"split_right"|"bg_image" }
- benefits: { headline?, subtitle?, items: [{icon?, title, description}], columns: "2"|"3"|"4" }
- services: { headline?, subtitle?, items: [{icon?, title, description, image?, price?, button?}], layout: "grid"|"list"|"cards" }
- gallery: { headline?, images: [{src, alt}], columns: "2"|"3"|"4" }
- pricing: { headline?, subtitle?, tiers: [{name, price, period?, features: [string], button?, highlighted}] }
- team: { headline?, members: [{name, role, bio?, image?}] }
- testimonials: { headline?, items: [{quote, author, role?, image?, rating?}], layout: "carousel"|"grid"|"stacked" }
- faq: { headline?, items: [{question, answer}] }
- contact: { headline?, subtitle?, fields: [{name, label, type: "text"|"email"|"tel"|"textarea"|"select", required}], submitLabel, showAddress, showPhone, showEmail, showHours }
- map: { headline?, address, description? }
- footer: { columns?: [{title, links: [{label, href}]}], copyright?, showSocials, showCredit }
- cta_banner: { headline, subtitle?, buttons: [{label, href, variant}] }

IMPORTANT: Output ONLY the JSON object. No markdown code fences. No explanation.
Use real UUIDs (format: xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx) for all id fields.
Language: ${language === "de" ? "German" : "English"}
Do NOT fabricate real reviews or certifications. Use placeholder templates.
Do NOT copy original website text verbatim — always rewrite professionally.`;
}

// ── Sanitizer ─────────────────────────────────────────────

const VALID_PADDINGS = new Set(["none", "sm", "md", "lg"]);
const VALID_BACKGROUNDS = new Set(["default", "surface", "primary", "dark"]);

/** Fix image fields: LLM often returns a string instead of {src, alt} */
function fixImageField(obj: any, key: string): void {
  if (obj[key] && typeof obj[key] === "string") {
    obj[key] = { src: obj[key], alt: "" };
  }
}

function sanitizeLLMOutput(data: any): void {
  if (!data?.pages) return;
  for (const page of data.pages) {
    if (!page?.sections) continue;
    for (const section of page.sections) {
      if (!VALID_PADDINGS.has(section.paddingTop)) section.paddingTop = "md";
      if (!VALID_PADDINGS.has(section.paddingBottom)) section.paddingBottom = "md";
      if (!VALID_BACKGROUNDS.has(section.background)) section.background = "default";
      if (section.visible === undefined) section.visible = true;
      if (section.type === "cta_banner" && !section.buttons) {
        section.buttons = [{ label: "Kontakt", href: "#contact", variant: "primary" }];
      }
      if (section.type === "hero" && !section.buttons) {
        section.buttons = [];
      }

      // Fix image fields (LLM often returns string instead of {src, alt})
      fixImageField(section, "image");

      // Fix image fields inside arrays (items, members, images, tiers)
      const arrayKeys = ["items", "members", "images", "tiers"];
      for (const arrKey of arrayKeys) {
        if (Array.isArray(section[arrKey])) {
          for (const item of section[arrKey]) {
            if (item && typeof item === "object") {
              fixImageField(item, "image");
              // Gallery images: {src, alt} stored directly
              if (arrKey === "images" && typeof item.src === "undefined" && typeof item === "string") {
                // Handle case where gallery images array contains plain strings
                const idx = section[arrKey].indexOf(item);
                section[arrKey][idx] = { src: item, alt: "" };
              }
            }
          }
        }
      }
    }
  }
  // Ensure assets has scrapedImagesAllowed
  if (data.assets && data.assets.scrapedImagesAllowed === undefined) {
    data.assets.scrapedImagesAllowed = false;
  }
  // Ensure assets exists
  if (!data.assets) {
    data.assets = { images: [], scrapedImagesAllowed: false };
  }
  if (!data.assets.images) {
    data.assets.images = [];
  }
}

// ── Main generate function ────────────────────────────────

export async function generateSiteProject(
  options: GenerateOptions
): Promise<SiteProject> {
  const { onProgress, scrapedData, preset, industry, projectId } = options;
  const adapter = createLLMAdapter();

  // Step 1: Classify industry
  onProgress?.("Classifying industry...");
  const classification = await classifyIndustry(scrapedData, industry);

  // Step 2: Load profile
  const industryId = classification.industryId as IndustryId;
  const profile = getIndustryProfile(industryId);
  onProgress?.(
    `Industry detected: ${profile.label.en} (${Math.round(classification.confidence * 100)}%)`
  );

  // Step 3: Select blueprint
  const seed = options.seed || projectId || v4();
  const blueprint = selectBlueprint(industryId, preset, seed);
  onProgress?.(`Using blueprint: ${blueprint.name}`);

  // Step 4: Build prompts with industry intelligence
  const systemPrompt = buildSystemPrompt(options.language, profile);
  const userPrompt = buildGenerationPrompt(options, profile, blueprint, classification);

  // Step 5: Call LLM
  onProgress?.(`Generating with ${adapter.name}...`);
  const raw = await adapter.chat(
    [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt },
    ],
    { maxTokens: 12000, temperature: 0.7 }
  );

  // Step 6: Parse response
  onProgress?.("Parsing generated project...");
  let jsonStr = raw.trim();
  if (jsonStr.startsWith("```")) {
    jsonStr = jsonStr.replace(/^```(?:json)?\n?/, "").replace(/\n?```$/, "");
  }

  let parsed: any;
  try {
    parsed = JSON.parse(jsonStr);
  } catch (err) {
    const match = jsonStr.match(/\{[\s\S]*\}/);
    if (match) {
      parsed = JSON.parse(match[0]);
    } else {
      throw new Error(
        `Failed to parse LLM response as JSON: ${(err as Error).message}\nRaw response (first 500 chars): ${jsonStr.slice(0, 500)}`
      );
    }
  }

  // Step 7: Sanitize + Validate
  sanitizeLLMOutput(parsed);

  let project: SiteProject;
  try {
    project = SiteProjectSchema.parse(parsed);
  } catch (zodErr: any) {
    const issues = zodErr?.issues
      ? zodErr.issues.map((i: any) => `${i.path.join(".")}: ${i.message}`).join("\n")
      : String(zodErr);
    console.error("[generate] Zod validation failed:\n", issues);
    throw new Error(`Generated JSON failed schema validation:\n${issues}`);
  }

  // Step 8: Attach classification to project meta
  project.meta.industryClassification = classification as any;

  onProgress?.("Website project generated successfully!");
  return project;
}

// ── AI Actions (unchanged) ────────────────────────────────

export async function aiRewriteSection(
  section: Record<string, unknown>,
  style: "shorter" | "longer" | "formal" | "friendly",
  language: "de" | "en"
): Promise<Record<string, unknown>> {
  const adapter = createLLMAdapter();
  const lang = language === "de" ? "German" : "English";

  const response = await adapter.chat([
    {
      role: "system",
      content: `You rewrite website section content. Output ONLY valid JSON matching the input structure. Language: ${lang}. Style: ${style}.`,
    },
    {
      role: "user",
      content: `Rewrite the text content in this section to be ${style}. Keep the same structure and field names. Only modify text content (headlines, descriptions, etc.), not IDs, types, or layout settings.\n\nInput:\n${JSON.stringify(section, null, 2)}`,
    },
  ]);

  let jsonStr = response.trim();
  if (jsonStr.startsWith("```")) {
    jsonStr = jsonStr.replace(/^```(?:json)?\n?/, "").replace(/\n?```$/, "");
  }
  return JSON.parse(jsonStr);
}

export async function aiGenerateFaqs(
  businessName: string,
  industry: string,
  language: "de" | "en",
  count = 6
): Promise<{ question: string; answer: string }[]> {
  const adapter = createLLMAdapter();
  const lang = language === "de" ? "German" : "English";

  const response = await adapter.chat([
    {
      role: "system",
      content: `Generate FAQ items for a local business website. Output ONLY a JSON array. Language: ${lang}.`,
    },
    {
      role: "user",
      content: `Generate ${count} FAQs for "${businessName}" (${industry}). Return as JSON array: [{"question": "...", "answer": "..."}]`,
    },
  ]);

  let jsonStr = response.trim();
  if (jsonStr.startsWith("```")) {
    jsonStr = jsonStr.replace(/^```(?:json)?\n?/, "").replace(/\n?```$/, "");
  }
  return JSON.parse(jsonStr);
}

export async function aiGeneratePage(
  prompt: string,
  businessName: string,
  language: "de" | "en",
  preset: StylePreset
): Promise<{ title: string; navLabel: string; slug: string; sections: unknown[] }> {
  const adapter = createLLMAdapter();
  const lang = language === "de" ? "German" : "English";

  const response = await adapter.chat([
    {
      role: "system",
      content: `You create website pages for local businesses. Output ONLY valid JSON. Language: ${lang}. Follow the section schemas exactly.`,
    },
    {
      role: "user",
      content: `Create a new page for "${businessName}".
User request: "${prompt}"
Style preset: ${preset}

Return JSON: { "title": "...", "navLabel": "...", "slug": "...", "sections": [...] }
Each section needs: id (uuid), type, visible: true, paddingTop: "md", paddingBottom: "md", background: "default", and type-specific fields.
Available section types: hero, benefits, services, gallery, pricing, team, testimonials, faq, contact, map, footer, cta_banner`,
    },
  ]);

  let jsonStr = response.trim();
  if (jsonStr.startsWith("```")) {
    jsonStr = jsonStr.replace(/^```(?:json)?\n?/, "").replace(/\n?```$/, "");
  }
  return JSON.parse(jsonStr);
}
