import getAuthenticatedUser from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const user = await getAuthenticatedUser(req);

    if (!user) {
      return NextResponse.json(
        {
          message: "User not authenticated",
        },
        { status: 401 },
      );
    }

    const { collectionName } = await req.json();

    await prisma.collection.create({
      data: {
        name: collectionName,
        madeById: user.userId,
      },
    });

    return NextResponse.json(
      {
        message: "Created collection successfully",
      },
      {
        status: 201,
      },
    );
  } catch (err: any) {
    console.error(err);
    return NextResponse.json(
      {
        message: "Internal Server error",
      },
      {
        status: 500,
      },
    );
  }
}