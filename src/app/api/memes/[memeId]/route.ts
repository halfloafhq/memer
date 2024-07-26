import { NextRequest, NextResponse } from "next/server";

export async function GET() {

  return NextResponse.json({
    message: "Hello World",
  });

}

export async function PUT(req: NextRequest) {
}

export async function DELETE(req: NextRequest) {
}
