import { Todo } from '../types/index'

type Props = {
  id: string
}

export const getTodosByTwo = async (props: Props): Promise<Todo[]> => {
  const { id } = props
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/todos/incomplete_todo_by_two/${id}`,
    {
      cache: 'no-store',
    },
  )
  const todos = await res.json()
  return todos
}
