import "dotenv/config";
import { v4, type StylePreset } from "@website-engine/core";
import { generateSiteProject } from "../services/generator";
import { loadScrapedData, saveProject } from "../storage/projects";

async function main() {
  const urlOrProjectId = process.argv[2];
  if (!urlOrProjectId) {
    console.error("Usage: npm run generate -- <projectId> [--preset modern_clean] [--lang de]");
    process.exit(1);
  }

  // Parse flags
  const args = process.argv.slice(3);
  let preset: StylePreset = "swiss_grid";
  let language: "de" | "en" = "de";
  let industry: string | undefined;

  for (let i = 0; i < args.length; i++) {
    if (args[i] === "--preset" && args[i + 1]) preset = args[++i] as StylePreset;
    else if (args[i] === "--lang" && args[i + 1]) language = args[++i] as "de" | "en";
    else if (args[i] === "--industry" && args[i + 1]) industry = args[++i];
  }

  const projectId = urlOrProjectId;
  console.log(`\nGenerating site for project: ${projectId}`);
  console.log(`  Preset: ${preset}, Language: ${language}\n`);

  const scrapedData = (await loadScrapedData(projectId)) as any;
  if (!scrapedData) {
    console.error(`No scraped data found for project ${projectId}`);
    console.error("Run scrape first: npm run scrape -- <url>");
    process.exit(1);
  }

  const project = await generateSiteProject({
    scrapedData,
    preset,
    language,
    industry,
    projectId,
    onProgress: (msg) => console.log(`  ${msg}`),
  });

  await saveProject(project);

  console.log(`\n✓ Site generated!`);
  console.log(`  Pages: ${project.pages.length}`);
  console.log(`  Sections: ${project.pages.reduce((n, p) => n + p.sections.length, 0)}`);
  console.log(`  Preset: ${project.design.stylePreset}`);
  console.log(`\n  Open builder: http://localhost:3000/projects/${projectId}\n`);
}

main().catch((err) => {
  console.error("Generation failed:", err);
  process.exit(1);
});
