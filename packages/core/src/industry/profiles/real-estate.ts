import type { IndustryProfile } from "../types";

export const realEstateProfile: IndustryProfile = {
  id: "real_estate",
  label: { de: "Immobilien", en: "Real Estate" },
  legacyKeys: [],
  ctaSets: [
    {
      primary: { label: { de: "Immobilie bewerten lassen", en: "Get Property Valuation" }, href: "#kontakt" },
      secondary: { label: { de: "Angebote ansehen", en: "View Listings" }, href: "#leistungen" },
      microcopy: { de: "Kostenlose Wertermittlung", en: "Free property valuation" },
    },
    {
      primary: { label: { de: "Beratung anfragen", en: "Request Consultation" }, href: "#kontakt" },
      secondary: { label: { de: "Jetzt anrufen", en: "Call Now" }, href: "tel:" },
      microcopy: { de: "Persönliche Beratung vor Ort", en: "Personal on-site consultation" },
    },
  ],
  trustSignals: [
    { type: "stat", label: { de: "Vermittelte Objekte", en: "Properties Sold" }, icon: "Home", placeholder: "500+" },
    { type: "stat", label: { de: "Jahre am Markt", en: "Years in Market" }, icon: "Award", placeholder: "15+" },
    { type: "certification", label: { de: "IHK-zertifiziert", en: "Chamber Certified" }, icon: "ShieldCheck", placeholder: "[Zertifizierung einfügen]" },
    { type: "guarantee", label: { de: "Regionale Marktkenntnis", en: "Local Market Knowledge" }, icon: "MapPin", placeholder: "Ihr Experte vor Ort" },
  ],
  artDirection: {
    heroQueries: [
      { query: "modern house exterior architecture", orientation: "landscape" },
      { query: "luxury apartment interior design", orientation: "landscape" },
      { query: "real estate modern living room", orientation: "landscape" },
    ],
    serviceQueries: [
      { query: "house for sale modern" },
      { query: "apartment interior design living" },
      { query: "property viewing consultation" },
    ],
    galleryQueries: [
      { query: "modern house architecture exterior" },
      { query: "luxury interior design apartment" },
      { query: "beautiful garden house" },
    ],
    teamQueries: [
      { query: "real estate agent professional portrait", orientation: "portrait" },
      { query: "business consultant meeting handshake", orientation: "landscape" },
    ],
    doKeywords: ["bright", "spacious", "modern", "well-maintained", "lifestyle", "dream home"],
    dontKeywords: ["run-down", "abandoned", "construction site", "demolition"],
    preferredComposition: "wide",
    videoSuitable: true,
    videoQueries: [
      { query: "modern house walkthrough tour" },
    ],
  },
  copyFramework: {
    toneOfVoice: "Kompetent, vertrauenswürdig, persönlich. Traumimmobilie und Lebensgefühl betonen. Regionale Expertise hervorheben. Beratungsorientiert.",
    headlinePatterns: [
      { de: "Ihr Traumhaus wartet auf Sie", en: "Your Dream Home Awaits" },
      { de: "Immobilien-Expertise aus der Region", en: "Real Estate Expertise from the Region" },
      { de: "Zuhause ankommen", en: "Arriving Home" },
    ],
    benefitThemes: [
      { de: "Regionale Marktkenntnis", en: "Local Market Knowledge" },
      { de: "Persönliche Betreuung", en: "Personal Service" },
      { de: "Kostenlose Wertermittlung", en: "Free Valuation" },
      { de: "Professionelle Vermarktung", en: "Professional Marketing" },
      { de: "Transparente Abwicklung", en: "Transparent Process" },
    ],
    faqTemplates: [
      {
        question: { de: "Was kostet eine Immobilienbewertung?", en: "What does a property valuation cost?" },
        answer: { de: "Wir bieten eine kostenlose und unverbindliche Wertermittlung Ihrer Immobilie an. Kontaktieren Sie uns für einen Termin.", en: "We offer a free, no-obligation valuation of your property. Contact us for an appointment." },
      },
      {
        question: { de: "Wie läuft der Verkaufsprozess ab?", en: "How does the selling process work?" },
        answer: { de: "Von der Bewertung über die professionelle Vermarktung bis zur Schlüsselübergabe — wir begleiten Sie durch den gesamten Prozess.", en: "From valuation through professional marketing to key handover — we guide you through the entire process." },
      },
    ],
    serviceCardStyle: "image_overlay",
  },
  designHints: {
    paletteStrategy: "Edel und modern: Dunkelblau oder Anthrazit mit Gold/Kupfer-Akzent. Heller Hintergrund. Premium-Ausstrahlung. Alternativ warmes Grau mit Grün.",
    typographyHints: {
      modern_clean: { heading: "Inter", body: "Inter" },
      elegant: { heading: "Playfair Display", body: "Lato" },
      bold: { heading: "Montserrat", body: "Open Sans" },
    },
    radiusRange: [4, 12],
    spacingPreference: "airy",
  },
  prioritySections: ["hero", "services", "gallery", "benefits", "testimonials", "team", "contact"],
  skipSections: ["pricing", "faq"],
};
