'use client'

import { Category } from '../../types'

interface Props {
  categories: Category[]
}

export const CategoryTable = (props: Props) => {
  const { categories } = props

  return (
    <div className='mx-auto max-w-7xl text-white py-10'>
      <div className='px-4 sm:px-6 lg:px-8'>
        <div className='sm:flex sm:items-center'>
          <div className='sm:flex-auto'>
            <h1 className='text-base font-bold leading-6'>カテゴリー</h1>
            <div className='mt-8 flow-root'>
              <div className='-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
                <div className='inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8'>
                  <div className='min-w-full divide-y divide-gray-700'>
                    {categories.map((category) => (
                      <div key={category.id} className='flex'>
                        <h2 className='py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-0'>
                          {category.name}
                        </h2>
                        <div className='mt-3 ml-auto'>
                          <button className='text-indigo-400 hover:text-indigo-300'>
                            Edit
                          </button>
                          <button className='text-red-400 hover:text-red-300 ml-4'>
                            Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
