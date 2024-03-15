'use client'

import { Button, Loader } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { useSession } from 'next-auth/react'
import { useEffect } from 'react'
import { useRecoilState } from 'recoil'

import { useIncompletedTodos } from '../hooks/useIncompletedTodos'
import { TodoModal } from './TodoModal'
import { TodoMatrix } from '@/features/todo/components/TodoMatrix'
import { useSelectTodo } from '@/features/todo/hooks/useSelectTodo'
import { IncompletedTodoAtom } from '@/recoil/atoms/incompletedTodoAtom'
import { Id, Todo } from '@/types'

export const TodoManagement = () => {
  const { data: session, status } = useSession()
  const id = session?.user?.id

  const { data, error, isLoading, isEmpty } = useIncompletedTodos({ id: id as Id })

  const [opened, { open, close }] = useDisclosure(false)
  const [incompletedTodos, setIncompletedTodos] = useRecoilState(IncompletedTodoAtom)

  const todos = data as Todo[]

  useEffect(() => {
    setIncompletedTodos(todos)
  }, [todos])

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

  if (error) {
    return <div>エラーが発生しました</div>
  }

  if (isLoading) {
    return <Loader color='violet' />
  }

  return (
    <div className='flex flex-col gap-4 '>
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
