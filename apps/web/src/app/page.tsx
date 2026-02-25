"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { api } from "@/lib/api";
import { Plus, Globe, Trash2, ExternalLink } from "lucide-react";

interface ProjectSummary {
  id: string;
  name: string;
  status: string;
  updatedAt: string;
}

export default function Dashboard() {
  const [projects, setProjects] = useState<ProjectSummary[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.listProjects().then(setProjects).catch(console.error).finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this project? This cannot be undone.")) return;
    await api.deleteProject(id);
    setProjects((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-900">Website Engine</h1>
            <p className="text-sm text-gray-500">SME Website Builder</p>
          </div>
          <Link
            href="/new"
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition font-medium text-sm"
          >
            <Plus size={18} />
            New Project
          </Link>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8">
        {loading ? (
          <div className="text-center py-20 text-gray-400">Loading projects...</div>
        ) : projects.length === 0 ? (
          <div className="text-center py-20">
            <Globe size={48} className="mx-auto text-gray-300 mb-4" />
            <h2 className="text-lg font-medium text-gray-600 mb-2">No projects yet</h2>
            <p className="text-gray-400 mb-6">
              Enter a website URL to generate a modern redesign preview.
            </p>
            <Link
              href="/new"
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-medium"
            >
              <Plus size={18} />
              Create your first project
            </Link>
          </div>
        ) : (
          <div className="grid gap-4">
            {projects.map((project) => (
              <div
                key={project.id}
                className="bg-white rounded-lg border p-4 flex items-center justify-between hover:shadow-sm transition"
              >
                <div className="flex-1">
                  <Link
                    href={`/projects/${project.id}`}
                    className="font-semibold text-gray-900 hover:text-blue-600 transition"
                  >
                    {project.name}
                  </Link>
                  <div className="flex items-center gap-3 mt-1">
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                        project.status === "exported"
                          ? "bg-green-100 text-green-700"
                          : project.status === "preview"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {project.status}
                    </span>
                    <span className="text-xs text-gray-400">
                      {new Date(project.updatedAt).toLocaleDateString("de-DE")}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Link
                    href={`/projects/${project.id}`}
                    className="p-2 rounded hover:bg-gray-100 text-gray-500 hover:text-blue-600 transition"
                    title="Open in Builder"
                  >
                    <ExternalLink size={16} />
                  </Link>
                  <button
                    onClick={() => handleDelete(project.id)}
                    className="p-2 rounded hover:bg-red-50 text-gray-400 hover:text-red-500 transition"
                    title="Delete project"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
