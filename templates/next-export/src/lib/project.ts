import projectData from "../../../public/project.json";

export function getProject() {
  return projectData as any;
}

export function getPage(slug: string) {
  const project = getProject();
  if (!slug || slug === "home") {
    return project.pages.find((p: any) => p.slug === "" || p.slug === "home") || project.pages[0];
  }
  return project.pages.find((p: any) => p.slug === slug);
}

export function getAllPages() {
  return getProject().pages;
}
