export type Id = string | number

export type Achievement = {
  id: Id
  user_id: Id
  achievement_rate: string
  zone: number | null
  achievements_start_date: Date
  achievements_end_date: Date
  created_at: string
  updated_at: string
}
