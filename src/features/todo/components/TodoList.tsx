"use client";

import { FC } from "react"

import { AddTodoButton } from "./AddTodoButton";
import { TodoCard } from "./TodoCard";

import { TodoModalBase } from "./TodoModalBase";
import { getTodos } from "@/features/todo/api/getTodos"
import { Todo } from "@/features/todo/api/types/index";
import { SessionInfo, useGetServerSession } from "@/hooks/useGetServerSession";

interface TodoListProps {
  todos: Todo[];
}

export const TodoList: FC<TodoListProps> = ({ todos }) => {

  // const sessionInfo: SessionInfo | null = await useGetServerSession();
  // console.log("sessionInfo", sessionInfo?.name);
  // console.log("sessionInfo", sessionInfo?.email);

  return (
    <>
      <div className="mx-auto max-w-screen-md flex justify-between my-8">
        <h1 className="text-white text-2xl font-bold mt-4">Todo List</h1>
        <AddTodoButton />
      </div>
      <ul role="list" className="divide-y divide-slate-600 mx-auto max-w-screen-md mt-4">
        {/* TODO: rails側でtodoをfilterする */}
        {todos.map((todo) => (
          <TodoCard key={todo.id} todo={todo} />
        ))}
      </ul>
      {/* <TodoModalBase /> */}
    </>
    )
}
