'use client'

import { Popover, Transition } from '@headlessui/react'
import { PlusIcon } from '@heroicons/react/24/outline'
import { useSession } from 'next-auth/react'
import { Fragment, Dispatch, SetStateAction } from 'react'
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

  const { data: categoryData } = useCategory(session ? session.user.id : null)

  setCategories(categoryData)

  return (
    <Popover className='relative'>
      <Popover.Button className='inline-flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900'>
        <PlusIcon
          className='ml-2 rounded-full bg-gray-600 p-1 text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 h-5 w-5 mt-0.5'
          aria-hidden='true'
        />
      </Popover.Button>

      <Transition
        as={Fragment}
        enter='transition ease-out duration-200'
        enterFrom='opacity-0 translate-y-1'
        enterTo='opacity-100 translate-y-0'
        leave='transition ease-in duration-150'
        leaveFrom='opacity-100 translate-y-0'
        leaveTo='opacity-0 translate-y-1'
      >
        <Popover.Panel>
          <div className='whitespace-nowrap absolute left-1/2 transform -translate-x-1/2 z-10 flex overflow-y-auto px-4 w-auto max-h-64 shrink rounded-xl bg-slate-300 p-4 text-sm font-semibold leading-6 text-gray-900 shadow-lg ring-1 ring-gray-900/5'>
            <fieldset>
              <legend className='sr-only'>Category</legend>
              {/* TODO: CategoryListコンポーネントを表示する新規作成画面で表示されなくなる */}
              <CategoryList todo={todo} setSelectedCategories={setSelectedCategories} />
            </fieldset>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  )
}
