"use server";

import { prisma } from "../../lib/prisma";
import cloudinary from "../../lib/cloudinary";
import { revalidatePath } from "next/cache";

export async function uploadToCloudinary(buffer: Uint8Array): Promise<string> {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      { folder: 'portfolio' },
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result?.secure_url || "");
        }
      }
    ).end(buffer);
  });
}

export async function createProject(formData: FormData) {
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const url = formData.get("url") as string;
  const file = formData.get("image") as File;
  const isVisible = formData.get("isVisible") ? formData.get("isVisible") === "on" : true;

  // Auto-calculate the next order number (max + 1)
  const lastProject = await prisma.project.findFirst({
    orderBy: { order: 'desc' },
    select: { order: true }
  });
  const order = lastProject ? lastProject.order + 1 : 1;

  let imageUrl = "";

  if (file && file.size > 0) {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);
    imageUrl = await uploadToCloudinary(buffer);
  }

  const project = await prisma.project.create({
    data: {
      name,
      description: description || null,
      url: url || null,
      image: imageUrl || "",
      order,
      isVisible,
    }
  });

  revalidatePath("/");
  revalidatePath("/admin/portfolio");

  return { success: true, project };
}

export async function updateProject(id: string, formData: FormData) {
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const url = formData.get("url") as string;
  const file = formData.get("image") as File;
  const order = parseInt(formData.get("order") as string) || 0;
  const orderField = formData.get("order");
  const isVisibleField = formData.get("isVisible");
  const removeImage = formData.get("removeImage") === "true";

  const dataToUpdate: any = {
    name,
    description: description || null,
    url: url || null,
  };

  if (orderField !== null) {
    dataToUpdate.order = parseInt(orderField as string) || 0;
  }

  if (isVisibleField !== null) {
    dataToUpdate.isVisible = isVisibleField === "on";
  }

  if (file && file.size > 0) {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);
    dataToUpdate.image = await uploadToCloudinary(buffer);
  } else if (removeImage) {
    dataToUpdate.image = "";
  }

  const project = await prisma.project.update({
    where: { id },
    data: dataToUpdate
  });

  revalidatePath("/");
  revalidatePath("/admin/portfolio");

  return { success: true, project };
}

export async function getProjects() {
  return await prisma.project.findMany({ orderBy: [{ order: 'asc' }, { createdAt: 'desc' }] });
}

export async function deleteProject(id: string) {
  await prisma.project.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/admin/portfolio");
  return { success: true };
}

export async function toggleProjectVisibility(id: string, isVisible: boolean) {
  await prisma.project.update({
    where: { id },
    data: { isVisible }
  });
  revalidatePath("/");
  revalidatePath("/admin/portfolio");
  return { success: true };
}

export async function updateProjectOrder(id: string, order: number) {
  await prisma.project.update({
    where: { id },
    data: { order }
  });
  revalidatePath("/");
  revalidatePath("/admin/portfolio");
  return { success: true };
}
