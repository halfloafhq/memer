import prisma from '@/lib/prisma';
import { currentUser } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';
import { utapi } from '@/lib/utapi';

export async function POST(req: NextRequest) {
  try {
    const user = await currentUser();
    if (!user) {
      return NextResponse.json(
        {
          error: 'Unauthorized',
        },
        {
          status: 401,
        }
      );
    }

    if (user.publicMetadata.role !== 'admin') {
      return NextResponse.json(
        {
          error: 'Unauthorized',
        },
        {
          status: 401,
        }
      );
    }

    const { memeName, memeDescription, memeTags, memeImageURL, memeFileKey } = await req.json();

    const meme = await prisma.meme.create({
      data: {
        name: memeName,
        description: memeDescription,
        tags: memeTags,
        url: memeImageURL,
        fileKey: memeFileKey,
      },
    });

    if (!meme) {
      return NextResponse.json(
        {
          error: 'Meme creation failed',
        },
        {
          status: 500,
        }
      );
    }

    return NextResponse.json(
      {
        message: 'Meme created successfully',
        data: meme,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    return NextResponse.json(
      {
        error: 'Internal Server Error',
      },
      {
        status: 500,
      }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const user = await currentUser();
    if (!user) {
      return NextResponse.json(
        {
          error: 'Unauthorized',
        },
        {
          status: 401,
        }
      );
    }

    if (user.publicMetadata.role !== 'admin') {
      return NextResponse.json(
        {
          error: 'Unauthorized',
        },
        {
          status: 401,
        }
      );
    }

    const { memeFileKey } = await req.json();

    if (!memeFileKey) {
      return NextResponse.json(
        {
          error: 'No file key provided',
        },
        {
          status: 404,
        }
      );
    }

    await utapi.deleteFiles(memeFileKey);

    return NextResponse.json(
      {
        message: 'Meme deleted successfully',
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    return NextResponse.json(
      {
        error: 'Internal Server Error',
      },
      {
        status: 500,
      }
    );
  }
}
