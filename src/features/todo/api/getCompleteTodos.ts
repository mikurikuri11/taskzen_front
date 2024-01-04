import { Todo } from './types/index'

type Props = {
  id: string
}

export const getCompleteTodos = async (props: Props): Promise<Todo[]> => {
  const { id } = props
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/todos/complete_todo/${id}`, {
    cache: 'no-store',
  })
  const todos = await res.json()
  return todos
}
