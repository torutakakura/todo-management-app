import prisma from "@/lib/prisma";

export const fetchAllTodos = async () => {
  return await prisma.todo.findMany();
};
