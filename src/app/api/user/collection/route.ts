import getAuthenticatedUser from "@/utils/auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const user = getAuthenticatedUser(req);
  if (!user) {
    return NextResponse.json(
      {
        message: "Not authenticated",
      },
      { status: 401 },
    );
  }
}
