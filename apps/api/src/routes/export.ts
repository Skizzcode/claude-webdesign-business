import { Router } from "express";
import { exportProject } from "../services/exporter";

const router = Router();

router.post("/:projectId", async (req, res) => {
  try {
    const { projectId } = req.params;
    const exportDir = await exportProject({
      projectId,
      onProgress: (msg) => console.log(msg),
    });
    res.json({ success: true, exportDir });
  } catch (err) {
    res.status(500).json({ error: "Export failed", details: String(err) });
  }
});

export default router;
