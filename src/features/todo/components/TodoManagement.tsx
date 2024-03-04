'use client'

import { Button } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'

import { useSession } from 'next-auth/react'
import { FC, useEffect } from 'react'
import { useRecoilState } from 'recoil'
import { getIncompleteTodos } from '../api/getIncompleteTodos'
import { TodoModal } from './TodoModal'
import { TodoMatrix } from '@/features/todo/components/TodoMatrix'
import { useSelectTodo } from '@/features/todo/hooks/useSelectTodo'
import { IncompletedTodoAtom } from '@/recoil/atoms/incompletedTodoAtom'
import { Id } from '@/types'

export const TodoManagement: FC = () => {
  const { data: session, status } = useSession()
  const [opened, { open, close }] = useDisclosure(false)

  const [incompletedTodos, setIncompletedTodos] = useRecoilState(IncompletedTodoAtom)

  useEffect(() => {
    const getTodosAsync = async () => {
      if (status === 'authenticated' && session) {
        const data = await getIncompleteTodos({ id: session.user.id })
        setIncompletedTodos(data)
      }
    }

    getTodosAsync()
  }, [])

  const { selectedTodo, onSelectTodo } = useSelectTodo()

  const openModal = () => {
    onSelectTodo({
      id: 0,
      incompletedTodos,
    })
    open()
  }

  const openModalWithId = (id?: Id) => {
    if (!id) return
    onSelectTodo({ id, incompletedTodos })
    open()
  }

  return (
    <div className='flex flex-col gap-4'>
      <div className='flex justify-between'>
        <h1 className='text-white text-2xl font-bold'>Todo Matrix</h1>
        <Button onClick={openModal} color='violet' className='mt-3'>
          Todoを作成する
        </Button>
      </div>
      <TodoMatrix todos={incompletedTodos} openModalWithId={openModalWithId} />
      <TodoModal selectedTodo={selectedTodo} opened={opened} close={close} />
    </div>
  )
}
