import "./globals.css";
import type { Metadata } from "next";
import { getProject } from "@/lib/project";

const project = getProject();

export const metadata: Metadata = {
  title: project.meta.businessName,
  description: `${project.meta.businessName} — ${project.meta.industry || "Professional Services"}`,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang={project.meta.language || "de"}>
      <head>
        <link
          href={`https://fonts.googleapis.com/css2?family=${encodeURIComponent(project.design.typography.headingFont)}:wght@400;600;700&family=${encodeURIComponent(project.design.typography.bodyFont)}:wght@300;400;500;600&display=swap`}
          rel="stylesheet"
        />
      </head>
      <body style={{ fontFamily: `"${project.design.typography.bodyFont}", sans-serif` }}>
        {children}
      </body>
    </html>
  );
}
