'use client'

import Link from 'next/link'
import { StyledButton } from '@/components/ui-elements/Button/StyledButton'
import { useGetTodoCompleteRate } from '@/features/report/hooks/useAhievementToday'

export const Report = () => {
  const todoCompleteRate = useGetTodoCompleteRate()

  return (
    <div className='h-screen flex flex-col justify-center items-center'>
      <div className='text-3xl font-semibold text-white mb-14'>週間レポート</div>
      <div>
        <div className='text-2xl font-semibold text-white mb-10'>
          今週の達成率 {todoCompleteRate} %
        </div>
      </div>
      <div>
        <p className='text-1xl font-semibold text-white mb-10'>
          {todoCompleteRate !== null && (
            <>
              {todoCompleteRate <= 30 && 'もう少し頑張りましょう。'}
              {todoCompleteRate > 30 &&
                todoCompleteRate <= 55 &&
                'そこそこできています。もう一踏ん張りです。'}
              {todoCompleteRate > 55 &&
                todoCompleteRate <= 80 &&
                'とてもいい感じです。これからも頑張りましょう。'}
              {todoCompleteRate > 80 && '完璧です。新しいことに挑戦してみましょう。'}
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
