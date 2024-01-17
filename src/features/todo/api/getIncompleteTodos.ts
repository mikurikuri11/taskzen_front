import { Id, Todo } from '../types/index'

interface Props {
  id: Id
}

export const getIncompleteTodos = async (props: Props): Promise<Todo[]> => {
  const { id } = props
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/todos/incomplete_todo/${id}`, {
    cache: 'no-store',
  })
  const todos = await res.json()
  return todos
}
