/* eslint-disable */
import { atom, RecoilState } from 'recoil'
import { Category } from '@/features/category/types'

export const CategoryAtom: RecoilState<Category[]> = atom<Category[]>({
  key: 'Category',
  default: [],
})
