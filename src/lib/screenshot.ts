export function getProjectPreviewImage(project: { image?: string | null; url?: string | null }): string {
  if (project.image) return project.image;
  if (project.url) {
    return `https://image.thum.io/get/width/600/${project.url}`;
  }
  return "";
}
