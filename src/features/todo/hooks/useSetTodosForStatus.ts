import { useEffect } from 'react'
import { useSetRecoilState } from 'recoil'
import { Todo } from '@/features/todo/api/types/index'
import { completedTodoAtom } from '@/recoil/atoms/completedTodoAtom'
import { incompletedTodoAtom } from '@/recoil/atoms/incompletedTodoAtom'

export function useSetTodosForStatus(todos: Todo[]) {
  const setCompletedTodos = useSetRecoilState(completedTodoAtom)
  const setIncompletedTodos = useSetRecoilState(incompletedTodoAtom)

  useEffect(() => {
    const incompletedTodos = todos.filter((todo) => !todo.completed)
    setIncompletedTodos(incompletedTodos)

    const completedTodos = todos.filter((todo) => todo.completed)
    setCompletedTodos(completedTodos)
  }, [todos, setCompletedTodos, setIncompletedTodos])

  return {
    setCompletedTodos,
    setIncompletedTodos,
  }
}
