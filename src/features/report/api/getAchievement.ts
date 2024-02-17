import { Achievement } from '@/features/chart/types'

export const getAchievement = async (props: any): Promise<Achievement[]> => {
  const { id } = props
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/achievements/this_week_achievement_rate/${id}`,
    {
      cache: 'no-store',
    },
  )
  const achievement = await res.json()
  return achievement
}
