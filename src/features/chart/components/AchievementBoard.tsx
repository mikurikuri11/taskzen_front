import { Flex, Text } from '@mantine/core'

interface Props {
  weeklyAchievementRate: number | null
}

export const AchievementBoard = (props: Props) => {
  const { weeklyAchievementRate } = props

  return (
    <>
      <Flex
        className='overflow-hidden rounded-xl border border-gray-200 bg-gray-50 p-6'
        mih={50}
        gap='md'
        justify='center'
        align='center'
        direction='column'
        wrap='wrap'
      >
        <Text size='lg' fw={700}>
          今週の達成率
        </Text>
        <Text size='xl' fw={700}>
          {weeklyAchievementRate} %
        </Text>
        <Text size='sm' c='dimmed'>
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
        </Text>
      </Flex>
    </>
  )
}
