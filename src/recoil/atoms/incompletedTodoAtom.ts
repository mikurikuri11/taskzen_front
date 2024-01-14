/* eslint-disable */
import { atom, RecoilState } from 'recoil'
import { Todo } from '@/features/todo/types'
import { recoilPersist } from 'recoil-persist'

const { persistAtom } = recoilPersist({
  key: 'some-persist-state',
  storage: typeof window === 'undefined' ? undefined : window.sessionStorage,
})

export const incompletedTodoAtom: RecoilState<Todo[]> = atom<Todo[]>({
  key: 'incompletedTodo',
  default: [],
  effects_UNSTABLE: [persistAtom],
})
