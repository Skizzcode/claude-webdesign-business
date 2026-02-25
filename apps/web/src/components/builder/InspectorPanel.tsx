"use client";

import React from "react";
import { SECTION_LABELS } from "@website-engine/core";
import type { Section, SectionType } from "@website-engine/core";
import { Plus, Trash2, GripVertical } from "lucide-react";

interface InspectorPanelProps {
  section: Section;
  onUpdate: (updated: Section) => void;
}

// ── Field components ──────────────────────────────────────

function FieldGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="border-b pb-4 mb-4 last:border-0">
      <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">{label}</h4>
      <div className="space-y-3">{children}</div>
    </div>
  );
}

function TextField({ label, value, onChange, multiline = false }: { label: string; value: string; onChange: (v: string) => void; multiline?: boolean }) {
  return (
    <div>
      <label className="block text-xs font-medium text-gray-600 mb-1">{label}</label>
      {multiline ? (
        <textarea value={value || ""} onChange={(e) => onChange(e.target.value)} rows={3} className="w-full text-xs px-2.5 py-1.5 border rounded-md outline-none focus:ring-1 focus:ring-blue-400 resize-y" />
      ) : (
        <input type="text" value={value || ""} onChange={(e) => onChange(e.target.value)} className="w-full text-xs px-2.5 py-1.5 border rounded-md outline-none focus:ring-1 focus:ring-blue-400" />
      )}
    </div>
  );
}

function SelectField({ label, value, options, onChange }: { label: string; value: string; options: { value: string; label: string }[]; onChange: (v: string) => void }) {
  return (
    <div>
      <label className="block text-xs font-medium text-gray-600 mb-1">{label}</label>
      <select value={value || ""} onChange={(e) => onChange(e.target.value)} className="w-full text-xs px-2.5 py-1.5 border rounded-md bg-white outline-none focus:ring-1 focus:ring-blue-400">
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
    </div>
  );
}

function ToggleField({ label, value, onChange }: { label: string; value: boolean; onChange: (v: boolean) => void }) {
  return (
    <div className="flex items-center justify-between">
      <label className="text-xs font-medium text-gray-600">{label}</label>
      <button
        onClick={() => onChange(!value)}
        className={`w-8 h-4.5 rounded-full transition-colors relative ${value ? "bg-blue-500" : "bg-gray-300"}`}
        style={{ minWidth: 32, height: 18 }}
      >
        <span className={`absolute top-0.5 w-3.5 h-3.5 rounded-full bg-white shadow transition-transform ${value ? "left-[15px]" : "left-0.5"}`} style={{ width: 14, height: 14 }} />
      </button>
    </div>
  );
}

// ── Array editor for items (benefits, services, FAQs, etc.) ──

function ArrayEditor<T extends Record<string, any>>({
  items,
  onUpdate,
  renderItem,
  createItem,
  itemLabel = "Item",
}: {
  items: T[];
  onUpdate: (items: T[]) => void;
  renderItem: (item: T, index: number, onChange: (updated: T) => void) => React.ReactNode;
  createItem: () => T;
  itemLabel?: string;
}) {
  const handleAdd = () => onUpdate([...items, createItem()]);
  const handleRemove = (idx: number) => onUpdate(items.filter((_, i) => i !== idx));
  const handleChange = (idx: number, updated: T) => onUpdate(items.map((item, i) => (i === idx ? updated : item)));

  return (
    <div className="space-y-2">
      {items.map((item, idx) => (
        <div key={idx} className="bg-gray-50 rounded p-2 relative group">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[10px] font-medium text-gray-400 uppercase">{itemLabel} {idx + 1}</span>
            <button onClick={() => handleRemove(idx)} className="p-0.5 rounded text-gray-400 hover:text-red-500 hover:bg-red-50 opacity-0 group-hover:opacity-100 transition">
              <Trash2 size={10} />
            </button>
          </div>
          {renderItem(item, idx, (updated) => handleChange(idx, updated))}
        </div>
      ))}
      <button onClick={handleAdd} className="w-full flex items-center justify-center gap-1 text-xs text-blue-600 hover:bg-blue-50 py-1.5 rounded border border-dashed border-blue-300 transition">
        <Plus size={12} /> Add {itemLabel}
      </button>
    </div>
  );
}

