"use client";

import React from "react";
import { User } from "lucide-react";

interface TeamSectionProps {
  section: any;
  design: any;
  meta: any;
}

export default function TeamSection({ section, design }: TeamSectionProps) {
  const members = section.members || [];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      {section.headline && (
        <h2
          className="text-2xl sm:text-3xl md:text-4xl font-bold mb-10 text-center"
          style={{ fontFamily: `"${design.typography.headingFont}", sans-serif` }}
        >
          {section.headline}
        </h2>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {members.map((m: any, i: number) => (
          <div key={i} className="text-center">
            <div
              className="w-32 h-32 mx-auto mb-4 overflow-hidden flex items-center justify-center"
              style={{
                borderRadius: "50%",
                backgroundColor: design.palette.surface,
              }}
            >
              {m.image?.src ? (
                <img src={m.image.src} alt={m.name} className="w-full h-full object-cover" />
              ) : (
                <User size={40} style={{ color: design.palette.textMuted }} />
              )}
            </div>
            <h3
              className="text-lg font-semibold"
              style={{ fontFamily: `"${design.typography.headingFont}", sans-serif` }}
            >
              {m.name}
            </h3>
            <p className="text-sm mt-0.5" style={{ color: design.palette.primary }}>
              {m.role}
            </p>
            {m.bio && (
              <p className="text-sm mt-2 max-w-xs mx-auto" style={{ color: design.palette.textMuted }}>
                {m.bio}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
