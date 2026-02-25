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

/** Industry labels for the wizard dropdown */
export const INDUSTRIES = [
  { value: "restaurant", label: { de: "Restaurant / Gastronomie", en: "Restaurant / Gastronomy" } },
  { value: "salon", label: { de: "Friseur / Kosmetik", en: "Hair Salon / Beauty" } },
  { value: "plumber", label: { de: "Klempner / Sanitär", en: "Plumber / Sanitary" } },
  { value: "electrician", label: { de: "Elektriker", en: "Electrician" } },
  { value: "dentist", label: { de: "Zahnarzt / Zahnärztin", en: "Dentist" } },
  { value: "physio", label: { de: "Physiotherapie", en: "Physiotherapy" } },
  { value: "gym", label: { de: "Fitnessstudio", en: "Gym / Fitness" } },
  { value: "bakery", label: { de: "Bäckerei / Konditorei", en: "Bakery" } },
  { value: "lawyer", label: { de: "Rechtsanwalt", en: "Lawyer" } },
  { value: "doctor", label: { de: "Arztpraxis", en: "Medical Practice" } },
  { value: "auto", label: { de: "KFZ-Werkstatt", en: "Auto Repair" } },
  { value: "cleaning", label: { de: "Reinigungsservice", en: "Cleaning Service" } },
  { value: "construction", label: { de: "Bauunternehmen", en: "Construction" } },
  { value: "other", label: { de: "Sonstiges", en: "Other" } },
] as const;
