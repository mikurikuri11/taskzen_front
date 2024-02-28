import { useRecoilState } from 'recoil'
import { CategoryCard } from './CategoryCard'
import { CategoryAtom } from '@/recoil/atoms/categoryAtom'
import { Todo } from '@/types'

interface CategoryListProps {
  todo: Todo | null | undefined
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
