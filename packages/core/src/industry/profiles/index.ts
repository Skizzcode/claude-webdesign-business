import type { IndustryProfile, IndustryId } from "../types";
import { healthcareDentistProfile } from "./healthcare-dentist";
import { foodRestaurantProfile } from "./food-restaurant";
import { beautySalonProfile } from "./beauty-salon";
import { fitnessGymProfile } from "./fitness-gym";
import { homeServicesPlumbingProfile } from "./home-services-plumbing";
import { professionalLawProfile } from "./professional-law";
import { realEstateProfile } from "./real-estate";
import { educationDaycareProfile } from "./education-daycare";

// ── Derived profiles (variations of main profiles) ────────

const healthcareDoctorProfile: IndustryProfile = {
  ...healthcareDentistProfile,
  id: "healthcare_doctor",
  label: { de: "Arztpraxis", en: "Medical Practice" },
  legacyKeys: ["doctor"],
  copyFramework: {
    ...healthcareDentistProfile.copyFramework,
    headlinePatterns: [
      { de: "Ihre Gesundheit in guten Händen", en: "Your Health in Good Hands" },
      { de: "Medizinische Kompetenz mit Herz", en: "Medical Expertise with Heart" },
      { de: "Hausärztliche Versorgung auf höchstem Niveau", en: "Primary Care at the Highest Level" },
    ],
    benefitThemes: [
      { de: "Ganzheitliche Betreuung", en: "Holistic Care" },
      { de: "Kurze Wartezeiten", en: "Short Wait Times" },
      { de: "Moderne Diagnostik", en: "Modern Diagnostics" },
      { de: "Alle Kassen & Privat", en: "All Insurance Accepted" },
      { de: "Hausbesuche möglich", en: "House Calls Available" },
    ],
  },
  artDirection: {
    ...healthcareDentistProfile.artDirection,
    heroQueries: [
      { query: "modern medical practice interior clean", orientation: "landscape" },
      { query: "doctor consultation patient friendly", orientation: "landscape" },
    ],
    serviceQueries: [
      { query: "medical examination professional" },
      { query: "modern diagnostic equipment" },
    ],
  },
};

const healthcarePhysioProfile: IndustryProfile = {
  ...healthcareDentistProfile,
  id: "healthcare_physio",
  label: { de: "Physiotherapie", en: "Physiotherapy" },
  legacyKeys: ["physio"],
  copyFramework: {
    ...healthcareDentistProfile.copyFramework,
    toneOfVoice: "Einfühlsam, motivierend, fachkompetent. Genesung und Bewegungsfreiheit betonen. Individuelle Behandlung hervorheben.",
    headlinePatterns: [
      { de: "Bewegung ist Leben", en: "Movement is Life" },
      { de: "Zurück zur vollen Beweglichkeit", en: "Back to Full Mobility" },
      { de: "Ihre Physiotherapie-Praxis", en: "Your Physiotherapy Practice" },
    ],
    benefitThemes: [
      { de: "Individuelle Therapiepläne", en: "Individual Therapy Plans" },
      { de: "Erfahrene Therapeuten", en: "Experienced Therapists" },
      { de: "Moderne Behandlungsmethoden", en: "Modern Treatment Methods" },
      { de: "Alle Kassen zugelassen", en: "All Insurance Accepted" },
      { de: "Schnelle Terminvergabe", en: "Quick Appointments" },
    ],
  },
  artDirection: {
    ...healthcareDentistProfile.artDirection,
    heroQueries: [
      { query: "physiotherapy treatment professional", orientation: "landscape" },
      { query: "physical therapy modern clinic", orientation: "landscape" },
    ],
    serviceQueries: [
      { query: "physiotherapy manual therapy" },
      { query: "rehabilitation exercise training" },
    ],
  },
};

