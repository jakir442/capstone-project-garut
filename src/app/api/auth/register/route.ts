import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { registerSchema } from "@/features/users/schemas/register.schema";
import { registerUser } from "@/features/users/services/register.service";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const validatedData = registerSchema.parse(body);

    const user = await registerUser(validatedData);

    return NextResponse.json(
      {
        success: true,
        message: "Akun berhasil dibuat.",
        data: user,
      },
      { status: 201 },
    );
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        {
          success: false,
          message: "Data registrasi tidak valid.",
          errors: error.flatten().fieldErrors,
        },
        { status: 400 },
      );
    }

    if (error instanceof Error && error.message === "EMAIL_ALREADY_EXISTS") {
      return NextResponse.json(
        {
          success: false,
          message: "Email sudah terdaftar.",
        },
        { status: 409 },
      );
    }

    console.error("Register error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Terjadi kesalahan saat membuat akun.",
      },
      { status: 500 },
    );
  }
}