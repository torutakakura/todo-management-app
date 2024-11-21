import { PrismaClient } from "@prisma/client";

// PrismaClientのインスタンスを生成する関数
const prismaClientSingleton = () => {
  return new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
    datasources: {
      db: {
        url: process.env.DATABASE_URL,
      },
    },
  });
};

// globalThisにprismaGlobalを宣言
declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

// PrismaClientのインスタンス作成
const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

// 開発環境の場合、globalThisにprismaGlobalを設定
if (process.env.NODE_ENV !== "production") globalThis.prismaGlobal = prisma;

export default prisma;