const foodBakeryProfile: IndustryProfile = {
  ...foodRestaurantProfile,
  id: "food_bakery",
  label: { de: "Bäckerei / Konditorei", en: "Bakery / Patisserie" },
  legacyKeys: ["bakery"],
  ctaSets: [
    {
      primary: { label: { de: "Bestellung aufgeben", en: "Place Order" }, href: "#kontakt" },
      secondary: { label: { de: "Unser Sortiment", en: "Our Products" }, href: "#leistungen" },
      microcopy: { de: "Täglich frisch gebacken", en: "Freshly baked daily" },
    },
  ],
  copyFramework: {
    ...foodRestaurantProfile.copyFramework,
    toneOfVoice: "Herzlich, handwerklich, traditionsbewusst. Frische und Qualität betonen. Duft und Geschmack vermitteln. Familienbetrieb-Charme.",
    headlinePatterns: [
      { de: "Täglich frisch. Immer lecker.", en: "Freshly Baked. Always Delicious." },
      { de: "Backkunst mit Tradition", en: "Baking with Tradition" },
      { de: "Ihr Bäcker des Vertrauens", en: "Your Trusted Bakery" },
    ],
  },
  artDirection: {
    ...foodRestaurantProfile.artDirection,
    heroQueries: [
      { query: "bakery fresh bread artisan", orientation: "landscape" },
      { query: "pastry shop interior warm", orientation: "landscape" },
    ],
    serviceQueries: [
      { query: "fresh bread loaves variety" },
      { query: "pastry cake decoration beautiful" },
      { query: "bakery morning croissant coffee" },
    ],
  },
};

const homeServicesElectricalProfile: IndustryProfile = {
  ...homeServicesPlumbingProfile,
  id: "home_services_electrical",
  label: { de: "Elektriker", en: "Electrician" },
  legacyKeys: ["electrician"],
  copyFramework: {
    ...homeServicesPlumbingProfile.copyFramework,
    headlinePatterns: [
      { de: "Ihr Elektrofachbetrieb vor Ort", en: "Your Local Electrical Expert" },
      { de: "Strom. Sicher. Zuverlässig.", en: "Power. Safe. Reliable." },
      { de: "Elektrotechnik mit Meisterhand", en: "Electrical Work by Master Hands" },
    ],
    benefitThemes: [
      { de: "24h Notdienst", en: "24h Emergency Service" },
      { de: "E-Check zertifiziert", en: "E-Check Certified" },
      { de: "Meisterbetrieb", en: "Master Craftsman Business" },
      { de: "Smart Home Lösungen", en: "Smart Home Solutions" },
      { de: "Transparente Preise", en: "Transparent Pricing" },
    ],
  },
  artDirection: {
    ...homeServicesPlumbingProfile.artDirection,
    heroQueries: [
      { query: "electrician working professional", orientation: "landscape" },
      { query: "modern electrical installation smart home", orientation: "landscape" },
    ],
    serviceQueries: [
      { query: "electrical installation professional" },
      { query: "smart home technology modern" },
    ],
  },
};

const homeServicesCleaningProfile: IndustryProfile = {
  ...homeServicesPlumbingProfile,
  id: "home_services_cleaning",
  label: { de: "Reinigungsservice", en: "Cleaning Service" },
  legacyKeys: ["cleaning"],
  ctaSets: [
    {
      primary: { label: { de: "Angebot anfordern", en: "Request Quote" }, href: "#kontakt" },
      secondary: { label: { de: "Jetzt anrufen", en: "Call Now" }, href: "tel:" },
      microcopy: { de: "Kostenlose Besichtigung", en: "Free on-site assessment" },
    },
  ],
  copyFramework: {
    ...homeServicesPlumbingProfile.copyFramework,
    toneOfVoice: "Professionell, zuverlässig, gründlich. Sauberkeit und Hygiene betonen. Diskretion und Vertrauen vermitteln.",
    headlinePatterns: [
      { de: "Sauberkeit, die man sieht und spürt", en: "Cleanliness You Can See and Feel" },
      { de: "Professionelle Reinigung für Ihr Unternehmen", en: "Professional Cleaning for Your Business" },
      { de: "Ihr Partner für perfekte Sauberkeit", en: "Your Partner for Perfect Cleanliness" },
    ],
  },
  artDirection: {
    ...homeServicesPlumbingProfile.artDirection,
    heroQueries: [
      { query: "professional cleaning service office", orientation: "landscape" },
      { query: "clean modern office interior", orientation: "landscape" },
    ],
  },
};

