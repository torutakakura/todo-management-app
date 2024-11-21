import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const fetchAllTodos = async () => {
  return await prisma.todo.findMany();
};
