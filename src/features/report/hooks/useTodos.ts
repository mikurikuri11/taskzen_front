import useSWR from 'swr'
import { Id } from '@/types'

interface Props {
  id: Id
}

const fetcher = async (url: string) => {
  const response = await fetch(url)

  if (!response.ok) {
    throw new Error('エラーが発生したため、データの取得に失敗しました')
  }

  const json = await response.json()
  return json
}

export const useTodos = (props: Props) => {
  const { id } = props

  const { data, error } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/todos/todos_by_uid/${id}`,
    fetcher,
  )
  return {
    data,
    error,
    isLoading: !data && !error,
    isEmpty: data && data.length === 0,
  }
}
