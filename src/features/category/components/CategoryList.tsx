import { useState } from 'react'
import { useRecoilState } from 'recoil'
import { Category } from '../types'
import { CategoryCard } from './CategoryCard'
import { Id, Todo } from '@/features/todo/types'
import { CategoryAtom } from '@/recoil/atoms/categoryAtom'

interface CategoryListProps {
  todo: Todo | null | undefined;
}

export const CategoryList = (props: CategoryListProps) => {
  const { todo } = props;
  const [categories, setCategories] = useRecoilState(CategoryAtom)

  return (
    <div className='space-y-5'>
      {categories.length === 0 && <div>カテゴリーがありません</div>}
      {categories.map((category) => (
        <CategoryCard
          key={category.id}
          category={category}
          todo={todo}
        />
      ))}
    </div>
  )
}
