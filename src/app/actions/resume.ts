"use server";

import { prisma } from "../../lib/prisma";
import { revalidatePath } from "next/cache";

// ── EDUCATION ──────────────────────────────────────────
export async function getEducation() {
  return prisma.education.findMany({ orderBy: { order: "asc" } });
}

export async function createEducation(formData: FormData) {
  const title = formData.get("title") as string;
  const institution = formData.get("institution") as string;
  const period = formData.get("period") as string;
  const max = await prisma.education.aggregate({ _max: { order: true } });
  const nextOrder = (max._max.order ?? 0) + 1;
  await prisma.education.create({ data: { title, institution, period, order: nextOrder, isVisible: true } });
  revalidatePath("/");
  revalidatePath("/admin/resume");
}

export async function updateEducation(id: string, formData: FormData) {
  const title = formData.get("title") as string;
  const institution = formData.get("institution") as string;
  const period = formData.get("period") as string;
  await prisma.education.update({ where: { id }, data: { title, institution, period } });
  revalidatePath("/");
  revalidatePath("/admin/resume");
}

export async function deleteEducation(id: string) {
  await prisma.education.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/admin/resume");
}

export async function toggleEducationVisibility(id: string, current: boolean) {
  await prisma.education.update({ where: { id }, data: { isVisible: !current } });
  revalidatePath("/");
  revalidatePath("/admin/resume");
}

export async function updateEducationOrder(id: string, order: number) {
  await prisma.education.update({ where: { id }, data: { order } });
  revalidatePath("/");
  revalidatePath("/admin/resume");
}

// ── WORK EXPERIENCE ────────────────────────────────────
export async function getWorkExperience() {
  return prisma.workExperience.findMany({ orderBy: { order: "asc" } });
}

export async function createWorkExperience(formData: FormData) {
  const title = formData.get("title") as string;
  const company = formData.get("company") as string;
  const period = formData.get("period") as string;
  const max = await prisma.workExperience.aggregate({ _max: { order: true } });
  const nextOrder = (max._max.order ?? 0) + 1;
  await prisma.workExperience.create({ data: { title, company, period, order: nextOrder, isVisible: true } });
  revalidatePath("/");
  revalidatePath("/admin/resume");
}

export async function updateWorkExperience(id: string, formData: FormData) {
  const title = formData.get("title") as string;
  const company = formData.get("company") as string;
  const period = formData.get("period") as string;
  await prisma.workExperience.update({ where: { id }, data: { title, company, period } });
  revalidatePath("/");
  revalidatePath("/admin/resume");
}

export async function deleteWorkExperience(id: string) {
  await prisma.workExperience.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/admin/resume");
}

export async function toggleWorkExperienceVisibility(id: string, current: boolean) {
  await prisma.workExperience.update({ where: { id }, data: { isVisible: !current } });
  revalidatePath("/");
  revalidatePath("/admin/resume");
}

export async function updateWorkExperienceOrder(id: string, order: number) {
  await prisma.workExperience.update({ where: { id }, data: { order } });
  revalidatePath("/");
  revalidatePath("/admin/resume");
}
