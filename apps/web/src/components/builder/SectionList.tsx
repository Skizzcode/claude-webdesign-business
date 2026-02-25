"use client";

import React, { useState } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { Page, Section, SectionType } from "@website-engine/core";
import {
  SECTION_LABELS,
  SECTION_TYPES,
  createDefaultSection,
  v4,
} from "@website-engine/core";
import {
  GripVertical,
  Plus,
  Trash2,
  Copy,
  Eye,
  EyeOff,
  ChevronDown,
  Layout,
  Type,
  Image,
  Star,
  HelpCircle,
  Phone,
  MapPin,
  Users,
  DollarSign,
  MessageSquare,
  Megaphone,
  Grid3X3,
} from "lucide-react";

const SECTION_ICONS: Record<string, React.ReactNode> = {
  hero: <Layout size={14} />,
  benefits: <Star size={14} />,
  services: <Grid3X3 size={14} />,
  gallery: <Image size={14} />,
  pricing: <DollarSign size={14} />,
  team: <Users size={14} />,
  testimonials: <MessageSquare size={14} />,
  faq: <HelpCircle size={14} />,
  contact: <Phone size={14} />,
  map: <MapPin size={14} />,
  footer: <Type size={14} />,
  cta_banner: <Megaphone size={14} />,
};

interface SectionListProps {
  page: Page;
  selectedSectionId: string | null;
  onSelectSection: (id: string | null) => void;
  onAddSection: (section: Section) => void;
  onRemoveSection: (sectionId: string) => void;
  onReorder: (sections: Section[]) => void;
}

function SortableItem({
  section,
  isSelected,
  onSelect,
  onRemove,
  onDuplicate,
  onToggleVisibility,
}: {
  section: Section;
  isSelected: boolean;
  onSelect: () => void;
  onRemove: () => void;
  onDuplicate: () => void;
  onToggleVisibility: () => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: section.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const label = SECTION_LABELS[section.type as SectionType]?.de || section.type;

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`group flex items-center gap-1 px-2 py-1.5 cursor-pointer transition text-xs ${
        isSelected
          ? "bg-blue-50 border-l-2 border-blue-500"
          : "border-l-2 border-transparent hover:bg-gray-50"
      } ${!section.visible ? "opacity-50" : ""}`}
      onClick={onSelect}
    >
      <div {...attributes} {...listeners} className="cursor-grab active:cursor-grabbing p-0.5">
        <GripVertical size={12} className="text-gray-300" />
      </div>
      <span className="text-gray-400">{SECTION_ICONS[section.type] || <Layout size={14} />}</span>
      <span className={`flex-1 truncate ${isSelected ? "text-blue-700 font-medium" : "text-gray-700"}`}>
        {label}
      </span>
      <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition">
        <button onClick={(e) => { e.stopPropagation(); onToggleVisibility(); }} className="p-0.5 rounded hover:bg-gray-200 text-gray-400" title={section.visible ? "Hide" : "Show"}>
          {section.visible ? <Eye size={11} /> : <EyeOff size={11} />}
        </button>
        <button onClick={(e) => { e.stopPropagation(); onDuplicate(); }} className="p-0.5 rounded hover:bg-gray-200 text-gray-400" title="Duplicate">
          <Copy size={11} />
        </button>
        <button onClick={(e) => { e.stopPropagation(); onRemove(); }} className="p-0.5 rounded hover:bg-red-50 text-gray-400 hover:text-red-500" title="Delete">
          <Trash2 size={11} />
        </button>
      </div>
    </div>
  );
}

export function SectionList({
  page,
  selectedSectionId,
  onSelectSection,
  onAddSection,
  onRemoveSection,
  onReorder,
}: SectionListProps) {
  const [showAddMenu, setShowAddMenu] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = page.sections.findIndex((s) => s.id === active.id);
    const newIndex = page.sections.findIndex((s) => s.id === over.id);
    onReorder(arrayMove(page.sections, oldIndex, newIndex));
  };

  const handleAdd = (type: SectionType) => {
    const section = createDefaultSection(type);
    onAddSection(section);
    onSelectSection(section.id);
    setShowAddMenu(false);
  };

  const handleDuplicate = (section: Section) => {
    const clone = { ...JSON.parse(JSON.stringify(section)), id: v4() };
    onAddSection(clone);
    onSelectSection(clone.id);
  };

  const handleToggleVisibility = (section: Section) => {
    const idx = page.sections.findIndex((s) => s.id === section.id);
    if (idx < 0) return;
    const updated = [...page.sections];
    updated[idx] = { ...updated[idx], visible: !updated[idx].visible } as Section;
    onReorder(updated);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between px-3 py-2.5 bg-gray-50/50">
        <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Sections</span>
        <div className="relative">
          <button
            onClick={() => setShowAddMenu(!showAddMenu)}
            className="p-1 rounded hover:bg-gray-200 text-gray-500 hover:text-gray-700 transition"
            title="Add section"
          >
            <Plus size={14} />
          </button>
          {showAddMenu && (
            <div className="absolute right-0 top-full mt-1 bg-white border rounded-lg shadow-lg z-50 w-48 py-1 max-h-72 overflow-y-auto">
              {SECTION_TYPES.map((type) => (
                <button
                  key={type}
                  onClick={() => handleAdd(type)}
                  className="w-full flex items-center gap-2 px-3 py-1.5 text-xs text-left hover:bg-gray-50 transition"
                >
                  <span className="text-gray-400">{SECTION_ICONS[type] || <Layout size={14} />}</span>
                  <span>{SECTION_LABELS[type]?.de || type}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={page.sections.map((s) => s.id)} strategy={verticalListSortingStrategy}>
            {page.sections.map((section) => (
              <SortableItem
                key={section.id}
                section={section}
                isSelected={selectedSectionId === section.id}
                onSelect={() => onSelectSection(section.id)}
                onRemove={() => onRemoveSection(section.id)}
                onDuplicate={() => handleDuplicate(section)}
                onToggleVisibility={() => handleToggleVisibility(section)}
              />
            ))}
          </SortableContext>
        </DndContext>

        {page.sections.length === 0 && (
          <div className="p-4 text-center text-xs text-gray-400">
            No sections. Click + to add one.
          </div>
        )}
      </div>
    </div>
  );
}
