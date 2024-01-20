'use client'

import { useSession } from 'next-auth/react'
import { FC, useEffect } from 'react'
import { useRecoilState } from 'recoil'
import { getIncompleteTodos } from '../api/getIncompleteTodos'
import { Id } from '../types'
import { EditTodoModal } from './EditTodoModal'
import { StyledButton } from '@/components/ui-elements/Button/StyledButton'
import { getCategories } from '@/features/category/api/category/getCategories'
import { CreateTodoModal } from '@/features/todo/components/CreateTodoModal'
import { TodoMatrix } from '@/features/todo/components/TodoMatrix'
import { useSelectTodo } from '@/features/todo/hooks/useSelectTodo'
import { CategoryAtom } from '@/recoil/atoms/categoryAtom'
import { IncompletedTodoAtom } from '@/recoil/atoms/incompletedTodoAtom'
import { showCreateTodoModalAtom } from '@/recoil/atoms/showCreateTodoModalAtom'
import { showEditTodoModalAtom } from '@/recoil/atoms/showEditTodoModalAtom'

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

  const [categories, setCategories] = useRecoilState(CategoryAtom)
  const { selectedTodo, onSelectTodo } = useSelectTodo()

  const [showCreateTodoModal, setShowCreateTodoModal] = useRecoilState(showCreateTodoModalAtom)
  const [showEditTodoModal, setShowEditTodoModal] = useRecoilState(showEditTodoModalAtom)

  const openModal = async () => {
    setShowCreateTodoModal(true)
    const categories = await getCategories({ id: session?.user?.id ?? '' })
    setCategories(categories)
  }

  const openEditModal = (id: Id) => {
    onSelectTodo({ id, incompletedTodos, setShowEditTodoModal })
  }

  return (
    <div className='mt-12 mb-24'>
      <div className='mx-auto max-w-screen-md flex justify-between my-10'>
        <h1 className='text-white text-2xl font-bold mt-4'>Todo Matrix</h1>
        <div>
          <StyledButton buttonStyle='bg-indigo-500' onClick={openModal}>
            Todoを作成する
          </StyledButton>
        </div>
      </div>
      {/* <div className='mx-auto max-w-screen-md flex justify-evenly mt-16'>
        <div className='text-white star-burst'>緊急</div>
        <div className='text-white'>緊急でない</div>
      </div> */}
      <div className='mx-auto max-w-screen-md flex justify-between'>
        {/* <div className='mx-auto max-w-screen-md flex flex-col justify-evenly my-8'>
          <div
            className='text-white mx-6'
            style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
          >
            重要
          </div>
          <div
            className='text-white mx-6'
            style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
          >
            重要でない
          </div>
        </div> */}
        <TodoMatrix todos={incompletedTodos} openEditModal={openEditModal} />
      </div>
      <CreateTodoModal open={showCreateTodoModal} setOpen={setShowCreateTodoModal} />
      <EditTodoModal todo={selectedTodo} open={showEditTodoModal} setOpen={setShowEditTodoModal} />
    </div>
  )
}