const homeServicesConstructionProfile: IndustryProfile = {
  ...homeServicesPlumbingProfile,
  id: "home_services_construction",
  label: { de: "Bauunternehmen", en: "Construction Company" },
  legacyKeys: ["construction"],
  copyFramework: {
    ...homeServicesPlumbingProfile.copyFramework,
    toneOfVoice: "Solide, kompetent, ergebnisorientiert. Qualität und Termintreue betonen. Referenzprojekte hervorheben.",
    headlinePatterns: [
      { de: "Bauen mit Qualität und Leidenschaft", en: "Building with Quality and Passion" },
      { de: "Ihr Baupartner für jedes Projekt", en: "Your Construction Partner for Any Project" },
      { de: "Vom Plan zum fertigen Bau", en: "From Plan to Finished Build" },
    ],
  },
  artDirection: {
    ...homeServicesPlumbingProfile.artDirection,
    heroQueries: [
      { query: "modern house construction completed", orientation: "landscape" },
      { query: "construction team professional building", orientation: "landscape" },
    ],
  },
  prioritySections: ["hero", "services", "gallery", "benefits", "testimonials", "contact"],
};

const professionalTaxProfile: IndustryProfile = {
  ...professionalLawProfile,
  id: "professional_tax",
  label: { de: "Steuerberater", en: "Tax Advisor" },
  legacyKeys: [],
  copyFramework: {
    ...professionalLawProfile.copyFramework,
    toneOfVoice: "Kompetent, vertrauenswürdig, persönlich. Steuerliche Entlastung und Sicherheit betonen. Partnerschaftliche Beratung.",
    headlinePatterns: [
      { de: "Steuern optimieren. Sicher planen.", en: "Optimize Taxes. Plan Safely." },
      { de: "Ihr Steuerberater mit persönlicher Note", en: "Your Tax Advisor with a Personal Touch" },
      { de: "Mehr Netto vom Brutto", en: "More Net from Gross" },
    ],
  },
  artDirection: {
    ...professionalLawProfile.artDirection,
    heroQueries: [
      { query: "accounting office modern professional", orientation: "landscape" },
      { query: "tax advisor consultation meeting", orientation: "landscape" },
    ],
  },
};

const autoRepairProfile: IndustryProfile = {
  ...homeServicesPlumbingProfile,
  id: "auto_repair",
  label: { de: "KFZ-Werkstatt", en: "Auto Repair Shop" },
  legacyKeys: ["auto"],
  ctaSets: [
    {
      primary: { label: { de: "Termin vereinbaren", en: "Book Appointment" }, href: "#kontakt" },
      secondary: { label: { de: "Jetzt anrufen", en: "Call Now" }, href: "tel:" },
      microcopy: { de: "Schnelle Terminvergabe", en: "Quick scheduling" },
    },
  ],
  copyFramework: {
    ...homeServicesPlumbingProfile.copyFramework,
    toneOfVoice: "Kompetent, direkt, vertrauenswürdig. Fachkompetenz und faire Preise betonen. Meisterwerkstatt-Qualität.",
    headlinePatterns: [
      { de: "Ihre KFZ-Meisterwerkstatt", en: "Your Master Auto Repair Shop" },
      { de: "Professioneller Service für Ihr Fahrzeug", en: "Professional Service for Your Vehicle" },
      { de: "Wir bringen Sie sicher auf die Straße", en: "We Get You Safely on the Road" },
    ],
    benefitThemes: [
      { de: "Meisterbetrieb", en: "Master Craftsman" },
      { de: "Alle Marken & Modelle", en: "All Makes & Models" },
      { de: "Transparente Preise", en: "Transparent Prices" },
      { de: "Hol- & Bringservice", en: "Pick-up & Delivery" },
      { de: "Ersatzwagen verfügbar", en: "Courtesy Car Available" },
    ],
  },
  artDirection: {
    ...homeServicesPlumbingProfile.artDirection,
    heroQueries: [
      { query: "auto repair shop modern professional", orientation: "landscape" },
      { query: "car mechanic working professional", orientation: "landscape" },
    ],
    serviceQueries: [
      { query: "car service maintenance professional" },
      { query: "tire change auto repair" },
    ],
  },
};

// ── Fallback/Other profile ────────────────────────────────

