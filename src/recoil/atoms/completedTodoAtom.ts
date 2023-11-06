/* eslint-disable */
import { atom, RecoilState } from 'recoil'
import { Todo } from '@/features/todo/api/types'

export const completedTodoAtom: RecoilState<Todo[]> = atom<Todo[]>({
  key: 'completedTodo',
  default: [],
})
