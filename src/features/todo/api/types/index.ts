export type Todo = {
  id: number;
  userId: number;
  title: string;
  description: string;
  dueDate: string;
  completed: boolean;
  zone: number;
  createdAt: string;
  updatedAt: string;
};

export type User = {
  id: number;
  provider: string;
  uid: string;
  name: string;
  email: string;
  role: number;
  twitter_username: string;
  avatar: string;
  created_at: string;
  updated_at: string;
  active: boolean;
}