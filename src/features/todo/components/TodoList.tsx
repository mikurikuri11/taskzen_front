import { FC } from "react"

import { TodoCard } from "./TodoCard";
import { getTodos } from "@/features/todo/api/getTodos"
import { Todo } from "@/features/todo/api/types/index";
import { SessionInfo, getServerSessionInfo } from "@/hooks/getServerSessionInfo";

export const TodoList: FC = async () => {
  const todos: Todo[] = await getTodos();

  const sessionInfo: SessionInfo | null = await getServerSessionInfo();
  console.log("sessionInfo", sessionInfo?.name);
  console.log("sessionInfo", sessionInfo?.email);

  return (
    <>
      <h1 className="text-white text-2xl font-bold mx-auto max-w-screen-md mt-6">Todo List</h1>
      <ul role="list" className="divide-y divide-slate-600 mx-auto max-w-screen-md mt-4">
        {/* TODO: rails側でtodoをfilterする */}
        {todos.map((todo) => (
          <TodoCard key={todo.id} todo={todo} />
        ))}
      </ul>
    </>
    )
}
