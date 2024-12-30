/* eslint-disable @typescript-eslint/no-explicit-any */
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { name, email, password } = await body;

    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      return NextResponse.json(
        { con: false, msg: "User already exists" },
        { status: 400 }
      );
    }

    if (!name) {
      return NextResponse.json(
        { con: false, msg: "Invalid name" },
        { status: 400 }
      );
    }
    if (!email) {
      return NextResponse.json(
        { con: false, msg: "Invalid email" },
        { status: 400 }
      );
    }
    if (!password) {
      return NextResponse.json(
        { con: false, msg: "Invalid password" },
        { status: 400 }
      );
    }
    if (!name || !email || !password) {
      return NextResponse.json(
        { con: false, msg: "Invalid name, email, password" },
        { status: 400 }
      );
    }
    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        hashedPassword,
      },
    });

    return NextResponse.json(user);
  } catch (error: any) {
    console.log("[SIGN_UP_POST]", error.message);
    return NextResponse.json(
      { con: false, msg: "Internal error" },
      { status: 500 }
    );
  }
}