// ── Button editor ──

function ButtonsEditor({ buttons, onChange }: { buttons: any[]; onChange: (b: any[]) => void }) {
  return (
    <ArrayEditor
      items={buttons || []}
      onUpdate={onChange}
      itemLabel="Button"
      createItem={() => ({ label: "Button", href: "#", variant: "primary" })}
      renderItem={(btn, _idx, update) => (
        <div className="space-y-1.5">
          <input type="text" value={btn.label || ""} onChange={(e) => update({ ...btn, label: e.target.value })} placeholder="Label" className="w-full text-xs px-2 py-1 border rounded outline-none focus:ring-1 focus:ring-blue-400" />
          <input type="text" value={btn.href || ""} onChange={(e) => update({ ...btn, href: e.target.value })} placeholder="Link (href)" className="w-full text-xs px-2 py-1 border rounded outline-none focus:ring-1 focus:ring-blue-400" />
          <select value={btn.variant || "primary"} onChange={(e) => update({ ...btn, variant: e.target.value })} className="w-full text-xs px-2 py-1 border rounded bg-white outline-none">
            <option value="primary">Primary</option>
            <option value="secondary">Secondary</option>
            <option value="outline">Outline</option>
            <option value="ghost">Ghost</option>
          </select>
        </div>
      )}
    />
  );
}

// ── Main Inspector ──

