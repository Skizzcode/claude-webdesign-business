import {
  v4,
  type SiteProject,
  type StylePreset,
  type ScrapedData,
  SiteProjectSchema,
  getDesignForPreset,
  getPageLayoutForPreset,
} from "@website-engine/core";
import { createLLMAdapter, type LLMAdapter } from "../llm";

export interface GenerateOptions {
  scrapedData: ScrapedData;
  preset: StylePreset;
  language: "de" | "en";
  industry?: string;
  projectId?: string;
  onProgress?: (msg: string) => void;
}

function buildSystemPrompt(language: "de" | "en"): string {
  const lang = language === "de" ? "German" : "English";
  return `You are a professional web copywriter and website architect for small local businesses.
You create conversion-optimized website content in ${lang}.

Your output must be ONLY valid JSON — no markdown, no code fences, no explanation.
The JSON must conform exactly to the SiteProject schema provided.

Key principles:
- Write compelling, professional ${lang} copy
- Focus on conversion: clear CTAs, social proof, trust signals
- Use the business's actual information (name, phone, services, etc.)
- If information is missing, create plausible professional placeholder text
- Every page must have at least a hero section and footer
- The primary CTA should encourage phone calls or contact form submissions
- Keep text concise but persuasive
- For testimonials, create realistic placeholder quotes (clearly marked as examples)
- Use appropriate Lucide icon names for benefit/service icons (e.g., "Star", "Clock", "Shield", "Phone", "MapPin", "Heart", "Wrench", "Scissors")`;
}

function buildGenerationPrompt(options: GenerateOptions): string {
  const { scrapedData, preset, language, industry } = options;
  const design = getDesignForPreset(preset);

  // Get page layouts for this preset
  const pageSlugs = ["home", "services", "about", "contact"];
  const pageLayouts: Record<string, string[]> = {};
  for (const slug of pageSlugs) {
    pageLayouts[slug] = getPageLayoutForPreset(preset, slug);
  }

  const pageLabels =
    language === "de"
      ? { home: "Startseite", services: "Leistungen", about: "Über uns", contact: "Kontakt" }
      : { home: "Home", services: "Services", about: "About", contact: "Contact" };

  const navLabels =
    language === "de"
      ? { home: "Start", services: "Leistungen", about: "Über uns", contact: "Kontakt" }
      : { home: "Home", services: "Services", about: "About", contact: "Contact" };

  // Build available images list
  const imageRefs = (scrapedData as any).downloadedImages
    ? (scrapedData as any).downloadedImages.map((img: any) => img.localFile)
    : [];

  return `Generate a complete SiteProject JSON for this business.

## Business Data (scraped)
- Name: ${scrapedData.businessName || "Unknown Business"}
- Industry: ${industry || "General Services"}
- Phone: ${scrapedData.phone || "Not found"}
- Email: ${scrapedData.email || "Not found"}
- Address: ${scrapedData.address || "Not found"}
- Opening Hours: ${scrapedData.openingHours || "Not found"}
- Tagline: ${scrapedData.tagline || "None"}
- Social Links: ${JSON.stringify(scrapedData.socialLinks || [])}

## Scraped page content (use this for accurate service descriptions, about text, etc.):
${scrapedData.rawText?.slice(0, 6000) || "No text content available"}

## Available Images (use these in sections where appropriate):
${imageRefs.length > 0 ? imageRefs.join("\n") : "No images available — leave image fields empty or use placeholder references"}

## Design Preset: ${preset}
${JSON.stringify(design, null, 2)}

## Pages to Generate (with section order per preset):
${pageSlugs
  .map(
    (slug) =>
      `### ${pageLabels[slug as keyof typeof pageLabels]} (slug: "${slug === "home" ? "" : slug}")
- navLabel: "${navLabels[slug as keyof typeof navLabels]}"
- Sections in order: ${JSON.stringify(pageLayouts[slug])}`
  )
  .join("\n\n")}

## Required JSON Structure:
{
  "id": "${options.projectId || v4()}",
  "createdAt": "${new Date().toISOString()}",
  "updatedAt": "${new Date().toISOString()}",
  "sourceUrl": "${scrapedData.url}",
  "status": "preview",
  "meta": {
    "businessName": "...",
    "industry": "${industry || ""}",
    "language": "${language}",
    // ... other meta fields from scraped data
  },
  "design": ${JSON.stringify(design)},
  "pages": [
    // Each page: { id, slug, title, navLabel, showInNav, sections: [...] }
    // Each section must have: id (uuid), type, visible: true, paddingTop, paddingBottom, background
    // Plus type-specific fields matching the schema
  ],
  "assets": {
    "images": [
      // { id, filename, originalUrl, mimeType }
    ]
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
Language: ${language === "de" ? "German" : "English"}`;
}

export async function generateSiteProject(
  options: GenerateOptions
): Promise<SiteProject> {
  const { onProgress } = options;
  const adapter = createLLMAdapter();

  onProgress?.("Generating website content with AI...");

  const systemPrompt = buildSystemPrompt(options.language);
  const userPrompt = buildGenerationPrompt(options);

  onProgress?.(`Using ${adapter.name} to generate...`);

  const raw = await adapter.chat(
    [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt },
    ],
    { maxTokens: 8192, temperature: 0.7 }
  );

  onProgress?.("Parsing generated project...");

  // Clean up response — remove potential markdown fences
  let jsonStr = raw.trim();
  if (jsonStr.startsWith("```")) {
    jsonStr = jsonStr.replace(/^```(?:json)?\n?/, "").replace(/\n?```$/, "");
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(jsonStr);
  } catch (err) {
    // Try to extract JSON from response
    const match = jsonStr.match(/\{[\s\S]*\}/);
    if (match) {
      parsed = JSON.parse(match[0]);
    } else {
      throw new Error(`Failed to parse LLM response as JSON: ${(err as Error).message}\nRaw response (first 500 chars): ${jsonStr.slice(0, 500)}`);
    }
  }

  // Validate with Zod (lenient: strip unknown fields)
  const project = SiteProjectSchema.parse(parsed);

  onProgress?.("Website project generated successfully!");
  return project;
}

/**
 * AI action: rewrite a section's text content
 */
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

/**
 * AI action: generate FAQ items
 */
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

/**
 * AI action: generate a new page from a short prompt
 */
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
