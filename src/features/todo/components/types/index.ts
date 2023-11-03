import { Todo } from "@/features/todo/api/types/index";

export interface TodoCardProps {
  id: number
  todo: Todo
  openModal: (id: number) => void
}
