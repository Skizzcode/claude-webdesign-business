import { Router } from "express";
import { v4, type StylePreset } from "@website-engine/core";
import { generateSiteProject, aiRewriteSection, aiGenerateFaqs, aiGeneratePage } from "../services/generator";
import { loadScrapedData, saveProject } from "../storage/projects";

const router = Router();

// Generate a full site from scraped data
router.post("/", async (req, res) => {
  try {
    const { projectId, preset = "modern_clean", language = "de", industry } = req.body;

    if (!projectId) {
      return res.status(400).json({ error: "projectId is required (from scrape step)" });
    }

    const scrapedData = (await loadScrapedData(projectId)) as any;
    if (!scrapedData) {
      return res.status(404).json({ error: "No scraped data found for this project" });
    }

    const project = await generateSiteProject({
      scrapedData,
      preset: preset as StylePreset,
      language,
      industry,
      projectId,
      onProgress: (msg) => console.log(`[generate] ${msg}`),
    });

    await saveProject(project);
    res.json(project);
  } catch (err) {
    console.error("[generate] Error:", err);
    res.status(500).json({ error: "Generation failed", details: String(err) });
  }
});

// AI action: rewrite a section
router.post("/rewrite-section", async (req, res) => {
  try {
    const { section, style, language = "de" } = req.body;
    const result = await aiRewriteSection(section, style, language);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: "Rewrite failed", details: String(err) });
  }
});

// AI action: generate FAQs
router.post("/generate-faqs", async (req, res) => {
  try {
    const { businessName, industry, language = "de", count = 6 } = req.body;
    const faqs = await aiGenerateFaqs(businessName, industry, language, count);
    res.json(faqs);
  } catch (err) {
    res.status(500).json({ error: "FAQ generation failed", details: String(err) });
  }
});

// AI action: generate a new page
router.post("/generate-page", async (req, res) => {
  try {
    const { prompt, businessName, language = "de", preset = "modern_clean" } = req.body;
    const page = await aiGeneratePage(prompt, businessName, language, preset);
    res.json(page);
  } catch (err) {
    res.status(500).json({ error: "Page generation failed", details: String(err) });
  }
});

export default router;
