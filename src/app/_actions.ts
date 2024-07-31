"use server";

import prisma from "@/lib/prisma";

export async function getMemes(pageNumber: number) {
  try {
    const memes = await prisma.meme.findMany({
      skip: pageNumber * 15,
      take: 15,
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

export async function createUser(email: string | null, userId: string) {
  try {
    const createdUser = await prisma.user.create({
      data: {
        email,
        userId,
      },
    });
    return { success: true, createdUser };
  } catch (error) {
    console.error("Error creating user:", error);
    return { success: false, error: "Failed to create user" };
  }
}

export async function getTotalMemes() {
  try {
    const total = await prisma.meme.count();
    return total;
  } catch (error) {
    console.error("Error getting total memes:", error);
    return 0;
  }
}
