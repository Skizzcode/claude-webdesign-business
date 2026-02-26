"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useProject } from "@/hooks/useProject";
import { PageManager } from "@/components/builder/PageManager";
import { SectionList } from "@/components/builder/SectionList";
import { InspectorPanel } from "@/components/builder/InspectorPanel";
import { SitePreview } from "@/components/preview/SitePreview";
import { BrandKit } from "@/components/builder/BrandKit";
import { AiActions } from "@/components/builder/AiActions";
import { MediaLibrary } from "@/components/builder/MediaLibrary";
import {
  ArrowLeft,
  Eye,
  Smartphone,
  Monitor,
  Save,
  Download,
  Palette,
  Sparkles,
  Image,
  Loader2,
  CheckCircle,
  ClipboardCheck,
} from "lucide-react";
import Link from "next/link";
import { api, type AuditReport, type AuditIssue } from "@/lib/api";

export default function BuilderPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const {
    project,
    loading,
    error,
    saving,
    updatePage,
    updateSection,
    addSection,
    removeSection,
    reorderSections,
    addPage,
    removePage,
    updateDesign,
    updateMeta,
    save,
    reload,
  } = useProject(id);

  const [activePageId, setActivePageId] = useState<string>("");
  const [selectedSectionId, setSelectedSectionId] = useState<string | null>(null);
  const [previewMode, setPreviewMode] = useState<"desktop" | "mobile">("desktop");
  const [showPreview, setShowPreview] = useState(false);
  const [rightPanel, setRightPanel] = useState<"inspector" | "brand" | "ai" | "media" | "audit">("inspector");
  const [exporting, setExporting] = useState(false);
  const [exportDone, setExportDone] = useState(false);

  // Set initial active page
  if (project && !activePageId && project.pages.length > 0) {
    setActivePageId(project.pages[0].id);
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-400">
        <Loader2 className="animate-spin mr-2" size={20} />
        Loading project...
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error || "Project not found"}</p>
          <Link href="/" className="text-blue-600 hover:underline">
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  const activePage = project.pages.find((p) => p.id === activePageId) || project.pages[0];
  const selectedSection = activePage?.sections.find((s) => s.id === selectedSectionId);

  const handleExport = async () => {
    setExporting(true);
    try {
      await api.exportProject(project.id);
      setExportDone(true);
      setTimeout(() => setExportDone(false), 3000);
    } catch (err) {
      alert("Export failed: " + err);
    }
    setExporting(false);
  };

  if (showPreview) {
    return (
      <div className="min-h-screen bg-gray-100">
        <div className="bg-white border-b px-4 py-2 flex items-center justify-between sticky top-0 z-50">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowPreview(false)}
              className="text-sm text-gray-600 hover:text-gray-900 flex items-center gap-1"
            >
              <ArrowLeft size={16} /> Back to Builder
            </button>
            <span className="text-xs text-gray-400 bg-yellow-50 text-yellow-700 px-2 py-0.5 rounded">
              PREVIEW / CONCEPT
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPreviewMode("desktop")}
              className={`p-1.5 rounded ${previewMode === "desktop" ? "bg-gray-100 text-gray-900" : "text-gray-400"}`}
            >
              <Monitor size={18} />
            </button>
            <button
              onClick={() => setPreviewMode("mobile")}
              className={`p-1.5 rounded ${previewMode === "mobile" ? "bg-gray-100 text-gray-900" : "text-gray-400"}`}
            >
              <Smartphone size={18} />
            </button>
          </div>
        </div>
        <div className="flex justify-center p-4">
          <div
            className="bg-white shadow-xl transition-all duration-300"
            style={{ width: previewMode === "mobile" ? 390 : "100%", maxWidth: 1440 }}
          >
            <SitePreview project={project} page={activePage} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-gray-50">
      {/* Top Bar */}
      <header className="bg-white border-b px-4 py-2 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <Link href="/" className="text-gray-400 hover:text-gray-600">
            <ArrowLeft size={18} />
          </Link>
          <div>
            <h1 className="text-sm font-semibold text-gray-900">{project.meta.businessName}</h1>
            <span className="text-xs text-yellow-600 bg-yellow-50 px-1.5 py-0.5 rounded">
              PREVIEW / CONCEPT
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {saving && (
            <span className="text-xs text-gray-400 flex items-center gap-1">
              <Loader2 size={12} className="animate-spin" /> Saving...
            </span>
          )}
          <button
            onClick={() => setShowPreview(true)}
            className="text-sm px-3 py-1.5 rounded border hover:bg-gray-50 flex items-center gap-1.5 text-gray-700"
          >
            <Eye size={14} /> Preview
          </button>
          <button
            onClick={handleExport}
            disabled={exporting}
            className="text-sm px-3 py-1.5 rounded bg-blue-600 text-white hover:bg-blue-700 flex items-center gap-1.5 disabled:opacity-50"
          >
            {exporting ? <Loader2 size={14} className="animate-spin" /> : exportDone ? <CheckCircle size={14} /> : <Download size={14} />}
            {exportDone ? "Exported!" : "Export"}
          </button>
        </div>
      </header>

      {/* Main Builder Layout */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left: Page Manager + Section List */}
        <div className="w-64 bg-white border-r flex flex-col shrink-0 overflow-hidden">
          <PageManager
            pages={project.pages}
            activePageId={activePageId}
            onSelectPage={setActivePageId}
            onAddPage={addPage}
            onRemovePage={removePage}
            onUpdatePage={updatePage}
          />
          <div className="border-t flex-1 overflow-hidden">
            {activePage && (
              <SectionList
                page={activePage}
                selectedSectionId={selectedSectionId}
                onSelectSection={setSelectedSectionId}
                onAddSection={(section) => addSection(activePage.id, section)}
                onRemoveSection={(sectionId) => removeSection(activePage.id, sectionId)}
                onReorder={(sections) => reorderSections(activePage.id, sections)}
              />
            )}
          </div>
        </div>

        {/* Center: Live Preview */}
        <div className="flex-1 overflow-auto bg-gray-100 p-4">
          <div className="bg-white shadow-sm rounded-lg overflow-hidden max-w-5xl mx-auto">
            {activePage && (
              <SitePreview
                project={project}
                page={activePage}
                selectedSectionId={selectedSectionId}
                onSelectSection={setSelectedSectionId}
                isBuilder
              />
            )}
          </div>
        </div>

        {/* Right: Inspector / Brand Kit / AI / Media */}
        <div className="w-80 bg-white border-l flex flex-col shrink-0 overflow-hidden">
          {/* Tab bar */}
          <div className="flex border-b shrink-0">
            {[
              { key: "inspector", icon: <Eye size={14} />, label: "Inspector" },
              { key: "brand", icon: <Palette size={14} />, label: "Brand" },
              { key: "ai", icon: <Sparkles size={14} />, label: "AI" },
              { key: "media", icon: <Image size={14} />, label: "Media" },
              { key: "audit", icon: <ClipboardCheck size={14} />, label: "Audit" },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setRightPanel(tab.key as any)}
                className={`flex-1 py-2 text-xs font-medium flex items-center justify-center gap-1 transition ${
                  rightPanel === tab.key
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {tab.icon} {tab.label}
              </button>
            ))}
          </div>

          {/* Panel content */}
          <div className="flex-1 overflow-y-auto">
            {rightPanel === "inspector" && selectedSection && activePage && (
              <InspectorPanel
                section={selectedSection}
                onUpdate={(updated) =>
                  updateSection(activePage.id, selectedSection.id, () => updated as any)
                }
              />
            )}
            {rightPanel === "inspector" && !selectedSection && (
              <div className="p-6 text-center text-gray-400 text-sm">
                Select a section to edit its properties.
              </div>
            )}
            {rightPanel === "brand" && (
              <BrandKit
                design={project.design}
                meta={project.meta}
                onUpdateDesign={updateDesign}
                onUpdateMeta={updateMeta}
              />
            )}
            {rightPanel === "ai" && activePage && (
              <AiActions
                project={project}
                activePage={activePage}
                selectedSection={selectedSection}
                onUpdateSection={(updated) => {
                  if (selectedSection) {
                    updateSection(activePage.id, selectedSection.id, () => updated as any);
                  }
                }}
                onAddPage={addPage}
                onAddSection={(section) => addSection(activePage.id, section)}
                onProjectReloaded={reload}
              />
            )}
            {rightPanel === "media" && (
              <MediaLibrary
                projectId={project.id}
                scrapedImagesAllowed={project.assets?.scrapedImagesAllowed ?? false}
                onToggleScrapedImages={(allowed) => {
                  save({
                    ...project,
                    assets: { ...project.assets, scrapedImagesAllowed: allowed },
                  });
                }}
              />
            )}
            {rightPanel === "audit" && (
              <AuditPanel report={project.meta?.audit as AuditReport | undefined} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Audit Panel ────────────────────────────────────────────

function AuditPanel({ report }: { report: AuditReport | undefined }) {
  if (!report) {
    return (
      <div className="p-6 text-center text-gray-400 text-sm">
        <ClipboardCheck size={32} className="mx-auto mb-3 opacity-30" />
        <p className="font-medium text-gray-500 mb-1">Kein Audit vorhanden</p>
        <p className="text-xs">Starte einen neuen Scan über den Wizard.</p>
      </div>
    );
  }

  const severityIcon = (s: AuditIssue["severity"]) => {
    if (s === "critical") return <span className="w-2 h-2 rounded-full bg-red-500 shrink-0 inline-block" />;
    if (s === "major") return <span className="w-2 h-2 rounded-full bg-yellow-500 shrink-0 inline-block" />;
    return <span className="w-2 h-2 rounded-full bg-gray-400 shrink-0 inline-block" />;
  };

  const criticals = report.issues.filter((i) => i.severity === "critical").length;
  const majors = report.issues.filter((i) => i.severity === "major").length;
  const minors = report.issues.filter((i) => i.severity === "minor").length;

  return (
    <div className="p-4 space-y-4">
      {/* Score comparison */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-red-50 rounded-lg p-3 text-center">
          <p className="text-xs text-red-600 font-medium mb-1">Aktuelle Website</p>
          <p className="text-2xl font-bold text-red-600">{report.score}</p>
          <p className="text-xs text-red-400">/100</p>
        </div>
        <div className="bg-green-50 rounded-lg p-3 text-center">
          <p className="text-xs text-green-600 font-medium mb-1">Neue Website</p>
          <p className="text-2xl font-bold text-green-600">{report.newScore}</p>
          <p className="text-xs text-green-400">/100</p>
        </div>
      </div>

      {/* Issue counts */}
      <div className="flex gap-2 text-xs">
        <span className="flex items-center gap-1 text-red-600">
          <span className="w-2 h-2 rounded-full bg-red-500 inline-block" /> {criticals} kritisch
        </span>
        <span className="flex items-center gap-1 text-yellow-600">
          <span className="w-2 h-2 rounded-full bg-yellow-500 inline-block" /> {majors} major
        </span>
        <span className="flex items-center gap-1 text-gray-500">
          <span className="w-2 h-2 rounded-full bg-gray-400 inline-block" /> {minors} minor
        </span>
      </div>

      {/* Issues list */}
      <div>
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
          Probleme — alle behoben ✓
        </p>
        <div className="space-y-2">
          {report.issues.map((issue) => (
            <div key={issue.id} className="flex gap-2 items-start">
              {severityIcon(issue.severity)}
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-gray-700 leading-snug">{issue.title}</p>
                <p className="text-xs text-green-600 mt-0.5">✓ {issue.fixedIn}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Strengths */}
      {report.strengths.length > 0 && (
        <div>
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Stärken</p>
          <div className="space-y-1">
            {report.strengths.map((s, i) => (
              <p key={i} className="text-xs text-gray-600 flex gap-1.5">
                <span className="text-green-500">○</span> {s}
              </p>
            ))}
          </div>
        </div>
      )}

      <p className="text-xs text-gray-300">
        Analysiert: {new Date(report.generatedAt).toLocaleDateString("de-DE")}
      </p>
    </div>
  );
}
