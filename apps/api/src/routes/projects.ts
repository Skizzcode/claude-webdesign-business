import { Router } from "express";
import {
  listProjects,
  loadProject,
  saveProject,
  deleteProject,
} from "../storage/projects";

const router = Router();

// List all projects
router.get("/", async (_req, res) => {
  try {
    const projects = await listProjects();
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: "Failed to list projects", details: String(err) });
  }
});

// Get a single project
router.get("/:id", async (req, res) => {
  try {
    const project = await loadProject(req.params.id);
    res.json(project);
  } catch (err) {
    res.status(404).json({ error: "Project not found", details: String(err) });
  }
});

// Update a project (full replace)
router.put("/:id", async (req, res) => {
  try {
    const project = req.body;
    project.updatedAt = new Date().toISOString();
    await saveProject(project);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Failed to save project", details: String(err) });
  }
});

// Patch a project (partial update)
router.patch("/:id", async (req, res) => {
  try {
    const existing = await loadProject(req.params.id);
    const updated = { ...existing, ...req.body, updatedAt: new Date().toISOString() };
    await saveProject(updated);
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: "Failed to update project", details: String(err) });
  }
});

// Delete a project
router.delete("/:id", async (req, res) => {
  try {
    await deleteProject(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete project", details: String(err) });
  }
});

export default router;
