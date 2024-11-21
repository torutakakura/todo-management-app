import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

interface RouteParams {
  params: {
    todoId: string;
  };
}

const prisma = new PrismaClient();

export async function DELETE(request: NextRequest, { params }: RouteParams) {
  // 非同期で params を解決
  try {
    const { todoId } = await params;

    if (!todoId) {
      return new NextResponse("todoId is required", { status: 400 });
    }

    const res = await prisma.todo.delete({ where: { id: Number(todoId) } });
    return NextResponse.json(res, { status: 200 });
  } catch (error) {
    console.error(error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
