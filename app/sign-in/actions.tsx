"use server";

import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

import { z } from "zod";

const registerSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  name: z.string().min(1, { message: "Name is required" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
});

export async function register(prevstate: any, formData: FormData) {
  const result = registerSchema.safeParse(Object.fromEntries(formData));

  if (!result.success) {
    return { error: result.error.flatten().fieldErrors };
  }

  const { email, name, password } = result.data;
  try {
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return {
        message: ["User already exists"],
      };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.create({
      data: { email, name, password: hashedPassword },
    });
    return { success: true, message: ["Registration successful"] };
  } catch (error) {
    console.error("Registration error:", error);
    return {
      message: ["An error occurred during registration"],
    };
  }
}
