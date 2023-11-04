'use client'

import { FC } from 'react'
import { useRecoilState } from 'recoil'

import { CreateTodoModal } from './CreateTodoModal'
import { Todo } from '@/features/todo/api/types/index'

import { EditTodoModal } from '@/features/todo/components/EditTodoModal'
import { TodoCard } from '@/features/todo/components/TodoCard'
import { useSelectTodo } from '@/features/todo/hooks/useSelectTodo'
import { showCreateTodoModalAtom } from '@/recoil/atoms/showCreateTodoModalAtom'
import { showEditTodoModalAtom } from '@/recoil/atoms/showEditTodoModalAtom'

interface TodoListProps {
  todos: Todo[]
}

export const TodoList: FC<TodoListProps> = (props) => {
  const [showEditTodoModal, setShowEditTodoModal] = useRecoilState(showEditTodoModalAtom);
  const [showCreateTodoModal, setShowCreateTodoModal] = useRecoilState(showCreateTodoModalAtom);
  const { selectedTodo, onSelectTodo } = useSelectTodo()
  const { todos } = props

  const openModal = (id: number) => {
    onSelectTodo({ id, todos, setShowEditTodoModal })
  }

  return (
    <>
      <ul role='list' className='flex-1 divide-y divide-gray-200 overflow-y-auto'>
        {todos.map((todo) => (
          <TodoCard key={todo.id} id={todo.id} todo={todo} openModal={openModal} />
        ))}
      </ul>
      <EditTodoModal todo={selectedTodo} open={showEditTodoModal} setOpen={setShowEditTodoModal} />
      <CreateTodoModal open={showCreateTodoModal} setOpen={setShowCreateTodoModal} />
    </>
  )
}
