import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const user = await currentUser();

    if (!user) {
      return NextResponse.json(
        {
          message: "User not authenticated",
        },
        { status: 401 },
      );
    }

    const collections = await prisma.collection.findMany({
      where: {
        madeById: user.id,
      },
    });

    return NextResponse.json(
      {
        message: "Fetched collections successfully",
        data: collections,
      },
      {
        status: 200,
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
