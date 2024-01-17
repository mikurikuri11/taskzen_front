import { Category } from '@/features/category/types'
import { Id } from '@/features/todo/types'

type Props = {
  id: Id
}

export const deleteCategory = async (props: Props): Promise<Category> => {
  const { id } = props
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/categories/${id}`, {
    method: 'DELETE',
  })
  const data = await response.json()
  return data
}
