import { useState } from 'react'
import { useRecoilState } from 'recoil'
import { Category } from '../types'
import { CategoryCard } from './CategoryCard'
import { Id, Todo } from '@/features/todo/types'
import { CategoryAtom } from '@/recoil/atoms/categoryAtom'

interface CategoryListProps {
  todo: Todo | null;
}

export const CategoryList = (props: CategoryListProps) => {
  const { todo } = props;
  const [categories, setCategories] = useRecoilState(CategoryAtom)

  const handleCategoryCheckChange = (categoryId: Id, checked: boolean) => {
    setCategories(prevCategories =>
      prevCategories.map(category =>
        category.id === categoryId ? { ...category, checked } : category
      )
    );
  };

  return (
    <div className='space-y-5'>
      {categories.length === 0 && <div>カテゴリーがありません</div>}
      {categories.map((category) => (
        <CategoryCard
          key={category.id}
          category={category}
          todo={todo}
          onCategoryCheckChange={handleCategoryCheckChange}
        />
      ))}
    </div>
  )
}
