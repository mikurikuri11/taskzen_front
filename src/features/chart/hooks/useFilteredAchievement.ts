import { useMemo } from 'react'
import { useAchievement } from '../hooks/useAchievement'

export const useFilteredAchievements = (userId: string | null) => {
  const { data } = useAchievement(userId)

  console.log(data)

  const sortedData = useMemo(() => {
    if (!data) return []

    // データを日付でソート
    const sortedData = [...data].sort((a, b) => {
      return Number(new Date(b.achievement_date)) - Number(new Date(a.achievement_date))
    })

    // 今日の日付を取得
    const today = new Date()

    // 今日から過去一週間のデータを取得
    const pastWeekData = sortedData.filter((item) => {
      const itemDate = new Date(item.achievement_date)
      return itemDate >= new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7)
    })

    pastWeekData.sort((a, b) => {
      const dateA = new Date(a.achievement_date)
      const dateB = new Date(b.achievement_date)
      if (dateA < dateB) return -1
      if (dateA > dateB) return 1
      return 0
    })

    return pastWeekData
  }, [data])

  return { filteredData: sortedData }
}
