import { prisma } from "@/lib/prisma";
import { CollectionWithMemes } from "@/types/collection";
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

    const collection = (await prisma.collection.findFirst({
      where: {
        id: params.id,
        madeById: user.id,
      },
      include: {
        memes: {
          include: {
            meme: true,
          },
        },
      },
    })) as CollectionWithMemes | null;

    if (!collection) {
      return NextResponse.json(
        { error: "Collection not found or unauthorized" },
        { status: 404 },
      );
    }

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

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const user = await currentUser();
    if (!user) {
      return NextResponse.json(
        { message: "User not authenticated" },
        { status: 401 },
      );
    }

    if (!params.id) {
      return NextResponse.json(
        { message: "No collection id" },
        { status: 400 },
      );
    }

    const collection = await prisma.collection.findUnique({
      where: {
        id: params.id,
        madeById: user.id,
      },
      include: {
        memes: true,
      },
    });

    if (!collection) {
      return NextResponse.json(
        { message: "Collection not found" },
        { status: 404 },
      );
    }

    const { collectionId, memeId } = await req.json();
    if (!collectionId || !memeId) {
      return NextResponse.json(
        { message: "No collection id or meme id" },
        { status: 400 },
      );
    }

    // Check if the meme already exists in the collection
    const existingMemeInCollection = await prisma.memeCollection.findFirst({
      where: {
        collectionId: collectionId,
        memeId: memeId,
      },
    });

    if (existingMemeInCollection) {
      return NextResponse.json(
        { message: "Meme already exists in this collection" },
        { status: 409 }, // 409 Conflict
      );
    }

    // If the meme doesn't exist in the collection, add it
    await prisma.memeCollection.create({
      data: {
        collectionId: collectionId,
        memeId: memeId,
      },
    });

    return NextResponse.json(
      { message: "Saved meme to collection successfully" },
      { status: 200 },
    );
  } catch (err: any) {
    console.error(err);
    return NextResponse.json(
      { message: "Internal Server error" },
      { status: 500 },
    );
  }
}
