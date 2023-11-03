"use client";

import { FC } from "react"
import { useRecoilState } from "recoil";

import { TodoCard } from "./TodoCard";

import { PurpleButton } from "@/components/ui/Button/PurpleButton";
import { Todo } from "@/features/todo/api/types/index";

import { CreateTodoModal } from "@/features/todo/components/CreateTodoModal";
import { SessionInfo, useGetServerSession } from "@/hooks/useGetServerSession";
import { showTodoModalAtom } from "@/recoil/atoms/showTodoModalAtom";

interface TodoListProps {
  todos: Todo[];
}

export const TodoList: FC<TodoListProps> = ({ todos }) => {

  const [ showLoginModal, setShowLoginModal ] = useRecoilState(showTodoModalAtom);
  // const sessionInfo: SessionInfo | null = await useGetServerSession();
  // console.log("sessionInfo", sessionInfo?.name);
  // console.log("sessionInfo", sessionInfo?.email);
  const openModal = () => {
    setShowLoginModal(true);
  }

  return (
    <>
      <div className="mx-auto max-w-screen-md flex justify-between my-8">
        <h1 className="text-white text-2xl font-bold mt-4">Todo List</h1>
        <PurpleButton onClick={openModal}>追加</PurpleButton>
      </div>
      <ul role="list" className="divide-y divide-slate-600 mx-auto max-w-screen-md mt-4">
        {/* TODO: rails側でtodoをfilterする */}
        {todos.map((todo) => (
          <TodoCard key={todo.id} todo={todo} />
        ))}
      </ul>
      <CreateTodoModal open={showLoginModal} setOpen={setShowLoginModal}  />
    </>
    )
}
