import fs from "fs/promises";
import path from "path";
import { v4 } from "@website-engine/core";
import type { ArtDirection, PexelsQuery } from "@website-engine/core";
import { getAssetsDir } from "../storage/projects";

export interface PexelsPhoto {
  id: number;
  url: string;
  src: { medium: string; large: string; original: string };
  alt: string;
  photographer: string;
}

export interface ScoredPhoto extends PexelsPhoto {
  relevanceScore: number;
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
 * List all images in a project's assets directory (excludes scraped/)
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

/**
 * List scraped images separately
 */
export async function listScrapedImages(
  projectId: string
): Promise<{ filename: string; path: string }[]> {
  const assetsDir = await getAssetsDir(projectId);
  const scrapedDir = path.join(assetsDir, "scraped");
  try {
    const files = await fs.readdir(scrapedDir);
    return files
      .filter((f) => /\.(jpg|jpeg|png|gif|webp|svg|avif)$/i.test(f))
      .map((f) => ({ filename: f, path: `assets/scraped/${f}` }));
  } catch {
    return [];
  }
}

// ── Multi-query search with scoring ───────────────────────

/**
 * Search Pexels with multiple queries, scoring and deduplicating results
 */
export async function searchPexelsMulti(
  queries: PexelsQuery[],
  perQuery = 8
): Promise<ScoredPhoto[]> {
  const allPhotos = new Map<number, ScoredPhoto>();

  for (let i = 0; i < queries.length; i++) {
    const q = queries[i];
    try {
      const result = await searchPexels(q.query, 1, perQuery);
      for (const photo of result.photos) {
        if (!allPhotos.has(photo.id)) {
          allPhotos.set(photo.id, {
            ...photo,
            relevanceScore: queries.length - i, // earlier queries = more relevant
          });
        } else {
          // Photo matched multiple queries = higher score
          allPhotos.get(photo.id)!.relevanceScore += 1;
        }
      }
    } catch {
      // Skip failed queries silently
    }
  }

  return Array.from(allPhotos.values()).sort(
    (a, b) => b.relevanceScore - a.relevanceScore
  );
}

/**
 * Select a coherent set of N images from scored results (no same photographer twice early on)
 */
export function selectCoherentSet(
  photos: ScoredPhoto[],
  count: number
): ScoredPhoto[] {
  const selected: ScoredPhoto[] = [];
  const photographers = new Set<string>();

  for (const photo of photos) {
    if (selected.length >= count) break;
    // Avoid same photographer early on for visual variety
    if (photographers.has(photo.photographer) && selected.length < count - 2) {
      continue;
    }
    selected.push(photo);
    photographers.add(photo.photographer);
  }

  return selected;
}

/**
 * Fetch industry-appropriate images and download to project
 */
export async function fetchIndustryImages(
  projectId: string,
  artDirection: ArtDirection,
  location?: string
): Promise<{ hero: string[]; services: string[]; gallery: string[]; team: string[] }> {
  const locationSuffix = location ? ` ${location}` : "";

  const downloadSet = async (
    queries: PexelsQuery[],
    count: number,
    appendLocation = false
  ): Promise<string[]> => {
    const adjustedQueries = appendLocation
      ? queries.map((q) => ({ ...q, query: q.query + locationSuffix }))
      : queries;

    try {
      const photos = await searchPexelsMulti(adjustedQueries, 8);
      const selected = selectCoherentSet(photos, count);
      const paths: string[] = [];

      for (const photo of selected) {
        try {
          const result = await downloadPexelsPhoto(
            projectId,
            photo.src.large,
            photo.alt
          );
          paths.push(result.path);
        } catch {
          // Skip failed downloads
        }
      }
      return paths;
    } catch {
      return [];
    }
  };

  return {
    hero: await downloadSet(artDirection.heroQueries, 2, true),
    services: await downloadSet(artDirection.serviceQueries, 6),
    gallery: await downloadSet(artDirection.galleryQueries, 6),
    team: await downloadSet(artDirection.teamQueries, 3),
  };
}

/**
 * Inject downloaded images into a generated project's sections
 */
export function injectImagesIntoProject(
  project: any,
  images: { hero: string[]; services: string[]; gallery: string[]; team: string[] }
): void {
  let heroIdx = 0;
  let serviceIdx = 0;
  let galleryIdx = 0;
  let teamIdx = 0;

  for (const page of project.pages || []) {
    for (const section of page.sections || []) {
      switch (section.type) {
        case "hero":
          if (images.hero[heroIdx] && (!section.image || !section.image.src)) {
            section.image = {
              src: images.hero[heroIdx],
              alt: section.headline || "Hero",
            };
            heroIdx++;
          }
          break;

        case "services":
          if (section.items) {
            for (const item of section.items) {
              if (images.services[serviceIdx] && (!item.image || !item.image.src)) {
                item.image = {
                  src: images.services[serviceIdx],
                  alt: item.title || "Service",
                };
                serviceIdx++;
              }
            }
          }
          break;

        case "gallery":
          if (section.images) {
            for (let i = 0; i < section.images.length; i++) {
              if (images.gallery[galleryIdx] && (!section.images[i].src || section.images[i].src === "placeholder")) {
                section.images[i].src = images.gallery[galleryIdx];
                galleryIdx++;
              }
            }
          }
          break;

        case "team":
          if (section.members) {
            for (const member of section.members) {
              if (images.team[teamIdx] && (!member.image || !member.image.src)) {
                member.image = {
                  src: images.team[teamIdx],
                  alt: member.name || "Team Member",
                };
                teamIdx++;
              }
            }
          }
          break;
      }
    }
  }
}
