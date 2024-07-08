"use server";

import { prisma } from "@/lib/prisma";

export async function getMemes() {
  try {
    const memes = await prisma.meme.findMany();
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
