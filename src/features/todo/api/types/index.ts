export type Todo = {
  id: number
  user_id: number
  title: string
  description: string
  due_date: string
  completed: boolean
  zone: number
  created_at: string
  updated_at: string
}

export type User = {
  id: number
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
