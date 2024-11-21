import Todos from "@/components/features/todos/Todos";
import { fetchAllTodos } from "../actions/todo";
import { Todo } from "@prisma/client";

export const revalidate = 0;

const TodoPage = async () => {
  const todoList: Todo[] = await fetchAllTodos();
  return <Todos todoList={todoList} />;
};

export default TodoPage;
