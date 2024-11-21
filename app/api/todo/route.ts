import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { title, description } = body;
  console.log(title, description);
  const res = await prisma.todo.create({ data: { title, description } });
  return NextResponse.json(res, { status: 201 });
}