export function InspectorPanel({ section, onUpdate }: InspectorPanelProps) {
  const s = section as any;
  const type = section.type as SectionType;
  const label = SECTION_LABELS[type]?.de || type;

  const set = (key: string, value: any) => onUpdate({ ...s, [key]: value } as Section);

  return (
    <div className="p-4">
      <div className="flex items-center gap-2 mb-4">
        <h3 className="text-sm font-bold text-gray-900">{label}</h3>
        <span className="text-[10px] px-1.5 py-0.5 rounded bg-gray-100 text-gray-500 font-mono">{type}</span>
      </div>

      {/* Common: Layout */}
      <FieldGroup label="Layout">
        <SelectField label="Background" value={s.background} onChange={(v) => set("background", v)} options={[
          { value: "default", label: "Default" },
          { value: "surface", label: "Surface" },
          { value: "primary", label: "Primary Color" },
          { value: "dark", label: "Dark" },
        ]} />
        <SelectField label="Padding Top" value={s.paddingTop} onChange={(v) => set("paddingTop", v)} options={[
          { value: "none", label: "None" },
          { value: "sm", label: "Small" },
          { value: "md", label: "Medium" },
          { value: "lg", label: "Large" },
        ]} />
        <SelectField label="Padding Bottom" value={s.paddingBottom} onChange={(v) => set("paddingBottom", v)} options={[
          { value: "none", label: "None" },
          { value: "sm", label: "Small" },
          { value: "md", label: "Medium" },
          { value: "lg", label: "Large" },
        ]} />
        <ToggleField label="Visible" value={s.visible !== false} onChange={(v) => set("visible", v)} />
      </FieldGroup>

      {/* Type-specific fields */}
      {type === "hero" && (
        <>
          <FieldGroup label="Content">
            <TextField label="Headline" value={s.headline} onChange={(v) => set("headline", v)} />
            <TextField label="Subheadline" value={s.subheadline || ""} onChange={(v) => set("subheadline", v)} multiline />
            <SelectField label="Layout" value={s.layout || "centered"} onChange={(v) => set("layout", v)} options={[
              { value: "centered", label: "Centered" },
              { value: "split_left", label: "Split Left" },
              { value: "split_right", label: "Split Right" },
              { value: "bg_image", label: "Background Image" },
            ]} />
          </FieldGroup>
          <FieldGroup label="Buttons">
            <ButtonsEditor buttons={s.buttons || []} onChange={(b) => set("buttons", b)} />
          </FieldGroup>
          <FieldGroup label="Image">
            <TextField label="Image URL" value={s.image?.src || ""} onChange={(v) => set("image", { ...s.image, src: v, alt: s.image?.alt || "" })} />
            <TextField label="Alt Text" value={s.image?.alt || ""} onChange={(v) => set("image", { ...s.image, alt: v })} />
          </FieldGroup>
        </>
      )}

      {type === "benefits" && (
        <>
          <FieldGroup label="Content">
            <TextField label="Headline" value={s.headline || ""} onChange={(v) => set("headline", v)} />
            <TextField label="Subtitle" value={s.subtitle || ""} onChange={(v) => set("subtitle", v)} />
            <SelectField label="Columns" value={s.columns || "3"} onChange={(v) => set("columns", v)} options={[
              { value: "2", label: "2 Columns" },
              { value: "3", label: "3 Columns" },
              { value: "4", label: "4 Columns" },
            ]} />
          </FieldGroup>
          <FieldGroup label="Items">
            <ArrayEditor
              items={s.items || []}
              onUpdate={(items) => set("items", items)}
              itemLabel="Benefit"
              createItem={() => ({ icon: "Star", title: "Vorteil", description: "Beschreibung" })}
              renderItem={(item, _idx, update) => (
                <div className="space-y-1.5">
                  <input type="text" value={item.icon || ""} onChange={(e) => update({ ...item, icon: e.target.value })} placeholder="Icon (Lucide name)" className="w-full text-xs px-2 py-1 border rounded outline-none" />
                  <input type="text" value={item.title || ""} onChange={(e) => update({ ...item, title: e.target.value })} placeholder="Title" className="w-full text-xs px-2 py-1 border rounded outline-none" />
                  <textarea value={item.description || ""} onChange={(e) => update({ ...item, description: e.target.value })} placeholder="Description" rows={2} className="w-full text-xs px-2 py-1 border rounded outline-none resize-y" />
                </div>
              )}
            />
          </FieldGroup>
        </>
      )}

      {type === "services" && (
        <>
          <FieldGroup label="Content">
            <TextField label="Headline" value={s.headline || ""} onChange={(v) => set("headline", v)} />
            <TextField label="Subtitle" value={s.subtitle || ""} onChange={(v) => set("subtitle", v)} />
            <SelectField label="Layout" value={s.layout || "cards"} onChange={(v) => set("layout", v)} options={[
              { value: "grid", label: "Grid" },
              { value: "list", label: "List" },
              { value: "cards", label: "Cards" },
            ]} />
          </FieldGroup>
          <FieldGroup label="Services">
            <ArrayEditor
              items={s.items || []}
              onUpdate={(items) => set("items", items)}
              itemLabel="Service"
              createItem={() => ({ title: "Leistung", description: "Beschreibung" })}
              renderItem={(item, _idx, update) => (
                <div className="space-y-1.5">
                  <input type="text" value={item.icon || ""} onChange={(e) => update({ ...item, icon: e.target.value })} placeholder="Icon" className="w-full text-xs px-2 py-1 border rounded outline-none" />
                  <input type="text" value={item.title || ""} onChange={(e) => update({ ...item, title: e.target.value })} placeholder="Title" className="w-full text-xs px-2 py-1 border rounded outline-none" />
                  <textarea value={item.description || ""} onChange={(e) => update({ ...item, description: e.target.value })} placeholder="Description" rows={2} className="w-full text-xs px-2 py-1 border rounded outline-none resize-y" />
                  <input type="text" value={item.price || ""} onChange={(e) => update({ ...item, price: e.target.value })} placeholder="Price (optional)" className="w-full text-xs px-2 py-1 border rounded outline-none" />
                </div>
              )}
            />
          </FieldGroup>
        </>
      )}

      {type === "gallery" && (
        <>
          <FieldGroup label="Content">
            <TextField label="Headline" value={s.headline || ""} onChange={(v) => set("headline", v)} />
            <SelectField label="Columns" value={s.columns || "3"} onChange={(v) => set("columns", v)} options={[
              { value: "2", label: "2 Columns" },
              { value: "3", label: "3 Columns" },
              { value: "4", label: "4 Columns" },
            ]} />
          </FieldGroup>
          <FieldGroup label="Images">
            <ArrayEditor
              items={s.images || []}
              onUpdate={(images) => set("images", images)}
              itemLabel="Image"
              createItem={() => ({ src: "", alt: "" })}
              renderItem={(img, _idx, update) => (
                <div className="space-y-1.5">
                  <input type="text" value={img.src || ""} onChange={(e) => update({ ...img, src: e.target.value })} placeholder="Image URL" className="w-full text-xs px-2 py-1 border rounded outline-none" />
                  <input type="text" value={img.alt || ""} onChange={(e) => update({ ...img, alt: e.target.value })} placeholder="Alt text" className="w-full text-xs px-2 py-1 border rounded outline-none" />
                </div>
              )}
            />
          </FieldGroup>
        </>
      )}

      {type === "pricing" && (
        <>
          <FieldGroup label="Content">
            <TextField label="Headline" value={s.headline || ""} onChange={(v) => set("headline", v)} />
            <TextField label="Subtitle" value={s.subtitle || ""} onChange={(v) => set("subtitle", v)} />
          </FieldGroup>
          <FieldGroup label="Pricing Tiers">
            <ArrayEditor
              items={s.tiers || []}
              onUpdate={(tiers) => set("tiers", tiers)}
              itemLabel="Tier"
              createItem={() => ({ name: "Plan", price: "€49", features: ["Feature 1"], highlighted: false })}
              renderItem={(tier, _idx, update) => (
                <div className="space-y-1.5">
                  <input type="text" value={tier.name || ""} onChange={(e) => update({ ...tier, name: e.target.value })} placeholder="Name" className="w-full text-xs px-2 py-1 border rounded outline-none" />
                  <input type="text" value={tier.price || ""} onChange={(e) => update({ ...tier, price: e.target.value })} placeholder="Price" className="w-full text-xs px-2 py-1 border rounded outline-none" />
                  <input type="text" value={tier.period || ""} onChange={(e) => update({ ...tier, period: e.target.value })} placeholder="Period (z.B. /Monat)" className="w-full text-xs px-2 py-1 border rounded outline-none" />
                  <textarea value={(tier.features || []).join("\n")} onChange={(e) => update({ ...tier, features: e.target.value.split("\n").filter(Boolean) })} placeholder="Features (one per line)" rows={3} className="w-full text-xs px-2 py-1 border rounded outline-none resize-y" />
                  <ToggleField label="Highlighted" value={!!tier.highlighted} onChange={(v) => update({ ...tier, highlighted: v })} />
                </div>
              )}
            />
          </FieldGroup>
        </>
      )}

      {type === "team" && (
        <>
          <FieldGroup label="Content">
            <TextField label="Headline" value={s.headline || ""} onChange={(v) => set("headline", v)} />
          </FieldGroup>
          <FieldGroup label="Team Members">
            <ArrayEditor
              items={s.members || []}
              onUpdate={(members) => set("members", members)}
              itemLabel="Member"
              createItem={() => ({ name: "Name", role: "Position" })}
              renderItem={(m, _idx, update) => (
                <div className="space-y-1.5">
                  <input type="text" value={m.name || ""} onChange={(e) => update({ ...m, name: e.target.value })} placeholder="Name" className="w-full text-xs px-2 py-1 border rounded outline-none" />
                  <input type="text" value={m.role || ""} onChange={(e) => update({ ...m, role: e.target.value })} placeholder="Role" className="w-full text-xs px-2 py-1 border rounded outline-none" />
                  <textarea value={m.bio || ""} onChange={(e) => update({ ...m, bio: e.target.value })} placeholder="Bio" rows={2} className="w-full text-xs px-2 py-1 border rounded outline-none resize-y" />
                  <input type="text" value={m.image?.src || ""} onChange={(e) => update({ ...m, image: { src: e.target.value, alt: m.name } })} placeholder="Image URL" className="w-full text-xs px-2 py-1 border rounded outline-none" />
                </div>
              )}
            />
          </FieldGroup>
        </>
      )}

      {type === "testimonials" && (
        <>
          <FieldGroup label="Content">
            <TextField label="Headline" value={s.headline || ""} onChange={(v) => set("headline", v)} />
            <SelectField label="Layout" value={s.layout || "grid"} onChange={(v) => set("layout", v)} options={[
              { value: "grid", label: "Grid" },
              { value: "stacked", label: "Stacked" },
              { value: "carousel", label: "Carousel" },
            ]} />
          </FieldGroup>
          <FieldGroup label="Testimonials">
            <ArrayEditor
              items={s.items || []}
              onUpdate={(items) => set("items", items)}
              itemLabel="Testimonial"
              createItem={() => ({ quote: "Tolles Unternehmen!", author: "Kunde", rating: 5 })}
              renderItem={(item, _idx, update) => (
                <div className="space-y-1.5">
                  <textarea value={item.quote || ""} onChange={(e) => update({ ...item, quote: e.target.value })} placeholder="Quote" rows={2} className="w-full text-xs px-2 py-1 border rounded outline-none resize-y" />
                  <input type="text" value={item.author || ""} onChange={(e) => update({ ...item, author: e.target.value })} placeholder="Author" className="w-full text-xs px-2 py-1 border rounded outline-none" />
                  <input type="text" value={item.role || ""} onChange={(e) => update({ ...item, role: e.target.value })} placeholder="Role (optional)" className="w-full text-xs px-2 py-1 border rounded outline-none" />
                  <SelectField label="Rating" value={String(item.rating || 5)} onChange={(v) => update({ ...item, rating: Number(v) })} options={[1,2,3,4,5].map((n) => ({ value: String(n), label: `${n} Stars` }))} />
                </div>
              )}
            />
          </FieldGroup>
        </>
      )}

      {type === "faq" && (
        <>
          <FieldGroup label="Content">
            <TextField label="Headline" value={s.headline || ""} onChange={(v) => set("headline", v)} />
          </FieldGroup>
          <FieldGroup label="FAQ Items">
            <ArrayEditor
              items={s.items || []}
              onUpdate={(items) => set("items", items)}
              itemLabel="FAQ"
              createItem={() => ({ question: "Frage?", answer: "Antwort." })}
              renderItem={(item, _idx, update) => (
                <div className="space-y-1.5">
                  <input type="text" value={item.question || ""} onChange={(e) => update({ ...item, question: e.target.value })} placeholder="Question" className="w-full text-xs px-2 py-1 border rounded outline-none" />
                  <textarea value={item.answer || ""} onChange={(e) => update({ ...item, answer: e.target.value })} placeholder="Answer" rows={2} className="w-full text-xs px-2 py-1 border rounded outline-none resize-y" />
                </div>
              )}
            />
          </FieldGroup>
        </>
      )}

      {type === "contact" && (
        <>
          <FieldGroup label="Content">
            <TextField label="Headline" value={s.headline || ""} onChange={(v) => set("headline", v)} />
            <TextField label="Subtitle" value={s.subtitle || ""} onChange={(v) => set("subtitle", v)} multiline />
            <TextField label="Submit Label" value={s.submitLabel || "Absenden"} onChange={(v) => set("submitLabel", v)} />
          </FieldGroup>
          <FieldGroup label="Visibility">
            <ToggleField label="Show Address" value={s.showAddress !== false} onChange={(v) => set("showAddress", v)} />
            <ToggleField label="Show Phone" value={s.showPhone !== false} onChange={(v) => set("showPhone", v)} />
            <ToggleField label="Show Email" value={s.showEmail !== false} onChange={(v) => set("showEmail", v)} />
            <ToggleField label="Show Hours" value={s.showHours !== false} onChange={(v) => set("showHours", v)} />
          </FieldGroup>
          <FieldGroup label="Form Fields">
            <ArrayEditor
              items={s.fields || []}
              onUpdate={(fields) => set("fields", fields)}
              itemLabel="Field"
              createItem={() => ({ name: "field", label: "Feld", type: "text", required: false })}
              renderItem={(field, _idx, update) => (
                <div className="space-y-1.5">
                  <input type="text" value={field.label || ""} onChange={(e) => update({ ...field, label: e.target.value })} placeholder="Label" className="w-full text-xs px-2 py-1 border rounded outline-none" />
                  <input type="text" value={field.name || ""} onChange={(e) => update({ ...field, name: e.target.value })} placeholder="Field name" className="w-full text-xs px-2 py-1 border rounded outline-none" />
                  <select value={field.type || "text"} onChange={(e) => update({ ...field, type: e.target.value })} className="w-full text-xs px-2 py-1 border rounded bg-white outline-none">
                    <option value="text">Text</option>
                    <option value="email">Email</option>
                    <option value="tel">Phone</option>
                    <option value="textarea">Textarea</option>
                    <option value="select">Select</option>
                  </select>
                  <ToggleField label="Required" value={!!field.required} onChange={(v) => update({ ...field, required: v })} />
                </div>
              )}
            />
          </FieldGroup>
        </>
      )}

      {type === "map" && (
        <FieldGroup label="Content">
          <TextField label="Headline" value={s.headline || ""} onChange={(v) => set("headline", v)} />
          <TextField label="Address" value={s.address || ""} onChange={(v) => set("address", v)} />
          <TextField label="Description" value={s.description || ""} onChange={(v) => set("description", v)} multiline />
        </FieldGroup>
      )}

      {type === "footer" && (
        <>
          <FieldGroup label="Content">
            <TextField label="Copyright" value={s.copyright || ""} onChange={(v) => set("copyright", v)} />
            <ToggleField label="Show Socials" value={s.showSocials !== false} onChange={(v) => set("showSocials", v)} />
            <ToggleField label="Show Credit" value={s.showCredit !== false} onChange={(v) => set("showCredit", v)} />
          </FieldGroup>
          <FieldGroup label="Footer Columns">
            <ArrayEditor
              items={s.columns || []}
              onUpdate={(cols) => set("columns", cols)}
              itemLabel="Column"
              createItem={() => ({ title: "Links", links: [{ label: "Link", href: "#" }] })}
              renderItem={(col, _idx, update) => (
                <div className="space-y-1.5">
                  <input type="text" value={col.title || ""} onChange={(e) => update({ ...col, title: e.target.value })} placeholder="Column title" className="w-full text-xs px-2 py-1 border rounded outline-none" />
                  <div className="pl-2 border-l-2 border-gray-200 space-y-1">
                    {(col.links || []).map((link: any, li: number) => (
                      <div key={li} className="flex gap-1">
                        <input type="text" value={link.label || ""} onChange={(e) => { const links = [...col.links]; links[li] = { ...links[li], label: e.target.value }; update({ ...col, links }); }} placeholder="Label" className="flex-1 text-xs px-2 py-0.5 border rounded outline-none" />
                        <input type="text" value={link.href || ""} onChange={(e) => { const links = [...col.links]; links[li] = { ...links[li], href: e.target.value }; update({ ...col, links }); }} placeholder="href" className="flex-1 text-xs px-2 py-0.5 border rounded outline-none" />
                        <button onClick={() => { const links = col.links.filter((_: any, i: number) => i !== li); update({ ...col, links }); }} className="text-gray-400 hover:text-red-500"><Trash2 size={10} /></button>
                      </div>
                    ))}
                    <button onClick={() => update({ ...col, links: [...(col.links || []), { label: "Link", href: "#" }] })} className="text-[10px] text-blue-500 hover:underline">+ Add link</button>
                  </div>
                </div>
              )}
            />
          </FieldGroup>
        </>
      )}

      {type === "cta_banner" && (
        <>
          <FieldGroup label="Content">
            <TextField label="Headline" value={s.headline} onChange={(v) => set("headline", v)} />
            <TextField label="Subtitle" value={s.subtitle || ""} onChange={(v) => set("subtitle", v)} multiline />
          </FieldGroup>
          <FieldGroup label="Buttons">
            <ButtonsEditor buttons={s.buttons || []} onChange={(b) => set("buttons", b)} />
          </FieldGroup>
        </>
      )}
    </div>
  );
}
