/* eslint-disable */
import { atom, RecoilState } from 'recoil'
import { Todo } from '@/features/todo/types'

export const SelectedTodoAtom: RecoilState<Todo | null> = atom({
  key: 'SelectedTodo',
})
