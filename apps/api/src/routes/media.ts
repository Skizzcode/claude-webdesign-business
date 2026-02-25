import { Router } from "express";
import multer from "multer";
import { searchPexels, downloadPexelsPhoto, saveUploadedFile, listProjectImages } from "../services/media";

const router = Router();
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 10 * 1024 * 1024 } });

// Search Pexels for stock photos
router.get("/search", async (req, res) => {
  try {
    const { q, page = "1", perPage = "15" } = req.query;
    if (!q) return res.status(400).json({ error: "Query parameter 'q' is required" });

    const results = await searchPexels(String(q), Number(page), Number(perPage));
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: "Search failed", details: String(err) });
  }
});

// Download a Pexels photo to project assets
router.post("/download-stock", async (req, res) => {
  try {
    const { projectId, photoUrl, alt = "" } = req.body;
    if (!projectId || !photoUrl) {
      return res.status(400).json({ error: "projectId and photoUrl are required" });
    }

    const result = await downloadPexelsPhoto(projectId, photoUrl, alt);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: "Download failed", details: String(err) });
  }
});

// Upload a file to project assets
router.post("/upload/:projectId", upload.single("file"), async (req, res) => {
  try {
    const { projectId } = req.params;
    const file = req.file;
    if (!file) return res.status(400).json({ error: "No file uploaded" });

    const result = await saveUploadedFile(projectId, {
      originalname: file.originalname,
      buffer: file.buffer,
      mimetype: file.mimetype,
    });
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: "Upload failed", details: String(err) });
  }
});

// List project images
router.get("/images/:projectId", async (req, res) => {
  try {
    const images = await listProjectImages(req.params.projectId);
    res.json(images);
  } catch (err) {
    res.status(500).json({ error: "Failed to list images", details: String(err) });
  }
});

export default router;
