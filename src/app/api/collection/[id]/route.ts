import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
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

    if (!params.id) {
      return NextResponse.json(
        {
          message: "No collection id",
        },
        {
          status: 400,
        },
      );
    }

    const collection = await prisma.collection.findUnique({
      where: {
        id: params.id,
        madeById: user.id,
      },
      include: {
        memes: true,
      }
    });

    return NextResponse.json(
      {
        message: "Fetched collection successfully",
        data: collection,
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
