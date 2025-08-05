"use server";

import { createSession, deleteSession } from "@/lib/actions";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";

import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" })
    .trim(),
});

export async function login(prevState: any, formData: FormData) {
  const result = loginSchema.safeParse(Object.fromEntries(formData));

  if (!result.success) {
    return { error: result.error.flatten().fieldErrors };
  }

  const { email, password } = result.data;

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });
 
    if (!user) {
      return { error: { email: "User not found" } };
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return { error: { password: "Invalid email or password" } };
    }

    await createSession(user.id as any);

    return { success: true, message: ["Login successful"] };
  } catch (error) {
    console.error("Login error:", error);
    return { error: { email: ["An error occurred during login"] } };
  }
}

export async function logout() {
  await deleteSession();
  redirect("/login");
}
