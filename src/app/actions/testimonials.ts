"use server";

import { prisma } from "../../lib/prisma";
import { revalidatePath } from "next/cache";

export async function getVisibleTestimonials() {
  return prisma.testimonial.findMany({
    where: { isVisible: true },
    orderBy: { order: "asc" },
  });
}

export async function getAllTestimonials() {
  return prisma.testimonial.findMany({ orderBy: { order: "asc" } });
}

export async function createTestimonial(formData: FormData) {
  const author = formData.get("author") as string;
  const role = formData.get("role") as string;
  const content = formData.get("content") as string;
  const max = await prisma.testimonial.aggregate({ _max: { order: true } });
  const nextOrder = (max._max.order ?? 0) + 1;
  await prisma.testimonial.create({ data: { author, role, content, order: nextOrder, isVisible: true } });
  revalidatePath("/");
  revalidatePath("/admin/testimonials");
}

export async function updateTestimonial(id: string, formData: FormData) {
  const author = formData.get("author") as string;
  const role = formData.get("role") as string;
  const content = formData.get("content") as string;
  await prisma.testimonial.update({ where: { id }, data: { author, role, content } });
  revalidatePath("/");
  revalidatePath("/admin/testimonials");
}

export async function deleteTestimonial(id: string) {
  await prisma.testimonial.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/admin/testimonials");
}

export async function toggleTestimonialVisibility(id: string, current: boolean) {
  await prisma.testimonial.update({ where: { id }, data: { isVisible: !current } });
  revalidatePath("/");
  revalidatePath("/admin/testimonials");
}

export async function updateTestimonialOrder(id: string, order: number) {
  await prisma.testimonial.update({ where: { id }, data: { order } });
  revalidatePath("/");
  revalidatePath("/admin/testimonials");
}
