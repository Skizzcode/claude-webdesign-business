"use client";

import { useState } from "react";
import * as LucideIcons from "lucide-react";

export function SiteRenderer({ page, project }: { page: any; project: any }) {
  const { design, meta } = project;

  return (
    <div style={{ fontFamily: `"${design.typography.bodyFont}", sans-serif`, color: design.palette.text, backgroundColor: design.palette.background }}>
      {/* Navigation */}
      <nav
        style={{
          backgroundColor: design.palette.primary,
          color: "#fff",
          padding: "0.75rem 2rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          position: "sticky",
          top: 0,
          zIndex: 50,
        }}
      >
        <a href="/" style={{ fontSize: "1.25rem", fontWeight: 700, color: "#fff", textDecoration: "none", fontFamily: `"${design.typography.headingFont}", serif` }}>
          {meta.businessName}
        </a>
        <div style={{ display: "flex", gap: "1.5rem", alignItems: "center" }}>
          {project.pages
            .filter((p: any) => p.showInNav !== false)
            .map((p: any) => (
              <a
                key={p.id}
                href={!p.slug || p.slug === "home" ? "/" : `/${p.slug}`}
                style={{ color: "rgba(255,255,255,0.9)", textDecoration: "none", fontSize: "0.9rem", fontWeight: 500 }}
              >
                {p.navLabel}
              </a>
            ))}
          {meta.phone && (
            <a
              href={`tel:${meta.phone}`}
              style={{
                backgroundColor: "rgba(255,255,255,0.2)",
                color: "#fff",
                padding: "0.4rem 1rem",
                borderRadius: `${design.radius}px`,
                fontSize: "0.85rem",
                fontWeight: 600,
                textDecoration: "none",
              }}
            >
              {meta.phone}
            </a>
          )}
        </div>
      </nav>

      {/* Sections */}
      {page.sections
        .filter((s: any) => s.visible !== false)
        .map((section: any) => (
          <SectionRenderer key={section.id} section={section} design={design} meta={meta} />
        ))}
    </div>
  );
}

