"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { Todo as TodoType } from "@prisma/client";
import { useRouter } from "next/navigation";
import { FaTrash } from "react-icons/fa";

type Props = {
  todoList: TodoType[];
};

const Todo = ({ todoList }: Props) => {
  const onClickAddTodo = async () => {
    await axios
      .post("/api/todo", { title, description })
      .then((res) => {
        toast.success("Added todo successfully!");
        router.refresh();
        console.log(res);
      })
      .catch((err) => {
        toast.error("Failed to add todo!");
        console.error(err);
      });
  };

  const onClickDeleteTodo = async (todoId: number) => {
    await axios
      .delete(`/api/todo/${todoId}`)
      .then((res) => {
        toast.success("Deleted todo successfully!");
        router.refresh();
        console.log(res);
      })
      .catch((err) => {
        toast.error("Failed to delete todo!");
        console.error(err);
      });
  };
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const router = useRouter();

  return (
    <div className="flex flex-col items-center p-12">
      <h1 className="font-bold text-3xl pb-8">Todo管理アプリケーション</h1>
      <Card className="w-full max-w-2xl p-6 mb-12">
        <CardContent>
          <div className="flex flex-col space-y-4">
            <label className="font-semibold">タイトル</label>
            <Input placeholder="タイトルを入力" onChange={(e) => setTitle(e.target.value)} />
            <label className="font-semibold">説明</label>
            <Textarea
              className="h-[120px]"
              placeholder="説明を入力 (任意)"
              onChange={(e) => setDescription(e.target.value)}
            />
            <Button type="button" onClick={() => onClickAddTodo()} className="mt-4">
              追加
            </Button>
          </div>
        </CardContent>
      </Card>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
        {todoList.map((todo, index) => (
          <Card key={index} className="relative w-full">
            <button
              onClick={() => onClickDeleteTodo(todo.id)}
              className="absolute top-2 right-2 text-gray-500 hover:text-red-800"
            >
              <FaTrash size={20} color="red" />
            </button>
            <CardHeader>
              <CardTitle>{todo.title}</CardTitle>
              <CardDescription>
                {todo.description.split("\n").map((text, index) => (
                  <p key={index}>{text}</p>
                ))}
              </CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Todo;
