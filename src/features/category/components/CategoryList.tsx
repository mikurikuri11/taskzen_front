'use client'

import { useRecoilState } from 'recoil'
import { Category } from '../types'
import { CategoryCard } from './CategoryCard'
import { CategoryAtom } from '@/recoil/atoms/categoryAtom'

// interface CategoryListProps {
//   categories: Category[]
// }

// const categories: Category[] = [
//   { id: '1', name: 'カテゴリー1' },
//   { id: '2', name: 'カテゴリー2' },
//   { id: '3', name: 'カテゴリー3' },
// ]


export const CategoryList: React.FC = () => {
  const [categories, setCategories] = useRecoilState(CategoryAtom)

  return (
    <div className='space-y-5'>
      {categories.length === 0 && <div>カテゴリーがありません</div>}
      {categories.map((category) => (
        <CategoryCard key={category.id} category={category} />
        // <p key={category.id}>{category.name}</p>
      ))}
    </div>
  )
}
