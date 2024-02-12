import { Category } from '../../types/index'
import { Id } from '@/features/todo/types'

type Props = {
  id: Id
  name: string
}

export const editCategory = async (props: Props): Promise<Category> => {
  const { name, id } = props
  const updatedCategory = { name }
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/categories/${id}`, {
    method: 'PUT',
    body: JSON.stringify(updatedCategory),
    headers: {
      'Content-Type': 'application/json',
    },
  })
  const data = await response.json()
  return data
}
