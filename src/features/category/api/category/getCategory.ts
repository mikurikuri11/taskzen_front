import { Category } from '@/types'

export const getCategory = async (props: any): Promise<Category[]> => {
  const { id } = props
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/categories/categories_by_uid/${id}`,
    {
      cache: 'no-store',
    },
  )
  const categories = await res.json()
  return categories
}
