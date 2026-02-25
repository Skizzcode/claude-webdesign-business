import fs from "fs/promises";
import path from "path";
import { SiteProjectSchema, type SiteProject } from "@website-engine/core";

// Resolve data dir relative to this file so it works regardless of cwd
const DATA_DIR = path.resolve(__dirname, "../../data/projects");

async function ensureDir(dir: string) {
  await fs.mkdir(dir, { recursive: true });
}

export async function getProjectDir(id: string): Promise<string> {
  const dir = path.join(DATA_DIR, id);
  await ensureDir(dir);
  return dir;
}

export async function getAssetsDir(id: string): Promise<string> {
  const dir = path.join(DATA_DIR, id, "assets");
  await ensureDir(dir);
  return dir;
}

export async function saveProject(project: SiteProject): Promise<void> {
  const dir = await getProjectDir(project.id);
  const filePath = path.join(dir, "project.json");
  await fs.writeFile(filePath, JSON.stringify(project, null, 2), "utf-8");
}

export async function loadProject(id: string): Promise<SiteProject> {
  const dir = await getProjectDir(id);
  const filePath = path.join(dir, "project.json");
  const raw = await fs.readFile(filePath, "utf-8");
  return SiteProjectSchema.parse(JSON.parse(raw));
}

export async function listProjects(): Promise<
  { id: string; name: string; status: string; updatedAt: string }[]
> {
  await ensureDir(DATA_DIR);
  const entries = await fs.readdir(DATA_DIR, { withFileTypes: true });
  const projects: { id: string; name: string; status: string; updatedAt: string }[] = [];

  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    try {
      const raw = await fs.readFile(
        path.join(DATA_DIR, entry.name, "project.json"),
        "utf-8"
      );
      const data = JSON.parse(raw);
      projects.push({
        id: data.id,
        name: data.meta?.businessName || "Unnamed",
        status: data.status || "draft",
        updatedAt: data.updatedAt || data.createdAt,
      });
    } catch {
      // skip broken project folders
    }
  }

  return projects.sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  );
}

export async function deleteProject(id: string): Promise<void> {
  const dir = path.join(DATA_DIR, id);
  await fs.rm(dir, { recursive: true, force: true });
}

export async function saveScrapedData(id: string, data: unknown): Promise<void> {
  const dir = await getProjectDir(id);
  await fs.writeFile(
    path.join(dir, "scraped.json"),
    JSON.stringify(data, null, 2),
    "utf-8"
  );
}

export async function loadScrapedData(id: string): Promise<unknown> {
  const dir = await getProjectDir(id);
  const raw = await fs.readFile(path.join(dir, "scraped.json"), "utf-8");
  return JSON.parse(raw);
}
