'use client'

import { BlueButton } from '@/components/ui/Button/BlueButton'
import { PurpleButton } from '@/components/ui/Button/PurpleButton'
import { useGetTodoCompleteRate } from '@/features/report/hooks/useGetTodoCompleteRate'

export const Report = () => {
  const hello = () => {
    console.log('hello')
  }

  const todoCompleteRate = useGetTodoCompleteRate()

  return (
    <div className='h-full flex flex-col items-center justify-center mt-24 gap-4'>
      <div className='text-3xl font-semibold text-white mb-14'>週間レポート</div>
      <div>
        {todoCompleteRate && (
          <div className='text-2xl font-semibold text-white mb-10'>
            今週の達成率 {todoCompleteRate} %
          </div>
        )}
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
              <br />
              この調子で頑張りましょう！
            </>
          )}
        </p>
      </div>

      <div className='flex gap-5'>
        <PurpleButton onClick={() => hello()}>もっと見る</PurpleButton>
        <BlueButton onClick={() => hello()}>共有する</BlueButton>
      </div>
    </div>
  )
}
