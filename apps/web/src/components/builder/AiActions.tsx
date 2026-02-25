"use client";

import React, { useState } from "react";
import { Sparkles, Loader2, RefreshCw, HelpCircle, FileText, RotateCcw } from "lucide-react";
import { api } from "@/lib/api";
import { v4, createDefaultSection } from "@website-engine/core";
import type { SiteProject, Page, Section } from "@website-engine/core";

interface AiActionsProps {
  project: SiteProject;
  activePage: Page;
  selectedSection: Section | null | undefined;
  onUpdateSection: (updated: Section) => void;
  onAddPage: (page: Page) => void;
  onAddSection: (section: Section) => void;
  onProjectReloaded?: () => void;
}

export function AiActions({
  project,
  activePage,
  selectedSection,
  onUpdateSection,
  onAddPage,
  onAddSection,
  onProjectReloaded,
}: AiActionsProps) {
  const [rewriteStyle, setRewriteStyle] = useState<string>("shorter");
  const [rewriting, setRewriting] = useState(false);
  const [generatingFaqs, setGeneratingFaqs] = useState(false);
  const [pagePrompt, setPagePrompt] = useState("");
  const [generatingPage, setGeneratingPage] = useState(false);
  const [regenerating, setRegenerating] = useState(false);
  const [regenPreset, setRegenPreset] = useState(project.design.stylePreset);
  const [message, setMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);

  const lang = project.meta.language || "de";

  const showMessage = (text: string, type: "success" | "error") => {
    setMessage({ text, type });
    setTimeout(() => setMessage(null), 3000);
  };

  const handleRewrite = async () => {
    if (!selectedSection) return;
    setRewriting(true);
    try {
      const result = await api.rewriteSection(selectedSection, rewriteStyle, lang);
      onUpdateSection({ ...result, id: selectedSection.id, type: selectedSection.type } as Section);
      showMessage("Section rewritten!", "success");
    } catch (err) {
      showMessage("Rewrite failed: " + err, "error");
    }
    setRewriting(false);
  };

  const handleGenerateFaqs = async () => {
    setGeneratingFaqs(true);
    try {
      const faqs = await api.generateFaqs(
        project.meta.businessName,
        project.meta.industry || "general",
        lang
      );
      const faqSection = {
        ...createDefaultSection("faq"),
        items: faqs,
      } as Section;
      onAddSection(faqSection);
      showMessage(`${faqs.length} FAQs generated!`, "success");
    } catch (err) {
      showMessage("FAQ generation failed: " + err, "error");
    }
    setGeneratingFaqs(false);
  };

  const handleGeneratePage = async () => {
    if (!pagePrompt.trim()) return;
    setGeneratingPage(true);
    try {
      const result = await api.generatePage(
        pagePrompt,
        project.meta.businessName,
        lang,
        project.design.stylePreset
      );
      const newPage: Page = {
        id: v4(),
        slug: result.slug || "new-page",
        title: result.title || "New Page",
        navLabel: result.navLabel || "New",
        showInNav: true,
        sections: result.sections || [],
      };
      onAddPage(newPage);
      setPagePrompt("");
      showMessage(`Page "${newPage.navLabel}" created!`, "success");
    } catch (err) {
      showMessage("Page generation failed: " + err, "error");
    }
    setGeneratingPage(false);
  };

  return (
    <div className="p-4 space-y-6">
      {message && (
        <div className={`text-xs px-3 py-2 rounded-md font-medium ${message.type === "success" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}>
          {message.text}
        </div>
      )}

      {/* Rewrite Section */}
      <div>
        <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 flex items-center gap-1.5">
          <RefreshCw size={12} /> Rewrite Section
        </h4>
        {selectedSection ? (
          <div className="space-y-2">
            <p className="text-xs text-gray-500">
              Rewrite the selected <strong>{selectedSection.type}</strong> section:
            </p>
            <select
              value={rewriteStyle}
              onChange={(e) => setRewriteStyle(e.target.value)}
              className="w-full text-xs px-2.5 py-1.5 border rounded-md bg-white outline-none"
            >
              <option value="shorter">Shorter / More concise</option>
              <option value="longer">Longer / More detailed</option>
              <option value="formal">More formal</option>
              <option value="friendly">More friendly / casual</option>
            </select>
            <button
              onClick={handleRewrite}
              disabled={rewriting}
              className="w-full flex items-center justify-center gap-2 py-2 text-xs font-medium bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 transition"
            >
              {rewriting ? <Loader2 size={14} className="animate-spin" /> : <Sparkles size={14} />}
              {rewriting ? "Rewriting..." : "Rewrite"}
            </button>
          </div>
        ) : (
          <p className="text-xs text-gray-400 italic">Select a section first to rewrite it.</p>
        )}
      </div>

      {/* Generate FAQs */}
      <div>
        <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 flex items-center gap-1.5">
          <HelpCircle size={12} /> Generate FAQs
        </h4>
        <p className="text-xs text-gray-500 mb-2">
          Auto-generate FAQ items for {project.meta.businessName}.
        </p>
        <button
          onClick={handleGenerateFaqs}
          disabled={generatingFaqs}
          className="w-full flex items-center justify-center gap-2 py-2 text-xs font-medium bg-purple-600 text-white rounded-md hover:bg-purple-700 disabled:opacity-50 transition"
        >
          {generatingFaqs ? <Loader2 size={14} className="animate-spin" /> : <HelpCircle size={14} />}
          {generatingFaqs ? "Generating..." : "Generate 6 FAQs"}
        </button>
      </div>

      {/* Regenerate Theme */}
      <div>
        <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 flex items-center gap-1.5">
          <RotateCcw size={12} /> Regenerate Theme
        </h4>
        <p className="text-xs text-gray-500 mb-2">
          Keep business info, regenerate visuals, layout &amp; copy.
        </p>
        <select
          value={regenPreset}
          onChange={(e) => setRegenPreset(e.target.value as typeof regenPreset)}
          className="w-full text-xs px-2.5 py-1.5 border rounded-md bg-white outline-none mb-2"
        >
          <option value="modern_clean">Modern Clean</option>
          <option value="bold">Bold</option>
          <option value="elegant">Elegant</option>
        </select>
        <button
          onClick={async () => {
            setRegenerating(true);
            try {
              await api.regenerateTheme({
                projectId: project.id,
                preset: regenPreset,
                language: lang,
                industryId: project.meta.industry || undefined,
              });
              showMessage("Theme regenerated! Reloading...", "success");
              onProjectReloaded?.();
            } catch (err) {
              showMessage("Regeneration failed: " + err, "error");
            }
            setRegenerating(false);
          }}
          disabled={regenerating}
          className="w-full flex items-center justify-center gap-2 py-2 text-xs font-medium bg-orange-600 text-white rounded-md hover:bg-orange-700 disabled:opacity-50 transition"
        >
          {regenerating ? <Loader2 size={14} className="animate-spin" /> : <RotateCcw size={14} />}
          {regenerating ? "Regenerating..." : "Regenerate Theme"}
        </button>
      </div>

      {/* Generate New Page */}
      <div>
        <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 flex items-center gap-1.5">
          <FileText size={12} /> Generate New Page
        </h4>
        <div className="space-y-2">
          <textarea
            value={pagePrompt}
            onChange={(e) => setPagePrompt(e.target.value)}
            placeholder={lang === "de" ? "z.B. 'Eine Landingpage für unser Sommer-Angebot'" : "e.g. 'A landing page for our summer offer'"}
            rows={3}
            className="w-full text-xs px-2.5 py-1.5 border rounded-md outline-none focus:ring-1 focus:ring-blue-400 resize-y"
          />
          <button
            onClick={handleGeneratePage}
            disabled={generatingPage || !pagePrompt.trim()}
            className="w-full flex items-center justify-center gap-2 py-2 text-xs font-medium bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 transition"
          >
            {generatingPage ? <Loader2 size={14} className="animate-spin" /> : <FileText size={14} />}
            {generatingPage ? "Generating..." : "Create Page"}
          </button>
        </div>
      </div>
    </div>
  );
}
