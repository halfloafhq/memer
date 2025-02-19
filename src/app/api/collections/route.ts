import prisma from '@/lib/prisma';
import { currentUser } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const user = await currentUser();

    if (!user) {
      return NextResponse.json(
        {
          message: 'User not authenticated',
        },
        { status: 401 }
      );
    }

    const collections = await prisma.collection.findMany({
      where: {
        madeById: user.id,
      },
    });

    return NextResponse.json(
      {
        message: 'Fetched collections successfully',
        data: collections,
      },
      {
        status: 200,
      }
    );
  } catch (err: any) {
    console.error(err);
    return NextResponse.json(
      {
        message: 'Internal Server error',
      },
      {
        status: 500,
      }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = await currentUser();

    if (!user) {
      return NextResponse.json(
        {
          message: 'User not authenticated',
        },
        { status: 401 }
      );
    }

    const { collectionName } = await req.json();

    await prisma.collection.create({
      data: {
        name: collectionName,
        madeById: user.id,
      },
    });

    return NextResponse.json(
      {
        message: 'Created collection successfully',
      },
      {
        status: 201,
      }
    );
  } catch (err: any) {
    console.error(err);
    return NextResponse.json(
      {
        message: 'Internal Server error',
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
          message: 'User not authenticated',
        },
        { status: 401 }
      );
    }

    const { collectionId } = await req.json();

    const collection = await prisma.collection.findUnique({
      where: {
        id: collectionId,
        madeById: user.id,
      },
    });

    if (!collection) {
      return NextResponse.json(
        {
          message: 'Collection not found or unauthorized',
        },
        {
          status: 404,
        }
      );
    }

    await prisma.collection.delete({
      where: {
        id: collectionId,
        madeById: user.id,
      },
    });

    return NextResponse.json(
      {
        message: 'Deleted collection successfully',
      },
      {
        status: 201,
      }
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      {
        message: 'Internal Server error',
      },
      {
        status: 500,
      }
    );
  }
}
