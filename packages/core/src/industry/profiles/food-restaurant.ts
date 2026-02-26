import type { IndustryProfile } from "../types";

export const foodRestaurantProfile: IndustryProfile = {
  id: "food_restaurant",
  label: { de: "Restaurant / Gastronomie", en: "Restaurant / Gastronomy" },
  legacyKeys: ["restaurant"],
  ctaSets: [
    {
      primary: { label: { de: "Tisch reservieren", en: "Reserve a Table" }, href: "#kontakt" },
      secondary: { label: { de: "Speisekarte ansehen", en: "View Menu" }, href: "#leistungen" },
      microcopy: { de: "Online-Reservierung in 30 Sekunden", en: "Online reservation in 30 seconds" },
    },
    {
      primary: { label: { de: "Jetzt reservieren", en: "Book Now" }, href: "#kontakt" },
      secondary: { label: { de: "Anrufen & bestellen", en: "Call & Order" }, href: "tel:" },
      microcopy: { de: "Auch für Gruppen & Events", en: "Also for groups & events" },
    },
  ],
  trustSignals: [
    { type: "review_platform", label: { de: "Google Bewertung", en: "Google Rating" }, icon: "Star", placeholder: "[Bewertung einfügen]" },
    { type: "stat", label: { de: "Zufriedene Gäste", en: "Happy Guests" }, icon: "Users", placeholder: "10.000+" },
    { type: "guarantee", label: { de: "Frische Zutaten täglich", en: "Fresh Ingredients Daily" }, icon: "Leaf", placeholder: "Regionale Produkte" },
    { type: "stat", label: { de: "Jahre Tradition", en: "Years of Tradition" }, icon: "Award", placeholder: "[Anzahl]+" },
  ],
  artDirection: {
    heroQueries: [
      { query: "restaurant interior elegant warm lighting", orientation: "landscape" },
      { query: "fine dining atmosphere candlelight", orientation: "landscape" },
      { query: "cozy restaurant terrace evening", orientation: "landscape" },
    ],
    serviceQueries: [
      { query: "gourmet food plating beautiful", orientation: "landscape" },
      { query: "fresh ingredients cooking preparation", orientation: "landscape" },
      { query: "dessert presentation elegant", orientation: "square" },
    ],
    galleryQueries: [
      { query: "restaurant food photography professional" },
      { query: "chef cooking kitchen action" },
      { query: "restaurant interior design modern" },
    ],
    teamQueries: [
      { query: "chef portrait professional kitchen", orientation: "portrait" },
      { query: "restaurant team service staff", orientation: "landscape" },
    ],
    doKeywords: ["appetizing", "warm lighting", "elegant plating", "cozy atmosphere", "fresh", "inviting"],
    dontKeywords: ["fast food", "plastic", "mess", "dirty", "empty restaurant"],
    preferredComposition: "overhead",
    videoSuitable: true,
    videoQueries: [
      { query: "cooking food preparation slow motion" },
      { query: "restaurant atmosphere people dining" },
    ],
  },
  copyFramework: {
    toneOfVoice: "Einladend, sinnlich, genussvoll. Geschmack und Atmosphäre betonen. Emotionale Sprache, die Appetit macht. Gastfreundschaft vermitteln.",
    headlinePatterns: [
      { de: "Genuss, der verbindet", en: "Flavors That Connect" },
      { de: "Kulinarische Erlebnisse in {{location}}", en: "Culinary Experiences in {{location}}" },
      { de: "Willkommen in Ihrem Lieblingsrestaurant", en: "Welcome to Your Favorite Restaurant" },
    ],
    benefitThemes: [
      { de: "Frische, regionale Zutaten", en: "Fresh, Local Ingredients" },
      { de: "Gemütliche Atmosphäre", en: "Cozy Atmosphere" },
      { de: "Saisonale Specials", en: "Seasonal Specials" },
      { de: "Perfekt für Gruppen & Events", en: "Perfect for Groups & Events" },
      { de: "Sonnige Terrasse", en: "Sunny Terrace" },
      { de: "Hausgemachte Gerichte", en: "Homemade Dishes" },
    ],
    faqTemplates: [
      {
        question: { de: "Kann ich online reservieren?", en: "Can I book online?" },
        answer: { de: "Ja, nutzen Sie unser Reservierungsformular oder rufen Sie uns an. Für größere Gruppen empfehlen wir eine Voranmeldung.", en: "Yes, use our reservation form or call us. For larger groups, we recommend booking in advance." },
      },
      {
        question: { de: "Bieten Sie auch vegetarische/vegane Optionen?", en: "Do you offer vegetarian/vegan options?" },
        answer: { de: "Selbstverständlich! Unsere Karte bietet eine Auswahl an vegetarischen und veganen Gerichten. Sprechen Sie uns gerne auf Allergien und Unverträglichkeiten an.", en: "Absolutely! Our menu features a selection of vegetarian and vegan dishes. Feel free to tell us about any allergies or intolerances." },
      },
      {
        question: { de: "Kann ich bei Ihnen Feiern ausrichten?", en: "Can I host events at your restaurant?" },
        answer: { de: "Ja, wir richten gerne Geburtstage, Firmenfeiern und andere Events aus. Kontaktieren Sie uns für ein individuelles Angebot.", en: "Yes, we're happy to host birthdays, corporate events, and other celebrations. Contact us for a personalized offer." },
      },
    ],
    serviceCardStyle: "image_overlay",
  },
  designHints: {
    paletteStrategy: "Warme Erdtöne: dunkles Holz, warmes Bernstein/Gold, cremiges Weiß. Akzent in warmem Rot oder Terrakotta. Dunkler Hintergrund wirkt einladend.",
    typographyHints: {
      swiss_grid: { heading: "DM Serif Display", body: "Inter" },
      warm_local: { heading: "Playfair Display", body: "Lato" },
      tech_modern: { heading: "Space Grotesk", body: "Inter" },
      luxury_minimal: { heading: "Cormorant Garamond", body: "Jost" },
      editorial: { heading: "DM Serif Display", body: "DM Sans" },
      glassmorphism: { heading: "Plus Jakarta Sans", body: "Inter" },
      brutalist_clean: { heading: "Syne", body: "Syne" },
      nordic_soft: { heading: "Playfair Display", body: "Nunito" },
    },
    radiusRange: [4, 12],
    spacingPreference: "normal",
  },
  prioritySections: ["hero", "services", "gallery", "testimonials", "contact", "map", "faq"],
  skipSections: ["pricing", "benefits"],
};
