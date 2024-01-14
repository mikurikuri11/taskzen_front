/* eslint-disable */
import { atom, RecoilState } from 'recoil'
import { Todo } from '@/features/todo/types'

export const completedTodoAtom: RecoilState<Todo[]> = atom<Todo[]>({
  key: 'completedTodo',
  default: [],
})
