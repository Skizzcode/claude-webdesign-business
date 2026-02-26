const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { "Content-Type": "application/json", ...options?.headers },
    ...options,
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({ error: res.statusText }));
    throw new Error(body.error || body.details || `API error: ${res.status}`);
  }
  return res.json();
}

// Projects
export const api = {
  listProjects: () =>
    request<{ id: string; name: string; status: string; updatedAt: string }[]>("/api/projects"),

  getProject: (id: string) => request<any>(`/api/projects/${id}`),

  updateProject: (id: string, data: any) =>
    request<any>(`/api/projects/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),

  deleteProject: (id: string) =>
    request<any>(`/api/projects/${id}`, { method: "DELETE" }),

  // Scrape
  startScrape: (url: string) =>
    request<{ jobId: string; projectId: string }>("/api/scrape", {
      method: "POST",
      body: JSON.stringify({ url }),
    }),

  getScrapeStatus: (jobId: string) =>
    request<{
      status: "running" | "done" | "error";
      projectId: string;
      progress: string[];
      result?: any;
      error?: string;
    }>(`/api/scrape/${jobId}`),

  // Generate
  generateSite: (opts: {
    projectId: string;
    preset?: string;
    language?: string;
    industry?: string;
  }) =>
    request<any>("/api/generate", {
      method: "POST",
      body: JSON.stringify(opts),
    }),

  // AI actions
  rewriteSection: (section: any, style: string, language: string) =>
    request<any>("/api/generate/rewrite-section", {
      method: "POST",
      body: JSON.stringify({ section, style, language }),
    }),

  generateFaqs: (businessName: string, industry: string, language: string) =>
    request<any>("/api/generate/generate-faqs", {
      method: "POST",
      body: JSON.stringify({ businessName, industry, language }),
    }),

  generatePage: (prompt: string, businessName: string, language: string, preset: string) =>
    request<any>("/api/generate/generate-page", {
      method: "POST",
      body: JSON.stringify({ prompt, businessName, language, preset }),
    }),

  // Media
  searchImages: (query: string) =>
    request<any>(`/api/media/search?q=${encodeURIComponent(query)}`),

  downloadStockPhoto: (projectId: string, photoUrl: string, alt: string) =>
    request<any>("/api/media/download-stock", {
      method: "POST",
      body: JSON.stringify({ projectId, photoUrl, alt }),
    }),

  listProjectImages: (projectId: string) =>
    request<any>(`/api/media/images/${projectId}`),

  listScrapedImages: (projectId: string) =>
    request<any>(`/api/media/scraped-images/${projectId}`),

  // Industry Classification
  classifyIndustry: (projectId: string, userHint?: string) =>
    request<any>("/api/generate/classify", {
      method: "POST",
      body: JSON.stringify({ projectId, userHint }),
    }),

  // Regenerate theme (keep business data, new visuals/layout)
  regenerateTheme: (opts: {
    projectId: string;
    preset?: string;
    language?: string;
    industryId?: string;
    seed?: string;
  }) =>
    request<any>("/api/generate/regenerate", {
      method: "POST",
      body: JSON.stringify(opts),
    }),

  // Website Audit
  auditWebsite: (projectId: string) =>
    request<AuditReport>("/api/generate/audit", {
      method: "POST",
      body: JSON.stringify({ projectId }),
    }),

  // Export
  exportProject: (projectId: string) =>
    request<any>(`/api/export/${projectId}`, { method: "POST" }),
};

// ── Audit Types (mirrored from auditor.ts) ────────────────
export type AuditSeverity = "critical" | "major" | "minor";
export type AuditCategory = "conversion" | "trust" | "ux" | "seo" | "completeness";

export interface AuditIssue {
  id: string;
  title: string;
  description: string;
  severity: AuditSeverity;
  category: AuditCategory;
  fixedIn: string;
}

export interface AuditReport {
  score: number;
  newScore: number;
  issues: AuditIssue[];
  strengths: string[];
  generatedAt: string;
}
