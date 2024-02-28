/* eslint-disable */
import { atom, RecoilState } from 'recoil'
import { Todo } from '@/types'

export const ModalTodoAtom: RecoilState<Todo> = atom<Todo>({
  key: 'ModalTodo',
})
