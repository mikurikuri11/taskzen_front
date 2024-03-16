'use client'

import { Button } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { useRouter } from 'next/navigation'
import { deleteCategory } from '../../api/category/deleteCategory'
import { editCategory } from '../../api/category/editCategory'
import { CategoryItem } from './CategoryItem'
import { CategoryModal } from './CategoryModal'
import { Category, Id } from '@/types'

interface Props {
  categories: Category[]
}

export const CategoryTable = (props: Props) => {
  const { categories } = props
  const router = useRouter()

  const [opened, { open, close }] = useDisclosure(false)

  const handleDelete = async (id: Id) => {
    await deleteCategory({ id })
    router.refresh()
  }

  const handleUpdate = async (id: Id, name: string) => {
    await editCategory({ id, name })
    router.refresh()
  }

  return (
    <>
      <div className='mx-auto max-w-7xl text-white mt-10 min-h-screen'>
        <div className='px-4 sm:px-6 lg:px-8'>
          <div className='sm:flex sm:items-center'>
            <div className='sm:flex-auto'>
              <div className='flex'>
                <h1 className='text-2xl font-bold leading-6 mt-4'>カテゴリー</h1>
                <div className='mt-4 ml-auto sm:mt-0 sm:flex-none'>
                  <Button onClick={open} color='violet'>
                    追加する
                  </Button>
                </div>
              </div>
              <div className='mt-8 flow-root'>
                <div className='-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
                  <div className='inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8'>
                    <div className='min-w-full divide-y divide-gray-700'>
                      {categories.map((category) => (
                        <CategoryItem
                          key={category.id}
                          category={category}
                          onDelete={() => category.id && handleDelete(category.id)}
                          handleUpdate={handleUpdate}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <CategoryModal opened={opened} close={close} />
    </>
  )
}
