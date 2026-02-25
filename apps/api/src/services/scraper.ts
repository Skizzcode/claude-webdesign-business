import { chromium, type Browser, type Page } from "playwright";
import fs from "fs/promises";
import path from "path";
import https from "https";
import http from "http";
import { URL } from "url";
import { v4 } from "@website-engine/core";
import { getAssetsDir } from "../storage/projects";

export interface ScrapeOptions {
  url: string;
  projectId: string;
  maxPages?: number;
  timeout?: number; // ms, default 15min
  onProgress?: (msg: string) => void;
}

export interface ScrapedPage {
  url: string;
  title?: string;
  headings: string[];
  paragraphs: string[];
  images: { src: string; alt?: string }[];
}

export interface ScrapedResult {
  url: string;
  scrapedAt: string;
  businessName?: string;
  tagline?: string;
  phone?: string;
  email?: string;
  address?: string;
  openingHours?: string;
  socialLinks: { platform: string; url: string }[];
  navLinks: { label: string; href: string }[];
  pages: ScrapedPage[];
  allImages: { src: string; alt?: string }[];
  downloadedImages: { originalUrl: string; localFile: string; alt?: string }[];
  rawText: string;
}

function log(opts: ScrapeOptions, msg: string) {
  opts.onProgress?.(msg);
  console.log(`[scraper] ${msg}`);
}

function isSameOrigin(base: string, href: string): boolean {
  try {
    const baseUrl = new URL(base);
    const targetUrl = new URL(href, base);
    return baseUrl.hostname === targetUrl.hostname;
  } catch {
    return false;
  }
}

function normalizeUrl(base: string, href: string): string | null {
  try {
    const url = new URL(href, base);
    // Strip hash and trailing slash
    url.hash = "";
    let normalized = url.toString();
    if (normalized.endsWith("/") && url.pathname !== "/") {
      normalized = normalized.slice(0, -1);
    }
    return normalized;
  } catch {
    return null;
  }
}

async function extractPageData(page: Page): Promise<ScrapedPage> {
  return page.evaluate(() => {
    const headings = Array.from(
      document.querySelectorAll("h1, h2, h3, h4")
    ).map((el) => el.textContent?.trim() || "");

    const paragraphs = Array.from(document.querySelectorAll("p"))
      .map((el) => el.textContent?.trim() || "")
      .filter((t) => t.length > 10);

    const images = Array.from(document.querySelectorAll("img"))
      .map((el) => ({
        src: (el as HTMLImageElement).src,
        alt: (el as HTMLImageElement).alt || undefined,
      }))
      .filter((img) => img.src && !img.src.startsWith("data:"));

    return {
      url: window.location.href,
      title: document.title,
      headings,
      paragraphs,
      images,
    };
  });
}

