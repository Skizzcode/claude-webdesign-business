import "dotenv/config";
import { v4 } from "@website-engine/core";
import { scrape } from "../services/scraper";
import { saveScrapedData } from "../storage/projects";

async function main() {
  const url = process.argv[2];
  if (!url) {
    console.error("Usage: npm run scrape -- <url>");
    process.exit(1);
  }

  const projectId = process.argv[3] || v4();
  console.log(`\nScraping: ${url}`);
  console.log(`Project ID: ${projectId}\n`);

  const result = await scrape({
    url,
    projectId,
    onProgress: (msg) => console.log(`  ${msg}`),
  });

  await saveScrapedData(projectId, result);

  console.log(`\n✓ Scrape complete!`);
  console.log(`  Pages scraped: ${result.pages.length}`);
  console.log(`  Images downloaded: ${result.downloadedImages.length}`);
  console.log(`  Business: ${result.businessName || "Unknown"}`);
  console.log(`  Phone: ${result.phone || "Not found"}`);
  console.log(`  Email: ${result.email || "Not found"}`);
  console.log(`\n  Project ID: ${projectId}`);
  console.log(`  Data saved to: data/projects/${projectId}/\n`);
}

main().catch((err) => {
  console.error("Scrape failed:", err);
  process.exit(1);
});
