import type { ScrapedData } from "@website-engine/core";

export type AuditSeverity = "critical" | "major" | "minor";
export type AuditCategory = "conversion" | "trust" | "ux" | "seo" | "completeness";

export interface AuditIssue {
  id: string;
  title: string;
  description: string;
  severity: AuditSeverity;
  category: AuditCategory;
  fixedIn: string;
}

export interface AuditReport {
  score: number;
  newScore: number;
  issues: AuditIssue[];
  strengths: string[];
  generatedAt: string;
}

// ── Helpers ───────────────────────────────────────────────

function containsKeyword(text: string | undefined, keywords: string[]): boolean {
  if (!text) return false;
  const lower = text.toLowerCase();
  return keywords.some((k) => lower.includes(k.toLowerCase()));
}

function getRawText(data: ScrapedData): string {
  const parts: string[] = [];
  if (data.rawText) parts.push(data.rawText);
  if (data.pages) {
    for (const p of data.pages) {
      if (p.headings) parts.push(...p.headings);
      if (p.paragraphs) parts.push(...p.paragraphs);
    }
  }
  return parts.join(" ").toLowerCase();
}

// ── 15 Audit Criteria ─────────────────────────────────────

interface Criterion {
  id: string;
  title: string;
  description: string;
  severity: AuditSeverity;
  category: AuditCategory;
  fixedIn: string;
  strengthLabel: string; // shown when criterion passes
  check: (data: ScrapedData, rawText: string) => boolean;
}

