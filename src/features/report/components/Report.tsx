'use client'

import { Grid, rem } from '@mantine/core'
import { useEffect } from 'react'
import { useRecoilState } from 'recoil'

import { AchievementBoard } from '@/features/chart/components/AchievementBoard'
import { AchievementChart } from '@/features/chart/components/AchievementChart'
import { useCalculateDailyAchievementRate } from '@/features/chart/hooks/useCalculateDailyAchievementRate'
import { TodoAtom } from '@/recoil/atoms/todoAtom'
import { Todo } from '@/types'

interface Props {
  allTodos: Todo[]
}

export const Report = (props: Props) => {
  const { allTodos } = props
  const [todos, setTodos] = useRecoilState(TodoAtom)

  useEffect(() => {
    setTodos(allTodos)
  }, [allTodos])

  const today = new Date()
  const sevenDaysAgo = new Date(today)
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6) // 今日を含めた過去7日間

  const dailyTodos = todos.filter((todo) => {
    const date = new Date(todo.due_date)
    return date >= sevenDaysAgo && date <= today
  })

  const dailyAchievements = useCalculateDailyAchievementRate({ dailyTodos })
  const weeklyAchievementRate = Math.floor(
    dailyAchievements.reduce((acc, cur) => acc + cur.achievementRate, 0) / dailyAchievements.length,
  )

  return (
    <Grid
      className='text-white rounded-md flex flex-col justify-center items-center min-h-screen'
      justify='center'
      align='stretch'
    >
      <Grid.Col span={6} style={{ minHeight: rem(80) }}>
        <AchievementChart />
      </Grid.Col>
      <Grid.Col span='content' style={{ minHeight: rem(120) }}>
        <AchievementBoard weeklyAchievementRate={weeklyAchievementRate} />
      </Grid.Col>
    </Grid>
  )
}
