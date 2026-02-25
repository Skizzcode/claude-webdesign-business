"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { api } from "@/lib/api";
import type { SiteProject, Page, Section } from "@website-engine/core";

export function useProject(projectId: string) {
  const [project, setProject] = useState<SiteProject | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const saveTimer = useRef<NodeJS.Timeout | null>(null);

  // Load project
  useEffect(() => {
    api
      .getProject(projectId)
      .then(setProject)
      .catch((err) => setError(String(err)))
      .finally(() => setLoading(false));
  }, [projectId]);

  // Auto-save with debounce
  const save = useCallback(
    (updatedProject: SiteProject) => {
      setProject(updatedProject);
      if (saveTimer.current) clearTimeout(saveTimer.current);
      saveTimer.current = setTimeout(async () => {
        setSaving(true);
        try {
          await api.updateProject(projectId, {
            ...updatedProject,
            updatedAt: new Date().toISOString(),
          });
        } catch (err) {
          console.error("Failed to save:", err);
        }
        setSaving(false);
      }, 800);
    },
    [projectId]
  );

  // Helper: update a specific page
  const updatePage = useCallback(
    (pageId: string, updater: (page: Page) => Page) => {
      if (!project) return;
      const updated = {
        ...project,
        pages: project.pages.map((p) => (p.id === pageId ? updater(p) : p)),
      };
      save(updated);
    },
    [project, save]
  );

  // Helper: update a specific section
  const updateSection = useCallback(
    (pageId: string, sectionId: string, updater: (section: Section) => Section) => {
      updatePage(pageId, (page) => ({
        ...page,
        sections: page.sections.map((s) =>
          s.id === sectionId ? updater(s) : s
        ),
      }));
    },
    [updatePage]
  );

  // Helper: add section to page
  const addSection = useCallback(
    (pageId: string, section: Section, atIndex?: number) => {
      updatePage(pageId, (page) => {
        const sections = [...page.sections];
        if (atIndex !== undefined) {
          sections.splice(atIndex, 0, section);
        } else {
          // Insert before footer if it exists
          const footerIndex = sections.findIndex((s) => s.type === "footer");
          if (footerIndex >= 0) {
            sections.splice(footerIndex, 0, section);
          } else {
            sections.push(section);
          }
        }
        return { ...page, sections };
      });
    },
    [updatePage]
  );

  // Helper: remove section from page
  const removeSection = useCallback(
    (pageId: string, sectionId: string) => {
      updatePage(pageId, (page) => ({
        ...page,
        sections: page.sections.filter((s) => s.id !== sectionId),
      }));
    },
    [updatePage]
  );

  // Helper: reorder sections
  const reorderSections = useCallback(
    (pageId: string, newSections: Section[]) => {
      updatePage(pageId, (page) => ({ ...page, sections: newSections }));
    },
    [updatePage]
  );

  // Helper: add page
  const addPage = useCallback(
    (page: Page) => {
      if (!project) return;
      save({ ...project, pages: [...project.pages, page] });
    },
    [project, save]
  );

  // Helper: remove page
  const removePage = useCallback(
    (pageId: string) => {
      if (!project) return;
      save({ ...project, pages: project.pages.filter((p) => p.id !== pageId) });
    },
    [project, save]
  );

  // Helper: update design
  const updateDesign = useCallback(
    (updater: (design: SiteProject["design"]) => SiteProject["design"]) => {
      if (!project) return;
      save({ ...project, design: updater(project.design) });
    },
    [project, save]
  );

  // Helper: update meta
  const updateMeta = useCallback(
    (updater: (meta: SiteProject["meta"]) => SiteProject["meta"]) => {
      if (!project) return;
      save({ ...project, meta: updater(project.meta) });
    },
    [project, save]
  );

  return {
    project,
    loading,
    error,
    saving,
    save,
    updatePage,
    updateSection,
    addSection,
    removeSection,
    reorderSections,
    addPage,
    removePage,
    updateDesign,
    updateMeta,
  };
}
