'use client'

import { PlusIcon } from '@heroicons/react/24/outline'
import { Popover } from '@mantine/core'

import { useSession } from 'next-auth/react'
import { useState, Dispatch, SetStateAction } from 'react'
import { useRecoilState } from 'recoil'
import { useCategory } from '../../hooks/useCategory'
import { CategoryList } from '@/features/category/components/category/CategoryList'
import { CategoryAtom } from '@/recoil/atoms/categoryAtom'
import { Category, Todo } from '@/types'

interface CategoryFlyoutMenuProps {
  todo?: Todo | null
  setSelectedCategories: Dispatch<SetStateAction<Category[] | null>>
}

export const CategoryFlyoutMenu = (props: CategoryFlyoutMenuProps) => {
  const { todo, setSelectedCategories } = props
  const { data: session, status } = useSession()
  const [categories, setCategories] = useRecoilState(CategoryAtom)
  const [isOpen, setIsOpen] = useState(false)

  const { data: categoryData } = useCategory(session ? session.user.id : null)

  setCategories(categoryData)

  return (
    <Popover
      width={200}
      position='bottom'
      withArrow
      shadow='md'
      opened={isOpen}
      onClose={() => setIsOpen(false)}
    >
      <Popover.Target>
        <PlusIcon
          className='ml-2 rounded-full bg-gray-600 p-1 text-white shadow-sm hover:bg-gray-500 h-5 w-5 mt-0.5'
          aria-hidden='true'
          onClick={() => setIsOpen(!isOpen)}
        />
      </Popover.Target>
      <Popover.Dropdown>
        <div
          className='
            whitespace-nowrap
            bg-slate-300
            '
        >
          <fieldset>
            <legend className='sr-only'>Category</legend>
            <CategoryList todo={todo} setSelectedCategories={setSelectedCategories} />
          </fieldset>
        </div>
      </Popover.Dropdown>
    </Popover>
  )
}
