import type { IndustryProfile } from "../types";

export const educationDaycareProfile: IndustryProfile = {
  id: "education_daycare",
  label: { de: "Kita / Bildung", en: "Daycare / Education" },
  legacyKeys: [],
  ctaSets: [
    {
      primary: { label: { de: "Platz anfragen", en: "Request a Spot" }, href: "#kontakt" },
      secondary: { label: { de: "Unser Konzept", en: "Our Concept" }, href: "#leistungen" },
      microcopy: { de: "Anmeldung jederzeit möglich", en: "Registration possible anytime" },
    },
    {
      primary: { label: { de: "Kennenlernen vereinbaren", en: "Schedule a Visit" }, href: "#kontakt" },
      secondary: { label: { de: "Anrufen", en: "Call Us" }, href: "tel:" },
      microcopy: { de: "Schnuppertag für Ihr Kind", en: "Trial day for your child" },
    },
  ],
  trustSignals: [
    { type: "stat", label: { de: "Betreute Kinder", en: "Children in Care" }, icon: "Heart", placeholder: "60+" },
    { type: "certification", label: { de: "Zertifizierter Träger", en: "Certified Provider" }, icon: "ShieldCheck", placeholder: "[Zertifizierung einfügen]" },
    { type: "stat", label: { de: "Fachkräfte im Team", en: "Qualified Staff" }, icon: "Users", placeholder: "12+" },
    { type: "guarantee", label: { de: "Sichere Betreuung", en: "Safe Childcare" }, icon: "Shield", placeholder: "Geprüfte Räumlichkeiten" },
  ],
  artDirection: {
    heroQueries: [
      { query: "daycare children playing happy", orientation: "landscape" },
      { query: "kindergarten colorful interior", orientation: "landscape" },
      { query: "children outdoor playground nature", orientation: "landscape" },
    ],
    serviceQueries: [
      { query: "children painting creative activity" },
      { query: "kids learning education playful" },
      { query: "children reading together group" },
    ],
    galleryQueries: [
      { query: "daycare interior colorful spaces" },
      { query: "playground outdoor children equipment" },
      { query: "children craft activity kindergarten" },
    ],
    teamQueries: [
      { query: "kindergarten teacher caring friendly", orientation: "portrait" },
      { query: "childcare educator smiling children", orientation: "landscape" },
    ],
    doKeywords: ["happy children", "colorful", "safe", "creative", "outdoor play", "learning"],
    dontKeywords: ["crying", "alone", "neglect", "clinical", "sterile"],
    preferredComposition: "wide",
    videoSuitable: true,
    videoQueries: [
      { query: "children playing together happy outdoor" },
    ],
  },
  copyFramework: {
    toneOfVoice: "Warmherzig, vertrauensvoll, liebevoll. Sicherheit und Geborgenheit betonen. Pädagogisches Konzept und individuelle Förderung hervorheben. Elternansprache auf Augenhöhe.",
    headlinePatterns: [
      { de: "Wo kleine Persönlichkeiten wachsen", en: "Where Little Personalities Grow" },
      { de: "Liebevolle Betreuung für Ihr Kind", en: "Loving Care for Your Child" },
      { de: "Spielen. Lernen. Wachsen.", en: "Play. Learn. Grow." },
    ],
    benefitThemes: [
      { de: "Qualifiziertes Fachpersonal", en: "Qualified Staff" },
      { de: "Individuelle Förderung", en: "Individual Support" },
      { de: "Sichere Räumlichkeiten", en: "Safe Facilities" },
      { de: "Gesunde Ernährung", en: "Healthy Nutrition" },
      { de: "Naturnahe Erziehung", en: "Nature-Based Education" },
      { de: "Flexible Betreuungszeiten", en: "Flexible Hours" },
    ],
    faqTemplates: [
      {
        question: { de: "Wie melde ich mein Kind an?", en: "How do I register my child?" },
        answer: { de: "Nutzen Sie unser Kontaktformular oder rufen Sie uns an. Wir vereinbaren gerne einen Schnuppertag, damit Sie uns und unsere Räume kennenlernen können.", en: "Use our contact form or call us. We're happy to arrange a trial day so you can get to know us and our facilities." },
      },
      {
        question: { de: "Welches pädagogische Konzept verfolgen Sie?", en: "What educational concept do you follow?" },
        answer: { de: "Unser Konzept verbindet spielerisches Lernen mit individueller Förderung. Jedes Kind wird in seinem eigenen Tempo begleitet und unterstützt.", en: "Our concept combines playful learning with individual support. Every child is guided and supported at their own pace." },
      },
      {
        question: { de: "Wie sind die Betreuungszeiten?", en: "What are the care hours?" },
        answer: { de: "Wir bieten flexible Betreuungsmodelle an. Kontaktieren Sie uns für Details zu unseren aktuellen Betreuungszeiten.", en: "We offer flexible care models. Contact us for details on our current hours." },
      },
    ],
    serviceCardStyle: "icon_title_desc",
  },
  designHints: {
    paletteStrategy: "Freundlich und bunt: Heller Hintergrund mit bunten Akzentfarben (Grün, Orange, Hellblau). Verspielt aber nicht chaotisch. Warme, einladende Töne.",
    typographyHints: {
      modern_clean: { heading: "Nunito", body: "Inter" },
      elegant: { heading: "Quicksand", body: "Open Sans" },
      bold: { heading: "Poppins", body: "Nunito Sans" },
    },
    radiusRange: [12, 24],
    spacingPreference: "airy",
  },
  prioritySections: ["hero", "benefits", "services", "gallery", "team", "faq", "contact"],
  skipSections: ["pricing", "testimonials"],
};
