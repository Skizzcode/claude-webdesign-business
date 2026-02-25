"use client";

import React from "react";
import * as LucideIcons from "lucide-react";

interface FooterSectionProps {
  section: any;
  design: any;
  meta: any;
}

const socialIconMap: Record<string, any> = {
  facebook: LucideIcons.Facebook,
  instagram: LucideIcons.Instagram,
  twitter: LucideIcons.Twitter,
  linkedin: LucideIcons.Linkedin,
  youtube: LucideIcons.Youtube,
};

export default function FooterSection({ section, design, meta }: FooterSectionProps) {
  const columns = section.columns || [];
  const socialLinks = meta.socialLinks || [];

  return (
    <div style={{ backgroundColor: "#111827", color: "#d1d5db" }} className="px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand column */}
          <div>
            <h4
              className="text-white text-lg font-bold mb-3"
              style={{ fontFamily: `"${design.typography.headingFont}", sans-serif` }}
            >
              {meta.businessName}
            </h4>
            {meta.address && <p className="text-sm mb-1 opacity-70">{meta.address}</p>}
            {meta.phone && <p className="text-sm mb-1 opacity-70">{meta.phone}</p>}
            {meta.email && <p className="text-sm opacity-70">{meta.email}</p>}
            {section.showSocials && socialLinks.length > 0 && (
              <div className="flex gap-3 mt-4">
                {socialLinks.map((link: any, i: number) => {
                  const Icon = socialIconMap[link.platform] || LucideIcons.ExternalLink;
                  return (
                    <a key={i} href={link.url} className="text-gray-400 hover:text-white transition-colors" target="_blank" rel="noopener noreferrer">
                      <Icon size={18} />
                    </a>
                  );
                })}
              </div>
            )}
          </div>

          {/* Dynamic columns */}
          {columns.map((col: any, i: number) => (
            <div key={i}>
              <h4 className="text-white font-semibold text-sm mb-3 uppercase tracking-wider">{col.title}</h4>
              <ul className="space-y-2">
                {col.links?.map((link: any, j: number) => (
                  <li key={j}>
                    <a href={link.href} className="text-sm text-gray-400 hover:text-white transition-colors">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs opacity-50">
          {section.copyright && <p>{section.copyright}</p>}
          {section.showCredit && meta.creditBrand && (
            <p>
              Website by{" "}
              {meta.creditBrand.url ? (
                <a href={meta.creditBrand.url} className="hover:text-white transition-colors">{meta.creditBrand.name}</a>
              ) : (
                meta.creditBrand.name
              )}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
