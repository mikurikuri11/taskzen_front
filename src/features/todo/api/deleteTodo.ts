import { Id } from '../types/index'

interface Props {
  todoId: Id
  id: Id
}

export const deleteTodo = async (props: Props) => {
  const { todoId, id } = props
  const updatedTodoWithUid = {
    uid: id,
  }
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/todos/${todoId}`, {
    method: 'DELETE',
    body: JSON.stringify(updatedTodoWithUid),
    headers: {
      'Content-Type': 'application/json',
    },
  })
  const data = await response.json()
  return data
}
