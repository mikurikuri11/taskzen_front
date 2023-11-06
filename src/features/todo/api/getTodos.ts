import { Todo } from './types/index'

type Props = {
  id: string
}

export const getTodos = async (props: Props): Promise<Todo[]> => {
  const { id } = props
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/todos/todos_by_uid/${id}`, {
    cache: 'no-store',
  })
  const todos = await res.json()
  return todos
}
