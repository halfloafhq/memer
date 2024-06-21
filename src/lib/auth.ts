import { getAuth } from "@clerk/nextjs/server";
import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";

const getAuthenticatedUser = async (req: NextRequest) => {
  const { userId } = getAuth(req);
  if (!userId) {
    return null;
  }
  const user = await prisma.user.findUnique({
    where: {
      userId: userId,
    },
  });

  if (!user) {
    return null;
  }

  return user;
};

export default getAuthenticatedUser;

