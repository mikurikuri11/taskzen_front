'use client'

import { Category } from '../types'
import { CategoryCard } from './CategoryCard'

interface CategoryListProps {
  categories: Category[]
}

export const CategoryList: React.FC<CategoryListProps> = ({ categories }) => {
  console.log('render CategoryList' + categories.length)
  return (
    <div className='space-y-5'>
      {categories.length === 0 && <div>カテゴリーがありません</div>}
      {categories.map((category) => (
        <CategoryCard key={category.id} category={category} />
      ))}
    </div>
  )
}
