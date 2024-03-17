import { Flex, Text } from '@mantine/core'

interface Props {
  title: string
  achievementRate: number | null
}

export const AchievementBoard = (props: Props) => {
  const { title, achievementRate } = props

  const getMessage = (rate: number | null) => {
    if (rate === null) return ''
    if (rate <= 30) return 'もう少し頑張りましょう。'
    if (rate <= 55) return 'そこそこできています。もう一踏ん張りです。'
    if (rate <= 80) return 'とてもいい感じです。これからも頑張りましょう。'
    return '完璧です。新しいことに挑戦してみましょう。'
  }

  const isEmpty = !achievementRate

  return (
    <Flex
      className='overflow-hidden rounded-md border border-gray-200 bg-white p-6'
      mih={50}
      gap='md'
      justify='center'
      align='center'
      direction='column'
      wrap='wrap'
    >
      <Text size='lg' fw={700}>
        {title}
      </Text>
      <Text size='xl' fw={700}>
        {isEmpty ? 'データがありません' : `${achievementRate} %`}
      </Text>
      <Text size='sm' c='dimmed'>
        {isEmpty ? '' : getMessage(achievementRate)}
      </Text>
    </Flex>
  )
}
