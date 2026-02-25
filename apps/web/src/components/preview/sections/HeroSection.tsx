"use client";

import React from "react";
import { cn } from "@/lib/utils";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

interface HeroSectionProps {
  section: any;
  design: any;
  meta: any;
}

function HeroButton({ btn, design, idx }: { btn: any; design: any; idx: number }) {
  const isPrimary = btn.variant === "primary" || (!btn.variant && idx === 0);
  const isOutline = btn.variant === "outline";
  const isGhost = btn.variant === "ghost";

  return (
    <a
      href={btn.href}
      className={cn(
        "inline-flex items-center justify-center px-6 py-3 text-sm font-semibold transition-all",
        "hover:opacity-90 hover:scale-[1.02]",
        isGhost && "underline underline-offset-4"
      )}
      style={{
        borderRadius: `${design.radius}px`,
        ...(isPrimary
          ? {
              backgroundColor: design.palette.primary,
              color: "#ffffff",
            }
          : isOutline
          ? {
              border: `2px solid ${design.palette.primary}`,
              color: design.palette.primary,
              backgroundColor: "transparent",
            }
          : isGhost
          ? {
              color: design.palette.primary,
              backgroundColor: "transparent",
            }
          : {
              backgroundColor: design.palette.secondary,
              color: "#ffffff",
            }),
      }}
    >
      {btn.label}
    </a>
  );
}

export default function HeroSection({ section, design, meta }: HeroSectionProps) {
  const layout = section.layout || "centered";
  const hasImage = !!section.image?.src;

  const headingStyle: React.CSSProperties = {
    fontFamily: `"${design.typography.headingFont}", sans-serif`,
    lineHeight: 1.15,
  };

  // Centered layout
  if (layout === "centered") {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4" style={headingStyle}>
          {section.headline}
        </h1>
        {section.subheadline && (
          <p
            className="text-lg sm:text-xl md:text-2xl mb-8 max-w-2xl mx-auto"
            style={{ color: "inherit", opacity: 0.8 }}
          >
            {section.subheadline}
          </p>
        )}
        {section.buttons?.length > 0 && (
          <div className="flex flex-wrap items-center justify-center gap-3">
            {section.buttons.map((btn: any, i: number) => (
              <HeroButton key={i} btn={btn} design={design} idx={i} />
            ))}
          </div>
        )}
        {hasImage && (
          <div className="mt-10">
            <img
              src={section.image.src}
              alt={section.image.alt || ""}
              className="w-full max-w-3xl mx-auto rounded-lg object-cover"
              style={{ borderRadius: `${design.radius}px` }}
            />
          </div>
        )}
      </div>
    );
  }

  // Background image layout
  if (layout === "bg_image") {
    return (
      <div className="relative min-h-[400px] sm:min-h-[500px] flex items-center justify-center">
        {hasImage && (
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${section.image.src})` }}
          >
            <div className="absolute inset-0 bg-black/50" />
          </div>
        )}
        {!hasImage && (
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(135deg, ${design.palette.primary}dd, ${design.palette.secondary || design.palette.primary}cc)`,
            }}
          />
        )}
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4" style={headingStyle}>
            {section.headline}
          </h1>
          {section.subheadline && (
            <p className="text-lg sm:text-xl md:text-2xl mb-8 max-w-2xl mx-auto opacity-90">
              {section.subheadline}
            </p>
          )}
          {section.buttons?.length > 0 && (
            <div className="flex flex-wrap items-center justify-center gap-3">
              {section.buttons.map((btn: any, i: number) => (
                <HeroButton key={i} btn={btn} design={design} idx={i} />
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  // Split left / split right
  const isLeft = layout === "split_left";
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div
        className={cn(
          "grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center",
          !isLeft && "md:[direction:rtl]"
        )}
      >
        {/* Text side */}
        <div className={cn(!isLeft && "md:[direction:ltr]")}>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4" style={headingStyle}>
            {section.headline}
          </h1>
          {section.subheadline && (
            <p
              className="text-lg sm:text-xl mb-8"
              style={{ color: "inherit", opacity: 0.8 }}
            >
              {section.subheadline}
            </p>
          )}
          {section.buttons?.length > 0 && (
            <div className="flex flex-wrap items-start gap-3">
              {section.buttons.map((btn: any, i: number) => (
                <HeroButton key={i} btn={btn} design={design} idx={i} />
              ))}
            </div>
          )}
        </div>

        {/* Image side */}
        <div className={cn(!isLeft && "md:[direction:ltr]")}>
          {hasImage ? (
            <img
              src={section.image.src}
              alt={section.image.alt || ""}
              className="w-full h-auto rounded-lg object-cover"
              style={{ borderRadius: `${design.radius}px` }}
            />
          ) : (
            <div
              className="w-full aspect-[4/3] rounded-lg flex items-center justify-center"
              style={{
                background: `linear-gradient(135deg, ${design.palette.surface}, ${design.palette.primary}22)`,
                borderRadius: `${design.radius}px`,
              }}
            >
              <span style={{ color: design.palette.textMuted }} className="text-sm">
                Image Placeholder
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
