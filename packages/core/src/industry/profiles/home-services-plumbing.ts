import type { IndustryProfile } from "../types";

export const homeServicesPlumbingProfile: IndustryProfile = {
  id: "home_services_plumbing",
  label: { de: "Klempner / Sanitär", en: "Plumber / Sanitary" },
  legacyKeys: ["plumber"],
  ctaSets: [
    {
      primary: { label: { de: "Jetzt anrufen", en: "Call Now" }, href: "tel:" },
      secondary: { label: { de: "Angebot anfordern", en: "Request Quote" }, href: "#kontakt" },
      microcopy: { de: "24h Notdienst verfügbar", en: "24h emergency service available" },
    },
    {
      primary: { label: { de: "Notdienst kontaktieren", en: "Contact Emergency Service" }, href: "tel:" },
      secondary: { label: { de: "Kostenlose Beratung", en: "Free Consultation" }, href: "#kontakt" },
      microcopy: { de: "Schnelle Hilfe — auch am Wochenende", en: "Fast help — even on weekends" },
    },
  ],
  trustSignals: [
    { type: "guarantee", label: { de: "24h Notdienst", en: "24h Emergency" }, icon: "Clock", placeholder: "Auch am Wochenende" },
    { type: "stat", label: { de: "Zufriedene Kunden", en: "Happy Customers" }, icon: "ThumbsUp", placeholder: "3.000+" },
    { type: "stat", label: { de: "Jahre Erfahrung", en: "Years Experience" }, icon: "Award", placeholder: "20+" },
    { type: "certification", label: { de: "Meisterbetrieb", en: "Master Craftsman" }, icon: "ShieldCheck", placeholder: "[Qualifikation einfügen]" },
    { type: "guarantee", label: { de: "Festpreisgarantie", en: "Fixed Price Guarantee" }, icon: "BadgeCheck", placeholder: "Keine versteckten Kosten" },
  ],
  artDirection: {
    heroQueries: [
      { query: "plumber professional working bathroom", orientation: "landscape" },
      { query: "modern bathroom renovation clean", orientation: "landscape" },
      { query: "heating installation professional", orientation: "landscape" },
    ],
    serviceQueries: [
      { query: "plumber fixing pipe professional" },
      { query: "modern bathroom installation" },
      { query: "heating system repair maintenance" },
    ],
    galleryQueries: [
      { query: "bathroom renovation before after" },
      { query: "modern kitchen plumbing installation" },
    ],
    teamQueries: [
      { query: "plumber handyman professional portrait", orientation: "portrait" },
      { query: "craftsman team professional uniform", orientation: "landscape" },
    ],
    doKeywords: ["professional", "clean work", "organized tools", "modern bathroom", "finished project"],
    dontKeywords: ["dirty", "flooding", "damage", "mold", "rusty pipes"],
    preferredComposition: "wide",
    videoSuitable: false,
  },
  copyFramework: {
    toneOfVoice: "Verlässlich, kompetent, direkt. Schnelligkeit und Zuverlässigkeit betonen. Fachkompetenz und Meisterqualität hervorheben. Problemlösung fokussieren.",
    headlinePatterns: [
      { de: "Ihr Experte für Sanitär & Heizung", en: "Your Plumbing & Heating Expert" },
      { de: "Schnell. Zuverlässig. Meisterqualität.", en: "Fast. Reliable. Master Quality." },
      { de: "Wenn's tropft, sind wir da", en: "When It Drips, We're There" },
    ],
    benefitThemes: [
      { de: "24h Notdienst", en: "24h Emergency Service" },
      { de: "Festpreisgarantie", en: "Fixed Price Guarantee" },
      { de: "Meisterbetrieb", en: "Master Craftsman Business" },
      { de: "Schnelle Reaktionszeit", en: "Fast Response Time" },
      { de: "Saubere Arbeit", en: "Clean Work" },
      { de: "Kostenlose Erstberatung", en: "Free Initial Consultation" },
    ],
    faqTemplates: [
      {
        question: { de: "Bieten Sie einen Notdienst an?", en: "Do you offer emergency service?" },
        answer: { de: "Ja, unser Notdienst ist rund um die Uhr erreichbar — auch an Wochenenden und Feiertagen. Rufen Sie uns einfach an.", en: "Yes, our emergency service is available 24/7 — including weekends and holidays. Just give us a call." },
      },
      {
        question: { de: "Was kostet ein Einsatz?", en: "How much does a service call cost?" },
        answer: { de: "Wir bieten transparente Festpreise. Nach einer Begutachtung erhalten Sie ein verbindliches Angebot — ohne versteckte Kosten.", en: "We offer transparent fixed prices. After an assessment, you'll receive a binding quote — no hidden costs." },
      },
      {
        question: { de: "In welchem Gebiet sind Sie tätig?", en: "What area do you serve?" },
        answer: { de: "Wir sind in der gesamten Region tätig. Kontaktieren Sie uns, um zu erfahren, ob wir auch in Ihrer Nähe arbeiten.", en: "We serve the entire region. Contact us to find out if we work in your area." },
      },
    ],
    serviceCardStyle: "icon_title_desc",
  },
  designHints: {
    paletteStrategy: "Professionelles Blau mit Orange/Gelb-Akzent. Weißer Hintergrund. Vertrauenswürdig und handwerklich. Kein verspieltes Design.",
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
    radiusRange: [4, 8],
    spacingPreference: "normal",
  },
  prioritySections: ["hero", "benefits", "services", "testimonials", "cta_banner", "contact", "faq"],
  skipSections: ["gallery", "pricing", "team"],
};
