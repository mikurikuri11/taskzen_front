import { Flex, Text } from '@mantine/core'

interface Props {
  weeklyAchievementRate: number | null
}

export const AchievementCard = (props: Props) => {
  const { weeklyAchievementRate } = props

  return (
    <ul role='list' className='grid grid-cols-1 gap-x-6 gap-y-8 lg:grid-cols-3 xl:gap-x-8'>
      <li className='overflow-hidden rounded-xl border border-gray-200 bg-gray-50'>
        <Flex
          className='p-6'
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
        </Flex>

        <dl className='-my-3 divide-y divide-gray-100 px-6 py-4 text-sm leading-6'>
          <div className='flex justify-between gap-x-4 py-3'>
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
          </div>
        </dl>
      </li>
    </ul>
  )
}
