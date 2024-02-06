'use client'

import { useRecoilState } from 'recoil'
import { Category } from '../types'
import { CategoryCard } from './CategoryCard'
import { Todo } from '@/features/todo/types'
import { CategoryAtom } from '@/recoil/atoms/categoryAtom'

interface CategoryListProps {
  todo: Todo | null;
}

export const CategoryList = (props: CategoryListProps) => {
  const { todo } = props
  const [categories, setCategories] = useRecoilState(CategoryAtom)

  return (
    <div className='space-y-5'>
      {categories.length === 0 && <div>カテゴリーがありません</div>}
      {categories.map((category) => (
        <CategoryCard key={category.id} category={category} todo={todo} />
      ))}
    </div>
  )
}
