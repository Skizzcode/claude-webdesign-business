import { v4 } from "./utils";
import type { Section, SectionType } from "./schemas/sections";

/**
 * Default section data for each type.
 * Used when adding a new section in the builder.
 */
export function createDefaultSection(type: SectionType): Section {
  const id = v4();
  const base = { id, visible: true, paddingTop: "md" as const, paddingBottom: "md" as const, background: "default" as const };

  switch (type) {
    case "hero":
      return {
        ...base,
        type: "hero",
        headline: "Willkommen bei Ihrem Unternehmen",
        subheadline: "Professioneller Service für Sie",
        buttons: [{ label: "Jetzt Kontakt aufnehmen", href: "#kontakt", variant: "primary" }],
        layout: "centered",
      };
    case "benefits":
      return {
        ...base,
        type: "benefits",
        headline: "Warum wir?",
        items: [
          { icon: "Star", title: "Qualität", description: "Höchste Qualitätsstandards" },
          { icon: "Clock", title: "Schnell", description: "Zuverlässig und termingerecht" },
          { icon: "Shield", title: "Vertrauen", description: "Seit Jahren Ihr Partner" },
        ],
        columns: "3",
      };
    case "services":
      return {
        ...base,
        type: "services",
        headline: "Unsere Leistungen",
        items: [
          { title: "Leistung 1", description: "Beschreibung der Leistung" },
          { title: "Leistung 2", description: "Beschreibung der Leistung" },
          { title: "Leistung 3", description: "Beschreibung der Leistung" },
        ],
        layout: "cards",
      };
    case "gallery":
      return {
        ...base,
        type: "gallery",
        headline: "Galerie",
        images: [
          { src: "/placeholder.jpg", alt: "Bild 1" },
          { src: "/placeholder.jpg", alt: "Bild 2" },
          { src: "/placeholder.jpg", alt: "Bild 3" },
        ],
        columns: "3",
      };
    case "pricing":
      return {
        ...base,
        type: "pricing",
        headline: "Unsere Preise",
        tiers: [
          {
            name: "Basis",
            price: "Ab 49€",
            features: ["Feature 1", "Feature 2"],
            highlighted: false,
          },
          {
            name: "Premium",
            price: "Ab 99€",
            features: ["Feature 1", "Feature 2", "Feature 3"],
            highlighted: true,
          },
        ],
      };
    case "team":
      return {
        ...base,
        type: "team",
        headline: "Unser Team",
        members: [
          { name: "Max Mustermann", role: "Geschäftsführer" },
        ],
      };
    case "testimonials":
      return {
        ...base,
        type: "testimonials",
        headline: "Das sagen unsere Kunden",
        items: [
          { quote: "Hervorragender Service!", author: "Anna M.", rating: 5 },
          { quote: "Absolut empfehlenswert!", author: "Thomas K.", rating: 5 },
        ],
        layout: "grid",
      };
    case "faq":
      return {
        ...base,
        type: "faq",
        headline: "Häufig gestellte Fragen",
        items: [
          { question: "Wie kann ich einen Termin vereinbaren?", answer: "Rufen Sie uns an oder nutzen Sie unser Kontaktformular." },
          { question: "Was sind Ihre Öffnungszeiten?", answer: "Montag bis Freitag, 9:00 - 18:00 Uhr" },
        ],
      };
    case "contact":
      return {
        ...base,
        type: "contact",
        headline: "Kontakt",
        subtitle: "Wir freuen uns auf Ihre Nachricht",
        fields: [
          { name: "name", label: "Name", type: "text", required: true },
          { name: "email", label: "E-Mail", type: "email", required: true },
          { name: "phone", label: "Telefon", type: "tel", required: false },
          { name: "message", label: "Nachricht", type: "textarea", required: true },
        ],
        submitLabel: "Absenden",
        showAddress: true,
        showPhone: true,
        showEmail: true,
        showHours: true,
      };
    case "map":
      return {
        ...base,
        type: "map",
        headline: "So finden Sie uns",
        address: "Musterstraße 1, 10115 Berlin",
      };
    case "footer":
      return {
        ...base,
        type: "footer",
        columns: [
          { title: "Navigation", links: [{ label: "Startseite", href: "/" }, { label: "Leistungen", href: "/leistungen" }] },
          { title: "Rechtliches", links: [{ label: "Impressum", href: "/impressum" }, { label: "Datenschutz", href: "/datenschutz" }] },
        ],
        copyright: "© 2025 Firmenname. Alle Rechte vorbehalten.",
        showSocials: true,
        showCredit: true,
      };
    case "cta_banner":
      return {
        ...base,
        type: "cta_banner",
        headline: "Bereit loszulegen?",
        subtitle: "Kontaktieren Sie uns noch heute für ein kostenloses Erstgespräch.",
        buttons: [{ label: "Jetzt anrufen", href: "tel:", variant: "primary" }],
      };
  }
}

export const SECTION_LABELS: Record<SectionType, { de: string; en: string }> = {
  hero: { de: "Hero-Banner", en: "Hero Banner" },
  benefits: { de: "Vorteile", en: "Benefits" },
  services: { de: "Leistungen", en: "Services" },
  gallery: { de: "Galerie", en: "Gallery" },
  pricing: { de: "Preise", en: "Pricing" },
  team: { de: "Team", en: "Team" },
  testimonials: { de: "Kundenstimmen", en: "Testimonials" },
  faq: { de: "FAQ", en: "FAQ" },
  contact: { de: "Kontakt", en: "Contact" },
  map: { de: "Karte", en: "Map" },
  footer: { de: "Footer", en: "Footer" },
  cta_banner: { de: "CTA-Banner", en: "CTA Banner" },
};
