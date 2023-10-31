"use client";

import { FC } from "react"

import { useRecoilState } from "recoil";
import { CreateTodoModal } from "./CreateTodoModal";
import { showTodoModalAtom } from "@/recoil/atoms/showTodoModalAtom";

export const TodoModalBase: FC = async () => {
  const [showTodoModal, setShowTodoModal] = useRecoilState(showTodoModalAtom);

  return (
    <>
      <CreateTodoModal open={showTodoModal} setOpen={setShowTodoModal} />
    </>
    )
}
