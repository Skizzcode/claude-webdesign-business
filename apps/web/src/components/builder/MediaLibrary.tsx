"use client";

import React, { useState, useEffect, useRef } from "react";
import { api } from "@/lib/api";
import { Upload, Search, Download, Copy, Check, Image as ImageIcon, Loader2 } from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

interface MediaLibraryProps {
  projectId: string;
}

export function MediaLibrary({ projectId }: MediaLibraryProps) {
  const [tab, setTab] = useState<"project" | "search">("project");
  const [images, setImages] = useState<{ filename: string; path: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [searching, setSearching] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);
  const [downloading, setDownloading] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    loadImages();
  }, [projectId]);

  const loadImages = async () => {
    setLoading(true);
    try {
      const imgs = await api.listProjectImages(projectId);
      setImages(imgs);
    } catch (err) {
      console.error("Failed to load images:", err);
    }
    setLoading(false);
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      await fetch(`${API_URL}/api/media/upload/${projectId}`, {
        method: "POST",
        body: formData,
      });
      loadImages();
    } catch (err) {
      alert("Upload failed: " + err);
    }
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    setSearching(true);
    try {
      const res = await api.searchImages(searchQuery);
      setSearchResults(res.photos || []);
    } catch (err) {
      alert("Search failed. Is PEXELS_API_KEY configured? " + err);
      setSearchResults([]);
    }
    setSearching(false);
  };

  const handleDownloadStock = async (photo: any) => {
    setDownloading(photo.id);
    try {
      await api.downloadStockPhoto(projectId, photo.src.large, photo.alt);
      loadImages();
      setTab("project");
    } catch (err) {
      alert("Download failed: " + err);
    }
    setDownloading(null);
  };

  const copyPath = (path: string) => {
    navigator.clipboard.writeText(path);
    setCopied(path);
    setTimeout(() => setCopied(null), 1500);
  };

  return (
    <div className="p-4">
      {/* Tabs */}
      <div className="flex gap-1 mb-4 p-0.5 bg-gray-100 rounded-md">
        <button
          onClick={() => setTab("project")}
          className={`flex-1 py-1.5 text-xs font-medium rounded transition ${tab === "project" ? "bg-white shadow-sm text-gray-900" : "text-gray-500"}`}
        >
          Project Images
        </button>
        <button
          onClick={() => setTab("search")}
          className={`flex-1 py-1.5 text-xs font-medium rounded transition ${tab === "search" ? "bg-white shadow-sm text-gray-900" : "text-gray-500"}`}
        >
          Stock Photos
        </button>
      </div>

      {tab === "project" && (
        <>
          {/* Upload */}
          <button
            onClick={() => fileInputRef.current?.click()}
            className="w-full flex items-center justify-center gap-2 py-3 border-2 border-dashed border-gray-300 rounded-md text-xs text-gray-500 hover:border-blue-400 hover:text-blue-600 transition mb-4"
          >
            <Upload size={16} /> Upload Image
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleUpload}
            className="hidden"
          />

          {/* Image grid */}
          {loading ? (
            <div className="text-center py-8 text-gray-400 text-xs">Loading...</div>
          ) : images.length === 0 ? (
            <div className="text-center py-8">
              <ImageIcon size={32} className="mx-auto text-gray-300 mb-2" />
              <p className="text-xs text-gray-400">No images yet</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-2">
              {images.map((img) => (
                <div key={img.filename} className="group relative aspect-square rounded overflow-hidden bg-gray-100">
                  <img
                    src={`${API_URL}/data/projects/${projectId}/${img.path}`}
                    alt={img.filename}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition flex items-center justify-center">
                    <button
                      onClick={() => copyPath(img.path)}
                      className="opacity-0 group-hover:opacity-100 bg-white rounded-md p-1.5 shadow transition"
                      title="Copy path"
                    >
                      {copied === img.path ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
                    </button>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-black/60 px-1.5 py-0.5 opacity-0 group-hover:opacity-100 transition">
                    <p className="text-[9px] text-white truncate">{img.filename}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {tab === "search" && (
        <>
          <div className="flex gap-1.5 mb-4">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              placeholder="Search Pexels..."
              className="flex-1 text-xs px-2.5 py-1.5 border rounded-md outline-none focus:ring-1 focus:ring-blue-400"
            />
            <button
              onClick={handleSearch}
              disabled={searching}
              className="px-3 py-1.5 bg-blue-600 text-white rounded-md text-xs hover:bg-blue-700 disabled:opacity-50 transition"
            >
              {searching ? <Loader2 size={14} className="animate-spin" /> : <Search size={14} />}
            </button>
          </div>

          {searchResults.length > 0 ? (
            <div className="grid grid-cols-2 gap-2">
              {searchResults.map((photo: any) => (
                <div key={photo.id} className="group relative aspect-square rounded overflow-hidden bg-gray-100">
                  <img src={photo.src.medium} alt={photo.alt} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition flex items-center justify-center">
                    <button
                      onClick={() => handleDownloadStock(photo)}
                      disabled={downloading === photo.id}
                      className="opacity-0 group-hover:opacity-100 bg-white rounded-md px-2 py-1.5 shadow text-xs font-medium flex items-center gap-1 transition disabled:opacity-70"
                    >
                      {downloading === photo.id ? <Loader2 size={12} className="animate-spin" /> : <Download size={12} />}
                      Save
                    </button>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-black/60 px-1.5 py-0.5">
                    <p className="text-[9px] text-white truncate">by {photo.photographer}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Search size={32} className="mx-auto text-gray-300 mb-2" />
              <p className="text-xs text-gray-400">Search for free stock photos on Pexels</p>
            </div>
          )}
        </>
      )}
    </div>
  );
}
