export function getProjectPreviewImage(project: { image?: string | null; url?: string | null }): string {
  if (project.image) return project.image;
  if (project.url) {
    return `https://api.microlink.io/?url=${encodeURIComponent(project.url)}&screenshot=true&meta=false&embed=screenshot.url`;
  }
  return "";
}
