"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { renderSection } from "./sections";

interface SitePreviewProps {
  project: any;
  page: any;
  selectedSectionId?: string | null;
  onSelectSection?: (id: string) => void;
  isBuilder?: boolean;
}

export function SitePreview({
  project,
  page,
  selectedSectionId,
  onSelectSection,
  isBuilder = false,
}: SitePreviewProps) {
  const { design, meta } = project;
  const pages = project.pages || [];

  const spacingMap: Record<string, string> = {
    none: "0",
    sm: "1.5rem",
    md: "3rem",
    lg: "5rem",
  };

  const bgMap: Record<string, { bg: string; text: string }> = {
    default: { bg: design.palette.background, text: design.palette.text },
    surface: { bg: design.palette.surface, text: design.palette.text },
    primary: { bg: design.palette.primary, text: "#ffffff" },
    dark: { bg: "#1a1a2e", text: "#ffffff" },
  };

  return (
    <div
      style={{
        fontFamily: `"${design.typography.bodyFont}", sans-serif`,
        color: design.palette.text,
        backgroundColor: design.palette.background,
      }}
    >
      {/* Navigation Bar */}
      <nav
        style={{
          backgroundColor: design.palette.background,
          borderBottom: `1px solid ${design.palette.surface}`,
        }}
        className="sticky top-0 z-40"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo / Business Name */}
            <div className="flex items-center gap-3">
              <span
                className="text-lg font-bold tracking-tight"
                style={{
                  fontFamily: `"${design.typography.headingFont}", sans-serif`,
                  color: design.palette.primary,
                }}
              >
                {meta.businessName}
              </span>
              {isBuilder && (
                <span className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-yellow-50 text-yellow-700 border border-yellow-200 uppercase tracking-wider whitespace-nowrap">
                  Preview / Concept
                </span>
              )}
            </div>

            {/* Nav Links */}
            <div className="hidden md:flex items-center gap-1">
              {pages
                .filter((p: any) => p.showInNav !== false)
                .map((p: any) => (
                  <a
                    key={p.id}
                    href={`#${p.slug}`}
                    className="px-3 py-2 text-sm font-medium rounded-md transition-colors hover:opacity-80"
                    style={{
                      color:
                        p.id === page.id
                          ? design.palette.primary
                          : design.palette.textMuted,
                    }}
                  >
                    {p.navLabel}
                  </a>
                ))}
              {meta.primaryCTA && (
                <a
                  href={meta.primaryCTA.href}
                  className="ml-2 px-4 py-2 text-sm font-medium text-white rounded-md transition-colors hover:opacity-90"
                  style={{
                    backgroundColor: design.palette.primary,
                    borderRadius: `${design.radius}px`,
                  }}
                >
                  {meta.primaryCTA.label}
                </a>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Section Renderer */}
      <main>
        {page.sections
          .filter((s: any) => s.visible !== false)
          .map((section: any) => {
            const bg = bgMap[section.background] || bgMap.default;
            const isSelected = selectedSectionId === section.id;

            return (
              <div
                key={section.id}
                onClick={
                  isBuilder
                    ? (e) => {
                        e.stopPropagation();
                        onSelectSection?.(section.id);
                      }
                    : undefined
                }
                className={cn(
                  "relative transition-all",
                  isBuilder && "cursor-pointer",
                  isBuilder && !isSelected && "hover:ring-2 hover:ring-blue-300 hover:ring-inset",
                  isSelected && "ring-2 ring-blue-500 ring-inset"
                )}
                style={{
                  backgroundColor: bg.bg,
                  color: bg.text,
                  paddingTop: spacingMap[section.paddingTop] || spacingMap.md,
                  paddingBottom: spacingMap[section.paddingBottom] || spacingMap.md,
                }}
              >
                {isBuilder && isSelected && (
                  <div className="absolute top-0 left-0 bg-blue-500 text-white text-[10px] font-semibold px-2 py-0.5 rounded-br z-10 uppercase tracking-wider">
                    {section.type}
                  </div>
                )}
                {renderSection(section, design, meta)}
              </div>
            );
          })}
      </main>
    </div>
  );
}
