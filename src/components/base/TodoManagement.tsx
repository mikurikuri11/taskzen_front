'use client'

import { useSession } from 'next-auth/react'
import { useState, FC, useEffect } from 'react'
import { useRecoilState } from 'recoil'

import { useSelectTodo } from '../../features/todo/hooks/useSelectTodo'

import { Sidebar } from '@/components/base/Sidebar'
import { PurpleButton } from '@/components/ui/Button/PurpleButton'
import { getUserId } from '@/features/todo/api/getUserId'
import { Todo, User } from '@/features/todo/api/types/index'

import { TodoMatrix } from '@/features/todo/components/TodoMatrix'
import { SessionInfo, useGetServerSession } from '@/hooks/useGetServerSession'
import { loginUserAtom } from '@/recoil/atoms/loginUserAtom'
import { TodoAtom } from '@/recoil/atoms/todoAtom'

interface TodoListProps {
  todoArray: Todo[]
}

export const TodoManagement: FC<TodoListProps> = (props) => {
  const [open, setOpen] = useState(false)
  const { selectedTodo, onSelectTodo } = useSelectTodo()

  const { todoArray } = props
  const [todos, setTodos] = useRecoilState(TodoAtom)
  const [loginUser, setLoginUser] = useRecoilState(loginUserAtom)
  const { data: session, status } = useSession()

  useEffect(() => {
    const user = session?.user
    console.log('user', user)
    const setLoginUserAsync = async () => {
      if (user) {
        const userId = await getUserId({ uuid: user.id })
        setLoginUser(userId)
      }
    }
    setLoginUserAsync()
  }, [session, setLoginUser])

  useEffect(() => {
    const userTodoArray = todoArray.filter(function (todo) {
      return todo.user_id === loginUser
    })
    setTodos(userTodoArray)
  }, [session, setLoginUser, todoArray, loginUser])

  console.log(  'loginUser', loginUser)
  console.log(  'todos', todos)

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
        <TodoMatrix todos={todos} />
      </div>
      <Sidebar todos={todos} open={open} setOpen={setOpen} />
    </>
  )
}
