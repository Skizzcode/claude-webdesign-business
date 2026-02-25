"use client";

import React from "react";

interface GallerySectionProps {
  section: any;
  design: any;
  meta: any;
}

export default function GallerySection({ section, design }: GallerySectionProps) {
  const columns = section.columns || "3";
  const images = section.images || [];

  const colClass: Record<string, string> = {
    "2": "grid-cols-1 sm:grid-cols-2",
    "3": "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
    "4": "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4",
  };

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
      <div className={`grid gap-3 md:gap-4 ${colClass[columns] || colClass["3"]}`}>
        {images.map((img: any, i: number) => (
          <div
            key={i}
            className="aspect-[4/3] overflow-hidden group"
            style={{ borderRadius: `${design.radius}px`, backgroundColor: design.palette.surface }}
          >
            {img.src ? (
              <img
                src={img.src}
                alt={img.alt || ""}
                className="w-full h-full object-cover transition-transform group-hover:scale-105"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center" style={{ color: design.palette.textMuted }}>
                <span className="text-sm">Bild {i + 1}</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
