'use client'

import { Button } from '@mantine/core'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { useFilteredAchievements } from '@/features/chart/hooks/useFilteredAchievement'

export const Report = () => {
  const { data: session, status } = useSession()
  const { filteredData } = useFilteredAchievements(session ? session.user.id : null)

  const achievementRates = filteredData.map((data) => data.achievement_rate)
  console.log(achievementRates)
  const weeklyAchievementRate =
  Math.floor(achievementRates.reduce((acc, curr) => acc + curr, 0) / achievementRates.length)

  return (
    <div className='h-screen flex flex-col justify-center items-center'>
      <div className='text-3xl font-semibold text-white mb-14'>週間レポート</div>
      <div>
        <div className='text-2xl font-semibold text-white mb-10'>
          今週の達成率 {weeklyAchievementRate} %
        </div>
      </div>
      <div>
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
      </div>

      <div className='flex gap-5'>
        <Button component={Link} href='/chart' color='violet'>
          グラフを見る
        </Button>
      </div>
    </div>
  )
}
