import { useMemo } from 'react'
import { useAchievement } from '../hooks/useAchievement'

export const useFilteredAchievements = (userId: string | null) => {
  const { data } = useAchievement(userId)

  const filteredData = useMemo(() => {
    const oneMonthAgo = new Date()
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1)

    return data
      ? data.filter(
          (item: any) =>
            new Date(item.achievements_start_date) >= oneMonthAgo &&
            new Date(item.achievements_end_date) <= new Date(),
        )
      : []
  }, [data])

  return { filteredData }
}
