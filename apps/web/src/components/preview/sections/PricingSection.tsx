"use client";

import React from "react";
import { Check } from "lucide-react";

interface PricingSectionProps {
  section: any;
  design: any;
  meta: any;
}

export default function PricingSection({ section, design }: PricingSectionProps) {
  const tiers = section.tiers || [];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
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
            <p className="text-base sm:text-lg max-w-2xl mx-auto" style={{ color: design.palette.textMuted }}>
              {section.subtitle}
            </p>
          )}
        </div>
      )}
      <div className={`grid gap-6 md:gap-8 ${tiers.length <= 2 ? "grid-cols-1 sm:grid-cols-2 max-w-3xl mx-auto" : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"}`}>
        {tiers.map((tier: any, i: number) => (
          <div
            key={i}
            className="relative flex flex-col p-6 md:p-8 text-center transition-shadow hover:shadow-lg"
            style={{
              borderRadius: `${design.radius}px`,
              border: tier.highlighted ? `2px solid ${design.palette.primary}` : `1px solid ${design.palette.surface}`,
              backgroundColor: tier.highlighted ? `${design.palette.primary}06` : design.palette.surface,
            }}
          >
            {tier.highlighted && (
              <div
                className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs font-semibold text-white px-3 py-1 rounded-full"
                style={{ backgroundColor: design.palette.primary }}
              >
                Empfohlen
              </div>
            )}
            <h3
              className="text-xl font-bold mb-1"
              style={{ fontFamily: `"${design.typography.headingFont}", sans-serif` }}
            >
              {tier.name}
            </h3>
            <div className="my-4">
              <span className="text-4xl font-extrabold" style={{ color: design.palette.primary }}>
                {tier.price}
              </span>
              {tier.period && (
                <span className="text-sm ml-1" style={{ color: design.palette.textMuted }}>
                  {tier.period}
                </span>
              )}
            </div>
            <ul className="space-y-2.5 text-left flex-1 mb-6">
              {tier.features?.map((f: string, j: number) => (
                <li key={j} className="flex items-start gap-2 text-sm">
                  <Check size={16} className="shrink-0 mt-0.5" style={{ color: design.palette.primary }} />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
            {tier.button && (
              <a
                href={tier.button.href}
                className="block w-full py-2.5 text-center text-sm font-semibold transition-colors hover:opacity-90"
                style={{
                  borderRadius: `${design.radius}px`,
                  backgroundColor: tier.highlighted ? design.palette.primary : "transparent",
                  color: tier.highlighted ? "#fff" : design.palette.primary,
                  border: tier.highlighted ? "none" : `2px solid ${design.palette.primary}`,
                }}
              >
                {tier.button.label}
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
