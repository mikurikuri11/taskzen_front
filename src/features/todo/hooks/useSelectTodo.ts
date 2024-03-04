import { useState } from 'react'
import { Id, Todo } from '@/types'

interface Props {
  id: Id
  incompletedTodos: Array<Todo>
}

// 選択したTodoを特定し、モーダルを表示するカスタムフック
export const useSelectTodo = () => {
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null)

  const onSelectTodo = (props: Props) => {
    const { id, incompletedTodos } = props
    const selectedTodo = incompletedTodos.find((todo) => todo.id === id)
    setSelectedTodo(selectedTodo || null)
  }

  return { selectedTodo, onSelectTodo }
}
