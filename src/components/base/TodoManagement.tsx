'use client'

import { useSession } from 'next-auth/react'
import { useState, FC, useEffect } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'

import { useSelectTodo } from '../../features/todo/hooks/useSelectTodo'

import { Sidebar } from '@/components/base/Sidebar'
import { PurpleButton } from '@/components/ui/Button/PurpleButton'
import { getTodos } from '@/features/todo/api/getTodos'
import { getUserId } from '@/features/todo/api/getUserId'
import { Todo, User } from '@/features/todo/api/types/index'

import { TodoMatrix } from '@/features/todo/components/TodoMatrix'
import { SessionInfo, useGetServerSession } from '@/hooks/useGetServerSession'
import { loginUserIdAtom } from '@/recoil/atoms/loginUserIdAtom'
import { TodoAtom } from '@/recoil/atoms/todoAtom'

export const TodoManagement: FC = () => {
  const [open, setOpen] = useState(false)
  const { selectedTodo, onSelectTodo } = useSelectTodo()

  const [todos, setTodos] = useRecoilState(TodoAtom)
  const loginUserId = useRecoilValue(loginUserIdAtom)
  const { data: session, status } = useSession()

  useEffect(() => {
    const getTodosAsync = async () => {
      if (loginUserId) {
        const todos = await getTodos(loginUserId);
        console.log("todos", todos);
        setTodos(todos);
      }
    };
    getTodosAsync();
  }, [loginUserId]);

  console.log("loginuser", loginUserId);
  console.log("todos", todos);

  // const sessionInfo: SessionInfo | null = await useGetServerSession();
  // console.log("sessionInfo", sessionInfo?.name);
  // console.log("sessionInfo", sessionInfo?.email);

  const openSidebar = () => {
    setOpen(true)
  }

  return (
    <>
      <div className='mx-auto max-w-screen-md flex justify-between my-8'>
        <h1 className='text-white text-2xl font-bold mt-4'>Todo Matrix</h1>
        <PurpleButton onClick={openSidebar}>Open Sidebar</PurpleButton>
      </div>
      <div className='mx-auto max-w-screen-md flex justify-between my-8'>
        {/* <TodoMatrix todos={todos} /> */}
      </div>
      {/* <Sidebar todos={todos} open={open} setOpen={setOpen} /> */}
    </>
  )
}
