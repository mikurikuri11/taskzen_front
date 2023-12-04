'use client'

import { useSession } from 'next-auth/react'
import { useState } from 'react'
import { CiEdit } from 'react-icons/ci'
import { MdSaveAlt, MdDeleteOutline } from 'react-icons/md'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { deleteCategory } from '../api/category/deleteCategory'
import { editCategory } from '../api/category/editCategory'
import { getCategories } from '../api/category/getCategories'
import { Category } from '../api/types'
import { editTodo } from '@/features/todo/api/editTodo'
import { CategoryAtom } from '@/recoil/atoms/categoryAtom'
import { ModalTodoAtom } from '@/recoil/atoms/modalTodoAtom'

interface CategoryCardProps {
  category: Category
}

export const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
  const { data: session, status } = useSession()
  const [editedName, setEditedName] = useState(category.name)
  const [isEditing, setIsEditing] = useState<boolean>(false)
  const [editedCategory, setEditedCategory] = useState<string>(category.name)
  // const [isChecked, setIsChecked] = useState<boolean>(false)
  const setCategories = useSetRecoilState(CategoryAtom)
  const [modalTodo, setModalTodo] = useRecoilState(ModalTodoAtom);

  const handleEdit = async () => {
    setIsEditing(true)
  }

  const handleSave = async () => {
    const updatedCategory = {
      name: editedName,
    }
    await editCategory({ updatedCategory, id: category.id as number })
    setIsEditing(false)
    const categories = await getCategories({ id: session?.user?.id ?? '' })
    setCategories(categories)
  }

  const handleDelete = async (id: number) => {
    await deleteCategory({ id })
    const categories = await getCategories({ id: session?.user?.id ?? '' })
    setCategories(categories)
  }

  const updateTodoCategory = async () => {
    if (!modalTodo || !category.id) {
      return;
    }

    const updatedTodo = {
      ...modalTodo,
      category_ids: [category.id]
    };

    await editTodo({
      id: updatedTodo.id,
      updatedTodo
    });
  };

  return (
    <div key={category.id} className='relative flex items-start'>
      <div className='flex h-6 items-center'>
        <input
          id='offers'
          aria-describedby='offers-description'
          name='offers'
          type='checkbox'
          className='h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600'
          value={editedCategory}
          onChange={updateTodoCategory}
        />
      </div>
      <div className='ml-3 text-sm leading-6'>
        {isEditing ? (
          <input
            type='text'
            value={editedName}
            onChange={(e) => setEditedName(e.target.value)}
            className='px-1 rounded border-gray-400 border mr-1'
          />
        ) : (
          <label htmlFor='offers' className='font-medium text-gray-900'>
            {category.name}
          </label>
        )}{' '}
      </div>
      <div className='flex-grow' />
      <div className='text-xl cursor-pointer'>
        {isEditing ? (
          <MdSaveAlt onClick={handleSave} />
        ) : (
          <div className='flex gap-1'>
            <CiEdit onClick={handleEdit} />
            <MdDeleteOutline onClick={() => category && category.id && handleDelete(category.id)} />
          </div>
        )}
      </div>
    </div>
  )
}
