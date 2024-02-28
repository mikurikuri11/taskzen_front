import useSWR from 'swr'
import { Id } from '@/types'

async function fetchTodoCategories(url: string) {
  const res = await fetch(url)
  return res.json()
}

export function useTodoCategories(id: Id) {
  const { data, error, isLoading } = useSWR(
    id ? `${process.env.NEXT_PUBLIC_API_URL}/api/v1/categories/categories_by_todo/${id}` : null,
    fetchTodoCategories,
  )

  return { data, error, isLoading }
}