function SectionRenderer({ section, design, meta }: { section: any; design: any; meta: any }) {
  const bgMap: Record<string, string> = {
    default: design.palette.background,
    surface: design.palette.surface,
    primary: design.palette.primary,
    dark: "#111827",
  };
  const isDark = section.background === "primary" || section.background === "dark";
  const textColor = isDark ? "#ffffff" : design.palette.text;
  const mutedColor = isDark ? "rgba(255,255,255,0.7)" : design.palette.textMuted;
  const bg = bgMap[section.background] || design.palette.background;
  const paddingMap: Record<string, string> = { none: "0", sm: "2rem", md: "4rem", lg: "6rem" };
  const pt = paddingMap[section.paddingTop] || "4rem";
  const pb = paddingMap[section.paddingBottom] || "4rem";
  const headingFont = `"${design.typography.headingFont}", serif`;
  const radius = design.radius;

  const sectionStyle = { backgroundColor: bg, color: textColor, paddingTop: pt, paddingBottom: pb };
  const containerStyle = { maxWidth: "1200px", margin: "0 auto", padding: "0 1.5rem" };

  function renderHeadline(text?: string, subtitle?: string) {
    if (!text) return null;
    return (
      <div style={{ textAlign: "center" as const, marginBottom: "3rem" }}>
        <h2 style={{ fontSize: "2.25rem", fontWeight: 700, fontFamily: headingFont, marginBottom: subtitle ? "0.75rem" : 0 }}>{text}</h2>
        {subtitle && <p style={{ fontSize: "1.1rem", color: mutedColor, maxWidth: 600, margin: "0 auto" }}>{subtitle}</p>}
      </div>
    );
  }

  function renderButton(btn: any, i: number) {
    const isPrimary = btn.variant === "primary" || !btn.variant;
    return (
      <a
        key={i}
        href={btn.href}
        style={{
          display: "inline-block",
          padding: "0.75rem 1.75rem",
          borderRadius: `${radius}px`,
          backgroundColor: isPrimary ? (isDark ? "#fff" : design.palette.primary) : "transparent",
          color: isPrimary ? (isDark ? design.palette.primary : "#fff") : textColor,
          border: !isPrimary ? `2px solid ${isDark ? "#fff" : design.palette.primary}` : "none",
          textDecoration: "none",
          fontWeight: 600,
          fontSize: "0.95rem",
          transition: "opacity 0.2s",
        }}
      >
        {btn.label}
      </a>
    );
  }

  function getIcon(name: string, size = 24) {
    const Icon = (LucideIcons as any)[name] || LucideIcons.Star;
    return <Icon size={size} />;
  }

  switch (section.type) {
    case "hero":
      const isCentered = section.layout === "centered" || section.layout === "bg_image";
      const isSplit = section.layout === "split_left" || section.layout === "split_right";
      return (
        <section style={{ ...sectionStyle, paddingTop: "5rem", paddingBottom: "5rem", textAlign: isCentered ? "center" : "left" as any, position: "relative" as const }}>
          {section.layout === "bg_image" && section.image?.src && (
            <div style={{ position: "absolute" as const, inset: 0, backgroundImage: `url(${section.image.src})`, backgroundSize: "cover", backgroundPosition: "center", opacity: 0.2 }} />
          )}
          <div style={{ ...containerStyle, position: "relative" as const, display: isSplit ? "grid" : "block", gridTemplateColumns: isSplit ? "1fr 1fr" : undefined, gap: "3rem", alignItems: "center" }}>
            <div style={{ order: section.layout === "split_right" ? 2 : 1 }}>
              <h1 style={{ fontSize: "3.25rem", fontWeight: 800, fontFamily: headingFont, lineHeight: 1.1, marginBottom: "1.25rem" }}>{section.headline}</h1>
              {section.subheadline && <p style={{ fontSize: "1.2rem", color: mutedColor, marginBottom: "2rem", maxWidth: isCentered ? 600 : undefined, margin: isCentered ? "0 auto 2rem" : undefined }}>{section.subheadline}</p>}
              <div style={{ display: "flex", gap: "1rem", justifyContent: isCentered ? "center" : "flex-start", flexWrap: "wrap" as const }}>
                {section.buttons?.map(renderButton)}
              </div>
            </div>
            {isSplit && section.image?.src && (
              <div style={{ order: section.layout === "split_right" ? 1 : 2, borderRadius: `${radius}px`, overflow: "hidden" }}>
                <img src={section.image.src} alt={section.image.alt || ""} style={{ width: "100%", height: "auto", display: "block" }} />
              </div>
            )}
          </div>
        </section>
      );

    case "benefits":
      return (
        <section style={sectionStyle}>
          <div style={containerStyle}>
            {renderHeadline(section.headline, section.subtitle)}
            <div style={{ display: "grid", gridTemplateColumns: `repeat(${section.columns || 3}, 1fr)`, gap: "2rem" }}>
              {section.items?.map((item: any, i: number) => (
                <div key={i} style={{ textAlign: "center", padding: "1.5rem" }}>
                  {item.icon && <div style={{ color: design.palette.primary, marginBottom: "1rem", display: "flex", justifyContent: "center" }}>{getIcon(item.icon, 32)}</div>}
                  <h3 style={{ fontSize: "1.15rem", fontWeight: 600, marginBottom: "0.5rem", fontFamily: headingFont }}>{item.title}</h3>
                  <p style={{ color: mutedColor, fontSize: "0.95rem", lineHeight: 1.6 }}>{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      );

    case "services":
      return (
        <section style={sectionStyle}>
          <div style={containerStyle}>
            {renderHeadline(section.headline, section.subtitle)}
            <div style={{ display: "grid", gridTemplateColumns: section.layout === "list" ? "1fr" : "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem" }}>
              {section.items?.map((item: any, i: number) => (
                <div key={i} style={{ padding: "2rem", borderRadius: `${radius}px`, backgroundColor: isDark ? "rgba(255,255,255,0.05)" : design.palette.surface, border: `1px solid ${isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.06)"}` }}>
                  {item.icon && <div style={{ color: design.palette.primary, marginBottom: "0.75rem" }}>{getIcon(item.icon, 28)}</div>}
                  <h3 style={{ fontSize: "1.15rem", fontWeight: 600, marginBottom: "0.5rem", fontFamily: headingFont }}>{item.title}</h3>
                  <p style={{ color: mutedColor, fontSize: "0.9rem", lineHeight: 1.6 }}>{item.description}</p>
                  {item.price && <p style={{ fontWeight: 700, marginTop: "1rem", color: design.palette.primary, fontSize: "1.1rem" }}>{item.price}</p>}
                  {item.button && renderButton(item.button, 0)}
                </div>
              ))}
            </div>
          </div>
        </section>
      );

    case "gallery":
      return (
        <section style={sectionStyle}>
          <div style={containerStyle}>
            {renderHeadline(section.headline)}
            <div style={{ display: "grid", gridTemplateColumns: `repeat(${section.columns || 3}, 1fr)`, gap: "0.75rem" }}>
              {section.images?.map((img: any, i: number) => (
                <div key={i} style={{ borderRadius: `${radius}px`, overflow: "hidden", aspectRatio: "4/3", backgroundColor: design.palette.surface }}>
                  <img src={img.src} alt={img.alt || ""} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                </div>
              ))}
            </div>
          </div>
        </section>
      );

    case "pricing":
      return (
        <section style={sectionStyle}>
          <div style={containerStyle}>
            {renderHeadline(section.headline, section.subtitle)}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem", maxWidth: 900, margin: "0 auto" }}>
              {section.tiers?.map((tier: any, i: number) => (
                <div key={i} style={{ padding: "2.5rem 2rem", borderRadius: `${radius}px`, border: tier.highlighted ? `2px solid ${design.palette.primary}` : `1px solid ${isDark ? "rgba(255,255,255,0.1)" : "#e5e7eb"}`, backgroundColor: tier.highlighted ? (isDark ? "rgba(255,255,255,0.05)" : `${design.palette.primary}08`) : "transparent", textAlign: "center", position: "relative" as const }}>
                  {tier.highlighted && <div style={{ position: "absolute" as const, top: -12, left: "50%", transform: "translateX(-50%)", backgroundColor: design.palette.primary, color: "#fff", padding: "0.2rem 1rem", borderRadius: "999px", fontSize: "0.75rem", fontWeight: 600 }}>Beliebt</div>}
                  <h3 style={{ fontSize: "1.25rem", fontWeight: 600, fontFamily: headingFont }}>{tier.name}</h3>
                  <p style={{ fontSize: "2.5rem", fontWeight: 800, color: design.palette.primary, margin: "1rem 0" }}>{tier.price}</p>
                  {tier.period && <p style={{ color: mutedColor, marginTop: "-0.75rem", marginBottom: "1rem", fontSize: "0.9rem" }}>{tier.period}</p>}
                  <ul style={{ listStyle: "none", padding: 0, margin: "1.5rem 0", textAlign: "left" }}>
                    {tier.features?.map((f: string, j: number) => (
                      <li key={j} style={{ padding: "0.4rem 0", fontSize: "0.9rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                        <span style={{ color: design.palette.primary }}>&#10003;</span> {f}
                      </li>
                    ))}
                  </ul>
                  {tier.button && renderButton(tier.button, 0)}
                </div>
              ))}
            </div>
          </div>
        </section>
      );

    case "team":
      return (
        <section style={sectionStyle}>
          <div style={containerStyle}>
            {renderHeadline(section.headline)}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "2rem" }}>
              {section.members?.map((m: any, i: number) => (
                <div key={i} style={{ textAlign: "center" }}>
                  <div style={{ width: 140, height: 140, borderRadius: "50%", backgroundColor: design.palette.surface, margin: "0 auto 1.25rem", overflow: "hidden" }}>
                    {m.image?.src && <img src={m.image.src} alt={m.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />}
                  </div>
                  <h3 style={{ fontWeight: 600, fontSize: "1.1rem", fontFamily: headingFont }}>{m.name}</h3>
                  <p style={{ color: mutedColor, fontSize: "0.9rem" }}>{m.role}</p>
                  {m.bio && <p style={{ color: mutedColor, fontSize: "0.85rem", marginTop: "0.5rem" }}>{m.bio}</p>}
                </div>
              ))}
            </div>
          </div>
        </section>
      );

    case "testimonials":
      return (
        <section style={sectionStyle}>
          <div style={containerStyle}>
            {renderHeadline(section.headline)}
            <div style={{ display: "grid", gridTemplateColumns: section.layout === "stacked" ? "1fr" : "repeat(auto-fit, minmax(300px, 1fr))", gap: "1.5rem", maxWidth: section.layout === "stacked" ? 700 : undefined, margin: "0 auto" }}>
              {section.items?.map((item: any, i: number) => (
                <blockquote key={i} style={{ padding: "2rem", borderRadius: `${radius}px`, backgroundColor: isDark ? "rgba(255,255,255,0.05)" : design.palette.surface, borderLeft: `4px solid ${design.palette.primary}`, margin: 0 }}>
                  {item.rating && (
                    <div style={{ color: "#f59e0b", marginBottom: "0.75rem", fontSize: "1.1rem" }}>
                      {"★".repeat(item.rating)}{"☆".repeat(5 - item.rating)}
                    </div>
                  )}
                  <p style={{ fontStyle: "italic", marginBottom: "1rem", fontSize: "1rem", lineHeight: 1.6 }}>
                    &ldquo;{item.quote}&rdquo;
                  </p>
                  <footer style={{ fontWeight: 600, fontSize: "0.9rem" }}>
                    &mdash; {item.author}
                    {item.role && <span style={{ fontWeight: 400, color: mutedColor }}>, {item.role}</span>}
                  </footer>
                </blockquote>
              ))}
            </div>
          </div>
        </section>
      );

    case "faq": {
      return (
        <section style={sectionStyle}>
          <div style={{ ...containerStyle, maxWidth: 800 }}>
            {renderHeadline(section.headline)}
            <div style={{ display: "flex", flexDirection: "column" as const, gap: "0.75rem" }}>
              {section.items?.map((item: any, i: number) => (
                <FaqItem key={i} item={item} design={design} isDark={isDark} mutedColor={mutedColor} radius={radius} />
              ))}
            </div>
          </div>
        </section>
      );
    }

    case "contact":
      return (
        <section style={sectionStyle}>
          <div style={{ ...containerStyle, display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem" }}>
            <div>
              {section.headline && <h2 style={{ fontSize: "2rem", fontWeight: 700, fontFamily: headingFont, marginBottom: "1rem" }}>{section.headline}</h2>}
              {section.subtitle && <p style={{ color: mutedColor, marginBottom: "2rem" }}>{section.subtitle}</p>}
              <div style={{ display: "flex", flexDirection: "column" as const, gap: "1rem" }}>
                {section.showPhone && meta.phone && <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>{getIcon("Phone", 20)} <a href={`tel:${meta.phone}`} style={{ color: textColor, textDecoration: "none" }}>{meta.phone}</a></div>}
                {section.showEmail && meta.email && <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>{getIcon("Mail", 20)} <a href={`mailto:${meta.email}`} style={{ color: textColor, textDecoration: "none" }}>{meta.email}</a></div>}
                {section.showAddress && meta.address && <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>{getIcon("MapPin", 20)} {meta.address}</div>}
                {section.showHours && meta.openingHours && <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>{getIcon("Clock", 20)} {meta.openingHours}</div>}
              </div>
            </div>
            <ContactForm section={section} design={design} radius={radius} />
          </div>
        </section>
      );

    case "map":
      return (
        <section style={sectionStyle}>
          <div style={{ ...containerStyle, textAlign: "center" as const }}>
            {renderHeadline(section.headline)}
            <div style={{ padding: "3rem", backgroundColor: isDark ? "rgba(255,255,255,0.05)" : design.palette.surface, borderRadius: `${radius}px`, display: "flex", flexDirection: "column" as const, alignItems: "center", gap: "0.75rem" }}>
              <div style={{ color: design.palette.primary }}>{getIcon("MapPin", 40)}</div>
              <p style={{ fontSize: "1.25rem", fontWeight: 600 }}>{section.address}</p>
              {section.description && <p style={{ color: mutedColor }}>{section.description}</p>}
            </div>
          </div>
        </section>
      );

    case "cta_banner":
      return (
        <section style={{ backgroundColor: design.palette.primary, color: "#fff", paddingTop: "4rem", paddingBottom: "4rem", textAlign: "center" as const }}>
          <div style={{ maxWidth: 800, margin: "0 auto", padding: "0 1.5rem" }}>
            <h2 style={{ fontSize: "2.25rem", fontWeight: 700, fontFamily: headingFont, marginBottom: "1rem" }}>{section.headline}</h2>
            {section.subtitle && <p style={{ fontSize: "1.1rem", marginBottom: "2rem", opacity: 0.9 }}>{section.subtitle}</p>}
            <div style={{ display: "flex", gap: "1rem", justifyContent: "center" }}>
              {section.buttons?.map((btn: any, i: number) => (
                <a key={i} href={btn.href} style={{ display: "inline-block", padding: "0.75rem 2rem", borderRadius: `${radius}px`, backgroundColor: "#fff", color: design.palette.primary, textDecoration: "none", fontWeight: 600 }}>{btn.label}</a>
              ))}
            </div>
          </div>
        </section>
      );

    case "footer":
      return (
        <footer style={{ backgroundColor: "#111827", color: "#d1d5db", paddingTop: "3rem", paddingBottom: "2rem" }}>
          <div style={{ ...containerStyle, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "2rem", marginBottom: "2rem" }}>
            <div>
              <h4 style={{ color: "#fff", fontWeight: 700, fontSize: "1.15rem", marginBottom: "1rem", fontFamily: headingFont }}>{meta.businessName}</h4>
              {meta.address && <p style={{ fontSize: "0.85rem", marginBottom: "0.5rem" }}>{meta.address}</p>}
              {meta.phone && <p style={{ fontSize: "0.85rem", marginBottom: "0.5rem" }}>{meta.phone}</p>}
              {meta.email && <p style={{ fontSize: "0.85rem" }}>{meta.email}</p>}
            </div>
            {section.columns?.map((col: any, i: number) => (
              <div key={i}>
                <h4 style={{ color: "#fff", fontWeight: 600, marginBottom: "1rem", fontSize: "0.95rem" }}>{col.title}</h4>
                <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                  {col.links?.map((link: any, j: number) => (
                    <li key={j} style={{ marginBottom: "0.4rem" }}>
                      <a href={link.href} style={{ color: "#9ca3af", textDecoration: "none", fontSize: "0.85rem" }}>{link.label}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: "1.5rem", textAlign: "center" as const }}>
            {section.copyright && <p style={{ fontSize: "0.8rem", opacity: 0.6 }}>{section.copyright}</p>}
            {section.showCredit && meta.creditBrand && (
              <p style={{ fontSize: "0.75rem", opacity: 0.4, marginTop: "0.5rem" }}>
                Website by {meta.creditBrand.url ? <a href={meta.creditBrand.url} style={{ color: "#9ca3af" }}>{meta.creditBrand.name}</a> : meta.creditBrand.name}
              </p>
            )}
          </div>
        </footer>
      );

    default:
      return null;
  }
}

function FaqItem({ item, design, isDark, mutedColor, radius }: any) {
  const [open, setOpen] = useState(false);
  return (
    <div
      style={{
        borderRadius: `${radius}px`,
        backgroundColor: isDark ? "rgba(255,255,255,0.05)" : design.palette.surface,
        overflow: "hidden",
      }}
    >
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: "100%",
          padding: "1.25rem 1.5rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          border: "none",
          background: "none",
          cursor: "pointer",
          fontWeight: 600,
          fontSize: "1rem",
          color: "inherit",
          textAlign: "left" as const,
        }}
      >
        {item.question}
        <span style={{ transform: open ? "rotate(180deg)" : "none", transition: "transform 0.2s", fontSize: "1.2rem" }}>&#x25BC;</span>
      </button>
      {open && (
        <div style={{ padding: "0 1.5rem 1.25rem", color: mutedColor, lineHeight: 1.6, fontSize: "0.95rem" }}>
          {item.answer}
        </div>
      )}
    </div>
  );
}

function ContactForm({ section, design, radius }: any) {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData.entries());

    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      setSubmitted(true);
    } catch {
      alert("Something went wrong. Please try again.");
    }
    setSubmitting(false);
  };

  if (submitted) {
    return (
      <div style={{ display: "flex", flexDirection: "column" as const, alignItems: "center", justifyContent: "center", padding: "3rem", textAlign: "center" as const }}>
        <div style={{ color: design.palette.primary, marginBottom: "1rem" }}>{(LucideIcons as any).CheckCircle && <LucideIcons.CheckCircle size={48} />}</div>
        <h3 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "0.5rem" }}>Vielen Dank!</h3>
        <p style={{ color: design.palette.textMuted }}>Wir melden uns in Kürze bei Ihnen.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column" as const, gap: "1rem" }}>
      {section.fields?.map((field: any) => (
        <div key={field.name}>
          <label style={{ display: "block", fontWeight: 500, marginBottom: "0.3rem", fontSize: "0.9rem" }}>
            {field.label}{field.required ? " *" : ""}
          </label>
          {field.type === "textarea" ? (
            <textarea
              name={field.name}
              required={field.required}
              rows={4}
              style={{ width: "100%", padding: "0.75rem", borderRadius: `${radius}px`, border: "1px solid #d1d5db", fontSize: "0.9rem" }}
            />
          ) : field.type === "select" ? (
            <select
              name={field.name}
              required={field.required}
              style={{ width: "100%", padding: "0.75rem", borderRadius: `${radius}px`, border: "1px solid #d1d5db", fontSize: "0.9rem", backgroundColor: "#fff" }}
            >
              <option value="">Bitte wählen...</option>
              {field.options?.map((opt: string) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          ) : (
            <input
              type={field.type}
              name={field.name}
              required={field.required}
              style={{ width: "100%", padding: "0.75rem", borderRadius: `${radius}px`, border: "1px solid #d1d5db", fontSize: "0.9rem" }}
            />
          )}
        </div>
      ))}
      <button
        type="submit"
        disabled={submitting}
        style={{
          padding: "0.85rem 2rem",
          borderRadius: `${radius}px`,
          backgroundColor: design.palette.primary,
          color: "#fff",
          border: "none",
          fontWeight: 600,
          cursor: "pointer",
          fontSize: "1rem",
          opacity: submitting ? 0.7 : 1,
        }}
      >
        {submitting ? "Wird gesendet..." : section.submitLabel || "Absenden"}
      </button>
    </form>
  );
}
