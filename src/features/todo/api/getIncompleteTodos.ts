import { Id, Todo } from '@/types'

interface Props {
  id: Id
}

export const getIncompleteTodos = async (props: Props): Promise<Todo[]> => {
  const { id } = props
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/todos/incomplete_todo/${id}`, {
    cache: 'no-store',
  })
  if (!res.ok) {
    throw new Error('Failed to fetch')
  }
  const todos = await res.json()
  return todos
}
