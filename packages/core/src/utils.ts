/** Generate a simple UUID v4 without external dependency */
export function v4(): string {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

/** Slugify a string (German-friendly) */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/ä/g, "ae")
    .replace(/ö/g, "oe")
    .replace(/ü/g, "ue")
    .replace(/ß/g, "ss")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

/** Truncate text to maxLen characters */
export function truncate(text: string, maxLen: number): string {
  if (text.length <= maxLen) return text;
  return text.slice(0, maxLen - 1) + "…";
}

/** Safe JSON parse */
export function safeJsonParse<T>(json: string): T | null {
  try {
    return JSON.parse(json) as T;
  } catch {
    return null;
  }
}

/** Industry labels for the wizard dropdown — uses IndustryId values */
export const INDUSTRIES = [
  { value: "healthcare_dentist", legacy: "dentist", label: { de: "Zahnarzt / Zahnärztin", en: "Dentist" } },
  { value: "healthcare_doctor", legacy: "doctor", label: { de: "Arztpraxis", en: "Medical Practice" } },
  { value: "healthcare_physio", legacy: "physio", label: { de: "Physiotherapie", en: "Physiotherapy" } },
  { value: "food_restaurant", legacy: "restaurant", label: { de: "Restaurant / Gastronomie", en: "Restaurant / Gastronomy" } },
  { value: "food_bakery", legacy: "bakery", label: { de: "Bäckerei / Konditorei", en: "Bakery" } },
  { value: "beauty_salon", legacy: "salon", label: { de: "Friseur / Kosmetik", en: "Hair Salon / Beauty" } },
  { value: "fitness_gym", legacy: "gym", label: { de: "Fitnessstudio", en: "Gym / Fitness" } },
  { value: "home_services_plumbing", legacy: "plumber", label: { de: "Klempner / Sanitär", en: "Plumber / Sanitary" } },
  { value: "home_services_electrical", legacy: "electrician", label: { de: "Elektriker", en: "Electrician" } },
  { value: "home_services_cleaning", legacy: "cleaning", label: { de: "Reinigungsservice", en: "Cleaning Service" } },
  { value: "home_services_construction", legacy: "construction", label: { de: "Bauunternehmen", en: "Construction" } },
  { value: "professional_law", legacy: "lawyer", label: { de: "Rechtsanwalt", en: "Lawyer" } },
  { value: "professional_tax", legacy: "", label: { de: "Steuerberater", en: "Tax Advisor" } },
  { value: "auto_repair", legacy: "auto", label: { de: "KFZ-Werkstatt", en: "Auto Repair" } },
  { value: "real_estate", legacy: "", label: { de: "Immobilien", en: "Real Estate" } },
  { value: "education_daycare", legacy: "", label: { de: "Kita / Bildung", en: "Daycare / Education" } },
  { value: "other", legacy: "other", label: { de: "Sonstiges", en: "Other" } },
] as const;
