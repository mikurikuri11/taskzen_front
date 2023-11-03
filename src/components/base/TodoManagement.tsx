'use client'

import { useState, FC } from 'react'
import { useRecoilState } from 'recoil'

import { useSelectTodo } from '../../features/todo/hooks/useSelectTodo'

import { Sidebar } from '@/components/base/Sidebar'
import { PurpleButton } from '@/components/ui/Button/PurpleButton'
import { Todo } from '@/features/todo/api/types/index'

import { TodoMatrix } from '@/features/todo/components/TodoMatrix'
import { SessionInfo, useGetServerSession } from '@/hooks/useGetServerSession'
import { showTodoModalAtom } from '@/recoil/atoms/showTodoModalAtom'

interface TodoListProps {
  todos: Todo[]
}

export const TodoManagement: FC<TodoListProps> = ({ todos }) => {
  const [showLoginModal, setShowLoginModal] = useRecoilState(showTodoModalAtom)
  const { selectedTodo, onSelectTodo } = useSelectTodo()
  const [open, setOpen] = useState(true)
  // const sessionInfo: SessionInfo | null = await useGetServerSession();
  // console.log("sessionInfo", sessionInfo?.name);
  // console.log("sessionInfo", sessionInfo?.email);

  const openSidebar = () => {
    setOpen(true);
  }

  return (
    <>
      <div className='mx-auto max-w-screen-md flex justify-between my-8'>
        <h1 className='text-white text-2xl font-bold mt-4'>Todo Matrix</h1>
        <PurpleButton
          onClick={openSidebar}
        >
          Add Todo
        </PurpleButton>
      </div>
      <div className='mx-auto max-w-screen-md flex justify-between my-8'>
        <TodoMatrix todos={todos} />
      </div>
      <Sidebar
        todos={todos}
        open={open}
        setOpen={setOpen}
      />
    </>
  )
}
