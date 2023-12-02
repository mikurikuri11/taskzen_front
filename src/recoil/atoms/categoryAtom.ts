/* eslint-disable */
import { atom, RecoilState } from 'recoil'
import { Category } from '@/features/category/api/types'

export const CategoryAtom: RecoilState<Category[]> = atom<Category[]>({
  key: 'Category',
  default: [],
})
