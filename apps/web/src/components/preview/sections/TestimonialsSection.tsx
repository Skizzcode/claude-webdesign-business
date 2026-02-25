"use client";

import React from "react";
import { Quote, Star } from "lucide-react";

interface TestimonialsSectionProps {
  section: any;
  design: any;
  meta: any;
}

export default function TestimonialsSection({ section, design }: TestimonialsSectionProps) {
  const items = section.items || [];
  const layout = section.layout || "grid";

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
      <div
        className={
          layout === "stacked"
            ? "flex flex-col gap-6 max-w-2xl mx-auto"
            : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        }
      >
        {items.map((item: any, i: number) => (
          <blockquote
            key={i}
            className="flex flex-col p-6 md:p-8 transition-shadow hover:shadow-md"
            style={{
              borderRadius: `${design.radius}px`,
              backgroundColor: design.palette.surface,
              borderLeft: `4px solid ${design.palette.primary}`,
            }}
          >
            <Quote size={24} className="mb-3 opacity-20" />
            {item.rating && (
              <div className="flex gap-0.5 mb-3">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star
                    key={j}
                    size={16}
                    fill={j < item.rating ? "#f59e0b" : "transparent"}
                    stroke={j < item.rating ? "#f59e0b" : "#d1d5db"}
                  />
                ))}
              </div>
            )}
            <p className="flex-1 text-sm sm:text-base leading-relaxed italic mb-4">
              &ldquo;{item.quote}&rdquo;
            </p>
            <footer className="flex items-center gap-3 mt-auto">
              {item.image?.src && (
                <div className="w-10 h-10 rounded-full overflow-hidden shrink-0" style={{ backgroundColor: design.palette.primary + "20" }}>
                  <img src={item.image.src} alt={item.author} className="w-full h-full object-cover" />
                </div>
              )}
              <div>
                <div className="font-semibold text-sm">{item.author}</div>
                {item.role && (
                  <div className="text-xs" style={{ color: design.palette.textMuted }}>
                    {item.role}
                  </div>
                )}
              </div>
            </footer>
          </blockquote>
        ))}
      </div>
    </div>
  );
}
