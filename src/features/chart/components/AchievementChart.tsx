'use client'

import { AreaChart } from '@mantine/charts'
import { Box } from '@mantine/core'

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
  const modifiedData = dailyAchievements.map((item) => {
    return {
      date: item.date,
      達成率: item.achievementRate,
    }
  })
  const isEmpty = modifiedData && modifiedData.length === 0

  if (isEmpty) {
    return (
      <Box
        bg='rgba(255, 255, 255)'
        c='black'
        opacity='0.8'
        my='xl'
        w={{ base: 200, sm: 400, lg: 500 }}
        h={{ base: 100, sm: 200, lg: 300 }}
        p='lg'
        fz='xl'
        fw={700}
        className='rounded-xl flex items-center justify-center'
      >
        データがありません
      </Box>
    )
  }

  return (
    <AreaChart
      h={300}
      data={modifiedData}
      dataKey='date'
      tooltipAnimationDuration={200}
      unit='%'
      series={[
        { name: '達成率', color: 'indigo.6' },
        // { name: 'Oranges', color: 'blue.6' },
        // { name: 'Tomatoes', color: 'teal.6' },
      ]}
      curveType='bump'
      tickLine='xy'
      gridAxis='xy'
      className='mt-20 mb-24'
    />
  )
}
