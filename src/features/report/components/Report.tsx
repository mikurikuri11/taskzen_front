import { Button } from '@mantine/core'
import Link from 'next/link'
import { Achievement } from '@/types'

interface Props {
  achievement: Achievement[]
}

export const Report = (props: Props) => {
  const { achievement } = props
  const achievementRate = achievement.length > 0 ? achievement[0].achievement_rate : 0

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
        <Button component={Link} href='/chart' color='violet'>
          グラフを見る
        </Button>
      </div>
    </div>
  )
}
