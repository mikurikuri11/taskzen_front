import { Dispatch, SetStateAction } from 'react'
import { useRecoilState } from 'recoil'
import { CategoryCard } from './CategoryCard'
import { CategoryAtom } from '@/recoil/atoms/categoryAtom'
import { Category, Todo } from '@/types'

interface CategoryListProps {
  todo: Todo | null | undefined
  setSelectedCategories: Dispatch<SetStateAction<Category[] | null>>
}

export const CategoryList = (props: CategoryListProps) => {
  const { todo, setSelectedCategories } = props
  const [categories, setCategories] = useRecoilState(CategoryAtom)

  return (
    <div className='space-y-5'>
      {categories.length === 0 && (
        <div className='relative flex items-start gap-2 w-48'>カテゴリーはありません</div>
      )}
      {categories.map((category) => (
        <CategoryCard
          key={category.id}
          category={category}
          todo={todo}
          setSelectedCategories={setSelectedCategories}
        />
      ))}
    </div>
  )
}
