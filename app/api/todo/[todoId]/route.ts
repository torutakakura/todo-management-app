import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function DELETE(_: NextRequest, { params }: { params: { todoId: string } }) {
  // 非同期で params を解決
  const { todoId } = await params;

  if (!todoId) {
    return new NextResponse("todoId is required", { status: 400 });
  }

  const res = await prisma.todo.delete({ where: { id: Number(todoId) } });
  return NextResponse.json(res, { status: 200 });
}
