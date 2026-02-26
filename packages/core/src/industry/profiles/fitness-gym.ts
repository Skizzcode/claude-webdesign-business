import type { IndustryProfile } from "../types";

export const fitnessGymProfile: IndustryProfile = {
  id: "fitness_gym",
  label: { de: "Fitnessstudio", en: "Gym / Fitness" },
  legacyKeys: ["gym"],
  ctaSets: [
    {
      primary: { label: { de: "Probetraining buchen", en: "Book Trial Session" }, href: "#kontakt" },
      secondary: { label: { de: "Mitglied werden", en: "Become a Member" }, href: "#preise" },
      microcopy: { de: "Erstes Training kostenlos", en: "First session free" },
    },
    {
      primary: { label: { de: "Jetzt starten", en: "Start Now" }, href: "#kontakt" },
      secondary: { label: { de: "Preise ansehen", en: "View Prices" }, href: "#preise" },
      microcopy: { de: "Keine Vertragsbindung", en: "No contract commitment" },
    },
  ],
  trustSignals: [
    { type: "stat", label: { de: "Aktive Mitglieder", en: "Active Members" }, icon: "Users", placeholder: "500+" },
    { type: "stat", label: { de: "Trainingsfläche", en: "Training Area" }, icon: "Maximize", placeholder: "800m²" },
    { type: "guarantee", label: { de: "Modernste Geräte", en: "Latest Equipment" }, icon: "Dumbbell", placeholder: "Top-Marken" },
    { type: "stat", label: { de: "Kurse pro Woche", en: "Classes per Week" }, icon: "Calendar", placeholder: "30+" },
  ],
  artDirection: {
    heroQueries: [
      { query: "modern gym interior equipment", orientation: "landscape" },
      { query: "fitness training motivation energy", orientation: "landscape" },
      { query: "crossfit gym dark atmosphere", orientation: "landscape" },
    ],
    serviceQueries: [
      { query: "personal training gym coaching" },
      { query: "group fitness class energy" },
      { query: "weightlifting strength training" },
    ],
    galleryQueries: [
      { query: "gym equipment modern clean" },
      { query: "fitness workout action shot" },
    ],
    teamQueries: [
      { query: "personal trainer fit professional", orientation: "portrait" },
      { query: "fitness coach smiling gym", orientation: "portrait" },
    ],
    doKeywords: ["energy", "motivation", "strong", "modern equipment", "action", "determination"],
    dontKeywords: ["empty gym", "intimidating", "injury", "exhaustion", "before photos"],
    preferredComposition: "wide",
    videoSuitable: true,
    videoQueries: [
      { query: "gym workout motivation cinematic" },
      { query: "fitness training compilation energy" },
    ],
  },
  copyFramework: {
    toneOfVoice: "Motivierend, energetisch, direkt. Ergebnisse und Transformation betonen. Starke, aktive Sprache. Gemeinschaft und Unterstützung vermitteln.",
    headlinePatterns: [
      { de: "Dein Ziel. Unser Antrieb.", en: "Your Goal. Our Drive." },
      { de: "Stärke beginnt hier", en: "Strength Starts Here" },
      { de: "Mehr als ein Studio — eine Community", en: "More Than a Gym — A Community" },
    ],
    benefitThemes: [
      { de: "Modernste Geräte", en: "State-of-the-Art Equipment" },
      { de: "Persönliches Coaching", en: "Personal Coaching" },
      { de: "Vielfältiges Kursangebot", en: "Diverse Class Schedule" },
      { de: "Flexible Öffnungszeiten", en: "Flexible Hours" },
      { de: "Community & Motivation", en: "Community & Motivation" },
      { de: "Kostenlose Erstberatung", en: "Free Initial Consultation" },
    ],
    faqTemplates: [
      {
        question: { de: "Kann ich ein Probetraining machen?", en: "Can I do a trial session?" },
        answer: { de: "Natürlich! Vereinbaren Sie ein kostenloses Probetraining und lernen Sie unser Studio kennen. Ohne Verpflichtung.", en: "Of course! Book a free trial session and get to know our gym. No obligation." },
      },
      {
        question: { de: "Welche Mitgliedschaften gibt es?", en: "What memberships are available?" },
        answer: { de: "Wir bieten verschiedene Modelle — von flexiblen Monatsmitgliedschaften bis zu vergünstigten Jahreskarten. Finden Sie die passende Option für sich.", en: "We offer various models — from flexible monthly memberships to discounted annual passes. Find the right option for you." },
      },
      {
        question: { de: "Gibt es auch Kurse für Anfänger?", en: "Are there classes for beginners?" },
        answer: { de: "Ja, viele unserer Kurse sind auch für Einsteiger geeignet. Unsere Trainer helfen Ihnen bei jedem Schritt.", en: "Yes, many of our classes are suitable for beginners. Our trainers will help you every step of the way." },
      },
    ],
    serviceCardStyle: "image_overlay",
  },
  designHints: {
    paletteStrategy: "Dunkel und energetisch: Schwarz/Anthrazit-Hintergrund. Kräftiger Akzent (Neon-Grün, Orange oder Electric Blue). Hoher Kontrast. Weiße Headlines auf dunklem Grund.",
    typographyHints: {
      swiss_grid: { heading: "Inter", body: "Inter" },
      warm_local: { heading: "Montserrat", body: "Lato" },
      tech_modern: { heading: "Space Grotesk", body: "Inter" },
      luxury_minimal: { heading: "Cormorant Garamond", body: "Jost" },
      editorial: { heading: "DM Serif Display", body: "DM Sans" },
      glassmorphism: { heading: "Plus Jakarta Sans", body: "Inter" },
      brutalist_clean: { heading: "Syne", body: "Syne" },
      nordic_soft: { heading: "Nunito", body: "Nunito" },
    },
    radiusRange: [2, 8],
    spacingPreference: "compact",
  },
  prioritySections: ["hero", "services", "pricing", "gallery", "testimonials", "team", "contact", "faq"],
};