async function extractBusinessInfo(page: Page) {
  return page.evaluate(() => {
    const text = document.body?.innerText || "";

    // Phone: German formats
    const phoneMatch = text.match(
      /(?:Tel\.?|Telefon|Phone|Fon)[:\s]*([+\d\s()/-]{7,20})/i
    ) || text.match(/(\+49[\s\d/-]{8,18})/);

    // Email
    const emailMatch = text.match(
      /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/
    );

    // Address: German pattern
    const addressMatch = text.match(
      /(\w[\w\s.-]+\s+\d+[a-z]?\s*,?\s*\d{5}\s+\w[\w\s-]+)/i
    );

    // Opening hours
    const hoursMatch = text.match(
      /((?:Mo|Di|Mi|Do|Fr|Sa|So|Mon|Tue|Wed|Thu|Fri|Sat|Sun)[\s\S]{5,120}(?:\d{1,2}[:.]\d{2}))/i
    );

    // Social links
    const socialLinks: { platform: string; url: string }[] = [];
    document.querySelectorAll('a[href]').forEach((a) => {
      const href = (a as HTMLAnchorElement).href;
      if (href.includes("facebook.com")) socialLinks.push({ platform: "facebook", url: href });
      else if (href.includes("instagram.com")) socialLinks.push({ platform: "instagram", url: href });
      else if (href.includes("twitter.com") || href.includes("x.com")) socialLinks.push({ platform: "twitter", url: href });
      else if (href.includes("linkedin.com")) socialLinks.push({ platform: "linkedin", url: href });
      else if (href.includes("youtube.com")) socialLinks.push({ platform: "youtube", url: href });
      else if (href.includes("xing.com")) socialLinks.push({ platform: "xing", url: href });
      else if (href.includes("yelp.com")) socialLinks.push({ platform: "yelp", url: href });
    });

    // Deduplicate social links
    const uniqueSocials = socialLinks.filter(
      (link, i, arr) => arr.findIndex((l) => l.url === link.url) === i
    );

    // Nav links
    const navLinks: { label: string; href: string }[] = [];
    document.querySelectorAll("nav a, header a, [role='navigation'] a").forEach((a) => {
      const el = a as HTMLAnchorElement;
      const label = el.textContent?.trim();
      if (label && label.length < 50 && el.href) {
        navLinks.push({ label, href: el.href });
      }
    });

    // Business name: try meta og:site_name, then h1, then title
    const ogSiteName = document.querySelector('meta[property="og:site_name"]')?.getAttribute("content");
    const h1 = document.querySelector("h1")?.textContent?.trim();
    const titleTag = document.title?.split(/[|–-]/)[0]?.trim();

    return {
      businessName: ogSiteName || h1 || titleTag || undefined,
      tagline: document.querySelector('meta[name="description"]')?.getAttribute("content") || undefined,
      phone: phoneMatch?.[1]?.trim() || phoneMatch?.[0]?.trim() || undefined,
      email: emailMatch?.[0] || undefined,
      address: addressMatch?.[1]?.trim() || undefined,
      openingHours: hoursMatch?.[1]?.trim() || undefined,
      socialLinks: uniqueSocials,
      navLinks: navLinks.filter(
        (l, i, arr) => arr.findIndex((x) => x.href === l.href) === i
      ),
    };
  });
}

function downloadImage(imageUrl: string, destPath: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const client = imageUrl.startsWith("https") ? https : http;
    const request = client.get(imageUrl, { timeout: 15000 }, (response) => {
      if (response.statusCode === 301 || response.statusCode === 302) {
        const redirectUrl = response.headers.location;
        if (redirectUrl) {
          downloadImage(redirectUrl, destPath).then(resolve).catch(reject);
          return;
        }
      }
      if (response.statusCode !== 200) {
        reject(new Error(`HTTP ${response.statusCode} for ${imageUrl}`));
        return;
      }
      const file = require("fs").createWriteStream(destPath);
      response.pipe(file);
      file.on("finish", () => { file.close(); resolve(); });
      file.on("error", reject);
    });
    request.on("error", reject);
    request.on("timeout", () => { request.destroy(); reject(new Error("Timeout")); });
  });
}

function getExtFromUrl(urlStr: string): string {
  try {
    const pathname = new URL(urlStr).pathname;
    const ext = path.extname(pathname).toLowerCase();
    if ([".jpg", ".jpeg", ".png", ".gif", ".webp", ".svg", ".avif"].includes(ext)) {
      return ext;
    }
  } catch {}
  return ".jpg";
}

