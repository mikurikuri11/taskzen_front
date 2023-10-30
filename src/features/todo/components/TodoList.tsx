import { FC } from "react"

import { TodoCard } from "./TodoCard";
import { getTodos } from "@/features/todo/api/getTodos"
import { Todo } from "@/features/todo/api/types/index";

export const TodoList: FC = async () => {
  const todos: Todo[] = await getTodos();

  return (
    <ul role="list" className="divide-y divide-slate-600 mx-auto max-w-screen-md mt-6">
      {todos.map((todo) => (
        <TodoCard key={todo.id} todo={todo} />
      ))}
    </ul>
    )
}
