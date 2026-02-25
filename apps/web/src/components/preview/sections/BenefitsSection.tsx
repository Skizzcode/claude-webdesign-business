"use client";

import React from "react";
import { cn } from "@/lib/utils";
import * as LucideIcons from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

interface BenefitsSectionProps {
  section: any;
  design: any;
  meta: any;
}

function getIcon(iconName?: string) {
  if (!iconName) return LucideIcons.Star;
  // Normalize: convert kebab-case or snake_case to PascalCase
  const normalized = iconName
    .replace(/[-_](.)/g, (_, c) => c.toUpperCase())
    .replace(/^(.)/, (_, c) => c.toUpperCase());
  return (LucideIcons as any)[normalized] || (LucideIcons as any)[iconName] || LucideIcons.Star;
}

export default function BenefitsSection({ section, design, meta }: BenefitsSectionProps) {
  const columns = section.columns || "3";
  const items = section.items || [];

  const colClass: Record<string, string> = {
    "2": "grid-cols-1 sm:grid-cols-2",
    "3": "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
    "4": "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      {(section.headline || section.subtitle) && (
        <div className="text-center mb-10 md:mb-14">
          {section.headline && (
            <h2
              className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3"
              style={{ fontFamily: `"${design.typography.headingFont}", sans-serif` }}
            >
              {section.headline}
            </h2>
          )}
          {section.subtitle && (
            <p
              className="text-base sm:text-lg max-w-2xl mx-auto"
              style={{ color: design.palette.textMuted }}
            >
              {section.subtitle}
            </p>
          )}
        </div>
      )}

      {/* Benefits Grid */}
      <div className={cn("grid gap-6 md:gap-8", colClass[columns] || colClass["3"])}>
        {items.map((item: any, idx: number) => {
          const Icon = getIcon(item.icon);
          return (
            <div
              key={idx}
              className="text-center p-6 md:p-8 transition-all hover:shadow-md"
              style={{
                backgroundColor: design.palette.surface,
                borderRadius: `${design.radius}px`,
              }}
            >
              <div
                className="inline-flex items-center justify-center w-14 h-14 rounded-full mb-5"
                style={{
                  backgroundColor: `${design.palette.primary}15`,
                  color: design.palette.primary,
                }}
              >
                <Icon size={28} strokeWidth={1.5} />
              </div>
              <h3
                className="text-lg font-semibold mb-2"
                style={{ fontFamily: `"${design.typography.headingFont}", sans-serif` }}
              >
                {item.title}
              </h3>
              <p
                className="text-sm leading-relaxed"
                style={{ color: design.palette.textMuted }}
              >
                {item.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
