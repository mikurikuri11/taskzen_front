'use client'

import { useSession } from 'next-auth/react'
import { FC, useEffect } from 'react'
import { useRecoilState } from 'recoil'
import { StyledButton } from '@/components/ui-elements/Button/StyledButton'
import { getCategories } from '@/features/category/api/category/getCategories'
import { getTodos } from '@/features/todo/api/getTodos'
import { CreateTodoModal } from '@/features/todo/components/CreateTodoModal'
import { TodoMatrix } from '@/features/todo/components/TodoMatrix'
import { useTodoManagement } from '@/features/todo/hooks/useTodoManagement'
import { CategoryAtom } from '@/recoil/atoms/categoryAtom'
import { showCreateTodoModalAtom } from '@/recoil/atoms/showCreateTodoModalAtom'
import { TodoAtom } from '@/recoil/atoms/todoAtom'

export const TodoManagement: FC = () => {
  const { data: session, status } = useSession()
  const { open, setOpen, todosByOne, todosByTwo, todosByThree, todosByFour } = useTodoManagement()

  const [todos, setTodos] = useRecoilState(TodoAtom)

  useEffect(() => {
    const getTodosAsync = async () => {
      if (status === 'authenticated' && session) {
        const todosData = await getTodos({ id: session.user.id })
        setTodos(todosData)
      }
    }

    getTodosAsync()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  console.log('todosだよ〜〜' + todos)

  const [categories, setCategories] = useRecoilState(CategoryAtom)

  const [showCreateTodoModal, setShowCreateTodoModal] = useRecoilState(showCreateTodoModalAtom)

  const openModal = async () => {
    setShowCreateTodoModal(true)
    const categories = await getCategories({ id: session?.user?.id ?? '' })
    setCategories(categories)
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
      <div className='mx-auto max-w-screen-md flex justify-evenly mt-16'>
        <div className='text-white star-burst'>緊急</div>
        <div className='text-white'>緊急でない</div>
      </div>
      <div className='mx-auto max-w-screen-md flex justify-between'>
        <div className='mx-auto max-w-screen-md flex flex-col justify-evenly my-8'>
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
        </div>
        <TodoMatrix
          todosByOne={todosByOne}
          todosByTwo={todosByTwo}
          todosByThree={todosByThree}
          todosByFour={todosByFour}
        />
      </div>
      <CreateTodoModal open={showCreateTodoModal} setOpen={setShowCreateTodoModal} />
    </div>
  )
}
