'use client'

import { useSession } from 'next-auth/react'
import { FC, useEffect } from 'react'
import { useRecoilState } from 'recoil'
import { getIncompleteTodos } from '../api/getIncompleteTodos'
import { TodoModal } from './TodoModal'
import { StyledButton } from '@/components/ui-elements/Button/StyledButton'
import { TodoMatrix } from '@/features/todo/components/TodoMatrix'
import { useSelectTodo } from '@/features/todo/hooks/useSelectTodo'
import { IncompletedTodoAtom } from '@/recoil/atoms/incompletedTodoAtom'
import { showCreateTodoModalAtom } from '@/recoil/atoms/showCreateTodoModalAtom'
import { showEditTodoModalAtom } from '@/recoil/atoms/showEditTodoModalAtom'
import { Id } from '@/types'

export const TodoManagement: FC = () => {
  const { data: session, status } = useSession()

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

  const [showCreateTodoModal, setShowCreateTodoModal] = useRecoilState(showCreateTodoModalAtom)
  const [showEditTodoModal, setShowEditTodoModal] = useRecoilState(showEditTodoModalAtom)

  const openModal = async () => {
    setShowCreateTodoModal(true)
  }

  const openEditModal = (id?: Id) => {
    if (id) {
      onSelectTodo({ id, incompletedTodos, setShowEditTodoModal })
    }
  }

  return (
    <div className='mt-12 mb-24'>
      <div className='mx-auto max-w-screen-md flex justify-between my-10'>
        <h1 className='text-white text-2xl font-bold mt-4'>Todo Matrix</h1>
        <div>
          <StyledButton buttonStyle='bg-indigo-500' onClick={openEditModal}>
            Todoを作成する
          </StyledButton>
        </div>
      </div>
      <div className='mx-auto max-w-screen-md flex justify-between'>
        <TodoMatrix todos={incompletedTodos} openEditModal={openEditModal} />
      </div>
      <TodoModal todo={selectedTodo} open={showEditTodoModal} setOpen={setShowEditTodoModal} />
    </div>
  )
}
