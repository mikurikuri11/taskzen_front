import { useMemo } from 'react'
import { useAchievement } from '../hooks/useAchievement'

export const useFilteredAchievements = (userId: string | null) => {
  const { data } = useAchievement(userId)

  const sortedData = useMemo(() => {
    if (!data) return []

    // データを日付でソート
    const sortedData = [...data].sort((a, b) => {
      return (
        Number(new Date(a.achievements_start_date)) - Number(new Date(b.achievements_start_date))
      )
    })

    // 今日の日付を取得
    const today = new Date()

    // 過去4つのデータを取得
    const pastFourData = []
    for (let i = sortedData.length - 1; i >= 0; i--) {
      const itemDate = new Date(sortedData[i].achievements_start_date)
      // 今日から過去4つのデータを取得
      if (itemDate <= today && pastFourData.length < 4) {
        pastFourData.push(sortedData[i])
      }
    }

    // pastFourDataが4つ未満の場合は0で埋める
    while (pastFourData.length < 4) {
      pastFourData.push({ achievements_start_date: '', achievement_rate: 0 })
    }

    return pastFourData.reverse()
  }, [data])

  return { filteredData: sortedData }
}
