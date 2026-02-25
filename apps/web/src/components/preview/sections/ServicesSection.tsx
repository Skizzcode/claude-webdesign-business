"use client";

import React from "react";
import { cn } from "@/lib/utils";
import * as LucideIcons from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

interface ServicesSectionProps {
  section: any;
  design: any;
  meta: any;
}

function getIcon(iconName?: string) {
  if (!iconName) return null;
  const normalized = iconName
    .replace(/[-_](.)/g, (_, c) => c.toUpperCase())
    .replace(/^(.)/, (_, c) => c.toUpperCase());
  return (LucideIcons as any)[normalized] || (LucideIcons as any)[iconName] || LucideIcons.Briefcase;
}

function ServiceButton({ btn, design }: { btn: any; design: any }) {
  const isPrimary = btn.variant === "primary";
  return (
    <a
      href={btn.href}
      className="inline-flex items-center text-sm font-medium transition-colors hover:opacity-80"
      style={{
        color: isPrimary ? "#ffffff" : design.palette.primary,
        backgroundColor: isPrimary ? design.palette.primary : "transparent",
        borderRadius: `${design.radius}px`,
        padding: isPrimary ? "0.5rem 1rem" : "0",
      }}
    >
      {btn.label}
      {!isPrimary && (
        <LucideIcons.ArrowRight size={14} className="ml-1" />
      )}
    </a>
  );
}

export default function ServicesSection({ section, design, meta }: ServicesSectionProps) {
  const layout = section.layout || "cards";
  const items = section.items || [];

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

      {/* Grid / Cards Layout */}
      {(layout === "grid" || layout === "cards") && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {items.map((item: any, idx: number) => {
            const Icon = item.icon ? getIcon(item.icon) : null;
            return (
              <div
                key={idx}
                className={cn(
                  "flex flex-col overflow-hidden transition-all hover:shadow-lg",
                  layout === "cards" && "border border-gray-100"
                )}
                style={{
                  backgroundColor: design.palette.surface,
                  borderRadius: `${design.radius}px`,
                }}
              >
                {item.image?.src && (
                  <div className="aspect-[16/10] overflow-hidden">
                    <img
                      src={item.image.src}
                      alt={item.image.alt || item.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="p-5 md:p-6 flex-1 flex flex-col">
                  {Icon && !item.image?.src && (
                    <div
                      className="inline-flex items-center justify-center w-11 h-11 rounded-lg mb-4"
                      style={{
                        backgroundColor: `${design.palette.primary}12`,
                        color: design.palette.primary,
                      }}
                    >
                      <Icon size={22} strokeWidth={1.5} />
                    </div>
                  )}
                  <h3
                    className="text-lg font-semibold mb-2"
                    style={{ fontFamily: `"${design.typography.headingFont}", sans-serif` }}
                  >
                    {item.title}
                  </h3>
                  <p
                    className="text-sm leading-relaxed flex-1"
                    style={{ color: design.palette.textMuted }}
                  >
                    {item.description}
                  </p>
                  {item.price && (
                    <p
                      className="mt-3 text-lg font-bold"
                      style={{ color: design.palette.primary }}
                    >
                      {item.price}
                    </p>
                  )}
                  {item.button && (
                    <div className="mt-4">
                      <ServiceButton btn={item.button} design={design} />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* List Layout */}
      {layout === "list" && (
        <div className="space-y-6">
          {items.map((item: any, idx: number) => {
            const Icon = item.icon ? getIcon(item.icon) : null;
            return (
              <div
                key={idx}
                className="flex flex-col sm:flex-row gap-5 p-5 md:p-6 transition-all hover:shadow-md"
                style={{
                  backgroundColor: design.palette.surface,
                  borderRadius: `${design.radius}px`,
                }}
              >
                {item.image?.src && (
                  <div
                    className="sm:w-48 shrink-0 aspect-[4/3] sm:aspect-auto overflow-hidden"
                    style={{ borderRadius: `${Math.max(design.radius - 4, 0)}px` }}
                  >
                    <img
                      src={item.image.src}
                      alt={item.image.alt || item.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                {!item.image?.src && Icon && (
                  <div
                    className="w-14 h-14 shrink-0 flex items-center justify-center rounded-lg"
                    style={{
                      backgroundColor: `${design.palette.primary}12`,
                      color: design.palette.primary,
                    }}
                  >
                    <Icon size={24} strokeWidth={1.5} />
                  </div>
                )}
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-4">
                    <h3
                      className="text-lg font-semibold mb-1"
                      style={{ fontFamily: `"${design.typography.headingFont}", sans-serif` }}
                    >
                      {item.title}
                    </h3>
                    {item.price && (
                      <span
                        className="text-lg font-bold whitespace-nowrap"
                        style={{ color: design.palette.primary }}
                      >
                        {item.price}
                      </span>
                    )}
                  </div>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: design.palette.textMuted }}
                  >
                    {item.description}
                  </p>
                  {item.button && (
                    <div className="mt-3">
                      <ServiceButton btn={item.button} design={design} />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
