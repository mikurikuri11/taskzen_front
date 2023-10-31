import { TodoList } from "@/features/todo/components/TodoList";
import { SessionInfo, useGetServerSession } from "@/hooks/useGetServerSession";

export default async function Home() {
  const sessionInfo: SessionInfo | null = await useGetServerSession();
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/todos`, { cache: "no-store" });
  const todos = await res.json();
  console.log("todos", todos);

  return (
    <>
      {sessionInfo ? (
        <TodoList todos={todos} />
      ) : (
        <div>アクセスできません</div>
      )}
    </>
  );
}
