"use client";

import React from "react";

interface CTABannerSectionProps {
  section: any;
  design: any;
  meta: any;
}

export default function CTABannerSection({ section, design }: CTABannerSectionProps) {
  const buttons = section.buttons || [];

  return (
    <div
      className="text-center px-4 sm:px-6 lg:px-8"
      style={{ color: "#ffffff" }}
    >
      <div className="max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4"
          style={{ fontFamily: `"${design.typography.headingFont}", sans-serif` }}
        >
          {section.headline}
        </h2>
        {section.subtitle && (
          <p className="text-base sm:text-lg mb-8 opacity-90 max-w-xl mx-auto">
            {section.subtitle}
          </p>
        )}
        <div className="flex flex-wrap items-center justify-center gap-3">
          {buttons.map((btn: any, i: number) => (
            <a
              key={i}
              href={btn.href}
              className="inline-flex items-center px-6 py-3 text-sm font-semibold transition-all hover:opacity-90 hover:scale-[1.02]"
              style={{
                borderRadius: `${design.radius}px`,
                backgroundColor: "#ffffff",
                color: design.palette.primary,
              }}
            >
              {btn.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
