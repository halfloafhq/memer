"use server";

import { prisma } from "@/lib/prisma";

export async function getMemes(pageNumber: number) {
  try {
    const memes = await prisma.meme.findMany({
      skip: pageNumber * 5,
      take: 5,
      orderBy: {
        name: "asc",
      },
    });
    return memes;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function searchMemes(searchTerm: string) {
  try {
    const memes = await prisma.meme.findMany({
      where: {
        OR: [
          {
            name: {
              contains: searchTerm,
              mode: "insensitive",
            },
          },
          {
            description: {
              contains: searchTerm,
              mode: "insensitive",
            },
          },
        ],
      },
    });
    return memes;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function getCollections(userId: string) {
  try {
    const collections = await prisma.collection.findMany({
      where: {
        madeById: userId,
      },
    });
    return collections;
  } catch (error) {
    console.error("Error fetching collections:", error);
    return [];
  }
}
