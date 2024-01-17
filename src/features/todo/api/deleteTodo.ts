import { Todo, Id } from '../types/index'

interface Props {
  id: Id
}

export const deleteTodo = async (props: Props): Promise<Todo> => {
  const { id } = props
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/todos/${id}`, {
    method: 'DELETE',
  })
  const data = await response.json()
  return data
}
