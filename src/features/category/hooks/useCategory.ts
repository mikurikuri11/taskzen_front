import useSWR from 'swr'

async function fetchCategory(url: string) {
  const res = await fetch(url)
  return res.json()
}

export function useCategory(id: string | null) {
  const { data, error, isLoading } = useSWR(
    id ? `${process.env.NEXT_PUBLIC_API_URL}/api/v1/categories/categories_by_uid/${id}` : null,
    fetchCategory,
  )

  return { data, error, isLoading }
}
