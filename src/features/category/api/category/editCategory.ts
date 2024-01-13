import { Category } from '../../types/index'

type Props = {
  id: number
  updatedCategory: Category
}

export const editCategory = async (props: Props): Promise<Category> => {
  const { updatedCategory, id } = props
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
