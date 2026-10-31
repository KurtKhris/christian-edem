export function getProjectPreviewImage(project: { image?: string | null; url?: string | null }): string {
  if (project.image) {
    // Ask Cloudinary for a responsive, compressed format rather than the uploaded original.
    return project.image.replace(
      "/image/upload/",
      "/image/upload/f_auto,q_auto,w_900,c_limit/",
    );
  }
  if (project.url) {
    return `https://image.thum.io/get/width/600/${project.url}`;
  }
  return "";
}
