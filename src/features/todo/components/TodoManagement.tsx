'use client'

import { useRecoilState } from 'recoil'
import { Id, Todo } from '../types'
import { EditTodoModal } from './EditTodoModal'
import { StyledButton } from '@/components/ui-elements/Button/StyledButton'
import { CreateTodoModal } from '@/features/todo/components/CreateTodoModal'
import { TodoMatrix } from '@/features/todo/components/TodoMatrix'
import { useSelectTodo } from '@/features/todo/hooks/useSelectTodo'
import { IncompletedTodoAtom } from '@/recoil/atoms/incompletedTodoAtom'
import { showCreateTodoModalAtom } from '@/recoil/atoms/showCreateTodoModalAtom'
import { showEditTodoModalAtom } from '@/recoil/atoms/showEditTodoModalAtom'

interface Props {
  incompleteTodos: Todo[]
}

export const TodoManagement = (props: Props) => {
  const { incompleteTodos } = props
  const [incompletedTodos, setIncompletedTodos] = useRecoilState(IncompletedTodoAtom)
  console.log('incompletedTodos', incompletedTodos)

  setIncompletedTodos(incompleteTodos)

  const { selectedTodo, onSelectTodo } = useSelectTodo()

  const [showCreateTodoModal, setShowCreateTodoModal] = useRecoilState(showCreateTodoModalAtom)
  const [showEditTodoModal, setShowEditTodoModal] = useRecoilState(showEditTodoModalAtom)

  const openModal = async () => {
    setShowCreateTodoModal(true)
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
      <div className='mx-auto max-w-screen-md flex justify-between'>
        <TodoMatrix todos={incompletedTodos} openEditModal={openEditModal} />
      </div>
      <CreateTodoModal open={showCreateTodoModal} setOpen={setShowCreateTodoModal} />
      <EditTodoModal todo={selectedTodo} open={showEditTodoModal} setOpen={setShowEditTodoModal} />
    </div>
  )
}
