"use server";

import { prisma } from "../../lib/prisma";
import { revalidatePath } from "next/cache";

// Helper function to generate slug from title
function generateSlug(title: string) {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove non-word characters
    .replace(/\s+/g, '-')     // Replace spaces with hyphens
    .replace(/--+/g, '-')     // Replace multiple hyphens with single one
    .trim();
}

export async function getVisiblePosts() {
  return prisma.post.findMany({
    where: { isVisible: true },
    orderBy: { createdAt: "desc" },
  });
}

export async function getAllPosts() {
  return prisma.post.findMany({
    orderBy: { createdAt: "desc" },
  });
}

export async function getPostBySlug(slug: string) {
  return prisma.post.findUnique({
    where: { slug },
  });
}

export async function createPost(formData: FormData) {
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  const excerpt = formData.get("excerpt") as string;
  const isVisible = formData.get("isVisible") === "true";
  
  let slug = generateSlug(title);
  
  // Basic collision check
  const existing = await prisma.post.findUnique({ where: { slug } });
  if (existing) {
    slug = `${slug}-${Date.now()}`;
  }

  await prisma.post.create({
    data: {
      title,
      slug,
      content,
      excerpt,
      isVisible,
    },
  });

  revalidatePath("/blog");
  revalidatePath("/admin/blog");
}

export async function updatePost(id: string, formData: FormData) {
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  const excerpt = formData.get("excerpt") as string;
  const isVisible = formData.get("isVisible") === "true";

  // Note: We typically don't change slugs after creation to avoid breaking links,
  // but if needed, you could add logic here.
  
  await prisma.post.update({
    where: { id },
    data: {
      title,
      content,
      excerpt,
      isVisible,
    },
  });

  revalidatePath("/blog");
  revalidatePath(`/blog/${id}`); // If using ID-based or slug-based paths
  revalidatePath("/admin/blog");
}

export async function deletePost(id: string) {
  await prisma.post.delete({
    where: { id },
  });

  revalidatePath("/blog");
  revalidatePath("/admin/blog");
}

export async function togglePostVisibility(id: string, currentStatus: boolean) {
  await prisma.post.update({
    where: { id },
    data: { isVisible: !currentStatus },
  });

  revalidatePath("/blog");
  revalidatePath("/admin/blog");
}
