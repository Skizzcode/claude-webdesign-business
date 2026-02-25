import { Router } from "express";
import { v4, type StylePreset } from "@website-engine/core";
import {
  generateSiteProject,
  aiRewriteSection,
  aiGenerateFaqs,
  aiGeneratePage,
} from "../services/generator";
import { classifyIndustry } from "../services/industry-classifier";
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
  } catch (err: any) {
    const msg = err?.issues ? JSON.stringify(err.issues, null, 2) : String(err);
    console.error("[generate] Error:", msg);
    res.status(500).json({ error: "Generation failed", details: msg });
  }
});

// Classify industry from scraped data
router.post("/classify", async (req, res) => {
  try {
    const { projectId, userHint } = req.body;

    if (!projectId) {
      return res.status(400).json({ error: "projectId is required" });
    }

    const scrapedData = (await loadScrapedData(projectId)) as any;
    if (!scrapedData) {
      return res.status(404).json({ error: "No scraped data found for this project" });
    }

    const classification = await classifyIndustry(scrapedData, userHint);
    res.json(classification);
  } catch (err) {
    res.status(500).json({ error: "Classification failed", details: String(err) });
  }
});

// Regenerate with different theme (keep business data)
router.post("/regenerate", async (req, res) => {
  try {
    const { projectId, preset = "modern_clean", language = "de", industryId, seed } = req.body;

    if (!projectId) {
      return res.status(400).json({ error: "projectId is required" });
    }

    const scrapedData = (await loadScrapedData(projectId)) as any;
    if (!scrapedData) {
      return res.status(404).json({ error: "No scraped data found for this project" });
    }

    const project = await generateSiteProject({
      scrapedData,
      preset: preset as StylePreset,
      language,
      industry: industryId,
      projectId,
      seed: seed || v4(),
      onProgress: (msg) => console.log(`[regenerate] ${msg}`),
    });

    await saveProject(project);
    res.json(project);
  } catch (err: any) {
    const msg = err?.issues ? JSON.stringify(err.issues, null, 2) : String(err);
    console.error("[regenerate] Error:", msg);
    res.status(500).json({ error: "Regeneration failed", details: msg });
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
