"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import { INDUSTRIES, PRESET_META } from "@website-engine/core";
import { ArrowLeft, Globe, Loader2, CheckCircle, AlertCircle, Sparkles } from "lucide-react";
import Link from "next/link";

type Step = "input" | "scraping" | "classifying" | "generating" | "done" | "error";

interface Classification {
  industryId: string;
  confidence: number;
  topCandidates?: { id: string; confidence: number; reason: string }[];
}

// Google Fonts for preset card previews
const GOOGLE_FONTS_URL =
  "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Space+Grotesk:wght@700&family=Cormorant+Garamond:wght@600&family=DM+Serif+Display&family=Plus+Jakarta+Sans:wght@700&family=Syne:wght@700&family=Nunito:wght@700&display=swap";

function getIndustryLabel(value: string): string {
  const found = INDUSTRIES.find((i) => i.value === value);
  return found?.label.de || value;
}

export default function NewProjectPage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>("input");
  const [url, setUrl] = useState("");
  const [industry, setIndustry] = useState("");
  const [preset, setPreset] = useState("swiss_grid");
  const [language, setLanguage] = useState<"de" | "en">("de");

  // Load Google Fonts for preset preview cards
  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = GOOGLE_FONTS_URL;
    document.head.appendChild(link);
    return () => { document.head.removeChild(link); };
  }, []);
  const [progress, setProgress] = useState<string[]>([]);
  const [error, setError] = useState("");
  const [projectId, setProjectId] = useState("");
  const [classification, setClassification] = useState<Classification | null>(null);

  const handleGenerate = async () => {
    if (!url) return;

    try {
      // Step 1: Start scraping
      setStep("scraping");
      setProgress(["Starting scrape..."]);

      const scrapeRes = await api.startScrape(url);
      setProjectId(scrapeRes.projectId);

      // Poll for scrape completion
      let scrapeStatus = await api.getScrapeStatus(scrapeRes.jobId);
      while (scrapeStatus.status === "running") {
        setProgress(scrapeStatus.progress);
        await new Promise((r) => setTimeout(r, 2000));
        scrapeStatus = await api.getScrapeStatus(scrapeRes.jobId);
      }

      if (scrapeStatus.status === "error") {
        throw new Error(scrapeStatus.error || "Scraping failed");
      }

      setProgress((prev) => [...prev, "Scrape complete!"]);

      // Step 2: Classify industry (if not manually selected)
      if (!industry) {
        setStep("classifying");
        setProgress((prev) => [...prev, "Detecting industry..."]);

        try {
          const cls = await api.classifyIndustry(scrapeRes.projectId);
          setClassification(cls);
          setIndustry(cls.industryId);
          setProgress((prev) => [
            ...prev,
            `Industry detected: ${getIndustryLabel(cls.industryId)} (${Math.round(cls.confidence * 100)}%)`,
          ]);
        } catch {
          // Classification failed — continue with "other"
          setIndustry("other");
        }
      }

      // Step 3: Generate
      setStep("generating");
      setProgress((prev) => [...prev, "Generating website with AI..."]);

      await api.generateSite({
        projectId: scrapeRes.projectId,
        preset,
        language,
        industry: industry || undefined,
      });

      setStep("done");
      setProgress((prev) => [...prev, "Website generated!"]);
    } catch (err) {
      setError(String(err));
      setStep("error");
    }
  };

  const handleConfirmIndustry = async (selectedId: string) => {
    setIndustry(selectedId);

    // Continue to generation
    setStep("generating");
    setProgress((prev) => [...prev, `Industry confirmed: ${getIndustryLabel(selectedId)}`, "Generating website with AI..."]);

    try {
      await api.generateSite({
        projectId,
        preset,
        language,
        industry: selectedId,
      });

      setStep("done");
      setProgress((prev) => [...prev, "Website generated!"]);
    } catch (err) {
      setError(String(err));
      setStep("error");
    }
  };

  // ── Done ────────────────────────────────────────────────
  if (step === "done") {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-xl shadow-sm border p-8 max-w-md w-full text-center">
          <CheckCircle size={48} className="mx-auto text-green-500 mb-4" />
          <h2 className="text-xl font-bold mb-2">Website Generated!</h2>
          <p className="text-gray-500 mb-6">
            Your preview website has been created. Open the builder to customize it.
          </p>
          <button
            onClick={() => router.push(`/projects/${projectId}`)}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-medium"
          >
            Open Builder
          </button>
          <Link href="/" className="block mt-3 text-sm text-gray-400 hover:text-gray-600">
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  // ── Error ───────────────────────────────────────────────
  if (step === "error") {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-xl shadow-sm border p-8 max-w-md w-full text-center">
          <AlertCircle size={48} className="mx-auto text-red-500 mb-4" />
          <h2 className="text-xl font-bold mb-2">Something went wrong</h2>
          <p className="text-gray-500 mb-4 text-sm">{error}</p>
          <button
            onClick={() => { setStep("input"); setError(""); }}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-medium"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // ── Classifying — show detected industry with override ──
  if (step === "classifying" && classification) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-xl shadow-sm border p-8 max-w-lg w-full">
          <div className="flex items-center gap-3 mb-6">
            <Sparkles size={24} className="text-blue-600" />
            <h2 className="text-lg font-bold">Industry Detected</h2>
          </div>

          <div className="mb-6">
            <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg border border-blue-200 mb-3">
              <div className="flex-1">
                <p className="font-medium text-blue-900">
                  {getIndustryLabel(classification.industryId)}
                </p>
                <p className="text-sm text-blue-600">
                  {Math.round(classification.confidence * 100)}% confidence
                </p>
              </div>
              <button
                onClick={() => handleConfirmIndustry(classification.industryId)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition"
              >
                Confirm
              </button>
            </div>

            {classification.topCandidates && classification.topCandidates.length > 1 && (
              <div className="space-y-2">
                <p className="text-sm text-gray-500">Or choose another:</p>
                {classification.topCandidates
                  .filter((c) => c.id !== classification.industryId)
                  .map((candidate) => (
                    <button
                      key={candidate.id}
                      onClick={() => handleConfirmIndustry(candidate.id)}
                      className="w-full flex items-center gap-3 p-3 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition text-left"
                    >
                      <div className="flex-1">
                        <p className="text-sm font-medium">{getIndustryLabel(candidate.id)}</p>
                        <p className="text-xs text-gray-400">
                          {Math.round(candidate.confidence * 100)}% — {candidate.reason}
                        </p>
                      </div>
                    </button>
                  ))}
              </div>
            )}
          </div>

          <div className="border-t pt-4">
            <label className="block text-sm text-gray-500 mb-2">Or select manually:</label>
            <select
              value={industry}
              onChange={(e) => handleConfirmIndustry(e.target.value)}
              className="w-full px-3 py-2.5 border rounded-lg bg-white text-sm"
            >
              {INDUSTRIES.map((ind) => (
                <option key={ind.value} value={ind.value}>
                  {ind.label.de}
                </option>
              ))}
            </select>
          </div>

          {/* Progress log */}
          <div className="mt-4 space-y-1 max-h-32 overflow-y-auto">
            {progress.map((msg, i) => (
              <p key={i} className="text-xs text-gray-400 font-mono">{msg}</p>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ── Scraping / Generating ───────────────────────────────
  if (step === "scraping" || step === "generating" || step === "classifying") {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-xl shadow-sm border p-8 max-w-lg w-full">
          <div className="flex items-center gap-3 mb-6">
            <Loader2 size={24} className="text-blue-600 animate-spin" />
            <h2 className="text-lg font-bold">
              {step === "scraping"
                ? "Scraping website..."
                : step === "classifying"
                ? "Detecting industry..."
                : "Generating your new website..."}
            </h2>
          </div>
          <div className="space-y-1 max-h-64 overflow-y-auto">
            {progress.map((msg, i) => (
              <p key={i} className="text-sm text-gray-500 font-mono">
                {msg}
              </p>
            ))}
          </div>
          <p className="text-xs text-gray-400 mt-4">
            This may take a few minutes for large websites.
          </p>
        </div>
      </div>
    );
  }

  // ── Input Form ──────────────────────────────────────────
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b">
        <div className="max-w-2xl mx-auto px-6 py-4">
          <Link href="/" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700">
            <ArrowLeft size={16} />
            Back to Dashboard
          </Link>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-6 py-8">
        <h1 className="text-2xl font-bold mb-1">New Project</h1>
        <p className="text-gray-500 mb-8">
          Enter a website URL to generate a modern redesign preview.
        </p>

        <div className="bg-white rounded-xl shadow-sm border p-6 space-y-6">
          {/* URL Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Website URL *
            </label>
            <div className="relative">
              <Globe size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://example-restaurant.de"
                className="w-full pl-10 pr-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
            </div>
          </div>

          {/* Industry */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Industry (optional — auto-detected after scraping)
            </label>
            <select
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              className="w-full px-3 py-2.5 border rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            >
              <option value="">Auto-detect</option>
              {INDUSTRIES.map((ind) => (
                <option key={ind.value} value={ind.value}>
                  {ind.label.de}
                </option>
              ))}
            </select>
          </div>

          {/* Language */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Language
            </label>
            <div className="flex gap-3">
              {(["de", "en"] as const).map((lang) => (
                <button
                  key={lang}
                  onClick={() => setLanguage(lang)}
                  className={`flex-1 py-2.5 rounded-lg border text-sm font-medium transition ${
                    language === lang
                      ? "border-blue-500 bg-blue-50 text-blue-700"
                      : "border-gray-200 text-gray-600 hover:border-gray-300"
                  }`}
                >
                  {lang === "de" ? "Deutsch" : "English"}
                </button>
              ))}
            </div>
          </div>

          {/* Style Preset */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Style Preset
            </label>
            <div className="grid grid-cols-2 gap-3">
              {(Object.entries(PRESET_META) as [string, typeof PRESET_META[keyof typeof PRESET_META]][]).map(([key, meta]) => (
                <button
                  key={key}
                  onClick={() => setPreset(key)}
                  className={`p-3 rounded-lg border text-left transition ${
                    preset === key
                      ? "border-blue-500 bg-blue-50 ring-2 ring-blue-500"
                      : "border-gray-200 hover:border-gray-300 bg-white"
                  }`}
                >
                  <p
                    className="text-sm font-bold mb-1 truncate"
                    style={{ fontFamily: `"${meta.headingFont}", serif` }}
                  >
                    {meta.label}
                  </p>
                  <p className="text-xs text-gray-400 mb-2 leading-tight">{meta.description}</p>
                  <div className="flex gap-1">
                    {meta.colorDots.map((c, i) => (
                      <div
                        key={i}
                        className="w-4 h-4 rounded-full border border-gray-200 flex-shrink-0"
                        style={{ backgroundColor: c }}
                      />
                    ))}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Generate Button */}
          <button
            onClick={handleGenerate}
            disabled={!url}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Generate Website Preview
          </button>

          <p className="text-xs text-gray-400 text-center">
            Preview / concept — not the official website. For demonstration purposes only.
          </p>
        </div>
      </main>
    </div>
  );
}
