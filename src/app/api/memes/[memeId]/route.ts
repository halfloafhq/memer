import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const user = await currentUser();
    if (!user) {
      return NextResponse.json(
        {
          error: "Unauthorized",
        },
        {
          status: 401,
        },
      );
    }

    if (user.publicMetadata.role !== "admin") {
      return NextResponse.json(
        {
          error: "Unauthorized",
        },
        {
          status: 401,
        },
      );
    }

    const memeId = req.url.split("/").at(-1);

    if (!memeId) {
      return NextResponse.json(
        { message: "Meme id is required" },
        { status: 400 },
      );
    }

    const meme = await prisma.meme.findUnique({
      where: {
        id: memeId,
      },
    });

    return NextResponse.json(
      {
        message: "Fetched meme successfully",
        data: meme,
      },
      {
        status: 200,
      },
    );
  } catch (err: any) {
    return NextResponse.json(
      { message: "Interval server errror" },
      { status: 500 },
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const user = await currentUser();
    if (!user) {
      return NextResponse.json(
        {
          error: "Unauthorized",
        },
        {
          status: 401,
        },
      );
    }
    if (user.publicMetadata.role !== "admin") {
      return NextResponse.json(
        {
          error: "Unauthorized",
        },
        {
          status: 401,
        },
      );
    }
    const memeId = req.url.split("/").at(-1);
    if (!memeId) {
      return NextResponse.json(
        { message: "Meme id is required" },
        { status: 400 },
      );
    }
    const { memeName, memeDescription, memeTags, memeImageURL } =
      await req.json();
    if (!memeName || !memeDescription || !memeTags || !memeImageURL) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 },
      );
    }
    const meme = await prisma.meme.findUnique({
      where: {
        id: memeId,
      },
    });

    if (!meme) {
      return NextResponse.json({ message: "Meme not found" }, { status: 404 });
    }

    const updatedMeme = await prisma.meme.update({
      where: {
        id: memeId,
      },
      data: {
        name: memeName,
        description: memeDescription,
        tags: memeTags,
        url: memeImageURL,
      },
    });
    return NextResponse.json(
      {
        message: "Meme updated successfully",
        data: updatedMeme,
      },
      {
        status: 200,
      },
    );
  } catch (err: any) {
    return NextResponse.json(
      { message: "Interval server errror" },
      { status: 500 },
    );
  }
}

export async function DELETE(req: NextRequest) {}
