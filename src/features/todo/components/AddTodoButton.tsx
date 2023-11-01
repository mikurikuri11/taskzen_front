"use client";

import { FC } from "react"
import { useRecoilState } from "recoil";
import { PurpleButton } from "@/components/ui/Button/PurpleButton";
import { addTodos } from "@/features/todo/api/addTodos";
import { showTodoModalAtom } from "@/recoil/atoms/showTodoModalAtom";

export const AddTodoButton: FC = async () => {
  const [showTodoModal, setShowTodoModal] = useRecoilState(showTodoModalAtom);
  const openModal = () => {
    setShowTodoModal(true);
  }

  return (
    <>
      <PurpleButton onClick={openModal}>追加</PurpleButton>
    </>
    )
}
