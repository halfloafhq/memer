"use server";
import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function removeMemeFromCollectionAction({
  collectionId,
  memeCollectionId,
}: {
  memeId: string;
  collectionId: string;
  memeCollectionId: string;
}) {
  try {
    const user = await currentUser();
    if (!user) {
      return {
        success: false,
        message: "Unauthorized: User not authenticated",
      };
    }

    // Verify that the collection belongs to the user
    const collection = await prisma.collection.findFirst({
      where: {
        id: collectionId,
        madeById: user.id,
      },
    });

    if (!collection) {
      return {
        success: false,
        message: "Collection not found or unauthorized",
      };
    }

    const memeCollection = await prisma.memeCollection.delete({
      where: {
        id: memeCollectionId,
      },
    });

    if (!memeCollection) {
      return {
        success: false,
        message: "Meme not found in the collection",
      };
    }

    return {
      success: true,
      message: "Meme removed from collection successfully",
    };
  } catch (error) {
    console.error("Error removing meme from collection:", error);
    return {
      success: false,
      message: "Error removing meme from collection",
    };
  }
}
