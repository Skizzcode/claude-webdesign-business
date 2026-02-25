import "dotenv/config";
import express from "express";
import cors from "cors";
import path from "path";
import projectsRouter from "./routes/projects";
import scrapeRouter from "./routes/scrape";
import generateRouter from "./routes/generate";
import mediaRouter from "./routes/media";
import exportRouter from "./routes/export";

const app = express();
const PORT = process.env.API_PORT || 3001;

app.use(cors());
app.use(express.json({ limit: "50mb" }));

// Serve project assets statically
app.use(
  "/data/projects",
  express.static(path.resolve(process.cwd(), "data", "projects"))
);

// API routes
app.use("/api/projects", projectsRouter);
app.use("/api/scrape", scrapeRouter);
app.use("/api/generate", generateRouter);
app.use("/api/media", mediaRouter);
app.use("/api/export", exportRouter);

// Health check
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`\n  🚀 Website Engine API running on http://localhost:${PORT}`);
  console.log(`  📁 Data directory: ${path.resolve(process.cwd(), "data", "projects")}\n`);
});
