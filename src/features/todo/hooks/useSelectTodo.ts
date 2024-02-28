import { useState } from 'react'
import { Id, Todo } from '@/types'

type Props = {
  id: Id
  incompletedTodos: Array<Todo>
  setShowEditTodoModal: (show: boolean) => void
}

// 選択したTodoを特定し、モーダルを表示するカスタムフック
export const useSelectTodo = () => {
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null)

  const onSelectTodo = (props: Props) => {
    const { id, incompletedTodos, setShowEditTodoModal } = props
    const selectedTodo = incompletedTodos.find((todo) => todo.id === id)
    setSelectedTodo(selectedTodo || null)
    setShowEditTodoModal(true)
  }

  return { selectedTodo, onSelectTodo }
}