const otherProfile: IndustryProfile = {
  id: "other",
  label: { de: "Sonstiges", en: "Other" },
  legacyKeys: ["other"],
  ctaSets: [
    {
      primary: { label: { de: "Kontakt aufnehmen", en: "Get in Touch" }, href: "#kontakt" },
      secondary: { label: { de: "Mehr erfahren", en: "Learn More" }, href: "#leistungen" },
      microcopy: { de: "Wir freuen uns auf Sie", en: "We look forward to hearing from you" },
    },
  ],
  trustSignals: [
    { type: "stat", label: { de: "Zufriedene Kunden", en: "Happy Customers" }, icon: "Users", placeholder: "[Anzahl]+" },
    { type: "stat", label: { de: "Jahre Erfahrung", en: "Years Experience" }, icon: "Award", placeholder: "[Anzahl]+" },
    { type: "guarantee", label: { de: "Qualitätsgarantie", en: "Quality Guarantee" }, icon: "ShieldCheck", placeholder: "Geprüfte Qualität" },
  ],
  artDirection: {
    heroQueries: [
      { query: "modern office professional business", orientation: "landscape" },
      { query: "business team working together", orientation: "landscape" },
    ],
    serviceQueries: [
      { query: "professional service business" },
    ],
    galleryQueries: [
      { query: "modern office interior" },
    ],
    teamQueries: [
      { query: "business professional portrait", orientation: "portrait" },
    ],
    doKeywords: ["professional", "modern", "trustworthy"],
    dontKeywords: ["generic", "stock photo feel"],
    preferredComposition: "wide",
    videoSuitable: false,
  },
  copyFramework: {
    toneOfVoice: "Professionell, freundlich, kompetent. Allgemein gehalten aber dennoch überzeugend.",
    headlinePatterns: [
      { de: "Ihr Partner für erstklassige Leistungen", en: "Your Partner for First-Class Service" },
      { de: "Qualität, der Sie vertrauen können", en: "Quality You Can Trust" },
    ],
    benefitThemes: [
      { de: "Persönlicher Service", en: "Personal Service" },
      { de: "Langjährige Erfahrung", en: "Years of Experience" },
      { de: "Faire Preise", en: "Fair Prices" },
      { de: "Zuverlässigkeit", en: "Reliability" },
    ],
    faqTemplates: [
      {
        question: { de: "Wie kann ich Sie erreichen?", en: "How can I reach you?" },
        answer: { de: "Nutzen Sie unser Kontaktformular oder rufen Sie uns an. Wir melden uns schnellstmöglich bei Ihnen.", en: "Use our contact form or give us a call. We'll get back to you as soon as possible." },
      },
    ],
    serviceCardStyle: "icon_title_desc",
  },
  designHints: {
    paletteStrategy: "Professionell und neutral: Blau oder Grau mit einem kräftigen Akzent. Heller Hintergrund.",
    radiusRange: [4, 12],
    spacingPreference: "normal",
  },
  prioritySections: ["hero", "benefits", "services", "testimonials", "faq", "contact", "footer"],
};

// ── Registry ──────────────────────────────────────────────

export const INDUSTRY_PROFILES: Record<IndustryId, IndustryProfile> = {
  healthcare_dentist: healthcareDentistProfile,
  healthcare_doctor: healthcareDoctorProfile,
  healthcare_physio: healthcarePhysioProfile,
  food_restaurant: foodRestaurantProfile,
  food_bakery: foodBakeryProfile,
  beauty_salon: beautySalonProfile,
  fitness_gym: fitnessGymProfile,
  home_services_plumbing: homeServicesPlumbingProfile,
  home_services_electrical: homeServicesElectricalProfile,
  home_services_cleaning: homeServicesCleaningProfile,
  home_services_construction: homeServicesConstructionProfile,
  professional_law: professionalLawProfile,
  professional_tax: professionalTaxProfile,
  real_estate: realEstateProfile,
  education_daycare: educationDaycareProfile,
  auto_repair: autoRepairProfile,
  other: otherProfile,
};

export function getIndustryProfile(id: IndustryId): IndustryProfile {
  return INDUSTRY_PROFILES[id] || INDUSTRY_PROFILES.other;
}

/** Map legacy simple industry keys (e.g. "dentist") to new IndustryId */
export function resolveLegacyIndustry(legacy: string): IndustryId {
  // Direct match
  if (legacy in INDUSTRY_PROFILES) return legacy as IndustryId;
  // Legacy key lookup
  for (const profile of Object.values(INDUSTRY_PROFILES)) {
    if (profile.legacyKeys.includes(legacy)) return profile.id;
  }
  return "other";
}
