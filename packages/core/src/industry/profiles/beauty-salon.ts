import type { IndustryProfile } from "../types";

export const beautySalonProfile: IndustryProfile = {
  id: "beauty_salon",
  label: { de: "Friseur / Kosmetik", en: "Hair Salon / Beauty" },
  legacyKeys: ["salon"],
  ctaSets: [
    {
      primary: { label: { de: "Termin buchen", en: "Book Appointment" }, href: "#kontakt" },
      secondary: { label: { de: "Unsere Treatments", en: "Our Treatments" }, href: "#leistungen" },
      microcopy: { de: "Ihr Wohlfühltermin wartet", en: "Your feel-good appointment awaits" },
    },
    {
      primary: { label: { de: "Online-Termin", en: "Book Online" }, href: "#kontakt" },
      secondary: { label: { de: "Jetzt anrufen", en: "Call Now" }, href: "tel:" },
      microcopy: { de: "Auch kurzfristige Termine möglich", en: "Short-notice appointments available" },
    },
  ],
  trustSignals: [
    { type: "stat", label: { de: "Zufriedene Kunden", en: "Happy Clients" }, icon: "Heart", placeholder: "5.000+" },
    { type: "stat", label: { de: "Jahre Erfahrung", en: "Years Experience" }, icon: "Award", placeholder: "10+" },
    { type: "certification", label: { de: "Zertifizierte Produkte", en: "Certified Products" }, icon: "ShieldCheck", placeholder: "[Markenname]" },
    { type: "review_platform", label: { de: "Google Bewertung", en: "Google Rating" }, icon: "Star", placeholder: "[Bewertung einfügen]" },
  ],
  artDirection: {
    heroQueries: [
      { query: "beauty salon interior modern elegant", orientation: "landscape" },
      { query: "hair styling professional salon", orientation: "landscape" },
      { query: "luxury spa treatment relaxing", orientation: "landscape" },
    ],
    serviceQueries: [
      { query: "hair coloring professional beautiful", orientation: "portrait" },
      { query: "facial treatment skincare spa" },
      { query: "manicure nail art professional" },
    ],
    galleryQueries: [
      { query: "hair style transformation before after" },
      { query: "beauty salon work portfolio" },
      { query: "nail design creative colorful" },
    ],
    teamQueries: [
      { query: "hair stylist portrait professional", orientation: "portrait" },
      { query: "beauty therapist friendly professional", orientation: "portrait" },
    ],
    doKeywords: ["elegant", "clean", "stylish", "professional", "relaxing", "beautiful results"],
    dontKeywords: ["messy", "cheap", "clinical", "sterile"],
    preferredComposition: "portrait",
    videoSuitable: true,
    videoQueries: [
      { query: "hair styling process beautiful" },
    ],
  },
  copyFramework: {
    toneOfVoice: "Elegant, einladend, verwöhnend. Beauty und Wohlbefinden betonen. Sinnliche, stilvolle Sprache. Expertise und Trends vermitteln.",
    headlinePatterns: [
      { de: "Ihr Stil. Unsere Leidenschaft.", en: "Your Style. Our Passion." },
      { de: "Schönheit, die von innen strahlt", en: "Beauty That Shines From Within" },
      { de: "Verwöhnmomente für Sie", en: "Pampering Moments for You" },
    ],
    benefitThemes: [
      { de: "Individuelle Beratung", en: "Personal Consultation" },
      { de: "Premium-Produkte", en: "Premium Products" },
      { de: "Entspannte Atmosphäre", en: "Relaxing Atmosphere" },
      { de: "Aktuelle Trends & Techniken", en: "Latest Trends & Techniques" },
      { de: "Flexible Terminvergabe", en: "Flexible Scheduling" },
    ],
    faqTemplates: [
      {
        question: { de: "Wie buche ich einen Termin?", en: "How do I book an appointment?" },
        answer: { de: "Buchen Sie bequem online über unser Kontaktformular oder rufen Sie uns an. Wir finden den perfekten Termin für Sie.", en: "Book conveniently online via our contact form or give us a call. We'll find the perfect time for you." },
      },
      {
        question: { de: "Welche Produkte verwenden Sie?", en: "Which products do you use?" },
        answer: { de: "Wir arbeiten mit hochwertigen, professionellen Produkten. Sprechen Sie uns gerne auf Ihre individuellen Bedürfnisse an.", en: "We work with high-quality professional products. Feel free to ask about your individual needs." },
      },
      {
        question: { de: "Bieten Sie auch Gutscheine an?", en: "Do you offer gift vouchers?" },
        answer: { de: "Ja! Unsere Gutscheine sind das perfekte Geschenk für jeden Anlass. Erhältlich vor Ort oder auf Anfrage.", en: "Yes! Our gift vouchers are the perfect present for any occasion. Available in-store or on request." },
      },
    ],
    serviceCardStyle: "image_overlay",
  },
  designHints: {
    paletteStrategy: "Sanfte, elegante Töne: Rosé, Mauve, Champagner. Dezente Gold-Akzente. Heller, luftiger Hintergrund (Creme/Weiß). Feminine aber nicht kitschig.",
    typographyHints: {
      modern_clean: { heading: "Outfit", body: "Inter" },
      elegant: { heading: "Cormorant Garamond", body: "Lato" },
      bold: { heading: "Montserrat", body: "Open Sans" },
    },
    radiusRange: [12, 20],
    spacingPreference: "airy",
  },
  prioritySections: ["hero", "services", "gallery", "testimonials", "team", "contact", "faq"],
  skipSections: ["map"],
};
