/* eslint-disable */
import { atom, RecoilState } from 'recoil'
import { Todo } from '@/features/todo/types'
import { recoilPersist } from 'recoil-persist'

const { persistAtom } = recoilPersist({
  key: 'some-persist-state',
  storage: typeof window === 'undefined' ? undefined : window.sessionStorage,
})

export const IncompletedTodoAtom: RecoilState<Todo[]> = atom<Todo[]>({
  key: 'IncompletedTodo',
  default: [],
  effects_UNSTABLE: [persistAtom],
})
