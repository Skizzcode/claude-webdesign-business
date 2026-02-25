import { getProject, getPage } from "@/lib/project";
import { SiteRenderer } from "@/components/SiteRenderer";

export default function Home() {
  const project = getProject();
  const page = getPage("home");
  return <SiteRenderer page={page} project={project} />;
}
