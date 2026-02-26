import type { IndustryProfile } from "../types";

export const healthcareDentistProfile: IndustryProfile = {
  id: "healthcare_dentist",
  label: { de: "Zahnarztpraxis", en: "Dental Practice" },
  legacyKeys: ["dentist"],
  ctaSets: [
    {
      primary: { label: { de: "Termin vereinbaren", en: "Book Appointment" }, href: "#kontakt" },
      secondary: { label: { de: "Jetzt anrufen", en: "Call Now" }, href: "tel:" },
      microcopy: { de: "Kurzfristige Termine verfügbar", en: "Short-notice appointments available" },
    },
    {
      primary: { label: { de: "Online-Termin buchen", en: "Book Online" }, href: "#kontakt" },
      secondary: { label: { de: "Rückruf anfordern", en: "Request Callback" }, href: "#kontakt" },
      microcopy: { de: "Neue Patienten willkommen", en: "New patients welcome" },
    },
  ],
  trustSignals: [
    { type: "certification", label: { de: "Zertifizierte Praxis", en: "Certified Practice" }, icon: "ShieldCheck", placeholder: "[Zertifizierung einfügen]" },
    { type: "stat", label: { de: "Zufriedene Patienten", en: "Happy Patients" }, icon: "Users", placeholder: "2.000+" },
    { type: "stat", label: { de: "Jahre Erfahrung", en: "Years Experience" }, icon: "Award", placeholder: "15+" },
    { type: "guarantee", label: { de: "Schmerzarme Behandlung", en: "Gentle Treatment" }, icon: "Heart", placeholder: "Moderne Betäubungsmethoden" },
    { type: "review_platform", label: { de: "Jameda Bewertung", en: "Jameda Rating" }, icon: "Star", placeholder: "[Bewertung einfügen]" },
  ],
  artDirection: {
    heroQueries: [
      { query: "dental office modern clean interior", orientation: "landscape" },
      { query: "dentist friendly smiling patient", orientation: "landscape" },
      { query: "modern dental clinic reception", orientation: "landscape" },
    ],
    serviceQueries: [
      { query: "dental treatment professional clean" },
      { query: "teeth whitening beautiful smile" },
      { query: "dental implant modern technology" },
    ],
    galleryQueries: [
      { query: "modern dental office interior design" },
      { query: "dental equipment clean professional" },
    ],
    teamQueries: [
      { query: "dentist portrait professional friendly", orientation: "portrait" },
      { query: "medical team smiling professional", orientation: "portrait" },
    ],
    doKeywords: ["clean", "bright", "smiling", "modern equipment", "friendly", "professional", "comfortable"],
    dontKeywords: ["blood", "surgery", "pain", "needles", "fear", "drill close-up"],
    preferredComposition: "wide",
    videoSuitable: false,
  },
  copyFramework: {
    toneOfVoice: "Warm, professionell, beruhigend. Patientenkomfort und moderne Techniken betonen. Klinischen Fachjargon vermeiden. Vertrauenswürdig und einladend.",
    headlinePatterns: [
      { de: "Ihr Lächeln in besten Händen", en: "Your Smile in Good Hands" },
      { de: "Moderne Zahnmedizin mit Wohlfühlfaktor", en: "Modern Dentistry with a Feel-Good Factor" },
      { de: "Zahngesundheit für die ganze Familie", en: "Dental Health for the Whole Family" },
    ],
    benefitThemes: [
      { de: "Schmerzarme Behandlung", en: "Gentle Treatment" },
      { de: "Modernste Ausstattung", en: "State-of-the-Art Equipment" },
      { de: "Kurze Wartezeiten", en: "Short Wait Times" },
      { de: "Alle Kassen & Privat", en: "All Insurance Accepted" },
      { de: "Familienfreundliche Praxis", en: "Family-Friendly Practice" },
      { de: "Angstpatienten willkommen", en: "Anxious Patients Welcome" },
    ],
    faqTemplates: [
      {
        question: { de: "Nehmen Sie neue Patienten auf?", en: "Are you accepting new patients?" },
        answer: { de: "Ja, wir freuen uns auf neue Patienten. Vereinbaren Sie einfach einen Ersttermin — wir nehmen uns Zeit für eine ausführliche Beratung.", en: "Yes, we welcome new patients. Simply book an initial appointment — we take the time for a thorough consultation." },
      },
      {
        question: { de: "Welche Versicherungen akzeptieren Sie?", en: "Which insurance do you accept?" },
        answer: { de: "Wir behandeln sowohl gesetzlich als auch privat versicherte Patienten. Sprechen Sie uns gerne auf individuelle Lösungen an.", en: "We treat both publicly and privately insured patients. Feel free to ask about individual solutions." },
      },
      {
        question: { de: "Was tun Sie für Angstpatienten?", en: "What do you offer for anxious patients?" },
        answer: { de: "Wir bieten einfühlsame Betreuung, ausführliche Aufklärung und moderne, schmerzarme Behandlungsmethoden. Ihr Wohlbefinden steht bei uns an erster Stelle.", en: "We offer empathetic care, thorough explanations, and modern, gentle treatment methods. Your comfort is our priority." },
      },
      {
        question: { de: "Bieten Sie Notfalltermine an?", en: "Do you offer emergency appointments?" },
        answer: { de: "Ja, bei akuten Zahnschmerzen versuchen wir, Ihnen noch am selben Tag einen Termin anzubieten. Rufen Sie uns einfach an.", en: "Yes, for acute dental pain we try to offer same-day appointments. Just give us a call." },
      },
    ],
    serviceCardStyle: "icon_title_desc",
  },
  designHints: {
    paletteStrategy: "Klinische Blautöne mit klarem Weiß. Warmer Akzent (Mint oder Hellblau). Heller, luftiger Hintergrund. Kein hartes Rot.",
    typographyHints: {
      swiss_grid: { heading: "Inter", body: "Inter" },
      warm_local: { heading: "Lora", body: "Lato" },
      tech_modern: { heading: "Space Grotesk", body: "Inter" },
      luxury_minimal: { heading: "Cormorant Garamond", body: "Jost" },
      editorial: { heading: "DM Serif Display", body: "DM Sans" },
      glassmorphism: { heading: "Plus Jakarta Sans", body: "Inter" },
      brutalist_clean: { heading: "Syne", body: "Syne" },
      nordic_soft: { heading: "Nunito", body: "Nunito" },
    },
    radiusRange: [8, 16],
    spacingPreference: "airy",
  },
  prioritySections: ["hero", "benefits", "services", "testimonials", "team", "contact", "faq"],
  skipSections: ["pricing"],
};
