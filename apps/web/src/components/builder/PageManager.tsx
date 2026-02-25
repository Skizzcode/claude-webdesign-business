"use client";

import React, { useState, useRef, useEffect } from "react";
import type { Page } from "@website-engine/core";
import { v4, createDefaultSection } from "@website-engine/core";
import { Plus, Trash2, File, GripVertical } from "lucide-react";

interface PageManagerProps {
  pages: Page[];
  activePageId: string;
  onSelectPage: (pageId: string) => void;
  onAddPage: (page: Page) => void;
  onRemovePage: (pageId: string) => void;
  onUpdatePage: (pageId: string, updater: (page: Page) => Page) => void;
}

export function PageManager({
  pages,
  activePageId,
  onSelectPage,
  onAddPage,
  onRemovePage,
  onUpdatePage,
}: PageManagerProps) {
  const [editingPageId, setEditingPageId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState("");
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const editInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editingPageId && editInputRef.current) {
      editInputRef.current.focus();
      editInputRef.current.select();
    }
  }, [editingPageId]);

  const handleAddPage = () => {
    const id = v4();
    const pageNumber = pages.length + 1;
    const newPage: Page = {
      id,
      slug: `page-${pageNumber}`,
      title: `Neue Seite ${pageNumber}`,
      navLabel: `Seite ${pageNumber}`,
      showInNav: true,
      sections: [
        createDefaultSection("hero"),
        createDefaultSection("benefits"),
        createDefaultSection("contact"),
        createDefaultSection("footer"),
      ],
    };
    onAddPage(newPage);
    onSelectPage(id);
  };

  const handleDoubleClick = (page: Page) => {
    setEditingPageId(page.id);
    setEditValue(page.navLabel);
  };

  const commitEdit = () => {
    if (editingPageId && editValue.trim()) {
      onUpdatePage(editingPageId, (page) => ({
        ...page,
        navLabel: editValue.trim(),
        title: editValue.trim(),
      }));
    }
    setEditingPageId(null);
    setEditValue("");
  };

  const handleEditKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      commitEdit();
    } else if (e.key === "Escape") {
      setEditingPageId(null);
      setEditValue("");
    }
  };

  const handleDeleteClick = (pageId: string) => {
    if (confirmDeleteId === pageId) {
      onRemovePage(pageId);
      setConfirmDeleteId(null);
      // If we deleted the active page, select the first remaining page
      if (pageId === activePageId && pages.length > 1) {
        const remaining = pages.filter((p) => p.id !== pageId);
        if (remaining.length > 0) {
          onSelectPage(remaining[0].id);
        }
      }
    } else {
      setConfirmDeleteId(pageId);
      // Reset confirm after 3 seconds
      setTimeout(() => setConfirmDeleteId(null), 3000);
    }
  };

  return (
    <div className="flex flex-col shrink-0">
      {/* Header */}
      <div className="flex items-center justify-between px-3 py-2.5 border-b bg-gray-50/50">
        <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
          Pages
        </span>
        <button
          onClick={handleAddPage}
          className="p-1 rounded hover:bg-gray-200 text-gray-500 hover:text-gray-700 transition"
          title="Add page"
        >
          <Plus size={14} />
        </button>
      </div>

      {/* Page List */}
      <div className="max-h-48 overflow-y-auto">
        {pages.map((page) => {
          const isActive = page.id === activePageId;
          const isEditing = editingPageId === page.id;
          const isConfirmingDelete = confirmDeleteId === page.id;

          return (
            <div
              key={page.id}
              className={`group flex items-center gap-1.5 px-2 py-1.5 cursor-pointer transition ${
                isActive
                  ? "bg-blue-50 border-l-2 border-blue-500"
                  : "border-l-2 border-transparent hover:bg-gray-50"
              }`}
              onClick={() => !isEditing && onSelectPage(page.id)}
            >
              <GripVertical
                size={12}
                className="text-gray-300 shrink-0 opacity-0 group-hover:opacity-100 transition"
              />
              <File
                size={13}
                className={`shrink-0 ${
                  isActive ? "text-blue-500" : "text-gray-400"
                }`}
              />

              {isEditing ? (
                <input
                  ref={editInputRef}
                  type="text"
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  onBlur={commitEdit}
                  onKeyDown={handleEditKeyDown}
                  className="flex-1 text-xs bg-white border border-blue-300 rounded px-1.5 py-0.5 outline-none focus:ring-1 focus:ring-blue-400 min-w-0"
                  onClick={(e) => e.stopPropagation()}
                />
              ) : (
                <span
                  className={`flex-1 text-xs truncate ${
                    isActive
                      ? "text-blue-700 font-medium"
                      : "text-gray-700"
                  }`}
                  onDoubleClick={() => handleDoubleClick(page)}
                  title="Double-click to rename"
                >
                  {page.navLabel}
                </span>
              )}

              {/* Delete button - only show if more than 1 page */}
              {pages.length > 1 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteClick(page.id);
                  }}
                  className={`p-0.5 rounded transition shrink-0 ${
                    isConfirmingDelete
                      ? "bg-red-100 text-red-600"
                      : "opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 hover:bg-red-50"
                  }`}
                  title={
                    isConfirmingDelete ? "Click again to confirm" : "Delete page"
                  }
                >
                  <Trash2 size={12} />
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
