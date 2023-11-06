'use client'

import { useSession } from 'next-auth/react'
import { useState, FC, useEffect } from 'react'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'

import { useSelectTodo } from '../../features/todo/hooks/useSelectTodo'

import { Sidebar } from '@/components/base/Sidebar'
import { PurpleButton } from '@/components/ui/Button/PurpleButton'
import { getTodos } from '@/features/todo/api/getTodos'
import { Todo, User } from '@/features/todo/api/types/index'

import { TodoMatrix } from '@/features/todo/components/TodoMatrix'
import { completedTodoAtom } from '@/recoil/atoms/completedTodoAtom'
import { incompletedTodoAtom } from '@/recoil/atoms/incompletedTodoAtom'
import { TodoAtom } from '@/recoil/atoms/todoAtom'

export const TodoManagement: FC = () => {
  const [open, setOpen] = useState(false)
  const { selectedTodo, onSelectTodo } = useSelectTodo()

  const [todos, setTodos] = useRecoilState(TodoAtom)
  const [completedTodos, setCompletedTodos] = useRecoilState(completedTodoAtom)
  const [incompletedTodos, setIncompletedTodos] = useRecoilState(incompletedTodoAtom)
  // const setCompletedTodos = useSetRecoilState(TodoAtom)
  // const setIncompletedTodos = useSetRecoilState(TodoAtom)

  const { data: session, status } = useSession()

  useEffect(() => {
    const getTodosAsync = async () => {
      if (status === 'authenticated' && session) {
        const todos = await getTodos({ id: session.user.id })
        setTodos(todos)
      }
    }
    getTodosAsync()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, session])

  useEffect(() => {
    const incompletedTodos = todos.filter((todo) => !todo.completed)
    setIncompletedTodos(incompletedTodos)

    const completedTodos = todos.filter((todo) => todo.completed)
    setCompletedTodos(completedTodos)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [todos])

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
        <TodoMatrix />
      </div>
      <Sidebar open={open} setOpen={setOpen} />
    </>
  )
}
