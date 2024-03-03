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
import { showEditTodoModalAtom } from '@/recoil/atoms/showEditTodoModalAtom'
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const { selectedTodo, onSelectTodo } = useSelectTodo()

  const [showEditTodoModal, setShowEditTodoModal] = useRecoilState(showEditTodoModalAtom)

  const openModal = (id?: Id) => {
    if (id) {
      onSelectTodo({ id, incompletedTodos, setShowEditTodoModal })
    }
  }

  return (
    <div className='mt-12 mb-24'>
      <div className='mx-auto max-w-screen-md flex justify-between my-10'>
        <h1 className='text-white text-2xl font-bold mt-4'>Todo Matrix</h1>
        <div>
          <Button onClick={open} color='violet'>
            Todoを作成する
          </Button>
        </div>
      </div>
      <div className='mx-auto max-w-screen-md flex justify-between'>
        <TodoMatrix todos={incompletedTodos} openEditModal={openModal} />
      </div>
      <TodoModal todo={selectedTodo} opened={opened} close={close} />
    </div>
  )
}
