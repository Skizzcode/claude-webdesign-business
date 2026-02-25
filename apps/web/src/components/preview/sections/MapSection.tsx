"use client";

import React from "react";
import { MapPin } from "lucide-react";

interface MapSectionProps {
  section: any;
  design: any;
  meta: any;
}

export default function MapSection({ section, design }: MapSectionProps) {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      {section.headline && (
        <h2
          className="text-2xl sm:text-3xl md:text-4xl font-bold mb-10"
          style={{ fontFamily: `"${design.typography.headingFont}", sans-serif` }}
        >
          {section.headline}
        </h2>
      )}
      <div
        className="p-8 md:p-12 flex flex-col items-center gap-4"
        style={{
          borderRadius: `${design.radius}px`,
          backgroundColor: design.palette.surface,
          backgroundImage: `radial-gradient(circle at 20% 50%, ${design.palette.primary}08 0%, transparent 50%), radial-gradient(circle at 80% 50%, ${design.palette.secondary || design.palette.primary}08 0%, transparent 50%)`,
        }}
      >
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center"
          style={{ backgroundColor: `${design.palette.primary}15`, color: design.palette.primary }}
        >
          <MapPin size={28} />
        </div>
        <p className="text-xl font-semibold">{section.address}</p>
        {section.description && (
          <p className="text-sm max-w-md" style={{ color: design.palette.textMuted }}>
            {section.description}
          </p>
        )}
      </div>
    </div>
  );
}
