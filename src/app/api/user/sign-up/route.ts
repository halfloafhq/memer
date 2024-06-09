import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { email, userId } = await req.json();

    if (!email || !userId) {
    return NextResponse.json(
      {
        message: "Information wasn't provided",
      },
      {
        status: 400,
      },
    );
    }

    await prisma.user.create({
      data: {
        email: email,
        userId: userId,
      },
    });

    return NextResponse.json(
      {
        message: "Account created successfully",
      },
      {
        status: 201,
      },
    );
  } catch (err) {
    return NextResponse.json(
      {
        message: "Internal Server Error",
      },
      {
        status: 500,
      },
    );
  }
}
