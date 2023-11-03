'use client'

import { FC } from 'react'
import { useRecoilState } from 'recoil'

import { Todo } from '@/features/todo/api/types/index'

import { CreateTodoModal } from '@/features/todo/components/CreateTodoModal'
import { TodoCard } from '@/features/todo/components/TodoCard'
import { useSelectTodo } from '@/features/todo/hooks/useSelectTodo'
import { showTodoModalAtom } from '@/recoil/atoms/showTodoModalAtom'

interface TodoListProps {
  todos: Todo[]
}

export const TodoList: FC<TodoListProps> = (props) => {
  const [showLoginModal, setShowLoginModal] = useRecoilState(showTodoModalAtom)
  const { selectedTodo, onSelectTodo } = useSelectTodo()
  const { todos } = props;

  const openModal = (id: number) => {
    onSelectTodo({ id, todos, setShowLoginModal })
  }

  return (
    <>
      <ul role="list" className="flex-1 divide-y divide-gray-200 overflow-y-auto">
        {todos.map((todo) => (
          <TodoCard
            key={todo.id}
            id={todo.id}
            todo={todo}
            openModal={openModal}
          />
        ))}
      </ul>
      <CreateTodoModal
        todo={selectedTodo}
        open={showLoginModal}
        setOpen={setShowLoginModal}
      />
    </>
  )
}
