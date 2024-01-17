import { Category } from '@/features/category/types'
import { Id } from '@/features/todo/types'

type Props = {
  id: Id}

export const getTodoCategories = async (props: Props): Promise<Category[]> => {
  const { id } = props
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/categories/categories_by_todo/${id}`,
    {
      cache: 'no-store',
    },
  )
  const todoCategories = await res.json()
  return todoCategories
}
