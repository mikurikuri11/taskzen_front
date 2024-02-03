'use client'

import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { useAchievementWeek } from '../hooks/useAchievementWeek'
import { StyledButton } from '@/components/ui-elements/Button/StyledButton'

export const Report = () => {
  const { data: session, status } = useSession()
  const { data, error, isLoading } = useAchievementWeek(session ? session.user.id : null);

  const achievementRate = data && data.length > 0 ? data[0].achievement_rate : null;

  if (session === null) return <div>loading...</div>
  console.log(data);
  console.log(achievementRate);

  return (
    <div className='h-screen flex flex-col justify-center items-center'>
      <div className='text-3xl font-semibold text-white mb-14'>週間レポート</div>
      <div>
        <div className='text-2xl font-semibold text-white mb-10'>
          今週の達成率 {achievementRate} %
        </div>
      </div>
      <div>
        <p className='text-1xl font-semibold text-white mb-10'>
          {achievementRate !== null && (
            <>
              {achievementRate <= 30 && 'もう少し頑張りましょう。'}
              {achievementRate > 30 &&
                achievementRate <= 55 &&
                'そこそこできています。もう一踏ん張りです。'}
              {achievementRate > 55 &&
                achievementRate <= 80 &&
                'とてもいい感じです。これからも頑張りましょう。'}
              {achievementRate > 80 && '完璧です。新しいことに挑戦してみましょう。'}
            </>
          )}
        </p>
      </div>

      <div className='flex gap-5'>
        <StyledButton buttonStyle='bg-indigo-500'>
          <Link href='/chart'>もっと見る</Link>
        </StyledButton>
        <StyledButton buttonStyle='bg-cyan-500 hover:bg-cyan-300'>
          <Link href='/chart'>共有する</Link>
        </StyledButton>
      </div>
    </div>
  )
}
