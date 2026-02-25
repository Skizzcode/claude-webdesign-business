"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

interface FaqSectionProps {
  section: any;
  design: any;
  meta: any;
}

function FaqItem({ item, design }: { item: any; design: any }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="overflow-hidden transition-shadow hover:shadow-sm"
      style={{ borderRadius: `${design.radius}px`, backgroundColor: design.palette.surface }}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left font-semibold text-sm sm:text-base transition-colors"
        style={{ color: "inherit" }}
      >
        <span>{item.question}</span>
        <ChevronDown
          size={18}
          className="shrink-0 transition-transform"
          style={{ transform: open ? "rotate(180deg)" : "none", color: design.palette.textMuted }}
        />
      </button>
      {open && (
        <div className="px-5 pb-4 text-sm leading-relaxed" style={{ color: design.palette.textMuted }}>
          {item.answer}
        </div>
      )}
    </div>
  );
}

export default function FaqSection({ section, design }: FaqSectionProps) {
  const items = section.items || [];

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
      {section.headline && (
        <h2
          className="text-2xl sm:text-3xl md:text-4xl font-bold mb-10 text-center"
          style={{ fontFamily: `"${design.typography.headingFont}", sans-serif` }}
        >
          {section.headline}
        </h2>
      )}
      <div className="flex flex-col gap-3">
        {items.map((item: any, i: number) => (
          <FaqItem key={i} item={item} design={design} />
        ))}
      </div>
    </div>
  );
}
