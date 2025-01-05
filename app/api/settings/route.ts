import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/get-current-user";

export async function POST(request: Request) {
  try {
    const currentUser = await getCurrentUser();
    const body = await request.json();
    const { name, image } = body;

    if (!currentUser?.id) {
      return NextResponse.json(
        { con: false, msg: "Unauthorized" },
        { status: 401 }
      );
    }

    const updatedUser = await prisma.user.update({
      where: {
        id: currentUser.id,
      },
      data: {
        name,
        image,
      },
    });
    return NextResponse.json(updatedUser);
  } catch (error: any) {
    console.log("[SETTINGS_POST]", error.message);
    return NextResponse.json(
      { con: false, msg: "Settings post error" },
      { status: 500 }
    );
  }
}
