'use server';

import prisma from '@/lib/prisma';

/**
 * Get memes (with pagination)
 * @param pageNumber - Page number to take data from
 */
export async function getMemes(pageNumber: number) {
  try {
    const memes = await prisma.meme.findMany({
      skip: pageNumber * 15,
      take: 15,
      orderBy: {
        name: 'asc',
      },
    });
    return memes;
  } catch (error) {
    console.error(error);
    return [];
  }
}

/**
 * Get memes for a specific search term
 * @param searchTerm - Query that user searched
 */
export async function searchMemes(searchTerm: string) {
  try {
    const memes = await prisma.meme.findMany({
      where: {
        OR: [
          {
            name: {
              contains: searchTerm,
              mode: 'insensitive',
            },
          },
          {
            description: {
              contains: searchTerm,
              mode: 'insensitive',
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

/**
 * Get collections for a user
 * @param userId - user id
 */
export async function getCollections(userId: string) {
  try {
    const collections = await prisma.collection.findMany({
      where: {
        madeById: userId,
      },
    });
    return collections;
  } catch (error) {
    console.error('Error fetching collections:', error);
    return [];
  }
}

/**
 * Create user in db
 * @param email - user email
 * @param userId - user id
 */
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
    console.error('Error creating user:', error);
    return { success: false, error: 'Failed to create user' };
  }
}

/**
 * Get total count of memes
 * @returns Promise<number> - Total number of memes
 */
export async function getTotalMemes() {
  try {
    const total = await prisma.meme.count();
    return total;
  } catch (error) {
    console.error('Error getting total memes:', error);
    return 0;
  }
}
