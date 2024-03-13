'use client'

import { Flex, Loader, Text } from '@mantine/core'
import { useSession } from 'next-auth/react'
import { useEffect } from 'react'
import { useRecoilState } from 'recoil'

import { useTodos } from '../hooks/useTodos'
import { AchievementBoard } from '@/features/chart/components/AchievementBoard'
import { AchievementChart } from '@/features/chart/components/AchievementChart'
import { useCalculateDailyAchievementRate } from '@/features/chart/hooks/useCalculateDailyAchievementRate'
import { TodoAtom } from '@/recoil/atoms/todoAtom'
import { Id } from '@/types'

export const Report = () => {
  const [todos, setTodos] = useRecoilState(TodoAtom)

  const { data: session, status } = useSession()
  const id = session?.user?.id

  const { data, error, isLoading, isEmpty } = useTodos({ id: id as Id })

  useEffect(() => {
    if (data) {
      setTodos(data)
    }
  }, [data])

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

  const dailyTodosByTwo = dailyTodos.filter((todo) => {
    return todo.zone === 2
  })

  const dailyAchievementsByTwo = useCalculateDailyAchievementRate({ dailyTodos: dailyTodosByTwo })

  const weeklyAchievementRateByTwo = Math.floor(
    dailyAchievementsByTwo.reduce((acc, cur) => acc + cur.achievementRate, 0) /
      dailyAchievementsByTwo.length,
  )

  if (error) {
    return <div>エラーが発生しました</div>
  }

  if (isLoading) {
    return <Loader color='violet' />
  }

  if (isEmpty) {
    return <div>データがありません</div>
  }

  return (
    <Flex w={1000} mih={50} gap='md' justify='center' align='center' direction='column' wrap='wrap'>
      <Text c='white' size='xl' fw={700}>
        週間レポート
      </Text>
      <AchievementChart />
      <Flex mih={50} gap='xl' justify='center' align='center' direction='row' wrap='wrap'>
        <AchievementBoard
          weeklyAchievementRate={weeklyAchievementRate}
        />
      </Flex>
    </Flex>
  )
}
