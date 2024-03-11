'use client'

import { AreaChart } from '@mantine/charts'

import { useRecoilValue } from 'recoil'
import { useCalculateDailyAchievementRate } from '../hooks/useCalculateDailyAchievementRate'
import { TodoAtom } from '@/recoil/atoms/todoAtom'

export const AchievementChart = () => {
  const todos = useRecoilValue(TodoAtom)

  const today = new Date()
  const sevenDaysAgo = new Date(today)
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6) // 今日を含めた過去7日間

  const dailyTodos = todos.filter((todo) => {
    const date = new Date(todo.due_date)
    return date >= sevenDaysAgo && date <= today
  })

  const dailyAchievements = useCalculateDailyAchievementRate({ dailyTodos })

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
