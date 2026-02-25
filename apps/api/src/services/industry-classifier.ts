import type { IndustryId, IndustryClassification } from "@website-engine/core";
import type { ScrapedData } from "@website-engine/core";
import { INDUSTRY_IDS, resolveLegacyIndustry } from "@website-engine/core";
import { createLLMAdapter } from "../llm/index";

// ── Keyword banks per industry (DE + EN) ──────────────────

const KEYWORD_BANKS: Partial<Record<IndustryId, string[]>> = {
  healthcare_dentist: [
    "zahnarzt", "zahnärztin", "dental", "zahn", "implant", "prophylaxe",
    "bleaching", "dentist", "kieferorthop", "zahnmedizin", "zahnpflege",
    "zahnreinigung", "karies", "wurzelbehandlung", "prothes",
  ],
  healthcare_doctor: [
    "arztpraxis", "hausarzt", "facharzt", "allgemeinmedizin", "sprechstunde",
    "medizin", "patient", "diagnos", "untersuchung", "impf", "vorsorge",
    "internist", "praxis", "gesundheit",
  ],
  healthcare_physio: [
    "physiotherap", "krankengymnastik", "manuelle therapie", "massage",
    "rehabilitation", "bewegung", "mobilit", "osteopath", "reha",
  ],
  food_restaurant: [
    "restaurant", "speisekarte", "menü", "küche", "reserv", "gastronomie",
    "essen", "menu", "bistro", "trattoria", "dining", "koch", "gericht",
    "vorspeise", "hauptgericht", "dessert", "mittag", "abend",
  ],
  food_bakery: [
    "bäckerei", "konditorei", "brot", "brötchen", "kuchen", "torte",
    "gebäck", "backwaren", "bakery", "croissant", "baguette",
  ],
  beauty_salon: [
    "friseur", "frisör", "salon", "kosmetik", "hairstyl", "beauty",
    "styling", "schnitt", "haar", "coloration", "färb", "maniküre",
    "pediküre", "nail", "wimpern", "make-up", "wellness",
  ],
  fitness_gym: [
    "fitness", "gym", "training", "workout", "mitgliedschaft", "membership",
    "studio", "crossfit", "krafttraining", "cardio", "kursplan",
    "personal train", "abnehm", "muskelaufbau",
  ],
  home_services_plumbing: [
    "klempner", "sanitär", "plumber", "heizung", "rohr", "notdienst",
    "installation", "wasserhahn", "abfluss", "rohrreinigung", "bad",
    "dusche", "therme", "warmwasser",
  ],
  home_services_electrical: [
    "elektriker", "elektro", "strom", "e-check", "installation",
    "beleuchtung", "schalt", "sicherungskasten", "smart home",
    "photovoltaik", "solar", "elektrotechnik",
  ],
  home_services_cleaning: [
    "reinigung", "cleaning", "sauber", "putzen", "gebäudereinigung",
    "glasreinigung", "büroreinigung", "unterhaltsreinigung", "hygiene",
  ],
  home_services_construction: [
    "bau", "construction", "renovier", "umbau", "neubau", "sanierung",
    "trockenbau", "maurer", "dach", "fassade", "estrich", "bauunternehmen",
  ],
  professional_law: [
    "rechtsanwalt", "anwalt", "kanzlei", "lawyer", "recht", "mandat",
    "rechtsberatung", "fachanwalt", "arbeitsrecht", "familienrecht",
    "mietrecht", "strafrecht", "verkehrsrecht", "anwaltskanzlei",
  ],
  professional_tax: [
    "steuerberater", "steuerkanzlei", "steuer", "buchhaltung",
    "jahresabschluss", "lohnabrechnung", "finanzamt", "tax",
    "steuererklärung", "bilanz",
  ],
  real_estate: [
    "immobilien", "makler", "real estate", "wohnung", "haus",
    "miete", "kauf", "verkauf", "grundstück", "eigentum",
    "vermietung", "immobilienbewertung", "expose",
  ],
  education_daycare: [
    "kita", "kindergarten", "kindertagesstätte", "betreuung",
    "krippe", "hort", "pädagog", "erzieh", "daycare", "vorschul",
    "spielgruppe", "kinderbetreuung",
  ],
  auto_repair: [
    "kfz", "werkstatt", "auto", "fahrzeug", "reparatur", "inspektion",
    "tüv", "ölwechsel", "bremsen", "reifen", "auspuff", "karosserie",
    "lackier", "car repair", "mechanic",
  ],
};

