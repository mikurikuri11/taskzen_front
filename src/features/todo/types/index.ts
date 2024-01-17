export type Id = string | number

export type Todo = {
  id: Id
  user_id: Id
  title: string
  description: string
  due_date: string
  completed: boolean
  zone: number
  category_ids: Id[]
  created_at: string
  updated_at: string
}

export type User = {
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

export interface TodoCardProps {
  id: Id
  todo: Todo
  openModal: (id: Id) => void
}
