import { Router } from "express";
import { v4 } from "@website-engine/core";
import { scrape, type ScrapedResult } from "../services/scraper";
import { saveScrapedData, getProjectDir } from "../storage/projects";

const router = Router();

// In-memory job tracking (simple for MVP)
const jobs = new Map<
  string,
  { status: "running" | "done" | "error"; projectId: string; progress: string[]; result?: ScrapedResult; error?: string }
>();

// Start a scrape job
router.post("/", async (req, res) => {
  const { url } = req.body;
  if (!url) {
    return res.status(400).json({ error: "URL is required" });
  }

  const projectId = v4();
  const jobId = v4();

  jobs.set(jobId, { status: "running", projectId, progress: [] });

  // Run scrape asynchronously
  scrape({
    url,
    projectId,
    onProgress: (msg) => {
      const job = jobs.get(jobId);
      if (job) job.progress.push(msg);
    },
  })
    .then(async (result) => {
      await saveScrapedData(projectId, result);
      const job = jobs.get(jobId);
      if (job) {
        job.status = "done";
        job.result = result;
      }
    })
    .catch((err) => {
      const job = jobs.get(jobId);
      if (job) {
        job.status = "error";
        job.error = String(err);
      }
    });

  res.json({ jobId, projectId });
});

// Check scrape job status
router.get("/:jobId", (req, res) => {
  const job = jobs.get(req.params.jobId);
  if (!job) {
    return res.status(404).json({ error: "Job not found" });
  }
  res.json({
    status: job.status,
    projectId: job.projectId,
    progress: job.progress,
    result: job.status === "done" ? job.result : undefined,
    error: job.status === "error" ? job.error : undefined,
  });
});

export default router;