// ── Keyword-based classification ──────────────────────────

export function classifyFromKeywords(
  scrapedData: ScrapedData
): IndustryClassification {
  const text = [
    scrapedData.businessName,
    scrapedData.tagline,
    scrapedData.rawText?.slice(0, 4000),
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  const scores: { id: IndustryId; score: number }[] = [];

  for (const [id, keywords] of Object.entries(KEYWORD_BANKS)) {
    if (!keywords) continue;
    let score = 0;
    for (const kw of keywords) {
      const regex = new RegExp(kw, "gi");
      const matches = text.match(regex);
      if (matches) score += matches.length;
    }
    if (score > 0) scores.push({ id: id as IndustryId, score });
  }

  scores.sort((a, b) => b.score - a.score);
  const total = scores.reduce((s, x) => s + x.score, 0) || 1;

  if (scores.length === 0) {
    return { industryId: "other", confidence: 0, topCandidates: [] };
  }

  const topCandidates = scores.slice(0, 3).map((s) => ({
    id: s.id,
    confidence: Math.round((s.score / total) * 100) / 100,
    reason: `${s.score} keyword matches`,
  }));

  // Normalize confidence: 10+ keyword matches = high confidence
  const confidence = Math.min(scores[0].score / 10, 1);

  return {
    industryId: scores[0].id,
    confidence: Math.round(confidence * 100) / 100,
    topCandidates,
  };
}

// ── LLM-based classification (fallback) ───────────────────

export async function classifyWithLLM(
  scrapedData: ScrapedData
): Promise<IndustryClassification> {
  const adapter = createLLMAdapter();
  const validIds = INDUSTRY_IDS.filter((id) => id !== "other").join(", ");

  const response = await adapter.chat(
    [
      {
        role: "system",
        content: `You classify German small businesses into industry categories.
Output ONLY valid JSON, no markdown fences.
Available categories: ${validIds}, other`,
      },
      {
        role: "user",
        content: `Classify this business:
Name: ${scrapedData.businessName || "Unknown"}
Tagline: ${scrapedData.tagline || "None"}
Text excerpt: ${scrapedData.rawText?.slice(0, 2000) || "No text"}

Return JSON: {"industryId":"...","confidence":0.0-1.0,"topCandidates":[{"id":"...","confidence":0.0-1.0,"reason":"..."}]}`,
      },
    ],
    { maxTokens: 300, temperature: 0 }
  );

  let jsonStr = response.trim();
  // Strip markdown fences if present
  if (jsonStr.startsWith("```")) {
    jsonStr = jsonStr.replace(/^```(?:json)?\n?/, "").replace(/\n?```$/, "");
  }

  try {
    const parsed = JSON.parse(jsonStr);
    return {
      industryId: parsed.industryId || "other",
      confidence: typeof parsed.confidence === "number" ? parsed.confidence : 0.5,
      topCandidates: Array.isArray(parsed.topCandidates) ? parsed.topCandidates : [],
    };
  } catch {
    return { industryId: "other", confidence: 0, topCandidates: [] };
  }
}

// ── Main classification function ──────────────────────────

/**
 * Classify industry from scraped data.
 * Priority: explicit user hint > keyword match (if confident) > LLM fallback
 */
export async function classifyIndustry(
  scrapedData: ScrapedData,
  userHint?: string
): Promise<IndustryClassification> {
  // 1. User explicitly selected an industry
  if (userHint && userHint !== "" && userHint !== "auto") {
    // Check if it's a new-style IndustryId
    if (INDUSTRY_IDS.includes(userHint as IndustryId)) {
      return {
        industryId: userHint as IndustryId,
        confidence: 1,
        topCandidates: [],
      };
    }
    // Try legacy key resolution
    const resolved = resolveLegacyIndustry(userHint);
    return {
      industryId: resolved,
      confidence: 1,
      topCandidates: [],
    };
  }

  // 2. Try keyword-based classification
  const keywordResult = classifyFromKeywords(scrapedData);
  if (keywordResult.confidence >= 0.5) {
    return keywordResult;
  }

  // 3. Low confidence — use LLM for better classification
  try {
    const llmResult = await classifyWithLLM(scrapedData);
    // If LLM is also uncertain, return keyword result as it's cheaper
    if (llmResult.confidence > keywordResult.confidence) {
      return llmResult;
    }
    return keywordResult;
  } catch {
    // LLM failed — return keyword result as fallback
    return keywordResult;
  }
}
