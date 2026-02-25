import { getProject, getPage, getAllPages } from "@/lib/project";
import { SiteRenderer } from "@/components/SiteRenderer";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return getAllPages()
    .filter((p: any) => p.slug && p.slug !== "home" && p.slug !== "")
    .map((p: any) => ({ slug: p.slug }));
}

export default function Page({ params }: { params: { slug: string } }) {
  const project = getProject();
  const page = getPage(params.slug);
  if (!page) notFound();
  return <SiteRenderer page={page} project={project} />;
}
