/* eslint-disable */
import { atom, RecoilState } from 'recoil'
import { Category } from '@/features/category/types'

export const TodoCategoryAtom: RecoilState<Category[]> = atom<Category[]>({
  key: 'TodoCategory',
  default: [],
})
