/* eslint-disable */
import { atom, RecoilState } from 'recoil'
import { Todo } from '@/features/todo/api/types'

export const incompletedTodoAtom: RecoilState<Todo[]> = atom<Todo[]>({
  key: 'incompletedTodo',
  default: [],
})
