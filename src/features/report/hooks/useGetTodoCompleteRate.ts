import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { getTodoCompleteRate } from '@/features/report/api/getTodoCompleteRate'

// 今週のTodoの完了率を取得するカスタムフック
export const useGetTodoCompleteRate = () => {
  const { data: session, status } = useSession()
  const [todoCompleteRate, setTodoCompleteRate] = useState<number | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (status === 'authenticated' && session) {
          const result = await getTodoCompleteRate({ id: session.user.id })
          console.log('RESULT' + result)
          setTodoCompleteRate(Math.floor(result))
        }
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }
    fetchData()
  }, [status, session])

  return todoCompleteRate
}
