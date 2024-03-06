'use client'

import { AreaChart } from '@mantine/charts'
import { useSession } from 'next-auth/react'
import { useEffect } from 'react'

import { useRecoilState } from 'recoil'
import { useCalculateDailyAchievementRate } from '../hooks/useCalculateDailyAchievementRate'
import { getTodos } from '@/features/todo/api/getTodo'
import { TodoAtom } from '@/recoil/atoms/todoAtom'

export const AchievementChart = () => {
  const { data: session, status } = useSession()
  const [todos, setTodos] = useRecoilState(TodoAtom)

  useEffect(() => {
    const getTodosAsync = async () => {
      if (status === 'authenticated' && session) {
        const data = await getTodos({ id: session.user.id })
        setTodos(data)
      }
    }

    getTodosAsync()
  }, [])

  const today = new Date()
  const sevenDaysAgo = new Date(today)
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6) // 今日を含めた過去7日間

  const dailyTodos = todos.filter((todo) => {
    const date = new Date(todo.due_date)
    return date >= sevenDaysAgo && date <= today
  })

  const dailyAchievements = useCalculateDailyAchievementRate({ dailyTodos })
  const weeklyAchievementRate = Math.floor(dailyAchievements.reduce((acc, cur) => acc + cur.achievementRate, 0) / dailyAchievements.length)

  return (
    <div className='mx-auto max-w-screen-md flex justify-between mt-10 flex-col items-center'>
      <h1 className='text-3xl font-semibold text-white mb-14'>週間レポート</h1>
      <AreaChart
        h={300}
        data={dailyAchievements}
        dataKey='date'
        series={[
          { name: 'achievementRate', color: 'indigo.6' },
          // { name: 'Oranges', color: 'blue.6' },
          // { name: 'Tomatoes', color: 'teal.6' },
        ]}
        curveType='bump'
        tickLine='xy'
        gridAxis='xy'
        className='mt-20 mb-24'
      />
    </div>
  )
}
