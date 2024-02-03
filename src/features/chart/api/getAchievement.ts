import { Achievement, Id } from '../types/index'

interface Props {
  id: Id
}

export const getAchievement = async (props: Props): Promise<Achievement[]> => {
  const { id } = props
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/achievements/achievements_by_uid/${id}`, {
    cache: 'no-store',
  })
  const data = await response.json()
  return data
}
