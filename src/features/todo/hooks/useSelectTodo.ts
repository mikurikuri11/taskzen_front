import { useState } from 'react'
import { Todo } from "@/features/todo/api/types/index";

type Props = {
  id: number;
  todos: Array<Todo>;
  setShowLoginModal: (value: boolean) => void;
}

// 選択したTodoを特定し、モーダルを表示するカスタムフック
export const useSelectTodo = () => {
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null)

  const onSelectTodo = (props: Props) => {
    const { id, todos, setShowLoginModal } = props;
    const selectedTodo = todos.find(todo => todo.id === id);
    setSelectedTodo(selectedTodo || null);
    setShowLoginModal(true);
  }

  return { selectedTodo, onSelectTodo }
}
