'use client'

import { Grid, rem, Flex } from '@mantine/core'
import { useSession } from 'next-auth/react'
import { useEffect } from 'react'
import { useRecoilState } from 'recoil'

import { AchievementChart } from '@/features/chart/components/AchievementManagement'
import { useCalculateDailyAchievementRate } from '@/features/chart/hooks/useCalculateDailyAchievementRate'
import { getTodos } from '@/features/todo/api/getTodo'
import { TodoAtom } from '@/recoil/atoms/todoAtom'

export const Report = () => {
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
        <Flex
          className='w-full h-full p-10 bg-gray-00'
          mih={50}
          gap='md'
          justify='center'
          align='center'
          direction='column'
          wrap='wrap'
        >
          <div className='text-2xl font-semibold text-white mb-10'>
            今週の達成率 {weeklyAchievementRate} %
          </div>
          <p className='text-1xl font-semibold text-white mb-10'>
            {weeklyAchievementRate !== null && (
              <>
                {weeklyAchievementRate <= 30 && 'もう少し頑張りましょう。'}
                {weeklyAchievementRate > 30 &&
                  weeklyAchievementRate <= 55 &&
                  'そこそこできています。もう一踏ん張りです。'}
                {weeklyAchievementRate > 55 &&
                  weeklyAchievementRate <= 80 &&
                  'とてもいい感じです。これからも頑張りましょう。'}
                {weeklyAchievementRate > 80 && '完璧です。新しいことに挑戦してみましょう。'}
              </>
            )}
          </p>
        </Flex>
      </Grid.Col>
    </Grid>
  )
}