const CRITERIA: Criterion[] = [
  {
    id: "cta_above_fold",
    title: "Kein primärer Call-to-Action above the fold",
    description: "Besucher wissen sofort nicht, was sie tun sollen. Jede Sekunde ohne klaren CTA kostet potenzielle Kunden.",
    severity: "critical",
    category: "conversion",
    fixedIn: "Im neuen Design: Prominenter CTA-Button im Hero-Bereich, sofort sichtbar ohne Scrollen.",
    strengthLabel: "Klarer Call-to-Action vorhanden",
    check: (data, raw) =>
      containsKeyword(raw, [
        "jetzt", "buchen", "anrufen", "termin", "kontakt", "anfragen",
        "kaufen", "bestellen", "book", "call", "contact", "get started",
      ]),
  },
  {
    id: "phone_visible",
    title: "Telefonnummer nicht sichtbar im Header/Hero",
    description: "Lokale Kunden wollen anrufen. Eine fehlende Telefonnummer im Sichtfeld ist eine verpasste Conversion.",
    severity: "critical",
    category: "conversion",
    fixedIn: "Im neuen Design: Telefonnummer prominent in Navigation und Hero-Bereich integriert.",
    strengthLabel: "Telefonnummer gut sichtbar",
    check: (data) => !!data.phone && data.phone.trim().length > 0,
  },
  {
    id: "opening_hours",
    title: "Keine Öffnungszeiten auffindbar",
    description: "Kunden müssen wissen wann sie Sie erreichen können. Fehlende Öffnungszeiten führen zu Unsicherheit.",
    severity: "major",
    category: "conversion",
    fixedIn: "Im neuen Design: Öffnungszeiten in der Kontaktsektion und im Footer prominent angezeigt.",
    strengthLabel: "Öffnungszeiten vorhanden",
    check: (data) => !!data.openingHours && data.openingHours.trim().length > 0,
  },
  {
    id: "testimonials",
    title: "Kein Testimonials- oder Bewertungsbereich",
    description: "93% der Verbraucher lesen Bewertungen vor dem Kauf. Ohne Testimonials fehlt sozialer Beweis.",
    severity: "major",
    category: "trust",
    fixedIn: "Im neuen Design: Dedizierter Bewertungsbereich mit echten Kundenstimmen und Sternebewertungen.",
    strengthLabel: "Kundenbewertungen vorhanden",
    check: (_, raw) =>
      containsKeyword(raw, [
        "bewertung", "testimonial", "rezension", "kundenstimme", "erfahrung",
        "review", "⭐", "sterne", "zufrieden", "empfehlung",
      ]),
  },
  {
    id: "trust_signals",
    title: "Keine Zertifizierungen oder Trust-Signale sichtbar",
    description: "Zertifikate und Auszeichnungen bauen Vertrauen auf. Ohne sie wirkt die Website weniger professionell.",
    severity: "minor",
    category: "trust",
    fixedIn: "Im neuen Design: Trust-Badge-Leiste mit Zertifizierungen, Mitgliedschaften und Auszeichnungen.",
    strengthLabel: "Trust-Signale / Zertifizierungen vorhanden",
    check: (_, raw) =>
      containsKeyword(raw, [
        "zertifiziert", "geprüft", "auszeichnung", "mitglied", "partner",
        "tüv", "iso", "certified", "award", "meisterbetrieb", "qualität",
      ]),
  },
  {
    id: "impressum",
    title: "Impressum nicht leicht auffindbar (§5 TMG)",
    description: "Rechtspflicht in Deutschland: Das Impressum muss in max. 2 Klicks erreichbar sein. Fehlt es oder ist es versteckt, drohen Abmahnungen.",
    severity: "major",
    category: "trust",
    fixedIn: "Im neuen Design: Impressum-Link fest im Footer verankert, §5 TMG-konform.",
    strengthLabel: "Impressum vorhanden",
    check: (data, raw) => {
      if (containsKeyword(raw, ["impressum", "imprint", "anbieterkennzeichnung"])) return true;
      if (data.navLinks?.some((l) => l.href?.includes("impressum") || l.label?.toLowerCase().includes("impressum"))) return true;
      return false;
    },
  },
  {
    id: "address_maps",
    title: "Keine Adresse oder Kartenansicht prominent",
    description: "Lokale Kunden suchen nach Ihrem Standort. Eine fehlende Adresse verhindert spontane Besuche.",
    severity: "major",
    category: "conversion",
    fixedIn: "Im neuen Design: Adresse prominent in Kontaktsektion, interaktive Karteneinbindung.",
    strengthLabel: "Adresse / Standort sichtbar",
    check: (data) => !!data.address && data.address.trim().length > 0,
  },
  {
    id: "services_listed",
    title: "Leistungen / Services nicht klar aufgelistet",
    description: "Wenn Besucher nicht sofort verstehen was Sie anbieten, verlassen sie die Seite innerhalb von 15 Sekunden.",
    severity: "critical",
    category: "conversion",
    fixedIn: "Im neuen Design: Dedizierter Services-Bereich mit klaren Leistungen, Icons und Beschreibungen.",
    strengthLabel: "Leistungen klar dargestellt",
    check: (_, raw) =>
      containsKeyword(raw, [
        "leistung", "service", "angebot", "behandlung", "produkt",
        "beratung", "service", "offer", "treatment", "what we do",
      ]),
  },
  {
    id: "faq",
    title: "Kein FAQ-Bereich vorhanden",
    description: "FAQs reduzieren Supportaufwand und beantworten Kundenfragen proaktiv. Fehlt dieser Bereich, entsteht Unsicherheit.",
    severity: "minor",
    category: "conversion",
    fixedIn: "Im neuen Design: FAQ-Sektion mit den häufigsten Kundenfragen und Antworten.",
    strengthLabel: "FAQ-Bereich vorhanden",
    check: (_, raw) =>
      containsKeyword(raw, ["faq", "häufig", "fragen", "frequently", "question"]),
  },
  {
    id: "hero_image",
    title: "Kein Hero-Bild oder qualitativ minderwertig",
    description: "Ein professionelles Bild above the fold steigert die Verweildauer. Ohne Bild wirkt die Seite unfertig.",
    severity: "major",
    category: "ux",
    fixedIn: "Im neuen Design: Professionelles Hero-Bild aus kuratierter Stock-Fotografie, passend zur Branche.",
    strengthLabel: "Ansprechendes Hero-Bild vorhanden",
    check: (data) => (data.allImages?.length ?? 0) > 2,
  },
  {
    id: "team_about",
    title: "Keine Team- oder Über-uns-Sektion",
    description: "Menschen kaufen von Menschen. Eine fehlende Vorstellung des Teams reduziert das Vertrauen erheblich.",
    severity: "minor",
    category: "trust",
    fixedIn: "Im neuen Design: Team-Sektion mit Fotos, Namen und Qualifikationen.",
    strengthLabel: "Team / Über uns vorhanden",
    check: (_, raw) =>
      containsKeyword(raw, [
        "team", "über uns", "about us", "mitarbeiter", "gründer",
        "inhaber", "unser team", "wir sind", "our team",
      ]),
  },
  {
    id: "email_visible",
    title: "E-Mail-Adresse nicht sichtbar",
    description: "Viele Kunden bevorzugen E-Mail-Kontakt. Eine fehlende E-Mail-Adresse kostet potenzielle Anfragen.",
    severity: "major",
    category: "conversion",
    fixedIn: "Im neuen Design: E-Mail-Adresse in der Kontaktsektion und im Footer, klickbar.",
    strengthLabel: "E-Mail-Adresse sichtbar",
    check: (data) => !!data.email && data.email.trim().length > 0,
  },
  {
    id: "social_links",
    title: "Keine Social-Media-Links",
    description: "Social Proof durch aktive Social-Media-Präsenz fehlt. Das reduziert das Vertrauen moderner Kunden.",
    severity: "minor",
    category: "trust",
    fixedIn: "Im neuen Design: Social-Media-Icons im Header und Footer eingebunden.",
    strengthLabel: "Social-Media-Links vorhanden",
    check: (data) => (data.socialLinks?.length ?? 0) > 0,
  },
  {
    id: "multiple_pages",
    title: "Fehlende Seitenstruktur (weniger als 3 Seiten)",
    description: "Eine einseitige Website signalisiert mangelnde Professionalität und bietet Google weniger Indexierungspunkte.",
    severity: "major",
    category: "completeness",
    fixedIn: "Im neuen Design: Vollständige Seitenstruktur mit Home, Leistungen, Über uns und Kontakt.",
    strengthLabel: "Vollständige Seitenstruktur",
    check: (data) => (data.pages?.length ?? 0) >= 3,
  },
  {
    id: "contact_form",
    title: "Kein Kontaktformular oder Newsletter",
    description: "Ohne Kontaktformular müssen Interessenten manuell eine E-Mail schreiben — das kostet Conversions.",
    severity: "minor",
    category: "conversion",
    fixedIn: "Im neuen Design: Integriertes Kontaktformular mit automatischer E-Mail-Benachrichtigung.",
    strengthLabel: "Kontaktformular vorhanden",
    check: (_, raw) =>
      containsKeyword(raw, [
        "formular", "kontaktformular", "newsletter", "anmeldung",
        "contact form", "form", "subscribe", "sign up",
      ]),
  },
];

// ── Score Calculation ─────────────────────────────────────

const SEVERITY_WEIGHTS: Record<AuditSeverity, number> = {
  critical: 15,
  major: 8,
  minor: 3,
};

// ── Main Export ───────────────────────────────────────────

export function auditWebsite(scrapedData: ScrapedData): AuditReport {
  const rawText = getRawText(scrapedData);
  const issues: AuditIssue[] = [];
  const strengths: string[] = [];

  for (const criterion of CRITERIA) {
    const passed = criterion.check(scrapedData, rawText);
    if (!passed) {
      issues.push({
        id: criterion.id,
        title: criterion.title,
        description: criterion.description,
        severity: criterion.severity,
        category: criterion.category,
        fixedIn: criterion.fixedIn,
      });
    } else {
      strengths.push(criterion.strengthLabel);
    }
  }

  const deduction = issues.reduce(
    (sum, issue) => sum + SEVERITY_WEIGHTS[issue.severity],
    0
  );
  const score = Math.max(0, 100 - deduction);
  const newScore = Math.min(score + 55, 97);

  return {
    score,
    newScore,
    issues,
    strengths,
    generatedAt: new Date().toISOString(),
  };
}
