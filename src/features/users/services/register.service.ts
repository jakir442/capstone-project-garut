import bcrypt from "bcryptjs";
import { connectToDatabase } from "@/lib/mongodb";
import { User } from "../models/user.model";
import type { RegisterInput } from "../schemas/register.schema";

export async function registerUser(input: RegisterInput) {
  await connectToDatabase();

  const email = input.email.trim().toLowerCase();

  const existingUser = await User.findOne({ email }).lean();

  if (existingUser) {
    throw new Error("EMAIL_ALREADY_EXISTS");
  }

  const hashedPassword = await bcrypt.hash(input.password, 12);

  const user = await User.create({
    name: input.name.trim(),
    email,
    password: hashedPassword,
    role: "customer",
  });

  return {
    id: user._id.toString(),
    name: user.name,
    email: user.email,
    role: user.role,
  };
}
