import fs from "fs/promises";
import path from "path";
import { v4 } from "@website-engine/core";
import { getAssetsDir } from "../storage/projects";

export interface PexelsPhoto {
  id: number;
  url: string;
  src: { medium: string; large: string; original: string };
  alt: string;
  photographer: string;
}

/**
 * Search Pexels for free stock photos
 */
export async function searchPexels(
  query: string,
  page = 1,
  perPage = 15
): Promise<{ photos: PexelsPhoto[]; totalResults: number }> {
  const apiKey = process.env.PEXELS_API_KEY;
  if (!apiKey) {
    throw new Error("PEXELS_API_KEY not configured. Add it to your .env file.");
  }

  const url = `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&page=${page}&per_page=${perPage}`;
  const response = await fetch(url, {
    headers: { Authorization: apiKey },
  });

  if (!response.ok) {
    throw new Error(`Pexels API error: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();
  return {
    photos: data.photos.map((p: any) => ({
      id: p.id,
      url: p.url,
      src: { medium: p.src.medium, large: p.src.large, original: p.src.original },
      alt: p.alt || query,
      photographer: p.photographer,
    })),
    totalResults: data.total_results,
  };
}

/**
 * Download a Pexels photo to project assets
 */
export async function downloadPexelsPhoto(
  projectId: string,
  photoUrl: string,
  alt: string
): Promise<{ filename: string; path: string }> {
  const assetsDir = await getAssetsDir(projectId);
  const ext = ".jpg";
  const filename = `pexels-${v4().slice(0, 8)}${ext}`;
  const destPath = path.join(assetsDir, filename);

  const response = await fetch(photoUrl);
  if (!response.ok) throw new Error(`Failed to download: ${response.status}`);

  const buffer = Buffer.from(await response.arrayBuffer());
  await fs.writeFile(destPath, buffer);

  return { filename, path: `assets/${filename}` };
}

/**
 * Handle file upload to project assets
 */
export async function saveUploadedFile(
  projectId: string,
  file: { originalname: string; buffer: Buffer; mimetype: string }
): Promise<{ filename: string; path: string }> {
  const assetsDir = await getAssetsDir(projectId);
  const ext = path.extname(file.originalname) || ".jpg";
  const filename = `upload-${v4().slice(0, 8)}${ext}`;
  const destPath = path.join(assetsDir, filename);

  await fs.writeFile(destPath, file.buffer);

  return { filename, path: `assets/${filename}` };
}

/**
 * List all images in a project's assets directory
 */
export async function listProjectImages(
  projectId: string
): Promise<{ filename: string; path: string }[]> {
  const assetsDir = await getAssetsDir(projectId);
  try {
    const files = await fs.readdir(assetsDir);
    return files
      .filter((f) => /\.(jpg|jpeg|png|gif|webp|svg|avif)$/i.test(f))
      .map((f) => ({ filename: f, path: `assets/${f}` }));
  } catch {
    return [];
  }
}
