"use client";

import React from "react";
import type { Design, Meta } from "@website-engine/core";
import { INDUSTRIES } from "@website-engine/core";

interface BrandKitProps {
  design: Design;
  meta: Meta;
  onUpdateDesign: (updater: (d: Design) => Design) => void;
  onUpdateMeta: (updater: (m: Meta) => Meta) => void;
}

function ColorField({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div className="flex items-center gap-2">
      <input
        type="color"
        value={value || "#000000"}
        onChange={(e) => onChange(e.target.value)}
        className="w-7 h-7 rounded border cursor-pointer"
        style={{ padding: 1 }}
      />
      <div className="flex-1">
        <label className="text-xs font-medium text-gray-600">{label}</label>
        <input
          type="text"
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          className="block w-full text-xs px-2 py-1 border rounded outline-none focus:ring-1 focus:ring-blue-400 font-mono"
        />
      </div>
    </div>
  );
}

export function BrandKit({ design, meta, onUpdateDesign, onUpdateMeta }: BrandKitProps) {
  return (
    <div className="p-4 space-y-6">
      {/* Business Info */}
      <div>
        <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Business Info</h4>
        <div className="space-y-2">
          {/* Industry display */}
          {meta.industryClassification && (
            <div className="p-2.5 bg-blue-50 rounded-md border border-blue-100">
              <div className="flex items-center justify-between">
                <div>
                  <label className="text-xs font-medium text-blue-700">Detected Industry</label>
                  <p className="text-xs text-blue-600">
                    {INDUSTRIES.find((i) => i.value === meta.industryClassification?.industryId)?.label.de || meta.industryClassification.industryId}
                    {" "}({Math.round((meta.industryClassification.confidence || 0) * 100)}%)
                  </p>
                </div>
              </div>
            </div>
          )}
          <div>
            <label className="text-xs font-medium text-gray-600">Industry</label>
            <select
              value={meta.industry || ""}
              onChange={(e) => onUpdateMeta((m) => ({ ...m, industry: e.target.value }))}
              className="w-full text-xs px-2.5 py-1.5 border rounded-md bg-white outline-none focus:ring-1 focus:ring-blue-400"
            >
              <option value="">Not set</option>
              {INDUSTRIES.map((ind) => (
                <option key={ind.value} value={ind.value}>{ind.label.de}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-xs font-medium text-gray-600">Business Name</label>
            <input type="text" value={meta.businessName || ""} onChange={(e) => onUpdateMeta((m) => ({ ...m, businessName: e.target.value }))} className="w-full text-xs px-2.5 py-1.5 border rounded-md outline-none focus:ring-1 focus:ring-blue-400" />
          </div>
          <div>
            <label className="text-xs font-medium text-gray-600">Phone</label>
            <input type="text" value={meta.phone || ""} onChange={(e) => onUpdateMeta((m) => ({ ...m, phone: e.target.value }))} className="w-full text-xs px-2.5 py-1.5 border rounded-md outline-none focus:ring-1 focus:ring-blue-400" />
          </div>
          <div>
            <label className="text-xs font-medium text-gray-600">Email</label>
            <input type="text" value={meta.email || ""} onChange={(e) => onUpdateMeta((m) => ({ ...m, email: e.target.value }))} className="w-full text-xs px-2.5 py-1.5 border rounded-md outline-none focus:ring-1 focus:ring-blue-400" />
          </div>
          <div>
            <label className="text-xs font-medium text-gray-600">Address</label>
            <input type="text" value={meta.address || ""} onChange={(e) => onUpdateMeta((m) => ({ ...m, address: e.target.value }))} className="w-full text-xs px-2.5 py-1.5 border rounded-md outline-none focus:ring-1 focus:ring-blue-400" />
          </div>
          <div>
            <label className="text-xs font-medium text-gray-600">Opening Hours</label>
            <input type="text" value={meta.openingHours || ""} onChange={(e) => onUpdateMeta((m) => ({ ...m, openingHours: e.target.value }))} className="w-full text-xs px-2.5 py-1.5 border rounded-md outline-none focus:ring-1 focus:ring-blue-400" />
          </div>
          <div>
            <label className="text-xs font-medium text-gray-600">Language</label>
            <div className="flex gap-2 mt-1">
              {(["de", "en"] as const).map((lang) => (
                <button key={lang} onClick={() => onUpdateMeta((m) => ({ ...m, language: lang }))} className={`flex-1 py-1.5 text-xs rounded border font-medium transition ${meta.language === lang ? "border-blue-500 bg-blue-50 text-blue-700" : "border-gray-200 text-gray-600 hover:border-gray-300"}`}>
                  {lang === "de" ? "Deutsch" : "English"}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Colors */}
      <div>
        <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Colors</h4>
        <div className="space-y-2.5">
          <ColorField label="Primary" value={design.palette.primary} onChange={(v) => onUpdateDesign((d) => ({ ...d, palette: { ...d.palette, primary: v } }))} />
          <ColorField label="Secondary" value={design.palette.secondary} onChange={(v) => onUpdateDesign((d) => ({ ...d, palette: { ...d.palette, secondary: v } }))} />
          <ColorField label="Background" value={design.palette.background} onChange={(v) => onUpdateDesign((d) => ({ ...d, palette: { ...d.palette, background: v } }))} />
          <ColorField label="Surface" value={design.palette.surface} onChange={(v) => onUpdateDesign((d) => ({ ...d, palette: { ...d.palette, surface: v } }))} />
          <ColorField label="Text" value={design.palette.text} onChange={(v) => onUpdateDesign((d) => ({ ...d, palette: { ...d.palette, text: v } }))} />
          <ColorField label="Muted Text" value={design.palette.textMuted} onChange={(v) => onUpdateDesign((d) => ({ ...d, palette: { ...d.palette, textMuted: v } }))} />
        </div>
      </div>

      {/* Typography */}
      <div>
        <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Typography</h4>
        <div className="space-y-2">
          <div>
            <label className="text-xs font-medium text-gray-600">Heading Font</label>
            <input type="text" value={design.typography.headingFont} onChange={(e) => onUpdateDesign((d) => ({ ...d, typography: { ...d.typography, headingFont: e.target.value } }))} className="w-full text-xs px-2.5 py-1.5 border rounded-md outline-none focus:ring-1 focus:ring-blue-400" placeholder="Google Fonts name" />
          </div>
          <div>
            <label className="text-xs font-medium text-gray-600">Body Font</label>
            <input type="text" value={design.typography.bodyFont} onChange={(e) => onUpdateDesign((d) => ({ ...d, typography: { ...d.typography, bodyFont: e.target.value } }))} className="w-full text-xs px-2.5 py-1.5 border rounded-md outline-none focus:ring-1 focus:ring-blue-400" placeholder="Google Fonts name" />
          </div>
        </div>
      </div>

      {/* Border Radius */}
      <div>
        <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Style</h4>
        <div className="space-y-2">
          <div>
            <div className="flex justify-between mb-1">
              <label className="text-xs font-medium text-gray-600">Border Radius</label>
              <span className="text-xs text-gray-400">{design.radius}px</span>
            </div>
            <input type="range" min={0} max={24} value={design.radius} onChange={(e) => onUpdateDesign((d) => ({ ...d, radius: Number(e.target.value) }))} className="w-full accent-blue-500" />
          </div>
          <div>
            <label className="text-xs font-medium text-gray-600">Spacing</label>
            <div className="flex gap-2 mt-1">
              {(["compact", "normal", "airy"] as const).map((sp) => (
                <button key={sp} onClick={() => onUpdateDesign((d) => ({ ...d, spacing: sp }))} className={`flex-1 py-1.5 text-xs rounded border font-medium transition capitalize ${design.spacing === sp ? "border-blue-500 bg-blue-50 text-blue-700" : "border-gray-200 text-gray-600 hover:border-gray-300"}`}>
                  {sp}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
