"use server";

import { prisma } from "../../lib/prisma";
import { redirect } from "next/navigation";

export async function trackCVDownload() {
  await prisma.downloadMetric.create({ data: {} });
  redirect("/MyCV.pdf");
}

export async function getDownloadCount() {
  return prisma.downloadMetric.count();
}
