import type { IndustryProfile } from "../types";

export const professionalLawProfile: IndustryProfile = {
  id: "professional_law",
  label: { de: "Rechtsanwalt / Kanzlei", en: "Lawyer / Law Firm" },
  legacyKeys: ["lawyer"],
  ctaSets: [
    {
      primary: { label: { de: "Erstberatung anfragen", en: "Request Consultation" }, href: "#kontakt" },
      secondary: { label: { de: "Jetzt anrufen", en: "Call Now" }, href: "tel:" },
      microcopy: { de: "Kostenlose Ersteinschätzung", en: "Free initial assessment" },
    },
    {
      primary: { label: { de: "Termin vereinbaren", en: "Schedule Appointment" }, href: "#kontakt" },
      secondary: { label: { de: "Rechtsgebiete ansehen", en: "View Practice Areas" }, href: "#leistungen" },
      microcopy: { de: "Diskret & vertraulich", en: "Discreet & confidential" },
    },
  ],
  trustSignals: [
    { type: "stat", label: { de: "Mandanten betreut", en: "Clients Served" }, icon: "Users", placeholder: "2.000+" },
    { type: "stat", label: { de: "Jahre Berufserfahrung", en: "Years of Experience" }, icon: "Award", placeholder: "25+" },
    { type: "certification", label: { de: "Fachanwalt", en: "Specialist Lawyer" }, icon: "ShieldCheck", placeholder: "[Fachgebiet einfügen]" },
    { type: "association", label: { de: "Anwaltskammer", en: "Bar Association" }, icon: "Building", placeholder: "[Kammerzugehörigkeit]" },
  ],
  artDirection: {
    heroQueries: [
      { query: "law office interior professional modern", orientation: "landscape" },
      { query: "lawyer consultation meeting room", orientation: "landscape" },
      { query: "justice scale books professional", orientation: "landscape" },
    ],
    serviceQueries: [
      { query: "legal consultation professional" },
      { query: "contract document signing" },
      { query: "courtroom justice professional" },
    ],
    galleryQueries: [
      { query: "modern law office interior" },
      { query: "legal library books professional" },
    ],
    teamQueries: [
      { query: "lawyer portrait professional office", orientation: "portrait" },
      { query: "legal team professional business", orientation: "landscape" },
    ],
    doKeywords: ["professional", "trustworthy", "authoritative", "modern office", "confident"],
    dontKeywords: ["aggressive", "intimidating", "courtroom drama", "handcuffs", "jail"],
    preferredComposition: "portrait",
    videoSuitable: false,
  },
  copyFramework: {
    toneOfVoice: "Seriös, kompetent, vertrauenswürdig. Fachkompetenz und Diskretion betonen. Klare, präzise Sprache. Respektvoll und empathisch.",
    headlinePatterns: [
      { de: "Ihr Recht in kompetenten Händen", en: "Your Rights in Competent Hands" },
      { de: "Rechtliche Klarheit für Ihre Situation", en: "Legal Clarity for Your Situation" },
      { de: "Erfahrene Beratung. Engagierte Vertretung.", en: "Experienced Advice. Dedicated Representation." },
    ],
    benefitThemes: [
      { de: "Persönliche Betreuung", en: "Personal Attention" },
      { de: "Langjährige Erfahrung", en: "Years of Experience" },
      { de: "Transparente Kosten", en: "Transparent Costs" },
      { de: "Diskrete Beratung", en: "Discreet Consultation" },
      { de: "Schnelle Reaktionszeit", en: "Fast Response Time" },
      { de: "Fachanwalt-Expertise", en: "Specialist Expertise" },
    ],
    faqTemplates: [
      {
        question: { de: "Was kostet eine Erstberatung?", en: "What does an initial consultation cost?" },
        answer: { de: "Wir bieten eine kostenlose Ersteinschätzung Ihres Falls an. Auf Wunsch vereinbaren wir ein ausführliches Beratungsgespräch mit transparenter Kostenaufklärung.", en: "We offer a free initial assessment of your case. On request, we arrange a detailed consultation with transparent cost information." },
      },
      {
        question: { de: "In welchen Rechtsgebieten sind Sie tätig?", en: "What areas of law do you practice?" },
        answer: { de: "Unsere Schwerpunkte umfassen verschiedene Rechtsgebiete. Kontaktieren Sie uns für eine Einschätzung, ob wir Ihnen in Ihrem Anliegen helfen können.", en: "Our practice covers various areas of law. Contact us for an assessment of whether we can help with your matter." },
      },
      {
        question: { de: "Wie läuft die Mandatsübernahme ab?", en: "How does taking on a case work?" },
        answer: { de: "Nach einem Erstgespräch prüfen wir Ihren Fall. Bei einer Übernahme erhalten Sie eine klare Mandatsvereinbarung mit allen Details zu Ablauf und Kosten.", en: "After an initial meeting, we review your case. If we take it on, you'll receive a clear mandate agreement with all details on process and costs." },
      },
    ],
    serviceCardStyle: "icon_title_desc",
  },
  designHints: {
    paletteStrategy: "Konservativ und seriös: Dunkelblau/Navy, Gold-Akzent, heller Hintergrund (Creme oder Weiß). Alternativ: dunkelgrüne Töne. Keine grellen Farben.",
    typographyHints: {
      modern_clean: { heading: "Inter", body: "Inter" },
      elegant: { heading: "Playfair Display", body: "Source Sans 3" },
      bold: { heading: "Space Grotesk", body: "DM Sans" },
    },
    radiusRange: [2, 8],
    spacingPreference: "airy",
  },
  prioritySections: ["hero", "services", "team", "benefits", "testimonials", "faq", "contact"],
  skipSections: ["gallery", "pricing"],
};
