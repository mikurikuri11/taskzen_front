import { Todo, Id } from '../types/index'

interface Props {
  id: Id
}

export const deleteTodo = async (props: Props) => {
  const { id } = props
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/todos/${id}`, {
    method: 'DELETE',
  })
  try {
    const data = await response.json()
    return data
  } catch (e) {
    console.error('Invalid JSON:', e)
  }
}
