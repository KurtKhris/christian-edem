"use server";

import { prisma } from "../../lib/prisma";
import { revalidatePath } from "next/cache";
import { uploadToCloudinary } from "./portfolio";

export async function createSkill(formData: FormData) {
  const name = formData.get("name") as string;
  const color = formData.get("color") as string;
  const file = formData.get("image") as File;
  const isVisible = formData.get("isVisible") ? formData.get("isVisible") === "on" : true;

  // Auto-calculate the next order number (max + 1)
  const lastSkill = await prisma.skill.findFirst({
    orderBy: { order: 'desc' },
    select: { order: true }
  });
  const order = lastSkill ? lastSkill.order + 1 : 1;

  let imageUrl = "";

  if (file && file.size > 0) {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);
    imageUrl = await uploadToCloudinary(buffer);
  }

  const skill = await prisma.skill.create({
    data: {
      name,
      color: color || null,
      image: imageUrl || "",
      order,
      isVisible,
    }
  });

  revalidatePath("/");
  revalidatePath("/admin/skills");

  return { success: true, skill };
}

export async function updateSkill(id: string, formData: FormData) {
  const name = formData.get("name") as string;
  const color = formData.get("color") as string;
  const file = formData.get("image") as File;
  const order = parseInt(formData.get("order") as string) || 0;
  const orderField = formData.get("order");
  const isVisibleField = formData.get("isVisible");

  const dataToUpdate: any = {
    name,
    color: color || null,
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
  }

  const skill = await prisma.skill.update({
    where: { id },
    data: dataToUpdate
  });

  revalidatePath("/");
  revalidatePath("/admin/skills");

  return { success: true, skill };
}

export async function getSkills() {
  return await prisma.skill.findMany({ orderBy: [{ order: 'asc' }, { createdAt: 'desc' }] });
}

export async function deleteSkill(id: string) {
  await prisma.skill.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/admin/skills");
  return { success: true };
}

export async function toggleSkillVisibility(id: string, isVisible: boolean) {
  await prisma.skill.update({
    where: { id },
    data: { isVisible }
  });
  revalidatePath("/");
  revalidatePath("/admin/skills");
  return { success: true };
}

export async function updateSkillOrder(id: string, order: number) {
  await prisma.skill.update({
    where: { id },
    data: { order }
  });
  revalidatePath("/");
  revalidatePath("/admin/skills");
  return { success: true };
}
