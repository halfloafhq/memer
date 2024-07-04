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
