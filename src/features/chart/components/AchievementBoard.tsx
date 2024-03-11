import { Flex } from '@mantine/core'

interface Props {
  weeklyAchievementRate: number | null
}

export const AchievementBoard = (props: Props) => {
  const { weeklyAchievementRate } = props

  return (
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
  )
}
