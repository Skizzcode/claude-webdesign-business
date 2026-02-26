import type { TemplateBlueprint, IndustryId } from "./types";
import type { StylePreset } from "../schemas/design";

// ── Deterministic hash for blueprint selection ────────────

function simpleHash(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash + str.charCodeAt(i)) | 0;
  }
  return Math.abs(hash);
}

// ── Blueprint Library ─────────────────────────────────────

export const BLUEPRINTS: TemplateBlueprint[] = [
  // ── Healthcare: Trust-Focused ───────────────────────────
  {
    id: "healthcare_trust",
    name: "Trust-Focused Healthcare",
    compatibleIndustries: ["healthcare_dentist", "healthcare_doctor", "healthcare_physio"],
    compatiblePresets: ["swiss_grid", "warm_local", "luxury_minimal", "nordic_soft"],
    pages: [
      {
        slug: "", title: { de: "Startseite", en: "Home" }, navLabel: { de: "Start", en: "Home" },
        sections: [
          { type: "hero", variant: "split_left", instructions: "Freundliches Praxis-Bild rechts. Trust-Badges unter der Headline (Jahre Erfahrung, zufriedene Patienten). Termin-CTA prominent." },
          { type: "benefits", instructions: "3-4 Vorteile: Patientenkomfort, moderne Ausstattung, Erfahrung, Kassenakzeptanz. Passende Lucide-Icons." },
          { type: "services", instructions: "Top 4-6 Behandlungen/Leistungen mit Icons und kurzer Beschreibung. Bei Zahnarzt: Prophylaxe, Implantate, Bleaching etc." },
          { type: "testimonials", variant: "grid", instructions: "2-3 Patienten-Testimonials als Platzhalter. Realistische Namen, 5-Sterne-Bewertung." },
          { type: "team", instructions: "Arzt/Ärztin-Profil mit Qualifikationen. Optional: Team-Mitglieder." },
          { type: "faq", instructions: "4-6 branchen-typische FAQs: Neue Patienten, Versicherungen, Notfälle, Angstpatienten." },
          { type: "cta_banner", instructions: "Termin-CTA mit Telefonnummer. Dringlichkeit ohne Druck." },
          { type: "contact" },
          { type: "footer" },
        ],
      },
      {
        slug: "leistungen", title: { de: "Leistungen", en: "Services" }, navLabel: { de: "Leistungen", en: "Services" },
        sections: [
          { type: "hero", variant: "centered", instructions: "Leistungs-Übersicht Headline. Kurzer einladender Text." },
          { type: "services", variant: "list", instructions: "Alle Leistungen ausführlich mit Beschreibungen." },
          { type: "cta_banner", instructions: "Termin vereinbaren CTA." },
          { type: "footer" },
        ],
      },
      {
        slug: "ueber-uns", title: { de: "Über uns", en: "About Us" }, navLabel: { de: "Über uns", en: "About" },
        sections: [
          { type: "hero", variant: "split_right", instructions: "Team- oder Praxisbild. Persönliche Vorstellung." },
          { type: "team", instructions: "Vollständiges Team mit Rollen und Qualifikationen." },
          { type: "benefits", instructions: "Praxis-Philosophie als Vorteile darstellen." },
          { type: "cta_banner" },
          { type: "footer" },
        ],
      },
      {
        slug: "kontakt", title: { de: "Kontakt", en: "Contact" }, navLabel: { de: "Kontakt", en: "Contact" },
        sections: [
          { type: "hero", variant: "centered", instructions: "Einladend: 'Wir freuen uns auf Sie'" },
          { type: "contact", instructions: "Formular mit Name, E-Mail, Telefon, Anliegen. Adresse und Öffnungszeiten anzeigen." },
          { type: "map" },
          { type: "footer" },
        ],
      },
    ],
  },

  // ── Healthcare: Modern & Bold ───────────────────────────
  {
    id: "healthcare_modern",
    name: "Modern Healthcare",
    compatibleIndustries: ["healthcare_dentist", "healthcare_doctor", "healthcare_physio"],
    compatiblePresets: ["tech_modern", "glassmorphism", "brutalist_clean", "editorial"],
    pages: [
      {
        slug: "", title: { de: "Startseite", en: "Home" }, navLabel: { de: "Start", en: "Home" },
        sections: [
          { type: "hero", variant: "bg_image", instructions: "Ganzes Praxis-Bild als Hintergrund mit Overlay. Starke Headline. CTA-Buttons." },
          { type: "services", variant: "grid", instructions: "Services als Bild-Cards. Moderne, auffällige Darstellung." },
          { type: "benefits", instructions: "Kompakte 2er-Spalte mit großen Icons." },
          { type: "testimonials", variant: "carousel", instructions: "Carousel mit Patienten-Stimmen." },
          { type: "team" },
          { type: "cta_banner" },
          { type: "faq" },
          { type: "contact" },
          { type: "footer" },
        ],
      },
      {
        slug: "leistungen", title: { de: "Leistungen", en: "Services" }, navLabel: { de: "Leistungen", en: "Services" },
        sections: [
          { type: "hero", variant: "centered" },
          { type: "services", variant: "cards" },
          { type: "cta_banner" },
          { type: "footer" },
        ],
      },
      {
        slug: "kontakt", title: { de: "Kontakt", en: "Contact" }, navLabel: { de: "Kontakt", en: "Contact" },
        sections: [
          { type: "hero", variant: "centered" },
          { type: "contact" },
          { type: "map" },
          { type: "footer" },
        ],
      },
    ],
  },

  // ── Restaurant: Gallery-Focused ─────────────────────────
  {
    id: "restaurant_gallery",
    name: "Gallery-Focused Restaurant",
    compatibleIndustries: ["food_restaurant", "food_bakery"],
    compatiblePresets: ["swiss_grid", "warm_local", "luxury_minimal", "nordic_soft"],
    pages: [
      {
        slug: "", title: { de: "Startseite", en: "Home" }, navLabel: { de: "Start", en: "Home" },
        sections: [
          { type: "hero", variant: "bg_image", instructions: "Atmosphärisches Restaurant-/Food-Bild. Warme Töne. Reservierungs-CTA." },
          { type: "services", variant: "cards", instructions: "Speisekategorien als Bild-Cards: Vorspeisen, Hauptgerichte, Desserts. Oder: Mittags-/Abendkarte." },
          { type: "gallery", instructions: "6-8 Food- und Ambiente-Bilder. Appetitliche Darstellung." },
          { type: "testimonials", variant: "stacked", instructions: "Gäste-Stimmen, große Zitate." },
          { type: "cta_banner", instructions: "Reservierungs-CTA: 'Ihren Tisch reservieren'" },
          { type: "contact" },
          { type: "map", instructions: "Anfahrt mit Adresse." },
          { type: "footer" },
        ],
      },
      {
        slug: "speisekarte", title: { de: "Speisekarte", en: "Menu" }, navLabel: { de: "Speisekarte", en: "Menu" },
        sections: [
          { type: "hero", variant: "centered", instructions: "Speisekarte-Headline mit einladendem Text." },
          { type: "services", variant: "list", instructions: "Gerichte als Liste mit Preisen und Beschreibungen." },
          { type: "cta_banner", instructions: "Reservierungs-CTA." },
          { type: "footer" },
        ],
      },
      {
        slug: "kontakt", title: { de: "Kontakt", en: "Contact" }, navLabel: { de: "Kontakt", en: "Contact" },
        sections: [
          { type: "hero", variant: "centered" },
          { type: "contact", instructions: "Reservierungsformular. Öffnungszeiten prominent." },
          { type: "map" },
          { type: "footer" },
        ],
      },
    ],
  },

  // ── Restaurant: Bold/Dark ───────────────────────────────
  {
    id: "restaurant_bold",
    name: "Bold Restaurant Experience",
    compatibleIndustries: ["food_restaurant"],
    compatiblePresets: ["tech_modern", "glassmorphism", "brutalist_clean", "editorial"],
    pages: [
      {
        slug: "", title: { de: "Startseite", en: "Home" }, navLabel: { de: "Start", en: "Home" },
        sections: [
          { type: "hero", variant: "bg_image", instructions: "Cinematic Food/Ambiente-Bild. Dark Overlay. Starke Headline." },
          { type: "gallery", instructions: "Food-Fotografie in dunklem Grid. High-Contrast." },
          { type: "services", variant: "grid", instructions: "Speisekategorien als overlay-Cards über Bildern." },
          { type: "testimonials", variant: "carousel" },
          { type: "cta_banner" },
          { type: "contact" },
          { type: "footer" },
        ],
      },
      {
        slug: "kontakt", title: { de: "Kontakt", en: "Contact" }, navLabel: { de: "Kontakt", en: "Contact" },
        sections: [
          { type: "hero", variant: "centered" },
          { type: "contact" },
          { type: "map" },
          { type: "footer" },
        ],
      },
    ],
  },

  // ── Beauty Salon: Elegant ───────────────────────────────
  {
    id: "salon_elegant",
    name: "Elegant Beauty Salon",
    compatibleIndustries: ["beauty_salon"],
    compatiblePresets: ["luxury_minimal", "warm_local", "swiss_grid", "nordic_soft"],
    pages: [
      {
        slug: "", title: { de: "Startseite", en: "Home" }, navLabel: { de: "Start", en: "Home" },
        sections: [
          { type: "hero", variant: "split_left", instructions: "Stilvolles Salon-Bild. Elegante Headline. Buchungs-CTA." },
          { type: "services", variant: "cards", instructions: "Treatments mit Preisen: Haare, Kosmetik, Nägel etc. Bild-Cards bevorzugt." },
          { type: "gallery", instructions: "Styling-Portfolio: Vorher/Nachher, Ergebnisse." },
          { type: "testimonials", variant: "grid" },
          { type: "team", instructions: "Stylisten-Profile mit Spezialisierungen." },
          { type: "faq" },
          { type: "cta_banner", instructions: "Termin buchen CTA." },
          { type: "contact" },
          { type: "footer" },
        ],
      },
      {
        slug: "treatments", title: { de: "Treatments", en: "Treatments" }, navLabel: { de: "Treatments", en: "Treatments" },
        sections: [
          { type: "hero", variant: "centered" },
          { type: "services", variant: "list", instructions: "Alle Treatments mit Preisen und Dauer." },
          { type: "cta_banner" },
          { type: "footer" },
        ],
      },
      {
        slug: "kontakt", title: { de: "Kontakt", en: "Contact" }, navLabel: { de: "Kontakt", en: "Contact" },
        sections: [
          { type: "hero", variant: "centered" },
          { type: "contact" },
          { type: "map" },
          { type: "footer" },
        ],
      },
    ],
  },

  // ── Fitness Gym: Bold ───────────────────────────────────
  {
    id: "gym_bold",
    name: "Bold Fitness Studio",
    compatibleIndustries: ["fitness_gym"],
    compatiblePresets: ["tech_modern", "glassmorphism", "brutalist_clean"],
    pages: [
      {
        slug: "", title: { de: "Startseite", en: "Home" }, navLabel: { de: "Start", en: "Home" },
        sections: [
          { type: "hero", variant: "bg_image", instructions: "Energetisches Gym-Bild. Dark Overlay. Starke motivierende Headline. Probetraining-CTA." },
          { type: "benefits", instructions: "4 Vorteile: Geräte, Kurse, Coaching, Community. Kompakt und energetisch." },
          { type: "services", variant: "grid", instructions: "Trainingsangebote: Freihantel, Cardio, Kurse, Personal Training." },
          { type: "pricing", instructions: "2-3 Mitgliedschafts-Modelle: Basis, Premium, VIP. Monatlich." },
          { type: "gallery", instructions: "Studio-Bilder: Geräte, Kursräume, Atmosphäre." },
          { type: "testimonials", variant: "carousel" },
          { type: "cta_banner", instructions: "Probetraining CTA." },
          { type: "contact" },
          { type: "footer" },
        ],
      },
      {
        slug: "kurse", title: { de: "Kurse", en: "Classes" }, navLabel: { de: "Kurse", en: "Classes" },
        sections: [
          { type: "hero", variant: "centered" },
          { type: "services", variant: "cards", instructions: "Kursangebot mit Zeiten/Beschreibungen." },
          { type: "cta_banner" },
          { type: "footer" },
        ],
      },
      {
        slug: "kontakt", title: { de: "Kontakt", en: "Contact" }, navLabel: { de: "Kontakt", en: "Contact" },
        sections: [
          { type: "hero", variant: "centered" },
          { type: "contact" },
          { type: "map" },
          { type: "footer" },
        ],
      },
    ],
  },

  // ── Fitness Gym: Modern Clean ───────────────────────────
  {
    id: "gym_clean",
    name: "Modern Clean Fitness",
    compatibleIndustries: ["fitness_gym"],
    compatiblePresets: ["swiss_grid", "warm_local", "nordic_soft", "editorial"],
    pages: [
      {
        slug: "", title: { de: "Startseite", en: "Home" }, navLabel: { de: "Start", en: "Home" },
        sections: [
          { type: "hero", variant: "split_right", instructions: "Trainer/Action-Bild rechts. Motivierende Headline. Probetraining-CTA." },
          { type: "services", variant: "cards", instructions: "Trainingsmöglichkeiten als Cards mit Bildern." },
          { type: "pricing", instructions: "Mitgliedschafts-Optionen klar strukturiert." },
          { type: "testimonials", variant: "grid" },
          { type: "team", instructions: "Trainer-Profile." },
          { type: "faq" },
          { type: "cta_banner" },
          { type: "contact" },
          { type: "footer" },
        ],
      },
      {
        slug: "kontakt", title: { de: "Kontakt", en: "Contact" }, navLabel: { de: "Kontakt", en: "Contact" },
        sections: [
          { type: "hero", variant: "centered" },
          { type: "contact" },
          { type: "map" },
          { type: "footer" },
        ],
      },
    ],
  },

  // ── Home Services: Professional ─────────────────────────
  {
    id: "homeservices_professional",
    name: "Professional Home Services",
    compatibleIndustries: ["home_services_plumbing", "home_services_electrical", "home_services_cleaning", "home_services_construction", "auto_repair"],
    compatiblePresets: ["swiss_grid", "warm_local", "tech_modern", "luxury_minimal", "editorial", "glassmorphism", "brutalist_clean", "nordic_soft"],
    pages: [
      {
        slug: "", title: { de: "Startseite", en: "Home" }, navLabel: { de: "Start", en: "Home" },
        sections: [
          { type: "hero", variant: "split_left", instructions: "Professionelles Arbeitsbild. Trust-Badges (Meisterbetrieb, 24h Notdienst, Jahre Erfahrung). Anruf-CTA prominent." },
          { type: "benefits", instructions: "4-5 USPs: Notdienst, Festpreis, Meisterbetrieb, Schnelligkeit, Sauberkeit." },
          { type: "services", variant: "cards", instructions: "Hauptleistungen mit Icons. Bei Klempner: Sanitär, Heizung, Rohrreinigung etc." },
          { type: "testimonials", variant: "grid", instructions: "Kunden-Stimmen." },
          { type: "cta_banner", instructions: "Notdienst/Anruf-CTA mit Telefonnummer." },
          { type: "faq" },
          { type: "contact" },
          { type: "footer" },
        ],
      },
      {
        slug: "leistungen", title: { de: "Leistungen", en: "Services" }, navLabel: { de: "Leistungen", en: "Services" },
        sections: [
          { type: "hero", variant: "centered" },
          { type: "services", variant: "list", instructions: "Alle Leistungen ausführlich." },
          { type: "cta_banner" },
          { type: "footer" },
        ],
      },
      {
        slug: "kontakt", title: { de: "Kontakt", en: "Contact" }, navLabel: { de: "Kontakt", en: "Contact" },
        sections: [
          { type: "hero", variant: "centered" },
          { type: "contact", instructions: "Anfrageformular. Einsatzgebiet und Telefonnummer anzeigen." },
          { type: "map" },
          { type: "footer" },
        ],
      },
    ],
  },

  // ── Professional (Law/Tax): Conservative ────────────────
  {
    id: "professional_conservative",
    name: "Conservative Professional",
    compatibleIndustries: ["professional_law", "professional_tax"],
    compatiblePresets: ["luxury_minimal", "warm_local", "swiss_grid", "editorial"],
    pages: [
      {
        slug: "", title: { de: "Startseite", en: "Home" }, navLabel: { de: "Start", en: "Home" },
        sections: [
          { type: "hero", variant: "split_left", instructions: "Seriöses Kanzlei-/Bürobild. Vertrauenswürdige Headline. Erstberatungs-CTA." },
          { type: "services", variant: "list", instructions: "Rechtsgebiete/Beratungsschwerpunkte. Icons + ausführliche Beschreibung." },
          { type: "team", instructions: "Anwälte/Berater-Profile mit Qualifikationen und Spezialisierungen." },
          { type: "benefits", instructions: "Kanzlei-Vorteile: Erfahrung, Diskretion, Transparenz, persönliche Betreuung." },
          { type: "testimonials", variant: "stacked", instructions: "Mandanten-Stimmen. Dezent und seriös." },
          { type: "faq" },
          { type: "cta_banner", instructions: "Erstberatung vereinbaren." },
          { type: "contact" },
          { type: "footer" },
        ],
      },
      {
        slug: "rechtsgebiete", title: { de: "Rechtsgebiete", en: "Practice Areas" }, navLabel: { de: "Rechtsgebiete", en: "Areas" },
        sections: [
          { type: "hero", variant: "centered" },
          { type: "services", variant: "list" },
          { type: "cta_banner" },
          { type: "footer" },
        ],
      },
      {
        slug: "kontakt", title: { de: "Kontakt", en: "Contact" }, navLabel: { de: "Kontakt", en: "Contact" },
        sections: [
          { type: "hero", variant: "centered" },
          { type: "contact" },
          { type: "map" },
          { type: "footer" },
        ],
      },
    ],
  },

  // ── Real Estate: Property Showcase ──────────────────────
  {
    id: "realestate_showcase",
    name: "Property Showcase",
    compatibleIndustries: ["real_estate"],
    compatiblePresets: ["swiss_grid", "warm_local", "tech_modern", "luxury_minimal", "editorial", "glassmorphism", "brutalist_clean", "nordic_soft"],
    pages: [
      {
        slug: "", title: { de: "Startseite", en: "Home" }, navLabel: { de: "Start", en: "Home" },
        sections: [
          { type: "hero", variant: "bg_image", instructions: "Hochwertige Immobilie als Hintergrund. Bewertungs-CTA." },
          { type: "services", variant: "cards", instructions: "Leistungen: Verkauf, Vermietung, Bewertung, Verwaltung. Bild-Cards." },
          { type: "gallery", instructions: "Referenz-Immobilien als Showcase." },
          { type: "benefits", instructions: "Vorteile: Marktkenntnis, Vermarktung, Betreuung, Erfahrung." },
          { type: "testimonials", variant: "grid" },
          { type: "team", instructions: "Makler-Profile." },
          { type: "cta_banner", instructions: "Immobilie bewerten lassen." },
          { type: "contact" },
          { type: "footer" },
        ],
      },
      {
        slug: "kontakt", title: { de: "Kontakt", en: "Contact" }, navLabel: { de: "Kontakt", en: "Contact" },
        sections: [
          { type: "hero", variant: "centered" },
          { type: "contact" },
          { type: "map" },
          { type: "footer" },
        ],
      },
    ],
  },

  // ── Education/Daycare: Playful ──────────────────────────
  {
    id: "daycare_playful",
    name: "Playful Daycare",
    compatibleIndustries: ["education_daycare"],
    compatiblePresets: ["swiss_grid", "warm_local", "tech_modern", "luxury_minimal", "editorial", "glassmorphism", "brutalist_clean", "nordic_soft"],
    pages: [
      {
        slug: "", title: { de: "Startseite", en: "Home" }, navLabel: { de: "Start", en: "Home" },
        sections: [
          { type: "hero", variant: "split_right", instructions: "Fröhliches Kinderbild. Einladende Headline. Anmelde-CTA." },
          { type: "benefits", instructions: "Vorteile: Qualifiziertes Personal, sichere Räume, gesunde Ernährung, individuelle Förderung." },
          { type: "services", variant: "cards", instructions: "Betreuungsangebote: Krippe, Kindergarten, Hort. Pädagogische Schwerpunkte." },
          { type: "gallery", instructions: "Einrichtungs-Bilder: Spielzimmer, Außengelände, Bastelprojekte." },
          { type: "team", instructions: "Erzieher:innen-Profile." },
          { type: "faq" },
          { type: "cta_banner", instructions: "Platz anfragen / Kennenlernen vereinbaren." },
          { type: "contact" },
          { type: "footer" },
        ],
      },
      {
        slug: "konzept", title: { de: "Unser Konzept", en: "Our Concept" }, navLabel: { de: "Konzept", en: "Concept" },
        sections: [
          { type: "hero", variant: "centered", instructions: "Pädagogisches Konzept vorstellen." },
          { type: "benefits", instructions: "Pädagogische Grundsätze als Vorteile." },
          { type: "services", variant: "list", instructions: "Tagesablauf, Angebote, Projekte." },
          { type: "cta_banner" },
          { type: "footer" },
        ],
      },
      {
        slug: "kontakt", title: { de: "Kontakt", en: "Contact" }, navLabel: { de: "Kontakt", en: "Contact" },
        sections: [
          { type: "hero", variant: "centered" },
          { type: "contact", instructions: "Anmeldeformular. Betreuungszeiten anzeigen." },
          { type: "map" },
          { type: "footer" },
        ],
      },
    ],
  },

  // ── Beauty Salon: Bold ──────────────────────────────────
  {
    id: "salon_bold",
    name: "Bold Beauty Studio",
    compatibleIndustries: ["beauty_salon"],
    compatiblePresets: ["tech_modern", "glassmorphism", "brutalist_clean", "editorial"],
    pages: [
      {
        slug: "", title: { de: "Startseite", en: "Home" }, navLabel: { de: "Start", en: "Home" },
        sections: [
          { type: "hero", variant: "bg_image", instructions: "Stylisches Beauty-Bild. Dark Overlay. Auffällige Headline." },
          { type: "services", variant: "grid", instructions: "Treatments als moderne Cards." },
          { type: "gallery", instructions: "Portfolio: Styling-Ergebnisse." },
          { type: "team" },
          { type: "testimonials", variant: "carousel" },
          { type: "cta_banner" },
          { type: "contact" },
          { type: "footer" },
        ],
      },
      {
        slug: "kontakt", title: { de: "Kontakt", en: "Contact" }, navLabel: { de: "Kontakt", en: "Contact" },
        sections: [
          { type: "hero", variant: "centered" },
          { type: "contact" },
          { type: "footer" },
        ],
      },
    ],
  },

  // ── Generic Fallback ────────────────────────────────────
  {
    id: "generic_professional",
    name: "Professional Business",
    compatibleIndustries: ["other"],
    compatiblePresets: ["swiss_grid", "warm_local", "tech_modern", "luxury_minimal", "editorial", "glassmorphism", "brutalist_clean", "nordic_soft"],
    pages: [
      {
        slug: "", title: { de: "Startseite", en: "Home" }, navLabel: { de: "Start", en: "Home" },
        sections: [
          { type: "hero", variant: "centered", instructions: "Professionelle Headline. Kontakt-CTA." },
          { type: "benefits", instructions: "3-4 Kernvorteile des Unternehmens." },
          { type: "services", variant: "cards", instructions: "Hauptleistungen mit Icons." },
          { type: "testimonials", variant: "grid" },
          { type: "faq" },
          { type: "cta_banner" },
          { type: "contact" },
          { type: "footer" },
        ],
      },
      {
        slug: "leistungen", title: { de: "Leistungen", en: "Services" }, navLabel: { de: "Leistungen", en: "Services" },
        sections: [
          { type: "hero", variant: "centered" },
          { type: "services", variant: "list" },
          { type: "cta_banner" },
          { type: "footer" },
        ],
      },
      {
        slug: "kontakt", title: { de: "Kontakt", en: "Contact" }, navLabel: { de: "Kontakt", en: "Contact" },
        sections: [
          { type: "hero", variant: "centered" },
          { type: "contact" },
          { type: "map" },
          { type: "footer" },
        ],
      },
    ],
  },
];

/** Select the best blueprint for a given industry + preset + project seed */
export function selectBlueprint(
  industryId: IndustryId,
  preset: StylePreset,
  seed: string
): TemplateBlueprint {
  // Best match: industry + preset
  const exactMatch = BLUEPRINTS.filter(
    (b) =>
      b.compatibleIndustries.includes(industryId) &&
      b.compatiblePresets.includes(preset)
  );
  if (exactMatch.length > 0) {
    return exactMatch[simpleHash(seed) % exactMatch.length];
  }

  // Fallback: any blueprint for this industry
  const industryMatch = BLUEPRINTS.filter((b) =>
    b.compatibleIndustries.includes(industryId)
  );
  if (industryMatch.length > 0) {
    return industryMatch[simpleHash(seed) % industryMatch.length];
  }

  // Absolute fallback: generic
  const generic = BLUEPRINTS.filter((b) =>
    b.compatibleIndustries.includes("other")
  );
  return generic[simpleHash(seed) % generic.length] || BLUEPRINTS[BLUEPRINTS.length - 1];
}
