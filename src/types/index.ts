export type Id = string | number

export interface Category {
  id?: Id
  name: string
}

export interface Todo {
  id: Id
  user_id: Id
  title: string
  description: string
  due_date: string
  completed: boolean
  zone: number
  categories: Category[]
  created_at: string
  updated_at: string
}

export interface User {
  id: Id
  provider: string
  uid: string
  name: string
  email: string
  role: number
  twitter_username: string
  avatar: string
  created_at: string
  updated_at: string
  active: boolean
}

export interface Achievement {
  id: Id
  user_id: Id
  achievement_rate: number
  zone: number | null
  achievements_start_date: Date
  achievements_end_date: Date
  created_at: string
  updated_at: string
}

export interface Notification {
  notification_time: number
  active: boolean
}
