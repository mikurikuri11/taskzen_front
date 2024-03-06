import { Todo } from '@/types'

interface Props {
  dailyTodos: Todo[]
}

export const useCalculateDailyAchievementRate = (props: Props) => {
  const { dailyTodos } = props

  // 日付をキーとして、その日のタスクの数と完了したタスクの数を保持するオブジェクトを作成
  const dailyDataMap = new Map<string, { totalTodos: number; completedTodos: number }>()

  // タスクのデータから日付ごとに集計
  dailyTodos.forEach((todo) => {
    const todoDate = todo.due_date
    if (!dailyDataMap.has(todoDate)) {
      dailyDataMap.set(todoDate, { totalTodos: 0, completedTodos: 0 })
    }
    const dailyData = dailyDataMap.get(todoDate)!
    dailyData.totalTodos++
    if (todo.completed) {
      dailyData.completedTodos++
    }
  })

  // 日付ごとの達成率を計算
  const dailyAchievementRates = Array.from(dailyDataMap.entries()).map(([date, data]) => {
    const achievementRate = Math.floor(((data.completedTodos / data.totalTodos) * 100) || 0)
    return {
      date,
      achievementRate,
    }
  })

  // 日付の昇順でソート
  dailyAchievementRates.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

  return dailyAchievementRates
}