export async function scrape(options: ScrapeOptions): Promise<ScrapedResult> {
  const { url, projectId, maxPages = 20, timeout = 15 * 60 * 1000 } = options;
  const deadline = Date.now() + timeout;
  let browser: Browser | undefined;

  try {
    log(options, `Starting scrape of ${url}`);
    browser = await chromium.launch({ headless: true });
    const context = await browser.newContext({
      userAgent:
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36",
      viewport: { width: 1440, height: 900 },
    });

    const visited = new Set<string>();
    const toVisit: string[] = [url];
    const pages: ScrapedPage[] = [];
    let businessInfo: Awaited<ReturnType<typeof extractBusinessInfo>> | null = null;
    const allImages: Map<string, { src: string; alt?: string }> = new Map();

    while (toVisit.length > 0 && visited.size < maxPages && Date.now() < deadline) {
      const currentUrl = toVisit.shift()!;
      const normalized = normalizeUrl(url, currentUrl);
      if (!normalized || visited.has(normalized)) continue;
      visited.add(normalized);

      log(options, `Scraping page ${visited.size}/${maxPages}: ${normalized}`);

      const page = await context.newPage();
      try {
        await page.goto(normalized, {
          waitUntil: "domcontentloaded",
          timeout: 30000,
        });
        // Wait a bit for dynamic content
        await page.waitForTimeout(2000);

        // Extract business info from first page
        if (!businessInfo) {
          businessInfo = await extractBusinessInfo(page);
        }

        // Extract page data
        const pageData = await extractPageData(page);
        pages.push(pageData);

        // Collect images
        for (const img of pageData.images) {
          if (!allImages.has(img.src)) {
            allImages.set(img.src, img);
          }
        }

        // Find internal links to follow
        if (visited.size < maxPages) {
          const links = await page.evaluate(() =>
            Array.from(document.querySelectorAll("a[href]"))
              .map((a) => (a as HTMLAnchorElement).href)
              .filter((h) => h && !h.startsWith("mailto:") && !h.startsWith("tel:") && !h.startsWith("javascript:"))
          );

          for (const link of links) {
            const norm = normalizeUrl(url, link);
            if (norm && isSameOrigin(url, norm) && !visited.has(norm)) {
              // Skip common non-content paths
              const pathname = new URL(norm).pathname.toLowerCase();
              if (
                pathname.includes("/wp-admin") ||
                pathname.includes("/wp-login") ||
                pathname.includes("/cart") ||
                pathname.includes("/checkout") ||
                pathname.endsWith(".pdf") ||
                pathname.endsWith(".xml")
              ) continue;

              if (!toVisit.includes(norm)) {
                toVisit.push(norm);
              }
            }
          }
        }
      } catch (err) {
        log(options, `Failed to scrape ${normalized}: ${err}`);
      } finally {
        await page.close();
      }
    }

    // Download all images
    log(options, `Downloading ${allImages.size} images...`);
    const assetsDir = await getAssetsDir(projectId);
    const downloadedImages: { originalUrl: string; localFile: string; alt?: string }[] = [];

    const imageEntries = Array.from(allImages.values());
    for (let i = 0; i < imageEntries.length; i++) {
      if (Date.now() > deadline) {
        log(options, "Timeout reached during image download, stopping.");
        break;
      }
      const img = imageEntries[i];
      try {
        const ext = getExtFromUrl(img.src);
        const filename = `img-${v4().slice(0, 8)}${ext}`;
        const destPath = path.join(assetsDir, filename);
        await downloadImage(img.src, destPath);
        downloadedImages.push({
          originalUrl: img.src,
          localFile: `assets/${filename}`,
          alt: img.alt,
        });
        if ((i + 1) % 5 === 0) {
          log(options, `Downloaded ${i + 1}/${imageEntries.length} images`);
        }
      } catch (err) {
        log(options, `Failed to download image ${img.src}: ${err}`);
      }
    }

    // Build raw text
    const rawText = pages
      .map((p) => [p.title, ...p.headings, ...p.paragraphs].join("\n"))
      .join("\n\n---\n\n");

    const result: ScrapedResult = {
      url,
      scrapedAt: new Date().toISOString(),
      businessName: businessInfo?.businessName,
      tagline: businessInfo?.tagline,
      phone: businessInfo?.phone,
      email: businessInfo?.email,
      address: businessInfo?.address,
      openingHours: businessInfo?.openingHours,
      socialLinks: businessInfo?.socialLinks || [],
      navLinks: businessInfo?.navLinks || [],
      pages,
      allImages: imageEntries,
      downloadedImages,
      rawText,
    };

    log(options, `Scrape complete: ${pages.length} pages, ${downloadedImages.length} images downloaded`);
    return result;
  } finally {
    await browser?.close();
  }
}
