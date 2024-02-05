'use client'

import { Popover, Transition } from '@headlessui/react'
import { PlusIcon } from '@heroicons/react/24/outline'
import { useSession } from 'next-auth/react'
import { FC, Fragment, useState, ChangeEvent } from 'react'
import { useRecoilState } from 'recoil'
// import { addCategory } from '../api/category/addCategory'
import { useCategory } from '../hooks/useCategory'
import { CategoryList } from '@/features/category/components/CategoryList'
import { CategoryAtom } from '@/recoil/atoms/categoryAtom'

export const CategoryFlyoutMenu: FC = () => {
  const { data: session, status } = useSession()
  const [categories, setCategories] = useRecoilState(CategoryAtom)
  // const [inputCategory, setInputCategory] = useState<string>('')

  const { data, error, isLoading } = useCategory(session ? session.user.id : null);

  setCategories(data);

  // const onClickAdd = async () => {
  //   const category = {
  //     name: inputCategory,
  //   }
  //   const newCategory = await addCategory({ category: category, id: session?.user?.id ?? '' })
  //   setCategories((prevCategories) => [...prevCategories, newCategory])
  //   setInputCategory('')
  // }

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
        <Popover.Panel className='absolute left-1/2 transform -translate-x-1/2 z-10 flex max-h-screen overflow-y-auto px-4 w-auto'>
          <div className='w-32 h-auto shrink rounded-xl bg-slate-300 p-4 text-sm font-semibold leading-6 text-gray-900 shadow-lg ring-1 ring-gray-900/5'>
            <fieldset>
              <legend className='sr-only'>Category</legend>
              {/* TODO: CategoryListコンポーネントを表示する新規作成画面で表示されなくなる */}
              <CategoryList />
              {/* <div className='relative mt-2'>
                <input
                  value={inputCategory}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setInputCategory(e.target.value)}
                  type='text'
                  name='name'
                  id='name'
                  className='rounded px-1 peer block w-full border-0 bg-gray-50 py-1.5 text-gray-900 focus:ring-0 sm:text-sm sm:leading-6'
                  placeholder='Add category'
                />
                <div
                  className='absolute inset-x-0 bottom-0 border-t border-gray-300 peer-focus:border-t-2 peer-focus:border-indigo-600'
                  aria-hidden='true'
                />
                <button
                  onClick={onClickAdd}
                  type='button'
                  className='mt-1 w-full rounded bg-indigo-50 px-2 py-1 text-xs font-semibold text-indigo-600 shadow-sm hover:bg-indigo-100'
                >
                  追加
                </button>
              </div> */}
            </fieldset>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  )
}
