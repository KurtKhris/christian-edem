"use server";

import bcrypt from "bcrypt";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { prisma } from "@/lib/prisma";

export async function changePassword(currentPassword: string, newPassword: string) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return { success: false, error: "Not authenticated." };

  const user = await prisma.user.findUnique({ where: { email: session.user.email } });
  if (!user?.password) return { success: false, error: "User not found." };

  const valid = await bcrypt.compare(currentPassword, user.password);
  if (!valid) return { success: false, error: "Current password is incorrect." };

  if (newPassword.length < 8) return { success: false, error: "New password must be at least 8 characters." };

  const hash = await bcrypt.hash(newPassword, 10);
  await prisma.user.update({ where: { email: session.user.email }, data: { password: hash } });

  return { success: true };
}
