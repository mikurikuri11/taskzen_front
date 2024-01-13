import { Todo } from '../types/index'

type Props = {
  updatedTodo: Todo
  id: number
}

export const editTodo = async (props: Props): Promise<Todo> => {
  const { updatedTodo, id } = props
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/todos/${id}`, {
    method: 'PUT',
    body: JSON.stringify(updatedTodo),
    headers: {
      'Content-Type': 'application/json',
    },
  })
  const data = await response.json()
  return data
}
