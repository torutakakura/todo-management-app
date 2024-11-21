# イマドキの Next.js アプリを作るなら

## 今回の目的

いまどきの Next.js アプリケーション で使われるを最新技術やツールを紹介します。
AI が出力したものをより理解できるようになりましょう！

## 今回の目標

30 分でシンプルな Todo 管理アプリケーションを作成します。

## アプリケーションの仕様

### 画面構成

- Todo 管理画面

### 機能

- Todo 一覧取得（GET）
- Todo 作成（POST）
- Todo 削除（DELETE）

### 使用技術

- Next.js
  - shadcn (UI コンポーネント)
  - prisma (ORM)
  - react-hot-toast (通知)
  - react-icons (アイコン)
- Docker
  - PostgreSQL (データベース)

## 手順

### 1. Next.js アプリケーションの作成

プロジェクトをセットアップします。

```bash
$ npx create-next-app
$ cd todo-management-app
$ npm run dev
```

初期ページを削除し、「Enter」の文字列が表示される状態にします。

### 2. 開発効率化のための VS Code 拡張機能を紹介

- Next.js snippets：Next.js 用スニペットを簡単に挿入
- Tailwind CSS IntelliSense：Tailwind のクラス補完
- Prettier：コード整形
- Code Spell Checker：スペルミスの検知
- Auto Close Tag / Auto Rename Tag：タグ補完・リネーム支援
- Material Icon Theme：アイコン表示

### 3. ヘッダーの作成

Tailwind CSS チートシートを利用しながら、簡単なヘッダーを実装します。（拡張機能の紹介に使う）

```
import Link from "next/link";

const Header = () => {
  return (
    <header className="flex justify-between p-4 bg-green-900">
      <h1 className="font-bold text-lg text-white hover:text-gray-500">
        <Link href="/">LOGO</Link>
      </h1>
      <nav>
        <ul className="flex justify-around space-x-8 font-semibold text-white">
          <li className="hover:text-gray-500">
            <Link href="/">Home</Link>
          </li>
          <li className="hover:text-gray-500">
            <Link href="/about">About</Link>
          </li>
          <li className="hover:text-gray-500">
            <Link href="/contact">Contact</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
```

### 4. Docker で PostgreSQL の準備

Docker を利用してデータベース環境を構築します。

```bash
$ docker compose up --build
```

docker-compose.yml ファイルが正しく設定されていることを確認します。

### 5. Todo 管理画面の作成

ここからアプリのコア部分を作成していきます。ステップごとに順を追って進めるので安心してください。

#### ① Todo を追加するためのコンポーネント作成

Shadcn の UI コンポーネントをインストールする。

```bash
$ npx shadcn@latest init
$ npx shadcn@latest add button input textarea label card
```

必要なライブラリをインストール

```bash
$ npm install react-icons react-hot-toast axios @prisma/client prisma
```

#### ② Todo 管理画面 の大枠を作成

```tsx
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FaTrash } from "react-icons/fa";

const mockTodoList = [
  { id: 1, title: "Todo1", description: "Todo1の説明" },
  { id: 2, title: "Todo2", description: "Todo2の説明" },
  { id: 3, title: "Todo3", description: "Todo3の説明" },
  { id: 4, title: "Todo4", description: "Todo4の説明" },
  { id: 5, title: "Todo5", description: "Todo5の説明" },
];

const Todo = () => {
  return (
    <div className="flex flex-col items-center p-12">
      <h1 className="font-bold text-3xl pb-8">Todo管理アプリケーション</h1>
      <Card className="w-full max-w-2xl p-6 mb-12">
        <CardContent>
          <div className="flex flex-col space-y-4">
            <label className="font-semibold">タイトル</label>
            {/* // TODO: タイトルを状態管理 */}
            <Input placeholder="タイトルを入力" onChange={() => console.log("タイトルが変更されます。")} />
            <label className="font-semibold">説明</label>
            <Textarea
              className="h-[120px]"
              placeholder="説明を入力 (任意)"
              //   TODO: 説明を状態管理
              onChange={() => console.log("説明が変更されます。")}
            />
            {/* // TODO: Todo作成処理 */}
            <Button type="button" onClick={() => console.log("作成します。")} className="mt-4">
              追加
            </Button>
          </div>
        </CardContent>
      </Card>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
        {mockTodoList.map((todo, index) => (
          <Card key={index} className="relative w-full">
            <button
              //   TODO: Todo削除処理
              onClick={() => console.log("削除します。")}
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
```

#### ③ Todo 作成 API の呼び出し部分の作成

**＜ 自力コーディング ＞**

```
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
```

#### ④ Prisma のセットアップを行う

データベース接続を行うため、Prisma を導入します。

```bash
$ npx prisma init --datasource-provider postgresql
```

.env ファイルに接続情報を記載します。

```plaintext
DATABASE_URL="postgresql://postgres:root@localhost:5432/nextjs_db?schema=public"
```

schema.prisma を以下のように修正します。

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model Todo {
  id          Int       @id @default(autoincrement())
  title       String
  description String
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt
}
```

マイグレーションを実行します。

```bash
$ npx prisma generate
$ npx prisma db push
```

#### ⑤ Todo 作成 API の実装

API エンドポイントを作成します（例：app/api/todo/route.ts）。

**＜ 自力コーディング ＞**

```
export async function POST(request: NextRequest) {
  const body = await request.json();
  const { title, description } = body;
  console.log(title, description);
  const res = await prisma.todo.create({ data: { title, description } });
  return NextResponse.json(res, { status: 201 });
}

```

#### ⑥ Todo 一覧の取得と表示

一覧取得処理を実装します。

**＜ 自力コーディング ＞**

```
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const fetchAllTodos = async () => {
  return await prisma.todo.findMany();
};

```

#### ⑦ Todo の削除呼び出し & Todo 削除 API

**＜ 自力コーディング ＞**

- 呼び出し側

```
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

```

- API 側

```
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function DELETE(_: NextRequest, context: { params: { todoId: string } }) {
  // 非同期で params を解決
  const { todoId } = await context.params;

  if (!todoId) {
    return new NextResponse("todoId is required", { status: 400 });
  }

  const res = await prisma.todo.delete({ where: { id: Number(todoId) } });
  return NextResponse.json(res, { status: 200 });
}
```
