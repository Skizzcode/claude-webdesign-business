"use client";

import React from "react";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

interface ContactSectionProps {
  section: any;
  design: any;
  meta: any;
}

export default function ContactSection({ section, design, meta }: ContactSectionProps) {
  const fields = section.fields || [];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
        {/* Info Side */}
        <div>
          {section.headline && (
            <h2
              className="text-2xl sm:text-3xl font-bold mb-3"
              style={{ fontFamily: `"${design.typography.headingFont}", sans-serif` }}
            >
              {section.headline}
            </h2>
          )}
          {section.subtitle && (
            <p className="mb-6 text-base" style={{ color: design.palette.textMuted }}>
              {section.subtitle}
            </p>
          )}
          <div className="space-y-4">
            {section.showPhone && meta.phone && (
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${design.palette.primary}12`, color: design.palette.primary }}>
                  <Phone size={18} />
                </div>
                <div>
                  <p className="text-xs font-medium" style={{ color: design.palette.textMuted }}>Telefon</p>
                  <a href={`tel:${meta.phone}`} className="font-medium text-sm" style={{ color: "inherit" }}>{meta.phone}</a>
                </div>
              </div>
            )}
            {section.showEmail && meta.email && (
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${design.palette.primary}12`, color: design.palette.primary }}>
                  <Mail size={18} />
                </div>
                <div>
                  <p className="text-xs font-medium" style={{ color: design.palette.textMuted }}>E-Mail</p>
                  <a href={`mailto:${meta.email}`} className="font-medium text-sm" style={{ color: "inherit" }}>{meta.email}</a>
                </div>
              </div>
            )}
            {section.showAddress && meta.address && (
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${design.palette.primary}12`, color: design.palette.primary }}>
                  <MapPin size={18} />
                </div>
                <div>
                  <p className="text-xs font-medium" style={{ color: design.palette.textMuted }}>Adresse</p>
                  <p className="font-medium text-sm">{meta.address}</p>
                </div>
              </div>
            )}
            {section.showHours && meta.openingHours && (
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${design.palette.primary}12`, color: design.palette.primary }}>
                  <Clock size={18} />
                </div>
                <div>
                  <p className="text-xs font-medium" style={{ color: design.palette.textMuted }}>Öffnungszeiten</p>
                  <p className="font-medium text-sm">{meta.openingHours}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Form Side */}
        <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
          {fields.map((field: any) => (
            <div key={field.name}>
              <label className="block text-sm font-medium mb-1.5">
                {field.label}
                {field.required && <span style={{ color: design.palette.primary }}> *</span>}
              </label>
              {field.type === "textarea" ? (
                <textarea
                  rows={4}
                  className="w-full px-3 py-2.5 text-sm border outline-none transition-shadow focus:ring-2"
                  style={{ borderRadius: `${design.radius}px`, borderColor: design.palette.surface }}
                />
              ) : field.type === "select" ? (
                <select
                  className="w-full px-3 py-2.5 text-sm border bg-white outline-none"
                  style={{ borderRadius: `${design.radius}px`, borderColor: design.palette.surface }}
                >
                  <option value="">Bitte wählen...</option>
                  {field.options?.map((opt: string) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              ) : (
                <input
                  type={field.type}
                  className="w-full px-3 py-2.5 text-sm border outline-none transition-shadow focus:ring-2"
                  style={{ borderRadius: `${design.radius}px`, borderColor: design.palette.surface }}
                />
              )}
            </div>
          ))}
          <button
            type="submit"
            className="w-full py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90 mt-2"
            style={{ backgroundColor: design.palette.primary, borderRadius: `${design.radius}px` }}
          >
            {section.submitLabel || "Absenden"}
          </button>
        </form>
      </div>
    </div>
  );
}
