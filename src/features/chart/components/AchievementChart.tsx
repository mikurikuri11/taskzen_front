'use client'

import { AreaChart } from '@mantine/charts'
import { BarChart } from '@mantine/charts'
import { Box, SimpleGrid } from '@mantine/core'

import { useRecoilValue } from 'recoil'
import { useCalculateDailyAchievementRate } from '../hooks/useCalculateDailyAchievementRate'
import { useCalculateDailyTodoCount } from '../hooks/useCalculateDailyTodoCount'
import { TodoAtom } from '@/recoil/atoms/todoAtom'
import { todoCount } from '@/types'

export const AchievementChart = () => {
  const todos = useRecoilValue(TodoAtom)

  const today = new Date()
  const sevenDaysAgo = new Date(today)
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6) // 今日を含めた過去7日間

  const dailyTodos = todos.filter((todo) => {
    const date = new Date(todo.due_date)
    return date >= sevenDaysAgo && date <= today
  })

  const todosByOne = dailyTodos ? dailyTodos.filter((todo) => todo.zone === 1) : []
  const todosByTwo = dailyTodos ? dailyTodos.filter((todo) => todo.zone === 2) : []
  const todosByThree = dailyTodos ? dailyTodos.filter((todo) => todo.zone === 3) : []
  const todosByFour = dailyTodos ? dailyTodos.filter((todo) => todo.zone === 4) : []

  const todoCountByOne = useCalculateDailyTodoCount({ dailyTodos: todosByOne, zone: 1 })
  const todoCountByTwo = useCalculateDailyTodoCount({ dailyTodos: todosByTwo, zone: 2 })
  const todoCountByThree = useCalculateDailyTodoCount({ dailyTodos: todosByThree, zone: 3 })
  const todoCountByFour = useCalculateDailyTodoCount({ dailyTodos: todosByFour, zone: 4 })

  const allTodoCount = todoCountByOne.concat(todoCountByTwo, todoCountByThree, todoCountByFour)

  const transformedData = allTodoCount.map((item) => {
    let habitNumber
    switch (item.zone) {
      case 1:
        habitNumber = '第1の習慣'
        break
      case 2:
        habitNumber = '第2の習慣'
        break
      case 3:
        habitNumber = '第3の習慣'
        break
      case 4:
        habitNumber = '第4の習慣'
        break
      // 必要に応じて他のケースを追加することができます
      default:
        habitNumber = '第' + item.zone + 'の習慣'
    }
    return {
      date: item.date,
      [habitNumber]: item.completedTodoCount,
    }
  })

  const barChartData = transformedData.reduce((acc: todoCount[], curr) => {
    const existingDate = acc.find((item: todoCount) => item.date === curr.date)
    if (existingDate) {
      Object.assign(existingDate, curr)
    } else {
      acc.push(curr)
    }
    return acc
  }, [] as todoCount[])

  barChartData.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

  const dailyAchievements = useCalculateDailyAchievementRate({ dailyTodos })
  const areaChartData = dailyAchievements.map((item) => {
    return {
      date: item.date,
      達成率: item.achievementRate,
    }
  })

  const isEmpty = areaChartData && areaChartData.length === 0

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
    <SimpleGrid cols={2} className='w-full'>
      <AreaChart
        h={300}
        data={areaChartData}
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
        className='bg-white p-6 rounded-md shadow-md'
      />
      <BarChart
        h={300}
        data={barChartData}
        dataKey='date'
        tooltipAnimationDuration={200}
        type='stacked'
        withLegend
        legendProps={{ verticalAlign: 'bottom', height: 50 }}
        series={[
          { name: '第1の習慣', color: 'red.6' },
          { name: '第2の習慣', color: 'yellow.6' },
          { name: '第3の習慣', color: 'teal.6' },
          { name: '第4の習慣', color: 'blue.6' },
        ]}
        tickLine='y'
        className='bg-white p-6 rounded-md shadow-md'
      />
    </SimpleGrid>
  )
}
