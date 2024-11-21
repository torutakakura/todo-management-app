// 拡張機能を使って実装する
import { redirect } from "next/navigation";

export default function Home() {
  return redirect("/todos");
}
