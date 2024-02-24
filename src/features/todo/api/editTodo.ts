import { Todo, Id } from '../types/index'

interface Props {
  updatedTodo: Todo
  todoId: Id
  id: Id
}

export const editTodo = async (props: Props): Promise<Todo> => {
  const { updatedTodo, todoId, id } = props
  const updatedTodoWithUid = {
    ...updatedTodo,
    uid: id,
  }
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/todos/${todoId}`, {
    method: 'PUT',
    body: JSON.stringify(updatedTodoWithUid),
    headers: {
      'Content-Type': 'application/json',
    },
  })
  const data = await response.json()
  return data
}
